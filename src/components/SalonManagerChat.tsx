import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X, Send, CalendarDays, ArrowLeft, Phone, CheckCircle2 } from "lucide-react";
import { BOOKING_SERVICES, getIndiaDate, getSlotsForDate, isPastSlot, isTuesday, isValidPhone } from "@/lib/booking";

const API = "https://ai.kidsalonia.com";
const SALON_PHONE = "8130307036";
const WELCOME = "Hi there! 👋 Welcome to Kidsalonia. How can I help you today?";
type ChatMessage = { role: "user" | "assistant"; text: string };

function assignedArtist(slug: string) {
  if (/nail|gel-polish/.test(slug)) return "Pooja";
  if (/manicure|pedicure|beauty|facial|cleanup/.test(slug)) return "Julie";
  return "Rajiv";
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return new Date(2026, 0, 1, hours, minutes).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function hasValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < getIndiaDate() || isTuesday(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toISOString().startsWith(value);
}

function preferredDateFromMessage(value: string): string | null {
  const normalized = value.toLowerCase().trim();
  let date = "";
  if (/\b(tomorrow|kal)\b|कल/.test(normalized)) {
    date = getIndiaDate(new Date(Date.now() + 86_400_000));
  } else if (/\b(today|aaj)\b|आज/.test(normalized)) {
    date = getIndiaDate();
  } else {
    const iso = normalized.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
    const indian = normalized.match(/\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b/);
    date = iso?.[1] || (indian
      ? `${indian[3]}-${indian[2].padStart(2, "0")}-${indian[1].padStart(2, "0")}`
      : "");
  }
  return date && hasValidDate(date) ? date : null;
}

const inputClass = "w-full rounded-xl border border-pink-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100";

export default function SalonManagerChat() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "booking">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [suggestedService, setSuggestedService] = useState("");
  // Keep the customer conversation natural. Only reveal booking actions
  // after the customer explicitly asks to book or agrees to proceed.
  const [showBookingAction, setShowBookingAction] = useState(false);
  const [showHandoffAction, setShowHandoffAction] = useState(false);
  const [busy, setBusy] = useState(false);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingError, setBookingError] = useState("");
  const [reference, setReference] = useState("");
  const [pendingApproval, setPendingApproval] = useState(false);
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    parentName: "",
    customerName: "",
    childAge: "",
    phone: "",
    mundanLocation: "",
    homeAddress: "",
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const service = BOOKING_SERVICES.find((s) => s.slug === form.service);
  const stylist = service ? assignedArtist(service.slug) : "";
  const isMundan = form.service === "mundan";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy, open, view]);

  useEffect(() => {
    if (view !== "booking" || !service || !hasValidDate(form.date)) {
      setAvailableSlots([]);
      return;
    }
    const controller = new AbortController();
    setSlotLoading(true);
    setAvailableSlots([]);
    setBookingError("");
    const slots = getSlotsForDate(form.date)
      .map(([value]) => value)
      .filter((time) => !isPastSlot(form.date, time));
    void Promise.all(slots.map(async (time) => {
      const query = new URLSearchParams({
        date: form.date,
        time,
        stylist,
        duration: String(service.duration),
      });
      const response = await fetch(`${API}/api/appointments/availability?${query}`, {
        signal: controller.signal,
        cache: "no-store",
      });
      const data = await response.json();
      return response.ok && data?.available ? time : null;
    })).then((values) => {
      if (!controller.signal.aborted) setAvailableSlots(values.filter((time): time is string => !!time));
    }).catch((error) => {
      if (!controller.signal.aborted && error?.name !== "AbortError")
        setBookingError("We couldn't check availability. Please retry.");
    }).finally(() => {
      if (!controller.signal.aborted) setSlotLoading(false);
    });
    return () => controller.abort();
  }, [view, form.date, service?.slug, service?.duration, stylist]);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "date" || field === "service" ? { time: "" } : {}),
    }));
    setBookingError("");
  };

  function openBooking(serviceSlug = suggestedService) {
    const validSlug = BOOKING_SERVICES.some((item) => item.slug === serviceSlug) ? serviceSlug : "";
    setForm((current) => ({
      ...current,
      service: validSlug || current.service,
      ...(validSlug && validSlug !== current.service ? { time: "" } : {}),
    }));
    setBookingError("");
    setReference("");
    setPendingApproval(false);
    setView("booking");
  }

  async function sendMessage(text: string) {
    if (!text.trim() || busy) return;
    const trimmed = text.trim().slice(0, 500);
    const datePreference = preferredDateFromMessage(trimmed);
    if (datePreference) setForm((current) => ({ ...current, date: datePreference, time: "" }));
    const history = messages.slice(-12);
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setInput("");
    setShowBookingAction(false);
    setShowHandoffAction(false);
    setBusy(true);
    try {
      const response = await fetch(`${API}/api/customer-manager/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed, history, contextService: suggestedService,
          contextMundanLocation: form.mundanLocation,
        }),
      });
      const data = await response.json();
      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || "Unable to reach Kidsalonia Manager.");
      }
      const reply = typeof data.reply === "string" && data.reply.trim()
        ? data.reply.trim()
        : "Of course. Which service would you like to book, and for what date?";
      const resolvedSlug = typeof data.suggestedService === "string" &&
        BOOKING_SERVICES.some((item) => item.slug === data.suggestedService)
        ? data.suggestedService : "";
      if (resolvedSlug) setSuggestedService(resolvedSlug);
      const resolvedDate = typeof data.preferredDate === "string" &&
        hasValidDate(data.preferredDate) ? data.preferredDate : datePreference;
      const location = data.mundanLocation === "Home" || data.mundanLocation === "Salon"
        ? data.mundanLocation : "";
      if (resolvedSlug || resolvedDate || location) {
        setForm((current) => {
          const nextService = resolvedSlug || current.service;
          const nextDate = resolvedDate || current.date;
          const nextLocation = nextService === "mundan" ? (location || current.mundanLocation) : "";
          return {
            ...current,
            service: nextService,
            date: nextDate,
            mundanLocation: nextLocation,
            time: nextService !== current.service || nextDate !== current.date ||
              nextLocation !== current.mundanLocation ? "" : current.time,
          };
        });
      }
      const intent = String(data.intent || "");
      setShowBookingAction(["booking", "ready-to-book"].includes(intent));
      setShowHandoffAction(["handoff", "home-service"].includes(intent));
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
    } catch {
      setShowBookingAction(true);
      setMessages((current) => [...current, {
        role: "assistant",
        text: "I'm having trouble connecting just now. You can still check our available appointment times below, or call our team at +91 81303 07036.",
      }]);
    } finally {
      setBusy(false);
    }
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service || !hasValidDate(form.date) || !form.time || !availableSlots.includes(form.time)) {
      setBookingError("Please select an available date and time.");
      return;
    }
    if (!form.parentName.trim() || !form.customerName.trim() || !isValidPhone(form.phone)) {
      setBookingError("Enter both names and a valid 10-digit mobile number.");
      return;
    }
    if (isMundan && (!form.mundanLocation || (form.mundanLocation === "Home" && !form.homeAddress.trim()))) {
      setBookingError("Choose the mundan location and enter the home address if applicable.");
      return;
    }

    setBookingBusy(true);
    setBookingError("");
    try {
      const query = new URLSearchParams({
        date: form.date, time: form.time, stylist, duration: String(service.duration),
      });
      const checked = await fetch(`${API}/api/appointments/availability?${query}`, { cache: "no-store" });
      const checkedData = await checked.json();
      if (!checked.ok || !checkedData?.available) {
        setAvailableSlots((previous) => previous.filter((slot) => slot !== form.time));
        throw new Error("That slot is no longer available. Please choose another.");
      }

      const response = await fetch(`${API}/api/appointments/website-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          childName: form.customerName.trim(),
          childAge: form.childAge.trim(),
          phone: form.phone.trim(),
          service: service.name,
          stylist,
          date: form.date,
          time: form.time,
          duration: service.duration,
          mundanLocation: isMundan ? form.mundanLocation : undefined,
          homeAddress: isMundan && form.mundanLocation === "Home" ? form.homeAddress.trim() : undefined,
          notes: "Booked through Kidsalonia AI Virtual Manager chat. Payment at salon.",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Booking could not be saved.");
      setReference(String(data.appointmentId));
      setPendingApproval(Boolean(data.pendingApproval));
      setMessages((current) => [...current, {
        role: "assistant",
        text: data.pendingApproval
          ? `✅ Home Mundan request received! Reference: ${data.appointmentId}. Requested for ${form.date} at ${formatTime(form.time)}. Our team will confirm availability, travel charges and final arrangements. This is not yet a confirmed appointment.`
          : `✅ Booking saved! Reference: ${data.appointmentId}. ${service.name} with ${stylist} on ${form.date} at ${formatTime(form.time)}. Payment is at the salon. ${data.whatsapp?.customerSent ? "A WhatsApp confirmation was sent." : "WhatsApp confirmation is pending."}`,
      }]);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Booking could not be saved.");
    } finally {
      setBookingBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100] font-sans sm:bottom-6 sm:right-6" data-kidsalonia-chatbot>
      {open && (
        <section className="mb-3 flex h-[min(680px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-[0_20px_80px_rgba(48,13,72,.24)]" aria-label="Kidsalonia virtual manager chat">
          <header className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-purple-700 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl">✂️</span>
              <div><h2 className="text-base font-extrabold text-white">Kidsalonia Manager</h2><p className="text-xs text-white/85">AI assistant · Here to help</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full bg-white/15 p-2 hover:bg-white/25"><X size={19}/></button>
          </header>

          {view === "chat" ? (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto bg-pink-50/40 p-4" aria-live="polite">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <p className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "bg-pink-600 text-white" : "border border-pink-100 bg-white text-slate-800"}`}>{message.text}</p>
                  </div>
                ))}
                {busy && <p className="text-xs text-slate-500">Kidsalonia Manager is replying…</p>}
                <div ref={bottomRef} />
              </div>
              <div className="border-t border-pink-100 bg-white p-3">
                {showBookingAction && !busy && (
                  <div className="mb-3">
                    <button type="button" onClick={() => openBooking()}
                      className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-700">
                      <CalendarDays size={15} />
                      {form.date ? "Choose an available time" : "Check appointment availability"}
                    </button>
                  </div>
                )}
                {showHandoffAction && !busy && (
                  <div className="mb-3">
                    <a href="https://wa.me/918130307036?text=Hi%20Kidsalonia%2C%20I%20would%20like%20to%20speak%20with%20the%20booking%20team."
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-800">
                      Talk with our team on WhatsApp
                    </a>
                  </div>
                )}
                <form onSubmit={(event) => { event.preventDefault(); void sendMessage(input); }} className="flex gap-2">
                  <input aria-label="Message the Kidsalonia virtual manager" value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask me anything…" className={inputClass} />
                  <button type="submit" disabled={!input.trim() || busy} aria-label="Send message" className="rounded-xl bg-pink-600 px-3 text-white disabled:opacity-50"><Send size={18}/></button>
                </form>
                <p className="mt-2 text-center text-[10px] text-slate-400">Automated assistant • No online payment</p>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto bg-white p-4">
              <button type="button" onClick={() => setView("chat")} className="mb-3 flex items-center gap-1 text-sm font-semibold text-pink-700"><ArrowLeft size={16} /> Back to chat</button>
              {reference ? (
                <div className="rounded-2xl bg-green-50 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                  <h3 className="mt-3 text-xl font-black">
                    {pendingApproval ? "Home visit request received!" : "Appointment booked!"}
                  </h3>
                  <p className="mt-2 text-sm">Reference: <b>{reference}</b></p>
                  <p className="mt-2 text-sm">
                    {pendingApproval
                      ? "Saved in the salon dashboard for the team to confirm availability and conveyance."
                      : "Your booking is now visible in the salon dashboard."}
                  </p>
                  <button type="button" onClick={() => setView("chat")} className="mt-5 rounded-xl bg-pink-600 px-4 py-3 font-bold text-white">Back to chat</button>
                </div>
              ) : (
                <form onSubmit={(event) => void submitBooking(event)} className="space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Book your visit ✨</h3>
                  <p className="text-xs text-slate-500">
                    {isMundan && form.mundanLocation === "Home"
                      ? "Request a home-visit slot. The salon must confirm travel and availability."
                      : "Choose a real available slot. Pay at the salon."}
                  </p>
                  <label className="block text-xs font-semibold text-slate-700">Service *
                    <select required className={inputClass} value={form.service} onChange={(event) => setField("service", event.target.value)}>
                      <option value="">Choose service</option>
                      {BOOKING_SERVICES.map((item) => <option key={item.slug} value={item.slug}>{item.name} ({item.duration} min)</option>)}
                    </select>
                  </label>
                  {service && <p className="text-xs font-bold text-pink-700">Stylist: {stylist} • {service.duration} minutes</p>}
                  <label className="block text-xs font-semibold text-slate-700">Date *
                    <input type="date" required min={getIndiaDate()} value={form.date} onChange={(event) => setField("date", event.target.value)} className={inputClass} />
                  </label>
                  {form.date && !hasValidDate(form.date) && <p className="text-xs text-red-600">Choose a valid future date. Tuesdays are closed.</p>}
                  <label className="block text-xs font-semibold text-slate-700">Available time *
                    <select required className={inputClass} value={form.time} onChange={(event) => setField("time", event.target.value)} disabled={!service || !form.date || slotLoading}>
                      <option value="">{slotLoading ? "Checking availability…" : "Choose available slot"}</option>
                      {availableSlots.map((time) => <option key={time} value={time}>{formatTime(time)}</option>)}
                    </select>
                  </label>
                  {form.date && !slotLoading && availableSlots.length === 0 && hasValidDate(form.date) && <p className="text-xs text-orange-700">No available slots found. Try another date.</p>}
                  <label className="block text-xs font-semibold text-slate-700">Parent / Contact name *
                    <input className={inputClass} required maxLength={80} value={form.parentName} onChange={(event) => setField("parentName", event.target.value)} placeholder="Your name" />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">Child / Customer name *
                    <input className={inputClass} required maxLength={80} value={form.customerName} onChange={(event) => setField("customerName", event.target.value)} placeholder="Name for appointment" />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">Mobile number *
                    <input className={inputClass} type="tel" required inputMode="numeric" maxLength={10} pattern="[6-9][0-9]{9}" value={form.phone} onChange={(event) => setField("phone", event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile" />
                  </label>
                  {isMundan && (
                    <>
                      <label className="block text-xs font-semibold text-slate-700">Mundan location *
                        <select required className={inputClass} value={form.mundanLocation} onChange={(event) => setField("mundanLocation", event.target.value)}>
                          <option value="">Choose location</option><option>Salon</option><option>Home</option>
                        </select>
                      </label>
                      {form.mundanLocation === "Home" && <label className="block text-xs font-semibold text-slate-700">Home address *
                        <textarea required rows={2} className={inputClass} maxLength={250} value={form.homeAddress} onChange={(event) => setField("homeAddress", event.target.value)} />
                      </label>}
                    </>
                  )}
                  {bookingError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{bookingError}</p>}
                  <button type="submit" disabled={bookingBusy || slotLoading || !availableSlots.includes(form.time)} className="w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3 font-extrabold text-white disabled:opacity-50">
                    {bookingBusy ? "Checking and saving…" :
                      isMundan && form.mundanLocation === "Home"
                        ? "Send Home Mundan Request"
                        : "Confirm booking in Salon AI"}
                  </button>
                  <p className="text-center text-xs text-slate-500">No payment collected online. Appointment confirmation follows after saving.</p>
                </form>
              )}
            </div>
          )}
          {view === "booking" && (
            <footer className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-2 text-[11px] text-slate-500">
              <a href={`tel:+91${SALON_PHONE}`} className="flex items-center gap-1 text-pink-700"><Phone size={12}/> Call salon</a>
              <Link to="/book" onClick={() => setOpen(false)} className="font-semibold text-pink-700">Full booking page</Link>
            </footer>
          )}
        </section>
      )}
      {!open && (
        <button type="button" aria-label="Chat with Kidsalonia Manager" onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 px-5 py-3.5 font-extrabold text-white shadow-[0_15px_40px_rgba(216,27,96,.3)] transition hover:scale-[1.03]">
          <MessageCircle size={23}/> <span>Chat with Manager</span>
        </button>
      )}
    </div>
  );
}
