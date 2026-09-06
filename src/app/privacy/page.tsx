"use client";

import { PRIVACY } from "@/data/legal";
import LegalDocument from "@/components/LegalDocument";

export default function PrivacyPage() {
  return <LegalDocument doc={PRIVACY} siblingHref="/terms" siblingLabel="Read our Terms" />;
}
