import { Link } from "react-router-dom";
import { PlayCircle, Scissors, Sparkles, Star } from "lucide-react";

const RAW_BASE = "https://raw.githubusercontent.com/kidsalonia-cmd/Kidsalonia/main/";
const videoUrl = (fileName: string) => `${RAW_BASE}${encodeURIComponent(fileName)}`;

const experiences = [
  {
    title: "Wash, Snip & Smile",
    subtitle: "A real kids haircut experience",
    description:
      "A refreshing head wash followed by a stylish haircut in a calm, colourful setting designed for children.",
    fileName:
      "Splash, snip, smile! 🫧✂️😊A refreshing head wash followed by a stylish haircut—the perfect pamp.mp4",
    href: "/kids-haircut-gurgaon",
    icon: Scissors,
  },
  {
    title: "Mundan Day Magic",
    subtitle: "A special family milestone",
    description:
      "See how KidSalonia turns a traditional mundan into a cleaner, calmer and more comfortable experience for families.",
    fileName:
      "Mundan day magic at Kidsalonia ✨📍 Location- A-19, Ground Floor, JMD Suburbio 2, Opposite Airia .mp4",
    href: "/mundan-gurgaon",
    icon: Sparkles,
  },
  {
    title: "Little Moments, Big Memories",
    subtitle: "The KidSalonia experience",
    description:
      "From nervous little faces to bright smiles, these are the real moments that make a kids-first salon feel different.",
    fileName:
      "Some childhood moments deserve to be remembered forever. ❤️From nervous little faces to the brig.mp4",
    href: "/gallery",
    icon: Star,
  },
];

const RealExperiencesSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/60 to-orange-50 py-16 md:py-24">
      <div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
            <PlayCircle size={18} /> Real KidSalonia Experiences
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Real Kids. Real Smiles. Real Salon Moments.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            A fresh look at what actually happens inside KidSalonia—from haircuts and mundan to the little moments parents remember.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <article
                key={experience.title}
                className={`group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-pink-100/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  index === 1 ? "lg:-translate-y-4" : ""
                }`}
              >
                <div className="relative aspect-[9/13] overflow-hidden bg-slate-950">
                  <video
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    src={videoUrl(experience.fileName)}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={experience.title}
                  />
                  <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur">
                    <Icon size={15} /> {experience.subtitle}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black text-foreground">{experience.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{experience.description}</p>
                  <Link
                    to={experience.href}
                    className="mt-5 inline-flex items-center gap-2 font-extrabold text-primary transition hover:gap-3"
                  >
                    Explore this experience <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RealExperiencesSection;
