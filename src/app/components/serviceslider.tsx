"use client";
import React from "react";
import Slider from "react-slick";
import { useLocale } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ClientSliderProps {
  slideImages: string[];
  header?: string;
}

export default function ClientSlider({ slideImages, header }: ClientSliderProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: isRTL,
    pauseOnHover: true,
  };

  return (
    <div className="col-lg-6 text-center">
      <div
        className={`${isRTL ? "rtl" : "ltr"} ba-img`}
        style={{ height: "470px" }}
      >
        {/* Inner slide wrapper */}
        <div className="insideSlide">
         
            <ul className="slides ">
              <Slider {...sliderSettings}>
                {slideImages.map((src, idx) => (
                  <li key={idx} className="h-[330px] w-full flex justify-center items-center">
                    <img
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        
                      }}
                      draggable="false"
                    />
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        </div>
      </div>

  );
}
