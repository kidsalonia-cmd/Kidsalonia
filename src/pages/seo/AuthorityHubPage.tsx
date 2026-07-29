import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, {
  BASE_URL,
  createBreadcrumbSchema,
  createFAQSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/SEO";
import { seoServices } from "@/data/services";

const PHONE = "+918130307036";

const hubConfigs = {
  "hair-services": {
    title: "Kids Hair Services in Gurgaon",
    description:
      "Explore child-friendly haircut, styling and grooming services at KidSalonia Gurgaon for babies, toddlers, boys and girls.",
    eyebrow: "Hair services hub",
    intro:
      "KidSalonia provides age-appropriate haircuts and styling in a colourful, child-focused salon environment. This guide helps parents compare services, prepare children for an appointment and choose the right option for everyday grooming or special occasions.",
    categories: ["kids-salon", "hairdresser"],
    topics: [
      "Choosing a haircut by age and hair texture",
      "Preparing nervous children for a salon visit",
      "Easy-maintenance school and everyday hairstyles",
      "Party, birthday and festival hair styling",
    ],
    faqs: [
      {
        question: "Which children's hair services does KidSalonia offer?",
        answer:
          "Services include kids haircuts, baby first haircuts, toddler haircuts, boys and girls haircuts, styling and selected family salon services.",
      },
      {
        question: "Do I need an appointment?",
        answer:
          "Advance booking is recommended so the team can confirm the preferred service, stylist availability and expected duration.",
      },
    ],
  },
  "kids-haircut": {
    title: "Kids Haircut Guide for Gurgaon Parents",
    description:
      "A practical kids haircut guide covering babies, toddlers, boys, girls, preparation, styles and booking at KidSalonia Gurgaon.",
    eyebrow: "Kids haircut hub",
    intro:
      "A successful children's haircut combines patience, hygiene, clear communication and a style that suits the child's age, hair texture and daily routine. Use this hub to explore haircut options and location-specific booking pages.",
    categories: ["kids-salon"],
    topics: [
      "First haircuts and toddler haircut preparation",
      "School-ready boys and girls haircut ideas",
      "Managing curls, fringes, layers and easy-maintenance styles",
      "Helping children feel comfortable during a haircut",
    ],
    faqs: [
      {
        question: "What should parents bring for a child's haircut?",
        answer:
          "Bring any reference photo, comfort item and information about the child's usual hair routine. Parents should also share any sensitivities before the service begins.",
      },
      {
        question: "Can the stylist recommend a haircut?",
        answer:
          "Yes. The team can suggest age-appropriate options based on hair texture, face shape, school requirements and maintenance preference.",
      },
    ],
  },
  "baby-first-haircut": {
    title: "Baby First Haircut Guide",
    description:
      "Prepare for your baby's first haircut with practical comfort, hygiene and appointment tips from KidSalonia Gurgaon.",
    eyebrow: "Baby haircut hub",
    intro:
      "A baby's first haircut is an important family milestone. A calm appointment, gentle handling and realistic expectations can make the experience more comfortable for both baby and parents.",
    categories: ["kids-salon"],
    serviceSlugs: ["baby-first-haircut", "toddler-haircut", "kids-haircut-gurgaon"],
    topics: [
      "Choosing a comfortable appointment time",
      "Bringing a familiar toy or comfort item",
      "Discussing length and style before the haircut",
      "Simple aftercare for the scalp and hair",
    ],
    faqs: [
      {
        question: "What is the best time for a baby's first haircut?",
        answer:
          "There is no single required age. Parents can choose a time based on hair growth, comfort and family preference, ideally when the baby is rested and fed.",
      },
      {
        question: "Can a parent stay close during the haircut?",
        answer:
          "Yes. Parents can remain with their baby and help provide reassurance during the service.",
      },
    ],
  },
  mundan: {
    title: "Mundan Ceremony and Head Shave Guide",
    description:
      "Plan a hygienic and comfortable mundan or baby head shave appointment at KidSalonia Gurgaon with preparation and aftercare guidance.",
    eyebrow: "Mundan hub",
    intro:
      "Mundan is an important family tradition. This guide explains how to prepare for a salon-based head shave, what to discuss before the appointment and how to care for the scalp afterwards.",
    categories: ["mundan"],
    topics: [
      "Preparing the baby or child before the appointment",
      "Confirming tools, hygiene and service steps",
      "Keeping the child calm and supported",
      "Gentle scalp care after the service",
    ],
    faqs: [
      {
        question: "Is advance booking required for mundan?",
        answer:
          "Advance booking is strongly recommended so the team can allocate sufficient time and explain preparation before the family travels.",
      },
      {
        question: "What should parents ask before the service?",
        answer:
          "Confirm appointment timing, expected duration, hygiene practices and any aftercare recommendations relevant to the child.",
      },
    ],
  },
  "kids-nail-care": {
    title: "Kids Nail Care and Nail Art Guide",
    description:
      "Explore kids nail art, manicure and pedicure services with age-appropriate design, hygiene and booking guidance from KidSalonia Gurgaon.",
    eyebrow: "Nail care hub",
    intro:
      "Children's nail services should focus on hygiene, comfort and age-appropriate styling. This hub connects parents with nail art, manicure and pedicure options for everyday grooming, birthdays and celebrations.",
    categories: ["nail-art", "manicure", "pedicure"],
    topics: [
      "Age-appropriate nail art and simple designs",
      "Birthday, festival and party nail styling",
      "Gentle manicure and pedicure routines",
      "Basic nail hygiene and aftercare",
    ],
    faqs: [
      {
        question: "Do you offer nail art for birthdays?",
        answer:
          "Yes. Families can discuss simple, age-appropriate nail art options for birthdays, parties and celebrations.",
      },
      {
        question: "Should nail services be booked in advance?",
        answer:
          "Booking is recommended, especially for multiple services or appointments before an event.",
      },
    ],
  },
} as const;

type HubSlug = keyof typeof hubConfigs;

const AuthorityHubPage = () => {
  const { hubSlug = "" } = useParams();
  const config = hubConfigs[hubSlug as HubSlug];

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Guide Not Found"
          description="The requested KidSalonia guide could not be found."
          canonical={`${BASE_URL}/guides`}
          noIndex
        />
        <Header />
        <main className="container mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Guide not found</h1>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">
            Return home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const serviceSlugs = "serviceSlugs" in config ? config.serviceSlugs : undefined;
  const services = seoServices.filter((service) =>
    serviceSlugs
      ? serviceSlugs.includes(service.slug as never)
      : config.categories.includes(service.category as never)
  );
  const canonical = `${BASE_URL}/guides/${hubSlug}`;
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: `${BASE_URL}/` },
    { name: "Guides", url: `${BASE_URL}/guides/hair-services` },
    { name: config.title, url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: config.title,
    description: config.description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#localbusiness` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.serviceName,
        url: `${BASE_URL}/${service.slug}-gurgaon`,
      })),
    },
  };

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
          collectionSchema,
          createFAQSchema([...config.faqs]),
          breadcrumb,
        ]}
      />
      <Header />
      <SocialSidebar />

      <main>
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{config.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{config.title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">{config.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`tel:${PHONE}`} className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Call 81303 07036</a>
              <Link to="/contact-us" className="rounded-full border px-7 py-3 font-semibold">Book an appointment</Link>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold">What parents should consider</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {config.topics.map((topic) => (
                <article key={topic} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">{topic}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    Discuss your child's age, comfort, routine and preferred result with the team before the service begins.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold">Explore related services</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">Open a service page for detailed benefits, FAQs and links to Gurgaon sectors, townships and nearby communities.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link key={service.slug} to={`/${service.slug}-gurgaon`} className="rounded-2xl border bg-background p-6 transition hover:border-primary hover:shadow-md">
                  <p className="text-sm font-semibold capitalize text-primary">{service.category.replace(/-/g, " ")}</p>
                  <h3 className="mt-2 text-xl font-bold">{service.serviceName}</h3>
                  <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">{service.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <div className="mt-8 space-y-4">
              {config.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border bg-card p-5">
                  <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold">Plan your KidSalonia appointment</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">Call ahead to confirm the service, appointment duration and preferred timing before travelling.</p>
            <a href={`tel:${PHONE}`} className="mt-8 inline-flex rounded-full bg-background px-7 py-3 font-bold text-foreground">Call 81303 07036</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorityHubPage;