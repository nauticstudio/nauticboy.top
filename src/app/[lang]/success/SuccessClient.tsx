'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/dictionaries';

interface SuccessClientProps {
  dict: Dictionary;
  lang: string;
}

export const SuccessClient: React.FC<SuccessClientProps> = ({ dict, lang }) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/${lang}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, lang]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl w-full mx-4 relative z-10 text-center"
    >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-3xl shadow-2xl">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-accent/30"
        >
          <CheckCircle className="text-brand-accent" size={48} />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-white mb-4">{dict.success_title}</h1>
        <p className="text-gray-400 text-lg mb-10">
          {dict.success_desc}
        </p>
        
        <div className="space-y-6">
          <GlowButton href={`/${lang}`} wrapperClassName="w-full" className="w-full">
            {dict.success_cta}
          </GlowButton>
          
          <p className="text-gray-500 text-sm">
            {dict.success_redirect.replace('{seconds}', String(seconds))}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
