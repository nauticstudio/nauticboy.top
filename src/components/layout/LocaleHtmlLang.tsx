'use client';

import React, { useEffect } from 'react';

export const LocaleHtmlLang: React.FC<{ lang: string }> = ({ lang }) => {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
};
