import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, UserPlus } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  actionType?: "cart" | "admin" | "general";
}

const AuthModal = ({ 
  isOpen, 
  onClose, 
  message = "You need to be logged in to continue",
  actionType = "general"
}: AuthModalProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (actionType) {
      case "cart":
        return <ShoppingCart className="w-12 h-12 text-orange-500 mx-auto mb-4" />;
      case "admin":
        return <UserPlus className="w-12 h-12 text-blue-500 mx-auto mb-4" />;
      default:
        return <UserPlus className="w-12 h-12 text-gray-500 mx-auto mb-4" />;
    }
  };

  const getTitle = () => {
    switch (actionType) {
      case "cart":
        return "Login to Add Items to Cart";
      case "admin":
        return "Login to Become an Admin";
      default:
        return "Authentication Required";
    }
  };

  const getDescription = () => {
    switch (actionType) {
      case "cart":
        return "Please log in to add items to your cart and place orders.";
      case "admin":
        return "Please log in to access admin features and manage your restaurant.";
      default:
        return message;
    }
  };

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleSignup = () => {
    onClose();
    navigate("/signup");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {getIcon()}
          
          <p className="text-center text-gray-600 text-sm">
            {getDescription()}
          </p>
          
          <div className="flex flex-col space-y-2 w-full">
            <Button 
              onClick={handleLogin}
              className="w-full bg-orange hover:bg-hoverOrange text-white"
            >
              Login
            </Button>
            
            <Button 
              onClick={handleSignup}
              variant="outline"
              className="w-full border-orange text-orange hover:bg-orange hover:text-white"
            >
              Sign Up
            </Button>
          </div>
          
          <Button 
            onClick={onClose}
            variant="ghost"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Continue Browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

