import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const AvailableMenu = () => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="w-full shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" 
            alt="Delicious pastry" 
            className="w-full h-40 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark-text-white">Tandori Biryani</h2>
            <p>write soemthn about the rsrutrant</p>
            <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹80</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button className="bg-orange hover:bg-hoverOrange w-full"> Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AvailableMenu;
