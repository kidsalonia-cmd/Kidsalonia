import { useState } from "react";

import TiltCard from "@/components/TiltCard";
import KidsStickers from "@/components/KidsStickers";
import gallery11 from "@/assets/gallery/gallery-11.png";
import gallery12 from "@/assets/gallery/gallery-12.png";
import gallery13 from "@/assets/gallery/gallery-13.png";
import gallery14 from "@/assets/gallery/gallery-14.png";
import gallery5 from "@/assets/gallery/gallery-5.png";
import gallery16 from "@/assets/gallery/gallery-16.jpg";
import gallery17 from "@/assets/gallery/gallery-17.png";
import gallery18 from "@/assets/gallery/gallery-18.png";
import gallery19 from "@/assets/gallery/gallery-19.png";
import gallery20 from "@/assets/gallery/gallery-20.png";
import gallery21 from "@/assets/gallery/gallery-21.jpeg";
import gallery22 from "@/assets/gallery/gallery-22.jpeg";
import gallery23 from "@/assets/gallery/gallery-23.jpeg";
import gallery24 from "@/assets/gallery/gallery-24.png";
import gallery25 from "@/assets/gallery/gallery-25.png";
import gallery26 from "@/assets/gallery/gallery-26.png";
import gallery27 from "@/assets/gallery/gallery-27.png";

type Category = "All" | "Hair" | "Nails" | "Salon";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

const galleryImages: GalleryImage[] = [
  { src: gallery11, alt: "Kids bob haircut styling at KidSalonia Gurugram", category: "Hair" },
  { src: gallery12, alt: "Elegant nail art and nail extensions at KidSalonia", category: "Nails" },
  { src: gallery13, alt: "Kids crown braid hairstyle at KidSalonia salon", category: "Hair" },
  { src: gallery14, alt: "Boys trendy fade haircut at KidSalonia kids salon", category: "Hair" },
  { src: gallery5, alt: "KidSalonia premium salon interior and hair wash station", category: "Salon" },
  { src: gallery16, alt: "Happy kid at KidSalonia salon Gurugram with thumbs up", category: "Salon" },
  { src: gallery17, alt: "Girls curly blowout hairstyle at KidSalonia", category: "Hair" },
  { src: gallery18, alt: "Little girl party hairstyle at KidSalonia premium kids salon", category: "Hair" },
  { src: gallery19, alt: "Cute character nail art for kids at KidSalonia", category: "Nails" },
  { src: gallery20, alt: "Kids haircut in progress at KidSalonia family salon", category: "Salon" },
  { src: gallery21, alt: "Girl with fresh bob haircut at KidSalonia Gurugram", category: "Hair" },
  { src: gallery22, alt: "Pink glossy nail extension look at KidSalonia nails studio", category: "Nails" },
  { src: gallery23, alt: "Kids manicure results with soft pink polish at KidSalonia", category: "Nails" },
  { src: gallery24, alt: "Boy haircut session with parent at KidSalonia salon", category: "Hair" },
  { src: gallery25, alt: "Happy child haircut transformation at KidSalonia", category: "Hair" },
  { src: gallery26, alt: "Kids pink nail art design at KidSalonia Gurugram", category: "Nails" },
  { src: gallery27, alt: "Kids shampoo and hair wash service at KidSalonia", category: "Salon" },
];

const categories: Category[] = ["All", "Hair", "Nails", "Salon"];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="relative isolate overflow-hidden bg-background py-16">
      <KidsStickers items={[
        { id: "gallery-camera", icon: "camera", size: 58, animation: "rotate", delay: -1, position: { left: "3%", top: "8%" }, className: "hidden md:block" },
        { id: "gallery-stars", icon: "stars", size: 42, animation: "float", delay: -2, position: { right: "3%", top: "12%" }, opacity: 0.75 },
        { id: "gallery-bubbles", icon: "bubbles", size: 52, animation: "bounce", delay: -3, position: { right: "2%", bottom: "5%" }, className: "hidden lg:block", opacity: 0.6 },
      ]} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Our Gallery
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Explore our work across hair styling, nail art, and our premium salon space — all designed for kids.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`ks-button-3d rounded-full px-6 py-2.5 text-sm font-semibold ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {filteredImages.map((img, i) => (
            <TiltCard
              key={`${img.alt}-${i}`}
              maxTilt={2.5}
              className="ks-image-frame aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
