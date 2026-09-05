import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationView from "@/components/DestinationView";
import { DESTINATIONS, DESTINATION_ORDER } from "@/data/destinations";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DESTINATION_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = DESTINATIONS[slug];
  if (!d) return {};
  return { title: d.title, description: d.intro };
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  if (!DESTINATIONS[slug]) notFound();
  return <DestinationView slug={slug} />;
}
