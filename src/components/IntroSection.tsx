import { Link } from "react-router-dom";
import beautyImg from "@/assets/beautyy.png";
import hairImg from "@/assets/hair-intro.png";

const IntroSection = () => {
  return (
    <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 bg-background px-4 py-6 sm:px-6 lg:grid-cols-2">
      <div className="ks-section-panel relative flex flex-col justify-center rounded-[2rem] bg-secondary px-6 py-4 lg:px-20">
        <h1 className="max-w-xl md:pt-4 pt-8 text-4xl font-extrabold leading-tight text-foreground lg:text-5xl">
          Best Kids Salon & Nail Art Studio in Gurgaon
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          KidSalonia is a dedicated kids salon and nail studio in Sector 67, Gurugram for children's cuts, baby first haircut, mundan, nail art, manicure and pedicure near Airia Mall and JMD Suburbio 2.
        </p>
        <div className="mt-4 flex max-w-xl flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <Link className="text-primary hover:underline" to="/kids-haircut-gurgaon">Kids Haircut Gurgaon</Link>
          <Link className="text-primary hover:underline" to="/nail-art-gurgaon">Nail Art Gurgaon</Link>
          <Link className="text-primary hover:underline" to="/manicure-gurgaon">Manicure</Link>
          <Link className="text-primary hover:underline" to="/pedicure-gurgaon">Pedicure</Link>
          <Link className="text-primary hover:underline" to="/mundan-ceremony-gurgaon">Mundan</Link>
        </div>
        <Link to="/book">
          <span className="ks-button-3d relative z-10 mt-6 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">
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
      <div className="ks-image-frame relative h-96 w-full bg-background sm:h-80 md:h-96 lg:h-full">
        <img
          src={hairImg}
          alt="Children's cuts at KidSalonia kids salon in Sector 67 Gurgaon"
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
};

export default IntroSection;
