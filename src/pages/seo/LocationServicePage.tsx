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

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const titleCase = (text: string) =>
  text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const LocationServicePage = () => {
  const { slug } = useParams();

  const currentSlug = slug || "";

  const matchedService = seoServices.find((service) =>
    currentSlug.startsWith(service.slug)
  );

  const matchedLocation =
    seoLocations.find((location) =>
      currentSlug.includes(slugify(location))
    ) || "Gurgaon";

  if (!matchedService) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-6">
            This service page is not available. Please explore our main salon
            services.
          </p>
          <Link to="/" className="underline font-semibold">
            Go back to homepage
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const locationName =
    matchedLocation === "Gurgaon" || matchedLocation === "Gurugram"
      ? "Gurgaon"
      : `${matchedLocation}, Gurgaon`;

  const pageTitle = `${matchedService.serviceName} in ${locationName}`;
  const pageUrl = `${BASE_URL}/${currentSlug}`;

  const faqs = [
    ...matchedService.faqs,
    {
      question: `Do you offer ${matchedService.serviceType.toLowerCase()} in ${locationName}?`,
      answer: `Yes, KidSalonia offers ${matchedService.serviceType.toLowerCase()} services for families looking for trusted salon care in and around ${locationName}.`,
    },
    {
      question: `How can I book ${matchedService.serviceType.toLowerCase()} at KidSalonia?`,
      answer:
        "You can call KidSalonia at +91 81303 07036 or +91 97738 64949 to check availability and book your appointment.",
    },
  ];

  const serviceSchema = createServiceSchema({
    name: pageTitle,
    description: matchedService.metaDescription,
    url: pageUrl,
    serviceType: matchedService.serviceType,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${BASE_URL}/` },
    { name: matchedService.serviceType, url: pageUrl },
  ]);

  const relatedServices = seoServices
    .filter((service) => service.slug !== matchedService.slug)
    .slice(0, 6);

  const nearbyLocations = seoLocations
    .filter((location) => location !== matchedLocation)
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${pageTitle} | KidSalonia`}
        description={`${matchedService.metaDescription} Book ${matchedService.serviceType.toLowerCase()} near ${locationName} at KidSalonia.`}
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
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
              KidSalonia Gurgaon
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              {matchedService.intro} Conveniently serving families from{" "}
              {locationName} and nearby areas.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918130307036"
                className="rounded-full bg-primary px-6 py-3 text-white font-semibold"
              >
                Call 81303 07036
              </a>
              <a
                href="tel:+919773864949"
                className="rounded-full border border-primary px-6 py-3 font-semibold"
              >
                Call 97738 64949
              </a>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-6">
              Why choose KidSalonia for {matchedService.serviceType}?
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {matchedService.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-lg mb-2">{benefit}</h3>
                  <p className="text-muted-foreground">
                    Our team focuses on safety, hygiene, comfort and a friendly
                    salon experience for children and families.
                  </p>
                </div>
              ))}
            </div>

            <div className="prose max-w-none">
              <h2>
                Trusted {matchedService.serviceType} near {locationName}
              </h2>
              <p>
                KidSalonia is a child-friendly salon and nail studio in
                Gurugram offering kids haircuts, baby first haircut, mundan,
                nail art, manicure, pedicure and hairdresser services. Families
                looking for {matchedService.serviceType.toLowerCase()} in{" "}
                {locationName} can visit our salon for a clean, warm and
                comfortable grooming experience.
              </p>
              <p>
                Our location near Airia Mall and Golf Course Extension Road
                makes it convenient for customers across Gurgaon. We focus on
                calm service, hygienic tools, family-friendly staff and
                appointment-based care so children feel relaxed.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl bg-background p-5 border">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-6">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/${service.slug}-gurgaon`}
                  className="rounded-xl border p-5 hover:shadow-md transition"
                >
                  <h3 className="font-semibold mb-2">{service.serviceName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-6">
              Popular Gurgaon Locations
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map((location) => (
                <Link
                  key={location}
                  to={`/${matchedService.slug}-${slugify(location)}`}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-primary hover:text-white transition"
                >
                  {titleCase(slugify(location))}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationServicePage;