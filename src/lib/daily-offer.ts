import { eventOffers2026 } from "@/data/event-offers-2026";
import { manualOffers } from "@/data/manual-offers";
import { createGoogleBusinessPost, getIndiaDate, selectDailyOffer } from "@/lib/offer-calendar";

// Provider boundary: replace manualOffers with Supabase/admin data when ready.
export const getSelectedDailyOffer = (date = getIndiaDate()) => selectDailyOffer(date, eventOffers2026, manualOffers);
export const getSelectedGoogleBusinessPost = (date = getIndiaDate()) => createGoogleBusinessPost(getSelectedDailyOffer(date));
