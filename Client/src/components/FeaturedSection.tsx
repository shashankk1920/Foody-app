import { useEffect, useState } from "react";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Restaurant } from "../types/restaurantTypes"; // MenuItem commented for later use
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { useCartStore } from "../store/useCartStore"; // Commented for later use
import { Skeleton } from "./ui/skeleton";

const FeaturedSection = () => {
  const { searchRestaurant, searchedRestaurant, loading } = useRestaurantStore();
  // const { addToCart } = useCartStore(); // Commented for later use
  const navigate = useNavigate();
  // const [featuredMenus, setFeaturedMenus] = useState<(MenuItem & {
  //   restaurantName?: string;
  //   restaurantId?: string;
  //   city?: string;
  //   deliveryTime?: number;
  // })[]>([]); // Commented for later use
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all restaurants to show featured ones
    console.log("Fetching restaurants...");
    searchRestaurant("", "", []);
  }, []);

  useEffect(() => {
    console.log("searchedRestaurant updated:", searchedRestaurant);
    // Commented out menu processing for later use
    /*
    if (searchedRestaurant?.data) {
      console.log("Restaurant data:", searchedRestaurant.data);
      console.log("Number of restaurants:", searchedRestaurant.data.length);
      
      // Extract featured menus from all restaurants (first 6 items)
      const allMenus: MenuItem[] = [];
      searchedRestaurant.data.forEach((restaurant: Restaurant) => {
        console.log(`Restaurant ${restaurant.restaurantName} has ${restaurant.menus?.length || 0} menus`);
        if (restaurant.menus && restaurant.menus.length > 0) {
          // Add restaurant info to each menu item for better context
          const menusWithRestaurant = restaurant.menus.map((menu: MenuItem) => ({
            ...menu,
            restaurantName: restaurant.restaurantName,
            restaurantId: restaurant._id,
            city: restaurant.city,
            deliveryTime: restaurant.deliveryTime
          }));
          allMenus.push(...menusWithRestaurant);
        }
      });
      
      console.log("All menus collected:", allMenus.length);
      
      // Shuffle the array to show variety and take first 6
      const shuffledMenus = allMenus.sort(() => 0.5 - Math.random());
      setFeaturedMenus(shuffledMenus.slice(0, 6));
    }
    */
  }, [searchedRestaurant]);

  // Commented out functions for later use
  // const handleAddToCart = (menu: MenuItem) => {
  //   addToCart(menu);
  //   navigate("/cart");
  // };

  const handleViewAllRestaurants = () => {
    navigate("/search/restaurants");
  };

  // const handleExploreDishes = () => {
  //   navigate("/search/food");
  // };

  if (loading) {
    return <FeaturedSectionSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Featured Restaurants Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Featured Restaurants
          </h2>
          <p className="text-gray-600 text-lg">
            Discover popular restaurants in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedRestaurant?.data && searchedRestaurant.data.length > 0 ? (
            searchedRestaurant.data.slice(0, 6).map((restaurant: Restaurant) => (
              <Card
                key={restaurant._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {restaurant.restaurantName}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{restaurant.city}, {restaurant.country}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{restaurant.deliveryTime} mins</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.cuisines.slice(0, 3).map((cuisine, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    {restaurant.menus?.length || 0} dishes available
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link to={`/restaurant/${restaurant._id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      View Menu
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                No restaurants available at the moment
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Check back later for new restaurants
              </p>
            </div>
          )}
        </div>

        {searchedRestaurant?.data && searchedRestaurant.data.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              onClick={handleViewAllRestaurants}
              className="px-8 py-3 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Restaurants
            </Button>
          </div>
        )}
      </div>

      {/* Featured Dishes Section - Commented for later modification */}
      {/* 
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Popular Dishes
          </h2>
          <p className="text-gray-600 text-lg">
            Try these delicious dishes from our partner restaurants
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMenus.length > 0 ? (
            featuredMenus.map((menu) => (
              <Card
                key={menu._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ₹{menu.price}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {menu.name}
                  </h3>
                  
                  {menu.restaurantName && (
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{menu.restaurantName}</span>
                      {menu.city && <span className="text-xs text-gray-500">• {menu.city}</span>}
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {menu.description}
                  </p>
                  
                  {menu.deliveryTime && (
                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{menu.deliveryTime} mins delivery</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => handleAddToCart(menu)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                No dishes available at the moment
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Restaurants haven't added any dishes yet
              </p>
            </div>
          )}
        </div>

        {featuredMenus.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              onClick={handleExploreDishes}
              variant="outline" 
              className="px-8 py-3 text-lg border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              Explore More Dishes
            </Button>
          </div>
        )}
      </div>
      */}
    </div>
  );
};

// Skeleton component for loading state
const FeaturedSectionSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Restaurants Skeleton */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-80 mx-auto mb-2" />
          <Skeleton className="h-6 w-60 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="bg-white shadow-lg rounded-xl overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Dishes Skeleton */}
      <div>
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-80 mx-auto mb-2" />
          <Skeleton className="h-6 w-60 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="bg-white shadow-lg rounded-xl overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
