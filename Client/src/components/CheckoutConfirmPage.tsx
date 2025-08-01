import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import { CheckoutSessionRequest } from "../types/orderType";
import { useCartStore } from "../store/useCartStore";
import { useRestaurantStore } from "../store/useRestaurantStore";

import { Loader2 } from "lucide-react";
import { useOrderStore } from "../store/useOrderStore";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, isAuthenticated } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart, clearCart } = useCartStore();
  const { singleRestaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();
  
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check authentication first
    if (!isAuthenticated) {
      toast.error("You need to be logged in to place an order. Please log in and try again.");
      return;
    }
    
    // Validate that we have a restaurant selected
    if (!singleRestaurant?._id) {
      toast.error("Restaurant information is missing. Please try again.");
      return;
    }
    
    // Check if cart is empty
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty. Please add items to cart before checkout.");
      return;
    }
    
    // Validate cart items belong to current restaurant
    const validCartItems = cart.filter(cartItem => {
      return singleRestaurant.menus?.some((menu: any) => menu._id === cartItem._id);
    });
    
    if (validCartItems.length === 0) {
      const shouldClearCart = confirm("No valid items found in cart for this restaurant. This might happen if you added items from a different restaurant. Would you like to clear your cart and start fresh?");
      if (shouldClearCart) {
        clearCart();
        toast.success("Cart cleared. Please add items from the current restaurant.");
      }
      return;
    }
    
    if (validCartItems.length !== cart.length) {
      const invalidCount = cart.length - validCartItems.length;
      if (!confirm(`${invalidCount} item(s) in your cart are not available from this restaurant and will be excluded. Continue with ${validCartItems.length} valid item(s)?`)) {
        return;
      }
    }
    
    // api implementation start from here
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: validCartItems.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: singleRestaurant._id,
      };
      
      await createCheckoutSession(checkoutData);
    } catch (error) {
      toast.error("Error during checkout. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="font-semibold">Review Your Order</DialogTitle>
        <DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
        >
          <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
            />
          </div>
          <DialogFooter className="col-span-2 pt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
