import type { IconName } from "@/components/Icons";

export type DestinationType = "Residency" | "Citizenship" | "Skilled";

/** The card summary used everywhere a destination is listed. */
export type DestinationSummary = {
  slug: string;
  name: string;
  type: DestinationType;
  amount: string;
  note: string;
  photo: string;
  href: string;
  /** Longer note used on the Destinations index card only. */
  indexNote?: string;
  /** Call-to-action label on the index card. */
  cta?: string;
};

export type RouteGroup = {
  title: string;
  subtitle: string;
  a: { title: string; note: string; amount: string };
  b: { title: string; note: string; amount: string };
};

export type Destination = DestinationSummary & {
  tag: string;
  title: string;
  short: string;
  intro: string;
  photoHero: string;
  photoSmall: string;
  photoWhy: string;
  stats: [string, string][];
  routesTitle: string;
  routesNote: string;
  amountLabel: string;
  included: string[];
  groups: RouteGroup[];
  eligibility: string[];
  why: string;
  benefits: [IconName, string][];
  faq: string;
  testimonial: string;
  related: string[];
  /** Portugal's hero heading is set one step larger on its artboard. */
  heroSize?: number;
};

const RBI = "Residency by investment";
const CBI = "Citizenship by investment";
const SK = "Skilled migration";

const INV = "Minimum qualifying amount";
const QI = "Qualifying investments";
const QR = "Qualifying routes";

const NOTE = (c: string) =>
  `Routes and minimums per current ${c} regulations; confirmed in writing at consultation.`;

const INCL_INV = [
  "Qualifying-investment selection and verification",
  "Residency-card processing and renewals",
  "Path-to-citizenship planning where available",
  "Tax-residency coordination with your advisors",
];

const INCL_CBI = [
  "Program comparison across all authorised CBI jurisdictions",
  "Family inclusion strategy — spouse, children, parents",
  "Pre-submission due-diligence screening",
  "Passport issuance and renewal support",
];

const INCL_SK = [
  "Points assessment and score-improvement plan",
  "Credential recognition and language-test guidance",
  "Family sponsorship and dependent visas",
  "Job-search and settlement orientation",
];

