import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookNowCTA from "@/components/BookNowCTA";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import skinHeroBanner from "@/assets/gallery/skin-1.jpg";
import skinPartyMakeup from "@/assets/skin-facial-real.png";
import skinJellyManicure from "@/assets/gallery/skin-3.jpg";

const makeupServices = [
  { name: "Kids Party Makeup (Classic)", price: "₹499", description: "Light, playful makeup for birthdays and celebrations — soft colours, gentle products, kid-safe formulas." },
  { name: "Kids Occasional Makeup", price: "₹799", description: "Elegant, natural-look makeup for weddings, family functions, and special events — designed for comfort." },
];

const handFootCareServices = [
  { name: "Kids Crystal Jelly Manicure", price: "₹499", description: "Delicate hand care with crystal jelly beads — a fun, sensory experience that kids love. Includes gentle cleansing, moisturising, and nail shaping." },
  { name: "Kids Crystal Jelly Pedicure", price: "₹599", description: "Relaxing foot care with colourful jelly beads — soothing, fun, and hygienic. Includes foot soak, gentle scrub, and moisturising." },
];

const skinFAQs = [
  {
    question: "Is kids party makeup safe at KidSalonia?",
    answer: "Yes, absolutely. We use only dermatologically tested, hypoallergenic, and non-toxic makeup products designed specifically for children's sensitive skin. No harsh chemicals.",
  },
  {
    question: "What is a crystal jelly manicure for kids?",
    answer: "It's a fun, sensory hand care experience using colourful crystal jelly beads. The treatment includes gentle cleansing, moisturising, and nail shaping — kids find it exciting and relaxing at the same time. Priced at ₹499.",
  },
  {
    question: "How much does kids party makeup cost at KidSalonia Gurugram?",
    answer: "Kids classic party makeup starts at ₹499 and occasional/event makeup is ₹799. Visit us at JMD Suburbio 2, Sector 67, Gurugram or call +91 8130307036.",
  },
  {
    question: "Can boys also get skin care services at KidSalonia?",
    answer: "Of course! Our crystal jelly manicure and pedicure services are enjoyed by both boys and girls. Skin care is for everyone!",
  },
  {
    question: "What age group is kids makeup suitable for?",
    answer: "Our kids makeup services are suitable for children aged 3 and above. We use ultra-gentle, water-based products that are easily removable and completely safe.",
  },
  {
    question: "Does KidSalonia offer skin care packages for birthday parties?",
    answer: "Yes! We offer special birthday party packages that include nail art, makeup, and jelly manicure/pedicure sessions for groups. Contact us at +91 8130307036 for custom packages.",
  },
];

const skinServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kids Skin & Makeup Services",
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
    name: "Kids Skin & Makeup Price List",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Party Makeup (Classic)" }, price: "499", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Crystal Jelly Manicure" }, price: "499", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Crystal Jelly Pedicure" }, price: "599", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Occasional Makeup" }, price: "799", priceCurrency: "INR" },
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

const Skin = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Kids Skin Care & Makeup Services | Pricing | KidSalonia Gurugram"
        description="Gentle kids skin care and makeup at KidSalonia Gurugram. Party makeup from ₹499, crystal jelly manicure ₹499, pedicure ₹599. Safe, hypoallergenic products. Book now!"
        canonical="https://www.kidsalonia.com/skin"
        jsonLd={[localBusinessSchema, skinServiceSchema, createFAQSchema(skinFAQs)]}
      />
      <Header />
      <SocialSidebar />

      {/* Hero */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img src={skinHeroBanner} alt="Kids skin care and gentle facial treatment at KidSalonia premium kids salon Gurugram" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/90 text-lg font-semibold mb-2">KidSalonia</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">Kids Skin & Makeup</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">Gentle, kid-safe skin and makeup services designed for comfort, care, and those special moments</p>
          <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" className="mt-6 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition">Book Now</a>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Soft Care for Little Skin</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Every child deserves to feel special. At KidSalonia, our skin and makeup services use only dermatologically tested, hypoallergenic, and non-toxic products designed for children's delicate skin. Whether it's a birthday party look or a relaxing jelly manicure, we make every visit comfortable, safe, and memorable.
          </p>
        </div>

        {/* Makeup Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Kids Makeup Services</h2>
            <p className="text-muted-foreground mb-6">Light, playful, and age-appropriate makeup for birthdays, weddings, school functions, and special occasions. Gentle on skin, easy to remove.</p>
            <div>{makeupServices.map((s) => <ServiceCard key={s.name} {...s} />)}</div>
            <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition">Book Makeup</a>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src={skinPartyMakeup} alt="Indian girl getting light party makeup at KidSalonia kids salon Gurugram" className="w-full h-[350px] object-cover" loading="lazy" />
          </div>
        </div>

        {/* Crystal Jelly Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden">
            <img src={skinJellyManicure} alt="Indian girl enjoying crystal jelly manicure treatment at KidSalonia Gurugram" className="w-full h-[350px] object-cover" loading="lazy" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Crystal Jelly Hand & Foot Care</h2>
            <p className="text-muted-foreground mb-6">A unique sensory experience that kids love! Colourful jelly beads combined with gentle cleansing, moisturising, and nail care — relaxing, fun, and hygienic.</p>
            <div>{handFootCareServices.map((s) => <ServiceCard key={s.name} {...s} />)}</div>
          </div>
        </div>

        {/* Safe Products Badge */}
        <div className="bg-muted rounded-xl p-8 text-center mb-16">
          <h3 className="text-5xl font-extrabold text-primary mb-2">100%</h3>
          <p className="text-muted-foreground text-lg">Kid-Safe & Hypoallergenic</p>
          <p className="text-sm text-muted-foreground mt-2">Dermatologically Tested · Non-Toxic · Gentle Formulas</p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">No Harsh Chemicals</span>
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Paraben-Free</span>
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Easy to Remove</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Parents Choose KidSalonia for Kids Skin Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Dermatologist Approved", desc: "All products are dermatologically tested and approved for children's sensitive, delicate skin." },
              { title: "Trained Professionals", desc: "Our skin care specialists are trained in gentle application techniques designed for children's comfort." },
              { title: "Fun Experiences", desc: "Crystal jelly treatments and glitter makeup — kids look forward to every visit at KidSalonia." },
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
          title="Book a Skin Care Session Today"
          description="Book gentle kids skin care, party makeup, jelly manicure, or pedicure at KidSalonia Gurugram."
        />
      </div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions — Kids Skin & Makeup</h2>
        <div className="space-y-6">
          {skinFAQs.map((faq) => (
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

export default Skin;
