// src/lib/gtag.ts

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Your GA4 measurement IDs (can store in .env)
export const GA_MEASUREMENT_ID = "G-9ECQC0GP8T";
export const AW_CONVERSION_ID = "AW-754789799";

// Initialize GA manually (safe for client only)
export const initGA = () => {
  if (typeof window !== "undefined" && !window.dataLayer) {
    window.dataLayer = [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    // @ts-ignore
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
    gtag("config", AW_CONVERSION_ID);
  }
};

// Log custom events
export const logEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, params);
    console.log("📊 GA Event logged:", action, params);
  } else {
    console.warn("gtag not initialized yet");
  }
};
