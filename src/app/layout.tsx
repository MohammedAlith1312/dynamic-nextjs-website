import { FaAngleUp } from "react-icons/fa6";
import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import AngleUp from '@/app/components/AngleUpIcon'

import requestConfig from "../i18n/request";
import Script from "next/script";
import AnalyticsProvider from "./AnalyticsProvider";


export const metadata: Metadata = {
  title: "Mawarid",
  description: "Mawarid Manpower Solutions",
icons: {
       icon: './Mawarid.png',
     }
};

export default async function RootLayout({ children, params }:any) {
 const { locale } = await params;
   const resolvedLocale = locale ?? "ar";
   const isRtl = ["ar"].includes(resolvedLocale);
 
   const messages = await requestConfig({
     requestLocale: Promise.resolve(resolvedLocale),
   });

  return (
    <html lang={locale} >
      <body>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
              var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-PP2F4JF7');
          `}
        </Script>

        {/* ✅ Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PP2F4JF7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* ------------------------------------------------------- */}
        {/* ✅ GOOGLE ANALYTICS (GA4 or Google Ads) */}
        {/* ------------------------------------------------------- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-754789799"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-754789799');
          `}
        </Script>

        {/* FTS Google analytics */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9ECQC0GP8T"
          strategy="afterInteractive"
        />
        <Script id="ga-ga4" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9ECQC0GP8T');
  `}
        </Script>

        {/* ------------------------------------------------------- */}
        {/* ✅ AMPLITUDE ANALYTICS */}
        {/* ------------------------------------------------------- */}
        <Script
          src="https://cdn.amplitude.com/script/9285b8043473709cedc35d531d00e488.js"
          strategy="afterInteractive"
        />
        <Script id="amplitude-init" strategy="afterInteractive">
  {`
    window.addEventListener('load', function() {
      if (window.amplitude && window.amplitude.init) {
        try {
          if (window.sessionReplay && window.sessionReplay.plugin) {
            window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
          }
          window.amplitude.init('9285b8043473709cedc35d531d00e488', {
            fetchRemoteConfig: true,
            autocapture: true
          });
          console.log("✅ Amplitude initialized successfully");
        } catch (err) {
          console.warn("⚠️ Amplitude init failed:", err);
        }
      } else {
        console.warn("⚠️ Amplitude SDK not loaded yet");
      }
    });
  `}
</Script>


        {/* ------------------------------------------------------- */}
        {/* ✅ TIKTOK PIXEL */}
        {/* ------------------------------------------------------- */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie"];
              ttq.setAndDefer = function (t, e) {
                t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) }
              };
              for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
              ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                return e
              };
              ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = i;
                ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
                ttq._o = ttq._o || {}; ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript"; o.async = !0; o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a)
              };
              ttq.load('D2RFC33C77UCDUAMLVF0');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        <Script id="tiktok-event" strategy="afterInteractive">
          {`ttq.track('EventName', { content_name: 'example', value: 10 });`}
        </Script>

        <AnalyticsProvider />
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div dir={isRtl ? "rtl" : "ltr"}></div>
       <main>{children}</main>
       {/* <a id="totop" href="#top" className="top-visible">
        <i><FaAngleUp /></i>
    </a> */}

    <AngleUp/>
   
    
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
