import type { ManualOfferInput } from "@/lib/offer-calendar";

/**
 * Local manual-offer provider.
 *
 * Add entries to this array using the shape below. The calendar consumes this
 * through a provider boundary, so this file can later be replaced by a
 * Supabase/admin fetch without changing the offer-selection rules.
 *
 * Example:
 * {
 *   id: "custom-2026-09-18",
 *   date: "2026-09-18",
 *   title: "Custom Family Friday Offer",
 *   description: "A family-friendly Friday grooming offer.",
 *   includedServices: ["Adult Pedicure", "Kids Nail Art"],
 *   discountPercent: 15,
 *   couponCode: "CUSTOM15",
 *   enabled: true,
 *   override: true,
 *   websiteEnabled: true,
 *   googleBusinessEnabled: true,
 * }
 */
export const manualOffers: ManualOfferInput[] = [];

export default manualOffers;
