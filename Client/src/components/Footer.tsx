const Footer = () => {
    return (
      <footer className="bg-gray-800 text-center text-gray-200 p-4 md:flex md:justify-between md:items-center md:px-10">
        <p className="text-sm md:text-base">
          &copy; 2025 PatelEats. All rights reserved
        </p>
        <div className="md:flex md:gap-4">
          <a href="#" className="text-sm md:text-base hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="text-sm md:text-base hover:text-gray-400">Terms of Service</a>
          <a href="#" className="text-sm md:text-base hover:text-gray-400">Contact Us</a>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  