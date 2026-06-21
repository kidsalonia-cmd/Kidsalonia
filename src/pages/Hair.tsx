import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import hairHeroBanner from "@/assets/hair-hero-banner.jpg";
import hairGirlsStyling from "@/assets/hair-girls-styling.jpg";
import hairMundan from "@/assets/hair-mundan.jpg";
import hairPartyStyling from "@/assets/gallery/gallery-21.jpeg";

const boysHairServices = [
  { name: "Boys Haircut", price: "₹299", description: "Clean, comfortable, and stylish haircuts for boys of all ages — from toddlers to teens." },
  { name: "Boys Haircut + Shampoo + Conditioner", price: "₹449", description: "Complete hair care combo with a fresh cut, gentle shampoo, and nourishing conditioner." },
  { name: "Kids Shampoo + Conditioner + Gel", price: "₹449", description: "Soft cleansing, conditioning, and styling with kid-safe products for a polished look." },
];

const girlsHairServices = [
  { name: "Girls Haircut", price: "₹499", description: "Neat, trendy haircuts tailored for little girls — layers, bobs, bangs, and more." },
  { name: "Girls Haircut + Shampoo + Conditioner", price: "₹749", description: "Complete hair care with a stylish cut, gentle wash, and deep conditioning treatment." },
];

const stylingServices = [
  { name: "Styling Blow Dry", price: "₹399", description: "Soft, polished blow dry finish perfect for birthdays, weddings, and special events." },
  { name: "Hair Straightening", price: "₹399", description: "Temporary straightening for smooth, sleek hair — ideal for special occasions." },
  { name: "Hair Curling / Crimping", price: "₹399", description: "Fun curls and crimps that kids absolutely love — safe and gentle on young hair." },
  { name: "Party Hair Styling", price: "₹599", description: "Creative, durable party hairstyles — braids, buns, updos, and themed looks for celebrations." },
  { name: "Kids Party Hair Colour", price: "₹499", description: "Temporary, wash-out safe hair colours perfect for birthday parties and festivals." },
];

const treatmentServices = [
  { name: "Flake Fighter Treatment", price: "₹349", description: "Mild anti-dandruff scalp care using kid-safe, dermatologically tested products." },
  { name: "Lice Buster Treatment", price: "₹449", description: "Safe, effective, and thorough lice removal treatment — gentle on scalp, tough on lice." },
  { name: "Hair Oiling (Almond / Walnut)", price: "₹699", description: "Nourishing oil massage with premium almond or walnut oil for strong, healthy hair growth." },
];

const specialServices = [
  { name: "Full Head Shave", price: "₹699", description: "Safe and hygienic full head shave for kids, performed with care and patience." },
  { name: "Mundan Ceremony", price: "₹1100", description: "Complete traditional mundan ceremony performed with utmost care, hygiene, and patience in a child-friendly environment." },
];

const hairFAQs = [
  {
    question: "What is the cost of a kids haircut at KidSalonia Gurugram?",
    answer: "Boys haircuts start at ₹299 and girls haircuts start at ₹499. We also offer combo packages with shampoo and conditioner. Visit us at JMD Suburbio 2, Sector 67, Gurugram or call +91 8130307036.",
  },
  {
    question: "Does KidSalonia offer mundan (head shave) services for babies?",
    answer: "Yes, we offer professional mundan services for babies and toddlers. Full head shave starts at ₹699 and the complete Mundan Ceremony is ₹1100. Our trained stylists perform the ceremony with utmost care, hygiene, and patience.",
  },
  {
    question: "Are the hair products used at KidSalonia safe for children?",
    answer: "Absolutely. We exclusively use dermatologically tested, paraben-free, tear-free, and hypoallergenic hair products from trusted brands like L'Oréal Kids, Yellow Naturals, and Tuco Kids.",
  },
  {
    question: "Can my child get temporary hair colour at KidSalonia?",
    answer: "Yes! We offer temporary, wash-out party hair colours at ₹499. These are completely safe, non-toxic, and perfect for birthday parties, festivals, and special occasions.",
  },
  {
    question: "Does KidSalonia provide lice treatment for kids?",
    answer: "Yes, our Lice Buster Treatment at ₹449 is a safe, effective, and thorough lice removal service that is gentle on your child's scalp.",
  },
  {
    question: "What age group can get a haircut at KidSalonia?",
    answer: "We cater to children of all ages — from infants (for mundan ceremonies) to teenagers. Our stylists are trained exclusively in children's hair.",
  },
];

const hairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kids Hair Services",
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
  areaServed: {
    "@type": "City",
    name: "Gurugram",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kids Hair Services Price List",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Boys Haircut" }, price: "299", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Girls Haircut" }, price: "499", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Head Shave" }, price: "699", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mundan Ceremony" }, price: "1100", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Boys Haircut + Shampoo + Conditioner" }, price: "449", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Girls Haircut + Shampoo + Conditioner" }, price: "749", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Party Hair Colour" }, price: "499", priceCurrency: "INR" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Party Hair Styling" }, price: "599", priceCurrency: "INR" },
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

