import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Copy, MessageCircle, Phone, X } from "lucide-react";

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
  end.setDate(date.getDate() + (5 - date.getDay()));
  end.setHours(21, 0, 0, 0);
  return end;
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
  }, [location.pathname]);

  useEffect(() => {
    if (!isWeekdayOffer || dismissed) return;

    const alreadySeen = sessionStorage.getItem("kidsalonia-weekday-offer-seen");
    if (alreadySeen) return;

    const show = () => {
      setShowOffer(true);
      sessionStorage.setItem("kidsalonia-weekday-offer-seen", "true");
    };

    const mobileTimer = window.setTimeout(show, 25000);
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 8 && window.innerWidth >= 768) show();
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isWeekdayOffer, dismissed]);

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
      <div className="fixed bottom-6 right-5 z-50 hidden flex-col items-end gap-3 md:flex">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:opacity-90"
          aria-label="Call KidSalonia"
        >
          <Phone size={22} />
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:opacity-90 ${
            isWeekdayOffer ? "h-12 px-5 font-bold" : "h-12 w-12"
          }`}
          aria-label="Book KidSalonia appointment on WhatsApp"
        >
          <MessageCircle size={23} />
          {isWeekdayOffer && <span>Claim 15% Off</span>}
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-black/10 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-bold text-black"
          aria-label="Call KidSalonia"
        >
          <Phone size={18} className="text-primary" />
          Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-x border-black/10 py-2.5 text-xs font-bold text-black"
          aria-label="Book KidSalonia appointment on WhatsApp"
        >
          <MessageCircle size={18} className="text-[#25D366]" />
          {isWeekdayOffer ? "Get 15% Off" : "WhatsApp"}
        </a>
        <Link
          to="/contact-us"
          className="flex flex-col items-center justify-center gap-1 bg-primary py-2.5 text-xs font-bold text-primary-foreground"
          aria-label="Book KidSalonia appointment online"
        >
          <Calendar size={18} />
          Book Now
        </Link>
      </div>

      {showOffer && isWeekdayOffer && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="weekday-offer-title"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowOffer(false);
                setDismissed(true);
              }}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close weekday offer"
            >
              <X size={20} />
            </button>

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl">
              🎁
            </div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary">
              Before You Go
            </p>
            <h2 id="weekday-offer-title" className="mt-2 text-3xl font-black text-slate-950">
              Save 15% Today
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Book an eligible KidSalonia service from Monday to Friday and use the coupon below. Mundan is excluded.
            </p>

            <button
              type="button"
              onClick={copyCoupon}
              className="mx-auto mt-5 flex items-center gap-2 rounded-2xl border-2 border-dashed border-primary bg-primary/5 px-6 py-3 text-xl font-black tracking-[0.2em] text-primary"
            >
              {COUPON_CODE} <Copy size={18} />
            </button>
            {copied && <p className="mt-2 text-xs font-bold text-green-600">Coupon copied</p>}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              <MessageCircle size={21} /> Claim 15% Off on WhatsApp
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Valid Monday to Friday until 9:00 PM. Mundan excluded. Terms may apply.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export { WHATSAPP_URL, PHONE_NUMBER, COUPON_CODE };
export default ConversionActions;
