import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Home, ArrowLeft, Search, UtensilsCrossed, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-6xl font-bold text-gray-800 mb-2">404</CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Oops! The page you're looking for doesn't exist
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              It seems like you've wandered off the menu! Don't worry, our delicious food is still waiting for you.
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 font-medium">
                🍽️ Redirecting to home page in {countdown} seconds...
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 text-base"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Button>
            
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 text-base"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-gray-500 mb-4 font-medium">
              Popular Pages
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link to="/search/restaurants">
                <Button 
                  variant="ghost" 
                  className="w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Browse Restaurants
                </Button>
              </Link>
              
              <Link to="/admin-access">
                <Button 
                  variant="ghost" 
                  className="w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Become Admin
                </Button>
              </Link>
              
              <Link to="/contact-us">
                <Button 
                  variant="ghost" 
                  className="w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  📞 Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Looking for something specific? Try our{" "}
              <Link to="/search/food" className="text-orange-600 hover:text-orange-700 font-medium underline">
                food search
              </Link>{" "}
              or{" "}
              <Link to="/contact-us" className="text-orange-600 hover:text-orange-700 font-medium underline">
                contact our support team
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
