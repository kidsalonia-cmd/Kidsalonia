import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { BASE_URL, createBreadcrumbSchema, createFAQSchema, localBusinessSchema } from "@/components/SEO";

const PRIMARY_PHONE = "+918130307036";

const titleCase = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const faqs = [
  {
    question: "Does KidSalonia provide waxing at home in Gurgaon?",
    answer:
      "Yes. KidSalonia has started at-home waxing service in Gurgaon. Availability depends on the requested location and appointment slot, so please confirm before booking.",
  },
  {
    question: "How do I book at-home waxing?",
    answer:
      "Call or WhatsApp KidSalonia on +91 81303 07036 to share your Gurgaon locality, preferred date and time. The team will confirm service availability for your area.",
  },
  {
    question: "Which Gurgaon areas can request home waxing?",
    answer:
      "Customers from Gurgaon sectors, residential societies and major road corridors can enquire. Final home-service availability is confirmed individually based on location and schedule.",
  },
];

export default function WaxingServicePage() {
  const { localitySlug } = useParams();
  const locality = localitySlug ? titleCase(localitySlug) : "Gurgaon";
  const isLocal = Boolean(localitySlug);
  const canonical = isLocal
    ? `${BASE_URL}/waxing-near/${localitySlug}`
    : `${BASE_URL}/waxing-gurgaon`;
  const whatsapp = `https://wa.me/918130307036?text=${encodeURIComponent(
    `Hi KidSalonia, I want to book at-home waxing service in ${locality}. Please share availability and details.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Waxing Near Me ${locality} | At-Home Waxing Gurgaon | KidSalonia`}
        description={`Book KidSalonia at-home waxing in ${locality}, Gurgaon. Confirm home-service availability for your sector, society or road and reserve an appointment.`}
        canonical={canonical}
        keywords={[
          "waxing near me",
          "waxing at home Gurgaon",
          "home waxing Gurgaon",
          `waxing near ${locality}`,
          `home waxing ${locality}`,
          "salon home service Gurgaon",
        ]}
        schemas={[
          localBusinessSchema,
          createFAQSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "Gurgaon Salon Near Me", url: `${BASE_URL}/gurgaon-salon-near-me` },
            { name: `Waxing ${locality}`, url: canonical },
          ]),
        ]}
      />
      <Header />
      <main>
        <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 px-5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">New KidSalonia Home Service</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              At-Home Waxing Near {locality}, Gurgaon
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              KidSalonia now accepts at-home waxing enquiries across Gurgaon. Share your sector, society or road and preferred timing; our team will confirm whether home service is available for your location.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">Book Waxing on WhatsApp</a>
              <a href={`tel:${PRIMARY_PHONE}`} className="rounded-full border border-primary px-6 py-3 font-bold text-primary">Call to Confirm</a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-black text-slate-950">Waxing service planned around your Gurgaon location</h2>
            <p className="mt-4 leading-7 text-slate-600">
              This page is for customers searching for waxing near them in Gurgaon. KidSalonia operates one physical salon in Sector 67 and has now started waxing as a home-service offering. Home visits are confirmed only after checking the requested locality and appointment schedule.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {["Share your locality", "Choose a preferred slot", "Wait for service-area confirmation"].map((item) => (
                <div key={item} className="rounded-2xl border bg-white p-5 font-bold text-slate-800 shadow-sm">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950 p-7 text-white">
            <h2 className="text-2xl font-black">Also looking for salon services?</h2>
            <p className="mt-3 text-white/75">Visit KidSalonia in Sector 67 for kids salon, nail art, manicure, pedicure, hair spa and related grooming services.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/gurgaon-salon-near-me" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950">Explore Gurgaon services</Link>
              <Link to="/find-us" className="rounded-full border border-white/40 px-4 py-2 text-sm font-bold">Salon directions</Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black">Waxing FAQs</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="font-black text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
