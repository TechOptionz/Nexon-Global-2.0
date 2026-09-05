import type { IconName } from "@/components/Icons";

export type Service = {
  slug: string;
  href: string;
  tag: string;
  title: string;
  tint: string;
  intro: string;
  clients: string;
  photoHero: string;
  photoProcess: string;
  stats: [string, string][];
  programsCta: string;
  programsTitle: string;
  filterHref: string;
  filterCta: string;
  /** Destination slugs shown in the programs grid. */
  programs: string[];
  included: [IconName, string][];
  processTitle: string;
  steps: [string, string][];
  testimonial: string;
  faq: string;
};

export const SERVICES: Record<string, Service> = {
  citizenship: {
    slug: "citizenship",
    href: "/services/citizenship",
    tag: "Citizenship by investment",
    title: "Citizenship by Investment",
    tint: "#EEF4EC",
    intro:
      "A second passport through government-authorised programs in the Caribbean, Türkiye and beyond. We manage due diligence, investment structuring and the full application.",
    clients: "Investors, business families, frequent travellers",
    photoHero: "family holding new passports at an airport",
    photoProcess: "consultant reviewing a due-diligence file with a client",
    stats: [
      ["Programs", "4 jurisdictions"],
      ["Minimum contribution", "From $230,000"],
      ["Time to passport", "4–9 months"],
      ["Stay requirement", "None"],
    ],
    programsCta: "See the programs",
    programsTitle: "Four passports we recommend, and why",
    filterHref: "/destinations?type=citizenship",
    filterCta: "Compare all citizenship programs",
    programs: ["grenada", "stkitts", "antigua", "turkiye"],
    included: [
      ["compare", "Program comparison across all authorised CBI jurisdictions"],
      ["shield", "Pre-submission due-diligence screening"],
      ["fund", "Investment route guidance — donation, real estate, funds"],
      ["family", "Family inclusion strategy — spouse, children, parents"],
      ["passport", "Passport issuance and renewal support"],
    ],
    processTitle: "From first call to passport",
    steps: [
      [
        "Free consultation",
        "A 30-minute call on your goals, family and travel needs, and which passports would genuinely serve them.",
      ],
      [
        "Pre-screening",
        "We run the same checks a citizenship unit will — source of funds, past refusals, name matches — before anything is submitted.",
      ],
      [
        "Program & route selection",
        "A written comparison of donation versus real-estate routes, with the full household cost for your family.",
      ],
      [
        "Application & interview",
        "File preparation, government submission, interview coaching and every query handled until approval.",
      ],
      [
        "Passport & beyond",
        "Oath, passport issuance, and renewals — plus adding family members later where programs allow.",
      ],
    ],
    testimonial: "caribbean",
    faq: "citizenship",
  },

  residency: {
    slug: "residency",
    href: "/services/residency",
    tag: "Residency by investment",
    title: "Residency by Investment",
    tint: "#F6F3EF",
    intro:
      "Golden visas and investor residency across Europe and the UAE, matched to your budget, timeline and long-term mobility goals — including paths to citizenship.",
    clients: "Investors, retirees, families seeking EU access",
    photoHero: "Pena Palace at Sintra",
    photoProcess: "consultant and client reviewing a fund prospectus",
    stats: [
      ["Programs", "6 destinations"],
      ["Minimum investment", "From €150,000"],
      ["Time to residency", "2 weeks – 8 months"],
      ["Path to citizenship", "Portugal · Greece · US"],
    ],
    programsCta: "See the programs",
    programsTitle: "Six residencies, from Lisbon to Dubai",
    filterHref: "/destinations?type=residency",
    filterCta: "Compare all residency programs",
    programs: ["portugal", "greece", "cyprus", "malta", "uae", "usa"],
    included: [
      ["compare", "Portugal, Greece, Cyprus, Malta, UAE and US programs"],
      ["fund", "Qualifying-investment selection and verification"],
      ["card", "Residency-card processing and renewals"],
      ["passport", "Path-to-citizenship planning where available"],
      ["tax", "Tax-residency coordination with your advisors"],
    ],
    processTitle: "From first call to residence card",
    steps: [
      [
        "Free consultation",
        "A 30-minute call on where you want access, how much time you can spend in-country, and whether citizenship matters.",
      ],
      [
        "Eligibility & program fit",
        "A written comparison of the programs you qualify for — cost, timeline, stay requirement and family rules.",
      ],
      [
        "Investment selection",
        "Vetting of the fund, property or deposit against program rules, with your own financial advisors involved.",
      ],
      [
        "Application & biometrics",
        "File preparation, submission, appointment scheduling and every government query handled.",
      ],
      [
        "Card, renewals & citizenship",
        "Residence-card collection, renewal reminders and, where available, the citizenship application when the time comes.",
      ],
    ],
    testimonial: "europe",
    faq: "residency",
  },

  skilled: {
    slug: "skilled",
    href: "/services/skilled",
    tag: "Skilled & family migration",
    title: "Skilled & Family Migration",
    tint: "#E5F1F9",
    intro:
      "Points-based pathways to Canada, Australia and the UK for professionals — plus family sponsorship, study routes and post-study work options.",
    clients: "Engineers, medics, tech and finance professionals",
    photoHero: "engineer at a Toronto office",
    photoProcess: "consultant explaining a points assessment",
    stats: [
      ["Destinations", "Canada · Australia · UK"],
      ["Investment required", "None"],
      ["Time to PR", "6–14 months"],
      ["Family", "Spouse & children included"],
    ],
    programsCta: "See the routes",
    programsTitle: "Points-based routes we advise on",
    filterHref: "/destinations?type=skilled",
    filterCta: "Compare all skilled routes",
    programs: ["canada", "australia"],
    included: [
      ["points", "Points assessment and score-improvement plan"],
      ["route", "Express Entry, PNP, SkillSelect and UK Skilled Worker routes"],
      ["cert", "Credential recognition and language-test guidance"],
      ["family", "Family sponsorship and dependent visas"],
      ["home", "Job-search and settlement orientation"],
    ],
    processTitle: "From first call to permanent residence",
    steps: [
      [
        "Free consultation",
        "A 30-minute call on your profession, experience, language level and where your family would like to live.",
      ],
      [
        "Points assessment",
        "A written score against Canada, Australia and the UK, with the specific steps that would raise it.",
      ],
      [
        "Profile & documents",
        "Language tests, credential assessments and references sequenced so your profile enters the pool at its strongest.",
      ],
      [
        "Invitation & application",
        "Provincial or state nomination where it helps, then the full permanent-residence application and medicals.",
      ],
      [
        "Landing & settlement",
        "Pre-arrival checklist, first-week essentials and orientation on schools, housing and job search.",
      ],
    ],
    testimonial: "skilled",
    faq: "skilled",
  },
};

