import type { Metadata, Viewport } from "next";
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
  const isEs = lang === 'es';

  const title = isEs
    ? "Nautic Boy & Studio | Producción de Música Electrónica"
    : "Nautic Boy & Studio | Electronic Music Production";
  const description = isEs
    ? "Elevando la música electrónica desde la cabina hasta el master final. Productor, DJ e ingeniero de mezcla y mastering. Servicios de estudio, sets de DJ y templates de producción."
    : "Elevating electronic music from the booth to the final master. Producer, DJ and Mix & Mastering Engineer. Studio services, DJ sets and production templates.";

  return {
    metadataBase: new URL("https://nauticboy.top"),
    title,
    description,
    keywords: ["mixing", "mastering", "DJ", "producer", "templates", "electronic music", "audio engineering", "nautic studio", "nautic boy", "music production", "ableton live", "techno", "mezcla", "produccion musical"],
    authors: [{ name: "Nautic Boy & Studio" }],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      type: "website",
      url: `https://nauticboy.top/${lang}`,
      title,
      description,
      images: [{ url: "/images/studio.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/studio.jpg"],
    },
  };
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
