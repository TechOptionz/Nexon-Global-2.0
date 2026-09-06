"use client";

import { TERMS } from "@/data/legal";
import LegalDocument from "@/components/LegalDocument";

export default function TermsPage() {
  return <LegalDocument doc={TERMS} siblingHref="/privacy" siblingLabel="Read our Privacy Policy" />;
}
