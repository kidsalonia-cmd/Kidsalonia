import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo2.webp";
import { Instagram, Facebook, MessageCircle, Calendar, Phone, Mail, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/918130307036";

const Footer = () => {
  const [email, setEmail] = useState("");
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
        },
      });
      if (error) throw error;
      toast({ title: "Subscribed!", description: "Thanks for subscribing — we'll be in touch with offers." });
      setEmail("");
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
      <section className="bg-white py-16 text-center px-6">
        <h2 className="text-xl md:text-2xl font-bold text-black tracking-wide mb-8 uppercase">
          Let Your Hair Shine With Special Offers And Deals! Subscribe!
        </h2>
        <form onSubmit={handleSubscribe} className="flex items-center justify-center gap-3 max-w-lg mx-auto mb-6">
          <input
            type="email"
            required
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-black/20 rounded-md px-4 py-3 text-sm outline-none focus:border-black/40"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#EE2852] hover:bg-[#d5214a] text-white font-semibold px-6 py-3 rounded-md text-sm transition disabled:opacity-60"
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
      <footer className="bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
                className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#EE2852] hover:text-white hover:border-[#EE2852] transition"
                aria-label="Follow KidSalonia on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/766831683190165"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#EE2852] hover:text-white hover:border-[#EE2852] transition"
                aria-label="Follow KidSalonia on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition"
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
                <a href="tel:8130307036" className="hover:text-black transition">+91 8130307036</a>
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

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold px-5 py-3 rounded-full text-sm transition"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[hsl(0,0%,20%)] text-white text-center py-4 text-sm">
          © {new Date().getFullYear()} KidSalonia. Designed and Developed by{" "}
          <a
            href="https://Kidsalonia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80 transition"
          >
            Kidsalonia
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
