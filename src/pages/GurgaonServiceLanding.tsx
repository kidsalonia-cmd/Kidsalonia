import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, {
  BASE_URL,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/SEO";

export type GurgaonServiceKey = "kids-haircut" | "nail-art" | "manicure" | "pedicure";

type ServiceConfig = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  eyebrow: string;
  intro: string;
  serviceType: string;
  benefits: string[];
  related: { label: string; to: string }[];
  faqs: { question: string; answer: string }[];
};

const configs: Record<GurgaonServiceKey, ServiceConfig> = {
  "kids-haircut": {
    slug: "kids-haircut-gurgaon",
    title: "Kids Haircut in Gurgaon | Children's Cuts at KidSalonia",
    h1: "Kids Haircut & Children's Cuts in Gurgaon",
    description:
      "Book a kids haircut in Gurgaon at KidSalonia, Sector 67. Children's cuts for babies, toddlers, boys and girls, plus first haircut and mundan services near Airia Mall.",
    eyebrow: "Dedicated kids salon in Sector 67, Gurugram",
    intro:
      "KidSalonia is built around children, not adapted from a regular salon. Our team handles babies, toddlers, boys and girls with patience, child-friendly seating and a calmer haircut routine. Parents can stay close throughout the service and discuss the preferred cut before we begin.",
    serviceType: "Children's Haircut",
    benefits: [
      "Children's cuts for toddlers, boys and girls",
      "Baby first haircut and mundan options",
      "Patient stylists used to nervous children",
      "Hygienic tools and a child-friendly salon environment",
      "Convenient Sector 67 location near Airia Mall and Golf Course Extension Road",
    ],
    related: [
      { label: "Kids Hair Services & Prices", to: "/hair" },
      { label: "Baby First Haircut", to: "/baby-first-haircut" },
      { label: "Mundan Ceremony", to: "/mundan-ceremony-gurgaon" },
      { label: "Kids Salon Sector 67", to: "/kids-salon-sector-67-gurugram" },
    ],
    faqs: [
      {
        question: "Do you provide children's cuts for toddlers?",
        answer:
          "Yes. KidSalonia provides children's cuts for toddlers and young children with a patient, child-focused approach. Parents can stay with the child during the appointment.",
      },
      {
        question: "Do you offer a baby's first haircut?",
        answer:
          "Yes. Baby first haircut appointments are available, along with full head shave and mundan services. Advance booking is recommended.",
      },
      {
        question: "Where is KidSalonia in Gurgaon?",
        answer:
          "KidSalonia is at Ground Floor, A-19 JMD Suburbio 2, Sector 67, Gurugram, Haryana 122101, near Airia Mall and Golf Course Extension Road.",
      },
      {
        question: "How do I book a kids haircut?",
        answer:
          "Call +91 81303 07036 or +91 97738 64949 to confirm availability and reserve a haircut appointment.",
      },
    ],
  },
  "nail-art": {
    slug: "nail-art-gurgaon",
    title: "Nail Art in Gurgaon | Kids, Teens & Moms | KidSalonia",
    h1: "Nail Art in Gurgaon",
    description:
      "Book nail art in Gurgaon at KidSalonia, Sector 67. Creative nail designs for kids, teens and moms with manicure and pedicure options near Airia Mall.",
    eyebrow: "Nail salon services at KidSalonia Gurugram",
    intro:
      "KidSalonia offers nail art for kids, teens and moms, from simple colour and playful designs to occasion-ready looks. Our nail services are available at the same Sector 67 salon, making it easy for families to combine hair and nail appointments in one visit.",
    serviceType: "Nail Art",
    benefits: [
      "Kids nail art and age-appropriate designs",
      "Nail art options for teens and moms",
      "Manicure and pedicure services available",
      "Hygienic nail preparation and careful application",
      "Sector 67 location near Airia Mall",
    ],
    related: [
      { label: "Nail Services & Prices", to: "/nails" },
      { label: "Kids Nail Art", to: "/kids-nail-art" },
      { label: "Manicure in Gurgaon", to: "/manicure-gurgaon" },
      { label: "Pedicure in Gurgaon", to: "/pedicure-gurgaon" },
    ],
    faqs: [
      {
        question: "Does KidSalonia offer nail art for children?",
        answer:
          "Yes. KidSalonia offers colourful, age-appropriate nail art options for children as well as designs for teens and moms.",
      },
      {
        question: "Can I book manicure or pedicure with nail art?",
        answer:
          "Yes. Manicure and pedicure services are available. Call before visiting to confirm the exact service combination and appointment time.",
      },
      {
        question: "Where is the nail salon located?",
        answer:
          "KidSalonia is at Ground Floor, A-19 JMD Suburbio 2, Sector 67, Gurugram, Haryana 122101, near Airia Mall.",
      },
    ],
  },
  manicure: {
    slug: "manicure-gurgaon",
    title: "Manicure in Gurgaon | Kids & Family Nail Care | KidSalonia",
    h1: "Manicure in Gurgaon",
    description:
      "Book a manicure in Gurgaon at KidSalonia, Sector 67. Hygienic hand and nail care for kids, teens and moms with optional nail art near Airia Mall.",
    eyebrow: "Manicure and nail care in Sector 67",
    intro:
      "Our manicure services focus on clean preparation, comfortable grooming and a neat finish. Families can choose a manicure on its own or combine it with nail art depending on the available service package.",
    serviceType: "Manicure",
    benefits: [
      "Hygienic hand and nail grooming",
      "Options suitable for kids, teens and moms",
      "Nail art add-ons available on selected services",
      "Convenient family salon location in Sector 67",
    ],
    related: [
      { label: "Nail Services & Prices", to: "/nails" },
      { label: "Nail Art in Gurgaon", to: "/nail-art-gurgaon" },
      { label: "Pedicure in Gurgaon", to: "/pedicure-gurgaon" },
    ],
    faqs: [
      {
        question: "Does KidSalonia provide manicure services for kids?",
        answer:
          "Yes. KidSalonia offers child-friendly manicure options as well as manicure services for teens and moms. Ask the team which package is suitable when booking.",
      },
      {
        question: "Can manicure be combined with nail art?",
        answer:
          "Yes, selected manicure services can be paired with nail colour or nail art. Please confirm the available combination when booking.",
      },
    ],
  },
  pedicure: {
    slug: "pedicure-gurgaon",
    title: "Pedicure in Gurgaon | Kids & Family Foot Care | KidSalonia",
    h1: "Pedicure in Gurgaon",
    description:
      "Book a pedicure in Gurgaon at KidSalonia, Sector 67. Comfortable, hygienic foot and nail grooming for kids, teens and moms near Airia Mall.",
    eyebrow: "Pedicure and family nail care in Sector 67",
    intro:
      "KidSalonia's pedicure services are designed around clean, comfortable foot and nail grooming. Customers can confirm available polish, spa or nail-art finishing options when booking their appointment.",
    serviceType: "Pedicure",
    benefits: [
      "Clean and comfortable foot grooming",
      "Options for kids, teens and moms",
      "Polish or finishing options on selected services",
      "Easy-to-reach Sector 67 salon location",
    ],
    related: [
      { label: "Nail Services & Prices", to: "/nails" },
      { label: "Nail Art in Gurgaon", to: "/nail-art-gurgaon" },
      { label: "Manicure in Gurgaon", to: "/manicure-gurgaon" },
    ],
    faqs: [
      {
        question: "Does KidSalonia provide pedicure services for children?",
        answer:
          "Yes. KidSalonia offers child-friendly pedicure options along with pedicure services for teens and moms. Confirm the suitable option when booking.",
      },
      {
        question: "How can I book a pedicure?",
        answer:
          "Call +91 81303 07036 or +91 97738 64949 to confirm the pedicure service and reserve an appointment.",
      },
    ],
  },
};

