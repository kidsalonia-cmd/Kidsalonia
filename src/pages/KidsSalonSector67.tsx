import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Shield, Sparkles, Clock, Users, Scissors, Baby, Palette, Phone, MapPin, CheckCircle, Heart, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import SocialProofWidget from "@/components/SocialProofWidget";
import heroImg from "@/assets/kids-haircut-hero.png";

const SECTOR = "Sector 67";
const CITY = "Gurugram";
const NEARBY_SECTORS = ["Sector 66", "Sector 68", "Sector 65", "Sector 69", "Sector 56", "Golf Course Extension Road"];

const faqs = [
  {
    question: "Is there a kids salon near Sector 67 Gurugram?",
    answer:
      "Yes! KidSalonia is located right in Sector 67, Gurugram — at JMD Suburbio 2, Ground Floor. We're the area's most trusted kids salon with 500+ happy parents, trained child-friendly stylists, and fully sanitized tools. Walk-ins welcome, but booking in advance is recommended.",
  },
  {
    question: "How far is your salon from Golf Course Extension Road?",
    answer:
      "KidSalonia is just 3–5 minutes away from Golf Course Extension Road. We're situated at JMD Suburbio 2 in Sector 67, easily accessible from Sectors 65, 66, 68, and the wider Golf Course Extension corridor. Parents drive in from Sohna Road and DLF areas too.",
  },
  {
    question: "Is kids haircut safe for toddlers?",
    answer:
      "Absolutely. At KidSalonia, toddler haircuts are handled by stylists trained in child care. We use sterilised, child-safe scissors and clippers, hypoallergenic products, and our playful environment with cartoon screens keeps toddlers calm and distracted throughout.",
  },
  {
    question: "Do I need to book in advance for a kids haircut?",
    answer:
      "Walk-ins are welcome, but we strongly recommend booking in advance — especially on weekends and holidays — to avoid wait times. Call us at +91 8130307036 or visit our contact page to reserve a slot for your child.",
  },
  {
    question: "What services does KidSalonia offer near Sector 67?",
    answer:
      "KidSalonia offers kids haircuts (boys & girls), baby first haircuts, styling for parties and events, kids nail art, manicures, and gentle skin care — all using safe, kid-friendly products at our Sector 67, Gurugram salon.",
  },
];

const services = [
  {
    icon: Scissors,
    title: "Kids Haircut",
    desc: "Trendy, age-appropriate haircuts for boys and girls by trained child-friendly stylists in Sector 67.",
    price: "From ₹299",
  },
  {
    icon: Baby,
    title: "Baby First Haircut",
    desc: "A gentle, memorable milestone. We go slow, keep it calm, and make your baby's first haircut special.",
    price: "From ₹499",
  },
  {
    icon: Palette,
    title: "Kids Styling",
    desc: "Party hairdos, braids, themed styles — perfect for birthdays, school events, and family weddings.",
    price: "From ₹399",
  },
];

const whyChoose = [
  { icon: Users, text: "Child-friendly trained stylists" },
  { icon: Shield, text: "Hygienic & sanitized tools" },
  { icon: Heart, text: "Comfortable seating for kids" },
  { icon: Clock, text: "Quick & stress-free experience" },
  { icon: Star, text: "Trusted by 500+ parents" },
  { icon: Navigation, text: "Located right in Sector 67" },
];

