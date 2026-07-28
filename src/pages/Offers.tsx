import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, Copy, Gift, MessageCircle, Scissors, Sparkles } from "lucide-react";
import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { BASE_URL, createBreadcrumbSchema } from "@/components/SEO";
import { COUPON_CODE } from "@/components/ConversionActions";

const OFFER_MESSAGE =
  "Hi KidSalonia, I want to claim 15% off on eligible weekday services using coupon KIDS15. I understand that Mundan is excluded. Please share the available timings.";

const WHATSAPP_OFFER_URL = `https://wa.me/918130307036?text=${encodeURIComponent(OFFER_MESSAGE)}`;

const Offers = () => {
  const [copied, setCopied] = useState(false);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <SEO
        title="Kids Salon Offers in Gurgaon | KidSalonia"
        description="View current KidSalonia offers and save 15% on eligible weekday kids salon services in Gurgaon. Coupon KIDS15. Mundan excluded."
        canonical={`${BASE_URL}/offers`}
        schemas={[
          createBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "Offers", url: `${BASE_URL}/offers` },
          ]),
        ]}
      />

      <Header />
      <SocialSidebar />

      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <section className="relative overflow-hidden bg-gradient-to-r from-fuchsia-700 via-pink-600 to-orange-500 px-5 py-20 text-white sm:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <span className="absolute left-[8%] top-[18%] text-4xl">✨</span>
            <span className="absolute right-[10%] top-[20%] text-5xl">🎈</span>
            <span className="absolute bottom-[15%] left-[18%] text-4xl">⭐</span>
            <span className="absolute bottom-[12%] right-[20%] text-4xl">🌈</span>
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-black uppercase tracking-widest backdrop-blur">
              <Gift size={18} /> KidSalonia Specials
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">
              Current Offers for Happy Kids
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
              Discover our latest salon offers and book a joyful, safe and child-friendly grooming experience.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="overflow-hidden rounded-[2rem] border border-pink-200 bg-white shadow-2xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                    Weekday Offer
                  </span>
                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-800">
                    Monday–Friday
                  </span>
                </div>

                <h2 className="mt-6 text-4xl font-black text-slate-950 sm:text-5xl">
                  Get 15% OFF
                </h2>
                <p className="mt-3 text-xl font-extrabold text-primary">
                  On eligible kids salon services
                </p>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Use coupon <strong>{COUPON_CODE}</strong> when booking eligible weekday services such as haircuts, nail art and grooming. Mundan services are excluded.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Kids haircuts",
                    "Nail art services",
                    "Kids grooming",
                    "Selected salon services",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 font-bold text-slate-700">
                      <CheckCircle2 size={19} className="shrink-0 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={copyCoupon}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-4 font-black text-primary transition hover:bg-primary hover:text-white"
                  >
                    <Copy size={19} /> {copied ? "Coupon Copied" : `Copy ${COUPON_CODE}`}
                  </button>
                  <a
                    href={WHATSAPP_OFFER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-1"
                  >
                    <MessageCircle size={20} /> Claim on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 p-7 text-white sm:p-10 lg:p-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-4xl shadow-xl">🎁</div>
                <h3 className="mt-6 text-center text-3xl font-black">How to Claim</h3>
                <div className="mt-7 space-y-4">
                  <div className="flex gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <Scissors className="shrink-0 text-yellow-300" />
                    <p><strong>Choose</strong> an eligible weekday salon service.</p>
                  </div>
                  <div className="flex gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <CalendarDays className="shrink-0 text-yellow-300" />
                    <p><strong>Book</strong> your appointment from Monday to Friday.</p>
                  </div>
                  <div className="flex gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <Sparkles className="shrink-0 text-yellow-300" />
                    <p><strong>Share</strong> coupon {COUPON_CODE} while confirming your booking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg sm:p-10">
            <h2 className="text-3xl font-black text-slate-950">Ready to Book Your Child’s Visit?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Reserve a convenient weekday slot and mention coupon {COUPON_CODE} while confirming your appointment.
            </p>
            <Link
              to="/contact-us"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-black text-primary-foreground shadow-lg transition hover:-translate-y-1"
            >
              <CalendarDays size={20} /> Book Appointment
            </Link>
            <p className="mt-5 text-xs text-slate-500">
              Offer valid Monday to Friday until 9:00 PM. Mundan excluded. Terms and conditions may apply.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Offers;
