"use client";
import React from "react";
import Counter from "./counter";
import Slider from "react-slick";

export interface AchieveItem {
  Header: string;
  Value: string;
  SubHeader?: string;
  Currencycode?: string;
  Magnitude?: string;
}

export interface AchieveProps {
  achieve: AchieveItem[];
  locale?: "ar" | "en";
}

export default function Achievements({ achieve, locale }: AchieveProps) {
  

  const texts = {
    head1: locale==='ar'? "اتنا" : "OUR",
    head2:locale==='ar'? "انجاز" : "ACHIEVEMENTS",
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // rtl: isRtl,
  };

  return (
    <section className="counter-box mb-counter-box px-6 text-center" id="Achievements">
      {/* Heading */}
      <div className="xl:hidden pt-4 pb-6">
        <h5 className="mb-1">{texts.head1}</h5>
        <h1 className="theme-color">{texts.head2}</h1>
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:flex flex-wrap justify-center pt-6 pb-10">
        {achieve.map((item, idx) => (
          <AchievementItem key={idx} item={item} />
        ))}
      </div>

      {/* Mobile / Tablet */}
      <div className="xl:hidden container mx-auto pt-6 pb-10 achieve">
        <Slider {...settings}>
          {achieve.map((item, idx) => (
            <div key={idx}>
              <AchievementItem item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

/* Individual Achievement Item */
function AchievementItem({ item }: { item: AchieveItem }) {
  return (
    <div className="counter text-center xl:py-16">
      <div className="inline-block">
        {/* Number Row */}
        <div className="flex justify-center items-baseline">
          <h3 className="inline-block font-bold text-gray-800">+</h3>
          <h3 className="inline-block font-bold text-gray-800">
            <Counter value={parseInt(item.Value)} duration={2500} idx={2} />
          </h3>

          {item.Magnitude && (
            <h3 className="inline-block font-bold text-gray-800">{item.Magnitude}</h3>
          )}

          {item.Currencycode && (
            <p className="inline-block text-xl font-normal text-black-600 ml-1 relative top-1">
              {item.Currencycode}
            </p>
          )}
        </div>

        {/* Text Row */}
        <h6 className="theme-color">
          {item.Header}
          {item.SubHeader && <span className="text-gray-800 font-normal"> {item.SubHeader}</span>}
        </h6>
      </div>
    </div>
  );
}