const Hair = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Kids Hair Services & Pricing | Haircuts, Styling & Mundan | KidSalonia Gurugram"
        description="Best kids haircut salon in Gurugram. Boys haircuts from ₹299, girls haircuts from ₹499. Mundan, hair styling, lice treatment & party hair colour. Safe products, trained stylists. Book now!"
        canonical="https://www.kidsalonia.com/hair"
        jsonLd={[localBusinessSchema, hairServiceSchema, createFAQSchema(hairFAQs)]}
      />
      <Header />
      <SocialSidebar />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={hairHeroBanner}
          alt="Kids haircut at KidSalonia - Premium kids salon in Gurugram for boys and girls haircuts"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/90 text-lg font-semibold mb-2">KidSalonia</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Kids Hair Services
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">
            Gentle haircuts, fun styling, and safe treatments — designed to keep kids comfortable, smiling, and looking their best
          </p>
          <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" className="mt-6 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition">
            Book Now
          </a>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Happy Hair, Happy Kids
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            At KidSalonia, every haircut is more than just a trim — it's an experience designed with love, patience, and expertise. Our trained children's hairstylists use only kid-safe, hypoallergenic, tear-free products from trusted brands. Whether it's your baby's first mundan or your teenager's trendy new look, we make every visit fun and stress-free.
          </p>
        </div>

        {/* Boys Hair Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Boys Hair Services
            </h2>
            <p className="text-muted-foreground mb-6">
              Clean, comfortable cuts and styling for boys of all ages. From classic trims to trendy fades — our stylists know what boys love.
            </p>
            <div>
              {boysHairServices.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src={hairHeroBanner}
              alt="Indian boy getting a stylish haircut at KidSalonia kids salon in Gurugram"
              className="w-full h-[350px] object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Girls Hair Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden">
            <img
              src={hairGirlsStyling}
              alt="Indian girl getting braids and hair styling at KidSalonia premium kids salon Gurugram"
              className="w-full h-[350px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Girls Hair Services
            </h2>
            <p className="text-muted-foreground mb-6">
              From layered bobs to long trims with bangs — stylish, neat haircuts tailored for girls. Complete with gentle shampoo and conditioning.
            </p>
            <div>
              {girlsHairServices.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Styling & Party Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Hair Styling & Party Looks
            </h2>
            <p className="text-muted-foreground mb-6">
              Birthday parties, weddings, festivals — we create stunning party hairstyles and temporary hair colours that kids love and parents trust.
            </p>
            <div>
              {stylingServices.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src={hairPartyStyling}
              alt="Indian girl with styled bob haircut at KidSalonia kids salon Gurugram"
              className="w-full h-[350px] object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Hair Treatments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden bg-muted p-8 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-primary mb-2">100%</h3>
              <p className="text-muted-foreground text-lg">Kid-Safe Products</p>
              <p className="text-sm text-muted-foreground mt-2">Paraben-free · Tear-free · Hypoallergenic</p>
              <div className="mt-4 flex justify-center gap-4 flex-wrap">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">L'Oréal Kids</span>
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Yellow Naturals</span>
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Tuco Kids</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Hair Treatments
            </h2>
            <p className="text-muted-foreground mb-6">
              Scalp care, dandruff treatment, lice removal, and nourishing oil massages — keeping your child's hair healthy and strong.
            </p>
            <div>
              {treatmentServices.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Mundan Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Mundan (Head Shave) Ceremony
            </h2>
            <p className="text-muted-foreground mb-6">
              The mundan ceremony is a sacred milestone for Indian families. At KidSalonia, we perform this traditional ritual with the utmost care, hygiene, and patience — ensuring your baby feels safe and comfortable throughout.
            </p>
            <div>
              {specialServices.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </div>
            <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition">
              Book Mundan Appointment
            </a>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src={hairMundan}
              alt="Baby mundan ceremony head shave at KidSalonia kids salon Gurugram - safe and gentle"
              className="w-full h-[350px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Why Parents Choose KidSalonia for Kids Haircuts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Trained Kids Stylists", desc: "Our hairstylists are trained exclusively in children's hair — gentle hands, patient approach, and age-appropriate expertise." },
              { title: "100% Safe Products", desc: "We use only paraben-free, tear-free, hypoallergenic products from L'Oréal Kids, Yellow Naturals, and Tuco Kids." },
              { title: "Fun Environment", desc: "Car-shaped chairs, cartoons, gaming zone — kids love visiting KidSalonia. No tears, just smiles." },
              { title: "Near DLF, Sector 67", desc: "Conveniently located at JMD Suburbio 2, Gurugram — easy access from DLF Phase 1-5, Sector 56, 57, and Golf Course Road." },
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
      <section className="bg-primary py-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Book Your Child's Haircut Today
        </h2>
        <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Give your child the best hair experience in Gurugram. Call us or visit to book an appointment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:8130307036"
            className="bg-white text-primary font-bold px-8 py-3 rounded-full text-base hover:bg-white/90 transition"
          >
            Call +91 8130307036
          </a>
          <a href="https://wa.me/918130307036" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold px-8 py-3 rounded-full text-base hover:bg-white/10 transition">
            Book Online
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">
          Frequently Asked Questions — Kids Hair Services
        </h2>
        <div className="space-y-6">
          {hairFAQs.map((faq) => (
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

export default Hair;
