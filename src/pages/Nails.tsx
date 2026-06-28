import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookNowCTA from "@/components/BookNowCTA";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import nailsHeroBanner from "@/assets/nails-hero-premium.jpg";
import kidsNailsImg from "@/assets/nails-kids-realistic.jpg";
import adultNailsImg from "@/assets/nails-adult-realistic.jpg";



const adultNailServices = [
  { name: "Nails Extension", price: "₹1,800", description: "Stylish extensions for special occasions — durable and elegant." },
  { name: "Nails Refill", price: "₹1,500", description: "Professional refill and maintenance of existing nail extensions." },
  { name: "Gel Overlay", price: "₹1,600", description: "Smooth, protective gel finish over natural nails for extra strength and shine." },
  { name: "French on Natural Nails", price: "₹1,200", description: "Classic French manicure on natural nails — clean and timeless." },
  { name: "Ombre / Cat Eye", price: "₹1,000", description: "Trendy ombre gradients and mesmerising cat-eye nail effects." },
  { name: "Chrome Nails", price: "₹1,000", description: "Glossy, mirror-like chrome finish — ultra-modern and head-turning." },
  { name: "Marble Nails", price: "₹800", description: "Elegant marble-style nail art — soft veins and sophisticated patterns." },
  { name: "Gel Paint on Natural Nails", price: "₹800", description: "Bright, long-lasting gel colours applied directly on natural nails." },
  { name: "Glitter Art", price: "₹800", description: "Sparkly, dazzling glitter nail designs for parties and celebrations." },
  { name: "Multicolour French", price: "₹500", description: "Colourful twist on the classic French manicure — trendy and vibrant." },
  { name: "Extension Removal", price: "₹500", description: "Careful, professional removal of nail extensions without nail damage." },
  { name: "Paint Removal", price: "₹350", description: "Safe and gentle nail paint removal without damage." },
  { name: "French Art", price: "₹300", description: "Creative French nail variations with modern twists." },
  { name: "Nail Repair", price: "₹250", description: "Quick fix for chipped or broken nails — restore and strengthen." },
  { name: "3D Art on Nails (Per Nail)", price: "₹200", description: "Fun three-dimensional nail decorations and embellishments." },
  { name: "Bow Set (Per Pair)", price: "₹200–300", description: "Cute bow accessories for a playful, fashionable nail look." },
  { name: "Brush Art (Per Nail)", price: "₹100", description: "Hand-painted nail designs — florals, geometric patterns, and custom art." },
  { name: "Rhinestone (Per Piece)", price: "₹20–50", description: "Add sparkle with premium rhinestones on any nail design." },
];

const kidsNailServices = [
  { name: "Kids Nail Art", price: "₹399", description: "Creative, colourful nail art with flowers, stars, glitter, and cartoon designs — 100% safe products." },
  { name: "French Nail Polish Hands", price: "₹199", description: "Classic French nail look scaled down for kids — elegant and adorable." },
  { name: "French Nail Polish Feet", price: "₹199", description: "Dainty French polish for little feet — clean, chic, and kid-safe." },
  { name: "Nail Polish Hands", price: "₹99", description: "Cute, safe nail polish application for little hands — vibrant colours kids love." },
  { name: "Nail Polish Feet", price: "₹99", description: "Fun, sparkly nail polish for tiny toes — perfect for parties and playdates." },
];

const nailsFAQs = [
  {
    question: "Is kids nail art safe at KidSalonia?",
    answer: "Absolutely. We use only non-toxic, water-based, peel-off nail polishes that are 100% safe for children. No harsh chemicals, no fumes — just colourful fun.",
  },
  {
    question: "What is the cost of kids nail art at KidSalonia Gurugram?",
    answer: "Kids nail polish starts at just ₹99 for hands or feet. French nail polish is ₹199, and creative kids nail art with designs is ₹399. Visit us at JMD Suburbio 2, Sector 67, Gurugram.",
  },
  {
    question: "Do you offer nail services for moms too?",
    answer: "Yes! KidSalonia offers a full range of nail services for moms — from gel polish and nail extensions to chrome, ombre, marble art, and more. Mom-daughter nail sessions are our speciality!",
  },
  {
    question: "How long does kids nail art last?",
    answer: "Our kids nail polish is designed to be easily removable. Water-based polishes typically last 2–4 days and peel off gently without any remover needed.",
  },
  {
    question: "Can I book a mom-daughter nail session at KidSalonia?",
    answer: "Absolutely! Our mom-daughter nail sessions are very popular. Book together for matching manicures, nail art, and a fun bonding experience. Call +91 8130307036.",
  },
  {
    question: "Do you offer nail extensions at KidSalonia?",
    answer: "Yes, we offer professional nail extensions at ₹1,800, along with gel overlay (₹1,600), refills (₹1,500), and a wide range of nail art options for adults.",
  },
];

const nailsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kids Nail Art & Nail Services",
  provider: {
    "@type": "HairSalon",
    name: "KidSalonia",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ground floor, A-19 JMD Suburbio 2",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    telephone: "+918130307036",
  },
  areaServed: { "@type": "City", name: "Gurugram" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nail Services Price List",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Nail Polish Hands" }, price: "99", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Nail Art" }, price: "399", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gel Paint on Natural Nails" }, price: "800", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nails Extension" }, price: "1800", priceCurrency: "INR" },
    ],
  },
};

