import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackLeadAction(eventName: string, params: Record<string, string>) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const clickable = target?.closest("a,button") as HTMLAnchorElement | HTMLButtonElement | null;
  if (!clickable) return;

  const label = (clickable.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
  const href = clickable instanceof HTMLAnchorElement ? clickable.href : "";
  const normalized = `${label} ${href}`.toLowerCase();

  if (href.startsWith("tel:")) {
    trackLeadAction("click_call", { link_url: href, link_text: label || "Call" });
    return;
  }

  if (normalized.includes("whatsapp") || href.includes("wa.me") || href.includes("api.whatsapp.com")) {
    trackLeadAction("click_whatsapp", { link_url: href, link_text: label || "WhatsApp" });
    return;
  }

  if (normalized.includes("book now") || normalized.includes("book appointment") || normalized.includes("appointment")) {
    trackLeadAction("click_booking", { link_url: href, link_text: label || "Booking" });
    return;
  }

  if (normalized.includes("direction") || normalized.includes("find us") || href.includes("maps.google")) {
    trackLeadAction("click_directions", { link_url: href, link_text: label || "Directions" });
    return;
  }

  if (normalized.includes("offer")) {
    trackLeadAction("click_offer", { link_url: href, link_text: label || "Offer" });
  }
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
