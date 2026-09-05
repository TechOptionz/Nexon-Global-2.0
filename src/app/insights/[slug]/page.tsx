import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/ArticleView";
import { ARTICLES, ARTICLE_BY_SLUG } from "@/data/articles";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLE_BY_SLUG[slug];
  if (!a) return {};
  return { title: a.title.en, description: a.excerpt.en };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  if (!ARTICLE_BY_SLUG[slug]) notFound();
  return <ArticleView slug={slug} />;
}
