import type { Metadata } from 'next';
import { NAUTICMIXXX_VERSION, NAUTICMIXXX_SITE, NAUTICMIXXX_REPO, NAUTICMIXXX_RELEASE, nauticMixxxPage } from './nauticmixxx';

export const SITE_URL = 'https://nauticboy.top';
export const getSiteMetadata = (lang: string): Metadata => {
  const isEs = lang === 'es';
  const title = isEs ? 'Nautic Boy & Studio | Mezcla, mastering y música electrónica' : 'Nautic Boy & Studio | Mixing, mastering & electronic music';
  const description = isEs
    ? 'Producción de música electrónica, mezcla y mastering con Nautic Boy & Studio. Escuchá trabajos y lanzamientos, explorá templates y descubrí NauticMixxx y NauticPlayer.'
    : 'Electronic music production, mixing and mastering by Nautic Boy & Studio. Explore selected work, releases, templates, NauticMixxx and NauticPlayer.';
  return {
    metadataBase: new URL(SITE_URL), title, description,
    authors: [{ name: 'Nautic Boy & Studio' }],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    alternates: { canonical: `/${lang}`, languages: { en: '/en', es: '/es', 'x-default': '/' } },
    openGraph: {
      type: 'website', siteName: 'Nautic Boy & Studio', url: `${SITE_URL}/${lang}`, title, description,
      locale: isEs ? 'es_AR' : 'en_US', alternateLocale: isEs ? ['en_US'] : ['es_AR'],
      images: [{ url: '/images/studio.jpg', alt: 'Nautic Studio — mixing and mastering' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/studio.jpg'] },
  };
};

export const getSiteSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Nautic Boy & Studio', inLanguage: ['en', 'es'] },
    { '@type': 'WebPage', '@id': `${SITE_URL}/${lang}#webpage`, url: `${SITE_URL}/${lang}`, name: getSiteMetadata(lang).title, inLanguage: lang, isPartOf: { '@id': `${SITE_URL}/#website` }, mentions: { '@id': `${NAUTICMIXXX_SITE}/#software` } },
    {
      '@type': 'SoftwareApplication', '@id': `${NAUTICMIXXX_SITE}/#software`, name: 'NauticMixxx',
      url: nauticMixxxPage(lang), sameAs: NAUTICMIXXX_REPO,
      applicationCategory: 'MultimediaApplication', operatingSystem: 'macOS Apple Silicon, Windows x64', softwareVersion: NAUTICMIXXX_VERSION,
      image: `${SITE_URL}/images/nauticmixxx-icon.png`, releaseNotes: NAUTICMIXXX_RELEASE,
      license: `${NAUTICMIXXX_REPO}/blob/v${NAUTICMIXXX_VERSION}/LICENSE.md`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: NAUTICMIXXX_RELEASE },
    },
  ],
});

