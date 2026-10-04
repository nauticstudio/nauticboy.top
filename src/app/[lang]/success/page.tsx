import type { Metadata } from 'next';
import React from 'react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SuccessClient } from './SuccessClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'es' ? 'Mensaje enviado | Nautic Boy & Studio' : 'Message sent | Nautic Boy & Studio',
    robots: { index: false, follow: true },
    alternates: { canonical: `/${lang}/success`, languages: {} },
  };
}

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-brand-accent/10 blur-[130px] animate-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] rounded-full bg-brand-violet/10 blur-[130px] animate-drift-slow"
      />
      <SuccessClient dict={dict} lang={lang} />
    </main>
  );
}
