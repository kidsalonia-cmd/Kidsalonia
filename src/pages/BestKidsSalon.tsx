import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Shield, Sparkles, Clock, Users, Scissors, Baby, Palette, Phone, MapPin, CheckCircle, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import SocialProofWidget from "@/components/SocialProofWidget";
import heroImg from "@/assets/kids-haircut-hero.png";

const CITY = "Gurugram";
const AREAS = ["Sector 67", "Golf Course Road", "DLF Phase 1–5", "Sohna Road", "MG Road", "Sector 56"];

const faqs = [
  {
    question: "Is kids haircut safe at a salon?",
    answer:
      "Yes, a professional kids salon like KidSalonia uses sterilised tools, child-safe products, and trained stylists experienced with young children. Every instrument is sanitised between appointments, and our calm environment keeps kids relaxed throughout the session.",
  },
  {
    question: "What age can a baby get their first haircut?",
    answer:
      "Most babies are ready for their first haircut around 6–12 months when hair starts covering the ears or eyes. At KidSalonia, our stylists are trained to handle infants gently. We recommend booking a dedicated 'Baby First Haircut' session for the best experience.",
  },
  {
    question: "How do you handle crying kids during a haircut?",
    answer:
      "Our stylists are trained in child psychology techniques — we use distraction toys, cartoons on personal screens, and a playful environment. If a child is uncomfortable, we pause and resume at the child's pace. Parents are always welcome to stay close.",
  },
  {
    question: "How long does a kids haircut take?",
    answer:
      "A standard kids haircut at KidSalonia takes about 15–25 minutes. Baby first haircuts may take slightly longer as we work at a gentler pace. Styling or themed haircuts may add 10–15 extra minutes.",
  },
  {
    question: "Do I need to book in advance for a kids haircut?",
    answer:
      "Walk-ins are welcome, but we strongly recommend booking in advance — especially on weekends and holidays — to avoid wait times. You can call us at +91 8130307036 or visit our contact page to reserve a slot.",
  },
];

const services = [
  {
    icon: Scissors,
    title: "Kids Haircut",
    desc: "Trendy, age-appropriate cuts for boys and girls by trained child-friendly stylists.",
    price: "From ₹299",
  },
  {
    icon: Baby,
    title: "Baby First Haircut",
    desc: "A gentle, memorable milestone experience. We go slow, keep it calm, and make it special.",
    price: "From ₹499",
  },
  {
    icon: Palette,
    title: "Styling for Kids",
    desc: "Party hairdos, braids, themed styles — perfect for birthdays, school events, and weddings.",
    price: "From ₹399",
  },
];

const whyChoose = [
  { icon: Users, text: "Child-friendly trained stylists" },
  { icon: Shield, text: "Hygienic & sanitized tools" },
  { icon: Heart, text: "Comfortable seating for kids" },
  { icon: Clock, text: "Quick & stress-free experience" },
  { icon: Star, text: "Trusted by 500+ parents" },
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
      streetAddress: "Ground floor, A-19 JMD Suburbio 2",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Gurugram",
  },
  description:
    "Professional kids haircut services in Gurugram. Safe, fun, and expert haircuts for babies, toddlers, and kids at KidSalonia.",
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

