import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "@radix-ui/react-label"; 
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react"; 
import { MenuFormSchema, menuSchema } from "../schema/menuSchema";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<any>({
    name: selectedMenu?.name || "",
    description: selectedMenu?.description || "",
    price: selectedMenu?.price || 0,
    image: undefined,
  });

  useEffect(() => {
    if (selectedMenu) {
      setInput({
        name: selectedMenu.name,
        description: selectedMenu.description,
        price: selectedMenu.price,
        image: undefined,
      });
    }
  }, [selectedMenu]);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  const [error, setError] = useState<Partial<MenuFormSchema>>({});

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    // Handle form submission logic
    console.log("Form submitted with data: ", input);
    const result = menuSchema.safeParse(input);
    if(!result.success){
        const fieldErrors = result.error.formErrors.fieldErrors;
        setError(fieldErrors as Partial<MenuFormSchema>);
        return;
    }
  };

  const loading = false;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-800">Edit Menu</DialogTitle>
          <DialogDescription className="text-md text-gray-600 mt-2">
            Update your menu to keep your offering fresh and exciting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4 mt-4">
          <div>
            <Label className="block text-md font-medium text-gray-700">Name</Label>
            <Input
              type="text"
              name="Name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter menu name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
             {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
          </div>
          <div>
            <Label className="block text-md font-medium text-gray-700">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
             {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <Label className="block text-md font-medium text-gray-700">Price</Label>
            <Input
              type="number"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter menu price"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
             {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <Label className="block text-md font-medium text-gray-700">Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
             {error && <span className="text-xs font-medium text-red-600">{error.image?.name || "Image is required"}</span>}
          </div>
          <div className="text-center">
            <Button type="submit" className="bg-orange hover:bg-hoverOrange px-6 py-2 text-white font-semibold rounded-lg shadow-md">
              {loading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
