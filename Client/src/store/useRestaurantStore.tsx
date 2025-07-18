import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import { MenuItem, RestaurantState } from "../types/restaurantTypes";
import { Orders } from "../types/orderType";
// Smart environment detection
const API_END_POINT = window.location.hostname === 'localhost' 
  ? "http://localhost:3000/api/v1/restaurant"
  : "https://foody-app-v86b.onrender.com/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState >()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      // Create a new restaurant
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            await get().getRestaurant();
           
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
          set({ loading: false });
        }
      },

      // Fetch all restaurants
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          console.error('Error fetching restaurant:', error);
          set({ restaurant: null });
        } finally {
          set({ loading: false });
        }
      },

      // Update a restaurant
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
          set({ loading: false });
        }
      },

      // Search restaurants
      searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: String[]) => {
        try {
            set({ loading: true });
            const params = new URLSearchParams();
            params.set("q", searchQuery || searchText);
            params.set("selectedCuisines", selectedCuisines.join(","));
            const response = await axios.get(`${API_END_POINT}/search?${params.toString()}`);
            if (response.data.success) {
                set({ loading: false, searchedRestaurant: response.data });
            }
        } catch (error) {
            set({ loading: false });
        }
    },

      // Add a menu to a restaurant
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
            restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
        }))
    },
    

      // Update a menu in a restaurant
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: MenuItem) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      // Apply a filter
      setAppliedFilter: (value: string | string[]) => {
        set((state) => {
          if (Array.isArray(value)) {
            return { appliedFilter: value };
          } else {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied
              ? state.appliedFilter.filter((item) => item !== value)
              : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter };
          }
        });
      },

      // Reset all filters
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      // Fetch a single restaurant by ID
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          } else {
            toast.error("Unable to load restaurant details");
            set({ singleRestaurant: null });
          }
        } catch (error: any) {
          console.error('Error fetching restaurant details:', error);
          if (error.response?.status === 404) {
            toast.error("Restaurant not found");
          } else if (error.response?.status >= 500) {
            toast.error("Server is currently unavailable. Please try again later.");
          } else if (error.response?.data?.message) {
            // Only show server message if it's not authentication related
            const errorMessage = error.response.data.message;
            if (!errorMessage.toLowerCase().includes('authenticated') && 
                !errorMessage.toLowerCase().includes('authorization')) {
              toast.error(errorMessage);
            } else {
              toast.error("Unable to load restaurant details");
            }
          } else {
            toast.error("Unable to load restaurant details");
          }
          set({ singleRestaurant: null });
        }
      },

      // Fetch restaurant orders
      getRestaurantOrder: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ restaurantOrder: response.data.orders });
          }
        } catch (error: any) {
          toast.error("Failed to fetch restaurant orders");
        } finally {
          set({ loading: false });
        }
      },
      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
            const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`, { status }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const updatedOrder = get().restaurantOrder.map((order: Orders) => {
                    return order._id === orderId ? { ...order, status: response.data.status } : order;
                })
                set({ restaurantOrder: updatedOrder });
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    }),
  {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage),
  })
);
