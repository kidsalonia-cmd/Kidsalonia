import { Link } from "react-router-dom";
import { BadgeIndianRupee, MessageCircle, Sparkles } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent("Hi KidSalonia! Please share the latest complete price list and available offers.")}`;

const groups = [
  { title: "✂️ Haircuts & Hair Care", tone: "from-pink-100 to-rose-50", items: [
    ["Boys Haircut", "₹299"], ["Flake Fighter Treatment", "₹349"], ["Hair Straightening", "₹399"], ["Hair Curling / Crimping", "₹399"], ["Styling Blow Dry", "₹399"], ["Lice Buster Treatment", "₹449"], ["Boys Haircut + Shampoo + Conditioner", "₹449"], ["Kids Shampoo + Conditioner + Gel", "₹449"], ["Kids Party Hair Colour", "₹499"], ["Girls Haircut", "₹499"], ["Party Hair Styling", "₹599"], ["Full Head Shave", "₹699"], ["Hair Oiling (Almond / Walnut)", "₹699"], ["Girls Haircut + Shampoo + Conditioner", "₹749"],
  ]},
  { title: "👶 First Haircut & Mundan", tone: "from-sky-100 to-cyan-50", items: [["Mundan Ceremony", "₹1,100"]] },
  { title: "🌈 Kids Nail Services", tone: "from-violet-100 to-fuchsia-50", items: [
    ["Nail Polish Feet", "₹99"], ["Nail Polish Hands", "₹99"], ["French Nail Polish Hands", "₹199"], ["French Nail Polish Feet", "₹199"], ["Kids Nail Art", "₹399"], ["Kids Crystal Jelly Manicure", "₹499"], ["Kids Crystal Jelly Pedicure", "₹599"],
  ]},
  { title: "💅 Adult Nails", tone: "from-amber-100 to-yellow-50", items: [
    ["Nails Extension", "₹1,800"], ["Gel Overlay", "₹1,600"], ["Nails Refill", "₹1,500"], ["French on Natural Nails", "₹1,200"], ["Ombre / Cat Eye", "₹1,000"], ["Chrome", "₹1,000"], ["Marble", "₹800"], ["Gel Paint on Natural Nails", "₹800"], ["Glitter Art", "₹800"], ["Multicolour French", "₹500"], ["Extension Removal", "₹500"], ["Paint Removal", "₹350"], ["French Art", "₹300"], ["Nail Repair", "₹250"], ["3D Art on Nail", "From ₹200"], ["Bow Set", "₹200–₹300"], ["Brush Art", "₹100"], ["Rhinestone", "₹20–₹50"],
  ]},
  { title: "✨ Makeup & Styling", tone: "from-emerald-100 to-green-50", items: [
    ["Kids Party Makeup (Classic)", "₹499"], ["Kids Occasional Makeup", "₹799"],
  ]},
];

export default function PriceListSection() {
  return (
    <section id="price-list" className="scroll-mt-40 bg-gradient-to-br from-pink-50 via-sky-50 to-yellow-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm"><BadgeIndianRupee size={18}/> Complete Price List</div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">KidSalonia Services & Prices 🌈</h2>
          <p className="mt-4 text-muted-foreground">Haircuts, Mundan, nail art, manicure, pedicure and styling prices at a glance.</p>
        </div>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <section key={group.title} className={`overflow-hidden rounded-[2rem] border bg-gradient-to-br ${group.tone} p-5 shadow-lg sm:p-7`}>
              <h3 className="mb-5 text-xl font-black sm:text-2xl">{group.title}</h3>
              <div className="space-y-2">
                {group.items.map(([service, price]) => (
                  <div key={service} className="flex items-center justify-between gap-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                    <span className="font-bold text-foreground">{service}</span>
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 font-black text-primary">{price}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">Prices shown are the current starting/listed prices and may vary for selected designs, hair length, add-ons or packages. Please confirm at booking.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-extrabold text-white shadow-lg">Book a Service ✨</Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 font-extrabold text-white shadow-lg"><MessageCircle size={19}/> Ask on WhatsApp</a>
          <Link to="/offers" className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-7 py-3 font-extrabold text-primary"><Sparkles size={19}/> Current Offers</Link>
        </div>
      </div>
    </section>
  );
}
