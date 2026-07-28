import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import weekOneImage from "@/assets/gallery/gallery-16.jpg";
import weekTwoImage from "@/assets/gallery/gallery-19.png";
import weekThreeImage from "@/assets/gallery/gallery-25.png";
import weekFourImage from "@/assets/gallery/gallery-27.png";

const weeklyBanners = [
  {
    image: weekOneImage,
    eyebrow: "Fresh Look Week",
    title: "A Fun New Haircut for Your Little Star",
    description:
      "Book a child-friendly haircut with trained kids stylists in a joyful and hygienic salon.",
    buttonText: "Reserve a Haircut",
    link: "/contact-us",
    alt: "Happy child after a haircut at KidSalonia Gurgaon",
  },
  {
    image: weekTwoImage,
    eyebrow: "Nail Art Week",
    title: "Colourful Nail Art Made for Little Hands",
    description:
      "Explore playful, age-appropriate nail designs created with care at KidSalonia.",
    buttonText: "Book Nail Art",
    link: "/contact-us",
    alt: "Colourful kids nail art at KidSalonia Gurgaon",
  },
  {
    image: weekThreeImage,
    eyebrow: "Makeover Week",
    title: "Make Their Salon Visit Feel Extra Special",
    description:
      "From stylish trims to cheerful makeovers, give your child a salon day to remember.",
    buttonText: "Book a Makeover",
    link: "/contact-us",
    alt: "Child haircut transformation at KidSalonia kids salon",
  },
  {
    image: weekFourImage,
    eyebrow: "Gentle Care Week",
    title: "Relaxing Hair Care in a Kid-Friendly Space",
    description:
      "Enjoy gentle hair wash and grooming services designed to keep children comfortable and smiling.",
    buttonText: "Reserve a Slot",
    link: "/contact-us",
    alt: "Kids shampoo and hair care service at KidSalonia Gurgaon",
  },
];

const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const elapsedDays = Math.floor(
    (date.getTime() - firstDayOfYear.getTime()) / 86400000,
  );

  return Math.ceil((elapsedDays + firstDayOfYear.getDay() + 1) / 7);
};

const getFridayOfferEnd = (date: Date) => {
  const offerEnd = new Date(date);
  const daysUntilFriday = 5 - date.getDay();

  offerEnd.setDate(date.getDate() + daysUntilFriday);
  offerEnd.setHours(21, 0, 0, 0);

  return offerEnd;
};

const formatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const WeeklyBanner = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const weekNumber = getWeekNumber(now);
  const banner = weeklyBanners[(weekNumber - 1) % weeklyBanners.length];
  const day = now.getDay();
  const offerEnd = useMemo(() => getFridayOfferEnd(now), [now.getFullYear(), now.getMonth(), now.getDate()]);
  const isWeekday = day >= 1 && day <= 5 && now.getTime() < offerEnd.getTime();
  const countdown = formatCountdown(offerEnd.getTime() - now.getTime());

  const whatsappMessage = isWeekday
    ? "Hi Kidsalonia! I'd like to book a service using the weekday 15% off offer. Please share the available timings."
    : "Hi Kidsalonia! I'd like to reserve a slot for my child. Please share the available timings.";

  return (
    <section
      aria-label="KidSalonia weekly special"
      className="bg-background px-4 py-6 sm:px-6 lg:px-16"
    >
      <div className="relative mx-auto min-h-[360px] max-w-7xl overflow-hidden rounded-[2rem] shadow-xl sm:min-h-[430px]">
        <img
          src={banner.image}
          alt={banner.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/15" />

        {isWeekday && (
          <div className="absolute right-4 top-4 z-20 rounded-2xl bg-yellow-400 px-5 py-3 text-center text-slate-950 shadow-xl sm:right-8 sm:top-8 sm:px-7 sm:py-4">
            <p className="text-xs font-extrabold uppercase tracking-widest">
              Monday–Friday
            </p>
            <p className="text-2xl font-black sm:text-3xl">15% OFF</p>
            <p className="text-xs font-bold uppercase">All Services</p>
          </div>
        )}

        <div className="relative z-10 flex min-h-[360px] max-w-2xl flex-col justify-center px-6 py-10 text-white sm:min-h-[430px] sm:px-10 lg:px-14">
          <span className="mb-4 w-fit rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground shadow">
            {isWeekday
              ? "Weekday Special · 15% Off All Services"
              : `Weekly Special · Week ${weekNumber}`}
          </span>

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/80">
            {isWeekday ? "Monday to Friday Offer" : banner.eyebrow}
          </p>

          <h2 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {isWeekday ? "Enjoy 15% Off on All Services" : banner.title}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
            {isWeekday
              ? "Visit KidSalonia from Monday to Friday and save 15% on haircuts, nail art, grooming, mundan and all other salon services."
              : banner.description}
          </p>

          {isWeekday && (
            <div className="mt-5 w-fit rounded-2xl border border-white/30 bg-black/30 px-5 py-4 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">
                ⏰ Weekday Offer Ends In
              </p>
              <p className="mt-1 text-xl font-extrabold sm:text-2xl" aria-live="polite">
                {countdown.days} Days {countdown.hours} Hours {countdown.minutes} Minutes {countdown.seconds} Seconds
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={banner.link}
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {isWeekday ? "Claim 15% Off" : banner.buttonText}
            </Link>

            <a
              href={`https://wa.me/918130307036?text=${encodeURIComponent(
                whatsappMessage,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/70 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-foreground"
            >
              WhatsApp Us
            </a>
          </div>

          {isWeekday && (
            <p className="mt-4 text-xs text-white/75">
              Offer ends Friday at 9:00 PM. Terms and conditions may apply.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeeklyBanner;
