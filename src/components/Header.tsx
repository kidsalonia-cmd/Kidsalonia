import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import logo from "@/assets/Logo2.webp";

const PHONE_NUMBER = "+918130307036";
const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent(
  "Hi KidSalonia! I would like to reserve a slot for my child. Please share the available timings.",
)}`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isFranchisePage = location.pathname === "/franchise";

  const navItems = [
    { label: "About Us", href: "/about-us" },
    { label: "Hair", href: "/hair" },
    { label: "Skin", href: "/skin" },
    { label: "Nails", href: "/nails" },
    { label: "Insights", href: "/insights" },
    { label: "Gallery", href: isHome ? "#gallery" : "/#gallery" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      {!isFranchisePage && (
        <div className="relative hidden overflow-hidden bg-gradient-to-r from-fuchsia-600 via-pink-500 to-sky-500 text-white lg:block">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <span className="absolute left-[4%] top-2 text-lg">⭐</span>
            <span className="absolute left-[14%] bottom-1 text-base">🎈</span>
            <span className="absolute left-[27%] top-1 text-sm">✨</span>
            <span className="absolute right-[22%] bottom-1 text-base">🫧</span>
            <span className="absolute right-[8%] top-1 text-lg">🌈</span>
          </div>

          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-black tracking-wide">
                <Sparkles size={17} className="shrink-0" />
                Make Your Child Smile Today!
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-white/90">
                <span className="inline-flex items-center gap-1">
                  <Star size={13} fill="currentColor" /> 1500+ Happy Kids
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck size={13} /> Safe &amp; Hygienic
                </span>
                <span>✂️ Haircuts</span>
                <span>💅 Nail Art</span>
                <span>🎀 Fun Experience</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-emerald-500 px-5 py-2.5 text-sm font-extrabold shadow-[0_5px_0_rgba(5,120,87,0.45)] transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_7px_0_rgba(5,120,87,0.4)] active:translate-y-0 active:shadow-none"
              >
                <MessageCircle size={18} className="transition group-hover:rotate-6" />
                Reserve My Kid&apos;s Slot
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-orange-500 px-5 py-2.5 text-sm font-extrabold shadow-[0_5px_0_rgba(194,65,12,0.45)] transition hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-[0_7px_0_rgba(194,65,12,0.4)] active:translate-y-0 active:shadow-none"
              >
                <Phone size={18} className="transition group-hover:-rotate-12" />
                Call to Reserve
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-16">
        <Link to="/" onClick={closeMobileMenu}>
          <img
            src={logo}
            alt="KidSalonia"
            className="h-14 w-auto sm:h-16 lg:h-20"
          />
        </Link>

        <div className="flex flex-1 justify-center">
          <Link
            to="/"
            className="text-2xl font-extrabold leading-none tracking-tight sm:text-3xl lg:text-[48px]"
            onClick={closeMobileMenu}
          >
            <span className="text-primary">Kid</span>
            <span className="text-[hsl(30,100%,50%)]">S</span>
            <span className="text-[hsl(200,100%,50%)]">a</span>
            <span className="text-[hsl(120,70%,45%)]">l</span>
            <span className="text-[hsl(30,100%,50%)]">o</span>
            <span className="text-[hsl(270,70%,55%)]">n</span>
            <span className="text-[hsl(200,100%,50%)]">i</span>
            <span className="text-[hsl(120,70%,45%)]">a</span>
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://www.instagram.com/kidsalonia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 transition-colors hover:text-primary"
            aria-label="Follow KidSalonia on Instagram"
          >
            <Instagram size={20} />
          </a>

          <a
            href="https://www.facebook.com/766831683190165"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 transition-colors hover:text-primary"
            aria-label="Follow KidSalonia on Facebook"
          >
            <Facebook size={20} />
          </a>

          <Link
            to="/franchise"
            className="rounded-full border border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Get Franchise
          </Link>

          <Link
            to="/contact-us"
            className="rounded-full bg-primary px-7 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="p-2 lg:hidden"
          onClick={() => setMobileMenuOpen((current) => !current)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav className="hidden justify-center gap-12 border-t border-border/30 py-3 lg:flex">
        {navItems.map((item) =>
          item.href.startsWith("/") && !item.href.startsWith("/#") ? (
            <Link
              key={item.label}
              to={item.href}
              className="text-base font-medium text-foreground transition hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="text-base font-medium text-foreground transition hover:text-primary"
            >
              {item.label}
            </a>
          ),
        )}
      </nav>

      {!isFranchisePage && (
        <div className="grid grid-cols-2 overflow-hidden border-t border-white/20 lg:hidden">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-500 py-3 text-center text-xs font-extrabold text-white"
          >
            <MessageCircle size={16} /> Reserve Slot
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-2 bg-orange-500 py-3 text-center text-xs font-extrabold text-white"
          >
            <Phone size={16} /> Call Now
          </a>
        </div>
      )}

      {mobileMenuOpen && (
        <nav className="space-y-4 border-t border-border bg-background px-6 py-5 lg:hidden">
          {navItems.map((item) =>
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.label}
                to={item.href}
                className="block text-lg font-semibold text-foreground transition hover:text-primary"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block text-lg font-semibold text-foreground transition hover:text-primary"
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ),
          )}

          <Link
            to="/franchise"
            className="block w-full rounded-full border border-primary px-6 py-3 text-center text-base font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            onClick={closeMobileMenu}
          >
            Get Franchise
          </Link>

          <Link
            to="/contact-us"
            className="block w-full rounded-full bg-primary px-6 py-3 text-center text-base font-semibold text-primary-foreground"
            onClick={closeMobileMenu}
          >
            Book Now
          </Link>

          <div className="flex items-center justify-center gap-6 border-t border-border/50 pt-4">
            <a
              href="https://www.instagram.com/kidsalonia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 transition-colors hover:text-primary"
              aria-label="Follow KidSalonia on Instagram"
            >
              <Instagram size={22} />
            </a>

            <a
              href="https://www.facebook.com/766831683190165"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 transition-colors hover:text-primary"
              aria-label="Follow KidSalonia on Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
