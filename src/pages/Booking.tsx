import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO from "@/components/SEO";
import KidsStickers from "@/components/KidsStickers";
import {
  BOOKING_SERVICES,
  getIndiaDate,
  getSlotsForDate,
  isPastSlot,
  isTuesday,
  isValidEmail,
  isValidPhone,
} from "@/lib/booking";

const API_URL = "https://kidsalonia-ai.vercel.app";
const STYLIST = "Any Available Artist";
const PHONE = "+918130307036";
const WHATSAPP = "918130307036";

type AvailabilityState = "idle" | "loading" | "ready" | "error";
type Confirmation = { reference: string };

const getErrorMessage = (result: unknown, fallback: string) => {
  if (result && typeof result === "object" && "message" in result && typeof result.message === "string") {
    return result.message;
  }
  return fallback;
};

const toCalendarDate = (date: string, time: string, duration: number) => {
  const start = new Date(`${date}T${time}:00+05:30`);
  const end = new Date(start.getTime() + duration * 60_000);
  const format = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return { start: format(start), end: format(end) };
};

const Booking = () => {
  const [params] = useSearchParams();
  const requestedService = params.get("service") ?? "";
  const initialService = BOOKING_SERVICES.some((item) => item.slug === requestedService) ? requestedService : "";
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [submitting, setSubmitting] = useState(false);
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>("idle");
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
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

  const service = useMemo(
    () => BOOKING_SERVICES.find((item) => item.slug === form.service),
    [form.service],
  );
  const slots = useMemo(() => getSlotsForDate(form.date), [form.date]);
  const minDate = getIndiaDate();

  useEffect(() => {
    if (!form.date || isTuesday(form.date)) {
      setUnavailableSlots([]);
      setAvailabilityState("idle");
      return;
    }

    const controller = new AbortController();
    const checkAvailability = async () => {
      setAvailabilityState("loading");
      setUnavailableSlots([]);
      try {
        const results = await Promise.all(
          slots.map(async ([time]) => {
            if (isPastSlot(form.date, time)) return time;
            const query = new URLSearchParams({ date: form.date, time, stylist: STYLIST });
            const response = await fetch(`${API_URL}/api/appointments/availability?${query}`, {
              cache: "no-store",
              headers: { Accept: "application/json" },
              signal: controller.signal,
            });
            const result: unknown = await response.json().catch(() => null);
            return response.ok && result && typeof result === "object" && "available" in result && result.available === true
              ? null
              : time;
          }),
        );
        setUnavailableSlots(results.filter((time): time is string => Boolean(time)));
        setAvailabilityState("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setAvailabilityState("error");
      }
    };
    void checkAvailability();
    return () => controller.abort();
  }, [form.date, slots]);

  const validateDetails = () => {
    if (!form.childName.trim() || !form.parentName.trim() || !form.phone.trim()) {
      return "Please complete the child name, parent name and mobile number.";
    }
    if (!isValidPhone(form.phone)) return "Enter a valid 10-digit Indian mobile number.";
    if (!isValidEmail(form.email)) return "Enter a valid email address.";
    return null;
  };

  const next = () => {
    let error: string | null = null;
    if (step === 1 && !service) error = "Please choose a service.";
    if (step === 2) error = validateDetails();
    if (step === 3) {
      if (!form.date || !form.time) error = "Please select an available date and time.";
      else if (isTuesday(form.date)) error = "KidSalonia is closed on Tuesday.";
      else if (availabilityState !== "ready") error = "Live availability must be confirmed before continuing.";
      else if (unavailableSlots.includes(form.time) || isPastSlot(form.date, form.time)) error = "That slot is unavailable. Please choose another time.";
    }
    if (error) return toast.error(error);
    setStep((current) => Math.min(4, current + 1));
  };

  const submit = async () => {
    if (!service || submitting) return;
    const validationError = validateDetails();
    if (validationError) {
      toast.error(validationError);
      setStep(2);
      return;
    }

    setSubmitting(true);
    try {
      const query = new URLSearchParams({ date: form.date, time: form.time, stylist: STYLIST });
      const availability = await fetch(`${API_URL}/api/appointments/availability?${query}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const availableResult: unknown = await availability.json().catch(() => null);
      const isAvailable =
        availability.ok &&
        availableResult &&
        typeof availableResult === "object" &&
        "available" in availableResult &&
        availableResult.available === true;
      if (!isAvailable) throw new Error("That slot was just booked. Please choose another time.");

      const response = await fetch(`${API_URL}/api/appointments/website-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          childName: form.childName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          service: service.name,
          stylist: STYLIST,
          date: form.date,
          time: form.time,
          notes: [`Child age: ${form.childAge.trim() || "Not provided"}`, form.notes.trim()]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      const result: unknown = await response.json().catch(() => null);
      const success = response.ok && result && typeof result === "object" && "success" in result && result.success === true;
      if (!success) throw new Error(getErrorMessage(result, "Unable to complete the booking. Please call or WhatsApp us."));

      let reference = `KS-${Date.now().toString().slice(-8)}`;
      if (result && typeof result === "object") {
        if ("bookingId" in result && typeof result.bookingId === "string") reference = result.bookingId;
        if ("appointment" in result && result.appointment && typeof result.appointment === "object" && "reference" in result.appointment && typeof result.appointment.reference === "string") {
          reference = result.appointment.reference;
        }
      }
      setConfirmation({ reference });
      toast.success("Appointment booked successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to complete the booking. Please call or WhatsApp us.");
      setStep(3);
    } finally {
      setSubmitting(false);
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
        <main className="relative isolate mx-auto max-w-3xl overflow-hidden px-4 py-16 text-center" aria-live="polite">
          <KidsStickers items={[
            { id: "confirmation-teddy", icon: "teddy", size: 72, animation: "bounce", delay: -1, position: { left: "3%", top: "12%" }, className: "hidden sm:block" },
            { id: "confirmation-balloons", icon: "balloons", size: 76, animation: "float", delay: -2, position: { right: "3%", top: "10%" }, className: "hidden sm:block" },
            { id: "confirmation-confetti-left", icon: "confetti", size: 52, animation: "rotate", delay: -3, position: { left: "4%", bottom: "16%" }, opacity: 0.78 },
            { id: "confirmation-confetti-right", icon: "confetti", size: 48, animation: "rotate", delay: -1.5, position: { right: "5%", bottom: "14%" }, opacity: 0.72 },
          ]} />
          <div className="relative z-10">
          <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-500" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-extrabold">Your appointment is booked!</h1>
          <p className="mt-4 text-lg text-muted-foreground">We look forward to welcoming {form.childName} to KidSalonia.</p>
          <dl className="mx-auto mt-8 max-w-xl rounded-3xl border bg-card p-7 text-left shadow-sm">
            <div><dt className="font-bold">Booking reference</dt><dd>{confirmation.reference}</dd></div>
            <div className="mt-3"><dt className="font-bold">Service</dt><dd>{service.name}</dd></div>
            <div className="mt-3"><dt className="font-bold">Date and time</dt><dd>{form.date} at {form.time}</dd></div>
            <div className="mt-3"><dt className="font-bold">Duration</dt><dd>About {service.duration} minutes</dd></div>
          </dl>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href={calendarUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Add to Google Calendar</a>
            <a href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">WhatsApp confirmation</a>
            <a href="https://maps.google.com/?q=KidSalonia+JMD+Suburbio+2+Gurugram" target="_blank" rel="noreferrer" className="rounded-full border px-6 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Get directions</a>
          </div>
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
      <main className="relative isolate mx-auto max-w-6xl overflow-hidden px-4 py-12 md:py-20">
        <KidsStickers items={[
          { id: "booking-teddy", icon: "teddy", size: 68, animation: "bounce", delay: -1, position: { left: "1%", top: "3%" }, className: "hidden lg:block" },
          { id: "booking-balloons", icon: "balloons", size: 72, animation: "float", delay: -2.5, position: { right: "1%", top: "3%" }, className: "hidden md:block", opacity: 0.8 },
        ]} />
        <div className="relative z-10 text-center">
          <p className="font-bold uppercase tracking-widest text-primary">Fast online booking</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">Book your child&apos;s salon visit</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Choose a service, share a few details and reserve a live appointment slot in minutes.</p>
        </div>

        <div className="relative z-10 mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0 rounded-3xl border bg-white p-5 shadow-xl md:p-8" aria-labelledby="booking-step-title">
            <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Booking progress">
              {["Service", "Details", "Slot", "Review"].map((label, index) => (
                <li key={label} className="text-center" aria-current={step === index + 1 ? "step" : undefined}>
                  <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${step >= index + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{index + 1}</div>
                  <p className="mt-2 text-xs font-semibold">{label}</p>
                </li>
              ))}
            </ol>

            {step === 1 && (
              <div>
                <h2 id="booking-step-title" className="text-2xl font-bold">Choose a service</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BOOKING_SERVICES.map((item) => (
                    <button key={item.slug} type="button" aria-pressed={form.service === item.slug} onClick={() => setForm({ ...form, service: item.slug })} className={`rounded-2xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${form.service === item.slug ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "hover:border-primary"}`}>
                      <span className="block font-bold">{item.name}</span>
                      <span className="mt-2 block text-sm text-muted-foreground">About {item.duration} minutes</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 id="booking-step-title" className="text-2xl font-bold">Child and parent details</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold">Child name <span aria-hidden="true">*</span><input aria-required="true" value={form.childName} onChange={(event) => setForm({ ...form, childName: event.target.value })} autoComplete="off" className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                  <label className="text-sm font-semibold">Child age<input value={form.childAge} onChange={(event) => setForm({ ...form, childAge: event.target.value })} inputMode="numeric" className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                  <label className="text-sm font-semibold">Parent name <span aria-hidden="true">*</span><input aria-required="true" value={form.parentName} onChange={(event) => setForm({ ...form, parentName: event.target.value })} autoComplete="name" className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                  <label className="text-sm font-semibold">Mobile number <span aria-hidden="true">*</span><input aria-required="true" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} type="tel" inputMode="tel" autoComplete="tel" className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                  <label className="text-sm font-semibold sm:col-span-2">Email (optional)<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" autoComplete="email" className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 id="booking-step-title" className="text-2xl font-bold">Choose date and time</h2>
                <label className="mt-6 block text-sm font-semibold">Appointment date<input type="date" min={minDate} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value, time: "" })} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                {isTuesday(form.date) ? (
                  <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 font-semibold text-red-700">Tuesday is closed. Please choose another date.</p>
                ) : availabilityState === "error" ? (
                  <div role="alert" className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                    <p className="font-semibold">Live availability is temporarily unavailable.</p>
                    <p className="mt-1 text-sm">For safety, online confirmation is paused. Please call or WhatsApp us, or try again shortly.</p>
                  </div>
                ) : form.date ? (
                  <div className="mt-6">
                    {availabilityState === "loading" ? (
                      <p role="status" className="text-muted-foreground">Checking live availability…</p>
                    ) : slots.length === 0 ? (
                      <p role="status" className="rounded-xl bg-muted p-4">No appointment times are offered on this date.</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Available appointment times">
                        {slots.map(([time, label]) => {
                          const unavailable = unavailableSlots.includes(time) || isPastSlot(form.date, time);
                          return (
                            <button key={time} type="button" disabled={unavailable} aria-pressed={form.time === time} onClick={() => setForm({ ...form, time })} className={`rounded-2xl border p-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${unavailable ? "cursor-not-allowed bg-muted text-muted-foreground opacity-60" : form.time === time ? "border-primary bg-primary text-primary-foreground" : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-primary"}`}>
                              {label}<span className="mt-1 block text-xs">{unavailable ? "Booked" : "Available"}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : <p className="mt-4 text-sm text-muted-foreground">Select a date to check live availability. Weekdays: 11:30 AM–8:30 PM. Weekends: 10:30 AM–9:00 PM.</p>}
              </div>
            )}

            {step === 4 && service && (
              <div>
                <h2 id="booking-step-title" className="text-2xl font-bold">Review your booking</h2>
                <dl className="mt-6 space-y-3 rounded-2xl bg-muted/40 p-6">
                  <div><dt className="font-bold">Service</dt><dd>{service.name}</dd></div>
                  <div><dt className="font-bold">Child</dt><dd>{form.childName}{form.childAge ? `, age ${form.childAge}` : ""}</dd></div>
                  <div><dt className="font-bold">Parent</dt><dd>{form.parentName}</dd></div>
                  <div><dt className="font-bold">Phone</dt><dd>{form.phone}</dd></div>
                  <div><dt className="font-bold">Date and time</dt><dd>{form.date} at {form.time}</dd></div>
                </dl>
                <label className="mt-5 block text-sm font-semibold">Notes or special requests<textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={4} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <button type="button" disabled={step === 1 || submitting} onClick={() => setStep((current) => Math.max(1, current - 1))} className="rounded-full border px-6 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-40">Back</button>
              {step < 4 ? (
                <button type="button" disabled={availabilityState === "loading"} onClick={next} className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50">Continue</button>
              ) : (
                <button type="button" disabled={submitting} onClick={() => void submit()} className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Confirming…" : "Confirm booking"}</button>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm"><Sparkles className="text-primary" aria-hidden="true" /><h2 className="mt-3 text-xl font-bold">Why parents book online</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li className="flex gap-2"><Clock3 size={18} aria-hidden="true" /> Live slot availability</li><li className="flex gap-2"><CalendarDays size={18} aria-hidden="true" /> Instant confirmation</li><li className="flex gap-2"><MapPin size={18} aria-hidden="true" /> Gurgaon salon location</li></ul></div>
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 rounded-2xl bg-orange-500 p-5 font-bold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"><Phone aria-hidden="true" /> Need help? Call us</a>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi KidSalonia! I need help booking an appointment for my child.")}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-emerald-500 p-5 font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"><MessageCircle aria-hidden="true" /> WhatsApp us</a>
            <Link to="/offers" className="block rounded-2xl border bg-white p-5 text-center font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">View current offers</Link>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
