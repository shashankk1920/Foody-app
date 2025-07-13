import { FormEvent, useRef, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const { loading, verifyEmail } = useUserStore();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      await verifyEmail(code);
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

      {/* OTP Box */}
      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex justify-between gap-2 md:gap-3">
            {otp.map((value, index) => (
              <Input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 md:w-12 md:h-12 text-center text-xl font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
              />
            ))}
          </div>

          <div className="mt-6">
            {loading ? (
              <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full bg-orange hover:bg-hoverOrange">
                Verify
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
