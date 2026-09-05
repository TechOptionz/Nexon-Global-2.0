/** Shared site chrome: navigation, footer, credentials, team, process. */

export const SITE = {
  name: "NEXON",
  fullName: "NEXON Global Immigration",
  legalName: "NEXON Global Immigration Services",
  address: "Business Bay, Dubai, United Arab Emirates",
  hours: "Sunday–Friday, 9:00–18:00 GST",
  phone: "+971 4 000 0000",
  phoneHref: "tel:+97140000000",
  whatsapp: "WhatsApp +971 50 000 0000",
  whatsappHref: "tel:+971500000000",
  email: "hello@nexonglobal.ae",
  emailHref: "mailto:hello@nexonglobal.ae",
  announcement: "Free 30-minute consultation · No obligation · English & Arabic",
  licence: "Residency, citizenship and global mobility consultancy. Licensed in the United Arab Emirates.",
  copyright: "© 2026 NEXON Global Immigration Services. All rights reserved.",
} as const;

/** Press and membership names in the scrolling logo strip. */
const LOGO_NAMES = [
  "Investment Migration Council",
  "Dubai Chamber",
  "Khaleej Times",
  "Gulf Business",
  "Arabian Business",
];

/** Doubled so the marquee loops seamlessly at -50%. */
export const MARQUEE_LOGOS = LOGO_NAMES.concat(LOGO_NAMES);

export type NavKey = "services" | "destinations" | "why" | "resources" | "home" | "contact";

export type MegaLink = { label: string; href: string };

export type MegaMenu = {
  key: NavKey;
  label: string;
  href: string;
  photo: string;
  tiles: { title: string; desc: string; href: string }[];
  columns: { eyebrow: string; links: MegaLink[] }[];
  card: { title: string; desc: string; button: string; href: string };
};