const BestKidsSalon = () => {
  const faqSchema = createFAQSchema(faqs);

  return (
    <>
      <SEO
        title={`Best Kids Salon Near Me in ${CITY} — Safe Haircuts for Kids`}
        description={`Looking for the best kids salon near you in ${CITY}? KidSalonia offers safe, fun haircuts for babies, toddlers & kids. Trained stylists, sanitized tools, 4.8★ rated. Book now!`}
        canonical={`https://www.kidsalonia.com/best-kids-salon-${CITY.toLowerCase()}`}
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
              Best Kids Salon Near You in{" "}
              <span className="text-primary">{CITY}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-lg">
              Safe, fun, and expert haircuts for babies, toddlers, and kids — designed with love at KidSalonia.
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
                <Shield size={16} /> 100% Safe Products
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact-us"
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

            {/* Urgency */}
            <p className="mt-4 text-sm text-accent font-semibold animate-pulse">
              ⏰ Limited slots available today — book now!
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
              alt={`Best kids haircut salon in ${CITY} — happy child getting a haircut at KidSalonia`}
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
            What Is the Best Kids Salon Near Me in {CITY}?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <strong>KidSalonia</strong> is {CITY}'s top-rated kids salon, trusted by 500+ parents. With trained child-friendly stylists,
            fully sanitized tools, and a playful environment designed to keep children calm and happy, it's the safest and most
            fun place for your child's haircut in {CITY}.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Why Parents Choose KidSalonia
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
                className="flex items-start gap-4 bg-secondary/40 rounded-2xl p-6"
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
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Kids Haircut Services
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
                className="bg-background rounded-2xl p-8 shadow-md border border-border/50 text-center hover:shadow-xl transition-shadow"
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
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Safety & Hygiene — Our Promise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Sanitized Tools & Equipment",
                desc: "Every comb, scissor, and clipper is sterilised between appointments using hospital-grade disinfectants.",
              },
              {
                icon: Heart,
                title: "Kid-Safe, Hypoallergenic Products",
                desc: "We use only dermatologically tested, chemical-free products that are gentle on delicate young skin and hair.",
              },
              {
                icon: Sparkles,
                title: "Calm, Anxiety-Free Environment",
                desc: "Cartoon screens, fun chairs, toys, and trained staff who know how to soothe anxious children.",
              },
              {
                icon: CheckCircle,
                title: "Trained Child Specialists",
                desc: "Our stylists undergo child-handling training — they know when to pause, play, and proceed gently.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-5 p-6 rounded-2xl bg-secondary/30"
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

      {/* PRICING */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Transparent Pricing
          </h2>
          <p className="text-muted-foreground mb-8">
            Quality haircuts at family-friendly prices. No hidden charges.
          </p>
          <div className="bg-background rounded-2xl shadow-md border border-border/50 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-6 py-4 font-bold text-foreground">Service</th>
                  <th className="px-6 py-4 font-bold text-foreground text-right">Starting Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr>
                  <td className="px-6 py-4 text-foreground">Boys Haircut</td>
                  <td className="px-6 py-4 text-primary font-bold text-right">₹299</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-foreground">Girls Haircut</td>
                  <td className="px-6 py-4 text-primary font-bold text-right">₹499</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-foreground">Baby First Haircut</td>
                  <td className="px-6 py-4 text-primary font-bold text-right">₹499</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-foreground">Party / Event Styling</td>
                  <td className="px-6 py-4 text-primary font-bold text-right">₹399</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LOCAL TRUST */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proudly Serving Families Across {CITY}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Located at JMD Suburbio 2, Sector 67, {CITY} — easily accessible from all major areas.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {AREAS.map((area) => (
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
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`KidSalonia location in ${CITY}`}
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
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
                className="bg-background rounded-2xl p-6 shadow-sm border border-border/30"
              >
                <h2 className="text-lg font-bold text-foreground mb-3">{faq.question}</h2>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Book Your Child's Haircut Today
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Give your little one the safest, most fun salon experience in {CITY}. Limited weekend slots — book now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact-us"
              className="bg-background text-primary font-bold px-10 py-4 rounded-full text-lg hover:shadow-xl transition"
            >
              Book Now
            </Link>
            <a
              href="tel:8130307036"
              className="border-2 border-primary-foreground text-primary-foreground font-bold px-10 py-4 rounded-full text-lg hover:bg-primary-foreground hover:text-primary transition"
            >
              Call +91 8130307036
            </a>
          </div>
        </div>
      </section>

      {/* STICKY CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-3">
        <div className="flex gap-3">
          <Link
            to="/contact-us"
            className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-full text-center text-sm"
          >
            Book Now
          </Link>
          <a
            href="tel:8130307036"
            className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-full text-center text-sm"
          >
            Call Now
          </a>
        </div>
      </div>

      <div className="lg:hidden h-16" /> {/* spacer for sticky CTA */}

      <SocialProofWidget />
      <Footer />
    </>
  );
};

export default BestKidsSalon;
