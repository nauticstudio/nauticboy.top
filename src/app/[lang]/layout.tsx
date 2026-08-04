import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export const metadata: Metadata = {
  metadataBase: new URL("https://nauticboy.top"),
  title: "Nautic Boy & Studio | Electronic Music Production",
  description: "Elevating electronic music from the booth to the final master. Producer, DJ and Mix & Mastering Engineer. Studio services, DJ sets and production templates.",
  keywords: ["mixing", "mastering", "DJ", "producer", "templates", "electronic music", "audio engineering", "nautic studio", "nautic boy", "music production", "ableton live", "techno"],
  authors: [{ name: "Nautic Boy & Studio" }],
  openGraph: {
    type: "website",
    url: "https://nauticboy.top/",
    title: "Nautic Boy & Studio",
    description: "Elevating electronic music from the booth to the final master. Producer, DJ and Mix & Mastering Engineer.",
    images: [{ url: "/images/studio.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nautic Boy & Studio",
    description: "Elevating electronic music from the booth to the final master. Producer, DJ and Mix & Mastering Engineer.",
    images: ["/images/studio.jpg"],
  },
};

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
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
