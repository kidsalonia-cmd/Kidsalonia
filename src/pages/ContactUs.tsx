import { CalendarDays, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO from "@/components/SEO";
import contactBanner from "@/assets/contact-banner.jpg";

const ContactUs = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Contact KidSalonia | Kids Salon in Gurugram"
      description="Contact KidSalonia in Gurugram for directions, questions, calls and WhatsApp support. Online appointments are available through our dedicated booking page."
      canonical="https://www.kidsalonia.com/contact-us"
    />
    <Header />
    <SocialSidebar />
    <main>
      <section className="relative isolate overflow-hidden px-4 py-20 text-white">
        <img src={contactBanner} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-bold uppercase tracking-widest text-pink-200">We&apos;re here to help</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">Contact KidSalonia</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">Ask a question, get directions, or speak with our team. To check live availability and reserve a confirmed appointment, use online booking.</p>
          <Link to="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
            <CalendarDays aria-hidden="true" /> Book an appointment
          </Link>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          <a href="tel:+918130307036" className="rounded-3xl border bg-card p-7 shadow-sm transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary">
            <Phone className="text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Call us</h2>
            <p className="mt-2 text-muted-foreground">+91 81303 07036</p>
          </a>
          <a href={`https://wa.me/918130307036?text=${encodeURIComponent("Hi KidSalonia, I have a question about your salon services.")}`} target="_blank" rel="noreferrer" className="rounded-3xl border bg-card p-7 shadow-sm transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary">
            <MessageCircle className="text-emerald-500" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">WhatsApp</h2>
            <p className="mt-2 text-muted-foreground">Message our salon team</p>
          </a>
          <a href="mailto:sales@kidsalonia.com" className="rounded-3xl border bg-card p-7 shadow-sm transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary">
            <Mail className="text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Email</h2>
            <p className="mt-2 text-muted-foreground">sales@kidsalonia.com</p>
          </a>
          <a href="https://maps.google.com/?q=KidSalonia+JMD+Suburbio+2+Gurugram" target="_blank" rel="noreferrer" className="rounded-3xl border bg-card p-7 shadow-sm transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary">
            <MapPin className="text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Visit us</h2>
            <p className="mt-2 text-muted-foreground">Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana</p>
          </a>
        </div>
        <div className="mx-auto mt-10 max-w-5xl rounded-3xl bg-muted/50 p-7 text-center">
          <h2 className="text-2xl font-bold">Opening hours</h2>
          <p className="mt-3 text-muted-foreground">Monday and Wednesday–Friday: 11:30 AM–8:30 PM</p>
          <p className="text-muted-foreground">Saturday–Sunday: 10:30 AM–9:00 PM</p>
          <p className="font-semibold text-primary">Tuesday: Closed</p>
        </div>
      </section>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.0386!3d28.5035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzEyLjYiTiA3N8KwMDInMTguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="KidSalonia location in Gurugram"
      />
    </main>
    <Footer />
  </div>
);

export default ContactUs;
