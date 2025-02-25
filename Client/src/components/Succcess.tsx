import { IndianRupee, SeparatorHorizontal } from "lucide-react";
import image from "../assets/Hero.jpg";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Succcess = () => {
  const orders = [1, 2, 3];
  if (orders.length == 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:gray-900 px-4 ">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 ">
            Order Status:{" "}
            <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 deak:text-gray-300 mb-4 ">
            Order Summary
          </h2>
          {/* Order item will display here */}

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={image}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <h3 className="ml-4 text-gray-800 dark:text-gray-200">Pizza</h3>
              </div>
              <div className="text-right ">
                
                <div className="text-gray-800 dark:text-gray-200 items-center">
               
                     
                <span className="flex  text-xl font-mediu">  <IndianRupee className="text-xl" /> 80</span>
                </div>
              </div>
            </div>
            <Separator className="my-10"/>

          </div>
        </div>
        <Link to="/cart">
        <Button className="bg-orange hover:bg-orange">
          Continue Shoping
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Succcess;
