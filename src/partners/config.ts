import type { PartnerConfiguration, PartnerProvider } from "./types";

const pending = { enabled: false, availability: "unavailable", approval: "pending" } as const;
export const providers: readonly PartnerProvider[] = [
  { id: "booking", name: "Booking.com", categories: ["accommodation"], actions: ["accommodation"], ...pending },
  { id: "viator", name: "Viator", categories: ["experiences"], actions: ["tours"], ...pending },
  { id: "tripadvisor", name: "Tripadvisor", categories: ["reviews"], actions: ["reviews"], ...pending },
  { id: "getyourguide", name: "GetYourGuide", categories: ["experiences"], actions: ["tours"], ...pending },
  // Ordinary Maps URLs, not an affiliate relationship or API approval.
  { id: "google-maps", name: "Google Maps", categories: ["navigation"], actions: ["directions"], enabled: true, availability: "available", approval: "approved" },
];
export const partnerConfiguration: PartnerConfiguration = {
  providers,
  destinations: [],
  attractions: [],
  allowDevelopmentExamples: false,
};
export const MAPS_URL_DOCUMENTATION = "https://developers.google.com/maps/documentation/urls/guide";
