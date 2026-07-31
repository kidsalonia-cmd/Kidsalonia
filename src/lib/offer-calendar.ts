export const OFFER_CALENDAR_START = "2026-08-01";
export const OFFER_CALENDAR_END = "2026-10-31";
export const REQUIRED_DISCOUNT_PERCENT = 15 as const;
export const BOOKING_LINK = "https://www.kidsalonia.com/book";

export const SUPPORTED_OFFER_SERVICES = [
  "Kids Haircut", "Adult Haircut", "Kids Hair Styling", "Adult Manicure",
  "Adult Pedicure", "Kids Manicure", "Kids Pedicure", "Adult Nail Art",
  "Kids Nail Art", "Parent-Child Combination", "Sibling Combination",
  "Grandparent-Child Combination", "Family Grooming Combination",
] as const;

export type OfferService = (typeof SUPPORTED_OFFER_SERVICES)[number];
export type OfferSource = "manual" | "Indian festival" | "national event" |
  "international event" | "weekday rotation" | "evergreen fallback";

export interface ManualOfferInput {
  id: string; date: string; title: string; description: string;
  includedServices: string[]; discountPercent: number; couponCode: string;
  enabled: boolean; override: boolean; websiteEnabled: boolean;
  googleBusinessEnabled: boolean; occasion?: string; imageBrief?: string;
}

export interface ScheduledEventOffer {
  id: string; date: string; occasion: string; title: string; description: string;
  includedServices: OfferService[]; couponCode: string;
  source: "Indian festival" | "national event" | "international event";
  priority: 2 | 3 | 4; imageBrief: string; referenceUrl: string;
}

export interface SelectedOffer {
  id: string; date: string; occasion: string; title: string; description: string;
  includedServices: OfferService[]; discountPercent: 15; couponCode: string;
  source: OfferSource; websiteEnabled: true; googleBusinessEnabled: true;
  imageBrief: string; referenceUrl?: string;
}

