import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import contactBanner from "@/assets/contact-banner.jpg";
import contactBg from "@/assets/contact-bg.jpg";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const KIDSALONIA_AI_URL = "https://kidsalonia-ai.vercel.app";
const DEFAULT_STYLIST = "Any Available Artist";
const DEFAULT_SERVICE = "Salon Service";

const TIME_SLOTS = [
  { value: "10:30 - 11:30", label: "10:30 AM - 11:30 AM", weekendOnly: true },
  { value: "11:30 - 12:30", label: "11:30 AM - 12:30 PM" },
  { value: "12:30 - 13:30", label: "12:30 PM - 1:30 PM" },
  { value: "13:30 - 14:30", label: "1:30 PM - 2:30 PM" },
  { value: "14:30 - 15:30", label: "2:30 PM - 3:30 PM" },
  { value: "15:30 - 16:30", label: "3:30 PM - 4:30 PM" },
  { value: "16:30 - 17:30", label: "4:30 PM - 5:30 PM" },
  { value: "17:30 - 18:30", label: "5:30 PM - 6:30 PM" },
  { value: "18:30 - 19:30", label: "6:30 PM - 7:30 PM" },
  { value: "19:30 - 20:30", label: "7:30 PM - 8:30 PM" },
  { value: "20:00 - 21:00", label: "8:00 PM - 9:00 PM", weekendOnly: true },
];

const getLocalDay = (dateString: string) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
};

const isTuesday = (dateString: string) => getLocalDay(dateString) === 2;

const isWeekend = (dateString: string) => {
  const day = getLocalDay(dateString);
  return day === 0 || day === 6;
};

const getAvailableTimeSlots = (dateString: string) => {
  if (!dateString || isWeekend(dateString)) return TIME_SLOTS;
  return TIME_SLOTS.filter((slot) => !slot.weekendOnly);
};

const getStartTime = (timeSlot: string) => timeSlot.split("-")[0]?.trim() || "";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableTimeSlots = getAvailableTimeSlots(formData.preferredDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website) return;

    if (!formData.phone.trim() || !formData.preferredDate || !formData.preferredTime) {
      toast.error("Please enter your phone number, preferred date and time.");
      return;
    }

    if (isTuesday(formData.preferredDate)) {
      toast.error("We are closed on Tuesday. Please choose another date.");
      return;
    }

    if (!availableTimeSlots.some((slot) => slot.value === formData.preferredTime)) {
      toast.error("Please choose a time slot available for your selected date.");
      return;
    }

    setIsSubmitting(true);

    const appointmentTime = getStartTime(formData.preferredTime);

    try {
      const availabilityParams = new URLSearchParams({
        date: formData.preferredDate,
        time: appointmentTime,
        stylist: DEFAULT_STYLIST,
      });

      const availabilityResponse = await fetch(
        `${KIDSALONIA_AI_URL}/api/appointments/availability?${availabilityParams.toString()}`,
        {
          headers: { Accept: "application/json" },
          cache: "no-store",
        }
      );

      const availabilityResult = await availabilityResponse.json().catch(() => null);

      if (!availabilityResponse.ok || !availabilityResult?.available) {
        throw new Error(
          availabilityResult?.message ||
            "This appointment slot is no longer available. Please choose another time."
        );
      }

      const bookingResponse = await fetch(
        `${KIDSALONIA_AI_URL}/api/appointments/website-booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            parentName: formData.name.trim(),
            childName: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            service: DEFAULT_SERVICE,
            stylist: DEFAULT_STYLIST,
            date: formData.preferredDate,
            time: appointmentTime,
            notes: [
              `Requested slot: ${formData.preferredTime}`,
              formData.message.trim(),
            ]
              .filter(Boolean)
              .join("\n"),
          }),
        }
      );

      const bookingResult = await bookingResponse.json().catch(() => null);

      if (!bookingResponse.ok || !bookingResult?.success) {
        throw new Error(
          bookingResult?.message || "Unable to save your appointment. Please try again."
        );
      }

      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: { ...formData, website },
      });

      if (emailError) {
        console.error("Contact email notification failed:", emailError);
      }

      if (bookingResult?.whatsapp?.customerSent) {
        toast.success("Appointment booked! Confirmation has been sent on WhatsApp.");
      } else {
        toast.success("Appointment booked successfully. Our team will contact you shortly.");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
      setWebsite("");
    } catch (err) {
      console.error("Booking form error:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Contact Us | KidSalonia - Premium Kids Salon Gurugram"
        description="Get in touch with KidSalonia, Gurugram's premium kids salon. Book appointments, ask questions, or visit us at JMD Suburbio 2. Call +91 8130307036."
        canonical="https://www.kidsalonia.com/contact-us"
      />
      <Header />
      <SocialSidebar />

      <section className="relative w-full h-screen">
        <img
          src={contactBanner}
          alt="Contact KidSalonia - Premium Kids Salon in Gurugram"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <section id="contact" className="relative py-16 lg:py-24">
        <div className="absolute inset-0">
          <img src={contactBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/20 to-primary/20" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-black/45 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-10 drop-shadow-md">Contact info</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-lg mb-1 drop-shadow">Visit Us</h4>
                  <p className="text-white text-sm leading-relaxed drop-shadow">
                    Ground floor, A-19 JMD Suburbio 2,
                    <br />
                    Gurugram, Haryana
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 drop-shadow">Call Us</h4>
                  <a href="tel:8130307036" className="text-white text-sm hover:underline transition drop-shadow">
                    +918130307036
                  </a>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 drop-shadow">Email Us</h4>
                  <a href="mailto:sales@kidsalonia.com" className="text-white text-sm hover:underline transition drop-shadow">
                    sales@kidsalonia.com
                  </a>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 drop-shadow">Working Hours</h4>
                  <p className="text-white text-sm drop-shadow">Mon, Wed – Fri: 11:30 – 20:30</p>
                  <p className="text-white text-sm drop-shadow">Sat – Sun: 10:30 – 21:00</p>
                  <p className="text-white text-sm drop-shadow">Tuesday: Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">Your Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <label htmlFor="contact-name" className="sr-only">Your Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Parent Name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                  required
                />
                <label htmlFor="contact-email" className="sr-only">Your Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                  required
                />
                <label htmlFor="contact-phone" className="sr-only">Your Phone Number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="preferred-date" className="sr-only">Preferred Date</label>
                    <input
                      id="preferred-date"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value, preferredTime: "" })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1 ml-1">
                      {isTuesday(formData.preferredDate) ? "Tuesday is closed" : "Preferred Date"}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="preferred-time" className="sr-only">Preferred Time</label>
                    <select
                      id="preferred-time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground disabled:opacity-60"
                      disabled={isTuesday(formData.preferredDate)}
                      required
                    >
                      <option value="">Select Time Slot</option>
                      {availableTimeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1 ml-1">Preferred Time</p>
                  </div>
                </div>
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Service or message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.0386!3d28.5035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzEyLjYiTiA3N8KwMDInMTguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="KidSalonia Location - JMD Suburbio 2, Gurugram"
        />
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
