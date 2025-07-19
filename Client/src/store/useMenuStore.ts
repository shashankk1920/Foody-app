import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";


// Smart environment detection
const API_END_POINT = window.location.hostname === 'localhost' 
  ? "http://localhost:3000/api/v1/menu"
  : "https://foody-app-v86b.onrender.com/api/v1/menu";
axios.defaults.withCredentials = true;


type MenuState = {
    loading: boolean,
    menu: null,
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
}


export const useMenuStore = create<MenuState>()(
    persist(
        (set) => ({
            loading: false,
            menu: null,
            createMenu: async (formData: FormData) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ loading: false, menu: response.data.menu });

                        // Update restaurant
                        const addMenuToRestaurant = useRestaurantStore.getState().addMenuToRestaurant;
                        addMenuToRestaurant(response.data.menu);
                    }
                } catch (error: any) {
                    console.error(error);
                    toast.error(error.response?.data?.message || "An error occurred");
                    set({ loading: false });
                }
            },
            editMenu: async (menuId: string, formData: FormData) => {
                try {
                    set({ loading: true });
                    const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ loading: false, menu: response.data.menu });

                        // Update restaurant menu
                        const updateMenuToRestaurant = useRestaurantStore.getState().updateMenuToRestaurant;
                        updateMenuToRestaurant(response.data.menu);
                    }
                } catch (error: any) {
                    console.error(error);
                    toast.error(error.response?.data?.message || "An error occurred");
                    set({ loading: false });
                }
            },
        }),
        {
            name: "menu-name",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
