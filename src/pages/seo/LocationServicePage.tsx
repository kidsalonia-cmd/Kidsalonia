import { Link, useParams } from "react-router-dom";
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
import { seoServices } from "@/data/services";
import { seoLocations } from "@/data/locations";

const PRIMARY_PHONE = "+918130307036";
const SECONDARY_PHONE = "+919773864949";
const SALON_ADDRESS =
  "Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatLocationName = (location: string) => {
  if (location === "Gurgaon" || location === "Gurugram") return "Gurgaon";

  const standaloneLocations = new Set([
    "Delhi NCR",
    "South Delhi",
    "Noida",
    "Greater Noida",
    "Faridabad",
    "Ghaziabad",
    "Dwarka",
    "Manesar",
    "IMT Manesar",
    "Sohna",
  ]);

  if (
    standaloneLocations.has(location) ||
    location.includes("Gurgaon") ||
    location.includes("Gurugram")
  ) {
    return location;
  }

  return `${location}, Gurgaon`;
};

const getMatchedService = (currentSlug: string) =>
  [...seoServices]
    .sort((a, b) => b.slug.length - a.slug.length)
    .find(
      (service) =>
        currentSlug === service.slug ||
        currentSlug.startsWith(`${service.slug}-`)
    );

const getMatchedLocation = (currentSlug: string, serviceSlug: string) => {
  const locationPart = currentSlug
    .replace(new RegExp(`^${serviceSlug}-?`), "")
    .replace(/^-+|-+$/g, "");

  if (!locationPart) return "Gurgaon";

  return [...seoLocations]
    .sort((a, b) => slugify(b).length - slugify(a).length)
    .find((location) => slugify(location) === locationPart);
};

const getNearbyLocations = (matchedLocation: string) => {
  const uniqueLocations = seoLocations.filter(
    (location, index) =>
      seoLocations.indexOf(location) === index &&
      location !== matchedLocation &&
      location !== "Gurgaon" &&
      location !== "Gurugram"
  );

  const currentIndex = Math.max(
    0,
    seoLocations.findIndex((location) => location === matchedLocation)
  );

  return Array.from({ length: Math.min(16, uniqueLocations.length) }, (_, i) =>
    uniqueLocations[(currentIndex + i) % uniqueLocations.length]
  );
};

const getLocationContext = (location: string) => {
  if (/^Sector\s+\d+/i.test(location)) {
    return `${location} is part of Gurgaon's established sector network. Families commonly compare child-friendly salon options by travel convenience, appointment availability and comfort for younger children.`;
  }

  if (/DLF|M3M|Emaar|Ireo|Tulip|Bestech|Vatika|Unitech|Godrej|Tata/i.test(location)) {
    return `${location} is a prominent residential community in the Gurugram region. KidSalonia welcomes families from the community who prefer a dedicated kids-first salon and nail studio near Golf Course Extension Road.`;
  }

  if (/Sohna/i.test(location)) {
    return `${location} connects families across Sohna Road, Southern Peripheral Road and nearby residential developments with KidSalonia's kids salon, mundan, hair and nail services.`;
  }

  if (/Manesar/i.test(location)) {
    return `${location} families can book KidSalonia services in advance and plan their visit to our Gurugram salon near Airia Mall and Golf Course Extension Road.`;
  }

  return `KidSalonia serves families travelling from ${formatLocationName(
    location
  )} and nearby communities. Advance booking helps customers confirm the service, preferred time and expected visit duration before travelling.`;
};

