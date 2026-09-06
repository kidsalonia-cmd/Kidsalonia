import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowRight, Building2, Coffee, LockKeyhole, Scissors, ShieldCheck, Users } from "lucide-react";

const BUSINESS_LOGIN_URL = "https://ai.kidsalonia.com/select-business";

const BusinessLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <SEO
        title="Business Login | KidSalonia"
        description="Secure business access for KidSalonia and Cafe Honeyman owners, managers and franchise partners."
        canonical="https://www.kidsalonia.com/business-login"
        noIndex
      />
      <Header />

      <main className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-2xl shadow-pink-100/60">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-600 via-pink-500 to-purple-700 p-8 text-white sm:p-12 lg:p-14">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                  <Building2 size={17} /> Unified Business Platform
                </div>
                <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight sm:text-5xl">
                  One secure login for your business operations.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
                  Owners, managers and franchise partners can access the correct KidSalonia or Cafe Honeyman dashboard from one place.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="flex items-center gap-3"><Scissors size={21} /><span className="font-black">KidSalonia</span></div>
                    <p className="mt-2 text-sm text-white/75">Salon operations, appointments, CRM, POS, reviews and growth.</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="flex items-center gap-3"><Coffee size={21} /><span className="font-black">Cafe Honeyman</span></div>
                    <p className="mt-2 text-sm text-white/75">Cafe operations, menu, orders, inventory and marketing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center p-7 sm:p-10 lg:p-12">
              <div className="w-full">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-pink-500">Business Access</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">Choose your business before login</h2>
                <p className="mt-4 leading-7 text-slate-600">
                  Continue to the KidSalonia AI Business OS, select the business you want to manage, then sign in with your authorized account.
                </p>

                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-pink-50 p-4 text-slate-700"><Users className="text-pink-600" size={20} /><span className="font-bold">Owner · Manager · Franchise Manager · Franchise Owner</span></div>
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-slate-700"><ShieldCheck className="text-emerald-600" size={20} /><span className="font-bold">Role-based and location-based secure access</span></div>
                  <div className="flex items-center gap-3 rounded-2xl bg-purple-50 p-4 text-slate-700"><LockKeyhole className="text-purple-600" size={20} /><span className="font-bold">Protected business dashboard</span></div>
                </div>

                <a
                  href={BUSINESS_LOGIN_URL}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Continue to Business Login <ArrowRight size={20} />
                </a>

                <p className="mt-4 text-center text-xs font-semibold text-slate-400">
                  Authorized business users only
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessLogin;
