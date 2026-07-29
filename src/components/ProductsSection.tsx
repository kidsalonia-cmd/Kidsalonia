import strawberryImg from "@/assets/strawberry-product.png";
import yellowNaturalsLogo from "@/assets/yellow-naturals-logo.png";
import lorealLogo from "@/assets/loreal-logo.png";
import tucoKidsLogo from "@/assets/tuco-kids-logo.png";

const highlights = [
  "Gentle & Tear-Free Formula",
  "Easy Detangling",
  "Dermatologically Tested",
  "Soft, Shiny, And Manageable Hair",
  "No Harsh Chemicals",
];

const ProductsSection = () => {
  return (
    <section>
      {/* Products Content */}
      <div className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="ks-depth-surface ks-shine flex justify-center p-8">
            <img
              src={strawberryImg}
              alt="Kids Shampoo Products"
              className="w-72 lg:w-96 h-auto object-contain"
            />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Kids-Safe Care Essentials
            </h2>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed lg:text-center">
              Specially Designed For Delicate Young Hair, L'Oréal Kids, Yellow
              Naturals Products Are Mild, Tear-Free, And Nourishing — Making Hair
              Care Easy, Safe, And Fun.
            </p>
            <h3 className="font-bold text-foreground text-lg mb-4 text-left">Key Highlights</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-foreground flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logos Bar */}
      <div className="bg-[hsl(40,100%,55%)] py-10">
        <div className="ks-inset-panel max-w-5xl mx-auto flex items-center justify-around rounded-3xl px-6 py-5">
          <img
            src={yellowNaturalsLogo}
            alt="Yellow Naturals"
            className="h-12 lg:h-16 object-contain"
          />
          <img
            src={lorealLogo}
            alt="L'Oréal"
            className="h-8 lg:h-10 object-contain"
          />
          <img
            src={tucoKidsLogo}
            alt="Tuco Kids"
            className="h-12 lg:h-16 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
