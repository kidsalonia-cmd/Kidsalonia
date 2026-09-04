import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, MapPin, Megaphone, Phone, Sparkles, Store, Users } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { BASE_URL, createBreadcrumbSchema, createFAQSchema, organizationSchema } from "@/components/SEO";
import { franchiseCityBySlug } from "@/data/franchise-cities";

const regionalCopy = {
  North: "family-focused residential communities, premium high streets, malls and mixed-use neighbourhoods",
  South: "large urban family markets, technology-led employment hubs, premium residential corridors and organised retail",
  East: "growing urban family markets, education hubs, retail clusters and expanding premium neighbourhoods",
  West: "high-consumption family markets, organised retail, premium residential catchments and entrepreneurial business communities",
  Central: "fast-growing family markets, improving organised retail and strong regional business centres",
  Northeast: "emerging organised retail, family-oriented urban centres and growing demand for differentiated service brands",
} as const;

const FranchiseCityPage = () => {
  const { citySlug = "" } = useParams();
  const city = franchiseCityBySlug.get(citySlug);

  if (!city) return <Navigate to="/franchise/cities" replace />;

  const canonical = `${BASE_URL}/franchise/${city.slug}`;
  const title = `Salon Franchise in ${city.name} | Kids Salon Franchise Opportunity | KidSalonia`;
  const description = `Explore a KidSalonia kids salon franchise opportunity in ${city.name}, ${city.state}. Get brand, outlet setup, training, marketing and operational support for a child-friendly salon business.`;
  const cityFAQs = [
    {
      question: `Can I open a KidSalonia franchise in ${city.name}?`,
      answer: `Yes. Franchise enquiries are welcome from ${city.name}, subject to territory availability, location suitability and commercial evaluation by the KidSalonia franchise team.`,
    },
    {
      question: `What type of location is suitable for a kids salon franchise in ${city.name}?`,
      answer: `We generally evaluate family-oriented commercial areas, premium residential catchments, high streets, malls and neighbourhood centres with convenient access for parents and children in ${city.name}.`,
    },
    {
      question: `Does KidSalonia provide setup and training support in ${city.name}?`,
      answer: "Yes. Franchise support can include outlet planning guidance, branding standards, service training, operating procedures, launch marketing and ongoing business support.",
    },
    {
      question: `How do I apply for a salon franchise in ${city.name}?`,
      answer: `Submit a franchise enquiry through KidSalonia's franchise page and mention ${city.name} as your preferred city. The team can then discuss territory, investment range and location feasibility.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `KidSalonia Kids Salon Franchise in ${city.name}`,
    serviceType: "Kids Salon Franchise Opportunity",
    description,
    url: canonical,
    provider: { "@type": "Organization", name: "KidSalonia", url: BASE_URL },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } },
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={[
          `salon franchise in ${city.name}`,
          `salon franchise ${city.name}`,
          `kids salon franchise ${city.name}`,
          `beauty salon franchise ${city.name}`,
          `children salon franchise ${city.name}`,
          `salon business opportunity ${city.name}`,
          "Kidsalonia franchise",
          "kids salon franchise India",
        ]}
        schema={[
          organizationSchema,
          schema,
          createBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "Franchise", url: `${BASE_URL}/franchise` },
            { name: "Franchise Cities", url: `${BASE_URL}/franchise/cities` },
            { name: city.name, url: canonical },
          ]),
          createFAQSchema(cityFAQs),
        ]}
      />

      <Header />
      <SocialSidebar />

      <main className="bg-white">
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 px-5 py-20 sm:px-8 lg:py-28">
          <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-8 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-bold text-pink-700 shadow-sm">
                <MapPin size={17} /> Franchise opportunity in {city.name}, {city.state}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Kids Salon Franchise in <span className="text-pink-600">{city.name}</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Build a specialised child-friendly salon business with KidSalonia. We are inviting franchise enquiries from {city.name} for suitable family-focused locations and qualified business partners.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to={`/franchise?city=${encodeURIComponent(city.name)}#franchise-form`} className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-7 py-4 font-extrabold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-700">
                  Apply for {city.name} <ArrowRight size={20} />
                </Link>
                <a href="tel:+919773864949" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 font-extrabold text-slate-800 transition hover:border-pink-300 hover:text-pink-700">
                  <Phone size={20} /> Speak to Franchise Team
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-pink-100 bg-white p-7 shadow-2xl shadow-pink-100/70 sm:p-9">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">Why {city.name}</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">A local market worth evaluating</h2>
              <p className="mt-4 leading-7 text-slate-600">
                {city.name} is part of India&apos;s {city.region.toLowerCase()} market, where {regionalCopy[city.region]} can create opportunities for differentiated family services. Final franchise approval depends on the exact micro-market, property and commercial feasibility.
              </p>
              <div className="mt-6 space-y-3">
                {["Family-oriented catchment", "Accessible commercial location", "Suitable outlet size", "Partner commitment to service quality"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700"><Sparkles size={17} /> KidSalonia franchise support</div>
            <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">Build with a kids-first salon brand</h2>
            <p className="mt-4 leading-7 text-slate-600">The model is designed around child-friendly grooming, parent confidence, repeat visits and a differentiated in-salon experience.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Building2, "Location & Setup", "Guidance for site evaluation, layout, interiors, equipment and brand presentation."],
              [Users, "Training", "Service standards, hygiene, customer experience and operational guidance for the outlet team."],
              [Megaphone, "Marketing", "Launch campaigns, digital marketing guidance, local promotion ideas and brand creatives."],
              [Store, "Operations", "Support for service menu, customer flow, SOPs and ongoing operating discipline."],
            ].map(([Icon, heading, copy]) => {
              const IconComponent = Icon as typeof Building2;
              return (
                <div key={String(heading)} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600"><IconComponent size={23} /></div>
                  <h3 className="mt-5 text-xl font-black text-slate-950">{String(heading)}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{String(copy)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-pink-200"><BadgeCheck size={17} /> Territory subject to availability</div>
              <h2 className="mt-5 text-3xl font-black sm:text-4xl">Interested in KidSalonia franchise rights for {city.name}?</h2>
              <p className="mt-4 max-w-3xl leading-7 text-white/70">Tell us about your proposed area, property and investment plan. Our team can evaluate whether the opportunity fits the KidSalonia franchise model.</p>
            </div>
            <Link to={`/franchise?city=${encodeURIComponent(city.name)}#franchise-form`} className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-7 py-4 font-black text-white transition hover:bg-pink-400">Start Franchise Enquiry <ArrowRight size={20} /></Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-3xl font-black text-slate-950">Salon franchise questions for {city.name}</h2>
          <div className="mt-8 space-y-4">
            {cityFAQs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none font-extrabold text-slate-900">{faq.question}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm font-bold">
            <Link to="/franchise" className="text-pink-600 hover:underline">Main franchise opportunity</Link>
            <Link to="/franchise/cities" className="text-pink-600 hover:underline">Browse franchise cities across India</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FranchiseCityPage;
