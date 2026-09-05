/**
 * Photo mapping for each <ImageSlot> placeholder.
 *
 * Maps art-direction placeholder strings directly to high-resolution,
 * theme-curated photography saved in `/images/`.
 *
 * Destination photography is places and architecture only — no people. The
 * few remaining people photographs are the general lifestyle slots, which
 * are not tied to a destination.
 *
 * One subject, one photograph: no two different places share a file. Where
 * two keys do point at the same image they are the same subject worded two
 * ways (a card caption and its longer hero caption), which is why a
 * destination’s four slots still yield four distinct pictures.
 *
 * If a slot has a matching key here, `ImageSlot` will render the photograph.
 * If no key matches (or if an image is removed), it falls back cleanly to the
 * sand art-direction placeholder tile.
 */
export const SLOT_IMAGES: Record<string, string> = {
  // Portugal — Golden Visa
  "Lisbon / Porto skyline": "/images/destinations/lisbon-street.jpg",
  "Lisbon tram street": "/images/destinations/lisbon-street.jpg",
  "Pena Palace at Sintra": "/images/destinations/sintra-palace.jpg",
  "Porto riverside at golden hour": "/images/destinations/porto-riverside.jpg",
  "Lisbon coastline": "/images/destinations/lisbon-coastline.jpg",

  // Greece — Golden Visa
  "Athens rooftops": "/images/destinations/athens-acropolis.jpg",
  "Athens rooftops and the Acropolis": "/images/destinations/athens-acropolis.jpg",
  "Santorini at golden hour": "/images/destinations/santorini-sunset.jpg",
  "whitewashed alley on a Greek island": "/images/destinations/greek-island-alley.jpg",

  // Malta — Permanent Residence
  "Valletta harbour": "/images/destinations/valletta-harbour.jpg",
  "Valletta harbour and city walls": "/images/destinations/valletta-harbour.jpg",
  "Valletta street with wooden balconies": "/images/destinations/valletta-street.jpg",
  "Gozo coastline": "/images/destinations/gozo-coastline.jpg",

  // Cyprus — Permanent Residency
  "Limassol seafront": "/images/destinations/limassol-seafront.jpg",
  "Limassol seafront at dusk": "/images/destinations/limassol-seafront.jpg",
  "Cyprus coastline near Ayia Napa": "/images/destinations/ayia-napa-coast.jpg",
  "Paphos harbour and castle": "/images/destinations/paphos-oldtown.jpg",

  // UAE — Golden Visa and business
  "Dubai skyline at dusk": "/images/destinations/dubai-skyline.jpg",
  "Dubai Marina at dusk": "/images/destinations/dubai-marina.jpg",
  "Abu Dhabi corniche": "/images/destinations/abudhabi-corniche.jpg",

  // Grenada — Citizenship by Investment
  "Grenada coastline": "/images/destinations/grenada-grand-anse.jpg",
  "Grenada coastline and Grand Anse beach": "/images/destinations/grenada-grand-anse.jpg",
  "St George’s harbour": "/images/destinations/grenada-st-georges.jpg",
  "Grenada spice plantation": "/images/destinations/grenada-spice.jpg",

  // St Kitts & Nevis — Citizenship by Investment
  "St Kitts harbour": "/images/destinations/stkitts-harbour.jpg",
  "St Kitts harbour and Brimstone Hill": "/images/destinations/stkitts-brimstone.jpg",
  "Nevis beach at sunset": "/images/destinations/nevis-beach.jpg",
  "Basseterre waterfront": "/images/destinations/basseterre-waterfront.jpg",

  // Antigua & Barbuda — Citizenship by Investment
  "Antigua beach": "/images/destinations/antigua-beach.jpg",
  "Antigua beach and turquoise water": "/images/destinations/antigua-beach.jpg",
  "Nelson’s Dockyard": "/images/destinations/nelsons-dockyard.jpg",
  "Shirley Heights lookout": "/images/destinations/shirley-heights.jpg",

  // Türkiye — Citizenship
  "Istanbul skyline": "/images/destinations/istanbul-bosphorus.jpg",
  "Istanbul skyline over the Bosphorus": "/images/destinations/istanbul-bosphorus.jpg",
  "a street in Istanbul’s old city": "/images/destinations/istanbul-oldcity.jpg",
  "Bodrum coastline": "/images/destinations/bodrum-coastline.jpg",

  // Canada — Express Entry and skilled migration
  "Toronto waterfront": "/images/destinations/toronto-waterfront.jpg",
  "Toronto waterfront skyline": "/images/destinations/toronto-waterfront.jpg",
  "Vancouver harbour and mountains": "/images/destinations/vancouver-harbour.jpg",
  "Old Montréal cobblestone street": "/images/destinations/montreal-oldtown.jpg",

  // Australia — skilled migration
  "Sydney harbour": "/images/destinations/sydney-harbour.jpg",
  "Sydney harbour and Opera House": "/images/destinations/sydney-harbour.jpg",
  "Great Ocean Road": "/images/destinations/great-ocean-road.jpg",
  "Melbourne laneway": "/images/destinations/melbourne-laneway.jpg",

  // United States — EB-5 and global mobility
  "New York street": "/images/destinations/newyork-street.jpg",
  "New York street at dusk": "/images/destinations/newyork-street.jpg",
  "San Francisco bay": "/images/destinations/sanfrancisco-bay.jpg",
  "American suburban street": "/images/destinations/us-suburb.jpg",

  // Lifestyle, family and relocation moments
  "family embracing at arrivals": "/images/lifestyle/family-arrivals.jpg",
  "family holding new passports at an airport": "/images/lifestyle/family-arrivals.jpg",
  "parent carrying a child outdoors": "/images/lifestyle/family-arrivals.jpg",
  "three generations at home": "/images/lifestyle/family-arrivals.jpg",
  "photo collage — families travelling": "/images/lifestyle/family-arrivals.jpg",
  "traveller with passport at the gate": "/images/lifestyle/traveller-gate.jpg",
  "reading at a departure gate": "/images/lifestyle/traveller-gate.jpg",
  "Caribbean harbour": "/images/destinations/caribbean-harbour.jpg",

  // Hero media
  "hero video — nature / travel": "/assets/slot-hero-band.webp",
};

/**
 * Resolves an image URL for a given placeholder caption.
 */
export function getSlotImage(placeholder: string, explicitSrc?: string): string | undefined {
  if (explicitSrc) return explicitSrc;
  return SLOT_IMAGES[placeholder.trim()];
}
