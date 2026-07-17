import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Menu, X } from "lucide-react";

import logo from "@/assets/Logo2.webp";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

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
    <header className="sticky top-0 z-50 w-full bg-background shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-16">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu}>
          <img
            src={logo}
            alt="KidSalonia"
            className="h-14 w-auto sm:h-16 lg:h-20"
          />
        </Link>

        {/* Brand Name */}
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

        {/* Desktop Actions */}
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
            className="rounded-full bg-primary px-7 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Desktop Navigation */}
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

      {/* Mobile Menu */}
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