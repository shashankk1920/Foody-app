// import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./MainLayout.tsx";
import Signup from "./auth/Signup.tsx";
import Login from "./auth/Login.tsx";
import ForgotPassword from "./auth/ForgotPassword.tsx";
import ResetPassword from "./auth/ResetPassword.tsx";
import VerifyEmail from "./auth/VerifyEmail.tsx";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    // children:[
    //   {
    //     path:"/Login"
    //   }
    // ]
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
