import { Input } from "../components/ui/input";
import { useState, FormEvent } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with your real API call
      console.log("Resetting password to:", newPassword);
    } catch (err) {
      console.error("Error resetting password", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg')",
      }}
    >
      {/* Blur + Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* Reset Password Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col gap-6 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-gray-200"
      >
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
            Reset Password
          </h1>
          <p className="text-sm text-gray-600">
            Enter your new password to reset your old one.
          </p>
        </div>

        <div className="relative">
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10"
          />
          <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {loading ? (
          <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </Button>
        ) : (
          <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
            Reset Password
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

export default ResetPassword;
