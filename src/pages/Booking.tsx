import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO from "@/components/SEO";
import { toast } from "sonner";

const API_URL = "https://kidsalonia-ai.vercel.app";
const STYLIST = "Any Available Artist";
const PHONE = "+918130307036";
const WHATSAPP = "918130307036";

const services = [
  { slug: "kids-haircut", name: "Kids Haircut", duration: 45 },
  { slug: "baby-first-haircut", name: "Baby First Haircut", duration: 45 },
  { slug: "toddler-haircut", name: "Toddler Haircut", duration: 45 },
  { slug: "boys-haircut", name: "Boys Haircut", duration: 45 },
  { slug: "girls-haircut", name: "Girls Haircut", duration: 60 },
  { slug: "kids-hair-styling", name: "Kids Hair Styling", duration: 60 },
  { slug: "mundan", name: "Mundan / Head Shave", duration: 60 },
  { slug: "nail-art", name: "Kids Nail Art", duration: 45 },
  { slug: "manicure", name: "Kids Manicure", duration: 45 },
  { slug: "pedicure", name: "Kids Pedicure", duration: 45 },
  { slug: "party-makeup", name: "Kids Party Makeup", duration: 60 },
];

const slots = [
  ["10:30", "10:30 AM"], ["11:30", "11:30 AM"], ["12:30", "12:30 PM"],
  ["13:30", "1:30 PM"], ["14:30", "2:30 PM"], ["15:30", "3:30 PM"],
  ["16:30", "4:30 PM"], ["17:30", "5:30 PM"], ["18:30", "6:30 PM"],
  ["19:30", "7:30 PM"], ["20:00", "8:00 PM"],
];

const localDay = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
};

const toCalendarDate = (date: string, time: string, duration: number) => {
  const start = new Date(`${date}T${time}:00+05:30`);
  const end = new Date(start.getTime() + duration * 60000);
  const fmt = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return { start: fmt(start), end: fmt(end) };
};

