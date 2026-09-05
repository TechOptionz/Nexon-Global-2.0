export type Testimonial = { quote: string; name: string; role: string };

const business: Testimonial[] = [
  {
    quote:
      "They handled my company setup, my visa and my family’s visas as one project. One point of contact for everything.",
    name: "T. Nakamura",
    role: "Corporate relocation · DMCC free zone",
  },
];

const individual: Testimonial[] = [
  {
    quote:
      "They told us in the first meeting which program we did not qualify for, and why. That honesty is exactly why we trusted them with the one we did.",
    name: "S. Rahman & family",
    role: "Grenada Citizenship by Investment",
  },
  {
    quote:
      "From document collection to the golden visa stamp, everything ran on the timeline they wrote down on day one. Not a single surprise fee.",
    name: "K. Osei",
    role: "UAE Golden Visa · Investor category",
  },
  {
    quote:
      "As a software engineer I had researched Express Entry for a year. NEXON found the provincial route I had missed and my ITA came in four months.",
    name: "D. Petrov",
    role: "Canada Express Entry · PNP",
  },
  {
    quote:
      "We compared three agencies. NEXON was the only one that put every cost in writing before asking for a commitment.",
    name: "A. Al Mansoori",
    role: "Portugal Golden Visa",
  },
  {
    quote:
      "The fortnightly updates meant we never once had to chase. Our consultant answered on WhatsApp even during Eid.",
    name: "M. & J. Fernandes",
    role: "Greece Golden Visa",
  },
];

const portugal: Testimonial[] = [individual[3], individual[4], individual[1]];

export const TESTIMONIAL_SETS: Record<string, Testimonial[]> = {
  business,
  individual,
  portugal,
  europe: portugal,
  caribbean: [individual[0], individual[1]],
  uae: [individual[1], business[0]],
  skilled: [individual[2]],
};

export function testimonialSet(variant: string): Testimonial[] {
  return TESTIMONIAL_SETS[variant] ?? individual;
}

/** Long-form case studies on the Success Stories page. */
export const CASE_STUDIES = [
  {
    tag: "Investment migration",
    title: "A family of five secures Grenada citizenship in seven months",
    body: "A Dubai-based business family wanted visa-free access to 140+ destinations and a plan B for their children. After due diligence flagged a documentation gap, we resolved it pre-submission — the application passed government vetting on the first pass.",
    facts: [
      { v: "7 mo", k: "first call to passports" },
      { v: "5", k: "family members, one file" },
      { v: "0", k: "government queries" },
    ],
  },
  {
    tag: "Skilled migration",
    title: "A software engineer lands Canadian PR through a provincial route",
    body: "After a year of researching Express Entry alone, his CRS score fell short. Our points plan — a language retake and a provincial nomination stream matched to his stack — added 620 points and produced an invitation to apply in four months.",
    facts: [
      { v: "4 mo", k: "to invitation" },
      { v: "+620", k: "CRS with nomination" },
      { v: "11 mo", k: "to PR confirmation" },
    ],
  },
] as const;

/** Short review grid on the Success Stories page. */
export const REVIEW_QUOTES = [
  {
    quote:
      "They told us in the first meeting which program we did not qualify for, and why. That honesty is exactly why we trusted them with the one we did.",
    name: "S. Rahman & family",
    program: "Grenada Citizenship by Investment",
  },
  {
    quote:
      "From document collection to the golden visa stamp, everything ran on the timeline they wrote down on day one. Not a single surprise fee.",
    name: "K. Osei",
    program: "UAE Golden Visa · Investor category",
  },
  {
    quote: "NEXON found the provincial route I had missed and my invitation came in four months.",
    name: "D. Petrov",
    program: "Canada Express Entry · PNP",
  },
  {
    quote:
      "We compared three agencies. NEXON was the only one that put every cost in writing before asking for a commitment.",
    name: "A. Al Mansoori",
    program: "Portugal Golden Visa",
  },
  {
    quote:
      "The fortnightly updates meant we never once had to chase. Our consultant answered on WhatsApp even during Eid.",
    name: "M. & J. Fernandes",
    program: "Greece Golden Visa",
  },
  {
    quote:
      "They handled my company setup, my visa and my family’s visas as one project. One point of contact for everything.",
    name: "T. Nakamura",
    program: "Corporate relocation · DMCC free zone",
  },
] as const;
