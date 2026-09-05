export type Faq = { q: string; a: string };

/** The shared question bank the Faq Block draws its sets from. */
const Q = {
  time: {
    q: "How long does the process take?",
    a: "It depends on the program. UAE Golden Visas can complete in weeks; Caribbean citizenship typically takes 4–9 months; European residency 3–8 months; skilled migration to Canada or Australia 6–14 months. We give you a written timeline before you commit.",
  },
  fees: {
    q: "Are your fees fixed and transparent?",
    a: "Yes. You receive a written fee schedule at the first consultation covering our professional fees, government fees, and third-party costs. No hidden charges are added later.",
  },
  family: {
    q: "Can my family be included in one application?",
    a: "Most programs allow spouses, dependent children, and in many cases parents to be included in a single application. We confirm exactly who qualifies during your eligibility assessment.",
  },
  live: {
    q: "Do I need to live in the country to keep my status?",
    a: "Many investment programs have minimal or no physical residency requirements. Skilled visas usually do. We flag every residency obligation clearly before you apply.",
  },
  livePt: {
    q: "Do I need to live in the country to keep my status?",
    a: "Many investment programs have minimal or no physical-presence requirements — Portugal asks for about seven days a year; Greece has none. Skilled visas usually require genuine residence. Every obligation is flagged before you apply.",
  },
  refused: {
    q: "What if my application is refused?",
    a: "We only submit applications we believe will succeed, and we tell you upfront if your profile is not ready. Where programs allow, our agreements set out clearly what is refundable at each stage.",
  },
  money: {
    q: "What happens to my money if the application is refused?",
    a: "We only submit applications we believe will succeed, and our agreements set out clearly what is refundable at each stage. Most program investments are only committed after government pre-approval where the program allows.",
  },
  pay: {
    q: "When do I pay?",
    a: "Fees are staged against milestones — engagement, submission and approval. You never pay the full amount upfront.",
  },
  office: {
    q: "Do I need to visit your office in Dubai?",
    a: "No. Most clients complete the entire process remotely via video calls and courier. You are welcome at our Business Bay office at any stage.",
  },
  after: {
    q: "Do you help after the visa is issued?",
    a: "Yes. Settlement support — bank accounts, schools, property, renewals — is part of the engagement, not an upsell.",
  },
  language: {
    q: "Do I need to speak the destination country’s language?",
    a: "Investment programs generally have no language requirement. Skilled routes to Canada, Australia and the UK do — we include language-test strategy in your points plan.",
  },
} as const;

export type FaqSet = "home" | "business" | "portugal" | "residency" | "citizenship" | "skilled" | "uae";

const SETS: Record<FaqSet, (keyof typeof Q)[]> = {
  home: ["time", "fees", "family", "live", "refused"],
  business: ["fees", "pay", "time", "office", "after"],
  portugal: ["time", "livePt", "family", "language", "money"],
  residency: ["time", "livePt", "family", "language", "money"],
  citizenship: ["time", "family", "live", "refused", "pay"],
  skilled: ["time", "language", "family", "after", "pay"],
  uae: ["time", "office", "family", "after", "fees"],
};

export function faqSet(set: string): Faq[] {
  const keys = SETS[(set as FaqSet)] ?? SETS.home;
  return keys.map((k) => ({ ...Q[k] }));
}

/** The grouped bank shown on the dedicated FAQs page. */
export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do I know which program is right for me?",
        a: "Start with the free consultation or the two-minute eligibility check. We compare your nationality, budget, family situation and goals against 35+ programs and give you a written shortlist with reasons.",
      },
      {
        q: "How long does the process take?",
        a: "UAE Golden Visas can complete in weeks; Caribbean citizenship typically takes 4–9 months; European residency 3–8 months; skilled migration to Canada or Australia 6–14 months. You receive a written timeline before you commit.",
      },
      {
        q: "Do I need to visit your office in Dubai?",
        a: "No. Most clients complete the entire process remotely via video calls and courier. You are welcome at our Business Bay office at any stage.",
      },
    ],
  },
  {
    title: "Costs & fees",
    items: [
      {
        q: "Are your fees fixed and transparent?",
        a: "Yes. You receive a written fee schedule at the first consultation covering our professional fees, government fees and third-party costs. Nothing is added later.",
      },
      {
        q: "When do I pay?",
        a: "Fees are staged against milestones — engagement, submission and approval. You never pay the full amount upfront.",
      },
      {
        q: "What happens to my money if the application is refused?",
        a: "We only submit applications we believe will succeed, and our agreements set out clearly what is refundable at each stage. Most program investments are only committed after government pre-approval where the program allows.",
      },
    ],
  },
  {
    title: "Family & eligibility",
    items: [
      {
        q: "Can my family be included in one application?",
        a: "Most programs allow spouses, dependent children and often parents in a single application. We confirm exactly who qualifies during your eligibility assessment.",
      },
      {
        q: "Will a past visa refusal hurt my application?",
        a: "Not necessarily, but it must be disclosed and addressed properly. Our due-diligence stage exists precisely to surface and resolve issues before submission.",
      },
      {
        q: "Do I need to speak the destination country’s language?",
        a: "Investment programs generally have no language requirement. Skilled routes to Canada, Australia and the UK do — we include language-test strategy in your points plan.",
      },
    ],
  },
  {
    title: "After approval",
    items: [
      {
        q: "Do I need to live in the country to keep my status?",
        a: "Many investment programs have minimal or no physical-presence requirements — Portugal asks for about seven days a year; Greece has none. Skilled visas usually require genuine residence. Every obligation is flagged before you apply.",
      },
      {
        q: "Can I lose my second citizenship or residency?",
        a: "Citizenship, once granted, is rarely revoked except for fraud in the application. Residency permits must be renewed and their conditions maintained — we manage renewal calendars for all clients.",
      },
      {
        q: "Do you help after the visa is issued?",
        a: "Yes. Settlement support — bank accounts, schools, property, renewals — is part of the engagement, not an upsell.",
      },
    ],
  },
];
