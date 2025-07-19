import { IndianRupee, CheckCircle, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "../store/useOrderStore";
import { useEffect } from "react"; 
import { CartItem } from "../types/cartType";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (orders.length === 0)
    return (
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg')",
        }}
      >
        {/* Blur + Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-3xl shadow-black p-8">
          <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300 text-center">
            Order not found!
          </h1>
        </div>
      </div>
    );

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg')",
      }}
    >
      {/* Blur + Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-3xl shadow-black p-8 transition-colors">
          
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Order Placed Successfully!
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                Status: <span className="text-green-600 dark:text-green-400 font-bold">CONFIRMED</span>
              </span>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
              Order Summary
            </h2>
            
            {orders.map((order: any, index: number) => (
              <div key={index} className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <strong>Order ID:</strong> #{order._id?.slice(-8) || 'N/A'}
                    </div>
                    <div>
                      <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString() || 'Today'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.cartItems.map((item: CartItem) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover shadow-md"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity || 1}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center font-semibold text-lg">
                          <IndianRupee className="w-4 h-4" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Amount */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-gray-800 dark:text-gray-200">
                    <span>Total Amount:</span>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <IndianRupee className="w-5 h-5" />
                      <span>{order.totalAmount || 'Calculating...'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-md px-6 py-2 shadow-md w-full sm:w-auto text-base sm:text-lg">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-md px-6 py-2 shadow-md w-full sm:w-auto text-base sm:text-lg">
                View Profile
              </Button>
            </Link>
          </div>

          {/* Thank You Message */}
          <div className="text-center mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your order! We're preparing your delicious meal with care. 🍕✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
