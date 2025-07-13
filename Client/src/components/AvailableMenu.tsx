import { MenuItem } from "../types/restaurantTypes";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "../store/useCartStore";
;
import { useNavigate } from "react-router-dom";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
 <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-center md:text-left">
        Available Menus
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu: MenuItem) => (
          <Card
            key={menu._id}
            className="shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300"
          >
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-48 object-cover"
            />

            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {menu.description}
              </p>
              <h3 className="text-md font-semibold text-gray-700">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="w-full bg-orange hover:bg-hoverOrange text-white font-semibold rounded-md"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
