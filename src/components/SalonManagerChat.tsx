import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X, Send, CalendarDays, ArrowLeft, Phone, CheckCircle2 } from "lucide-react";
import { BOOKING_SERVICES, getIndiaDate, getSlotsForDate, isPastSlot, isTuesday, isValidPhone } from "@/lib/booking";

const API = "https://ai.kidsalonia.com";
const SALON_PHONE = "8130307036";
const WELCOME = "Hello! 👋 I'm Kidsalonia's virtual manager. Ask about haircuts, mundan, nail services, salon timings or prices. I can also book your appointment directly.";
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

const inputClass = "w-full rounded-xl border border-pink-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100";

export default function SalonManagerChat() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "booking">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingError, setBookingError] = useState("");
  const [reference, setReference] = useState("");
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

  async function sendMessage(text: string) {
    if (!text.trim() || busy) return;
    const trimmed = text.trim().slice(0, 500);
    const history = messages.slice(-6);
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch(`${API}/api/customer-manager/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await response.json();
      const reply = data?.reply || "I can help with appointments, services and directions. Please try again.";
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        text: "I'm having trouble connecting. You can still book here, or call us at +91 81303 07036.",
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
      setMessages((current) => [...current, {
        role: "assistant",
        text: `✅ Booking saved! Reference: ${data.appointmentId}. ${service.name} with ${stylist} on ${form.date} at ${formatTime(form.time)}. Payment is at the salon. ${data.whatsapp?.customerSent ? "A WhatsApp confirmation was sent." : "WhatsApp confirmation is pending."}`,
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
              <div><h2 className="text-base font-extrabold text-white">Kidsalonia Manager</h2><p className="text-xs text-white/85">AI virtual assistant • Online</p></div>
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
                <div className="mb-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => { setView("booking"); setReference(""); }} className="rounded-full bg-pink-600 px-3 py-2 text-xs font-bold text-white"><CalendarDays size={13} className="mr-1 inline"/>Book Appointment</button>
                  <button type="button" onClick={() => void sendMessage("What services and prices do you offer?")} className="rounded-full bg-pink-50 px-3 py-2 text-xs font-bold text-pink-700">Services & Prices</button>
                  <button type="button" onClick={() => void sendMessage("Where is the salon located?")} className="rounded-full bg-pink-50 px-3 py-2 text-xs font-bold text-pink-700">Location</button>
                </div>
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
                  <h3 className="mt-3 text-xl font-black">Appointment booked!</h3>
                  <p className="mt-2 text-sm">Reference: <b>{reference}</b></p>
                  <p className="mt-2 text-sm">Your booking is now visible in the salon dashboard.</p>
                  <button type="button" onClick={() => setView("chat")} className="mt-5 rounded-xl bg-pink-600 px-4 py-3 font-bold text-white">Back to chat</button>
                </div>
              ) : (
                <form onSubmit={(event) => void submitBooking(event)} className="space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Book your visit ✨</h3>
                  <p className="text-xs text-slate-500">Choose a real available slot. Pay at the salon.</p>
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
                    {bookingBusy ? "Checking and saving…" : "Confirm booking in Salon AI"}
                  </button>
                  <p className="text-center text-xs text-slate-500">No payment collected online. Appointment confirmation follows after saving.</p>
                </form>
              )}
            </div>
          )}
          <footer className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-2 text-[11px] text-slate-500">
            <a href={`tel:+91${SALON_PHONE}`} className="flex items-center gap-1 text-pink-700"><Phone size={12}/> Call salon</a>
            <Link to="/book" onClick={() => setOpen(false)} className="font-semibold text-pink-700">Full booking page</Link>
          </footer>
        </section>
      )}
      <button type="button" aria-label={open ? "Close Kidsalonia chat" : "Chat with Kidsalonia Manager"} onClick={() => setOpen((current) => !current)} className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 px-5 py-3.5 font-extrabold text-white shadow-[0_15px_40px_rgba(216,27,96,.3)] transition hover:scale-[1.03]">
        {open ? <X size={22}/> : <MessageCircle size={23}/>} <span>{open ? "Close Chat" : "Chat with Manager"}</span>
      </button>
    </div>
  );
}
