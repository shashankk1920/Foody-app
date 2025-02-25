import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: ""
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input Changed - ${name}: ${value}`); // Debugging log
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API implementation starts here
    console.log("Form Submitted", input); // 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
          <DialogTitle className="text-lg font-bold mb-2">Review Your Order</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mb-4">
            Double-check your information for delivery.
          </DialogDescription>
          <form onSubmit={checkoutHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Contact</Label>
                <Input
                  type="text"
                  name="contact"
                  value={input.contact}
                  onChange={changeEventHandler}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={changeEventHandler}
                  className="w-full"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              
              <Button type="submit" className="bg-orange hover:bg-hoverOrange">Continue to Payment</Button>
              <DialogClose asChild>
                <Button type="button" className="bg-gray-300 hover:bg-gray-400">Close</Button>
              </DialogClose>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;

