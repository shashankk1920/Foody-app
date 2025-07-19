// import "./App.css";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Signup from "./auth/Signup.tsx";
import Login from "./auth/Login.tsx";
import ForgotPassword from "./auth/ForgotPassword.tsx";
import ResetPassword from "./auth/ResetPassword.tsx";
import VerifyEmail from "./auth/VerifyEmail.tsx";

import HomePage from "./components/HomePage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import Profile from "./components/Profile.tsx";
import SearchPage from "./components/SearchPage.tsx";
import ResturantDetails from "./components/ResturantDetails.tsx";
import AdminAccess from "./components/AdminAccess.tsx";

import Cart from "./components/Cart.tsx";
import Restaurant from "./admin/Restaurant.tsx";
import AddMenu from "./admin/AddMenu.tsx";
import Order from "./admin/Order.tsx";
import Succcess from "./components/Succcess.tsx";
import { useUserStore } from "./store/useUserStore.ts";
import { useThemeStore } from "./store/useThemeStore.ts";
import { useEffect } from "react";
import Loading from "./components/ui/Loading.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy.tsx";
import TermsOfService from "./components/TermsOfService.tsx";
import ContactUs from "./components/ContactUs.tsx";
import NotFound from "./components/NotFound.tsx";


// Route protection for authenticated users only (requires login but not verification)
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isCheckingAuth, loading } = useUserStore();
  
  // Show loading spinner while checking authentication
  if (isCheckingAuth || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Route protection for verified users only (requires both login and verification)
const VerifiedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isCheckingAuth, loading } = useUserStore();
  
  // Show loading spinner while checking authentication
  if (isCheckingAuth || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

// Redirect authenticated users away from auth pages
const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  
  // If user is authenticated (logged in), redirect them away from auth pages
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Route protection for verification page
const VerificationRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Admin-only routes (requires login, verification, and admin status)
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Public routes with main layout (browsing allowed without login)
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search/:text", element: <SearchPage /> },
      { path: "/restaurant/:id", element: <ResturantDetails /> },
      { path: "/admin-access", element: <VerifiedRoutes><AdminAccess /></VerifiedRoutes> },
      // Protected routes that require login only (not verification)
      { path: "/profile", element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
      { path: "/cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      // Routes that require verification
      { path: "/order/status", element: <VerifiedRoutes><Succcess /></VerifiedRoutes> },
      // Admin routes
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Restaurant /></AdminRoute>,
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element: <AdminRoute><Order /></AdminRoute>,
      },
    ],
  },
  // Authentication routes
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerificationRoute><VerifyEmail /></VerificationRoute>,
  },
  // Public pages
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  // Catch-all route for 404 pages
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    checkAuthentication();
    
    // Initialize theme - Default to light mode for first-time visitors
    const storedTheme = localStorage.getItem("vite-ui-theme") as "light" | "dark" | null;
    
    // If user has a stored preference, use it. Otherwise, default to light mode
    const themeToApply = storedTheme || "light";
    
    setTheme(themeToApply);
  }, [checkAuthentication, setTheme]);

  if (isCheckingAuth) return <Loading />;

  return (
    <main>
      
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
