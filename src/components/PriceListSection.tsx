import { Link } from "react-router-dom";
import { BadgeIndianRupee, MessageCircle, Scissors, Sparkles } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent(
  "Hi KidSalonia! Please share the latest complete price list and available offers.",
)}`;

const priceItems = [
  { service: "Boys Haircut", price: "From ₹299", note: "Kids-friendly haircut and grooming" },
  { service: "Girls Haircut", price: "From ₹499", note: "Trim, styling and age-appropriate cuts" },
  { service: "Mundan / First Haircut", price: "Ask for latest price", note: "Hygienic baby and kids mundan service" },
  { service: "Kids Nail Art", price: "Ask for latest price", note: "Cute, colourful child-friendly designs" },
  { service: "Manicure & Pedicure", price: "Ask for latest price", note: "Kids, teens and family options" },
  { service: "Party Styling / Makeover", price: "Ask for latest price", note: "Hair styling and occasion-ready grooming" },
];

export default function PriceListSection() {
  return (
    <section id="price-list" className="scroll-mt-40 bg-gradient-to-b from-white via-pink-50/50 to-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
            <BadgeIndianRupee size={18} /> Price List
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">Popular KidSalonia Service Prices</h2>
          <p className="mt-4 text-muted-foreground">See starting prices at a glance. Final price can vary by service, hair length, design and selected package.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {priceItems.map((item) => (
            <article key={item.service} className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-foreground">{item.service}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
                </div>
                <div className="rounded-2xl bg-pink-50 p-3 text-primary"><Scissors size={20} /></div>
              </div>
              <p className="mt-5 text-xl font-black text-primary">{item.price}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-extrabold text-white shadow-lg transition hover:bg-emerald-600">
            <MessageCircle size={19} /> Get Complete Latest Price List
          </a>
          <Link to="/offers" className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-extrabold text-primary transition hover:bg-primary hover:text-white">
            <Sparkles size={19} /> View Current Offers
          </Link>
        </div>
      </div>
    </section>
  );
}
