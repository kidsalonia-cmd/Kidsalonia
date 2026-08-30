import {
  Facebook,
  Globe2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ADDRESS = "Ground floor, KidSalonia, A-19 JMD Suburbio 2, Gurugram, Haryana 122101";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent("Hi KidSalonia! I would like to know more about your services and book a visit.")}`;

const presence = [
  { label: "Website", detail: "www.kidsalonia.com", href: "https://kidsalonia.com", icon: Globe2 },
  { label: "Instagram", detail: "@kidsalonia", href: "https://www.instagram.com/kidsalonia", icon: Instagram },
  { label: "Facebook", detail: "KidSalonia", href: "https://www.facebook.com/766831683190165", icon: Facebook },
  { label: "WhatsApp", detail: "+91 81303 07036", href: WHATSAPP_URL, icon: MessageCircle },
  { label: "Call Us", detail: "+91 81303 07036", href: "tel:+918130307036", icon: Phone },
  { label: "Email", detail: "sales@kidsalonia.com", href: "mailto:sales@kidsalonia.com", icon: Mail },
];

export default function FindUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-pink-50 via-white to-orange-50 px-4 py-14 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-primary">Visit • Call • Message • Follow</span>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">Find & Contact KidSalonia</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Everything you need to reach KidSalonia — our salon location, directions, phone, WhatsApp, email and official social media presence.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {presence.map(({ label, detail, href, icon: Icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-primary"><Icon size={24} /></div>
              <h2 className="mt-4 text-lg font-black text-foreground">{label}</h2>
              <p className="mt-1 text-sm font-semibold text-muted-foreground group-hover:text-primary">{detail}</p>
            </a>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl border bg-white shadow-xl lg:grid-cols-[0.85fr_1.65fr]">
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><MapPin size={25} /></div>
              <h2 className="mt-5 text-2xl font-black text-foreground">KidSalonia – JMD Suburbio 2</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{ADDRESS}</p>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="ks-button-3d mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">
                <Navigation size={18} /> Get Directions
              </a>
              <a href="tel:+918130307036" className="mt-3 inline-flex w-fit items-center gap-2 font-bold text-primary"><Phone size={17} /> +91 81303 07036</a>
            </div>
            <iframe
              src="https://storage.googleapis.com/maps-solutions-7mlx2nszrt/locator-plus/lnnc/locator-plus.html"
              title="KidSalonia location finder"
              width="100%"
              height="650"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