const LocationServicePage = () => {
  const { slug = "" } = useParams();
  const matchedService = getMatchedService(slug);
  const matchedLocation = matchedService
    ? getMatchedLocation(slug, matchedService.slug)
    : undefined;

  if (!matchedService || !matchedLocation) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Page Not Found | KidSalonia"
          description="The requested KidSalonia service location page could not be found."
          canonical={`${BASE_URL}/`}
          noIndex
        />
        <Header />
        <main className="container mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            This service or location page is unavailable. Explore KidSalonia's
            kids salon, mundan, hair, manicure, pedicure and nail services.
          </p>
          <Link
            to="/"
            className="inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground"
          >
            Return to homepage
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const locationName = formatLocationName(matchedLocation);
  const locationSlug = slugify(matchedLocation);
  const pageTitle = `${matchedService.serviceName} in ${locationName}`;
  const pageUrl = `${BASE_URL}/${slug}`;
  const nearbyLocations = getNearbyLocations(matchedLocation);
  const relatedServices = seoServices
    .filter((service) => service.slug !== matchedService.slug)
    .sort((a, b) => {
      const aScore = a.category === matchedService.category ? 1 : 0;
      const bScore = b.category === matchedService.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 8);

  const faqs = [
    ...matchedService.faqs,
    {
      question: `Do you provide ${matchedService.serviceType.toLowerCase()} for customers from ${locationName}?`,
      answer: `Yes. KidSalonia welcomes customers from ${locationName} and nearby areas at our Gurugram salon. Please call before travelling to confirm service availability and appointment timing.`,
    },
    {
      question: `How do I book ${matchedService.serviceType.toLowerCase()} near ${locationName}?`,
      answer:
        "Call KidSalonia at +91 81303 07036 or +91 97738 64949 to check availability and reserve an appointment.",
    },
    {
      question: "Where is KidSalonia located?",
      answer: `${SALON_ADDRESS}, close to Airia Mall and Golf Course Extension Road.`,
    },
  ];

  const serviceSchema = createServiceSchema({
    name: pageTitle,
    description: `${matchedService.intro} KidSalonia welcomes customers from ${locationName} and nearby areas.`,
    url: pageUrl,
    serviceType: matchedService.serviceType,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${BASE_URL}/` },
    {
      name: matchedService.serviceType,
      url: `${BASE_URL}/${matchedService.slug}-gurgaon`,
    },
    { name: locationName, url: pageUrl },
  ]);

  const seoDescription = `Book ${matchedService.serviceType.toLowerCase()} near ${locationName} at KidSalonia Gurugram. Child-friendly service, hygienic setup and advance appointments. Call 81303 07036.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${pageTitle} | KidSalonia`}
        description={seoDescription}
        canonical={pageUrl}
        jsonLd={[
          organizationSchema,
          websiteSchema,
          localBusinessSchema,
          serviceSchema,
          createFAQSchema(faqs),
          breadcrumbSchema,
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
              <Link to={`/${matchedService.slug}-gurgaon`} className="hover:text-primary">
                {matchedService.serviceType}
              </Link>
              <span className="mx-2">/</span>
              <span>{locationName}</span>
            </nav>

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              KidSalonia Gurugram
            </p>
            <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mb-5 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">
              {matchedService.intro} We welcome customers from {locationName}
              and nearby communities at our kids-first Gurugram salon.
            </p>
            <p className="mb-8 max-w-4xl leading-7 text-muted-foreground">
              {getLocationContext(matchedLocation)}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a href={`tel:${PRIMARY_PHONE}`} className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">
                Call 81303 07036
              </a>
              <a href={`tel:${SECONDARY_PHONE}`} className="inline-flex items-center justify-center rounded-full border border-primary px-7 py-3 font-semibold text-primary">
                Call 97738 64949
              </a>
              <Link to="/contact-us" className="inline-flex items-center justify-center rounded-full border px-7 py-3 font-semibold">
                View salon location
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.5fr_0.8fr]">
            <article>
              <h2 className="mb-5 text-3xl font-bold md:text-4xl">
                Child-friendly {matchedService.serviceType} near {locationName}
              </h2>
              <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                <p>
                  Families booking <strong>{pageTitle.toLowerCase()}</strong> often
                  look for patient service, hygiene, clear communication and a
                  comfortable setting—especially for babies, toddlers and children.
                </p>
                <p>
                  KidSalonia is a kids-first family salon and nail studio offering
                  kids haircuts, baby first haircut, mundan, styling, nail art,
                  manicure, pedicure and selected family salon services.
                </p>
                <p>
                  Our salon is at {SALON_ADDRESS}. Customers from {locationName}
                  should confirm their appointment before travelling.
                </p>
              </div>

              <h2 className="mb-6 mt-12 text-3xl font-bold">Why choose KidSalonia?</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {matchedService.benefits.map((benefit) => (
                  <div key={benefit} className="rounded-2xl border bg-card p-6 shadow-sm">
                    <h3 className="mb-3 text-lg font-semibold">{benefit}</h3>
                    <p className="leading-7 text-muted-foreground">
                      Our team focuses on hygiene, comfort, suitable products and a
                      friendly appointment experience.
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <aside>
              <div className="sticky top-24 rounded-3xl border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-bold">Appointment details</h2>
                <dl className="mt-6 space-y-5">
                  <div><dt className="text-sm font-semibold text-muted-foreground">Service</dt><dd className="mt-1 font-bold">{matchedService.serviceType}</dd></div>
                  <div><dt className="text-sm font-semibold text-muted-foreground">Serving</dt><dd className="mt-1">{locationName} and nearby areas</dd></div>
                  <div><dt className="text-sm font-semibold text-muted-foreground">Salon address</dt><dd className="mt-1 leading-6">{SALON_ADDRESS}</dd></div>
                  <div><dt className="text-sm font-semibold text-muted-foreground">Phone</dt><dd className="mt-1"><a href={`tel:${PRIMARY_PHONE}`} className="font-bold text-primary">+91 81303 07036</a><br /><a href={`tel:${SECONDARY_PHONE}`} className="font-bold text-primary">+91 97738 64949</a></dd></div>
                </dl>
                <Link to="/contact-us" className="mt-7 inline-flex w-full justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
                  Book an appointment
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-3xl font-bold">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border bg-card p-5">
                  <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-3 text-3xl font-bold">Related services in {locationName}</h2>
            <p className="mb-8 text-muted-foreground">Explore other KidSalonia services available for customers from this area.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((service) => (
                <Link key={service.slug} to={`/${service.slug}-${locationSlug}`} className="rounded-2xl border bg-background p-5 transition hover:border-primary hover:shadow-md">
                  <p className="text-sm font-semibold capitalize text-primary">{service.category.replace(/-/g, " ")}</p>
                  <h3 className="mt-2 font-bold">{service.serviceName} in {locationName}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-3 text-3xl font-bold">Nearby service areas</h2>
            <p className="mb-8 text-muted-foreground">Explore this service across Gurgaon sectors, townships and residential communities.</p>
            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map((location) => (
                <Link key={location} to={`/${matchedService.slug}-${slugify(location)}`} className="rounded-full border bg-background px-4 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  {matchedService.serviceName} in {formatLocationName(location)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Book {matchedService.serviceType} at KidSalonia</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">Contact our team to confirm availability, pricing and your preferred appointment time.</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a href={`tel:${PRIMARY_PHONE}`} className="rounded-full bg-background px-7 py-3 font-bold text-foreground">Call 81303 07036</a>
              <a href={`tel:${SECONDARY_PHONE}`} className="rounded-full border border-primary-foreground px-7 py-3 font-bold">Call 97738 64949</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationServicePage;
