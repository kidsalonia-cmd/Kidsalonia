import { Link } from "react-router-dom";
import heroBanner from "@/assets/navratri-banner-desktop.jpg";

const HeroBanner = () => {
  return (
    <section className="w-full relative">
      {/* Desktop Banner */}
      <div className="hidden lg:block relative w-full">
        <img
          alt="Kids salon, nail art, manicure and pedicure offers at KidSalonia Gurgaon"
          className="w-full h-auto block"
          src={heroBanner}
        />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" >
            <button className="bg-accent hover:opacity-90 text-primary-foreground font-bold px-10 py-4 text-lg shadow-md transition duration-200">
              Book Now
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="block lg:hidden relative w-full">
        <img
          alt="Kids salon, nail art, manicure and pedicure offers at KidSalonia Gurgaon"
          className="w-full h-auto block"
          src={heroBanner}
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" >
            <button className="bg-accent hover:opacity-90 text-primary-foreground font-bold px-6 py-2 text-base shadow-md transition duration-200 whitespace-nowrap">
              Book Now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
