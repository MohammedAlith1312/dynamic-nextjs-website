"use client";

import { useEffect } from "react";
import { initGA } from "./lib/gtag";

export default function AnalyticsProvider() {
  useEffect(() => {
    initGA();
  }, []);
  return null;
}
