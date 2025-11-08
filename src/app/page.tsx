// app/page.tsx
import Image from 'next/image';
import React from 'react';
import Home from './Pages/Home';
import Header from "./components/Header/Header";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import BaseFooter from "./components/BaseFooter";
import FooterBottom from "./components/Footer";
import WhatsappIcon from "./assests/images/whatsapp.png"

export const dynamic = "force-dynamic";

export default function RootPage() {
  return (
    <>
     <main lang="ar" dir="rtl" className="bg-white text-gray-900">
      <Header />
      <MenuHeader />
     
        <Home locale="ar" />
     
      <BaseFooter />
      <FooterBottom />
      <a id="chat" className="chat" href="https://wa.me/966920028886" target="_blank">
              <Image src={WhatsappIcon} alt="whatsapp"/>
          </a>
      </main>
    </>
  );
}