export interface ManualOfferValidation {
  valid: ManualOfferInput[]; alternatives: ManualOfferInput[]; errors: string[];
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const COUPON_RE = /^[A-Z0-9_-]{3,30}$/;
const supportedServices = new Set<string>(SUPPORTED_OFFER_SERVICES);

const isRealIsoDate = (value: string) => {
  if (!DATE_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};

export function validateManualOffers(entries: unknown): ManualOfferValidation {
  if (!Array.isArray(entries)) return { valid: [], alternatives: [], errors: ["Manual offers must be an array."] };
  const valid: ManualOfferInput[] = [], alternatives: ManualOfferInput[] = [], errors: string[] = [];
  const dates = new Set<string>(), coupons = new Set<string>();

  entries.forEach((raw, index) => {
    const entry = raw as Partial<ManualOfferInput>;
    const label = typeof entry?.id === "string" ? entry.id : `entry ${index + 1}`;
    const problems: string[] = [];
    if (!entry || typeof entry !== "object") problems.push("must be an object");
    if (typeof entry?.id !== "string" || !entry.id.trim()) problems.push("requires an id");
    if (typeof entry?.date !== "string" || !isRealIsoDate(entry.date)) problems.push("has an invalid ISO date");
    if (typeof entry?.title !== "string" || !entry.title.trim()) problems.push("requires a title");
    if (typeof entry?.description !== "string" || !entry.description.trim()) problems.push("requires a description");
    if (!Array.isArray(entry?.includedServices) || entry.includedServices.length === 0 || entry.includedServices.some((service) => !supportedServices.has(service))) problems.push("contains unsupported or missing services");
    if (entry?.discountPercent !== REQUIRED_DISCOUNT_PERCENT) problems.push("discountPercent must be exactly 15");
    if (typeof entry?.couponCode !== "string" || !COUPON_RE.test(entry.couponCode)) problems.push("has an invalid coupon code");
    if (typeof entry?.enabled !== "boolean" || typeof entry?.override !== "boolean" || typeof entry?.websiteEnabled !== "boolean" || typeof entry?.googleBusinessEnabled !== "boolean") problems.push("requires all four boolean flags");
    if (entry?.enabled && entry?.override && (!entry.websiteEnabled || !entry.googleBusinessEnabled)) problems.push("an enabled override must target both public channels");
    if (entry?.date && dates.has(entry.date)) problems.push("duplicates a manual-offer date");
    if (entry?.couponCode && coupons.has(entry.couponCode)) problems.push("duplicates a manual-offer coupon code");
    if (problems.length) { errors.push(`${label}: ${problems.join(", ")}.`); return; }
    dates.add(entry.date!); coupons.add(entry.couponCode!);
    const complete = entry as ManualOfferInput;
    if (complete.enabled && complete.override) valid.push(complete); else alternatives.push(complete);
  });
  return { valid, alternatives, errors };
}

const weekdays = [
  ["Family Fresh-Cut Day", ["Kids Haircut", "Adult Haircut", "Parent-Child Combination"]],
  ["Neat Nails Together", ["Kids Manicure", "Adult Manicure", "Parent-Child Combination"]],
  ["Kids Style Day", ["Kids Hair Styling", "Kids Nail Art", "Sibling Combination"]],
  ["Family Grooming Day", ["Kids Haircut", "Adult Pedicure", "Family Grooming Combination"]],
  ["Friday Family Refresh", ["Adult Haircut", "Kids Haircut", "Parent-Child Combination"]],
] as [string, OfferService[]][];
const weekends = [
  ["Saturday Family Style", ["Kids Hair Styling", "Adult Nail Art", "Family Grooming Combination"]],
  ["Sunday Sibling Grooming", ["Kids Haircut", "Kids Nail Art", "Sibling Combination"]],
] as [string, OfferService[]][];

function routineOffer(date: string): SelectedOffer {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  const isWeekend = day === 0 || day === 6;
  const [title, includedServices] = isWeekend ? weekends[day === 6 ? 0 : 1] : weekdays[day - 1];
  return {
    id: `${isWeekend ? "weekend" : "weekday"}-${date}`, date,
    occasion: isWeekend ? "Weekend family grooming" : "Daily family grooming",
    title, description: "Enjoy an easy family salon visit with age-appropriate grooming for children and adults.",
    includedServices, discountPercent: 15, couponCode: isWeekend ? "WEEKEND15" : "FAMILY15",
    source: "weekday rotation", websiteEnabled: true, googleBusinessEnabled: true,
    imageBrief: "A parent and children enjoying neat, age-appropriate grooming in a bright, hygienic family salon; candid, cheerful and no text.",
  };
}

function evergreenOffer(date: string): SelectedOffer {
  return {
    id: `evergreen-${date}`, date, occasion: "Family grooming", title: "Family Grooming Together",
    description: "Plan a relaxed family grooming visit with services for children and adults.",
    includedServices: ["Kids Haircut", "Adult Haircut", "Family Grooming Combination"],
    discountPercent: 15, couponCode: "FAMILY15", source: "evergreen fallback",
    websiteEnabled: true, googleBusinessEnabled: true,
    imageBrief: "A happy family after neat haircuts in a clean, colourful salon; warm natural photography and no text.",
  };
}

export function selectDailyOffer(date: string, events: ScheduledEventOffer[], manualEntries: unknown = []): SelectedOffer {
  if (!isRealIsoDate(date)) throw new Error(`Invalid offer date: ${date}`);
  const manual = validateManualOffers(manualEntries).valid.find((entry) => entry.date === date);
  if (manual) return {
    id: manual.id, date, occasion: manual.occasion || "Manual special offer", title: manual.title,
    description: manual.description, includedServices: manual.includedServices as OfferService[],
    discountPercent: 15, couponCode: manual.couponCode, source: "manual",
    websiteEnabled: true, googleBusinessEnabled: true,
    imageBrief: manual.imageBrief || "A cheerful family enjoying the listed services in a bright, hygienic children's salon; natural and family-friendly, with no text.",
  };
  const event = events.filter((entry) => entry.date === date).sort((a, b) => a.priority - b.priority)[0];
  if (event) return { ...event, discountPercent: 15, websiteEnabled: true, googleBusinessEnabled: true };
  return date >= OFFER_CALENDAR_START && date <= OFFER_CALENDAR_END ? routineOffer(date) : evergreenOffer(date);
}

export function getIndiaDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export interface GoogleBusinessPost {
  date: string; source: OfferSource; summary: string; bookingLink: string; terms: string; imageBrief: string;
}

export function createGoogleBusinessPost(offer: SelectedOffer): GoogleBusinessPost {
  const services = offer.includedServices.join(", ");
  const terms = `Valid only on ${offer.date}. Mention ${offer.couponCode} when booking. Subject to availability; cannot be combined with another offer.`;
  return {
    date: offer.date, source: offer.source,
    summary: `${offer.occasion} — ${offer.title}. Included services: ${services}. Get ${offer.discountPercent}% off with coupon ${offer.couponCode}. Valid ${offer.date}. Book: ${BOOKING_LINK}. ${terms}`,
    bookingLink: BOOKING_LINK, terms, imageBrief: offer.imageBrief,
  };
}
