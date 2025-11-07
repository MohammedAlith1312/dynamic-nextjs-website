// app/[locale]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Home from '../Pages/Home';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Valid locales list
const VALID_LOCALES = ['ar', 'en'];

// export async function generateStaticParams() {
//   return [
//     { locale: 'ar' },
//     { locale: 'en' },
//   ];
// }

export default async function LocalePage(props: any) {
  const { params } = await props;
  const locale = params?.locale;
  
  // CRITICAL: Validate locale - trigger 404 if invalid
  if (!locale || !VALID_LOCALES.includes(locale)) {
    notFound();
  }
  
  const isRtl = locale === 'ar';

  return (
    <main lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="bg-white text-gray-900">
      <Home locale={locale}/>
    </main>
  );
}