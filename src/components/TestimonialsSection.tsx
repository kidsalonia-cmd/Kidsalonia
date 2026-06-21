import { Star } from "lucide-react";
import girlImg from "@/assets/girl-testimonial.png";

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
    <section className="bg-[hsl(0,0%,97%)] py-16 lg:py-24">
      {/* Hero Image */}
      <div className="w-full px-6 lg:px-28 mb-12">
        <div className="w-full aspect-[16/7] overflow-hidden rounded-2xl">
          <img
            src={girlImg}
            alt="Happy kids at KidSalonia salon"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center px-6 mb-12">
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
      <div className="px-6 lg:px-28 grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 lg:p-8 shadow-[0_1px_3px_hsl(0,0%,0%,0.06),0_4px_12px_hsl(0,0%,0%,0.04)] hover:shadow-[0_2px_6px_hsl(0,0%,0%,0.08),0_8px_24px_hsl(0,0%,0%,0.06)] transition-shadow duration-300"
          >
            <StarRating rating={review.rating} />
            <p className="text-foreground text-base lg:text-lg leading-relaxed mt-4 mb-6">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                {review.initials}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">Verified Parent</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
