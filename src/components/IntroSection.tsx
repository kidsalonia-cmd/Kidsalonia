import { Link } from "react-router-dom";
import beautyImg from "@/assets/beautyy.png";
import hairImg from "@/assets/hair-intro.png";

const IntroSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative flex flex-col justify-center bg-secondary px-6 py-4 lg:px-20">
        <h1 className="max-w-xl md:pt-4 pt-8 text-4xl font-extrabold leading-tight text-foreground lg:text-5xl">
          Kids Salon in Gurgaon – Haircuts, Nail Art & Skin for Kids | KidSalonia
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          A Premium Kids & Family Salon in Gurgaon for Kids, Women and Parents Offering Gentle Haircuts, Nail Art, Styling and Safe Self-Care Experiences in a Comfortable Environment
        </p>
        <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" >
          <button className="relative z-10 mt-6 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90 transition">
            Book
          </button>
        </a>
        <div className="hidden lg:block absolute bottom-0 left-0 h-44 w-full px-4">
          <img
            src={beautyImg}
            alt="Beauty"
            className="mx-auto w-auto h-[160px] object-contain"
          />
        </div>
      </div>
      <div className="relative bg-background h-96 sm:h-80 md:h-96 lg:h-full w-full">
        <img
          src={hairImg}
          alt="Kids Salon"
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
};

export default IntroSection;
