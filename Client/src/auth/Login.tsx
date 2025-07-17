import { Input } from "../components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState, userLoginSchema } from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState<Partial<LoginInputState>>({});
  const { loading, login } = useUserStore();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<LoginInputState>);
      return;
    }
    await login(input);
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
      {/* Login Form */}
      <form
        onSubmit={loginSubmitHandler}
        className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6"
      >
        <div>
          <h1 className="font-bold text-3xl text-center text-gray-800 mb-1 hover:text-hoverOrange transition-all">
            FoodyPlace
          </h1>
          <p className="text-sm text-center text-gray-500">
            Welcome back! Please login.
          </p>
        </div>

        <div className="space-y-1 relative">
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={input.email}
            onChange={changeEventHandler}
            className="pl-10"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {error.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
        </div>

        <div className="space-y-1 relative">
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={input.password}
            onChange={changeEventHandler}
            className="pl-10"
          />
          <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {error.password && (
            <span className="text-sm text-red-500">{error.password}</span>
          )}
        </div>

        <div className="pt-2">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              Login
            </Button>
          )}
          <div className="mt-2 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Separator className="bg-gray-200 h-[1px]" />

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
