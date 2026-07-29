import ServiceItem from "./ServiceItem";
import softcareImg from "@/assets/softcare.png";
import skinIconImg from "@/assets/skin-icon.png";
import KidsStickers from "@/components/KidsStickers";

const skinServices = [
  { name: "KIDS PARTY MAKEUP (CLASSIC)", description: "Light, playful makeup for birthdays and celebrations.", price: "₹ 499" },
  { name: "KIDS CRYSTAL JELLY MANICURE", description: "Delicate hand care designed especially for kids.", price: "₹ 499" },
  { name: "KIDS CRYSTAL JELLY PEDICURE", description: "Fun and relaxing foot care with gentle products.", price: "₹ 599" },
  { name: "KIDS OCCASIONAL MAKEUP", description: "Soft, natural makeup for events and special occasions.", price: "₹ 799" },
];

const SkinSection = () => {
  return (
    <section id="skin" className="relative isolate overflow-hidden bg-background py-4 sm:py-8">
      <KidsStickers items={[
        { id: "skin-flowers", icon: "flowers", size: 58, animation: "rotate", delay: -2, position: { left: "2%", top: "12%" }, className: "hidden lg:block" },
        { id: "skin-stars", icon: "stars", size: 44, animation: "float", delay: -3, position: { right: "2%", top: "38%" }, opacity: 0.7 },
        { id: "skin-panda", icon: "panda", size: 64, animation: "bounce", delay: -1, position: { right: "3%", bottom: "5%" }, className: "hidden md:block" },
      ]} />
      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-2">
        <div className="ks-image-frame relative min-h-[350px] w-full lg:min-h-full">
          <img
            src={softcareImg}
            alt="Kids facial care"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ks-section-panel relative flex justify-center rounded-[2rem]">
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
