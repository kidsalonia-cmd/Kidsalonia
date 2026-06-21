import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Shield, Sparkles, Clock, Users, Scissors, Baby, Palette, Phone, MapPin, CheckCircle, Heart, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import SocialProofWidget from "@/components/SocialProofWidget";
import heroImg from "@/assets/aeo-kids-salon-sohna-road.jpg";

const AREA = "Sohna Road";
const CITY = "Gurugram";
const NEARBY_AREAS = ["Sector 48", "Sector 49", "Sector 50", "South City 2", "Nirvana Country", "Badshahpur"];

const faqs = [
  {
    question: "Is there a kids salon near Sohna Road Gurugram?",
    answer:
      "Yes! KidSalonia is Gurugram's most trusted kids salon, easily accessible from Sohna Road. Located at JMD Suburbio 2, Sector 67, we're just 10–15 minutes from Sohna Road. Parents from Sector 48, 49, 50, South City 2, and Badshahpur regularly visit us for safe, fun kids haircuts.",
  },
  {
    question: "How far is KidSalonia from Sohna Road?",
    answer:
      "KidSalonia at Sector 67 is approximately 10–15 minutes by car from Sohna Road, depending on traffic. We're accessible via Golf Course Extension Road and Southern Peripheral Road. Many parents from the Sohna Road corridor choose us for our child-friendly environment and trained stylists.",
  },
  {
    question: "What services do you offer for kids near Sohna Road?",
    answer:
      "KidSalonia offers kids haircuts (boys & girls), baby first haircuts, mundan ceremony services, kids styling for events, nail art, manicures, pedicures, and gentle skin care — all using safe, non-toxic, child-friendly products.",
  },
  {
    question: "Do you handle toddler haircuts for anxious children?",
    answer:
      "Absolutely! Our stylists are trained in child psychology techniques. We use cartoon screens, bubbles, stickers, and themed salon chairs to keep toddlers calm. If a child is too anxious, we pause and try again — there's never any forcing at KidSalonia.",
  },
  {
    question: "Can I book a kids haircut appointment online?",
    answer:
      "Currently, the best way to book is by calling us at +91 8130307036. We recommend booking in advance, especially for weekends and holidays, to avoid wait times. Walk-ins are welcome but subject to availability.",
  },
];

const services = [
  {
    icon: Scissors,
    title: "Kids Haircut",
    desc: "Trendy, safe haircuts for boys and girls by trained child-friendly stylists.",
    price: "From ₹299",
  },
  {
    icon: Baby,
    title: "Baby First Haircut",
    desc: "Gentle first haircut experience with a keepsake certificate for your little one.",
    price: "From ₹399",
  },
  {
    icon: Palette,
    title: "Kids Nail Art",
    desc: "Safe, non-toxic, water-based nail art designs that kids absolutely love.",
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
    name: "Sohna Road, Gurugram, Haryana",
  },
  description: "Premium kids salon services near Sohna Road, Gurugram — safe haircuts, nail art, and skin care for children.",
};

const KidsSalonSohnaRoad = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Kids Salon Near Sohna Road Gurugram — Safe Haircuts for Kids | KidSalonia"
        description="Looking for a kids salon near Sohna Road, Gurugram? KidSalonia offers safe, fun haircuts for babies, toddlers & kids. Trained stylists, sanitized tools, 4.8★ rated. Book now!"
        canonical="https://www.kidsalonia.com/kids-salon-near-sohna-road-gurugram"
        jsonLd={[localBusinessSchema, createFAQSchema(faqs), serviceSchema]}
      />
      <Header />
      <SocialProofWidget />

      {/* Hero Section */}
      <section className="relative w-full min-h-[420px] md:min-h-[500px] overflow-hidden">
        <img src={heroImg} alt="Kids salon near Sohna Road Gurugram" className="absolute inset-0 w-full h-full object-cover" />
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
              Kids Salon Near {AREA}, {CITY}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
              Safe, fun, and expert haircuts for babies, toddlers, and kids — just minutes from {AREA}.
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
            Where can I find the best kids salon near {AREA}, {CITY}?
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            KidSalonia is the top-rated kids salon near {AREA}, {CITY} — located at JMD Suburbio 2 in Sector 67, just 10–15 minutes away. With trained child-friendly stylists, fully sanitized tools, and a playful environment designed for children, we're trusted by 500+ parents across {CITY}. From baby first haircuts to kids nail art, every service is safe, gentle, and fun.
          </p>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Conveniently Located Near {AREA}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <Navigation className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">10–15 Min from {AREA}</h3>
            <p className="text-sm text-muted-foreground">Quick drive via Golf Course Extension Road or Southern Peripheral Road.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">JMD Suburbio 2, Sector 67</h3>
            <p className="text-sm text-muted-foreground">Ground floor location with easy parking and accessibility.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Serving Nearby Areas</h3>
            <p className="text-sm text-muted-foreground">{NEARBY_AREAS.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Why Parents Near {AREA} Choose KidSalonia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Child-Friendly Trained Stylists", desc: "Every stylist is trained in child behaviour and gentle hair techniques." },
              { icon: Sparkles, title: "Hygienic & Sanitized Tools", desc: "All instruments sterilised between appointments. Zero compromises on hygiene." },
              { icon: Heart, title: "Comfortable Seating for Kids", desc: "Themed chairs, cartoons on screens, and a playful atmosphere that kids love." },
              { icon: Clock, title: "Quick & Stress-Free", desc: "Efficient sessions designed for short attention spans. In and out with smiles." },
              { icon: Users, title: "Trusted by 500+ Parents", desc: "Rated 4.8/5 by parents across Gurugram. Real reviews, real trust." },
              { icon: CheckCircle, title: "Safe, Non-Toxic Products", desc: "Only child-safe, hypoallergenic products used. No harsh chemicals ever." },
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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Our Services
        </h2>
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
            title="KidSalonia Location near Sohna Road"
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
            Book Your Child's Haircut Near {AREA} Today
          </h2>
          <p className="text-muted-foreground mb-6">Slots filling fast this weekend — book now to secure your appointment!</p>
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

export default KidsSalonSohnaRoad;
