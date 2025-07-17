import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Separator } from "@radix-ui/react-separator";
import { useUserStore } from "../../store/useUserStore";
import { useCartStore } from "../../store/useCartStore";
import { useThemeStore } from "../../store/useThemeStore";
import AuthModal from "../AuthModal";

const NavBar = () => {
  const { user, loading, logout, isAuthenticated } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState<"cart" | "admin" | "general">("general");
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setAuthModalType("cart");
      setShowAuthModal(true);
      return;
    }
    navigate("/cart");
  };

  const handleProtectedRoute = (route: string) => {
    if (!isAuthenticated) {
      setAuthModalType("general");
      setShowAuthModal(true);
      return;
    }
    navigate(route);
  };


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex-1 hidden md:block">
            <Link to="/" className="font-bold md:font-extrabold text-2xl">
              <h1 className="font-bold md:font-extrabold text-2xl text-orange-600 hover:text-orange-700 transition-colors">
                Foody
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8 py-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleProtectedRoute("/order/status")}
                  className="text-gray-700 hover:text-orange-600 transition duration-300 ease-in-out font-medium"
                >
                  Orders
                </button>
                <button
                  onClick={() => handleProtectedRoute("/profile")}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition duration-300 ease-in-out font-medium"
                >
                  Profile
                  <User className="w-4 h-4" />
                </button>
                {!user?.admin && (
                  <button
                    onClick={() => handleProtectedRoute("/admin-access")}
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition duration-300 ease-in-out font-medium"
                  >
                    Become Admin
                    <Crown className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : null}
            
            {isAuthenticated && user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer text-gray-700 hover:text-orange-600 transition duration-300 ease-in-out font-medium">
                    Admin Panel
                  </MenubarTrigger>
                  <MenubarContent className="bg-white shadow-lg border border-gray-200">
                    <Link to="/admin/restaurant">
                      <MenubarItem className="hover:bg-orange-50 cursor-pointer">Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem className="hover:bg-orange-50 cursor-pointer">Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem className="hover:bg-orange-50 cursor-pointer">Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (
              <button onClick={handleCartClick} className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cart?.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 bg-red-500 text-white flex items-center justify-center font-medium">
                    {cart?.length}
                  </span>
                )}
              </button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hover:bg-gray-100">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem onClick={() => setTheme('light')} className="hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer">Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer">Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  setTheme(systemTheme);
                }} className="hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer">System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-md px-6 py-2 shadow-md text-base transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-md px-6 py-2 shadow-md text-base transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <Avatar className="relative w-10 h-10 border-2 border-orange-200 rounded-full">
                  <AvatarImage src={user?.profilePicture} alt="profilePhoto" className="w-full h-full object-cover rounded-full" />
                  <AvatarFallback className="text-sm font-bold bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    {user?.fullname?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {loading ? (
                    <Button disabled className="bg-orange-600 hover:bg-orange-700">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait
                    </Button>
                  ) : (
                    <Button onClick={logout} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all">
                      Logout
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="md:hidden lg:hidden flex justify-between w-full px-4">
            <Link to="/" className="font-bold text-2xl text-orange-600">
              Foody
            </Link>
            <MobileNavbar />
          </div>
        </div>
      </nav>
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        actionType={authModalType}
      />
    </>
  );
};

export default NavBar;

const MobileNavbar = () => {
  const { user, loading, logout, isAuthenticated } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState<"cart" | "admin" | "general">("general");
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setAuthModalType("cart");
      setShowAuthModal(true);
      return;
    }
    navigate("/cart");
  };

  const handleProtectedRoute = (route: string) => {
    if (!isAuthenticated) {
      setAuthModalType("general");
      setShowAuthModal(true);
      return;
    }
    navigate(route);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="px-4 py-3 rounded-md outline-none transform active:scale-75 transition-transform">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white dark:bg-gray-800 transition-colors">
          <SheetHeader className="flex flex-row item-center justify-between">
            <SheetTitle className="text-xl font-bold text-orange-600 dark:text-orange-400">Foody</SheetTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hover:bg-gray-100">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem onClick={() => setTheme('light')} className="hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer">Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer">Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  setTheme(systemTheme);
                }} className="hover:bg-orange-50 dark:hover:bg-orange-900 cursor-pointer">System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetHeader>

          <Separator className="my-4" />
          <SheetDescription className="flex-1">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleProtectedRoute("/profile")}
                  className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium w-full text-left mb-2"
                >
                  <User />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => handleProtectedRoute("/order/status")}
                  className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium w-full text-left mb-2"
                >
                  <HandPlatter />
                  <span>Orders</span>
                </button>
                {!user?.admin && (
                  <button
                    onClick={() => handleProtectedRoute("/admin-access")}
                    className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium w-full text-left mb-2"
                  >
                    <Crown />
                    <span>Become Admin</span>
                  </button>
                )}
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium">
                  <User />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium">
                  <User />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
            
            
            {isAuthenticated && (
              <button
                onClick={handleCartClick}
                className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium w-full text-left mb-2"
              >
                <ShoppingCart />
                <span>Cart({cart?.length || 0})</span>
              </button>
            )}
            
            {isAuthenticated && user?.admin && (
              <>
                <Link to="/admin/menu" className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium mb-2">
                  <SquareMenu />
                  <span>Menu</span>
                </Link>
                <Link to="/admin/restaurant" className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium mb-2">
                  <UtensilsCrossed />
                  <span>Restaurant</span>
                </Link>
                <Link to="/admin/orders" className="flex item-center gap-4 hover:bg-orange-50 px-3 py-3 rounded-lg cursor-pointer hover:text-orange-600 font-medium mb-2">
                  <PackageCheck />
                  <span>Restaurant Orders</span>
                </Link>
              </>
            )}
          </SheetDescription>
          
          <SheetFooter className="flex flex-col items-center gap-4 pt-4 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-sm">
                      {user?.fullname?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="font-semibold text-gray-700">{user?.fullname || 'User'}</h1>
                </div>
                <SheetClose asChild>
                  {loading ? (
                    <Button disabled className="bg-orange-600 hover:bg-orange-700 w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait
                    </Button>
                  ) : (
                    <Button onClick={logout} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all w-full">
                      Logout
                    </Button>
                  )}
                </SheetClose>
              </>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <Link to="/login" className="w-full">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Authentication Modal for Mobile */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        actionType={authModalType}
      />
    </>
  );
};
