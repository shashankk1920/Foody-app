import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { RestaurantFormSchema, restaurantFromSchema } from "../schema/restaurantSchema";
import { useRestaurantStore } from "../store/useRestaurantStore";

interface InputState {
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageFile?: File;
}

const Restaurant = () => {
  const [input, setInput] = useState<InputState>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [error, setError] = useState<Partial<RestaurantFormSchema>>({});

  const {
    loading,
    createRestaurant,
    restaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setInput({ ...input, [name]: files[0] });
    } else if (name === "deliveryTime") {
      setInput({ ...input, [name]: Number(value) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines || [],
          imageFile: undefined,
        });
      }
    };
    fetchRestaurant();
  }, []);

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

      <div className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
          {restaurant ? "Update Restaurant" : "Add Restaurant"}
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label className="mb-2 block">Restaurant Name</Label>
              <Input
                name="restaurantName"
                value={input.restaurantName}
                onChange={changeEventHandler}
                placeholder="Ex: Foodie Palace"
              />
              {error.restaurantName && (
                <p className="text-red-600 text-sm mt-1">{error.restaurantName}</p>
              )}
            </div>

            {/* City */}
            <div>
              <Label className="mb-2 block">City</Label>
              <Input
                name="city"
                value={input.city}
                onChange={changeEventHandler}
                placeholder="Ex: Mumbai"
              />
              {error.city && (
                <p className="text-red-600 text-sm mt-1">{error.city}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <Label className="mb-2 block">Country</Label>
              <Input
                name="country"
                value={input.country}
                onChange={changeEventHandler}
                placeholder="Ex: India"
              />
              {error.country && (
                <p className="text-red-600 text-sm mt-1">{error.country}</p>
              )}
            </div>

            {/* Delivery Time */}
            <div>
              <Label className="mb-2 block">Delivery Time (in mins)</Label>
              <Input
                name="deliveryTime"
                type="number"
                value={input.deliveryTime === 0 ? "" : input.deliveryTime}
                onChange={(e) =>
                  setInput({
                    ...input,
                    deliveryTime: e.target.value === "" ? 0 : Number(e.target.value),
                  })
                }
                placeholder="Ex: 30"
              />
              {error.deliveryTime && (
                <p className="text-red-600 text-sm mt-1">{error.deliveryTime}</p>
              )}
            </div>

            {/* Cuisines */}
            <div className="md:col-span-2">
              <Label className="mb-2 block">Cuisines</Label>
              <Input
                name="cuisines"
                value={input.cuisines.join(", ")}
                onChange={(e) =>
                  setInput({
                    ...input,
                    cuisines: e.target.value.split(",").map((c) => c.trim()),
                  })
                }
                placeholder="Ex: Pizza, Pasta, Salad"
              />
              {error.cuisines && (
                <p className="text-red-600 text-sm mt-1">
                  {error.cuisines.join(", ")}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <Label className="mb-2 block">Upload Restaurant Banner</Label>
              <Input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={changeEventHandler}
              />
              {error.imageFile && (
                <p className="text-red-600 text-sm mt-1">
                  {error.imageFile.name || "Please upload an image"}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="text-center pt-4">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange w-full md:w-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button type="submit" className="bg-orange hover:bg-hoverOrange w-full md:w-auto">
                {restaurant ? "Update Restaurant" : "Add Restaurant"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;
