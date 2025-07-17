import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Crown, Store, ArrowRight } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const AdminPromoBanner = () => {
  const { user, isAuthenticated } = useUserStore();

  // Don't show banner if user is already an admin
  if (user?.admin) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 mx-4 my-8 rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <Crown className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Own a Restaurant?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Join our platform and start managing your restaurant business online
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Store className="w-4 h-4" />
              <span>Manage Orders</span>
              <span>•</span>
              <span>Add Menu Items</span>
              <span>•</span>
              <span>Track Sales</span>
            </div>
            
            {isAuthenticated ? (
              <Link to="/admin-access">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                  Become Admin
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPromoBanner;
