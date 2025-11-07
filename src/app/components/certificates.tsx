"use client";
import '../index.css'

import React, { useState, useEffect } from "react";

export interface Certificate {
  Title: string;
  Order: number;
  Image?: string;
}

interface CertificateProps {
  certificateEn: Certificate[];
  certificateAr: Certificate[];
  locale: "ar" | "en";
}

export default function Certificates({
  certificateEn,
  certificateAr,
  locale,
}: CertificateProps) {
  const certificateList = locale === "ar" ? certificateAr : certificateEn;
  const sortedList = [...certificateList].sort((a, b) => a.Order - b.Order);
  const headingText = locale === "ar" ? "شهادات الأيزو" : "ISO CERTIFICATES";
  const isRtl = locale === "ar";

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft")
        setActiveIndex((prev) =>
          prev !== null
            ? (prev - 1 + sortedList.length) % sortedList.length
            : null
        );
      if (e.key === "ArrowRight")
        setActiveIndex((prev) =>
          prev !== null ? (prev + 1) % sortedList.length : null
        );
    };
    window.addEventListener("keyup", handleKey);
    return () => window.removeEventListener("keyup", handleKey);
  }, [activeIndex, sortedList.length]);

  // Handlers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + sortedList.length) % sortedList.length : null
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % sortedList.length : null
    );
  };

  const closeDarkbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(null);
  };

  return (
    <section className="container mx-auto mt-3 px-4" dir={isRtl ? "rtl" : "ltr"}>
      {/* Heading */}
      <h3 className="mb-5 text-[#53585b] text-2xl font-semibold">
        {headingText}
      </h3>

      {/* Certificates Grid */}
      <div className="certificates flex flex-wrap justify-center">
        {sortedList.map((cert, idx) => (
          <div key={idx} className="text-center w-1/2 md:w-1/2 lg:w-1/4 p-2">
            {cert.Image && (
              <img
                src={cert.Image}
                alt={cert.Title}
                className="mx-auto rounded-md shadow-md cursor-pointer"
                onClick={() => setActiveIndex(idx)}
              />
            )}
            <span className="cir-title block mt-2 text-gray-700 font-medium">
              {cert.Title}
            </span>
          </div>
        ))}
      </div>

      {/* Darkbox (old style) */}
      {activeIndex !== null && (
        <div
          id="darkbox"
          className="show"
          style={{
            backgroundImage: `url(${sortedList[activeIndex].Image})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={closeDarkbox}
        >
          <a id="darkbox_prev" onClick={handlePrev}></a>
          <a id="darkbox_next" onClick={handleNext}></a>
          <a id="darkbox_close" onClick={closeDarkbox}></a>

          <div id="darkbox_description">{sortedList[activeIndex].Title}</div>
          <div id="darkbox_stats">
            {activeIndex + 1}/{sortedList.length}
          </div>
        </div>
      )}
    </section>
  );
}
