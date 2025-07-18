import { Input } from "../components/ui/input";
import { SignupInputState, userSignupSchema } from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../components/ui/button";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup } = useUserStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      setLoading(false);
      return;
    }

    try {
      await signup(input);
      // Add a small delay to ensure state is updated before navigation
      setTimeout(() => {
        navigate("/verify-email");
      }, 200);
    } catch (error) {
      console.log("Signup error:", error);
      // Error is already handled in the store with toast
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
      {/* Signup Form Container */}
      <form
        onSubmit={loginSubmitHandler}
        className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6"
      >
        <div>
          <h1 className="font-bold text-3xl text-center text-gray-800 mb-1 hover:text-hoverOrange transition-all">
            PatelEats
          </h1>
          <p className="text-sm text-center text-gray-500">Create your account</p>
        </div>

        {/* Full Name */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            className="pl-10"
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {errors.fullname && <span className="text-xs text-red-500">{errors.fullname}</span>}
        </div>

        {/* Email */}
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="pl-10"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="pl-10"
          />
          <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
        </div>

        {/* Contact */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Contact"
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            className="pl-10"
          />
          <PhoneOutgoing className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {errors.contact && <span className="text-xs text-red-500">{errors.contact}</span>}
        </div>

        {/* Submit Button */}
        <div>
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              Signup
            </Button>
          )}
        </div>

        <Separator className="bg-gray-200 h-[1px]" />

        <p className="text-sm text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
