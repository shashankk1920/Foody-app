import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2, LocateIcon, Mail, MapPin, MapPinHouse, Plus } from "lucide-react";
import { useRef, useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");
  const loading = false;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   //profile api implemetnation 
  };

  return (
    
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5 pr-20 pl-20">
      <div className="flex items-center justify-between pl-7">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-20 w-24 h-20 rounded-100% ">
            {selectedProfilePicture ? (
              <AvatarImage src={selectedProfilePicture} className="object-cover w-full h-full rounded-full" />
            ) : (
              <AvatarFallback className="pt-2">CN</AvatarFallback>
            )}
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              className="hidden"
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex item-center gap-4 rounded-sm p-2 bg-gray-200 pl-4">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex item-center gap-4 rounded-sm p-2 bg-gray-200 pl-4">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex item-center gap-4 rounded-sm p-2 bg-gray-200 pl-4">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex item-center gap-4 rounded-sm p-2 bg-gray-200 pl-4">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
          
        </div>
       
      </div>
      <div className="text-center">
          {loading ? (
            <Button className="bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange">Update</Button>
          )}
        </div>
    </form>
  );
};

export default Profile;
