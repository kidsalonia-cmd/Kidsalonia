import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import WeeklyBanner from "@/components/WeeklyBanner";
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
import SocialProofWidget from "@/components/SocialProofWidget";

import SEO, {
  BASE_URL,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/SEO";

const homepageFAQs = [
  {
    question: "What age group does KidSalonia cater to?",
    answer:
      "KidSalonia caters to babies, toddlers, kids, teenagers and families. We also offer nail art, manicure and pedicure services for moms and families.",
  },
  {
    question: "Is KidSalonia safe for toddlers and babies?",
    answer:
      "Yes. KidSalonia is designed for children with trained staff, a child-friendly environment and safe products suitable for young kids.",
  },
  {
    question: "What services does KidSalonia offer?",
    answer:
      "KidSalonia offers kids haircuts, baby first haircut, mundan, hair styling, nail art, nail extensions, manicure, pedicure, hairdresser services and family salon services.",
  },
  {
    question: "Where is KidSalonia located?",
    answer:
      "KidSalonia is located at Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101, near Airia Mall and Golf Course Extension Road.",
  },
  {
    question: "How much does a kids haircut cost at KidSalonia?",
    answer:
      "Boys haircuts start from ₹299 and girls haircuts start from ₹499. For updated prices on mundan, nail art, manicure and pedicure, call +91 81303 07036 or +91 97738 64949.",
  },
  {
    question: "Does KidSalonia provide mundan services?",
    answer:
      "Yes. KidSalonia provides hygienic mundan and baby first haircut services in a safe and comfortable kids salon environment.",
  },
];

const homepageServiceSchema = createServiceSchema({
  name: "Kids Salon, Nail Art, Mundan, Manicure and Pedicure in Gurgaon",
  description:
    "KidSalonia offers child-friendly salon services in Gurugram including kids haircut, baby first haircut, mundan, nail art, nail extensions, manicure, pedicure and hairdresser services.",
  url: `${BASE_URL}/`,
  serviceType: "Kids Salon, Nail Studio and Hairdresser Services",
});

const homepageBreadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: `${BASE_URL}/` },
]);

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Best Kids Salon, Nail Art & Mundan in Gurgaon | KidSalonia"
        description="KidSalonia is Gurugram’s trusted kids salon and nail art studio for kids haircuts, baby first haircut, mundan, manicure, pedicure and hairdresser services near Airia Mall."
        canonical={`${BASE_URL}/`}
        jsonLd={[
          organizationSchema,
          websiteSchema,
          localBusinessSchema,
          homepageServiceSchema,
          createFAQSchema(homepageFAQs),
          homepageBreadcrumbSchema,
        ]}
      />

      <Header />
      <SocialSidebar />
      <HeroBanner />
      <WeeklyBanner />
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
