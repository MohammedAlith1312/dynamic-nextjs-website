// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getMessages } from '../app/lib/api';

const locales = ['en', 'ar'];
const defaultLocale = 'ar'; 

export default getRequestConfig(async () => {
  const locale: any = defaultLocale;

  const apiResponse = await getMessages(locale);
  if (!apiResponse || Object.keys(apiResponse).length === 0) notFound();

  const apiMessages = apiResponse.result || apiResponse;

  return { locale, messages: apiMessages };
});