const proximityPoints = [
  { area: "JMD Suburbio 2, Sector 67", time: "We're right here!" },
  { area: "Golf Course Extension Road", time: "3–5 min drive" },
  { area: "Sector 65 & 66", time: "5 min drive" },
  { area: "Sector 68 & 69", time: "5–7 min drive" },
  { area: "Sohna Road", time: "8–10 min drive" },
  { area: "DLF Phase 1–5", time: "10–15 min drive" },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kids Haircut",
  provider: {
    "@type": "HairSalon",
    name: "KidSalonia",
    url: "https://www.kidsalonia.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ground floor, A-19 JMD Suburbio 2, Sector 67",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
  },
  areaServed: [
    { "@type": "Place", name: "Sector 67, Gurugram" },
    { "@type": "Place", name: "Golf Course Extension Road, Gurugram" },
    { "@type": "Place", name: "Sector 66, Gurugram" },
    { "@type": "Place", name: "Sector 68, Gurugram" },
  ],
  description:
    "Professional kids haircut services in Sector 67 Gurugram. Safe, fun, and expert haircuts for babies, toddlers, and kids at KidSalonia.",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "299",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "299",
      maxPrice: "999",
      priceCurrency: "INR",
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const KidsSalonSector67 = () => {
  const faqSchema = createFAQSchema(faqs);

  return (
    <>
      <SEO
        title={`Kids Salon in ${SECTOR}, ${CITY} — Safe Haircuts Near You`}
        description={`Looking for a kids salon in ${SECTOR}, ${CITY}? KidSalonia offers safe, fun haircuts for babies, toddlers & kids near Golf Course Extension Road. 4.8★ rated, 500+ happy parents. Book now!`}
        canonical="https://www.kidsalonia.com/kids-salon-sector-67-gurugram"
        jsonLd={[localBusinessSchema, faqSchema, serviceSchema]}
      />

      <Header />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Kids Salon in{" "}
              <span className="text-primary">{SECTOR}, {CITY}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-lg">
              Safe, fun, and expert haircuts for babies, toddlers, and kids — right near you in {SECTOR}.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm">
                <Star size={16} fill="currentColor" /> 4.8★ Rating
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm">
                <Users size={16} /> 500+ Happy Parents
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm">
                <MapPin size={16} /> {SECTOR}, {CITY}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/book?service=kids-haircut"
                className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition shadow-lg"
              >
                Book Appointment
              </Link>
              <a
                href="tel:8130307036"
                className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-full text-lg hover:bg-primary hover:text-primary-foreground transition"
              >
                <Phone size={18} className="inline mr-2" />
                Call Now
              </a>
            </div>

            <p className="mt-4 text-sm text-accent font-semibold animate-pulse">
              ⏰ Slots filling fast this weekend — book now!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src={heroImg}
              alt={`Kids salon in ${SECTOR} ${CITY} — happy child getting a haircut at KidSalonia`}
              className="rounded-3xl shadow-2xl w-full object-cover"
              width={640}
              height={360}
            />
            <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-lg px-5 py-3 border border-border">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-[hsl(45,100%,51%)] fill-[hsl(45,100%,51%)]" />
                  ))}
                </div>
                <span className="font-bold text-foreground text-sm">4.8/5</span>
              </div>
              <p className="text-xs text-muted-foreground">500+ Google Reviews</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO DIRECT ANSWER BLOCK */}
      <section className="bg-primary/5 border-y border-primary/20">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Where Can I Find the Best Kids Salon in {SECTOR}, {CITY}?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <strong>KidSalonia</strong> in {SECTOR}, {CITY} is the top-rated kids salon near Golf Course Extension Road.
            With trained child-friendly stylists, fully sanitized tools, and a playful environment designed to keep children
            calm and happy, it's the safest and most trusted choice for your child's haircut in the {SECTOR} area.
          </p>
        </div>
      </section>

      {/* LOCATION ADVANTAGE */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Conveniently Located Near You
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            KidSalonia is situated at JMD Suburbio 2, {SECTOR} — right in the heart of the neighborhood, minutes away from key landmarks.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {proximityPoints.map((pt, i) => (
              <motion.div
                key={pt.area}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-5"
              >
                <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                  <Navigation className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{pt.area}</p>
                  <p className="text-xs text-primary font-medium">{pt.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Why Parents in {SECTOR} Choose KidSalonia
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.text}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-4 bg-background rounded-2xl p-6 shadow-sm"
              >
                <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                  <item.icon className="text-primary" size={24} />
                </div>
                <p className="text-foreground font-semibold text-base">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Kids Haircut Services in {SECTOR}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-secondary/20 rounded-2xl p-8 shadow-md border border-border/50 text-center hover:shadow-xl transition-shadow"
              >
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <svc.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{svc.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{svc.desc}</p>
                <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm">
                  {svc.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & HYGIENE */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Safety & Hygiene — Our Promise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Sanitized Tools & Equipment",
                desc: "Every comb, scissor, and clipper is sterilised between appointments using hospital-grade disinfectants. Zero compromise on hygiene.",
              },
              {
                icon: Heart,
                title: "Kid-Safe, Hypoallergenic Products",
                desc: "We use only dermatologically tested, chemical-free products that are gentle on your child's delicate skin and hair.",
              },
              {
                icon: Sparkles,
                title: "Calm, Playful Environment",
                desc: "Cartoon screens, fun chairs, toys, and trained staff who know how to soothe anxious children — making every visit enjoyable.",
              },
              {
                icon: CheckCircle,
                title: "Trained Child Specialists",
                desc: "Our stylists undergo child-handling training — they know when to pause, play, and proceed gently with your little one.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-5 p-6 rounded-2xl bg-background shadow-sm"
              >
                <div className="bg-primary/10 p-3 rounded-xl shrink-0 h-fit">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Us in {SECTOR}, {CITY}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            JMD Suburbio 2, Ground Floor, A-19 — easily accessible from Golf Course Extension Road and nearby sectors.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {NEARBY_SECTORS.map((area) => (
              <span
                key={area}
                className="bg-secondary text-foreground font-medium px-4 py-2 rounded-full text-sm"
              >
                <MapPin size={14} className="inline mr-1 text-primary" />
                {area}
              </span>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5!2d77.0386!3d28.5035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzEyLjYiTiA3N8KwMDInMTkuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`KidSalonia kids salon location in ${SECTOR} ${CITY}`}
            />
          </div>
        </div>
      </section>

      {/* LOCAL TRUST */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Families Across {SECTOR} & Beyond
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Over 500 parents from {SECTOR}, Golf Course Extension Road, and surrounding areas trust KidSalonia
            for their children's grooming needs. We're one of the highest-rated kids salons in {CITY}.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { number: "500+", label: "Happy Parents" },
              { number: "4.8★", label: "Google Rating" },
              { number: "3+", label: "Years of Trust" },
            ].map((stat) => (
              <div key={stat.label} className="bg-background rounded-2xl p-6 shadow-sm border border-border/30">
                <p className="text-3xl font-extrabold text-primary">{stat.number}</p>
                <p className="text-muted-foreground font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions — Kids Salon {SECTOR}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-secondary/30 rounded-2xl p-6"
              >
                <h2 className="text-lg font-bold text-foreground mb-2">{faq.question}</h2>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book Your Child's Haircut Near {SECTOR} Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Give your child a safe, fun, and expert haircut experience at {CITY}'s most trusted kids salon — just minutes from {SECTOR}.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book?service=kids-haircut"
              className="bg-primary text-primary-foreground font-bold px-10 py-4 rounded-full text-lg hover:opacity-90 transition shadow-lg"
            >
              Book Now
            </Link>
            <a
              href="tel:8130307036"
              className="border-2 border-primary text-primary font-bold px-10 py-4 rounded-full text-lg hover:bg-primary hover:text-primary-foreground transition"
            >
              <Phone size={18} className="inline mr-2" />
              Call +91 8130307036
            </a>
          </div>
          <p className="mt-4 text-sm text-accent font-semibold animate-pulse">
            ⏰ Slots filling fast this weekend — book now!
          </p>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border p-3 flex gap-3 lg:hidden">
        <Link
          to="/book?service=kids-haircut"
          className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-full text-center text-sm shadow-lg"
        >
          Book Now
        </Link>
        <a
          href="tel:8130307036"
          className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-full text-center text-sm"
        >
          <Phone size={14} className="inline mr-1" />
          Call Now
        </a>
      </div>

      <SocialProofWidget />
      <Footer />
    </>
  );
};

export default KidsSalonSector67;
