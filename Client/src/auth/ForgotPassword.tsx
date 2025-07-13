import { Input } from "../components/ui/input";
import { useState, FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 👉 Replace this with your actual API call
      console.log("Sending reset link to:", email);
    } catch (err) {
      console.error("Failed to send email", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Form Box */}
      <form
        onSubmit={submitHandler}
        className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg w-full max-w-md p-6 sm:p-8 rounded-xl border border-gray-200 flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-600">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="pl-10"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {loading ? (
          <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Link...
          </Button>
        ) : (
          <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
            Send Reset Link
          </Button>
        )}

        <p className="text-center text-sm">
          Back to{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