const Booking = () => {
  const [params] = useSearchParams();
  const requestedService = params.get("service") || "";
  const initialService = services.find((item) => item.slug === requestedService)?.slug || "";
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const [booked, setBooked] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<{ reference: string } | null>(null);
  const [form, setForm] = useState({
    service: initialService,
    childName: "",
    childAge: "",
    parentName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const service = useMemo(() => services.find((item) => item.slug === form.service), [form.service]);
  const isTuesday = form.date ? localDay(form.date) === 2 : false;
  const isWeekend = form.date ? [0, 6].includes(localDay(form.date)) : false;
  const visibleSlots = slots.filter(([time]) => isWeekend || !["10:30", "20:00"].includes(time));
  const minDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!form.date || isTuesday) {
      setBooked([]);
      return;
    }
    let cancelled = false;
    const run = async () => {
      setChecking(true);
      try {
        const results = await Promise.all(visibleSlots.map(async ([time]) => {
          const query = new URLSearchParams({ date: form.date, time, stylist: STYLIST });
          const response = await fetch(`${API_URL}/api/appointments/availability?${query}`, { cache: "no-store" });
          const result = await response.json().catch(() => null);
          return response.ok && result?.available ? null : time;
        }));
        if (!cancelled) setBooked(results.filter(Boolean) as string[]);
      } catch {
        if (!cancelled) setBooked([]);
      } finally {
        if (!cancelled) setChecking(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [form.date]);

  const next = () => {
    if (step === 1 && !form.service) return toast.error("Please choose a service.");
    if (step === 2 && (!form.childName.trim() || !form.parentName.trim() || !form.phone.trim())) return toast.error("Please complete the child and parent details.");
    if (step === 3 && (!form.date || !form.time)) return toast.error("Please select an available date and time.");
    setStep((current) => Math.min(4, current + 1));
  };

  const submit = async () => {
    if (!service) return;
    setBusy(true);
    try {
      const query = new URLSearchParams({ date: form.date, time: form.time, stylist: STYLIST });
      const availability = await fetch(`${API_URL}/api/appointments/availability?${query}`, { cache: "no-store" });
      const availableResult = await availability.json().catch(() => null);
      if (!availability.ok || !availableResult?.available) throw new Error("That slot was just booked. Please choose another time.");

      const response = await fetch(`${API_URL}/api/appointments/website-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          childName: form.childName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          service: service.name,
          stylist: STYLIST,
          date: form.date,
          time: form.time,
          notes: [`Child age: ${form.childAge || "Not provided"}`, form.notes.trim()].filter(Boolean).join("\n"),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || "Unable to complete the booking.");
      const reference = result?.appointment?.reference || result?.bookingId || `KS-${Date.now().toString().slice(-8)}`;
      setConfirmation({ reference });
      toast.success("Appointment booked successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to complete the booking.");
      setStep(3);
    } finally {
      setBusy(false);
    }
  };

  if (confirmation && service) {
    const calendar = toCalendarDate(form.date, form.time, service.duration);
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`KidSalonia - ${service.name}`)}&dates=${calendar.start}/${calendar.end}&details=${encodeURIComponent(`Booking reference: ${confirmation.reference}`)}&location=${encodeURIComponent("Ground Floor, A-19 JMD Suburbio 2, Gurugram")}`;
    const whatsappText = encodeURIComponent(`Hi KidSalonia, my booking ${confirmation.reference} is confirmed for ${service.name} on ${form.date} at ${form.time}.`);
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Booking Confirmed | KidSalonia" description="Your KidSalonia appointment has been confirmed." canonical="https://www.kidsalonia.com/book" noIndex />
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-500" />
          <h1 className="mt-6 text-4xl font-extrabold">Your appointment is booked!</h1>
          <p className="mt-4 text-lg text-muted-foreground">We look forward to welcoming {form.childName} to KidSalonia.</p>
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border bg-card p-7 text-left shadow-sm">
            <p><strong>Reference:</strong> {confirmation.reference}</p>
            <p className="mt-2"><strong>Service:</strong> {service.name}</p>
            <p className="mt-2"><strong>Date:</strong> {form.date}</p>
            <p className="mt-2"><strong>Time:</strong> {form.time}</p>
            <p className="mt-2"><strong>Duration:</strong> About {service.duration} minutes</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={calendarUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">Add to Google Calendar</a>
            <a href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-white">WhatsApp Us</a>
            <a href="https://maps.google.com/?q=KidSalonia+JMD+Suburbio+2+Gurugram" target="_blank" rel="noreferrer" className="rounded-full border px-6 py-3 font-bold">Get Directions</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-orange-50">
      <SEO title="Book a Kids Salon Appointment in Gurgaon | KidSalonia" description="Book kids haircuts, baby first haircuts, mundan, nail art and grooming appointments with live slot availability at KidSalonia Gurgaon." canonical="https://www.kidsalonia.com/book" />
      <Header />
      <SocialSidebar />
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="text-center">
          <p className="font-bold uppercase tracking-widest text-primary">Fast online booking</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">Book your child's salon visit</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Choose a service, share a few details and reserve a live appointment slot in minutes.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
          <section className="rounded-3xl border bg-white p-5 shadow-xl md:p-8">
            <div className="mb-8 grid grid-cols-4 gap-2">
              {["Service", "Details", "Slot", "Review"].map((label, index) => (
                <div key={label} className="text-center">
                  <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${step >= index + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{index + 1}</div>
                  <p className="mt-2 text-xs font-semibold">{label}</p>
                </div>
              ))}
            </div>

            {step === 1 && <div><h2 className="text-2xl font-bold">Choose a service</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{services.map((item) => <button key={item.slug} type="button" onClick={() => setForm({ ...form, service: item.slug })} className={`rounded-2xl border p-5 text-left transition ${form.service === item.slug ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "hover:border-primary"}`}><span className="block font-bold">{item.name}</span><span className="mt-2 block text-sm text-muted-foreground">About {item.duration} minutes</span></button>)}</div></div>}

            {step === 2 && <div><h2 className="text-2xl font-bold">Child and parent details</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><input value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} placeholder="Child name" className="rounded-xl border px-4 py-3" /><input value={form.childAge} onChange={(e) => setForm({ ...form, childAge: e.target.value })} placeholder="Child age" className="rounded-xl border px-4 py-3" /><input value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="Parent name" className="rounded-xl border px-4 py-3" /><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Mobile number" type="tel" className="rounded-xl border px-4 py-3" /><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" type="email" className="rounded-xl border px-4 py-3 sm:col-span-2" /></div></div>}

            {step === 3 && <div><h2 className="text-2xl font-bold">Choose date and time</h2><input type="date" min={minDate} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })} className="mt-6 w-full rounded-xl border px-4 py-3" />{isTuesday ? <p className="mt-4 rounded-xl bg-red-50 p-4 font-semibold text-red-600">Tuesday is closed. Please choose another date.</p> : <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{checking ? <p className="col-span-full text-muted-foreground">Checking live availability...</p> : visibleSlots.map(([time, label]) => { const unavailable = booked.includes(time); return <button key={time} type="button" disabled={unavailable} onClick={() => setForm({ ...form, time })} className={`rounded-2xl border p-4 font-bold ${unavailable ? "cursor-not-allowed bg-muted text-muted-foreground opacity-60" : form.time === time ? "border-primary bg-primary text-primary-foreground" : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-primary"}`}>{label}<span className="mt-1 block text-xs">{unavailable ? "Booked" : "Available"}</span></button>; })}</div>}</div>}

            {step === 4 && service && <div><h2 className="text-2xl font-bold">Review your booking</h2><div className="mt-6 space-y-3 rounded-2xl bg-muted/40 p-6"><p><strong>Service:</strong> {service.name}</p><p><strong>Child:</strong> {form.childName}{form.childAge ? `, age ${form.childAge}` : ""}</p><p><strong>Parent:</strong> {form.parentName}</p><p><strong>Phone:</strong> {form.phone}</p><p><strong>Date:</strong> {form.date}</p><p><strong>Time:</strong> {form.time}</p><p><strong>Duration:</strong> About {service.duration} minutes</p></div><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes, sensitivities or special requests (optional)" rows={4} className="mt-5 w-full rounded-xl border px-4 py-3" /></div>}

            <div className="mt-8 flex justify-between gap-3"><button type="button" disabled={step === 1 || busy} onClick={() => setStep((current) => Math.max(1, current - 1))} className="rounded-full border px-6 py-3 font-bold disabled:opacity-40">Back</button>{step < 4 ? <button type="button" onClick={next} className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground">Continue</button> : <button type="button" disabled={busy} onClick={submit} className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground disabled:opacity-50">{busy ? "Booking..." : "Confirm Booking"}</button>}</div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm"><Sparkles className="text-primary" /><h2 className="mt-3 text-xl font-bold">Why parents book online</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li className="flex gap-2"><Clock3 size={18} /> Live slot availability</li><li className="flex gap-2"><CalendarDays size={18} /> Instant confirmation</li><li className="flex gap-2"><MapPin size={18} /> Gurgaon salon location</li></ul></div>
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 rounded-2xl bg-orange-500 p-5 font-bold text-white"><Phone /> Need help? Call us</a>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi KidSalonia! I need help booking an appointment for my child.")}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-emerald-500 p-5 font-bold text-white"><MessageCircle /> Book on WhatsApp</a>
            <Link to="/offers" className="block rounded-2xl border bg-white p-5 text-center font-bold text-primary">View current offers</Link>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
