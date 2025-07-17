import HeroSection from "./ui/HeroSection";
import FeaturedSection from "./FeaturedSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Restaurants and Dishes Section */}
      <FeaturedSection />
    </div>
  );
};

export default HomePage;