export const DESTINATIONS: Record<string, Destination> = {
  portugal: {
    slug: "portugal",
    href: "/destinations/portugal",
    name: "Portugal",
    type: "Residency",
    amount: "From €250,000",
    note: "6–8 months · 7 days/yr stay",
    indexNote: "6–8 months · 7 days/yr stay · citizenship after 5 yrs",
    cta: "View program",
    photo: "Lisbon / Porto skyline",
    heroSize: 104,
    tag: RBI,
    title: "Portugal Golden Visa",
    short: "Portugal",
    intro:
      "European residency with one week a year in-country, and one of the clearest paths to an EU passport.",
    photoHero: "Lisbon / Porto skyline",
    photoSmall: "Pena Palace at Sintra",
    photoWhy: "Porto riverside at golden hour",
    stats: [
      ["Minimum investment", "€250,000"],
      ["Time to residency", "6–8 months"],
      ["Stay requirement", "7 days / year"],
      ["Citizenship eligibility", "After 5 years"],
    ],
    routesTitle: QI,
    routesNote: NOTE("Portuguese"),
    amountLabel: INV,
    included: INCL_INV,
    groups: [
      {
        title: "Fund & research routes",
        subtitle: "Investment fund subscription · Research contribution",
        a: {
          title: "Investment fund subscription",
          note: "CMVM-regulated venture or private-equity funds",
          amount: "€250,000+",
        },
        b: {
          title: "Research contribution",
          note: "Accredited scientific or technological institutions",
          amount: "€500,000",
        },
      },
      {
        title: "Donation & business routes",
        subtitle: "Cultural & heritage donation · Company & job creation",
        a: {
          title: "Cultural & heritage donation",
          note: "Approved national heritage projects",
          amount: "€250,000",
        },
        b: {
          title: "Company & job creation",
          note: "Portuguese company creating 10+ jobs",
          amount: "Varies",
        },
      },
    ],
    eligibility: [
      "Non-EU / EEA / Swiss nationals aged 18 or over",
      "Clean criminal record in Portugal and country of residence",
      "Funds of lawful, documented origin",
      "Ability to maintain the investment for at least five years",
    ],
    why: "The Golden Visa grants residency to investors and their families with a physical-presence requirement of just seven days a year. After five years of legal residency, applicants may apply for permanent residency or citizenship — keeping their original nationality.",
    benefits: [
      ["globe", "Live, work and study anywhere in Portugal; travel the Schengen Area visa-free"],
      ["heart", "Include your spouse, dependent children and dependent parents in one application"],
      ["briefcase", "No requirement to relocate — keep your business and tax base where they are"],
      ["passport", "Path to permanent residency or citizenship after five years"],
      ["building", "Access to Portuguese healthcare and education systems"],
    ],
    faq: "portugal",
    testimonial: "portugal",
    related: ["greece", "cyprus", "malta"],
  },

  greece: {
    slug: "greece",
    href: "/destinations/greece",
    name: "Greece",
    type: "Residency",
    amount: "From €250,000",
    note: "3–4 months · no stay requirement",
    cta: "Enquire",
    photo: "Athens rooftops",
    tag: RBI,
    title: "Greece Golden Visa",
    short: "Greece",
    intro:
      "A five-year renewable residence permit through property, with no minimum stay and Schengen travel for the whole family.",
    photoHero: "Athens rooftops and the Acropolis",
    photoSmall: "whitewashed alley on a Greek island",
    photoWhy: "Santorini at golden hour",
    stats: [
      ["Minimum investment", "€250,000"],
      ["Time to residency", "3–4 months"],
      ["Stay requirement", "None"],
      ["Citizenship eligibility", "After 7 years"],
    ],
    routesTitle: QI,
    routesNote: NOTE("Greek"),
    amountLabel: INV,
    included: INCL_INV,
    groups: [
      {
        title: "Real-estate routes",
        subtitle: "Prime zones · Rest of Greece",
        a: {
          title: "Prime zones",
          note: "Attica, Thessaloniki, Mykonos, Santorini and islands with over 3,100 residents · one property of at least 120 m²",
          amount: "€800,000",
        },
        b: {
          title: "Rest of Greece",
          note: "All other regions · one property of at least 120 m²",
          amount: "€400,000",
        },
      },
      {
        title: "Reduced-threshold routes",
        subtitle: "Commercial conversion · Listed-building restoration",
        a: {
          title: "Commercial-to-residential conversion",
          note: "Conversion completed before the permit application · any location in Greece",
          amount: "€250,000",
        },
        b: {
          title: "Listed-building restoration",
          note: "Full restoration of a protected heritage property · any location in Greece",
          amount: "€250,000",
        },
      },
    ],
    eligibility: [
      "Non-EU / EEA nationals aged 18 or over",
      "Clean criminal record",
      "Property purchased with funds transferred from abroad",
      "Private health insurance covering Greece",
      "Short-term letting of the qualifying property is not permitted",
    ],
    why: "Greece grants a five-year residence permit to property investors and their families, renewable for as long as the investment is held. There is no minimum stay, and the permit allows visa-free travel across the Schengen Area.",
    benefits: [
      ["clock", "No minimum stay to keep the permit"],
      ["heart", "Include your spouse, children under 21 and the parents of both spouses"],
      ["globe", "Visa-free travel throughout the Schengen Area"],
      ["building", "A property route in a market still priced below Western European averages"],
      ["shield", "Permit renewable every five years while the property is held"],
    ],
    faq: "residency",
    testimonial: "europe",
    related: ["cyprus", "malta", "portugal"],
  },

  cyprus: {
    slug: "cyprus",
    href: "/destinations/cyprus",
    name: "Cyprus",
    type: "Residency",
    amount: "From €300,000",
    note: "3–4 months · permanent residency",
    cta: "Enquire",
    photo: "Limassol seafront",
    tag: RBI,
    title: "Cyprus Permanent Residency",
    short: "Cyprus",
    intro:
      "Permanent residence in an EU member state within months, through a €300,000 property or business investment.",
    photoHero: "Limassol seafront at dusk",
    photoSmall: "Paphos harbour and castle",
    photoWhy: "Cyprus coastline near Ayia Napa",
    stats: [
      ["Minimum investment", "€300,000"],
      ["Time to residency", "3–4 months"],
      ["Stay requirement", "Visit every 2 years"],
      ["Status granted", "Permanent residence"],
    ],
    routesTitle: QI,
    routesNote: NOTE("Cypriot"),
    amountLabel: INV,
    included: INCL_INV,
    groups: [
      {
        title: "Property routes",
        subtitle: "New residential property · Commercial property",
        a: {
          title: "New residential property",
          note: "Up to two new residential units bought from a developer on first sale · plus VAT",
          amount: "€300,000",
        },
        b: {
          title: "Commercial property",
          note: "Offices, shops, hotels or mixed-use developments · new or resale",
          amount: "€300,000",
        },
      },
      {
        title: "Business & fund routes",
        subtitle: "Cypriot company shares · Investment funds",
        a: {
          title: "Cypriot company shares",
          note: "Company with a physical presence in Cyprus employing at least five people",
          amount: "€300,000",
        },
        b: {
          title: "Investment funds",
          note: "Units in a Cyprus-registered AIF, AIFLNP or RAIF",
          amount: "€300,000",
        },
      },
    ],
    eligibility: [
      "Non-EU nationals with a clean criminal record",
      "Secure annual income from abroad of at least €50,000, plus €15,000 for a spouse and €10,000 per child",
      "Investment funds transferred from abroad",
      "Visit Cyprus at least once every two years",
      "Investment and income maintained for as long as the permit is held",
    ],
    why: "Cyprus grants permanent residence to investors and their families through a fast-track procedure, typically within a few months. The permit has no expiry, no stay requirement beyond a visit every two years, and a path to naturalisation for those who choose to relocate.",
    benefits: [
      ["shield", "Permanent residence with no renewal cycle"],
      ["heart", "Spouse and dependent children up to 25 included"],
      ["clock", "Fast-track processing, typically within a few months"],
      ["briefcase", "English-speaking, common-law business environment"],
      ["passport", "Naturalisation available after years of actual residence for those who relocate"],
    ],
    faq: "residency",
    testimonial: "europe",
    related: ["greece", "malta", "portugal"],
  },

  malta: {
    slug: "malta",
    href: "/destinations/malta",
    name: "Malta",
    type: "Residency",
    amount: "From €150,000",
    note: "6–8 months · EU permanent residence",
    cta: "Enquire",
    photo: "Valletta harbour",
    tag: RBI,
    title: "Malta Permanent Residence",
    short: "Malta",
    intro:
      "EU permanent residence for up to four generations of your family, with no minimum stay and a fixed, published cost structure.",
    photoHero: "Valletta harbour and city walls",
    photoSmall: "Valletta street with wooden balconies",
    photoWhy: "Gozo coastline",
    stats: [
      ["Indicative total cost", "From €150,000"],
      ["Time to residency", "6–8 months"],
      ["Stay requirement", "None"],
      ["Status granted", "Permanent residence"],
    ],
    routesTitle: "Programme requirements",
    routesNote:
      "Figures per the Malta Permanent Residence Programme regulations; confirmed in writing at consultation.",
    amountLabel: "Minimum qualifying amount",
    included: INCL_INV,
    groups: [
      {
        title: "Property options",
        subtitle: "Purchase · Rent",
        a: {
          title: "Purchase a property",
          note: "Anywhere in Malta or Gozo · held for a minimum of five years",
          amount: "€375,000",
        },
        b: {
          title: "Rent a property",
          note: "Minimum annual rent · held for a minimum of five years",
          amount: "€14,000 / yr",
        },
      },
      {
        title: "Government contribution & fees",
        subtitle: "Contribution when buying · Contribution when renting",
        a: {
          title: "Contribution when buying",
          note: "Non-refundable contribution · plus €50,000 administration fee and €2,000 donation to a registered NGO",
          amount: "€37,000",
        },
        b: {
          title: "Contribution when renting",
          note: "Non-refundable contribution · plus €50,000 administration fee and €2,000 donation to a registered NGO",
          amount: "€60,000",
        },
      },
    ],
    eligibility: [
      "Non-EU / EEA / Swiss nationals aged 18 or over",
      "Capital of at least €500,000, of which €150,000 in financial assets (or €650,000 with €75,000 financial)",
      "Clean criminal record and a stable, regular income",
      "Health insurance covering Malta",
      "Property and contribution held for a minimum of five years",
    ],
    why: "The Malta Permanent Residence Programme grants EU permanent residence to investors and up to four generations of their family, with no minimum stay. Costs are fixed and published, and applications are processed by a dedicated government agency.",
    benefits: [
      ["shield", "Permanent residence certificate valid for life while conditions are met"],
      ["heart", "Spouse, children, parents and grandparents in one application"],
      ["clock", "No minimum stay requirement"],
      ["globe", "Visa-free travel throughout the Schengen Area"],
      ["briefcase", "English is an official language; EU and Commonwealth member"],
    ],
    faq: "residency",
    testimonial: "europe",
    related: ["portugal", "greece", "cyprus"],
  },

  uae: {
    slug: "uae",
    href: "/destinations/uae",
    name: "UAE Golden Visa",
    type: "Residency",
    amount: "From AED 2,000,000",
    note: "2–4 weeks · 10-year renewable visa",
    cta: "Enquire",
    photo: "Dubai skyline at dusk",
    tag: RBI,
    title: "UAE Golden Visa",
    short: "the UAE",
    intro:
      "A ten-year, self-sponsored UAE residence for investors, entrepreneurs and specialists — usually approved within weeks.",
    photoHero: "Dubai skyline at dusk",
    photoSmall: "Dubai Marina at dusk",
    photoWhy: "Abu Dhabi corniche",
    stats: [
      ["Minimum investment", "AED 2,000,000"],
      ["Time to approval", "2–4 weeks"],
      ["Stay requirement", "None"],
      ["Visa validity", "10 years, renewable"],
    ],
    routesTitle: "Qualifying categories",
    routesNote:
      "Thresholds per current UAE federal regulations; confirmed in writing at consultation.",
    amountLabel: "Qualifying threshold",
    included: [
      "Category selection and document checklist",
      "Property registration or fund-deposit verification",
      "Medical, Emirates ID and family-sponsorship processing",
      "Renewal and dependent-visa management",
    ],
    groups: [
      {
        title: "Investor routes",
        subtitle: "Real estate · Public investment",
        a: {
          title: "Real-estate investor",
          note: "One or more properties worth at least AED 2 million, including off-plan from approved developers · mortgage permitted",
          amount: "AED 2,000,000",
        },
        b: {
          title: "Public investment",
          note: "Deposit in an accredited UAE investment fund, or company capital of at least AED 2 million",
          amount: "AED 2,000,000",
        },
      },
      {
        title: "Talent & business routes",
        subtitle: "Entrepreneurs · Specialists & professionals",
        a: {
          title: "Entrepreneurs",
          note: "Owner of an approved startup or project, with an approval letter from a recognised incubator or authority",
          amount: "Approval-based",
        },
        b: {
          title: "Specialists & professionals",
          note: "Accredited degree, valid employment contract and a monthly salary of at least AED 30,000",
          amount: "AED 30,000 / mo",
        },
      },
    ],
    eligibility: [
      "Any nationality; apply from inside or outside the UAE",
      "Investment or qualification fully documented — property registered with the land department",
      "Clean criminal record and medical fitness test",
      "Health insurance valid in the UAE",
      "Investment or property held for the duration of the visa",
    ],
    why: "The Golden Visa is a long-term residence visa that does not depend on an employer or local sponsor. Holders may live outside the UAE for extended periods without losing status, sponsor their family with no age limit on children, and sponsor domestic staff.",
    benefits: [
      ["shield", "Ten-year residence, renewable, with no employer sponsor"],
      ["heart", "Sponsor your spouse, children of any age and parents"],
      ["globe", "Stay outside the UAE for more than six months without losing status"],
      ["briefcase", "No personal income tax in the UAE"],
      ["clock", "Decisions typically within weeks once the file is complete"],
    ],
    faq: "uae",
    testimonial: "uae",
    related: ["portugal", "greece", "turkiye"],
  },

  usa: {
    slug: "usa",
    href: "/destinations/usa",
    name: "United States",
    type: "Residency",
    amount: "EB-5 · from $800,000",
    note: "24–36 months · green card for the family",
    cta: "Enquire",
    photo: "New York street",
    tag: RBI,
    title: "United States EB-5 Visa",
    short: "the United States",
    intro:
      "A US green card for the investor, spouse and children through a job-creating investment.",
    photoHero: "New York street at dusk",
    photoSmall: "American suburban street",
    photoWhy: "San Francisco bay",
    stats: [
      ["Minimum investment", "$800,000"],
      ["Time to green card", "24–36 months"],
      ["Stay requirement", "Genuine US residence"],
      ["Citizenship eligibility", "After 5 years"],
    ],
    routesTitle: QI,
    routesNote:
      "Thresholds per the EB-5 Reform and Integrity Act of 2022; confirmed in writing at consultation.",
    amountLabel: INV,
    included: [
      "Project due diligence and regional-center vetting",
      "Source-of-funds documentation and legal review",
      "I-526E filing, consular processing and I-829 removal of conditions",
      "Settlement support and tax-planning coordination",
    ],
    groups: [
      {
        title: "Investment thresholds",
        subtitle: "Targeted employment area · Standard area",
        a: {
          title: "Targeted employment area",
          note: "Rural or high-unemployment areas and infrastructure projects · rural projects receive priority processing",
          amount: "$800,000",
        },
        b: {
          title: "Standard area",
          note: "Any other location in the United States",
          amount: "$1,050,000",
        },
      },
      {
        title: "Investment structures",
        subtitle: "Regional center · Direct investment",
        a: {
          title: "Regional center project",
          note: "Pooled investment in a USCIS-designated regional center · indirect job creation counts",
          amount: "From $800,000",
        },
        b: {
          title: "Direct investment",
          note: "Your own new commercial enterprise creating ten full-time jobs for US workers",
          amount: "From $800,000",
        },
      },
    ],
    eligibility: [
      "Any nationality; no age, language or education requirement",
      "Lawful, fully documented source of funds",
      "Investment must create at least ten full-time US jobs",
      "Capital must remain at risk for at least two years",
      "Intention to reside in the United States as a permanent resident",
    ],
    why: "EB-5 grants conditional permanent residence to investors whose capital creates at least ten US jobs, with conditions removed after two years. The 2022 reform act introduced set-aside visas for rural and high-unemployment projects and allows applicants already in the US to file for a green card concurrently.",
    benefits: [
      ["heart", "Green cards for the investor, spouse and unmarried children under 21"],
      ["globe", "Live, work and study anywhere in the United States"],
      ["briefcase", "No sponsor, employer or job offer required"],
      ["clock", "Set-aside visas for rural projects avoid per-country backlogs"],
      ["passport", "Path to US citizenship after five years as a permanent resident"],
    ],
    faq: "residency",
    testimonial: "skilled",
    related: ["canada", "portugal", "grenada"],
  },

  grenada: {
    slug: "grenada",
    href: "/destinations/grenada",
    name: "Grenada",
    type: "Citizenship",
    amount: "From $235,000",
    note: "6–9 months · E-2 treaty with the US",
    cta: "Enquire",
    photo: "Grenada coastline",
    tag: CBI,
    title: "Grenada Citizenship by Investment",
    short: "Grenada",
    intro:
      "Caribbean citizenship in months — and the only CBI passport with an E-2 investor treaty with the United States.",
    photoHero: "Grenada coastline and Grand Anse beach",
    photoSmall: "St George’s harbour",
    photoWhy: "Grenada spice plantation",
    stats: [
      ["Minimum contribution", "$235,000"],
      ["Time to passport", "6–9 months"],
      ["Stay requirement", "None"],
      ["Status granted", "Citizenship for life"],
    ],
    routesTitle: QI,
    routesNote: NOTE("Grenadian"),
    amountLabel: INV,
    included: INCL_CBI,
    groups: [
      {
        title: "Government contribution",
        subtitle: "National Transformation Fund · Larger families",
        a: {
          title: "National Transformation Fund",
          note: "Non-refundable contribution · single applicant or a family of up to four",
          amount: "$235,000",
        },
        b: {
          title: "Families of five or more",
          note: "Base contribution plus $25,000 per additional dependant",
          amount: "$235,000+",
        },
      },
      {
        title: "Real-estate route",
        subtitle: "Approved development · Government fees",
        a: {
          title: "Approved real estate",
          note: "Share in a government-approved tourism development · held for five years",
          amount: "$270,000",
        },
        b: {
          title: "Government application fee",
          note: "Real-estate route · family of up to four",
          amount: "$50,000",
        },
      },
    ],
    eligibility: [
      "Aged 18 or over with a clean criminal record",
      "Funds of lawful, documented origin",
      "Good health, confirmed by medical certificate",
      "Mandatory interview as part of due diligence",
      "Spouse, children under 30, parents, grandparents and unmarried siblings can be included",
    ],
    why: "Grenada grants full citizenship to investors and their families with no residence or visit requirement. Its passport offers visa-free access to over 140 destinations including the Schengen Area and China, and Grenada is the only Caribbean CBI country with an E-2 investor-visa treaty with the United States.",
    benefits: [
      ["briefcase", "E-2 treaty: apply to live in and run a business from the United States"],
      ["clock", "No residence or visit requirement"],
      ["globe", "Visa-free travel to over 140 destinations, including the Schengen Area and China"],
      ["heart", "A family of four covered by the base contribution"],
      ["passport", "Citizenship passes to future generations"],
    ],
    faq: "citizenship",
    testimonial: "caribbean",
    related: ["stkitts", "antigua", "turkiye"],
  },

  stkitts: {
    slug: "stkitts",
    href: "/destinations/stkitts",
    name: "St Kitts & Nevis",
    type: "Citizenship",
    amount: "From $250,000",
    note: "4–6 months · longest-running CBI program",
    cta: "Enquire",
    photo: "St Kitts harbour",
    tag: CBI,
    title: "St Kitts & Nevis Citizenship",
    short: "St Kitts & Nevis",
    intro: "The world’s longest-running citizenship-by-investment program, operating since 1984.",
    photoHero: "St Kitts harbour and Brimstone Hill",
    photoSmall: "Nevis beach at sunset",
    photoWhy: "Basseterre waterfront",
    stats: [
      ["Minimum contribution", "$250,000"],
      ["Time to passport", "4–6 months"],
      ["Stay requirement", "None"],
      ["Program established", "1984"],
    ],
    routesTitle: QI,
    routesNote: NOTE("St Kitts & Nevis"),
    amountLabel: INV,
    included: INCL_CBI,
    groups: [
      {
        title: "Contribution routes",
        subtitle: "Sustainable Island State Contribution · Public Benefit Option",
        a: {
          title: "Sustainable Island State Contribution",
          note: "Non-refundable contribution · single applicant; $300,000 for a family of up to four",
          amount: "$250,000",
        },
        b: {
          title: "Public Benefit Option",
          note: "Contribution to an approved public-benefit project",
          amount: "$250,000",
        },
      },
      {
        title: "Real-estate routes",
        subtitle: "Approved development · Private home",
        a: {
          title: "Approved development",
          note: "Condominium unit or share in an approved development · held for seven years",
          amount: "$325,000",
        },
        b: {
          title: "Private single-family home",
          note: "Approved private residence · held for seven years",
          amount: "$600,000",
        },
      },
    ],
    eligibility: [
      "Aged 18 or over with a clean criminal record",
      "Funds of lawful, documented origin",
      "Mandatory interview and enhanced due diligence",
      "Spouse, children under 25 and parents over 65 can be included",
      "Any prior visa refusals must be disclosed",
    ],
    why: "St Kitts & Nevis established the first citizenship-by-investment program in 1984 and remains the reference point for the industry. Citizenship is granted for life with no residence requirement, and the passport offers visa-free travel to over 150 destinations.",
    benefits: [
      ["shield", "The longest-running and most tested program in the world"],
      ["clock", "Decisions typically within four to six months"],
      ["globe", "Visa-free travel to over 150 destinations including the Schengen Area"],
      ["passport", "No residence, visit or language requirement"],
      ["heart", "Citizenship for life, transferable to future generations"],
    ],
    faq: "citizenship",
    testimonial: "caribbean",
    related: ["grenada", "antigua", "turkiye"],
  },

  antigua: {
    slug: "antigua",
    href: "/destinations/antigua",
    name: "Antigua & Barbuda",
    type: "Citizenship",
    amount: "From $230,000",
    note: "6–9 months · best value for larger families",
    cta: "Enquire",
    photo: "Antigua beach",
    tag: CBI,
    title: "Antigua & Barbuda Citizenship",
    short: "Antigua & Barbuda",
    intro:
      "The most cost-effective Caribbean citizenship for larger families, with a fund built for families of six.",
    photoHero: "Antigua beach and turquoise water",
    photoSmall: "Nelson’s Dockyard",
    photoWhy: "Shirley Heights lookout",
    stats: [
      ["Minimum contribution", "$230,000"],
      ["Time to passport", "6–9 months"],
      ["Stay requirement", "5 days in 5 years"],
      ["Program established", "2013"],
    ],
    routesTitle: QI,
    routesNote: NOTE("Antigua & Barbuda"),
    amountLabel: INV,
    included: INCL_CBI,
    groups: [
      {
        title: "Contribution routes",
        subtitle: "National Development Fund · University of the West Indies Fund",
        a: {
          title: "National Development Fund",
          note: "Non-refundable contribution · family of up to four",
          amount: "$230,000",
        },
        b: {
          title: "University of the West Indies Fund",
          note: "Families of six or more · includes one year of tuition for one family member",
          amount: "$260,000",
        },
      },
      {
        title: "Real-estate & business routes",
        subtitle: "Approved real estate · Business investment",
        a: {
          title: "Approved real estate",
          note: "Property in a government-approved development · held for five years",
          amount: "$300,000",
        },
        b: {
          title: "Business investment",
          note: "Approved business · or $5 million jointly with at least $400,000 per investor",
          amount: "$1,500,000",
        },
      },
    ],
    eligibility: [
      "Aged 18 or over with a clean criminal record",
      "Funds of lawful, documented origin",
      "Spend at least five days in Antigua & Barbuda during the first five years",
      "Oath of allegiance taken in person or at an embassy",
      "Spouse, children under 30, parents and grandparents over 55 and siblings can be included",
    ],
    why: "Antigua & Barbuda structures its program around the family: the base contribution covers four people, and a dedicated fund covers families of six. Citizenship is for life, with a light five-day visit requirement over the first five years.",
    benefits: [
      ["heart", "Best value for families of four or more"],
      ["globe", "Visa-free travel to over 150 destinations including the Schengen Area"],
      ["clock", "Only five days’ presence required in the first five years"],
      ["shield", "Parents, grandparents and siblings eligible as dependants"],
      ["briefcase", "English-speaking Commonwealth member"],
    ],
    faq: "citizenship",
    testimonial: "caribbean",
    related: ["grenada", "stkitts", "turkiye"],
  },

  turkiye: {
    slug: "turkiye",
    href: "/destinations/turkiye",
    name: "Türkiye",
    type: "Citizenship",
    amount: "From $400,000",
    note: "4–6 months · real-estate route",
    cta: "Enquire",
    photo: "Istanbul skyline",
    tag: CBI,
    title: "Türkiye Citizenship by Investment",
    short: "Türkiye",
    intro:
      "Direct citizenship in a G20 economy through property or a bank deposit, with no residence requirement.",
    photoHero: "Istanbul skyline over the Bosphorus",
    photoSmall: "a street in Istanbul’s old city",
    photoWhy: "Bodrum coastline",
    stats: [
      ["Minimum investment", "$400,000"],
      ["Time to citizenship", "4–6 months"],
      ["Stay requirement", "None"],
      ["Holding period", "3 years"],
    ],
    routesTitle: QI,
    routesNote: NOTE("Turkish"),
    amountLabel: INV,
    included: INCL_CBI,
    groups: [
      {
        title: "Property & deposit routes",
        subtitle: "Property purchase · Bank deposit",
        a: {
          title: "Property purchase",
          note: "One or more properties with a total appraised value of $400,000 · three-year no-sale annotation on the title",
          amount: "$400,000",
        },
        b: {
          title: "Bank deposit",
          note: "Deposit in a Turkish bank held for three years · USD, EUR or Turkish lira",
          amount: "$500,000",
        },
      },
      {
        title: "Capital & business routes",
        subtitle: "Fixed capital investment · Job creation",
        a: {
          title: "Fixed capital investment",
          note: "Investment confirmed by the Ministry of Industry and Technology · held for three years",
          amount: "$500,000",
        },
        b: {
          title: "Job creation",
          note: "Turkish company employing at least 50 Turkish citizens",
          amount: "50 jobs",
        },
      },
    ],
    eligibility: [
      "Any nationality aged 18 or over",
      "Property valued by a licensed appraiser and paid through a Turkish bank",
      "Investment held for at least three years",
      "Clean criminal record; no health, language or residence requirement",
      "Spouse and children under 18 included in the same application",
    ],
    why: "Türkiye grants citizenship directly, without a residency stage, to investors who buy property worth $400,000 or place $500,000 in an eligible investment for three years. There is no requirement to live in the country, and dual citizenship is permitted.",
    benefits: [
      ["passport", "Direct citizenship, with no residence stage"],
      ["heart", "Spouse and children under 18 included"],
      ["globe", "Visa-free or e-visa travel to over 110 destinations"],
      ["briefcase", "Eligible for the US E-2 investor-visa treaty"],
      ["shield", "Dual citizenship permitted"],
    ],
    faq: "citizenship",
    testimonial: "caribbean",
    related: ["grenada", "uae", "greece"],
  },

  canada: {
    slug: "canada",
    href: "/destinations/canada",
    name: "Canada",
    type: "Skilled",
    amount: "Express Entry · points-based",
    note: "6–12 months · PR for the whole family",
    cta: "Get assessed",
    photo: "Toronto waterfront",
    tag: SK,
    title: "Canada Express Entry",
    short: "Canada",
    intro:
      "Permanent residence for skilled professionals and their families through Canada’s points-based system — no investment required.",
    photoHero: "Toronto waterfront skyline",
    photoSmall: "engineer at a Toronto office",
    photoWhy: "Vancouver harbour and mountains",
    stats: [
      ["Investment required", "None"],
      ["Time to PR", "6–12 months"],
      ["Stay requirement", "2 of every 5 years"],
      ["Citizenship eligibility", "After 3 years"],
    ],
    routesTitle: QR,
    routesNote:
      "Programs and draw criteria per Immigration, Refugees and Citizenship Canada; confirmed in writing at consultation.",
    amountLabel: "Selection basis",
    included: INCL_SK,
    groups: [
      {
        title: "Express Entry programs",
        subtitle: "Federal Skilled Worker · Canadian Experience Class",
        a: {
          title: "Federal Skilled Worker",
          note: "Skilled work experience abroad, language results and education scored on the Comprehensive Ranking System",
          amount: "CRS-ranked",
        },
        b: {
          title: "Canadian Experience Class",
          note: "At least one year of skilled work experience in Canada",
          amount: "CRS-ranked",
        },
      },
      {
        title: "Nomination & targeted routes",
        subtitle: "Provincial Nominee Program · Category-based draws",
        a: {
          title: "Provincial Nominee Program",
          note: "A provincial nomination adds 600 CRS points, effectively guaranteeing an invitation in the next draw",
          amount: "+600 points",
        },
        b: {
          title: "Category-based draws",
          note: "Draws targeting healthcare, STEM, trades, French speakers and other priority occupations",
          amount: "Lower cut-offs",
        },
      },
    ],
    eligibility: [
      "Skilled work experience in a TEER 0–3 occupation",
      "Language test results in English or French (IELTS, CELPIP, TEF, TCF)",
      "Educational Credential Assessment for foreign qualifications",
      "Sufficient settlement funds unless already working in Canada",
      "Admissibility: clean record and medical examination",
    ],
    why: "Express Entry ranks candidates on the Comprehensive Ranking System — age, education, language and work experience — and invites the highest scores in regular draws. Successful applicants and their families receive permanent residence, with access to public healthcare and education and a path to citizenship after three years.",
    benefits: [
      ["heart", "Permanent residence for the applicant, spouse and dependent children"],
      ["briefcase", "No investment; selection based on skills and experience"],
      ["building", "Public healthcare and schooling for the family"],
      ["passport", "Citizenship after three years of residence in Canada"],
      ["clock", "Federal processing target of about six months after invitation"],
    ],
    faq: "skilled",
    testimonial: "skilled",
    related: ["australia", "usa", "uae"],
  },

  australia: {
    slug: "australia",
    href: "/destinations/australia",
    name: "Australia",
    type: "Skilled",
    amount: "SkillSelect · points-based",
    note: "8–14 months · skilled independent & state routes",
    cta: "Get assessed",
    photo: "Sydney harbour",
    tag: SK,
    title: "Australia Skilled Migration",
    short: "Australia",
    intro:
      "Points-tested permanent residence through SkillSelect, with independent, state-nominated and regional routes.",
    photoHero: "Sydney harbour and Opera House",
    photoSmall: "professionals in a Melbourne laneway",
    photoWhy: "Great Ocean Road",
    stats: [
      ["Investment required", "None"],
      ["Time to PR", "8–14 months"],
      ["Points threshold", "65 minimum"],
      ["Citizenship eligibility", "After 4 years"],
    ],
    routesTitle: QR,
    routesNote:
      "Visa subclasses and points per the Department of Home Affairs; confirmed in writing at consultation.",
    amountLabel: "Selection basis",
    included: INCL_SK,
    groups: [
      {
        title: "Permanent skilled visas",
        subtitle: "Skilled Independent (189) · Skilled Nominated (190)",
        a: {
          title: "Skilled Independent — subclass 189",
          note: "No sponsor or nomination · invitation purely on points",
          amount: "65+ points",
        },
        b: {
          title: "Skilled Nominated — subclass 190",
          note: "Nomination by a state or territory adds five points",
          amount: "+5 points",
        },
      },
      {
        title: "Regional & employer routes",
        subtitle: "Skilled Work Regional (491) · Employer sponsorship",
        a: {
          title: "Skilled Work Regional — subclass 491",
          note: "Regional nomination adds 15 points · five-year provisional visa leading to permanent residence",
          amount: "+15 points",
        },
        b: {
          title: "Employer sponsorship",
          note: "Skills in Demand (subclass 482) and Employer Nomination Scheme (subclass 186)",
          amount: "Job offer",
        },
      },
    ],
    eligibility: [
      "Under 45 at the time of invitation",
      "Occupation on the relevant skilled occupation list with a positive skills assessment",
      "Competent English or better (IELTS, PTE, TOEFL)",
      "At least 65 points on the SkillSelect points test",
      "Health and character requirements",
    ],
    why: "Australia selects skilled migrants through SkillSelect, awarding points for age, English, qualifications and experience. Permanent visa holders can live and work anywhere in Australia, access Medicare, sponsor relatives and apply for citizenship after four years of residence.",
    benefits: [
      ["heart", "Permanent residence for the applicant, partner and dependent children"],
      ["building", "Access to Medicare and public schooling"],
      ["globe", "Live and work anywhere in Australia"],
      ["trend", "State and regional nominations lift the points score"],
      ["passport", "Citizenship after four years’ residence, including one as a permanent resident"],
    ],
    faq: "skilled",
    testimonial: "skilled",
    related: ["canada", "usa", "uae"],
  },
};

/** Display order used by the Destinations index and the homepage carousel. */
export const DESTINATION_ORDER = [
  "portugal",
  "greece",
  "cyprus",
  "malta",
  "uae",
  "usa",
  "grenada",
  "stkitts",
  "antigua",
  "turkiye",
  "canada",
  "australia",
] as const;

export const DESTINATION_LIST: Destination[] = DESTINATION_ORDER.map((k) => DESTINATIONS[k]);

export function summary(slug: string): DestinationSummary {
  return DESTINATIONS[slug];
}
