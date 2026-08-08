import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import KidsStickers from "@/components/KidsStickers";

const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent(
  "Hi KidSalonia! I would like to book a salon appointment for my child. Please share the available timings.",
)}`;

const HERO_VIDEO = `https://raw.githubusercontent.com/kidsalonia-cmd/Kidsalonia/main/${encodeURIComponent(
  "Splash, snip, smile! 🫧✂️😊A refreshing head wash followed by a stylish haircut—the perfect pamp.mp4",
)}`;

const HeroBanner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff8fb] via-white to-[#eef9ff]">
      <div className="pointer-events-none absolute left-[-8rem] top-12 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-7rem] top-20 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <KidsStickers
        items={[
          { id: "hero-rainbow", icon: "rainbow", size: 92, animation: "float", delay: -1, position: { right: "3%", bottom: "6%" }, className: "hidden sm:block" },
          { id: "hero-cloud", icon: "cloud", size: 72, animation: "bounce", delay: -2.5, position: { left: "2%", top: "9%" }, opacity: 0.7 },
          { id: "hero-balloons", icon: "balloons", size: 78, animation: "float", delay: -3, position: { right: "5%", top: "8%" }, className: "hidden xl:block" },
        ]}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-20 lg:min-h-[680px] lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:py-20">
        <div className="max-w-2xl pt-2 lg:pt-0">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur sm:text-sm">
            <Sparkles size={16} className="text-orange-400" />
            A Fresh Kids-First Salon Experience
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
            Haircuts, Smiles &amp; Happy Memories—Made for Kids
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Real salon moments, trained kids specialists and a colourful environment for haircuts, mundan, nail art and family grooming in Gurugram.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-700">
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <CheckCircle2 size={16} className="text-emerald-500" /> 1500+ Happy Kids
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <ShieldCheck size={16} className="text-sky-500" /> Safe &amp; Hygienic
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <Star size={16} className="text-yellow-500" fill="currentColor" /> Kids Specialists
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ks-button-3d inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-base font-extrabold text-white hover:bg-[#20bd5a]"
            >
              <MessageCircle size={21} /> Book on WhatsApp
            </a>

            <Link
              to="/book"
              className="ks-button-3d inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-extrabold text-primary-foreground hover:opacity-90"
            >
              <CalendarDays size={21} /> Book Appointment
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-slate-500">
            <PlayCircle size={19} className="shrink-0 text-primary" />
            Now featuring real KidSalonia salon moments on the website.
          </div>
        </div>

        <div className="mx-auto w-full max-w-[570px] lg:justify-self-end">
          <div className="overflow-hidden rounded-[2.25rem] border-[8px] border-white bg-slate-950 shadow-2xl shadow-pink-200/60">
            <div className="relative mx-auto max-w-[430px] bg-slate-950">
              <video
                src={HERO_VIDEO}
                className="aspect-[9/12] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Real KidSalonia kids haircut experience"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 pt-20 text-white">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-300">Inside KidSalonia</p>
                <p className="mt-2 text-2xl font-black">Splash. Snip. Smile.</p>
                <p className="mt-1 text-sm text-white/80">A real salon moment from our Gurugram studio.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-white/95 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">Real Experience</p>
              <p className="mt-1 text-sm font-bold text-slate-800">Head wash + stylish haircut</p>
            </div>
            <div className="rounded-2xl border bg-white/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-2 text-primary">
                <Star size={16} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.12em]">Kids-first comfort</span>
              </div>
              <p className="mt-1 text-sm leading-5 text-slate-600">Easier, happier and more memorable salon visits.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
