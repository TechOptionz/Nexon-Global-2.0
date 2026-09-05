import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceView from "@/components/ServiceView";
import { SERVICES, SERVICE_ORDER } from "@/data/services";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sv = SERVICES[slug];
  if (!sv) return {};
  return { title: sv.title, description: sv.intro };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  if (!SERVICES[slug]) notFound();
  return <ServiceView slug={slug} />;
}