const GurgaonServiceLanding = ({ service }: { service: GurgaonServiceKey }) => {
  const config = configs[service];
  const canonical = `${BASE_URL}/${config.slug}`;
  const serviceSchema = createServiceSchema({
    name: `${config.serviceType} in Gurgaon`,
    description: config.description,
    url: canonical,
    serviceType: config.serviceType,
    areaServedName: "Gurugram",
  });
  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: `${BASE_URL}/` },
    { name: config.serviceType, url: canonical },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={config.title}
        description={config.description}
        canonical={canonical}
        jsonLd={[
          organizationSchema,
          websiteSchema,
          localBusinessSchema,
          serviceSchema,
          createFAQSchema(config.faqs),
          breadcrumbs,
        ]}
      />
      <Header />
      <SocialSidebar />

      <main>
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span>{config.serviceType}</span>
            </nav>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{config.eyebrow}</p>
            <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{config.h1}</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{config.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/book?service=${encodeURIComponent(config.serviceType)}`} className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Book Appointment</Link>
              <a href="tel:+918130307036" className="rounded-full border border-primary px-7 py-3 font-semibold text-primary">Call 81303 07036</a>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-3xl font-bold">Why families choose KidSalonia</h2>
            <ul className="space-y-3 text-muted-foreground">
              {config.benefits.map((benefit) => <li key={benefit}>✓ {benefit}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl border bg-card p-7">
            <h2 className="mb-4 text-2xl font-bold">Visit KidSalonia</h2>
            <p className="text-muted-foreground">Ground Floor, A-19 JMD Suburbio 2, Sector 67, Gurugram, Haryana 122101</p>
            <p className="mt-3 text-muted-foreground">Near Airia Mall and Golf Course Extension Road.</p>
            <p className="mt-3 text-muted-foreground">Call before travelling to confirm service availability and appointment timing.</p>
          </div>
        </section>

        <section className="bg-muted/30 py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-3xl font-bold">Related services</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.related.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border bg-background p-5 font-semibold hover:border-primary hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl px-4 py-14">
          <h2 className="mb-7 text-3xl font-bold">Frequently asked questions</h2>
          <div className="space-y-6">
            {config.faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GurgaonServiceLanding;
