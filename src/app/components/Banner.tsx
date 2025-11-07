"use client";
import React from "react";
import Slider from "react-slick";

export interface BannerItem {
  RecId: number;
  BannerText: string;
  BannerSubText: string;
  position?: string;
  Image?: string;
  imgposition?: "Left" | "Right" | null;
  IsBackground?: "True" | "False" | null;
  action?: string | null;
  Order: number;
}

export interface BannerProps {
  banners: BannerItem[];
  locale: "ar" | "en";
}

export default function Banner({ banners, locale }: BannerProps) {
  const isRtl = locale === "ar";
  const sortedBanners = [...banners].sort((a, b) => a.Order - b.Order);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: isRtl,
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`banner w-screen`}
    >
      {sortedBanners.length > 1 ? (
        <div className={isRtl ? "rtl" : "ltr"}>
        <Slider {...settings} className="rounded-white">
          {sortedBanners.map((banner) => (
            <BannerSlide key={banner.RecId} banner={banner} isRtl={isRtl} />
          ))}
        </Slider>
        </div>
      ) : (
        sortedBanners.map((banner) => (
          <BannerSlide key={banner.RecId} banner={banner} isRtl={isRtl} />
        ))
      )}
    </div>
  );
}

function BannerSlide({
  banner,
  isRtl,
}: {
  banner: BannerItem;
  isRtl: boolean;
}) {
  return (
    <div className="relative p-1 md:h-4/6 w-full overflow-hidden bannerimg-top">
      {banner.Image && (
        <img
          src={banner.Image}
          alt="banner"
          draggable="false"
          className="h-full object-c0ntain"
        />
      )}

      <div className="container mx-auto">
        <div
          className={`banner-text flex-caption px-6 absolute top-10 font-bold ${
            isRtl ? "text-right" : "text-left"
          } flex flex-col gap-4 lg:gap-6`}
        >
          {banner.BannerText && (
            <h1 className=" text-gray-600 text-5xl xl:text-6xl">
              {banner.BannerText}
            </h1>
          )}
          {banner.BannerSubText && (
            <h1 className=" text-4xl xl:text-5xl text-white">
              {banner.BannerSubText}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
