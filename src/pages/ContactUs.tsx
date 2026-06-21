import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import contactBanner from "@/assets/contact-banner.jpg";
import contactBg from "@/assets/contact-bg.jpg";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast.success("Thank you! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", preferredDate: "", preferredTime: "", message: "" });
    } catch (err: any) {
      console.error('Contact form error:', err);
      toast.error("Something went wrong. Please try again or call us directly.");
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

      {/* Hero Banner */}
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

      {/* Contact Section */}
      <section id="contact" className="relative py-16 lg:py-24">
        <div className="absolute inset-0">
          <img
            src={contactBg}
            alt=""
            className="w-full h-full object-cover"
          />
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
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                      placeholder="Preferred Date"
                    />
                    <p className="text-xs text-muted-foreground mt-1 ml-1">Preferred Date</p>
                  </div>
                  <div>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="10:30 - 11:30">10:30 AM - 11:30 AM</option>
                      <option value="11:30 - 12:30">11:30 AM - 12:30 PM</option>
                      <option value="12:30 - 13:30">12:30 PM - 1:30 PM</option>
                      <option value="13:30 - 14:30">1:30 PM - 2:30 PM</option>
                      <option value="14:30 - 15:30">2:30 PM - 3:30 PM</option>
                      <option value="15:30 - 16:30">3:30 PM - 4:30 PM</option>
                      <option value="16:30 - 17:30">4:30 PM - 5:30 PM</option>
                      <option value="17:30 - 18:30">5:30 PM - 6:30 PM</option>
                      <option value="18:30 - 19:30">6:30 PM - 7:30 PM</option>
                      <option value="19:30 - 20:30">7:30 PM - 8:30 PM</option>
                      <option value="20:00 - 21:00">8:00 PM - 9:00 PM</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1 ml-1">Preferred Time</p>
                  </div>
                </div>
                <textarea
                  placeholder="Your Message"
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
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
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
