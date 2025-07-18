import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = import.meta.env.DEV
  ? "http://localhost:3000/api/v1/user"
  : "https://foody-app-v86b.onrender.com/api/v1/user";// Updated to use HTTP for local development
axios.defaults.withCredentials = true;

type User = {
    fullname:string;
    email:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    isVerified:boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input:SignupInputState) => Promise<void>;
    login: (input:LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email:string) => Promise<void>; 
    resetPassword: (token:string, newPassword:string) => Promise<void>; 
    updateProfile: (input:any) => Promise<void>;
    becomeAdmin: () => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    // signup api implementation
    signup: async (input: SignupInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) { 
                toast.success(response.data.message);
                // Set user as authenticated but not verified
                set({ 
                    loading: false, 
                    user: response.data.user, 
                    isAuthenticated: true 
                });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
            throw error; // Re-throw to handle in component
        }
    },


    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) { 
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    verifyEmail: async (verificationCode: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ 
                    loading: false, 
                    user: response.data.user, 
                    isAuthenticated: true 
                });
                // Navigation will happen automatically due to route protection
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
            throw error; // Re-throw to handle in component
        }
    },
    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`);
            if (response.data.success) {
                set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({isAuthenticated: false, isCheckingAuth: false });
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false })
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    updateProfile: async (input:any) => {
        try { 
            const response = await axios.put(`${API_END_POINT}/profile/update`, input,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.data.success){
                toast.success(response.data.message);
                set({user:response.data.user, isAuthenticated:true});
            }
        } catch (error:any) { 
            toast.error(error.response.data.message);
        }
    },
    becomeAdmin: async () => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/become-admin`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true, loading: false });
            }
        } catch (error: any) {
            console.error('Become admin error:', error);
            
            if (error.response) {
                // Server responded with error status
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                
                if (error.response.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(`Server error: ${error.response.status}`);
                }
            } else if (error.request) {
                // Network error
                console.error('Network error:', error.request);
                toast.error('Network error: Unable to connect to server');
            } else {
                // Other error
                console.error('Error:', error.message);
                toast.error('An unexpected error occurred');
            }
            
            set({ loading: false });
        }
    }
}),
    {
        name: 'user-name',
     
        storage: createJSONStorage(() => localStorage),
    }
))
