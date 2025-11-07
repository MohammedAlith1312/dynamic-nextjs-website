import React from "react";
import Slider from "./serviceslider";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

export interface Action {
  Text: string;
  Value: string;
}

export interface AboutItem {
  RecId: number;
  Header?: string;
  subHeader?: string;
  Description?: string;
  WhatHeSaid?: string;
  Name?: string;
  position?: string;
  Image?: string;
  imgposition?: "Left" | "Right" | null;
  IsBackground?: "True" | "False" | null;
  action?: string | null;
}

export interface ServicePageItem {
  Header?: string;
  SubHeader?: string;
  Description?: string;
  slides?: string;
  action?: string | null;
  steps: string;
  stepsHeader: string;
  stepsDescription: string;
}

export interface CombinedProps {
  aboutItems?: AboutItem[];
  serviceItems?: ServicePageItem[];
  locale: "en" | "ar";
}

export default function ServicesSection({
  aboutItems,
  serviceItems,
  locale,
}: CombinedProps) {
  const dataList = aboutItems ?? serviceItems ?? [];

  const sortedList =
    "Order" in (dataList[0] || {})
      ? [...dataList].sort((a: any, b: any) => a.Order - b.Order)
      : dataList;

  return (
    <>
      {sortedList.map((x: any, index: number) => {
        // Parse action JSON
        let parsedAction: Record<string, string> | null = null;
        if (x.action) {
          try {
            parsedAction = JSON.parse(x.action);
          } catch (err) {
            console.warn("Invalid action JSON for item:", x.Header || index);
          }
        }

        const actionText = parsedAction ? Object.keys(parsedAction)[0] : null;
        let actionValue = parsedAction ? Object.values(parsedAction)[0] : null;

        if ((actionValue?.includes(".html"))&&(!actionValue?.startsWith("https://"))) {
          actionValue = actionValue.replace(".html", "");
        }

        let finalActionValue = actionValue;
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

        if (
          actionValue &&
          !actionValue.startsWith("http://") &&
          !actionValue.startsWith("https://") &&
          !actionValue.includes(`/${locale}/`)
        ) {
          finalActionValue = `${basePath}/${locale}/${actionValue.startsWith("/") ? actionValue.slice(1) : actionValue}`;
        }

        // Parse slides JSON
        let slideImages: string[] = [];
        if (x.slides) {
          try {
            const slides = x.slides.replace(/\r?\n/g, "").trim();
            const parsedSlides = JSON.parse(slides);
            slideImages = Object.values(parsedSlides).map((url: any) =>
              url.replace(/\\\\/g, "/")
            );
          } catch (err) {
            console.warn("Invalid slides JSON:", x.slides, err);
          }
        }

        // Parse steps JSON
        let parsedSteps: Record<string, string | null> = {};
        if (x.steps) {
          try {
            parsedSteps = JSON.parse(x.steps);
          } catch (err) {
            console.warn("Invalid steps JSON:", x.steps);
          }
        }

        // ✅ Proper checks for Arabic & English headers
        const isHemah = x.Header === "HEMAH" || x.Header === "همّه";
        const isHemahTech = x.Header === "HEMAHTECH" || x.Header === "همه ـتك";
        const isSawaid = x.Header === "SAWAID" || x.Header === "سواعد";

        return (
          <div key={x.RecId || index} className="container px-4 mx-auto">
            <div className="pt-12 py-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 lg:w-1/2 about_section">
                  {x.Header && (
                    <h3 className="text-4xl font-Header mb-2">{x.Header}</h3>
                  )}

                  {x.Header && (
                    <h3
                      className="text-3xl font-bold mb-2"
                      style={{
                        color: isHemah || isHemahTech
                          ? "#dc1e35"
                          : isSawaid
                          ? "#6ec498"
                          : "#fdbd3f",
                      }}
                    >
                      {x.SubHeader}
                    </h3>
                  )}

                  {x.Description && (
                    <p className="text-gray-600 mb-3">{x.Description}</p>
                  )}
                  {x.WhatHeSaid && <p className="mb-2">{x.WhatHeSaid}</p>}
                  {x.Name && <h6 className="font-medium">{x.Name},</h6>}
                  {x.position && (
                    <span className="text-yellow-500">{x.position}</span>
                  )}

                  {(x.stepsHeader || Object.keys(parsedSteps).length > 0) && (
                    <div className="mt-12">
                      {x.stepsHeader && (
                        <h4 className="text-2xl">{x.stepsHeader}</h4>
                      )}
                      {x.stepsDescription && (
                        <p className="text-gray-700">{x.stepsDescription}</p>
                      )}

                      {Object.entries(parsedSteps).length > 0 && (
                        <ul className="list-disc ml-8 mt-2">
                          {Object.entries(parsedSteps).map(([label, value], i) => (
                            <li key={i}>
                              <span>{label}</span>{" "}
                              <span className="theme-color">
                                {value ?? ""}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end">
                    {x.Header && actionText && actionValue && (
                      <a
                        href={
                          isHemah || isHemahTech || isSawaid
                            ? actionValue ?? undefined
                            : finalActionValue ?? undefined
                        }
                        target={
                          isHemah || isHemahTech || isSawaid ? "_blank" : ""
                        }
                        rel="noopener noreferrer"
                        className={`inline-block mt-4 px-2 py-2 border-2 text-white transition-all duration-300
                          ${
                            isHemah || isHemahTech
                              ? "bg-[#dc1e35] border-[#dc1e35] hover:bg-transparent hover:text-[#dc1e35]"
                              : isSawaid
                              ? "bg-[#6ec498] border-[#6ec498] hover:bg-transparent hover:text-[#6ec498]"
                              : "bg-[#fdbd3f] border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f]"
                          }`}
                      >
                        {actionText}
                      </a>
                    )}
                  </div>
                </div>

                {/* Right-side image or slider */}
                {(!x.imgposition ||
                  x.imgposition === "Right" ||
                  x.imgposition === "null") && (
                  <>
                    {serviceItems && slideImages.length > 0 ? (
                      <div className="w-full md:w-1/2 text-center">
                        <Slider slideImages={slideImages} header={x.Header} />
                      </div>
                    ) : (
                      x.Image && (
                        <div className="w-full md:w-1/2 text-center">
                          <img
                            src={x.Image}
                            alt={x.Header || "Image"}
                            width="80%"
                            className="h-full object-contain rounded-lg"
                          />
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
