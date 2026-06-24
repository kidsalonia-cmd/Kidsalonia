import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/Logo2.webp";
import { Menu, X, Instagram, Facebook } from "lucide-react";


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

  return (
    <header className="w-full bg-background sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 lg:px-16 py-3">
        <Link to="/">
          <img
            src={logo}
            alt="KidSalonia"
            className="h-16 lg:h-20 w-auto"
          />
        </Link>

        <div className="flex-1 flex justify-center">
          <Link to="/" className="text-3xl lg:text-[48px] font-extrabold tracking-tight leading-none">
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

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://www.instagram.com/kidsalonia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors"
            aria-label="Follow KidSalonia on Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/766831683190165"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors"
            aria-label="Follow KidSalonia on Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://wa.me/918130307036"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground font-bold px-7 py-2.5 rounded-full text-sm hover:opacity-90 transition"
          >
            Book Now
          </a>


        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:flex justify-center gap-12 py-3 border-t border-border/30">
        {navItems.map((item) =>
          item.href.startsWith("/") && !item.href.startsWith("/#") ? (
            <Link
              key={item.label}
              to={item.href}
              className="text-foreground font-medium hover:text-primary transition text-base"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="text-foreground font-medium hover:text-primary transition text-base"
            >
              {item.label}
            </a>
          )
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-border px-6 py-4 space-y-4">
          {navItems.map((item) =>
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.label}
                to={item.href}
                className="block text-foreground font-semibold hover:text-primary transition text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block text-foreground font-semibold hover:text-primary transition text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="https://wa.me/918130307036"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full text-base text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Now
          </a>


        </nav>
      )}
    </header>
  );
};

export default Header;
