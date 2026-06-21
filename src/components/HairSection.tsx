import { Link } from "react-router-dom";
import ServiceItem from "./ServiceItem";
import hairPriceImg from "@/assets/hair-newprice.png";
import hairssImg from "@/assets/hairss.png";

const hairServices = [
  { name: "BOYS HAIRCUT", description: "Clean and comfortable cuts for boys of all ages.", price: "₹ 299" },
  { name: "FLAKE FIGHTER TREATMENT", description: "Gentle anti-dandruff care for healthy young scalps.", price: "₹ 349" },
  { name: "HAIR STRAIGHTENING", description: "Smooth, temporary straightening for special occasions.", price: "₹ 399" },
  { name: "HAIR CURLING / CRIMPING", description: "Fun curls and crimps kids love.", price: "₹ 399" },
  { name: "STYLING BLOW DRY", description: "Soft, polished finish for any event.", price: "₹ 399" },
  { name: "LICE BUSTER TREATMENT", description: "Safe and effective treatment to remove lice.", price: "₹ 449" },
  { name: "BOYS HAIRCUT + SHAMPOO + CONDITIONER", description: "Temporary, safe colours for special days.", price: "₹ 449" },
  { name: "KIDS SHAMPOO + CONDITIONER + GEL", description: "Soft cleansing with kid-safe products.", price: "₹ 449" },
  { name: "KIDS PARTY HAIR COLOUR", description: "Temporary, safe colours perfect for parties.", price: "₹ 499" },
  { name: "GIRLS HAIRCUT", description: "Neat, stylish cuts tailored for little girls.", price: "₹ 499" },
  { name: "FULL HEAD SHAVE", description: "Safe and hygienic full head shave for kids.", price: "₹ 699" },
  { name: "MUNDAN CEREMONY", description: "Complete traditional mundan ceremony with utmost care.", price: "₹ 1100" },
  { name: "PARTY HAIR STYLING", description: "Cute and trendy hairstyles for celebrations.", price: "₹ 599" },
  { name: "HAIR OILING (ALMOND / WALNUT)", description: "Nourishing oil massage for strong, healthy hair.", price: "₹ 699" },
  { name: "GIRLS HAIRCUT + SHAMPOO + CONDITIONER", description: "Complete hair care with cut and wash.", price: "₹ 749" },
];

const HairSection = () => {
  return (
    <section id="hair" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full w-full">
          <img
            src={hairPriceImg}
            alt="Kids Haircut"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative flex justify-center">
          <div className="w-full max-w-2xl px-6 py-10">
            <div className="relative flex items-start justify-between">
              <h2 className="text-4xl font-bold text-primary leading-tight">
                Happy Hair,
                <br />
                <span className="text-primary">Happy Kids</span>
              </h2>
              <div className="hidden lg:block absolute top-0 right-0">
                <img
                  src={hairssImg}
                  alt="Kids Salon"
                  className="w-48 h-auto object-contain"
                />
              </div>
            </div>
            <p className="mt-5 text-muted-foreground">
              Gentle Haircuts, Fun Styling and Relaxing Care Designed to Keep Kids Comfortable, Smiling and Looking Their Best.
            </p>
            <p className="mt-3 text-muted-foreground text-sm">
              KidSalonia is a trusted kids and adult salon in Gurugram offering grooming, nail care and styling services for children, women and families.
            </p>
            <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" >
              <button className="mt-6 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90 transition">
                Book
              </button>
            </a>
            <div className="mt-10 divide-y border-t">
              {hairServices.map((service) => (
                <ServiceItem key={service.name} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairSection;
