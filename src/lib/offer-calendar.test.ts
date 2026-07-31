import { eventOffers2026 } from "@/data/event-offers-2026";
import {
  createGoogleBusinessPost,
  OFFER_CALENDAR_END,
  OFFER_CALENDAR_START,
  selectDailyOffer,
  SUPPORTED_OFFER_SERVICES,
  validateManualOffers,
  type ManualOfferInput,
} from "@/lib/offer-calendar";

const manual = (changes: Partial<ManualOfferInput> = {}): ManualOfferInput => ({
  id: "custom-2026-09-18",
  date: "2026-09-18",
  title: "Custom Family Friday Offer",
  description: "A custom family offer.",
  includedServices: ["Adult Pedicure", "Kids Nail Art"],
  discountPercent: 15,
  couponCode: "CUSTOM15",
  enabled: true,
  override: true,
  websiteEnabled: true,
  googleBusinessEnabled: true,
  ...changes,
});

describe("international offer calendar", () => {
  it("covers every date from 1 August through 31 October with one 15% offer", () => {
    const current = new Date(`${OFFER_CALENDAR_START}T00:00:00Z`);
    const end = new Date(`${OFFER_CALENDAR_END}T00:00:00Z`);
    const dates = new Set<string>();
    while (current <= end) {
      const date = current.toISOString().slice(0, 10);
      const offer = selectDailyOffer(date, eventOffers2026);
      expect(dates.has(offer.date)).toBe(false);
      expect(offer.discountPercent).toBe(15);
      expect(offer.websiteEnabled).toBe(true);
      expect(offer.googleBusinessEnabled).toBe(true);
      expect(offer.includedServices.every((service) => SUPPORTED_OFFER_SERVICES.includes(service))).toBe(true);
      dates.add(offer.date);
      current.setUTCDate(current.getUTCDate() + 1);
    }
    expect(dates.size).toBe(92);
  });

  it("uses an enabled manual override ahead of a festival", () => {
    const offer = selectDailyOffer("2026-08-28", eventOffers2026, [manual({ date: "2026-08-28" })]);
    expect(offer.source).toBe("manual");
    expect(offer.title).toBe("Custom Family Friday Offer");
  });

  it("stores a non-override as an alternative without publishing it", () => {
    const entry = manual({ override: false });
    const validation = validateManualOffers([entry]);
    expect(validation.alternatives).toEqual([entry]);
    expect(selectDailyOffer(entry.date, eventOffers2026, [entry]).source).toBe("weekday rotation");
  });

  it("rejects duplicates, unsupported services and discounts other than 15 safely", () => {
    const entries = [
      manual(),
      manual({ id: "duplicate", couponCode: "OTHER15" }),
      manual({ id: "bad-service", date: "2026-09-19", couponCode: "BADONE", includedServices: ["Facial"] }),
      manual({ id: "bad-discount", date: "2026-09-20", couponCode: "BADTWO", discountPercent: 20 }),
    ];
    const result = validateManualOffers(entries);
    expect(result.valid).toHaveLength(1);
    expect(result.errors).toHaveLength(3);
    expect(() => selectDailyOffer("2026-09-19", eventOffers2026, entries)).not.toThrow();
  });

  it("applies festival precedence and creates the same complete GMB offer", () => {
    const selected = selectDailyOffer("2026-10-20", eventOffers2026);
    expect(selected.source).toBe("Indian festival");
    expect(selected.occasion).toContain("Dussehra");
    const post = createGoogleBusinessPost(selected);
    expect(post.source).toBe(selected.source);
    expect(post.summary).toContain(selected.title);
    expect(post.summary).toContain(selected.includedServices.join(", "));
    expect(post.summary).toContain("15% off");
    expect(post.summary).toContain(selected.couponCode);
    expect(post.summary).toContain(selected.date);
    expect(post.summary).toContain(post.bookingLink);
    expect(post.imageBrief).toBe(selected.imageBrief);
  });

  it("publishes the local festival rather than a same-day international candidate", () => {
    const candidates = eventOffers2026.filter((event) => event.date === "2026-10-11");
    expect(candidates).toHaveLength(2);
    const selected = selectDailyOffer("2026-10-11", eventOffers2026);
    expect(selected.occasion).toBe("Navratri");
    expect(selected.source).toBe("Indian festival");
  });
});
