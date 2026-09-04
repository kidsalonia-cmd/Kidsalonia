import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { BASE_URL, createBreadcrumbSchema, createFAQSchema, localBusinessSchema } from "@/components/SEO";

const services = [
  ["Kids Salon", "kids-haircut-gurgaon"],
  ["Nail Art", "nail-art"],
  ["Manicure", "manicure"],
  ["Pedicure", "pedicure"],
  ["Hair Spa", "hair-spa"],
  ["Hairdresser", "hairdresser"],
] as const;

const localities = [
  "Sector 47", "Sector 48", "Sector 49", "Sector 50", "Sector 51", "Sector 52", "Sector 53", "Sector 54", "Sector 55", "Sector 56", "Sector 57", "Sector 58", "Sector 59", "Sector 60", "Sector 61", "Sector 62", "Sector 63", "Sector 64", "Sector 65", "Sector 66", "Sector 67", "Sector 68", "Sector 69", "Sector 70", "Sector 71", "Sector 72", "Sector 73", "Sector 74", "Sector 75", "Sector 76", "Sector 77", "Sector 78", "Sector 79", "Sector 80", "Sector 81", "Sector 82", "Sector 83", "Sector 84", "Sector 85", "Sector 86", "Sector 87", "Sector 88", "Sector 89", "Sector 90", "Golf Course Road", "Golf Course Extension Road", "Sohna Road", "Southern Peripheral Road", "Dwarka Expressway", "MG Road Gurgaon", "DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "DLF Phase 4", "DLF Phase 5", "Sushant Lok 1", "Sushant Lok 2", "South City 1", "South City 2", "Nirvana Country", "Palam Vihar", "Orchid Petals", "M3M Golf Estate", "Emaar Emerald Hills", "Emaar Marbella", "Ireo Victory Valley", "Ireo Uptown", "Tulip Violet", "Bestech Park View Spa", "Vatika City", "Central Park Resorts"
] as const;

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pathFor = (service: string, locality: string) => `/${service}-${slugify(locality)}`;

const faqs = [
  { question: "Where is KidSalonia located in Gurgaon?", answer: "KidSalonia is at Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101, near Airia Mall and Golf Course Extension Road." },
  { question: "Does KidSalonia serve families from different Gurgaon sectors and societies?", answer: "Yes. Customers travel to KidSalonia from Gurgaon sectors, residential societies and major road corridors. Advance booking is recommended before travelling." },
  { question: "Which services can I book?", answer: "KidSalonia offers kids haircuts and grooming, nail art, manicure, pedicure, hair spa and other listed salon services. Check the service page or contact the salon for current availability." },
];

export default function GurgaonLocalSalon() {
  return <div className="min-h-screen bg-background">
    <SEO
      title="Kids Salon Near Me Gurgaon | Nail Art, Manicure, Pedicure & Hair Spa | KidSalonia"
      description="Find KidSalonia from Gurgaon sectors, societies and major roads. Book kids salon, nail art, manicure, pedicure and hair spa near Golf Course Extension Road."
      canonical={`${BASE_URL}/gurgaon-salon-near-me`}
      keywords={["kids salon near me", "salon near me Gurgaon", "nail art near me", "manicure near me", "pedicure near me", "hair spa near me", "kids salon Gurgaon"]}
      schemas={[localBusinessSchema, createFAQSchema(faqs), createBreadcrumbSchema([{name:"Home",url:BASE_URL},{name:"Gurgaon Salon Near Me",url:`${BASE_URL}/gurgaon-salon-near-me`}])]}
    />
    <Header />
    <main>
      <section className="bg-gradient-to-br from-pink-50 via-white to-sky-50 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">KidSalonia Gurugram</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Kids Salon, Nail Art, Manicure, Pedicure & Hair Spa Near You in Gurgaon</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Use this local directory to find the most relevant KidSalonia service page for your Gurgaon sector, road or residential community. Our physical salon is in Sector 67 near Airia Mall; these pages help families plan a visit and do not represent separate branches.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/book" className="rounded-full bg-primary px-6 py-3 font-bold text-white">Book Appointment</Link><Link to="/find-us" className="rounded-full border border-primary px-6 py-3 font-bold text-primary">Directions</Link></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-3xl font-black">Search by service and locality</h2>
        <p className="mt-3 max-w-3xl text-slate-600">Choose a service first, then your nearby sector, society or road. We focus on useful Gurgaon searches rather than creating misleading branch listings.</p>
        <div className="mt-10 space-y-10">
          {services.map(([label, slug]) => <div key={slug}>
            <h3 className="text-xl font-black text-slate-900">{label} around Gurgaon</h3>
            <div className="mt-4 flex flex-wrap gap-2">{localities.map(locality => <Link key={`${slug}-${locality}`} to={pathFor(slug, locality)} className="rounded-full border bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary">{label} near {locality}</Link>)}</div>
          </div>)}
        </div>
      </section>
      <section className="bg-slate-50 px-5 py-14"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black">Frequently asked questions</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{faqs.map(f => <article key={f.question} className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="font-black">{f.question}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{f.answer}</p></article>)}</div></div></section>
    </main>
    <Footer />
  </div>;
}
