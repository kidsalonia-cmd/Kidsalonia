import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Facebook,
  Gift,
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
  const homeAnchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const primaryItems = [
    { label: "About Us", href: "/about-us" },
    { label: "Price List", href: homeAnchor("price-list") },
    { label: "Offers", href: "/offers" },
    { label: "Gallery", href: homeAnchor("gallery") },
    { label: "Social Media", href: homeAnchor("social-media") },
    { label: "Insights", href: "/insights" },
    { label: "Find Us", href: homeAnchor("find-us") },
  ];

  const serviceItems = [
    { label: "Hair", href: "/hair" },
    { label: "Skin", href: "/skin" },
    { label: "Nails", href: "/nails" },
    { label: "Mundan", href: "/mundan" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const renderNavLink = (item: { label: string; href: string }, mobile = false) => {
    const classes = mobile
      ? "block text-lg font-semibold text-foreground transition hover:text-primary"
      : `text-[15px] font-semibold transition hover:text-primary ${location.pathname === item.href ? "text-primary" : "text-foreground"}`;

    if (item.href.startsWith("/") && !item.href.startsWith("/#")) {
      return <Link key={item.label} to={item.href} className={classes} onClick={mobile ? closeMobileMenu : undefined}>{item.label}</Link>;
    }
    return <a key={item.label} href={item.href} className={classes} onClick={mobile ? closeMobileMenu : undefined}>{item.label}</a>;
  };

  return (
    <header className="ks-header-depth sticky top-0 z-50 w-full bg-background">
      {!isFranchisePage && (
        <div className="relative hidden overflow-hidden bg-gradient-to-r from-fuchsia-600 via-pink-500 to-sky-500 text-white lg:block">
          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-black tracking-wide"><Sparkles size={17} /> Make Your Child Smile Today!</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 text-[11px] font-semibold text-white/90"><span className="inline-flex items-center gap-1"><Star size={13} fill="currentColor" /> 1500+ Happy Kids</span><span className="inline-flex items-center gap-1"><ShieldCheck size={13} /> Safe &amp; Hygienic</span><span>✂️ Haircuts</span><span>💅 Nail Art</span><span>🎀 Fun Experience</span></div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link to="/offers" className="ks-button-3d inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-fuchsia-700 px-4 py-2 text-sm font-extrabold"><Gift size={17} /> Offers</Link>
              <Link to="/book" className="ks-button-3d inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-emerald-500 px-4 py-2 text-sm font-extrabold"><MessageCircle size={17} /> Book Now</Link>
              <a href={`tel:${PHONE_NUMBER}`} className="ks-button-3d inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-orange-500 px-4 py-2 text-sm font-extrabold"><Phone size={17} /> Call</a>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
        <Link to="/" onClick={closeMobileMenu}><img src={logo} alt="KidSalonia" className="h-14 w-auto sm:h-16 lg:h-16" /></Link>
        <Link to="/" className="text-2xl font-extrabold leading-none tracking-tight sm:text-3xl lg:text-[42px]" onClick={closeMobileMenu}><span className="text-primary">Kid</span><span className="text-[hsl(30,100%,50%)]">S</span><span className="text-[hsl(200,100%,50%)]">a</span><span className="text-[hsl(120,70%,45%)]">l</span><span className="text-[hsl(30,100%,50%)]">o</span><span className="text-[hsl(270,70%,55%)]">n</span><span className="text-[hsl(200,100%,50%)]">i</span><span className="text-[hsl(120,70%,45%)]">a</span></Link>
        <div className="hidden items-center gap-3 lg:flex"><a href="https://www.instagram.com/kidsalonia" target="_blank" rel="noopener noreferrer" className="ks-raised-icon text-foreground/60 hover:text-primary" aria-label="Instagram"><Instagram size={20} /></a><a href="https://www.facebook.com/766831683190165" target="_blank" rel="noopener noreferrer" className="ks-raised-icon text-foreground/60 hover:text-primary" aria-label="Facebook"><Facebook size={20} /></a><Link to="/franchise" className="rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary">Franchise</Link><Link to="/book" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">Book Now</Link></div>
        <button type="button" className="p-2 lg:hidden" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Menu">{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>

      <nav className="hidden items-center justify-center gap-7 border-t border-border/30 py-3 lg:flex">
        {renderNavLink(primaryItems[0])}
        <div className="group relative">
          <button type="button" className="inline-flex items-center gap-1 text-[15px] font-semibold text-foreground transition hover:text-primary">Services <ChevronDown size={16} /></button>
          <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-2xl border bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
            {serviceItems.map((item) => <Link key={item.label} to={item.href} className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-pink-50 hover:text-primary">{item.label}</Link>)}
          </div>
        </div>
        {primaryItems.slice(1).map((item) => renderNavLink(item))}
      </nav>

      {!isFranchisePage && <div className="grid grid-cols-3 border-t border-white/20 lg:hidden"><Link to="/offers" className="flex items-center justify-center gap-2 bg-fuchsia-600 py-3 text-xs font-extrabold text-white"><Gift size={16} /> Offers</Link><Link to="/book" className="flex items-center justify-center gap-2 bg-emerald-500 py-3 text-xs font-extrabold text-white"><MessageCircle size={16} /> Book</Link><a href={`tel:${PHONE_NUMBER}`} className="flex items-center justify-center gap-2 bg-orange-500 py-3 text-xs font-extrabold text-white"><Phone size={16} /> Call</a></div>}

      {mobileMenuOpen && (
        <nav className="ks-mobile-layer max-h-[75vh] space-y-4 overflow-y-auto border-t border-border bg-background px-6 py-5 lg:hidden">
          {renderNavLink(primaryItems[0], true)}
          <div><p className="mb-2 text-xs font-black uppercase tracking-[0.15em] text-primary">Services</p><div className="grid grid-cols-2 gap-2">{serviceItems.map((item) => <Link key={item.label} to={item.href} onClick={closeMobileMenu} className="rounded-xl bg-pink-50 px-3 py-2.5 font-bold text-slate-700">{item.label}</Link>)}</div></div>
          {primaryItems.slice(1).map((item) => renderNavLink(item, true))}
          <Link to="/franchise" className="block w-full rounded-full border border-primary px-6 py-3 text-center font-semibold text-primary" onClick={closeMobileMenu}>Get Franchise</Link>
          <Link to="/book" className="block w-full rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground" onClick={closeMobileMenu}>Book Now</Link>
        </nav>
      )}
    </header>
  );
};

export { WHATSAPP_URL };
export default Header;
