import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - Fixed positioning */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </header>
      {/* Main Content - Add top padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
