import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import HeroImage from "@/assets/Hero.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  
  return (
<div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600">
  <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 py-16  md:p-10 rounded-lg items-center justify-between gap-10 min-h-screen">
    
    {/* Text Section */}
    <div className="flex flex-col gap-5 w-full md:w-[50%] md:ml-7 text-center md:text-left">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-100 drop-shadow-[1px_1px_0px_black]">
        Order Food Anytime and Anywhere
      </h1>

      <p className="font-semibold text-sm sm:text-base md:text-xl md:font-extrabold text-gray-100 drop-shadow-[1px_1px_0px_black]">
        Hey! Our Delicious food is waiting for you, we are always near to you
      </p>

      <div className="relative flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative w-full">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your favorite food..."
            className="pl-10 h-10 shadow-lg text-base sm:text-xl w-full"
          />
          <Search className="text-gray-500 absolute top-2.5 left-3" size={20} />
        </div>

        <Button
          onClick={() => navigate(`/search/${searchText}`)}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-md px-6 py-2 shadow-md w-full sm:w-auto text-base sm:text-lg"
        >
          Search
        </Button>
      </div>
    </div>
    

  
    <div className="flex items-center justify-center w-full md:w-[50%] max-h-[300px]">
      <img
        src={HeroImage}
        alt="Hero Section"
        className="object-cover w-[80%] sm:w-[60%]  max-h-[300px] rounded-3xl opacity-95 transition-transform duration-500 ease-in-out transform hover:scale-110  shadow-lg"
      />
    </div>
  </div>
</div>

  );
};

export default HeroSection;
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import HeroImage from "@/assets/Hero.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  
  return (
<div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600">
  <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 py-16  md:p-10 rounded-lg items-center justify-between gap-10 min-h-screen">
    
    {/* Text Section */}
    <div className="flex flex-col gap-5 w-full md:w-[50%] md:ml-7 text-center md:text-left">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-100 drop-shadow-[1px_1px_0px_black]">
        Order Food Anytime and Anywhere
      </h1>

      <p className="font-semibold text-sm sm:text-base md:text-xl md:font-extrabold text-gray-100 drop-shadow-[1px_1px_0px_black]">
        Hey! Our Delicious food is waiting for you, we are always near to you
      </p>

      <div className="relative flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative w-full">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your favorite food..."
            className="pl-10 h-10 shadow-lg text-base sm:text-xl w-full"
          />
          <Search className="text-gray-500 absolute top-2.5 left-3" size={20} />
        </div>

        <Button
          onClick={() => navigate(`/search/${searchText}`)}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-md px-6 py-2 shadow-md w-full sm:w-auto text-base sm:text-lg"
        >
          Search
        </Button>
      </div>
    </div>
    

  
    <div className="flex items-center justify-center w-full md:w-[50%] max-h-[300px]">
      <img
        src={HeroImage}
        alt="Hero Section"
        className="object-cover w-[80%] sm:w-[60%]  max-h-[300px] rounded-3xl opacity-95 transition-transform duration-500 ease-in-out transform hover:scale-110  shadow-lg"
      />
    </div>
  </div>
</div>

  );
};

export default HeroSection;
