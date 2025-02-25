import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import HeroImage from '../assets/Hero.jpg'; // Ensure the relative path is correct
import { Skeleton } from "./ui/skeleton";

const SearchPage = () => {
  const params = useParams();

  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto my-10 mr-20 ml-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 my-5">
        <FilterPage />
        {/* By giving flex-1 it automatically adjusts the screen */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search Your Favorite Food and Restaurant"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="max-w-sm  bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white    rounded-md mx-auto p-5d outline-none shadow-lg transform active:scale-x-75 transition-transform  flex">Search</Button>
          </div>
          {/* Searched Item Display Here */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">(2) Search Results Found</h1>
              <div>
                {
                  ["Biryani", "Pasta", "Pizza"].map((selectedFilter: string, idx: number) => (
                    <div key={idx} className="relative inline-flex items-center mr-3">
                      <Badge className="text-[#e7923c] hover:cursor-pointer pr-6 whitespace-nowrap" variant="outline">{selectedFilter}</Badge>
                      <X size={16} className="absolute text-[#d19254] right-1 hover:cursor-pointer" />
                    </div>
                  ))
                }
              </div>
            </div>
            
          
          </div>
          {/* Restaurant Cards where search option will be present or when we click on the search option than goes to the card section  */}
          <div className="grid md:grid-cols-3 gap-4 ">
            {
              [1,2,3].map((item:number, idx:number) =>(
                <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative ">
                  <AspectRatio ratio={16 / 9}>
                    <img src={HeroImage} alt="Restaurant" className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110" />
                  </AspectRatio >
                  <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1  ">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pizza Hunt</h1>
                  <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16}/>
                    <p className="text-sm">
                      City:{" "}
                      <span className="font-medium">Delhi</span>
                    </p>

                  </div>
                  <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <Globe size={16}/>
                    <p className="text-sm">
                      Country:{" "}
                      <span className="font-medium">India</span>
                    </p>

                  </div>
                  <div className="flex gap-2 mt-4 flex-wrap  ">
                  {
                    ["Biryani", "Pasta", "Pizza"].map((cuisine:string, idx:number)=>(
                      <Badge key={idx}
                      className="font-medium px-2 pyy-1 rounded-full shadow  bg-[#007BFF]">{cuisine}</Badge>
                    ))
                  }
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end ">
                  <Link to={`/restaurant/${123}`}>
                  <Button className="flex max-w-sm  bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white   rounded-full mx-5 px-2 p-3 outline-none shadow-lg transform active:scale-x-75 transition-transform  ">View Menu</Button>
                  </Link>
                </CardFooter>
              </Card>
              ))

              
            }
             
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};