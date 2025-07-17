import { Minus, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "../store/useCartStore";
import { CartItem } from "../types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    clearCart,
    removeFromTheCart,
  } = useCartStore();

  const totalAmount = cart?.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0) || 0;

  const formatNumber = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
      }}
    >
      {/* 🔲 Optional blur overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-center sm:text-left">Shopping Cart</h2>
          {cart?.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Are you sure you want to clear the cart?")) {
                  clearCart();
                }
              }}
              className="gap-2 flex justify-end items-center"
            >
              <Trash2 size={18} />
              Clear All
            </Button>
          )}
        </div>

        {!cart || cart.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            Your cart is empty.
          </div>
        ) : (
          <>
            {/* 📱 Responsive horizontal scroll */}
            <div className="overflow-x-auto rounded-md border border-gray-200">
              <Table className="min-w-[700px]">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart?.map((item: CartItem) => (
                    <TableRow key={item._id} className="hover:bg-gray-50">
                      <TableCell>
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={item.image} alt={item.name || "Menu Item"} />
                          <AvatarFallback>{item.name ? item.name.slice(0, 2).toUpperCase() : "MI"}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{item.name || "Unknown Item"}</TableCell>
                      <TableCell>{formatNumber(item.price || 0)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            onClick={() => decrementQuantity(item._id)}
                            size="icon"
                            variant="ghost"
                            className="rounded-full bg-orange hover:bg-hoverOrange text-white"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                          <Button
                            onClick={() => incrementQuantity(item._id)}
                            size="icon"
                            variant="ghost"
                            className="rounded-full bg-orange hover:bg-hoverOrange text-white"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber((item.price || 0) * (item.quantity || 1))}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromTheCart(item._id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-gray-100 text-lg font-bold">
                  <TableRow>
                    <TableCell colSpan={4}></TableCell>
                    <TableCell>Total:</TableCell>
                    <TableCell className="text-right">
                      {formatNumber(totalAmount)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* ✅ Checkout button */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setOpen(true)}
                className="bg-orange text-white hover:bg-hoverOrange px-6 py-2 text-base sm:text-lg rounded-lg shadow"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
        <CheckoutConfirmPage open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Cart;
