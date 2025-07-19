import { CheckoutSessionRequest, OrderState } from "../types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";


// Smart environment detection
const API_END_POINT = window.location.hostname === 'localhost' 
  ? "http://localhost:3000/api/v1/order"
  : "https://foody-app-v86b.onrender.com/api/v1/order";
axios.defaults.withCredentials = true; 

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
      try {
        set({ loading: true });

        const response = await axios.post(
          `${API_END_POINT}/checkout/create-checkout-session`,
          checkoutSession,
          { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 15000
          }
        );

        if (!response.data?.session?.url) {
          throw new Error("Stripe session URL is missing in the response.");
        }

        window.location.href = response.data.session.url;
      } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
          toast.error("Request timeout. Please check your connection and try again.");
        } else if (error.response) {
          toast.error(`Server error: ${error.response.data?.message || error.response.data?.error || 'Unknown error'}`);
        } else if (error.request) {
          toast.error("No response from server. Please check if the server is running.");
        } else {
          toast.error(`Something went wrong: ${error.message}`);
        }
      } finally {
        set({ loading: false });
      }
    },
   getOrderDetails: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_END_POINT}/`);
      set({ orders: response.data.orders });
    } catch (error: any) {
      toast.error("Something went wrong while fetching order details.");
    } finally {
      set({ loading: false });
    }
  }

})), {
    name: 'order-name',
    storage: createJSONStorage(() => localStorage)
}))
