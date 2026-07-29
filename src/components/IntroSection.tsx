import { Link } from "react-router-dom";
import beautyImg from "@/assets/beautyy.png";
import hairImg from "@/assets/hair-intro.png";

const IntroSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative flex flex-col justify-center bg-secondary px-6 py-4 lg:px-20">
        <h1 className="max-w-xl md:pt-4 pt-8 text-4xl font-extrabold leading-tight text-foreground lg:text-5xl">
          Best Kids Salon & Nail Art Studio in Gurgaon
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          KidSalonia is a trusted kids salon, hairdresser and nail studio in Gurugram for kids haircuts, baby first haircut, mundan, nail art, manicure, pedicure and family salon services near Airia Mall and JMD Suburbio 2.
        </p>
        <Link to="/book">
          <span className="relative z-10 mt-6 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90 transition">
            Book
          </span>
        </Link>
        <div className="hidden lg:block absolute bottom-0 left-0 h-44 w-full px-4">
          <img
            src={beautyImg}
            alt="Kids nail art, manicure and pedicure at KidSalonia Gurgaon"
            className="mx-auto w-auto h-[160px] object-contain"
          />
        </div>
      </div>
      <div className="relative bg-background h-96 sm:h-80 md:h-96 lg:h-full w-full">
        <img
          src={hairImg}
          alt="Child-friendly kids salon and hairdresser in Gurgaon"
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
};

export default IntroSection;
