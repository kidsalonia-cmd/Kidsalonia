import { Star } from "lucide-react";
import girlImg from "@/assets/girl-testimonial.png";
import TiltCard from "@/components/TiltCard";
import KidsStickers from "@/components/KidsStickers";

const reviews = [
  {
    text: "Absolutely loved the experience! The staff was super friendly and my child felt very comfortable. Highly recommended!",
    name: "Vinay Battoo",
    rating: 5,
    initials: "VB",
  },
  {
    text: "Loved the service — my kid was so comfortable, and the staff was super friendly. Will definitely come back!",
    name: "Priya Sharma",
    rating: 5,
    initials: "PS",
  },
  {
    text: "Best salon for kids in Gurugram! My daughter loves going here. The stylists are so patient and skilled.",
    name: "Anita Mehta",
    rating: 5,
    initials: "AM",
  },
  {
    text: "Such a fun and safe environment for children. My son actually enjoyed his haircut for the first time!",
    name: "Rahul Kapoor",
    rating: 4,
    initials: "RK",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[hsl(0,0%,97%)] py-16 lg:py-24">
      <KidsStickers items={[
        { id: "testimonials-speech", icon: "speech", size: 62, animation: "float", delay: -1, position: { left: "2%", top: "48%" }, className: "hidden lg:block" },
        { id: "testimonials-smile", icon: "smile", size: 54, animation: "bounce", delay: -2.5, position: { right: "3%", bottom: "8%" }, className: "hidden md:block", opacity: 0.78 },
      ]} />
      {/* Hero Image */}
      <div className="relative z-10 w-full px-6 lg:px-28 mb-12">
        <div className="ks-image-frame w-full aspect-[16/7] overflow-hidden rounded-2xl">
          <img
            src={girlImg}
            alt="Happy kids at KidSalonia salon"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center px-6 mb-12">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
          What Parents Say
        </p>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground">
          One of the best family salons in Gurgaon trusted by 500+ happy families.
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_42x16dp.png"
            alt="Google"
            className="h-4"
          />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-medium">4.9 Rating</span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="relative z-10 px-6 lg:px-28 grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <TiltCard
            key={i}
            maxTilt={3}
            className="ks-depth-surface ks-shine rounded-xl bg-white p-6 lg:p-8"
          >
            <span aria-hidden="true" className="absolute right-6 top-2 text-6xl font-black text-primary/10">&ldquo;</span>
            <StarRating rating={review.rating} />
            <p className="text-foreground text-base lg:text-lg leading-relaxed mt-4 mb-6">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="ks-raised-icon w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                {review.initials}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">Verified Parent</p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
