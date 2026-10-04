import type { Metadata, Viewport } from "next";
import { getSiteMetadata } from '@/lib/seo';
import { LocaleHtmlLang } from "@/components/layout/LocaleHtmlLang";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return getSiteMetadata(lang);
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <LocaleHtmlLang lang={lang} />
      {children}
    </>
  );
}
