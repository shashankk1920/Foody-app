import { Input } from "../components/ui/input";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom"; // Ensure the correct import path

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>(""); // Define state correctly
  const loading = false;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
        </div>
        <div className="relative">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Corrected onChange handler
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {
          loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button className="w-full bg-orange hover:bg-hoverOrange">
              Send Reset Link
            </Button>
          )
        }
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500  hover:underline">Login</Link> 
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
