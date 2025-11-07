import React from "react";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import Header from "../components/Header/Header";
import MenuHeader from "../components/MenuHeader/MenuHeader";
import BaseFooter from "../components/BaseFooter";
import FooterBottom from "../components/Footer";
import requestConfig from "../../i18n/request";
import WhatsappIcon from "../assests/images/whatsapp.png"
import { Metadata } from "next";


interface LocaleLayoutProps {
  children: React.ReactNode;
  params:  Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Mawarid",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Mawarid.png`,
  },
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">): Promise<React.ReactNode> {
  const { locale } = await params;
  const resolvedLocale = locale ?? "ar";
  const isRtl = ["ar", "he"].includes(resolvedLocale);

  const messages = await requestConfig({
    requestLocale: Promise.resolve(resolvedLocale),
  });
  

  return (
    <NextIntlClientProvider messages={messages} locale={resolvedLocale}>
      <div dir={isRtl ? "rtl" : "ltr"}>
        <Header />
        <MenuHeader/>
        <main>{children}</main>
        <BaseFooter/>
        <FooterBottom />
        <a id="chat" className="chat" href="https://wa.me/966920028886" target="_blank">
        <Image src={WhatsappIcon} alt="whatsapp"/>
    </a>
      </div>
    </NextIntlClientProvider>
  );
}
