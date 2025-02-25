// import react from "react"

import { Input } from "../components/ui/input";
import { Contact, Loader2, LockKeyhole, Mail,  User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInputState, userSignupSchema } from "../schema/userSchema";

// there ae two ways to define the typescript
// interface SignupInputState {
//   fullname: string;
//   email: string;
//   password: string;
//   contact: string;
// }

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //We have use partial because it is a typescript format and we have to see that error must be from fullname and other filds which are wrrtten in that singupInputstate
  const [error, setErrors] = useState<Partial<SignupInputState>>({})

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // form validation check start
    const result = userSignupSchema.safeParse(input)
    if(!result.success){
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<SignupInputState>);
      return;
    }
    // login api implmenatation starts here
    console.log(input);
  };
  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f1e8b4]">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 bg-slate-50 "
      >
        <div className="mb-5">
          <h1 className="font-bold text-2xl text-center">FoodyPlace</h1>
        </div>
        <div className="mb-5">
         
          <div className="relative">
            <Input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-2 left-3 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.fullname}</span>
            } 
          </div>
        </div>
        <div className="mb-5">
          
          <div className="relative">
            <Input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={input.contact}
              onChange={changeEventHandler}
              pattern="[0-9]*"
              className="pl-10 focus-visible:ring-1"
            />
            <Contact className="absolute inset-2 left-3 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.contact}</span>
            } 
          </div>
        </div>
        <div className="mb-5">
          {" "}
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-2 left-3 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.email}</span>
            } 
          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-2 left-3 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.password}</span>
            } 
          </div>
        </div>
        <div className="mb-11">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              SignUp
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-2 text-center">
          Already have an account ?
          <Link to="/login" className="text-blue-500 ml-1 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
