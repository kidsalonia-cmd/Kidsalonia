import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo2.webp";
import { Instagram, Facebook, MessageCircle, Calendar, Phone, Mail, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import KidsStickers from "@/components/KidsStickers";

const WHATSAPP_URL = "https://wa.me/918130307036?text=Hi%20KidSalonia%2C%20I%20want%20to%20book%20an%20appointment";
const PHONE_URL = "tel:+918130307036";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: "Newsletter Subscriber",
          email: trimmed,
          message: "New newsletter subscription from KidSalonia homepage footer.",
          website,
        },
      });
      if (error) throw error;
      toast({ title: "Subscribed!", description: "Thanks for subscribing — we'll be in touch with offers." });
      setEmail("");
      setWebsite("");
    } catch (err) {
      console.error(err);
      toast({ title: "Subscription failed", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Subscribe Section */}
      <section className="ks-section-panel bg-white px-6 py-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-black tracking-wide mb-8 uppercase">
          Let Your Hair Shine With Special Offers And Deals! Subscribe!
        </h2>
        <form onSubmit={handleSubscribe} className="mx-auto mb-6 flex max-w-lg flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="footer-website">Website</label>
            <input
              id="footer-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            name="email"
            type="email"
            required
            placeholder="Email*"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-0 flex-1 rounded-md border border-black/20 px-4 py-3 text-sm outline-none focus:border-black/40"
          />
          <button
            type="submit"
            disabled={submitting}
            className="ks-button-3d w-full rounded-md bg-[#EE2852] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d5214a] disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        <p
          className="text-4xl md:text-5xl text-[#EE2852] mt-4"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Subscribe
        </p>
      </section>

      {/* Main Footer */}
      <footer className="kids-rainbow-border ks-footer-depth relative isolate overflow-hidden bg-white border-t border-black/10">
        <KidsStickers items={[
          { id: "footer-cloud-left", icon: "cloud", size: 70, animation: "float", delay: -1, position: { left: "1%", top: "4%" }, className: "hidden lg:block", opacity: 0.7 },
          { id: "footer-cloud-right", icon: "cloud", size: 58, animation: "float", delay: -3, position: { right: "2%", top: "8%" }, className: "hidden md:block", opacity: 0.65 },
          { id: "footer-stars", icon: "stars", size: 35, animation: "rotate", delay: -2, position: { right: "3%", bottom: "17%" }, opacity: 0.62 },
        ]} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="KidSalonia" className="h-20" />
            <p className="text-sm text-black/60 leading-relaxed">
              A premium kids & family salon in Gurugram — gentle haircuts, nail art and styling in a safe, joyful space.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://www.instagram.com/kidsalonia"
                target="_blank"
                rel="noopener noreferrer"
                className="ks-raised-icon w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#EE2852] hover:text-white hover:border-[#EE2852]"
                aria-label="Follow KidSalonia on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/766831683190165"
                target="_blank"
                rel="noopener noreferrer"
                className="ks-raised-icon w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#EE2852] hover:text-white hover:border-[#EE2852]"
                aria-label="Follow KidSalonia on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ks-raised-icon w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                aria-label="Chat with KidSalonia on WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-black mb-5 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm text-black/65">
              <li><Link to="/hair" className="hover:text-[#EE2852] transition">Hair</Link></li>
              <li><Link to="/skin" className="hover:text-[#EE2852] transition">Skin</Link></li>
              <li><Link to="/nails" className="hover:text-[#EE2852] transition">Nails</Link></li>
              <li><a href="/#gallery" className="hover:text-[#EE2852] transition">Gallery</a></li>
              <li><Link to="/insights" className="hover:text-[#EE2852] transition">Insights</Link></li>
              <li><Link to="/about-us" className="hover:text-[#EE2852] transition">About Us</Link></li>
              <li><Link to="/contact-us" className="hover:text-[#EE2852] transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Visit / Contact + Hours */}
          <div>
            <h4 className="text-sm font-bold text-black mb-5 uppercase tracking-wider">Visit Us</h4>
            <ul className="space-y-3 text-sm text-black/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-[#EE2852] shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ground+floor%2C+KidSalonia%2C+A-19+JMD+Suburbio+2%2C+Gurugram%2C+Haryana+122101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EE2852] transition"
                >
                  Ground floor, KidSalonia, A-19 JMD Suburbio 2,<br />Gurugram, Haryana 122101
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#EE2852] shrink-0" />
                <a href={PHONE_URL} className="hover:text-black transition">+91 8130307036</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#EE2852] shrink-0" />
                <a href="mailto:sales@kidsalonia.com" className="hover:text-black transition">sales@kidsalonia.com</a>
              </li>
            </ul>

            <h4 className="text-sm font-bold text-black mt-7 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Clock size={14} className="text-[#EE2852]" /> Hours
            </h4>
            <ul className="space-y-1.5 text-sm text-black/70">
              <li className="flex justify-between gap-3"><span>Mon, Wed – Fri</span><span className="text-black/85">11:30 – 20:30</span></li>
              <li className="flex justify-between gap-3"><span>Sat – Sun</span><span className="text-black/85">10:30 – 21:00</span></li>
              <li className="flex justify-between gap-3"><span>Tue</span><span className="text-[#EE2852] font-medium">Closed</span></li>
            </ul>
          </div>

          {/* Book Now / WhatsApp */}
          <div>
            <h4 className="text-sm font-bold text-black mb-5 uppercase tracking-wider">Get In Touch</h4>
            <p className="text-sm text-black/60 mb-5 leading-relaxed">
              Reserve your child's pampering session or talk to us directly — we usually reply within minutes.
            </p>
            <div className="space-y-3">
              <Link
                to="/book"
                className="ks-button-3d flex items-center justify-center gap-2 bg-[#EE2852] text-white hover:bg-[#d5214a] font-semibold px-5 py-3 rounded-full text-sm"
              >
                <Calendar size={16} /> Book Appointment
              </Link>
              <a
                href={PHONE_URL}
                className="ks-button-3d flex items-center justify-center gap-2 bg-white border-2 border-[#EE2852] text-[#EE2852] hover:bg-[#EE2852] hover:text-white font-semibold px-5 py-3 rounded-full text-sm"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ks-button-3d flex items-center justify-center gap-2 bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold px-5 py-3 rounded-full text-sm"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 bg-[hsl(0,0%,20%)] text-white text-center py-4 text-sm">
          © {new Date().getFullYear()} KidSalonia. Designed and Developed by{" "}
          <a href="/" className="underline hover:text-white/80 transition">
            Kidsalonia
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;







