'use client';

import React, { useEffect, useRef } from 'react';
import { GlowButton } from '../ui/GlowButton';
import { Send } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/dictionaries';

interface ContactFormProps {
  dict: Dictionary;
}

const inputStyles =
  'w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 transition-all focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/25';

const labelStyles =
  'block font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500 mb-3';

export const ContactForm: React.FC<ContactFormProps> = ({ dict }) => {
  const nextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set the success URL directly on the hidden input (external DOM sync)
    if (nextInputRef.current) {
      nextInputRef.current.value = new URL('./success', window.location.href).href;
    }
  }, []);

  return (
    <form
      action="https://formsubmit.co/53d80d68db36dcd2dd6a289cf9c0d041"
      method="POST"
      className="grid md:grid-cols-2 gap-6"
    >
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_captcha" value="false" />
      <input ref={nextInputRef} type="hidden" name="_next" defaultValue="" />

      <div className="space-y-6">
        <div>
          <label htmlFor="contact-name" className={labelStyles}>{dict.form_name}</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            placeholder={dict.form_name_ph}
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelStyles}>{dict.form_email}</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="contact-service" className={labelStyles}>{dict.form_service}</label>
          <select
            id="contact-service"
            name="subject"
            required
            className={`${inputStyles} appearance-none cursor-pointer`}
          >
            <option value="Mixing" className="bg-neutral-900">Mixing</option>
            <option value="Mastering" className="bg-neutral-900">Mastering</option>
            <option value="DJ Set / Live Act" className="bg-neutral-900">DJ Set / Live Act</option>
            <option value="Templates" className="bg-neutral-900">Templates</option>
            <option value="Other" className="bg-neutral-900">{dict.form_other}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="contact-message" className={labelStyles}>{dict.form_message}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={8}
          placeholder={dict.form_message_ph}
          className={`${inputStyles} flex-grow resize-none`}
        />
      </div>

      <div className="md:col-span-2 mt-4">
        <GlowButton wrapperClassName="w-full" className="w-full gap-3 py-5 text-lg">
          <Send size={20} />
          {dict.form_submit}
        </GlowButton>
      </div>
    </form>
  );
};
