import Header from "@/components/Header";

import HeroBanner from "@/components/HeroBanner";
import IntroSection from "@/components/IntroSection";
import HairSection from "@/components/HairSection";
import NailsSection from "@/components/NailsSection";
import SkinSection from "@/components/SkinSection";
import StatsBar from "@/components/StatsBar";
import ProductsSection from "@/components/ProductsSection";
import InsightsSection from "@/components/InsightsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import SocialProofWidget from "@/components/SocialProofWidget";

const homepageFAQs = [
  {
    question: "What age group does KidSalonia cater to?",
    answer: "KidSalonia caters to children of all ages, from infants (for mundan/head shave ceremonies) to teenagers. We also offer nail services for moms.",
  },
  {
    question: "Is KidSalonia safe for toddlers and babies?",
    answer: "Absolutely! Our salon is specifically designed for children. We use kid-safe, hypoallergenic, tear-free products and our stylists are trained to handle young children with patience and care.",
  },
  {
    question: "What services does KidSalonia offer?",
    answer: "We offer kids haircuts (boys & girls), hair styling, hair colouring (temporary), nail art, nail extensions, crystal jelly manicure & pedicure, kids party makeup, full head shave, mundan ceremony, lice treatment, and more.",
  },
  {
    question: "Where is KidSalonia located?",
    answer: "KidSalonia is located at Ground floor, A-19 JMD Suburbio 2, Gurugram, Haryana. We are open Monday and Wednesday to Friday from 11:30 AM to 8:30 PM, and Saturday to Sunday from 10:30 AM to 9:00 PM (closed on Tuesdays).",
  },
  {
    question: "How much does a kids haircut cost at KidSalonia?",
    answer: "Boys haircuts start at ₹299 and girls haircuts start at ₹499. We also offer combo packages with shampoo and conditioner. Visit our salon or call +91 8130307036 for the full price list.",
  },
  {
    question: "Does KidSalonia use safe products for children?",
    answer: "Yes, we exclusively use dermatologically tested, paraben-free, and hypoallergenic products from trusted brands like L'Oréal Kids, Yellow Naturals, and Tuco Kids.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Best Kids & Family Salon in Gurgaon | KidSalonia"
        description="KidSalonia is a premium kids and adult family salon in Gurgaon offering haircuts, nail art, skin care and styling for kids, women and families."
        canonical="https://www.kidsalonia.com/"
        jsonLd={[localBusinessSchema, createFAQSchema(homepageFAQs)]}
      />
      
      <Header />
      <SocialSidebar />
      <HeroBanner />
      <IntroSection />
      <HairSection />
      <NailsSection />
      <SkinSection />
      <StatsBar />
      <ProductsSection />
      <InsightsSection />
      <TestimonialsSection />
      <GallerySection />
      <SocialProofWidget />
      <Footer />
    </div>
  );
};

export default Index;
