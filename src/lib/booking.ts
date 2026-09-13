export type BookingService = {
  slug: string;
  name: string;
  duration: number;
};

export const BOOKING_SERVICES: BookingService[] = [
  { slug: "kids-haircut", name: "Kids Haircut", duration: 45 },
  { slug: "baby-first-haircut", name: "Baby First Haircut", duration: 45 },
  { slug: "boy-haircut", name: "Boy Haircut", duration: 45 },
  { slug: "girl-haircut", name: "Girl Haircut", duration: 60 },
  { slug: "adult-haircut", name: "Adult Haircut", duration: 45 },
  { slug: "mundan", name: "Mundan", duration: 60 },
  { slug: "hair-wash", name: "Hair Wash", duration: 30 },
  { slug: "hair-styling", name: "Hair Styling", duration: 60 },
  { slug: "hair-spa", name: "Hair Spa", duration: 60 },
  { slug: "lice-treatment", name: "Lice Treatment", duration: 90 },
  { slug: "kids-nail-art", name: "Kids Nail Art", duration: 45 },
  { slug: "adult-nail-art", name: "Adult Nail Art", duration: 60 },
  { slug: "kids-manicure", name: "Kids Manicure", duration: 45 },
  { slug: "adult-manicure", name: "Adult Manicure", duration: 60 },
  { slug: "kids-pedicure", name: "Kids Pedicure", duration: 45 },
  { slug: "adult-pedicure", name: "Adult Pedicure", duration: 60 },
  { slug: "gel-polish", name: "Gel Polish", duration: 45 },
  { slug: "beauty-service", name: "Beauty Service", duration: 60 },
  { slug: "facial", name: "Facial", duration: 60 },
  { slug: "cleanup", name: "Cleanup", duration: 45 },
  { slug: "other-service", name: "Other Service", duration: 30 },
];

const SERVICE_ALIASES: Record<string, string> = {
  "kids haircut": "kids-haircut", haircut: "kids-haircut",
  "baby first haircut": "baby-first-haircut", "toddler haircut": "kids-haircut",
  "boys haircut": "boy-haircut", "boy haircut": "boy-haircut",
  "girls haircut": "girl-haircut", "girl haircut": "girl-haircut",
  "adult haircut": "adult-haircut", mundan: "mundan", "head shave": "mundan",
  "hair wash": "hair-wash", "hair styling": "hair-styling", "kids hair styling": "hair-styling",
  "hair spa": "hair-spa", "lice treatment": "lice-treatment",
  "nail art": "kids-nail-art", "kids nail art": "kids-nail-art", "adult nail art": "adult-nail-art",
  manicure: "kids-manicure", "kids manicure": "kids-manicure", "adult manicure": "adult-manicure",
  pedicure: "kids-pedicure", "kids pedicure": "kids-pedicure", "adult pedicure": "adult-pedicure",
  "gel polish": "gel-polish", "beauty service": "beauty-service", facial: "facial", cleanup: "cleanup",
  "other service": "other-service",
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
  ["10:30", "10:30 AM", "weekend"], ["11:30", "11:30 AM", "all"],
  ["12:30", "12:30 PM", "all"], ["13:30", "1:30 PM", "all"],
  ["14:30", "2:30 PM", "all"], ["15:30", "3:30 PM", "all"],
  ["16:30", "4:30 PM", "all"], ["17:30", "5:30 PM", "all"],
  ["18:30", "6:30 PM", "all"], ["19:30", "7:30 PM", "all"],
  ["20:00", "8:00 PM", "weekend"],
] as const;

export const getSlotsForDate = (date: string) => BOOKING_SLOTS.filter(([, , schedule]) => schedule === "all" || isWeekend(date));
export const getIndiaDate = (date = new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
export const isPastSlot = (date: string, time: string, now = new Date()) => new Date(`${date}T${time}:00+05:30`).getTime() <= now.getTime();
export const isValidPhone = (phone: string) => { const digits = phone.replace(/\D/g, ""); const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits; return /^[6-9]\d{9}$/.test(local); };
export const isValidEmail = (email: string) => !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
