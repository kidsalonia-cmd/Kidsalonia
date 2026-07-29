export type BookingService = {
  slug: string;
  name: string;
  duration: number;
};

export const BOOKING_SERVICES: BookingService[] = [
  { slug: "kids-haircut", name: "Kids Haircut", duration: 45 },
  { slug: "baby-first-haircut", name: "Baby First Haircut", duration: 45 },
  { slug: "toddler-haircut", name: "Toddler Haircut", duration: 45 },
  { slug: "boys-haircut", name: "Boys Haircut", duration: 45 },
  { slug: "girls-haircut", name: "Girls Haircut", duration: 60 },
  { slug: "kids-hair-styling", name: "Kids Hair Styling", duration: 60 },
  { slug: "mundan", name: "Mundan / Head Shave", duration: 60 },
  { slug: "nail-art", name: "Kids Nail Art", duration: 45 },
  { slug: "manicure", name: "Kids Manicure", duration: 45 },
  { slug: "pedicure", name: "Kids Pedicure", duration: 45 },
  { slug: "party-makeup", name: "Kids Party Makeup", duration: 60 },
];

const SERVICE_ALIASES: Record<string, string> = {
  "kids haircut": "kids-haircut",
  "kids haircut gurgaon": "kids-haircut",
  haircut: "kids-haircut",
  hairdresser: "kids-haircut",
  "baby first haircut": "baby-first-haircut",
  "toddler haircut": "toddler-haircut",
  "boys haircut": "boys-haircut",
  "girls haircut": "girls-haircut",
  "kids hair styling": "kids-hair-styling",
  "hair styling": "kids-hair-styling",
  "party hair styling": "kids-hair-styling",
  mundan: "mundan",
  "mundan ceremony": "mundan",
  "baby mundan": "mundan",
  "traditional mundan": "mundan",
  "hygienic mundan": "mundan",
  "head shave": "mundan",
  "nail art": "nail-art",
  "kids nail art": "nail-art",
  manicure: "manicure",
  "kids manicure": "manicure",
  "spa manicure": "manicure",
  pedicure: "pedicure",
  "kids pedicure": "pedicure",
  "spa pedicure": "pedicure",
  "crystal jelly pedicure": "pedicure",
  "party makeup": "party-makeup",
  "kids party makeup": "party-makeup",
};

const normalizeService = (value: string) =>
  value.trim().toLowerCase().replace(/[_/]+/g, " ").replace(/\s+/g, " ");

export const getBookingServiceSlug = (service?: string | null) => {
  if (!service) return null;
  const normalized = normalizeService(service);
  const direct = BOOKING_SERVICES.find((item) => item.slug === service || normalizeService(item.name) === normalized);
  return direct?.slug ?? SERVICE_ALIASES[normalized] ?? null;
};

export const getBookingPath = (service?: string | null) => {
  const slug = getBookingServiceSlug(service);
  return slug ? `/book?service=${slug}` : "/book";
};

export const getLocalDay = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
};

export const isTuesday = (date: string) => Boolean(date) && getLocalDay(date) === 2;
export const isWeekend = (date: string) => Boolean(date) && [0, 6].includes(getLocalDay(date));

export const BOOKING_SLOTS = [
  ["10:30", "10:30 AM", "weekend"],
  ["11:30", "11:30 AM", "all"],
  ["12:30", "12:30 PM", "all"],
  ["13:30", "1:30 PM", "all"],
  ["14:30", "2:30 PM", "all"],
  ["15:30", "3:30 PM", "all"],
  ["16:30", "4:30 PM", "all"],
  ["17:30", "5:30 PM", "all"],
  ["18:30", "6:30 PM", "all"],
  ["19:30", "7:30 PM", "all"],
  ["20:00", "8:00 PM", "weekend"],
] as const;

export const getSlotsForDate = (date: string) =>
  BOOKING_SLOTS.filter(([, , schedule]) => schedule === "all" || isWeekend(date));

export const getIndiaDate = (date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

export const isPastSlot = (date: string, time: string, now = new Date()) =>
  new Date(`${date}T${time}:00+05:30`).getTime() <= now.getTime();

export const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local);
};

export const isValidEmail = (email: string) =>
  !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
