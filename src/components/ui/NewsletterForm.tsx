'use client';

import React, { useEffect, useRef } from 'react';

interface NewsletterFormProps {
  placeholder: string;
  submitLabel: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ placeholder, submitLabel }) => {
  const nextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nextInputRef.current) {
      nextInputRef.current.value = window.location.href;
    }
  }, []);

  return (
    <form
      action="https://formsubmit.co/53d80d68db36dcd2dd6a289cf9c0d041"
      method="POST"
      className="flex gap-2"
    >
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Newsletter subscription — nauticboy.top" />
      <input ref={nextInputRef} type="hidden" name="_next" defaultValue="" />

      <label htmlFor="newsletter-email" className="sr-only">{placeholder}</label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 transition-all focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/25 flex-grow"
      />
      <button
        type="submit"
        aria-label={submitLabel}
        className="btn-shimmer bg-brand-accent text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-glow transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
};
