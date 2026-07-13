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

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatLocationName = (location: string) => {
  if (location === "Gurgaon" || location === "Gurugram") {
    return "Gurgaon";
  }

  if (
    location.includes("Gurgaon") ||
    location.includes("Gurugram") ||
    location === "Delhi NCR" ||
    location === "South Delhi" ||
    location === "Noida" ||
    location === "Greater Noida" ||
    location === "Faridabad" ||
    location === "Ghaziabad" ||
    location === "Dwarka" ||
    location === "Manesar" ||
    location === "IMT Manesar"
  ) {
    return location;
  }

  return `${location}, Gurgaon`;
};

const categoryContent: Record<
  string,
  {
    audience: string;
    preparation: string[];
    expectations: string[];
  }
> = {
  "kids-salon": {
    audience:
      "babies, toddlers, school-going children, teenagers and parents looking for a comfortable child-friendly salon",
    preparation: [
      "Choose a time when your child is rested and comfortable.",
      "Bring a favourite toy, snack or comfort item for younger children.",
      "Share any sensitivity, fear or previous salon experience with the stylist.",
      "Show a reference photo if you have a preferred haircut or style.",
    ],
    expectations: [
      "A patient consultation before the service begins.",
      "Age-appropriate styling and gentle handling.",
      "A clean, comfortable and family-friendly salon environment.",
      "Simple after-care guidance for parents.",
    ],
  },

  mundan: {
    audience:
      "families planning a baby mundan, traditional first haircut, complete head shave or special family ceremony",
    preparation: [
      "Book in advance so sufficient time can be reserved.",
      "Ensure the baby or child is rested and fed before the appointment.",
      "Bring a soft towel, spare clothing and the child's comfort item.",
      "Tell the team about any scalp sensitivity before the service.",
    ],
    expectations: [
      "A clean and hygienic mundan setup.",
      "Patient handling for babies and young children.",
      "Parent participation throughout the service.",
      "Post-service clean-up and basic scalp-care guidance.",
    ],
  },

  "nail-art": {
    audience:
      "children, teenagers, mothers, brides and customers preparing for birthdays, parties or festive occasions",
    preparation: [
      "Select a colour, theme or reference design before your visit.",
      "Avoid cutting or peeling the nails immediately before the appointment.",
      "Tell the nail artist about any allergies or nail sensitivity.",
      "Book early for festivals, birthdays and wedding dates.",
    ],
    expectations: [
      "A short consultation about colours and design preferences.",
      "Careful cleaning and preparation of the nails.",
      "Professional application with a neat finish.",
      "Basic nail-care and after-care guidance.",
    ],
  },

  manicure: {
    audience:
      "children, teenagers, mothers and customers seeking clean hands, neat nails and relaxing hand care",
    preparation: [
      "Remove old polish before arrival when possible.",
      "Inform the team about cuts, irritation or nail sensitivity.",
      "Choose regular polish, nail art or a natural finish.",
      "Book manicure and nail art together for special events.",
    ],
    expectations: [
      "Nail cleaning and shaping based on the selected service.",
      "Gentle hand and cuticle care.",
      "Optional polish or nail art.",
      "A clean and comfortable manicure experience.",
    ],
  },

  pedicure: {
    audience:
      "children, teenagers, mothers and customers wanting hygienic foot care and professionally groomed toenails",
    preparation: [
      "Inform the team about any foot sensitivity or skin concern.",
      "Avoid shaving immediately before the appointment.",
      "Bring open footwear when applying nail polish.",
      "Choose your preferred colour or natural finish.",
    ],
    expectations: [
      "Professional toenail cleaning and shaping.",
      "Comfortable foot-care steps based on the chosen package.",
      "Optional polish and nail styling.",
      "Simple guidance for maintaining clean feet and nails.",
    ],
  },

  hairdresser: {
    audience:
      "children, teenagers, parents and families looking for professional haircut, styling or hair-care services",
    preparation: [
      "Share a reference photo when requesting a specific style.",
      "Tell the stylist about previous chemical treatments or scalp concerns.",
      "Ask about maintenance before selecting a new hairstyle.",
      "Book event styling in advance.",
    ],
    expectations: [
      "A consultation based on hair type and preferred result.",
      "Professional haircut, styling or hair-care service.",
      "Product guidance suited to the selected service.",
      "Simple home-care and maintenance advice.",
    ],
  },
};

const getMatchedService = (currentSlug: string) =>
  [...seoServices]
    .sort((first, second) => second.slug.length - first.slug.length)
    .find(
      (service) =>
        currentSlug === service.slug ||
        currentSlug.startsWith(`${service.slug}-`)
    );

