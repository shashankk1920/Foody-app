// import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./auth/Signup.tsx";
import Login from "./auth/Login.tsx";
import ForgotPassword from "./auth/ForgotPassword.tsx";
import ResetPassword from "./auth/ResetPassword.tsx";
import VerifyEmail from "./auth/VerifyEmail.tsx";

import HeroSection from "./components/ui/HeroSection.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import Profile from "./components/Profile.tsx";
import SearchPage from "./components/SearchPage.tsx";
import ResturantDetails from "./components/ResturantDetails.tsx";
import { CarTaxiFront } from "lucide-react";
import Cart from "./components/Cart.tsx";
import Restaurant from "./admin/Restaurant.tsx";
import AddMenu from "./admin/AddMenu.tsx";
import Order from "./admin/Order.tsx";
import Succcess from "./components/Succcess.tsx";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<HeroSection/>,
      },
      {
        path:"/profile",
        element:<Profile/>,
      },
      {
        path:"/search/:text",
        element:<SearchPage/>,
      },
      {
        path:"/restaurant/:id",
        element:<ResturantDetails/>,
      },
      {
        path:"/cart",
        element:<Cart/>,
      },
      {
        path:"/order/status",
        element:<Succcess/>,
      },
      //From here admin services are also started so a user can become a admin and add or remove or remove a restaurant
      {
        path:"/admin/restaurant",
        element:<Restaurant/>,
      },
      {
        path:"/admin/menu",
        element:<AddMenu/>,
      },
      {
        path:"/admin/orders",
        element:<Order/>,
      },
    ]
  },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/forgot-password",
      element:<ForgotPassword/>
    },
    {
      path:"/reset-password",
      element:<ResetPassword/>
    },
    {
      path:"/verify-password",
      element:<VerifyEmail/>
    }
  
])

function App() {
  return (
    <>
    <RouterProvider router={appRouter}/>

 
    
</>
  );
}

export default App;
