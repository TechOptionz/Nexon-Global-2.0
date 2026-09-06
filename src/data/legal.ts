/**
 * Long-form legal copy for /privacy and /terms.
 *
 * Kept as data rather than JSX so both documents share one renderer
 * (<LegalDocument>), and so every paragraph is a plain English string
 * that the i18n layer can look up — the same contract as the rest of
 * the site, where an untranslated string falls back to English.
 *
 * These are working documents for a UAE-licensed advisory practice.
 * They are not a substitute for review by the firm's own counsel before
 * publication.
 */

import { SITE } from "./site";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] };

export type LegalSection = {
  /** Anchor id — also the deep-link target from the table of contents. */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Shown in the hero meta row and in the closing note. */
  updated: string;
  sections: LegalSection[];
};

const CONTACT_LINE = `${SITE.legalName}, ${SITE.address}. Email ${SITE.email} or call ${SITE.phone}.`;

/* ------------------------------------------------------------------
   Privacy Policy
   ------------------------------------------------------------------ */

export const PRIVACY: LegalDoc = {
  eyebrow: "Privacy",
  title: "How we handle your information.",
  lede: "An immigration file is one of the most personal things you will ever hand to a company. This page sets out exactly what we collect, why we need it, who sees it and what you can ask us to do with it.",
  updated: "6 September 2026",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          kind: "p",
          text: `${SITE.legalName} is a licensed residency, citizenship and global mobility consultancy based in ${SITE.address}. In this policy "we", "us" and "our" mean ${SITE.legalName}; "you" means anyone who contacts us, uses this website, or engages us on an application.`,
        },
        {
          kind: "p",
          text: "We are the controller of the personal data described here. That means we decide what is collected and why, and we are accountable for it — including for the work carried out on our instructions by the government-authorised agents, due-diligence firms and other partners named below.",
        },
        {
          kind: "p",
          text: CONTACT_LINE,
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      blocks: [
        {
          kind: "p",
          text: "We collect only what a consultation or an application actually requires. In practice that falls into five groups.",
        },
        { kind: "h3", text: "Information you give us directly" },
        {
          kind: "list",
          items: [
            "Contact details — name, email address, phone or WhatsApp number, country of residence and preferred language.",
            "Eligibility details — nationality, age, marital status, family composition, education, occupation, work history and language test results.",
            "Financial information — source of funds and source of wealth evidence, bank statements, tax records, proof of investment capital and business ownership documents.",
            "Identity and travel documents — passports, national identity cards, birth and marriage certificates, residence permits and previous visa history.",
            "Background information — police clearance certificates, medical certificates and any prior visa refusals or immigration history you disclose to us.",
          ],
        },
        { kind: "h3", text: "Information we generate about your file" },
        {
          kind: "list",
          items: [
            "Consultation notes, assessments, program recommendations and the written fee schedule issued to you.",
            "Correspondence with you and with the authorities, agents and institutions handling your application.",
            "Application status, submission dates, decisions and any conditions attached to an approval.",
          ],
        },
        { kind: "h3", text: "Information about your family" },
        {
          kind: "p",
          text: "Most programs cover a spouse, dependent children and, in some cases, parents. Where you provide information about another person, you confirm that you are entitled to do so and that you have shown them this policy. Information about children is collected only where a program requires it for a dependent applicant, and is handled with the same protections as the rest of the file.",
        },
        { kind: "h3", text: "Information collected automatically" },
        {
          kind: "list",
          items: [
            "Technical data — IP address, device type, browser, and the pages you viewed on this website.",
            "Your language preference, which is stored in your browser so the site opens in English or Arabic as you left it.",
          ],
        },
        { kind: "h3", text: "Sensitive information" },
        {
          kind: "p",
          text: "Some of what an application requires is sensitive by nature: health declarations, criminal record checks, and in a few programs biometric data taken by the receiving government. We collect it only where a specific program requires it, we tell you when that is the case, and we do not use it for anything else.",
        },
      ],
    },
    {
      id: "why-we-use-it",
      title: "Why we use it, and on what basis",
      blocks: [
        {
          kind: "p",
          text: "We use your information for a defined set of purposes, each with a lawful basis under UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data and, where it applies to you, the EU and UK General Data Protection Regulation.",
        },
        {
          kind: "list",
          items: [
            "To answer your enquiry and carry out a free assessment — on the basis of steps taken at your request before entering a contract.",
            "To advise you, prepare your file and submit your application — on the basis of performing our engagement with you.",
            "To complete due diligence and anti-money-laundering checks — on the basis of our legal obligations as a licensed advisory practice, and the obligations of the programs we submit to.",
            "To keep records of the advice we gave and the fees we quoted — on the basis of our legal obligations and our legitimate interest in being able to evidence our own work.",
            "To improve the website and understand which pages are useful — on the basis of our legitimate interest in running the site, using aggregated data only.",
            "To send you program updates or newsletters — only where you have asked for them, and with an unsubscribe link in every message.",
          ],
        },
        {
          kind: "p",
          text: "We do not sell your personal data, we do not rent our client list, and we do not use your file to make automated decisions that produce a legal effect for you. Every recommendation you receive is reviewed by a named consultant.",
        },
      ],
    },
    {
      id: "who-sees-it",
      title: "Who sees it",
      blocks: [
        {
          kind: "p",
          text: "An application cannot be submitted without disclosure to third parties. We share the minimum each recipient needs, and only where the program or the law requires it.",
        },
        {
          kind: "list",
          items: [
            "Government departments and immigration authorities in the country you are applying to, and the units within them that assess applications.",
            "Government-authorised agents and promoters, where a program can only be filed through a licensed intermediary.",
            "International due-diligence firms appointed by the receiving government to run background checks.",
            "Banks, escrow agents, licensed funds, developers and other institutions where an investment or a qualifying deposit forms part of the route you choose.",
            "Translators, notaries, apostille services and courier companies handling your documents.",
            "Our professional advisers — external counsel, auditors and insurers — where they need it to advise us.",
            "IT and hosting providers who operate the systems our records sit in, under written instructions that they process data only for us.",
          ],
        },
        {
          kind: "p",
          text: "We will also disclose information where we are compelled to by a court, a regulator or applicable law. If we are ever asked for your file by a party not on this list, we will tell you unless we are legally prohibited from doing so.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "Sending information abroad",
      blocks: [
        {
          kind: "p",
          text: "By its nature this work moves information across borders: a Portuguese golden visa file is assessed in Portugal, a Caribbean citizenship file by that country's due-diligence unit. Your data will therefore be transferred outside the United Arab Emirates, including to countries whose data protection regime differs from the UAE's.",
        },
        {
          kind: "p",
          text: "Where a transfer is not to a jurisdiction recognised as providing an adequate level of protection, we rely on contractual safeguards with the recipient, or on the transfer being necessary to perform the contract you have asked us to carry out. You can ask us which basis applies to a particular transfer on your file.",
        },
      ],
    },
    {
      id: "how-long",
      title: "How long we keep it",
      blocks: [
        {
          kind: "list",
          items: [
            "Enquiries that do not become engagements — up to 24 months from your last contact with us, so that we can pick up a conversation where it left off.",
            "Client files — for the duration of the engagement and then for the period required of us as a licensed practice, which is currently seven years from the closure of the file.",
            "Anti-money-laundering and due-diligence records — for the minimum period required by the applicable regulations, even where the rest of the file has been closed.",
            "Marketing preferences — until you withdraw consent, plus a permanent suppression record so we do not contact you again by mistake.",
          ],
        },
        {
          kind: "p",
          text: "When a retention period ends, records are deleted or irreversibly anonymised. Where a document has been submitted to a government authority, that authority keeps its own copy under its own retention rules, which we do not control.",
        },
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      blocks: [
        {
          kind: "list",
          items: [
            "Files are held in access-controlled systems; a consultant sees a file because it has been assigned to them, not because they work here.",
            "Documents are encrypted in transit and at rest, and are exchanged with you through a secure channel rather than as loose email attachments.",
            "Every member of staff is bound by written confidentiality obligations that survive the end of their employment.",
            "Access is reviewed regularly, and removed on the day someone leaves or changes role.",
          ],
        },
        {
          kind: "p",
          text: "No system is perfect. If a breach occurs that is likely to put your rights or your application at risk, we will notify you and the competent authority without undue delay, and tell you plainly what happened and what we are doing about it.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        {
          kind: "p",
          text: "You can exercise any of the following at no charge, by writing to us at the address at the end of this page.",
        },
        {
          kind: "list",
          items: [
            "Access — ask for a copy of the personal data we hold about you.",
            "Correction — have inaccurate or incomplete information put right.",
            "Erasure — ask us to delete data we no longer have a lawful reason to keep.",
            "Restriction and objection — ask us to pause a particular use, or object to processing we carry out on the basis of legitimate interests.",
            "Portability — receive the data you gave us in a structured, machine-readable format, or have it sent to another adviser.",
            "Withdraw consent — for anything we do on the basis of consent, including marketing, with effect from the moment you tell us.",
            "Complain — to us first, and then to the UAE Data Office or, if you are in the EU or the UK, to your local supervisory authority.",
          ],
        },
        {
          kind: "p",
          text: "We respond within 30 days. Some rights have limits: we cannot delete records we are required to retain for anti-money-laundering purposes, and we cannot withdraw a document already lodged with a government authority.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and this website",
      blocks: [
        {
          kind: "p",
          text: "This site uses the smallest set of storage it can. Your language choice is kept in your browser's local storage so the page opens in the language you last used; it is not a tracking identifier and never leaves your device.",
        },
        {
          kind: "p",
          text: "Where we use analytics, it is configured to report on pages and referrers in aggregate rather than to build a profile of you, and IP addresses are truncated. We do not run advertising trackers or share website behaviour with advertising networks. Your browser's controls will let you clear or block this storage; the site will still work, but it will open in English each time.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          kind: "p",
          text: "Programs and regulations change, and this policy changes with them. The date at the top of this page is the version in force. Where a change materially affects how we use information on an open file, we will tell active clients directly rather than relying on this page alone.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact and complaints",
      blocks: [
        {
          kind: "p",
          text: "Questions about this policy, or a request to exercise one of the rights above, should go to our data protection contact:",
        },
        { kind: "p", text: CONTACT_LINE },
        {
          kind: "p",
          text: "If you are not satisfied with our answer, you may complain to the UAE Data Office. Complaining to a regulator does not affect any other remedy available to you.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------
   Terms
   ------------------------------------------------------------------ */

export const TERMS: LegalDoc = {
  eyebrow: "Terms",
  title: "The terms we work under.",
  lede: "What we do, what we do not do, what an engagement costs and what each of us is responsible for. Written in the same plain language we use in a consultation — because terms you cannot read are not terms you have agreed to.",
  updated: "6 September 2026",
  sections: [
    {
      id: "about",
      title: "About these terms",
      blocks: [
        {
          kind: "p",
          text: `These terms govern your use of this website and any consultation you book with ${SITE.legalName}. By using the site or booking a consultation, you accept them.`,
        },
        {
          kind: "p",
          text: "They are not the whole agreement for paid work. When you engage us on an application, you receive a separate written engagement letter and fee schedule covering that specific file. Where that document and this page disagree, the engagement letter governs.",
        },
      ],
    },
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          kind: "p",
          text: `${SITE.legalName} is a licensed residency, citizenship and global mobility consultancy based in ${SITE.address}.`,
        },
        { kind: "p", text: SITE.licence },
      ],
    },
    {
      id: "what-we-do",
      title: "What we do",
      blocks: [
        {
          kind: "p",
          text: "Our work is advisory and administrative. On a typical file that means:",
        },
        {
          kind: "list",
          items: [
            "Assessing your profile against the programs you may qualify for, and telling you which ones you do not.",
            "Recommending a route, with the costs, timelines and obligations of each option set out in writing.",
            "Preparing, checking and assembling the application file, including translations, legalisation and supporting evidence.",
            "Coordinating with government-authorised agents, due-diligence firms, banks, funds and developers on your behalf.",
            "Submitting the application through the correct channel and tracking it to a decision.",
            "Guiding you through what follows an approval — residence cards, oaths, registrations and renewal obligations.",
          ],
        },
      ],
    },
    {
      id: "what-we-are-not",
      title: "What we are not",
      blocks: [
        {
          kind: "p",
          text: "This section matters more than any other on this page. Please read it before you engage us.",
        },
        {
          kind: "list",
          items: [
            "We are not a government department, and we are not able to grant, refuse or accelerate a visa, residence permit or citizenship. Those decisions belong entirely to the authority concerned.",
            "We do not guarantee an outcome. No consultant honestly can. Where we quote approval rates or timelines, they describe past files and published government data, not a promise about yours.",
            "We do not provide legal advice, tax advice or investment advice. We will tell you when a question needs a lawyer, a tax adviser or a regulated financial adviser, and we can introduce you to one.",
            "We do not recommend a property, fund or development because a third party pays us to. Where any commission arrangement exists on a route we propose, we disclose it to you in writing before you commit.",
            "We do not work on routes that are not officially established, and we will not submit an application we believe to be untrue.",
          ],
        },
      ],
    },
    {
      id: "consultations",
      title: "Consultations and assessments",
      blocks: [
        {
          kind: "p",
          text: "The first consultation is free, lasts about thirty minutes and carries no obligation on either side. Its purpose is to establish whether a route exists for you and what it would realistically involve.",
        },
        {
          kind: "p",
          text: "An assessment given in a consultation, or produced by the eligibility check on this website, is an indication based on what you have told us. It is not an application, not a decision, and not a commitment by us to take on your file. A definitive answer follows the review of your documents.",
        },
      ],
    },
    {
      id: "fees",
      title: "Fees and payment",
      blocks: [
        {
          kind: "p",
          text: "You receive a written fee schedule before you commit to anything, and it separates three things that are too often bundled together:",
        },
        {
          kind: "list",
          items: [
            "Our professional fees — what we charge for the work described in your engagement letter, fixed at the outset and staged against milestones.",
            "Government and program fees — application, processing, due-diligence and contribution amounts set by the receiving state, paid to it, and outside our control.",
            "Third-party costs — translation, legalisation, courier, medical, police certificate, escrow and bank charges, quoted as accurately as we can and reconciled to actuals.",
          ],
        },
        {
          kind: "p",
          text: "Nothing is added later. If a program changes its fees mid-file, or an unforeseen document is required, we tell you before any cost is incurred and you decide whether to proceed. Invoices are payable within the period stated on them, and we may pause work on an overdue file after written notice.",
        },
      ],
    },
    {
      id: "your-obligations",
      title: "What we need from you",
      blocks: [
        {
          kind: "p",
          text: "Applications succeed or fail on the quality and honesty of the file. By engaging us you agree to:",
        },
        {
          kind: "list",
          items: [
            "Give complete and accurate information, including prior refusals, criminal matters and immigration history, even where you believe they will count against you.",
            "Provide genuine, unaltered documents, and originals or certified copies where a program requires them.",
            "Tell us promptly if your circumstances change — marriage, divorce, a new child, a change of employment, address or nationality — while a file is open.",
            "Respond to requests for information within the deadlines set by the authority, which we cannot extend.",
            "Meet the government and third-party payments on your file when they fall due.",
          ],
        },
        {
          kind: "p",
          text: "If information given to us proves to be false or materially incomplete, we will stop work immediately. Fees for work already performed remain payable, and we may be obliged to report the matter.",
        },
      ],
    },
    {
      id: "due-diligence",
      title: "Due diligence and cases we decline",
      blocks: [
        {
          kind: "p",
          text: "As a licensed practice we are required to verify your identity and the source of your funds before we act, and to keep those records. Programs run their own independent background checks in addition to ours.",
        },
        {
          kind: "p",
          text: "We may decline to act, or withdraw from a file, where we cannot complete those checks, where we believe an application will fail, or where proceeding would breach sanctions or anti-money-laundering obligations. We will always tell you why, in writing, and tell you what would change our answer.",
        },
      ],
    },
    {
      id: "timelines",
      title: "Timelines",
      blocks: [
        {
          kind: "p",
          text: "We quote the timelines programs actually deliver rather than the fastest case on record. Even so, processing time belongs to the authority. Draw schedules, policy changes, document backlogs, public holidays and requests for further evidence can all move a date, and none of them is within our control.",
        },
        {
          kind: "p",
          text: "Where a delay is caused by something we could have prevented, we will say so and correct it at our cost.",
        },
      ],
    },
    {
      id: "cancellation",
      title: "Cancellation and refunds",
      blocks: [
        {
          kind: "p",
          text: "Either of us may end the engagement on written notice. If you withdraw, you pay for the work completed up to that point and any third-party costs already committed; anything held on account and not yet earned is returned to you.",
        },
        {
          kind: "p",
          text: "Government fees, contributions and due-diligence charges are paid to the receiving state and its appointed agents. Whether any part of them is refundable after a refusal or withdrawal is a matter for that authority, and is stated in your fee schedule for the route you choose. We do not refund third-party amounts we have already paid on your behalf.",
        },
      ],
    },
    {
      id: "website",
      title: "Using this website",
      blocks: [
        {
          kind: "p",
          text: "The content of this site is published for general information. Program rules, thresholds and fees change frequently, and nothing here should be relied on as advice for your situation without speaking to a consultant.",
        },
        {
          kind: "list",
          items: [
            "The text, design, photography and marks on this site belong to us or our licensors. You may read, print and share pages for your own use; you may not republish or reuse them commercially without our written permission.",
            "You agree not to misuse the site — no attempts to gain unauthorised access, no automated scraping, no submission of false enquiries, and nothing that would interfere with its operation for others.",
            "Links to third-party sites, including government pages, are provided for convenience. We do not control their content and are not responsible for it.",
          ],
        },
      ],
    },
    {
      id: "liability",
      title: "Liability",
      blocks: [
        {
          kind: "p",
          text: "We are liable for our own professional negligence and we carry insurance against it. Nothing in these terms excludes liability that cannot lawfully be excluded, including for fraud.",
        },
        {
          kind: "p",
          text: "Subject to that, we are not liable for the decision of any government authority, for the performance of an investment, property or fund you choose, for the acts of a third party you appoint directly, or for a loss arising from information you gave us that was inaccurate or incomplete. Our total liability in connection with an engagement is limited to the professional fees you have paid us on that file.",
        },
        {
          kind: "p",
          text: "We are not liable for indirect or consequential loss, including lost profit or lost opportunity, arising from a delay or refusal.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality and your data",
      blocks: [
        {
          kind: "p",
          text: "Everything you tell us is confidential, and stays confidential after the engagement ends. We disclose it only to the authorities and partners your application requires, or where the law compels us.",
        },
        {
          kind: "p",
          text: "How we collect, use, store and share personal information — and the rights you have over it — is set out in full in our Privacy Policy, which forms part of these terms.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        {
          kind: "p",
          text: "We may update these terms as our services and the regulations change. The date at the top of this page is the version in force, and it applies from the moment it is published. The terms of an engagement already under way do not change without your written agreement.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          kind: "p",
          text: "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai, and the courts of Dubai have exclusive jurisdiction over any dispute arising from them.",
        },
        {
          kind: "p",
          text: "Before anything reaches a court we would rather talk. Raise a complaint with your consultant, or with us at the address below, and you will have a written response within one business day and a named person accountable for resolving it.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { kind: "p", text: "Questions about these terms:" },
        { kind: "p", text: CONTACT_LINE },
      ],
    },
  ],
};
