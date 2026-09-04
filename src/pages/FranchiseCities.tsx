import { Link } from "react-router-dom";
import { ArrowRight, Building2, MapPin, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { BASE_URL, createBreadcrumbSchema } from "@/components/SEO";
import { franchiseCities } from "@/data/franchise-cities";

const FranchiseCities = () => {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? franchiseCities.filter((city) => `${city.name} ${city.state}`.toLowerCase().includes(normalized))
      : franchiseCities;

    return filtered.reduce<Record<string, typeof franchiseCities>>((acc, city) => {
      (acc[city.state] ||= []).push(city);
      return acc;
    }, {});
  }, [query]);

  const stateNames = Object.keys(grouped).sort();

  return (
    <>
      <SEO
        title="Kids Salon Franchise Cities in India | KidSalonia Franchise"
        description="Explore KidSalonia kids salon franchise opportunities across major cities in India. Browse city-specific franchise pages and enquire about territory availability."
        canonical={`${BASE_URL}/franchise/cities`}
        keywords={["salon franchise India", "kids salon franchise India", "beauty salon franchise cities", "Kidsalonia franchise"]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "Franchise", url: `${BASE_URL}/franchise` },
            { name: "Franchise Cities", url: `${BASE_URL}/franchise/cities` },
          ]),
        ]}
      />

      <Header />
      <SocialSidebar />

      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-bold text-pink-700 shadow-sm">
              <Sparkles size={17} /> Franchise expansion across India
            </div>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find a KidSalonia Salon Franchise Opportunity in Your City
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Browse city-specific franchise information across India. Territory availability and commercial approval are evaluated individually for every proposed market.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-lg">
              <Search size={20} className="text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search city or state"
                className="w-full bg-transparent py-1 outline-none"
                aria-label="Search franchise cities"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-black text-pink-600">{franchiseCities.length}+</p>
              <p className="mt-1 font-semibold text-slate-600">Priority Indian cities indexed</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-black text-pink-600">India-wide</p>
              <p className="mt-1 font-semibold text-slate-600">Franchise enquiries welcome</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-black text-pink-600">Kids-first</p>
              <p className="mt-1 font-semibold text-slate-600">Specialised salon concept</p>
            </div>
          </div>

          {stateNames.length ? (
            <div className="space-y-10">
              {stateNames.map((state) => (
                <section key={state} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-100 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-600"><MapPin size={21} /></div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-950">{state}</h2>
                      <p className="text-sm text-slate-500">Salon franchise opportunities by city</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {grouped[state].sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                      <Link
                        key={city.slug}
                        to={`/franchise/${city.slug}`}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                      >
                        <span>{city.name}</span>
                        <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
              <Building2 className="mx-auto text-pink-500" size={36} />
              <h2 className="mt-4 text-2xl font-black text-slate-950">City not listed yet</h2>
              <p className="mt-2 text-slate-600">You can still submit a franchise enquiry for any Indian city.</p>
              <Link to="/franchise#franchise-form" className="mt-5 inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-3 font-bold text-white">Submit Franchise Enquiry <ArrowRight size={18} /></Link>
            </div>
          )}

          <div className="mt-12 rounded-[2rem] bg-slate-950 p-8 text-center text-white sm:p-10">
            <h2 className="text-3xl font-black">Your city is not in the directory?</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/70">KidSalonia welcomes franchise enquiries from other Indian cities too. Share your proposed city and location for an initial feasibility discussion.</p>
            <Link to="/franchise#franchise-form" className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-4 font-black text-white">Apply for Your City <ArrowRight size={19} /></Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FranchiseCities;
