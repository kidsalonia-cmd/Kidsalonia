import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { BASE_URL, createBreadcrumbSchema, createFAQSchema, localBusinessSchema } from "@/components/SEO";

const humanize = (slug?: string) =>
  slug ? slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") : "Gurgaon";

const WHATSAPP = "https://wa.me/918130307036?text=" + encodeURIComponent("Hi KidSalonia, I want to book a Mundan ceremony. Please share availability for at-home and salon options.");

export default function MundanCeremonyPage() {
  const { localitySlug } = useParams();
  const locality = humanize(localitySlug);
  const isLocal = Boolean(localitySlug);
  const canonical = isLocal ? `${BASE_URL}/mundan-near/${localitySlug}` : `${BASE_URL}/mundan-ceremony-gurgaon`;
  const title = isLocal
    ? `Mundan Ceremony Near ${locality} | At Home or Salon | KidSalonia`
    : "Mundan Ceremony Gurgaon | At Home or KidSalonia Salon";

  const faqs = [
    { question: "Can KidSalonia provide Mundan at home?", answer: "Yes. KidSalonia now accepts advance bookings for at-home Mundan ceremony services in supported Gurgaon locations. Confirm the address, date and timing with our team before booking." },
    { question: "Can we book Mundan at the KidSalonia salon?", answer: "Yes. Mundan and full head shave services are also available at the KidSalonia salon in Sector 67, Gurugram, near Airia Mall and Golf Course Extension Road." },
    { question: "Do you provide Mundan for babies and children?", answer: "Yes. The service is intended for babies and children, with hygiene, careful handling and family comfort kept in focus." },
    { question: "Should we book in advance?", answer: "Yes. Advance booking is strongly recommended for both home and salon Mundan so the team can confirm staff availability, timing and any preparation required." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={title}
        description={`Book a hygienic Mundan ceremony ${isLocal ? `near ${locality}, Gurgaon` : "in Gurgaon"}. Choose at-home service or visit KidSalonia salon in Sector 67. Advance booking available.`}
        canonical={canonical}
        keywords={["mundan ceremony near me", "mundan at home Gurgaon", "mundan salon Gurgaon", "baby mundan near me", `mundan ${locality}`, "head shave for baby Gurgaon"]}
        schemas={[localBusinessSchema, createFAQSchema(faqs), createBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Mundan Ceremony", url: canonical }])]}
      />
      <Header />
      <main>
        <section className="bg-gradient-to-br from-amber-50 via-white to-pink-50 px-5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">KidSalonia Mundan Service</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Mundan Ceremony {isLocal ? `near ${locality}` : "in Gurgaon"} — At Home or at Our Salon
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Choose the setting that works best for your family. KidSalonia offers advance-booked Mundan services at home in supported Gurgaon areas and at our child-friendly salon in Sector 67, Gurugram.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">Book Mundan on WhatsApp</a>
              <Link to="/find-us" className="rounded-full border border-primary px-6 py-3 font-bold text-primary">Visit Salon</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-2">
          <article className="rounded-3xl border bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-primary">Option 1</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Mundan at Home</h2>
            <p className="mt-4 leading-7 text-slate-600">For families who prefer to perform the ceremony at home, our team can travel to supported Gurgaon locations by prior appointment. Home-service availability depends on area, timing and staff confirmation.</p>
            <ul className="mt-5 space-y-2 text-slate-700"><li>• Advance appointment and address confirmation</li><li>• Hygienic tools and careful handling</li><li>• Convenient for family ceremonies at home</li><li>• Suitable for babies and children</li></ul>
          </article>
          <article className="rounded-3xl border bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-primary">Option 2</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Mundan at KidSalonia Salon</h2>
            <p className="mt-4 leading-7 text-slate-600">Visit KidSalonia at Ground Floor, A-19 JMD Suburbio 2, Sector 67, Gurugram. The salon option gives families a dedicated kids-first environment with the team and setup ready for the appointment.</p>
            <ul className="mt-5 space-y-2 text-slate-700"><li>• Child-friendly salon environment</li><li>• Clean and prepared service area</li><li>• Parents can stay close during the service</li><li>• Easy to combine with head wash or grooming if available</li></ul>
          </article>
        </section>

        <section className="bg-slate-50 px-5 py-14"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black">Mundan ceremony questions</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map((faq) => <article key={faq.question} className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="font-black">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p></article>)}</div></div></section>
      </main>
      <Footer />
    </div>
  );
}
