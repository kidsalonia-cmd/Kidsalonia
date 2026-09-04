import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2, ExternalLink, MapPin, Megaphone, Scissors, Sparkles } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { BASE_URL, createBreadcrumbSchema, organizationSchema, websiteSchema } from "@/components/SEO";

const facts = [
  "Kids-first salon and family grooming concept",
  "Services include kids haircuts, mundan, styling, nail care and family grooming",
  "Franchise enquiries welcomed across India, subject to territory and location approval",
  "Support includes location planning, outlet setup guidance, training, operations, branding and marketing",
  "Ideal properties are family-friendly commercial locations with suitable visibility and access",
];

const mediaSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "KidSalonia Franchise Media & Listing Kit",
  description: "Official facts, descriptions and links for publications, franchise directories and business partners covering KidSalonia franchise opportunities in India.",
  url: `${BASE_URL}/franchise/media-kit`,
  about: {
    "@type": "Organization",
    name: "KidSalonia",
    url: BASE_URL,
  },
};

const FranchiseMediaKit = () => (
  <>
    <SEO
      title="KidSalonia Franchise Media Kit | Official Brand Facts & Links"
      description="Official KidSalonia franchise facts, brand descriptions, expansion links and contact references for franchise directories, media, publishers and business partners."
      canonical={`${BASE_URL}/franchise/media-kit`}
      keywords={[
        "KidSalonia franchise media kit",
        "KidSalonia franchise listing",
        "kids salon franchise India",
        "salon franchise press information",
      ]}
      schema={[
        organizationSchema,
        websiteSchema,
        mediaSchema,
        createBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Franchise", url: `${BASE_URL}/franchise` },
          { name: "Media Kit", url: `${BASE_URL}/franchise/media-kit` },
        ]),
      ]}
    />

    <Header />

    <main className="bg-white">
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-extrabold text-pink-700 shadow-sm">
            <Sparkles size={17} /> Official franchise reference
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            KidSalonia Franchise Media &amp; Listing Kit
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            A single official source for franchise directories, journalists, publishers, business communities and potential partners covering KidSalonia&apos;s India expansion.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/franchise" className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-7 py-3.5 font-extrabold text-white shadow-lg hover:bg-pink-700">
              Official Franchise Page <ArrowRight size={18} />
            </Link>
            <Link to="/franchise/cities" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-extrabold text-slate-800 hover:border-pink-300 hover:text-pink-700">
              India City Directory <MapPin size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sm:p-9">
            <div className="flex items-center gap-3 text-pink-600">
              <Building2 size={25} />
              <h2 className="text-2xl font-black text-slate-950">Official brand description</h2>
            </div>
            <p className="mt-5 leading-7 text-slate-600">
              KidSalonia is a specialised kids-first salon and family grooming concept designed around safe, colourful and child-friendly salon experiences. The brand provides services such as children&apos;s haircuts, baby first-haircut and mundan experiences, styling, nail care and family grooming. Franchise opportunities are open across India, subject to location, territory and commercial approval, with support covering outlet planning, training, operations, branding and marketing.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sm:p-9">
            <div className="flex items-center gap-3 text-purple-600">
              <Scissors size={25} />
              <h2 className="text-2xl font-black text-slate-950">Key facts for listings</h2>
            </div>
            <div className="mt-5 space-y-3">
              {facts.map((fact) => (
                <div key={fact} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={19} />
                  <span className="leading-6">{fact}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <a href={`${BASE_URL}/franchise`} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <Megaphone className="text-pink-600" size={25} />
            <h3 className="mt-4 text-xl font-black text-slate-950">Franchise overview</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use this as the primary destination for general franchise enquiries.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-pink-600">Open page <ExternalLink size={15} /></span>
          </a>

          <a href={`${BASE_URL}/franchise/cities`} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <MapPin className="text-purple-600" size={25} />
            <h3 className="mt-4 text-xl font-black text-slate-950">India city opportunities</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Link city-focused articles and listings to the most relevant market page.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-purple-600">Browse cities <ExternalLink size={15} /></span>
          </a>

          <a href={`${BASE_URL}/contact-us`} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <Building2 className="text-sky-600" size={25} />
            <h3 className="mt-4 text-xl font-black text-slate-950">Official contact</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">For verification, publishing requests and franchise-related business communication.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-sky-600">Contact KidSalonia <ExternalLink size={15} /></span>
          </a>
        </div>

        <div className="mt-10 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
          <h2 className="text-3xl font-black">Linking guidance for publishers</h2>
          <p className="mt-4 max-w-4xl leading-7 text-white/75">
            Please link to the most relevant official page. General brand stories can link to the main franchise page, while city-specific franchise stories should link to the matching KidSalonia city page. Natural descriptive anchor text is preferred over repetitive exact-match keywords.
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </>
);

export default FranchiseMediaKit;