export const SERVICE_ORDER = ["citizenship", "residency", "skilled"] as const;

/**
 * The four practices as presented on the Services index and in the
 * "Four practices" grids. Corporate & Global Mobility has its own page
 * rather than a Service-template detail page.
 */
export const PRACTICES = [
  {
    id: "citizenship",
    num: "01",
    title: "Citizenship by Investment",
    desc: "A second passport through government-authorised programs in the Caribbean, Türkiye and beyond. We manage due diligence, investment structuring and the full application.",
    clients: "Investors, business families, frequent travellers",
    cta: "Explore Citizenship by Investment",
    href: "/services/citizenship",
    included: [
      "Program comparison across all authorised CBI jurisdictions",
      "Pre-submission due-diligence screening",
      "Investment route guidance (donation, real estate, funds)",
      "Family inclusion strategy — spouse, children, parents",
      "Passport issuance and renewal support",
    ],
  },
  {
    id: "residency",
    num: "02",
    title: "Residency by Investment",
    desc: "Golden visas and investor residency across Europe and the UAE, matched to your budget, timeline and long-term mobility goals — including paths to citizenship.",
    clients: "Investors, retirees, families seeking EU access",
    cta: "Explore Residency by Investment",
    href: "/services/residency",
    included: [
      "Portugal, Greece, Cyprus, Malta, Latvia and UAE programs",
      "Qualifying-investment selection and verification",
      "Residency-card processing and renewals",
      "Path-to-citizenship planning where available",
      "Tax-residency coordination with your advisors",
    ],
  },
  {
    id: "skilled",
    num: "03",
    title: "Skilled & Family Migration",
    desc: "Points-based pathways to Canada, Australia and the UK for professionals — plus family sponsorship, study routes and post-study work options.",
    clients: "Engineers, medics, tech and finance professionals",
    cta: "Explore Skilled & Family Migration",
    href: "/services/skilled",
    included: [
      "Points assessment and score-improvement plan",
      "Express Entry, PNP, SkillSelect and UK Skilled Worker routes",
      "Credential recognition and language-test guidance",
      "Family sponsorship and dependent visas",
      "Job-search and settlement orientation",
    ],
  },
  {
    id: "corporate",
    num: "04",
    title: "Corporate & Global Mobility",
    desc: "Relocation of founders, executives and whole teams. Company setup, work permits and dependent visas handled end to end, with UAE free-zone expertise.",
    clients: "Startups, family offices, expanding SMEs",
    cta: "For Business",
    href: "/for-business",
    included: [
      "UAE company formation — free zone and mainland",
      "Executive and employee work permits",
      "Dependent and domestic-staff visas",
      "Payroll and Emiratisation compliance guidance",
      "Ongoing PRO and renewals service",
    ],
  },
] as const;