export const MENUS: MegaMenu[] = [
  {
    key: "services",
    label: "Services",
    href: "/services",
    photo: "consultant with client",
    tiles: [
      {
        title: "Citizenship by Investment",
        desc: "Second passports through government-authorised programs in the Caribbean, Türkiye and beyond — with full due-diligence support.",
        href: "/services/citizenship",
      },
      {
        title: "Residency by Investment",
        desc: "Golden visas and investor residency across Europe and the UAE, matched to your budget, timeline and mobility goals.",
        href: "/services/residency",
      },
      {
        title: "Skilled & Family Migration",
        desc: "Points-based pathways to Canada, Australia and the UK for professionals, plus family sponsorship and study routes.",
        href: "/services/skilled",
      },
      {
        title: "Corporate & Global Mobility",
        desc: "Relocation of founders, executives and teams — company setup, work permits and dependent visas handled end to end.",
        href: "/for-business",
      },
    ],
    columns: [],
    card: {
      title: "Find out where you stand in two minutes",
      desc: "Three quick questions. A consultant reviews every submission personally — no automated rejections.",
      button: "Check Your Eligibility",
      href: "/#eligibility",
    },
  },
  {
    key: "destinations",
    label: "Destinations",
    href: "/destinations",
    photo: "Lisbon coastline",
    tiles: [
      {
        title: "Where would you like to belong?",
        desc: "Twelve government-authorised routes across citizenship, residency and skilled migration.",
        href: "/destinations",
      },
      {
        title: "Portugal Golden Visa",
        desc: "European residency with one week a year in-country, and one of the clearest paths to an EU passport.",
        href: "/destinations/portugal",
      },
    ],
    columns: [
      {
        eyebrow: "Citizenship",
        links: [
          { label: "Grenada", href: "/destinations/grenada" },
          { label: "St Kitts & Nevis", href: "/destinations/stkitts" },
          { label: "Antigua & Barbuda", href: "/destinations/antigua" },
          { label: "Türkiye", href: "/destinations/turkiye" },
        ],
      },
      {
        eyebrow: "Residency",
        links: [
          { label: "Portugal", href: "/destinations/portugal" },
          { label: "Greece", href: "/destinations/greece" },
          { label: "Cyprus", href: "/destinations/cyprus" },
          { label: "Malta", href: "/destinations/malta" },
          { label: "UAE Golden Visa", href: "/destinations/uae" },
          { label: "United States", href: "/destinations/usa" },
        ],
      },
      {
        eyebrow: "Skilled",
        links: [
          { label: "Canada", href: "/destinations/canada" },
          { label: "Australia", href: "/destinations/australia" },
        ],
      },
    ],
    card: {
      title: "Can't decide between two programs?",
      desc: "We'll prepare a written side-by-side comparison for your exact situation — free.",
      button: "Book a Consultation",
      href: "/contact",
    },
  },
  {
    key: "why",
    label: "Why NEXON",
    href: "/about",
    photo: "the NEXON team in the Business Bay office",
    tiles: [
      {
        title: "About us",
        desc: "Built in Dubai on a simple promise: honest migration advice.",
        href: "/about",
      },
      {
        title: "How it works",
        desc: "A clear process, from first call to approval.",
        href: "/how-it-works",
      },
    ],
    columns: [
      {
        eyebrow: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "How It Works", href: "/how-it-works" },
          { label: "Success Stories", href: "/success-stories" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    card: {
      title: "The people behind every application",
      desc: "A named advisor owns your file from first meeting to approval. You always know who to call.",
      button: "About Us",
      href: "/about",
    },
  },
  {
    key: "resources",
    label: "Resources",
    href: "/insights",
    photo: "reading at a departure gate",
    tiles: [
      {
        title: "Insights",
        desc: "Program changes, comparisons and practical guides from our consultants.",
        href: "/insights",
      },
      {
        title: "FAQs",
        desc: "If your question isn't here, a consultant will answer it on a free call — in English or Arabic.",
        href: "/faqs",
      },
    ],
    columns: [
      {
        eyebrow: "Latest",
        links: [
          {
            label: "Portugal's Golden Visa in 2026: what changed and who still qualifies",
            href: "/insights/portugal",
          },
          {
            label: "Comparing the five Caribbean citizenship programs, side by side",
            href: "/insights/caribbean",
          },
          { label: "Every UAE Golden Visa category explained", href: "/insights/uae" },
        ],
      },
      {
        eyebrow: "Guides",
        links: [
          {
            label: "Due diligence: what citizenship units actually check",
            href: "/insights/diligence",
          },
          {
            label: "Adding parents and adult children to your application",
            href: "/insights/family",
          },
          {
            label: "Greece Golden Visa: the zones and thresholds in force now",
            href: "/insights/greece",
          },
        ],
      },
    ],
    card: {
      title: "Families who made the move.",
      desc: "Names abbreviated for privacy. Programs, timelines and outcomes as delivered.",
      button: "Success Stories",
      href: "/success-stories",
    },
  },
];

/** Background pairs for the mega-menu overview tiles, in order. */
export const TILE_BG: [string, string][] = [
  ["#EEF4EC", "#E3ECE0"],
  ["#F6F3EF", "#EFEAE2"],
  ["#E5F1F9", "#D6E8F4"],
  ["#FBF3E0", "#F5E8C8"],
];

export const FOOTER_COLUMNS: { heading: string; links: MegaLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Citizenship by Investment", href: "/services/citizenship" },
      { label: "Residency by Investment", href: "/services/residency" },
      { label: "Skilled & Family Migration", href: "/services/skilled" },
      { label: "Corporate & Global Mobility", href: "/for-business" },
      { label: "Check Your Eligibility", href: "/#eligibility" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  {
    heading: "Citizenship",
    links: [
      { label: "Grenada", href: "/destinations/grenada" },
      { label: "St Kitts & Nevis", href: "/destinations/stkitts" },
      { label: "Antigua & Barbuda", href: "/destinations/antigua" },
      { label: "Türkiye", href: "/destinations/turkiye" },
    ],
  },
  {
    heading: "Residency & skilled",
    links: [
      { label: "Portugal", href: "/destinations/portugal" },
      { label: "Greece", href: "/destinations/greece" },
      { label: "Cyprus", href: "/destinations/cyprus" },
      { label: "Malta", href: "/destinations/malta" },
      { label: "UAE Golden Visa", href: "/destinations/uae" },
      { label: "United States", href: "/destinations/usa" },
      { label: "Canada", href: "/destinations/canada" },
      { label: "Australia", href: "/destinations/australia" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "FAQs", href: "/faqs" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Destinations", href: "/destinations" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export const TEAM = [
  {
    slot: "layla",
    name: "Layla Haddad",
    role: "Managing Partner",
    creds: "12 years in investment migration · Member, Investment Migration Council · Arabic, English, French",
  },
  {
    slot: "omar",
    name: "Omar Al Farsi",
    role: "Head of Investment Migration",
    creds: "Former program liaison for two Caribbean CBI units · 300+ files advised · Arabic, English",
  },
  {
    slot: "priya",
    name: "Priya Nair",
    role: "Senior Consultant, Skilled Migration",
    creds: "Regulated migration adviser (Canada & Australia routes) · 9 years experience · English, Hindi, Malayalam",
  },
] as const;

/** The five-stage process, short form (homepage). */
export const PROCESS_STEPS = [
  {
    n: "1",
    title: "Free consultation",
    desc: "A 30-minute call to understand your goals, family situation and constraints.",
  },
  {
    n: "2",
    title: "Eligibility & due diligence",
    desc: "We assess your profile against program requirements and run preliminary checks.",
  },
  {
    n: "3",
    title: "Program selection",
    desc: "A written comparison of your best options — costs, timelines and obligations.",
  },
  {
    n: "4",
    title: "Application & documentation",
    desc: "We prepare, review and submit your file, and manage every government query.",
  },
  {
    n: "5",
    title: "Approval & beyond",
    desc: "Biometrics, oaths, property closings and relocation support until you are settled.",
  },
] as const;

/** The same five stages, long form with deliverables (How It Works). */
export const PROCESS_STAGES = [
  {
    n: "1",
    title: "Free consultation",
    duration: "30 minutes",
    desc: "A call or office visit to understand your goals, family situation, nationality and constraints. We tell you plainly which routes are realistic.",
    deliverable: "A shortlist of viable programs and a written fee schedule — before you pay anything.",
  },
  {
    n: "2",
    title: "Eligibility & due diligence",
    duration: "1–2 weeks",
    desc: "We assess your profile against program requirements, run preliminary background checks, and flag any issues that could affect approval — before submission, not after.",
    deliverable: "A written eligibility report with risks, remedies and realistic approval odds.",
  },
  {
    n: "3",
    title: "Program selection",
    duration: "1 week",
    desc: "A side-by-side comparison of your best options: total costs, timelines, residency obligations, family inclusion and paths to citizenship.",
    deliverable: "A comparison document and a recommended route, with reasons in writing.",
  },
  {
    n: "4",
    title: "Application & documentation",
    duration: "varies by program",
    desc: "We prepare, translate, attest and submit your file, and manage every government query. You get a named consultant and status updates at least fortnightly.",
    deliverable: "A tracked application with a live document checklist and update schedule.",
  },
  {
    n: "5",
    title: "Approval & beyond",
    duration: "ongoing",
    desc: "Biometrics, oaths, property closings, bank accounts, school searches — we stay engaged until you and your family are actually settled, and handle renewals after.",
    deliverable: "Your residency card or passport in hand, plus a settlement checklist and renewal calendar.",
  },
] as const;

/** The three transparency promises, used on five different pages. */
export const PROMISES = [
  {
    n: "01",
    title: "Fees in writing, day one",
    desc: "Professional fees, government fees and third-party costs itemised before engagement. Nothing added later.",
  },
  {
    n: "02",
    title: "No false timelines",
    desc: "We quote the timelines programs actually deliver, not the ones that close a sale.",
  },
  {
    n: "03",
    title: "We decline weak cases",
    desc: "If we believe an application will fail, we will not submit it — and we tell you what would change our answer.",
  },
] as const;

/** The yellow credentials band. */
export const CREDENTIALS = [
  { icon: "sun", value: "20+", label: "Years of combined advisory experience" },
  { icon: "globe", value: "35+", label: "Residency & citizenship programs" },
  { icon: "languages", value: "6", label: "Languages spoken by our team" },
  { icon: "clock", value: "1 day", label: "Maximum response time" },
] as const;

export const AUDIENCES = [
  { who: "Individuals", need: "A second residency or passport as a plan B and travel freedom." },
  { who: "Families", need: "Education, healthcare and a secure future in one application." },
  { who: "Investors", need: "Programs that protect capital and open new markets." },
  { who: "Entrepreneurs", need: "Relocating a business and team with minimal disruption." },
  {
    who: "Skilled professionals",
    need: "Points-based visas that turn experience into permanent residency.",
  },
] as const;

/** Corporate & Global Mobility service list. */
export const BUSINESS_SERVICES = [
  "UAE company formation — free zone and mainland",
  "Executive and employee work permits",
  "Dependent and domestic-staff visas",
  "Payroll and Emiratisation compliance guidance",
  "Ongoing PRO and renewals service",
] as const;