const getMatchedLocation = (
  currentSlug: string,
  serviceSlug: string
): string => {
  const locationPart = currentSlug
    .replace(new RegExp(`^${serviceSlug}-?`), "")
    .replace(/^-+|-+$/g, "");

  if (!locationPart) {
    return "Gurgaon";
  }

  const matchedLocation = [...seoLocations]
    .sort(
      (first, second) =>
        slugify(second).length - slugify(first).length
    )
    .find((location) => slugify(location) === locationPart);

  return matchedLocation || "Gurgaon";
};

const LocationServicePage = () => {
  const { slug = "" } = useParams();

  const matchedService = getMatchedService(slug);

  if (!matchedService) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Service Not Found | KidSalonia"
          description="The requested KidSalonia service page could not be found."
          canonical={`${BASE_URL}/`}
          noIndex
        />

        <Header />

        <main className="container mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Service page not found
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            This service page is unavailable. Explore our kids salon,
            nail art, mundan, manicure, pedicure and hairdresser services.
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

  const matchedLocation = getMatchedLocation(
    slug,
    matchedService.slug
  );

  const locationName = formatLocationName(matchedLocation);
  const locationSlug = slugify(matchedLocation);
  const pageTitle = `${matchedService.serviceName} in ${locationName}`;
  const pageUrl = `${BASE_URL}/${slug}`;

  const categoryDetails =
    categoryContent[matchedService.category] ||
    categoryContent["kids-salon"];

  const faqs = [
    ...matchedService.faqs,
    {
      question: `Do you provide ${matchedService.serviceType.toLowerCase()} in ${locationName}?`,
      answer: `Yes. KidSalonia provides ${matchedService.serviceType.toLowerCase()} services for customers from ${locationName} and nearby areas. Our salon is located at A-19 JMD Suburbio 2, Gurugram.`,
    },
    {
      question: `Who is this ${matchedService.serviceType.toLowerCase()} service suitable for?`,
      answer: `This service is suitable for ${categoryDetails.audience}. Our team can guide you about suitability before booking.`,
    },
    {
      question: `How can I book ${matchedService.serviceType.toLowerCase()} at KidSalonia?`,
      answer:
        "Call KidSalonia at +91 81303 07036 or +91 97738 64949 to check availability and reserve your appointment.",
    },
    {
      question: "Where is KidSalonia located?",
      answer:
        "KidSalonia is located at Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101, close to Airia Mall and Golf Course Extension Road.",
    },
  ];

  const serviceSchema = createServiceSchema({
    name: pageTitle,
    description: `${matchedService.intro} Available for customers from ${locationName} and nearby areas.`,
    url: pageUrl,
    serviceType: matchedService.serviceType,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: "Home",
      url: `${BASE_URL}/`,
    },
    {
      name: matchedService.serviceType,
      url: `${BASE_URL}/${matchedService.slug}-gurgaon`,
    },
    {
      name: locationName,
      url: pageUrl,
    },
  ]);

  const relatedServices = seoServices
    .filter(
      (service) =>
        service.slug !== matchedService.slug &&
        (service.category === matchedService.category ||
          service.serviceType !== matchedService.serviceType)
    )
    .slice(0, 8);

  const nearbyLocations = seoLocations
    .filter(
      (location) =>
        location !== matchedLocation &&
        location !== "Gurgaon" &&
        location !== "Gurugram"
    )
    .slice(0, 16);

  const seoDescription =
    `${matchedService.metaDescription} Book ` +
    `${matchedService.serviceType.toLowerCase()} for customers near ` +
    `${locationName}. Call 81303 07036 or 97738 64949.`;

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
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-muted-foreground"
            >
              <Link to="/" className="hover:text-primary">
                Home
              </Link>

              <span className="mx-2">/</span>

              <Link
                to={`/${matchedService.slug}-gurgaon`}
                className="hover:text-primary"
              >
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

            <p className="mb-8 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">
              {matchedService.intro} We welcome customers from{" "}
              {locationName} and nearby Gurugram communities for a clean,
              comfortable and appointment-friendly salon experience.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${PRIMARY_PHONE}`}
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Call 81303 07036
              </a>

              <a
                href={`tel:${SECONDARY_PHONE}`}
                className="inline-flex items-center justify-center rounded-full border border-primary px-7 py-3 font-semibold text-primary transition hover:bg-primary/5"
              >
                Call 97738 64949
              </a>

              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-full border px-7 py-3 font-semibold transition hover:border-primary hover:text-primary"
              >
                View salon location
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[1.6fr_0.8fr]">
              <article>
                <h2 className="mb-5 text-3xl font-bold md:text-4xl">
                  Trusted {matchedService.serviceType} near{" "}
                  {locationName}
                </h2>

                <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                  <p>
                    Families searching for{" "}
                    <strong>{pageTitle.toLowerCase()}</strong> usually
                    want more than a basic salon visit. Comfort,
                    cleanliness, patient service and clear communication
                    are especially important when booking for children
                    or preparing for an important occasion.
                  </p>

                  <p>
                    KidSalonia is a kids-first family salon and nail
                    studio in Gurugram. Our services include kids
                    haircuts, baby first haircut, mundan, hair styling,
                    nail art, nail extensions, manicure, pedicure and
                    selected family salon services.
                  </p>

                  <p>
                    Customers travelling from {locationName} can reach
                    our salon at Ground Floor, A-19 JMD Suburbio 2,
                    Gurugram. The salon is close to Airia Mall and Golf
                    Course Extension Road and serves families from
                    nearby sectors and residential communities.
                  </p>
                </div>

                <h2 className="mb-6 mt-12 text-3xl font-bold">
                  Why choose KidSalonia?
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  {matchedService.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="rounded-2xl border bg-card p-6 shadow-sm"
                    >
                      <h3 className="mb-3 text-lg font-semibold">
                        {benefit}
                      </h3>

                      <p className="leading-7 text-muted-foreground">
                        Our team focuses on hygiene, comfort, suitable
                        products and a friendly experience throughout
                        the appointment.
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <aside>
                <div className="sticky top-24 rounded-3xl border bg-card p-6 shadow-sm">
                  <h2 className="text-2xl font-bold">
                    Appointment details
                  </h2>

                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-sm font-semibold text-muted-foreground">
                        Service
                      </dt>

                      <dd className="mt-1 font-bold">
                        {matchedService.serviceType}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-semibold text-muted-foreground">
                        Suitable for
                      </dt>

                      <dd className="mt-1 leading-6">
                        {categoryDetails.audience}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-semibold text-muted-foreground">
                        Salon address
                      </dt>

                      <dd className="mt-1 leading-6">
                        Ground Floor, A-19 JMD Suburbio 2, Gurugram,
                        Haryana 122101
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-semibold text-muted-foreground">
                        Phone
                      </dt>

                      <dd className="mt-1">
                        <a
                          href={`tel:${PRIMARY_PHONE}`}
                          className="font-bold text-primary"
                        >
                          +91 81303 07036
                        </a>

                        <br />

                        <a
                          href={`tel:${SECONDARY_PHONE}`}
                          className="font-bold text-primary"
                        >
                          +91 97738 64949
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <Link
                    to="/contact-us"
                    className="mt-7 inline-flex w-full justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
                  >
                    Book an appointment
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">
                  How to prepare for your appointment
                </h2>

                <div className="space-y-4">
                  {categoryDetails.preparation.map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 rounded-2xl bg-background p-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                        {index + 1}
                      </span>

                      <p className="pt-1 leading-7 text-muted-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-3xl font-bold">
                  What to expect during your visit
                </h2>

                <div className="space-y-4">
                  {categoryDetails.expectations.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border bg-background p-5"
                    >
                      <h3 className="font-semibold">{item}</h3>

                      <p className="mt-2 leading-7 text-muted-foreground">
                        The exact process may vary according to age,
                        service selection, hair or nail condition and
                        personal preference.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-3xl font-bold">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border bg-card p-5"
                >
                  <summary className="cursor-pointer list-none pr-8 font-semibold">
                    {faq.question}
                  </summary>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-3 text-3xl font-bold">
              Related KidSalonia services
            </h2>

            <p className="mb-8 max-w-3xl text-muted-foreground">
              Explore other hair, nail, kids salon and grooming services
              available for customers from {locationName}.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/${service.slug}-${locationSlug}`}
                  className="rounded-2xl border bg-background p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-primary">
                    {service.category.replace(/-/g, " ")}
                  </p>

                  <h3 className="mt-2 font-bold">
                    {service.serviceName} in {locationName}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-3 text-3xl font-bold">
              Nearby Gurgaon locations
            </h2>

            <p className="mb-8 text-muted-foreground">
              KidSalonia serves customers from Gurgaon sectors,
              residential communities and major local landmarks.
            </p>

            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map((location) => (
                <Link
                  key={location}
                  to={`/${matchedService.slug}-${slugify(location)}`}
                  className="rounded-full border bg-background px-4 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {matchedService.serviceName} in {location}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Book {matchedService.serviceType} at KidSalonia
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
              Contact our team to confirm service availability, pricing
              and your preferred appointment time.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${PRIMARY_PHONE}`}
                className="rounded-full bg-background px-7 py-3 font-bold text-foreground"
              >
                Call 81303 07036
              </a>

              <a
                href={`tel:${SECONDARY_PHONE}`}
                className="rounded-full border border-primary-foreground px-7 py-3 font-bold"
              >
                Call 97738 64949
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationServicePage;