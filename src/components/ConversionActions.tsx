import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Clock3,
  Copy,
  Gift,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

const PHONE_NUMBER = "+918130307036";
const COUPON_CODE = "KIDS15";
const DEFAULT_WHATSAPP_MESSAGE =
  "Hi KidSalonia, I want to book an appointment. Please share the available timings.";
const OFFER_WHATSAPP_MESSAGE =
  "Hi KidSalonia, I want to claim 15% off on eligible services using coupon KIDS15. I understand that Mundan is excluded. Please share the available weekday timings.";

const createWhatsAppUrl = (message: string) =>
  `https://wa.me/918130307036?text=${encodeURIComponent(message)}`;

const WHATSAPP_URL = createWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

const getFridayOfferEnd = (date: Date) => {
  const end = new Date(date);
  const daysUntilFriday = (5 - date.getDay() + 7) % 7;
  end.setDate(date.getDate() + daysUntilFriday);
  end.setHours(21, 0, 0, 0);
  return end;
};

const getCountdown = (milliseconds: number) => {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60000));
  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  };
};

const ConversionActions = () => {
  const location = useLocation();
  const [now, setNow] = useState(() => new Date());
  const [showOffer, setShowOffer] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  const excludedPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/franchise" ||
    location.pathname === "/hyperrevamp-reporting";

  const offerEnd = useMemo(
    () => getFridayOfferEnd(now),
    [now.getFullYear(), now.getMonth(), now.getDate()],
  );

  const isWeekdayOffer =
    !excludedPage &&
    now.getDay() >= 1 &&
    now.getDay() <= 5 &&
    now.getTime() < offerEnd.getTime();

  const countdown = getCountdown(offerEnd.getTime() - now.getTime());
  const whatsappUrl = createWhatsAppUrl(
    isWeekdayOffer ? OFFER_WHATSAPP_MESSAGE : DEFAULT_WHATSAPP_MESSAGE,
  );

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    setShowOffer(false);
    setDismissed(false);
    setCopied(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isWeekdayOffer || dismissed) return;

    const show = () => setShowOffer(true);
    const pageTimer = window.setTimeout(show, 8000);

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 8 && window.innerWidth >= 768) show();
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.clearTimeout(pageTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [location.pathname, isWeekdayOffer, dismissed]);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (excludedPage) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setShowOffer(true)}
        className="fixed bottom-[9.5rem] right-5 z-[70] hidden items-center gap-2 rounded-full border-2 border-white bg-gradient-to-r from-fuchsia-600 to-orange-500 px-5 py-3 text-sm font-black text-white shadow-xl transition hover:-translate-y-1 md:inline-flex"
        aria-label="View all KidSalonia offers"
      >
        <Gift size={19} />
        {isWeekdayOffer ? "15% OFF · View Offer" : "View Offers"}
        <Sparkles size={16} />
      </button>

      <button
        type="button"
        onClick={() => setShowOffer(true)}
        className="fixed inset-x-3 bottom-[4.25rem] z-[70] flex items-center justify-between rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 px-4 py-2.5 text-left text-white shadow-xl md:hidden"
        aria-label="View all KidSalonia offers"
      >
        <span className="flex items-center gap-2 text-xs font-black">
          <Gift size={17} />
          {isWeekdayOffer ? "15% OFF eligible services" : "See KidSalonia offers"}
        </span>
        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold">View</span>
      </button>

      <div className="fixed bottom-6 right-5 z-[70] hidden flex-col items-end gap-3 md:flex">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
          aria-label="Call KidSalonia"
        >
          <Phone size={22} />
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 ${
            isWeekdayOffer ? "h-12 px-5 font-bold" : "h-12 w-12"
          }`}
          aria-label="Book KidSalonia appointment on WhatsApp"
        >
          <MessageCircle size={23} />
          {isWeekdayOffer && <span>Claim 15% Off</span>}
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[70] grid grid-cols-3 border-t border-black/10 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden">
        <a href={`tel:${PHONE_NUMBER}`} className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-bold text-black">
          <Phone size={18} className="text-primary" /> Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-x border-black/10 py-2.5 text-xs font-bold text-black"
        >
          <MessageCircle size={18} className="text-[#25D366]" />
          {isWeekdayOffer ? "Get 15% Off" : "WhatsApp"}
        </a>
        <Link to="/contact-us" className="flex flex-col items-center justify-center gap-1 bg-primary py-2.5 text-xs font-bold text-primary-foreground">
          <Calendar size={18} /> Book Now
        </Link>
      </div>

      {showOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="offers-title">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-400 px-7 py-7 text-white">
              <button
                type="button"
                onClick={() => {
                  setShowOffer(false);
                  setDismissed(true);
                }}
                className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                aria-label="Close offers"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">🎁</div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">KidSalonia Specials</p>
                  <h2 id="offers-title" className="text-3xl font-black">Current Offers</h2>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="rounded-3xl border-2 border-dashed border-primary/35 bg-primary/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Monday to Friday</p>
                    <h3 className="mt-1 text-2xl font-black text-slate-950">15% OFF Eligible Services</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${isWeekdayOffer ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {isWeekdayOffer ? "ACTIVE NOW" : "WEEKDAY OFFER"}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Save 15% on haircuts, nail art, grooming and other eligible salon services. Mundan services are excluded.
                </p>

                {isWeekdayOffer && (
                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
                    <Clock3 size={17} className="text-primary" />
                    Ends in {countdown.days} days, {countdown.hours} hours and {countdown.minutes} minutes
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={copyCoupon} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-3 text-sm font-black text-primary hover:bg-primary hover:text-white">
                    <Copy size={17} /> {copied ? "Coupon Copied" : `Copy ${COUPON_CODE}`}
                  </button>
                  <a href={createWhatsAppUrl(OFFER_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:-translate-y-0.5">
                    <MessageCircle size={18} /> Claim on WhatsApp
                  </a>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                Offer valid Monday to Friday until 9:00 PM. Mundan excluded. Terms and conditions may apply.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { WHATSAPP_URL, PHONE_NUMBER, COUPON_CODE };
export default ConversionActions;
