import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StudioSection } from '@/components/sections/StudioSection';
import { ReleasesSection } from '@/components/sections/ReleasesSection';
import { TemplatesSection } from '@/components/sections/TemplatesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SoftwareSection } from '@/components/sections/SoftwareSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <main id="top" className="min-h-screen">
      <Navbar dict={dict} lang={lang} />
      <HeroSection dict={dict} />
      
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-brand-accent/20 to-transparent" />
        <StudioSection dict={dict} />
      </div>

      <ReleasesSection dict={dict} />
      <TemplatesSection dict={dict} />
      <PortfolioSection dict={dict} />
      <SoftwareSection dict={dict} />
      <AboutSection dict={dict} />
      <ReviewsSection dict={dict} />
      <ContactSection dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
