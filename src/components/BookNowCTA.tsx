import { Link } from "react-router-dom";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_URL } from "./ConversionActions";

type BookNowCTAProps = {
  title?: string;
  description?: string;
  className?: string;
  service?: string;
};

const BookNowCTA = ({
  title = "Ready to book your child's salon visit?",
  description = "Choose online booking, WhatsApp, or a quick call — our team will help you reserve the best slot.",
  className = "",
  service,
}: BookNowCTAProps) => {
  const bookingUrl = service ? `/book?service=${encodeURIComponent(service)}` : "/book";

  return (
    <section className={`rounded-3xl bg-primary/10 p-6 md:p-8 text-center ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h2>
      <p className="max-w-2xl mx-auto text-sm md:text-base text-foreground/70 mb-6">{description}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to={bookingUrl}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          <Calendar size={18} /> Book Now
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-white px-7 py-3 text-sm font-bold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-primary bg-white px-7 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          <Phone size={18} /> Call Now
        </a>
      </div>
    </section>
  );
};

export default BookNowCTA;