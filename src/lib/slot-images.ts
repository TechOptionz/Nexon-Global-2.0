/**
 * Photo mapping for each <ImageSlot> placeholder.
 *
 * Maps art-direction placeholder strings directly to high-resolution,
 * theme-curated photography saved in `/images/`.
 *
 * If a slot has a matching key here, `ImageSlot` will render the photograph.
 * If no key matches (or if an image is removed), it falls back cleanly to the
 * sand art-direction placeholder tile.
 */
export const SLOT_IMAGES: Record<string, string> = {
  // --- Flagship Destinations ---
  // Portugal Golden Visa
  "Lisbon / Porto skyline": "/images/destinations/lisbon-street.jpg",
  "Lisbon tram street": "/images/destinations/lisbon-street.jpg",
  "family on a Lisbon street": "/images/destinations/lisbon-street.jpg",
  "Porto riverside at golden hour": "/images/destinations/lisbon-street.jpg",
  "Lisbon coastline": "/images/destinations/lisbon-street.jpg",

  // Greece Golden Visa
  "Athens rooftops": "/images/destinations/athens-acropolis.jpg",
  "Athens rooftops and the Acropolis": "/images/destinations/athens-acropolis.jpg",
  "Santorini at golden hour": "/images/destinations/santorini-sunset.jpg",
  "family on a Greek island street": "/images/destinations/santorini-sunset.jpg",

  // Malta Permanent Residence
  "Valletta harbour": "/images/destinations/valletta-harbour.jpg",
  "Valletta harbour and city walls": "/images/destinations/valletta-harbour.jpg",
  "family on a Valletta street": "/images/destinations/valletta-harbour.jpg",
  "Gozo coastline": "/images/destinations/valletta-harbour.jpg",

  // Cyprus Permanent Residency
  "Limassol seafront": "/images/destinations/limassol-seafront.jpg",
  "Limassol seafront at dusk": "/images/destinations/limassol-seafront.jpg",
  "Cyprus coastline near Ayia Napa": "/images/destinations/limassol-seafront.jpg",
  "couple in Paphos old town": "/images/destinations/limassol-seafront.jpg",

  // UAE Golden Visa & Business
  "Dubai skyline at dusk": "/images/destinations/dubai-skyline.jpg",
  "family at Dubai Marina": "/images/destinations/dubai-skyline.jpg",
  "Abu Dhabi corniche": "/images/destinations/dubai-skyline.jpg",

  // Caribbean Citizenship by Investment (Grenada, St Kitts & Nevis, Antigua & Barbuda)
  "Caribbean harbour": "/images/destinations/caribbean-harbour.jpg",
  "St George’s harbour": "/images/destinations/caribbean-harbour.jpg",
  "Grenada coastline": "/images/destinations/caribbean-harbour.jpg",
  "Grenada coastline and Grand Anse beach": "/images/destinations/caribbean-harbour.jpg",
  "Grenada spice plantation": "/images/destinations/caribbean-harbour.jpg",
  "St Kitts harbour": "/images/destinations/caribbean-harbour.jpg",
  "St Kitts harbour and Brimstone Hill": "/images/destinations/caribbean-harbour.jpg",
  "Nevis beach at sunset": "/images/destinations/caribbean-harbour.jpg",
  "Basseterre waterfront": "/images/destinations/caribbean-harbour.jpg",
  "Antigua beach": "/images/destinations/caribbean-harbour.jpg",
  "Antigua beach and turquoise water": "/images/destinations/caribbean-harbour.jpg",
  "family at Nelson’s Dockyard": "/images/destinations/caribbean-harbour.jpg",
  "Shirley Heights lookout": "/images/destinations/caribbean-harbour.jpg",

  // Turkiye Citizenship
  "Istanbul skyline": "/images/destinations/istanbul-bosphorus.jpg",
  "Istanbul skyline over the Bosphorus": "/images/destinations/istanbul-bosphorus.jpg",
  "family in Istanbul’s old city": "/images/destinations/istanbul-bosphorus.jpg",
  "Bodrum coastline": "/images/destinations/istanbul-bosphorus.jpg",

  // Canada Express Entry & Skilled Migration
  "Toronto waterfront": "/images/destinations/toronto-waterfront.jpg",
  "Toronto waterfront skyline": "/images/destinations/toronto-waterfront.jpg",
  "Vancouver harbour and mountains": "/images/destinations/toronto-waterfront.jpg",

  // Australia Skilled Migration
  "Sydney harbour": "/images/destinations/sydney-harbour.jpg",
  "Sydney harbour and Opera House": "/images/destinations/sydney-harbour.jpg",
  "Great Ocean Road": "/images/destinations/sydney-harbour.jpg",

  // United States EB-5 & Global Mobility
  "New York street": "/images/destinations/newyork-street.jpg",
  "New York street at dusk": "/images/destinations/newyork-street.jpg",
  "San Francisco bay": "/images/destinations/newyork-street.jpg",
  "family in a US suburb": "/images/destinations/newyork-street.jpg",

  // --- Lifestyle, Global Family & Relocation Moments ---
  "family embracing at arrivals": "/images/lifestyle/family-arrivals.jpg",
  "traveller with passport at the gate": "/images/lifestyle/traveller-gate.jpg",
  "reading at a departure gate": "/images/lifestyle/traveller-gate.jpg",
  "family holding new passports at an airport": "/images/lifestyle/family-arrivals.jpg",
  "parent carrying a child outdoors": "/images/lifestyle/family-arrivals.jpg",
  "three generations at home": "/images/lifestyle/family-arrivals.jpg",
  "photo collage — families travelling": "/images/lifestyle/family-arrivals.jpg",

  // --- Hero Imagery & Media ---
  "hero video — nature / travel": "/assets/slot-hero-band.webp",
};

/**
 * Resolves an image URL for a given placeholder caption.
 */
export function getSlotImage(placeholder: string, explicitSrc?: string): string | undefined {
  if (explicitSrc) return explicitSrc;
  return SLOT_IMAGES[placeholder.trim()];
}
