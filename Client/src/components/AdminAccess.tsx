import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useUserStore } from "../store/useUserStore";
import { Crown, Store, MenuSquare, Users, ArrowRight } from "lucide-react";

const AdminAccess = () => {
  const { user, becomeAdmin, loading } = useUserStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBecomeAdmin = async () => {
    try {
      await becomeAdmin();
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error becoming admin:', error);
      // The error is already handled in the store, so we just log it here
      setShowConfirmation(false);
    }
  };

  if (user?.admin) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          </div>
          <CardDescription>
            You have admin privileges. Manage your restaurant business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <Store className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Restaurant Management</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <MenuSquare className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium">Menu Management</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Order Management</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button 
              onClick={() => window.location.href = '/admin/restaurant'} 
              className="bg-orange hover:bg-hoverOrange"
            >
              Go to Admin Panel
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-8 h-8 text-orange-500" />
          <CardTitle className="text-2xl">Become a Restaurant Admin</CardTitle>
        </div>
        <CardDescription>
          Join our platform as a restaurant owner and start managing your business online.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">As an Admin, you can:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Create & manage restaurants</span>
              </div>
              <div className="flex items-center gap-3">
                <MenuSquare className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Add & update menu items</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Handle customer orders</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-orange text-white">
                  Full Control
                </Badge>
                <span className="text-sm">Complete business management</span>
              </div>
            </div>
          </div>

          {!showConfirmation ? (
            <div className="text-center">
              <Button 
                onClick={() => setShowConfirmation(true)}
                className="bg-orange hover:bg-hoverOrange text-white px-8 py-3 text-lg"
              >
                Become Admin
                <Crown className="w-5 h-5 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-center">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Confirm Admin Access
                </h4>
                <p className="text-yellow-700 text-sm mb-4">
                  Are you sure you want to become an admin? This will give you access to restaurant management features.
                </p>
                <div className="flex justify-center gap-3">
                  <Button 
                    onClick={handleBecomeAdmin}
                    disabled={loading}
                    className="bg-orange hover:bg-hoverOrange"
                  >
                    {loading ? "Processing..." : "Yes, Make Me Admin"}
                  </Button>
                  <Button 
                    onClick={() => setShowConfirmation(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAccess;
