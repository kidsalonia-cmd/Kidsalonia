import { Link } from "react-router-dom";
import { Calendar, MessageCircle, Phone } from "lucide-react";

const PHONE_NUMBER = "+918130307036";
const WHATSAPP_URL =
  "https://wa.me/918130307036?text=Hi%20KidSalonia%2C%20I%20want%20to%20book%20an%20appointment";

const ConversionActions = () => {
  return (
    <>
      {/* Desktop floating contact buttons */}
      <div className="hidden md:flex fixed right-5 bottom-6 z-50 flex-col gap-3">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:opacity-90"
          aria-label="Call KidSalonia"
        >
          <Phone size={22} />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:opacity-90"
          aria-label="Book KidSalonia appointment on WhatsApp"
        >
          <MessageCircle size={23} />
        </a>
      </div>

      {/* Mobile sticky bottom conversion bar */}
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
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-x border-black/10 py-2.5 text-xs font-bold text-black"
          aria-label="Book KidSalonia appointment on WhatsApp"
        >
          <MessageCircle size={18} className="text-[#25D366]" />
          WhatsApp
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
    </>
  );
};

export { WHATSAPP_URL, PHONE_NUMBER };
export default ConversionActions;