const ServiceCard = ({ name, price, description }: { name: string; price: string; description: string }) => (
  <div className="flex items-start justify-between py-4 border-b border-border/40 gap-4">
    <div className="flex-1">
      <h3 className="font-bold text-foreground text-base">{name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    <span className="text-primary font-bold text-lg whitespace-nowrap">{price}</span>
  </div>
);

const Nails = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Acrylic Nail Extensions & Nail Extensions Near Me | Gel Nails, Kids Nail Art | KidSalonia"
        description="Best acrylic nail extensions in Gurugram. Looking for nail extensions near me? KidSalonia offers acrylic nails, gel nail extensions, nail art & kids nail art from ₹99."
        canonical="https://www.kidsalonia.com/nails"
        jsonLd={[localBusinessSchema, nailsServiceSchema, createFAQSchema(nailsFAQs)]}
      />
      <Header />
      <SocialSidebar />

      {/* Hero */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img src={nailsHeroBanner} alt="premium kids nail salon manicure" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/90 text-lg font-semibold mb-2">KidSalonia</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">Acrylic Nail Extensions & Nail Art Near Me</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">Looking for <strong>acrylic nail extensions</strong> or <strong>nail extensions near me</strong>? KidSalonia offers premium acrylic nails, gel nail extensions, trendy nail art designs for women — plus safe, colourful nail art for kids in Gurugram.</p>
          <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" className="mt-6 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition">Book Now</a>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Acrylic Nail Extensions, Gel Nails & Creative Nail Art in Gurugram</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Searching for <strong>acrylic nail extensions</strong> or <strong>nail extensions near me</strong> in Gurugram? KidSalonia is your go-to destination for premium <strong>acrylic nail extensions</strong>, long-lasting <strong>gel nail extensions</strong>, and stunning <strong>nail art designs</strong> for women — alongside 100% safe, non-toxic nail art for kids. Whether you want trendy chrome nails, elegant ombre, or a fun mom-daughter <strong>manicure session</strong>, we've got you covered. Our expert nail artists use salon-grade products to deliver flawless acrylic nails every time.
          </p>
        </div>

        {/* Section 1 – Adult Nail Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Adult Nail Extensions & Nail Art</h2>
            <p className="text-muted-foreground mb-6">From <strong>acrylic nail extensions</strong> and <strong>gel nail extensions</strong> to chrome, ombre, and marble — premium <strong>nail art designs</strong> at affordable prices. Find us when you search for the <strong>best nail salon near me</strong> in Gurugram.</p>
            <div>{adultNailServices.map((s) => <ServiceCard key={s.name} {...s} />)}</div>
          </div>
          <div className="lg:sticky lg:top-24 rounded-xl overflow-hidden">
            <img src={adultNailsImg} alt="premium kids nail salon manicure" className="w-full h-auto object-contain" loading="lazy" />
          </div>
        </div>

        {/* Section 2 – Kids Nail Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="order-2 lg:order-1 lg:sticky lg:top-24 rounded-xl overflow-hidden">
            <img src={kidsNailsImg} alt="Kids manicure nail art" className="w-full h-auto object-contain" loading="lazy" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Kids Nail Services</h2>
            <p className="text-muted-foreground mb-6">Fun, safe, and colourful nail services designed exclusively for children. Non-toxic, water-based polishes that peel off easily.</p>
            <div>{kidsNailServices.map((s) => <ServiceCard key={s.name} {...s} />)}</div>
            <div className="mt-8 rounded-xl bg-muted p-6 text-center">
              <h3 className="text-4xl font-extrabold text-primary mb-1">100%</h3>
              <p className="text-muted-foreground text-base">Non-Toxic & Safe</p>
              <p className="text-sm text-muted-foreground mt-1">Water-based · Peel-off · Kid-friendly</p>
              <div className="mt-3 flex justify-center gap-3 flex-wrap">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">No Harsh Chemicals</span>
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">No Fumes</span>
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Easy Peel-Off</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Parents Choose KidSalonia for Kids Nail Art</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "100% Safe Products", desc: "Non-toxic, water-based, peel-off nail polishes. No harsh chemicals, no acetone, no fumes." },
              { title: "Trained Nail Artists", desc: "Our artists specialise in kids nail art — gentle, patient, and creative with every design." },
              { title: "Mom-Daughter Sessions", desc: "Bond over matching manicures! Get your nails done together in our kid-friendly salon." },
              { title: "Near DLF, Sector 67", desc: "Located at JMD Suburbio 2, Gurugram — easy access from DLF Phase 1-5, Sector 56, 57, and Golf Course Road." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BookNowCTA
          title="Book a Nail Art Session Today"
          description="Book kid-safe nail art, manicure, pedicure, or a mom-daughter nail session at KidSalonia."
        />
      </div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions — Kids Nail Services</h2>
        <div className="space-y-6">
          {nailsFAQs.map((faq) => (
            <div key={faq.question} className="border-b border-border pb-5">
              <h3 className="font-bold text-foreground text-base mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nails;
