import { motion } from "framer-motion";
import { Star, Shield, Sparkles, Clock, Users, Scissors, Baby, Palette, Phone, MapPin, CheckCircle, Heart, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import SocialProofWidget from "@/components/SocialProofWidget";
import heroImg from "@/assets/geo-kids-salon-dlf.jpg";
import { Link } from "react-router-dom";

export interface LocationPageProps {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  area: string;
  heroSubheading: string;
  introHeading: string;
  introAnswer: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  nearbyAreas: string[];
  distanceNote: string;
  whyTravelNote: string;
  faqs: { question: string; answer: string }[];
}

const services = [
  { icon: Scissors, title: "Kids Haircut", desc: "Expert haircuts for boys and girls, trendy, safe, and age appropriate.", price: "From ₹299" },
  { icon: Baby, title: "Mundan Ceremony", desc: "A gentle, memorable first haircut with a keepsake certificate.", price: "From ₹399" },
  { icon: Palette, title: "Kids Nail Art & Styling", desc: "Non toxic nail art, party styling, and event grooming for kids.", price: "From ₹99" },
];

const LocationPage = ({
  metaTitle,
  metaDescription,
  canonical,
  h1,
  area,
  heroSubheading,
  introHeading,
  introAnswer,
  primaryKeyword,
  secondaryKeywords,
  nearbyAreas,
  distanceNote,
  whyTravelNote,
  faqs,
}: LocationPageProps) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kids Haircut and Grooming",
    provider: {
      "@type": "HairSalon",
      name: "KidSalonia",
      url: "https://www.kidsalonia.com",
    },
    areaServed: { "@type": "Place", name: `${area}` },
    description: `Premium ${primaryKeyword} services. Safe haircuts, nail art, and grooming for kids.`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonical}
        jsonLd={[localBusinessSchema, createFAQSchema(faqs), serviceSchema]}
      />
      <Header />
      <SocialProofWidget />

      {/* Hero */}
      <section className="relative w-full min-h-[420px] md:min-h-[500px] overflow-hidden">
        <img src={heroImg} alt={`${primaryKeyword} hero`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col justify-center min-h-[420px] md:min-h-[500px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold">4.8 Star Rating</span>
              <span className="text-white/70">|</span>
              <span className="text-white font-semibold">500+ Happy Parents</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-3xl">{h1}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">{heroSubheading}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book?service=kids-haircut" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-lg hover:opacity-90 transition">
                <Scissors className="w-5 h-5" /> Book Appointment
              </Link>
              <a href="https://maps.google.com/?q=28.5035,77.0386" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-3 rounded-full font-bold text-lg hover:bg-white/30 transition">
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO Direct Answer */}
      <section className="bg-primary/5 border-l-4 border-primary py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{introHeading}</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">{introAnswer}</p>
        </div>
      </section>

      {/* Location advantage */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Serving {area} Families with Ease
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <Navigation className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Easy Drive from {area}</h3>
            <p className="text-sm text-muted-foreground">{distanceNote}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">JMD Suburbio 2, Sector 67</h3>
            <p className="text-sm text-muted-foreground">Ground floor location with ample parking space.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Trusted by Families Near</h3>
            <p className="text-sm text-muted-foreground">{nearbyAreas.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Why travel */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
            Why {area} Parents Choose KidSalonia
          </h2>
          <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-10">{whyTravelNote}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Child Friendly Trained Stylists", desc: "Every stylist is trained in child behaviour and gentle hair care techniques." },
              { icon: Sparkles, title: "Hygienic and Sanitised Tools", desc: "All instruments sterilised between appointments. Zero compromises." },
              { icon: Heart, title: "Fun, Themed Environment", desc: "Cartoon chairs, colourful decor, and screens that keep kids engaged and happy." },
              { icon: Clock, title: "Quick and Efficient", desc: "Designed for short attention spans. Professional results in minimal time." },
              { icon: Users, title: "500+ Happy Parents", desc: "Rated 4.8 of 5 across review platforms. Trusted by families across NCR." },
              { icon: CheckCircle, title: "Non Toxic Products Only", desc: "Child safe, hypoallergenic products with no harsh chemicals whatsoever." },
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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Our Services for {area} Families</h2>
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
        <p className="max-w-3xl mx-auto text-center text-muted-foreground mt-8">
          Whether you are searching for a {secondaryKeywords[0]}, a {secondaryKeywords[1] || primaryKeyword}, or a trusted {primaryKeyword}, KidSalonia delivers a premium experience worth the drive.
        </p>
      </section>

      {/* Map */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground text-center mb-6">Find Us on the Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg border h-[350px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.9!2d77.0386!3d28.5035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzEyLjYiTiA3N8KwMDInMTkuMCJF!5e0!3m2!1sen!2sin!4v1"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title={`KidSalonia Location for ${area}`}
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="font-bold text-foreground text-lg mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Book Your Child's Appointment from {area} Today
          </h2>
          <p className="text-muted-foreground mb-6">Limited weekend slots, book early to avoid disappointment.</p>
          <Link to="/book?service=kids-haircut" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition">
            <Scissors className="w-5 h-5" /> Book Now
          </Link>
        </div>
      </section>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary p-3 flex gap-2 shadow-lg">
        <a href="tel:+918130307036" className="flex-1 text-center text-primary-foreground font-bold py-2 rounded-lg bg-primary-foreground/20">Call Now</a>
        <Link to="/book?service=kids-haircut" className="flex-1 text-center text-primary-foreground font-bold py-2 rounded-lg bg-primary-foreground/20">Book Now</Link>
      </div>

      <Footer />
    </div>
  );
};

export default LocationPage;
