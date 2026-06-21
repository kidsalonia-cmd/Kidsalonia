import ServiceItem from "./ServiceItem";
import softcareImg from "@/assets/softcare.png";
import skinIconImg from "@/assets/skin-icon.png";

const skinServices = [
  { name: "KIDS PARTY MAKEUP (CLASSIC)", description: "Light, playful makeup for birthdays and celebrations.", price: "₹ 499" },
  { name: "KIDS CRYSTAL JELLY MANICURE", description: "Delicate hand care designed especially for kids.", price: "₹ 499" },
  { name: "KIDS CRYSTAL JELLY PEDICURE", description: "Fun and relaxing foot care with gentle products.", price: "₹ 599" },
  { name: "KIDS OCCASIONAL MAKEUP", description: "Soft, natural makeup for events and special occasions.", price: "₹ 799" },
];

const SkinSection = () => {
  return (
    <section id="skin" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[350px] lg:min-h-full w-full">
          <img
            src={softcareImg}
            alt="Kids facial care"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative flex justify-center">
          <div className="w-full max-w-2xl px-6 py-12">
            <div className="relative flex items-start justify-between">
              <h2 className="text-4xl text-primary font-bold leading-tight mb-2">
                Soft Care For
                <br />
                Little Skin
              </h2>
              <div className="hidden lg:block absolute top-0 right-0">
                <img
                  src={skinIconImg}
                  alt="Kids Salon"
                  className="w-56 h-auto object-contain"
                />
              </div>
            </div>
            <p className="text-foreground mb-8 max-w-md">
              Gentle, Kid-Safe Skin And Makeup Services Designed For Comfort, Care, And Special Moments.
            </p>
            <div className="space-y-0">
              {skinServices.map((service) => (
                <ServiceItem key={service.name} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkinSection;
