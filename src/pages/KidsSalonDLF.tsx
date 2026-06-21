import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Shield, Sparkles, Clock, Users, Scissors, Baby, Palette, Phone, MapPin, CheckCircle, Heart, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import SocialProofWidget from "@/components/SocialProofWidget";
import heroImg from "@/assets/geo-kids-salon-dlf.jpg";

const AREA = "DLF Phase 1–5";
const CITY = "Gurugram";
const NEARBY_AREAS = ["DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "DLF Phase 4", "DLF Phase 5", "DLF Cyber City", "Sector 42", "Sector 43"];

const faqs = [
  {
    question: "Is there a kids salon near DLF Gurugram?",
    answer:
      "Yes! KidSalonia is Gurugram's most trusted kids salon, easily accessible from all DLF Phases. Located at JMD Suburbio 2, Sector 67, we're approximately 15–20 minutes from DLF Phase 1–5. Parents from DLF Cyber City, MG Road, and surrounding areas regularly visit us.",
  },
  {
    question: "How far is KidSalonia from DLF Phase 4?",
    answer:
      "KidSalonia at Sector 67 is approximately 15–20 minutes by car from DLF Phase 4 via Golf Course Road. We're well-connected and easily accessible. Many DLF families choose us for our child-friendly environment, trained stylists, and safe products.",
  },
  {
    question: "What makes KidSalonia different from regular salons near DLF?",
    answer:
      "Unlike regular salons, KidSalonia is a dedicated kids-only salon with themed chairs, cartoon screens, trained child-behaviour specialists, and exclusively child-safe products. Every tool is sterilised, and our playful environment ensures zero stress for children.",
  },
  {
    question: "Do you offer birthday party packages for kids near DLF?",
    answer:
      "Yes! KidSalonia offers birthday party packages with nail art, hairstyling, and mini makeovers. We can host the party at our Sector 67 salon or arrange services at your location. Call +91 8130307036 to discuss party packages.",
  },
  {
    question: "Is it safe to get a haircut for a 1-year-old baby?",
    answer:
      "Absolutely. Our stylists are specially trained for infant haircuts. We use gentle, child-safe tools, work at the baby's pace, and parents can hold their child throughout. We've completed over 5,000 baby first haircuts successfully.",
  },
];

const services = [
  {
    icon: Scissors,
    title: "Kids Haircut",
    desc: "Expert haircuts for boys and girls — trendy, safe, and age-appropriate.",
    price: "From ₹299",
  },
  {
    icon: Baby,
    title: "Baby First Haircut",
    desc: "A gentle, memorable first haircut with a keepsake certificate.",
    price: "From ₹399",
  },
  {
    icon: Palette,
    title: "Kids Nail Art & Styling",
    desc: "Non-toxic nail art, party styling, and event grooming for kids.",
    price: "From ₹99",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kids Haircut and Grooming",
  provider: {
    "@type": "HairSalon",
    name: "KidSalonia",
    url: "https://www.kidsalonia.com",
  },
  areaServed: {
    "@type": "Place",
    name: "DLF Phase 1-5, Gurugram, Haryana",
  },
  description: "Premium kids salon services near DLF Gurugram — safe haircuts, nail art, and skin care for children.",
};

const KidsSalonDLF = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Kids Salon Near DLF Gurugram — Safe Haircuts for Kids | KidSalonia"
        description="Looking for a kids salon near DLF Phase 1-5, Gurugram? KidSalonia offers safe, fun haircuts for babies, toddlers & kids. Trained stylists, sanitized tools, 4.8★ rated. Book now!"
        canonical="https://www.kidsalonia.com/kids-salon-near-dlf-gurugram"
        jsonLd={[localBusinessSchema, createFAQSchema(faqs), serviceSchema]}
      />
      <Header />
      <SocialProofWidget />

      {/* Hero Section */}
      <section className="relative w-full min-h-[420px] md:min-h-[500px] overflow-hidden">
        <img src={heroImg} alt="Kids salon near DLF Gurugram" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col justify-center min-h-[420px] md:min-h-[500px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold">4.8★ Rating</span>
              <span className="text-white/70">|</span>
              <span className="text-white font-semibold">500+ Happy Parents</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl">
              Kids Salon Near DLF, {CITY}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
              Safe, fun, and expert haircuts for babies, toddlers, and kids — accessible from all DLF Phases.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+918130307036" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-lg hover:opacity-90 transition">
                <Phone className="w-5 h-5" /> Book Appointment
              </a>
              <a href="https://maps.google.com/?q=28.5035,77.0386" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-3 rounded-full font-bold text-lg hover:bg-white/30 transition">
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO Direct Answer Block */}
      <section className="bg-primary/5 border-l-4 border-primary py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Where can I find the best kids salon near DLF {CITY}?
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            KidSalonia is the highest-rated kids salon accessible from DLF Phase 1–5, {CITY}. Located at JMD Suburbio 2 in Sector 67, we're just 15–20 minutes from DLF Cyber City and all DLF phases. With child-friendly trained stylists, fully sanitized tools, and a fun environment with cartoon-themed chairs, we're the trusted choice of 500+ parents across {CITY}.
          </p>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Easy Access from All DLF Phases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <Navigation className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">15–20 Min from DLF</h3>
            <p className="text-sm text-muted-foreground">Accessible via Golf Course Road and MG Road corridor.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">JMD Suburbio 2, Sector 67</h3>
            <p className="text-sm text-muted-foreground">Ground floor location with ample parking space.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Serving DLF & Beyond</h3>
            <p className="text-sm text-muted-foreground">{NEARBY_AREAS.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Why DLF Parents Choose KidSalonia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Child-Friendly Trained Stylists", desc: "Every stylist is trained in child behaviour and gentle hair care techniques." },
              { icon: Sparkles, title: "Hygienic & Sanitized Tools", desc: "All instruments sterilised between appointments. Zero compromises." },
              { icon: Heart, title: "Fun, Themed Environment", desc: "Cartoon chairs, colourful decor, and screens that keep kids engaged and happy." },
              { icon: Clock, title: "Quick & Efficient", desc: "Designed for short attention spans. Professional results in minimal time." },
              { icon: Users, title: "500+ Happy Parents", desc: "Rated 4.8/5 across review platforms. Trusted by families across Gurugram." },
              { icon: CheckCircle, title: "Non-Toxic Products Only", desc: "Child-safe, hypoallergenic products — no harsh chemicals whatsoever." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 shadow-sm border">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <s.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <span className="text-primary font-bold">{s.price}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Google Map */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground text-center mb-6">Find Us on the Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg border h-[350px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.9!2d77.0386!3d28.5035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzEyLjYiTiA3N8KwMDInMTkuMCJF!5e0!3m2!1sen!2sin!4v1"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="KidSalonia Location near DLF Gurugram"
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm border">
                <h2 className="font-bold text-foreground text-lg mb-3">{faq.question}</h2>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Book Your Child's Haircut Near DLF Today
          </h2>
          <p className="text-muted-foreground mb-6">Limited weekend slots — book early to avoid disappointment!</p>
          <a href="tel:+918130307036" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition">
            <Phone className="w-5 h-5" /> Book Now
          </a>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary p-3 flex gap-2 shadow-lg">
        <a href="tel:+918130307036" className="flex-1 text-center text-primary-foreground font-bold py-2 rounded-lg bg-primary-foreground/20">
          📞 Call Now
        </a>
        <a href="tel:+918130307036" className="flex-1 text-center text-primary-foreground font-bold py-2 rounded-lg bg-primary-foreground/20">
          📅 Book Now
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default KidsSalonDLF;
