import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import heroBanner from "@/assets/navratri-banner-desktop.jpg";
import KidsStickers from "@/components/KidsStickers";
import TiltCard from "@/components/TiltCard";

const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent(
  "Hi KidSalonia! I would like to book a salon appointment for my child. Please share the available timings.",
)}`;

const HeroBanner = () => {
  return (
    <section className="ks-perspective ks-shine relative isolate overflow-hidden bg-slate-950">
      <img
        src={heroBanner}
        alt="KidSalonia kids salon services in Gurgaon"
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

      <KidsStickers
        items={[
          { id: "hero-rainbow", icon: "rainbow", size: 94, animation: "float", delay: -1, position: { right: "4%", bottom: "6%" }, className: "hidden sm:block" },
          { id: "hero-cloud", icon: "cloud", size: 76, animation: "bounce", delay: -2.5, position: { left: "3%", top: "9%" }, opacity: 0.82 },
          { id: "hero-balloons", icon: "balloons", size: 82, animation: "float", delay: -3, position: { right: "8%", top: "9%" }, className: "hidden lg:block" },
          { id: "hero-sparkle-one", icon: "sparkles", size: 32, animation: "bounce", delay: -0.5, position: { left: "38%", top: "8%" }, className: "kids-sticker-particle hidden sm:block" },
          { id: "hero-sparkle-two", icon: "sparkles", size: 22, animation: "bounce", delay: -2, position: { left: "46%", bottom: "13%" }, className: "kids-sticker-particle hidden md:block", opacity: 0.72 },
          { id: "hero-sparkle-three", icon: "sparkles", size: 18, animation: "bounce", delay: -3.5, position: { right: "34%", top: "27%" }, className: "kids-sticker-particle hidden lg:block", opacity: 0.65 },
        ]}
      />

      <div className="hidden" aria-hidden="true">
        <span className="absolute left-[5%] top-[12%] animate-pulse text-2xl opacity-70">⭐</span>
        <span className="absolute left-[32%] top-[9%] text-xl opacity-70">✨</span>
        <span className="absolute right-[14%] top-[14%] text-3xl opacity-70">🎈</span>
        <span className="absolute bottom-[12%] right-[8%] text-2xl opacity-60">🌈</span>
        <span className="absolute bottom-[18%] left-[42%] text-xl opacity-60">🫧</span>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-20">
        <div className="max-w-3xl text-white">
          <div className="ks-glass-panel mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] sm:text-sm">
            <Sparkles size={16} className="text-yellow-300" />
            Gurgaon&apos;s Favourite Kids Salon
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
            A Happy, Safe &amp; Fun Salon Experience for Every Child
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            Child-friendly haircuts, nail art, grooming and first-haircut experiences delivered by trained kids specialists in a colourful, hygienic salon.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-white/95">
            <span className="ks-glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2">
              <CheckCircle2 size={16} className="text-emerald-300" /> 1500+ Happy Kids
            </span>
            <span className="ks-glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2">
              <ShieldCheck size={16} className="text-sky-300" /> Safe &amp; Hygienic
            </span>
            <span className="ks-glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2">
              <Star size={16} className="text-yellow-300" fill="currentColor" /> Kids Specialists
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

          <p className="mt-4 text-xs font-medium text-white/70 sm:text-sm">
            Haircuts • Nail Art • Grooming • First Haircut • Birthday Makeovers
          </p>
        </div>

        <div className="hidden justify-self-end lg:block">
          <TiltCard maxTilt={3} className="ks-glass-panel ks-shine w-full max-w-sm rounded-[2rem] p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-300">
              Why Parents Choose KidSalonia
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-inner">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
                  <CheckCircle2 size={20} className="text-emerald-300" />
                </div>
                <div>
                  <p className="font-extrabold">1500+ Happy Kids</p>
                  <p className="mt-1 text-sm leading-5 text-white/75">
                    Trusted by families for joyful, stress-free salon visits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-inner">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-400/20">
                  <ShieldCheck size={20} className="text-sky-300" />
                </div>
                <div>
                  <p className="font-extrabold">Safe &amp; Hygienic</p>
                  <p className="mt-1 text-sm leading-5 text-white/75">
                    Child-friendly products, clean tools and careful service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-inner">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400/20">
                  <Star size={20} className="text-yellow-300" fill="currentColor" />
                </div>
                <div>
                  <p className="font-extrabold">Kids Salon Specialists</p>
                  <p className="mt-1 text-sm leading-5 text-white/75">
                    Friendly stylists trained to keep children comfortable.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/book"
              className="ks-button-3d mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-extrabold text-slate-950"
            >
              <CalendarDays size={19} className="text-primary" /> Reserve Your Child&apos;s Slot
            </Link>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
