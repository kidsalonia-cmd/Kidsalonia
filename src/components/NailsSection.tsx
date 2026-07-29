import { Link } from "react-router-dom";
import ServiceItem from "./ServiceItem";
import kidsNailsImg from "@/assets/kids-nails.png";
import adultNailsImg from "@/assets/adult-nails.png";
import artnailImg from "@/assets/artnail.png";
import KidsStickers from "@/components/KidsStickers";

const kidsNailServices = [
  { name: "NAIL POLISH FEET", description: "Fun, sparkly, and perfect for little hands and feet.", price: "₹ 99" },
  { name: "NAIL POLISH HANDS", description: "Cute nail treatments designed just for kids.", price: "₹ 99" },
  { name: "FRENCH NAIL POLISH HANDS", description: "Add a touch of sparkle to their tiny nails.", price: "₹ 199" },
  { name: "FRENCH NAIL POLISH FEET", description: "Little nails, big style.", price: "₹ 199" },
  { name: "KIDS NAIL ART", description: "Safe, colorful, and full of fun.", price: "₹ 399" },
];

const adultNailServices = [
  { name: "NAILS EXTENSION", description: "Stylish extensions for special occasions.", price: "₹ 1,800" },
  { name: "GEL OVERLAY", description: "Smooth gel finish over natural nails.", price: "₹ 1,600" },
  { name: "NAILS REFILL", description: "Refresh and maintain existing nail extensions.", price: "₹ 1,500" },
  { name: "FRENCH ON NATURAL NAILS", description: "Classic French look with a clean finish.", price: "₹ 1,200" },
  { name: "OMBRE / CAT EYE", description: "Trendy ombre and cat-eye nail designs.", price: "₹ 1,000" },
  { name: "CHROME", description: "Glossy chrome nail finish.", price: "₹ 1,000" },
  { name: "MARBLE", description: "Soft marble-style nail art.", price: "₹ 800" },
  { name: "GEL PAINT ON NATURAL NAILS", description: "Bright gel colours on natural nails.", price: "₹ 800" },
  { name: "GLITTER ART", description: "Sparkly nail designs.", price: "₹ 800" },
  { name: "MULTICOLOUR FRENCH", description: "Colourful twist on classic French nails.", price: "₹ 500" },
  { name: "EXTENSION REMOVAL", description: "Careful removal of nail extensions.", price: "₹ 500" },
  { name: "PAINT REMOVAL", description: "Safe and gentle nail paint removal.", price: "₹ 350" },
  { name: "FRENCH ART", description: "Creative French nail variations.", price: "₹ 300" },
  { name: "NAIL REPAIR", description: "Quick fix for chipped or broken nails.", price: "₹ 250" },
  { name: "3D ART ON NAILS (PER NAIL ONWARD)", description: "Fun 3D nail decorations.", price: "₹ 200" },
  { name: "BOW SET (PER PAIR)", description: "Cute bow accessories for nails.", price: "₹ 200 – 300" },
  { name: "BRUSH ART (PER NAIL ONWARDS)", description: "Hand-painted nail designs.", price: "₹ 100" },
  { name: "RHINESTONE (PER PIECE)", description: "Add sparkle with rhinestones.", price: "₹ 20 – 50" },
];

const NailsSection = () => {
  return (
    <section id="nails" className="relative isolate overflow-hidden bg-background py-4 sm:py-8">
      <KidsStickers items={[
        { id: "nails-unicorn", icon: "unicorn", size: 70, animation: "bounce", delay: -1, position: { left: "2%", top: "8%" }, className: "hidden lg:block" },
        { id: "nails-rainbow", icon: "rainbow", size: 68, animation: "float", delay: -2, position: { right: "2%", bottom: "8%" }, className: "hidden md:block" },
        { id: "nails-sparkles", icon: "sparkles", size: 38, animation: "rotate", delay: -3, position: { right: "3%", top: "25%" }, opacity: 0.75 },
      ]} />
      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-2">
        <div className="ks-section-panel flex justify-center rounded-[2rem]">
          <div className="w-full py-12 max-w-2xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              A Little Magic For{" "}
              <span className="block">
                MOM & HER GIRL{" "}
                <span className="italic">Nails</span>
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From cute cuts to party-ready glam, we offer gentle, safe, and stylish services designed especially for kids.
            </p>
            <Link to="/book?service=nail-art">
              <span className="ks-button-3d mt-6 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">
                Book
              </span>
            </Link>

            {/* Kids Nails */}
            <div className="mt-12">
              <img src={kidsNailsImg} alt="Kids Nails" className="w-full" />
            </div>
            <div className="mt-6 space-y-0 pt-6">
              {kidsNailServices.map((service) => (
                <ServiceItem key={service.name} {...service} />
              ))}
            </div>

            {/* Adult Nails */}
            <div className="mt-8">
              <img src={adultNailsImg} alt="Adult Nails" className="w-full" />
            </div>
            <div className="mt-4 space-y-0 pt-6">
              {adultNailServices.map((service) => (
                <ServiceItem key={service.name} {...service} />
              ))}
            </div>
          </div>
        </div>

        <div className="ks-image-frame relative min-h-[800px] w-full lg:min-h-full">
          <img
            alt="Nail Art"
            className="object-cover absolute inset-0 w-full h-full"
            src={artnailImg}
          />
        </div>
      </div>
    </section>
  );
};

export default NailsSection;
