import HeroSection from "./ui/HeroSection";
import FeaturedSection from "./FeaturedSection";
import AdminPromoBanner from "./AdminPromoBanner";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Admin Promotion Banner */}
      <AdminPromoBanner />
      
      {/* Featured Restaurants and Dishes Section */}
      <FeaturedSection />
    </div>
  );
};

export default HomePage;
