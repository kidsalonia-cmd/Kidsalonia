import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Heart, Shield, Sparkles, Star, Scissors, Smile } from "lucide-react";
import aboutHero from "@/assets/gallery/gallery-20.png";

const aboutFAQs = [{ question: "Why choose a kids salon instead of a regular salon?", answer: "A kids salon like KidSalonia is specifically designed for children — from playful interiors and child-sized chairs to trained stylists who know how to keep little ones calm and happy." }];
const features = [
  [Shield,"100% Kid-Safe Products","Hypoallergenic, tear-free products chosen for delicate skin and hair.","bg-pink-100"],
  [Smile,"Trained Kids Stylists","Patient stylists who understand wiggly toddlers and shy teenagers.","bg-sky-100"],
  [Sparkles,"A Space Built for Fun","Colourful chairs, playful interiors and little moments made for smiles.","bg-violet-100"],
  [Heart,"Parent-Friendly","A clean, comfortable space with full visibility and care parents can trust.","bg-emerald-100"],
  [Star,"More Than Haircuts","Nail art, party makeup, skin care and Mundan services under one roof.","bg-amber-100"],
  [Scissors,"Personal Attention","Every child receives calm, unhurried one-to-one attention.","bg-rose-100"],
] as const;

const AboutUs = () => {
  const jsonLd=[localBusinessSchema,createFAQSchema(aboutFAQs),{"@context":"https://schema.org","@type":"AboutPage",name:"About KidSalonia",url:"https://www.kidsalonia.com/about-us"}];
  return <div className="min-h-screen bg-[#fff9fc]">
    <SEO title="About Us | KidSalonia - Premium Kids Salon Gurugram" description="KidSalonia is Gurugram's trusted child-friendly salon. Safe products, trained stylists, and a playful space designed to make every child smile." canonical="https://www.kidsalonia.com/about-us" jsonLd={jsonLd}/>
    <Header/><SocialSidebar/>
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 py-12 md:py-16">
        <div className="absolute left-6 top-5 text-5xl opacity-60">🌈</div><div className="absolute right-10 top-8 text-4xl opacity-60">☁️</div><div className="absolute right-1/4 bottom-5 text-3xl">✨</div>
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div><div className="inline-flex rounded-full bg-white/80 px-4 py-2 font-bold text-primary mb-4">💖 Made for little smiles</div><h1 className="text-4xl md:text-6xl font-black text-[#4b2677] leading-tight">Welcome to the colourful world of KidSalonia!</h1><p className="mt-5 text-lg text-[#665678] max-w-xl">A child-friendly salon in Gurugram where haircuts feel like adventures, grooming feels like play, and parents can relax.</p><div className="flex flex-wrap gap-3 mt-7"><span className="bg-white rounded-full px-4 py-2 shadow-sm">✂️ Gentle Haircuts</span><span className="bg-white rounded-full px-4 py-2 shadow-sm">💅 Nail Fun</span><span className="bg-white rounded-full px-4 py-2 shadow-sm">⭐ Happy Kids</span></div></div>
          <div className="relative"><div className="absolute -inset-3 bg-white/60 rounded-[2.5rem] rotate-3"/><img src={aboutHero} alt="Happy child at KidSalonia kids salon in Gurugram" className="relative w-full h-[330px] object-cover rounded-[2.5rem] shadow-xl -rotate-1"/></div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-[#fff4c9] via-[#fff] to-[#e7f8ff]"><div className="max-w-5xl mx-auto px-6"><div className="bg-white/90 rounded-[2rem] shadow-lg border-4 border-white p-7 md:p-10"><div className="text-4xl mb-3">🧸✂️</div><h2 className="text-3xl font-black mb-5">Why We Started KidSalonia</h2><div className="text-lg text-muted-foreground space-y-4"><p>It started with a simple observation — watching a toddler cry through a haircut at a regular salon. Loud dryers, unfamiliar smells and tall chairs were never designed for tiny legs.</p><p>We asked: <em>why isn't there a place designed entirely around how children feel?</em> That question became KidSalonia — a salon built around safety, comfort, fun and a smile on every child's face.</p></div></div></div></section>

      <section className="py-14 bg-gradient-to-br from-[#e8f9ee] via-[#f7fff8] to-[#e6f5ff]"><div className="max-w-5xl mx-auto px-6"><div className="grid md:grid-cols-[.75fr_1.25fr] gap-8 items-center"><div className="bg-white rounded-[2rem] p-8 text-center shadow-md"><div className="text-7xl">🎈</div><div className="text-5xl mt-3">😊</div><p className="font-black text-xl mt-5 text-[#4b2677]">No rush. No fear.<br/>Just happy salon time.</p></div><div><h2 className="text-3xl font-black mb-5">Our Philosophy: Experience First</h2><p className="text-lg text-muted-foreground leading-8">A kids haircut should feel like an adventure, not an appointment. Cartoon-themed chairs, playful interiors and patient stylists help nervous first-timers become happy little salon stars.</p><p className="text-lg text-muted-foreground leading-8 mt-4">We let every child settle at their own pace. When a child feels safe, everything else falls into place. 💛</p></div></div></div></section>

      <section className="py-16 bg-gradient-to-br from-[#fff1f7] via-[#f5efff] to-[#eef9ff]"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-10"><div className="text-4xl">⭐ 🌈 ⭐</div><h2 className="text-3xl md:text-4xl font-black mt-3">What Makes Us Different</h2><p className="text-muted-foreground mt-2">Little details that make a BIG difference.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{features.map(([Icon,title,desc,tone])=><div key={title} className={`${tone} rounded-[2rem] p-7 border-4 border-white shadow-md hover:-translate-y-1 transition`}><div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4"><Icon className="w-7 h-7 text-primary"/></div><h3 className="text-xl font-black mb-2">{title}</h3><p className="text-muted-foreground leading-relaxed">{desc}</p></div>)}</div></div></section>

      <section className="py-14 bg-gradient-to-r from-[#e7f7ff] via-white to-[#fff0f6]"><div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-5 text-center"><div className="bg-white rounded-3xl p-6 shadow-sm"><div className="text-4xl">👶</div><h3 className="font-black text-xl mt-3">First Haircut?</h3><p className="text-muted-foreground mt-2">We make milestone haircuts calm and memorable.</p></div><div className="bg-white rounded-3xl p-6 shadow-sm"><div className="text-4xl">👨‍👩‍👧</div><h3 className="font-black text-xl mt-3">Parents Relax</h3><p className="text-muted-foreground mt-2">A clean, visible and welcoming family environment.</p></div><div className="bg-white rounded-3xl p-6 shadow-sm"><div className="text-4xl">🎉</div><h3 className="font-black text-xl mt-3">Kids Have Fun</h3><p className="text-muted-foreground mt-2">Colour, play and friendly attention from start to finish.</p></div></div></section>

      <section className="py-16 px-6 bg-gradient-to-br from-[#6d3fc0] to-[#ec4c8c] text-center"><div className="max-w-3xl mx-auto"><div className="text-5xl mb-4">🌈 ✂️ 💅</div><h2 className="text-3xl md:text-4xl font-black text-white">Ready for a happier salon visit?</h2><p className="text-white/90 text-lg mt-4 mb-8">Book your child's next KidSalonia experience in just a few clicks.</p><Link to="/book" className="inline-block bg-white text-[#c62f6f] font-black px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition">Book Now ✨</Link></div></section>
    </main><Footer/>
  </div>;
};
export default AboutUs;
