"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getBaseUrl } from "../../../../utils/api";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const defaultTimelineData = [
  { year: "1959", description: "Company established in Mumbai.", image: "/assets/about/industryIcons.png" },
  { year: "1966", description: "Expanded manufacturing operations.", image: "/assets/about/industryIcons.png" },
  { year: "1978", description: "Installed advanced machinery.", image: "/assets/about/industryIcons.png" },
  { year: "1985", description: "Expanded cable production facilities.", image: "/assets/about/industryIcons.png" },
  { year: "1988", description: "Adopted new cable technologies.", image: "/assets/about/industryIcons.png" },
  { year: "1995", description: "Started exporting globally.", image: "/assets/about/industryIcons.png" },
  { year: "2001", description: "Merger of RPC Cables Ltd. into KEC International Ltd.", image: "/assets/about/personIcon1.png" },
  { year: "2010", description: "Enhanced manufacturing capabilities.", image: "/assets/about/industryIcons.png" },
  { year: "2012", description: "Innovation in cable manufacturing.", image: "/assets/about/industryIcons.png" },
  { year: "2018", description: "Expanded presence across continents.", image: "/assets/about/industryIcons.png" },
  { year: "2022", description: "Digital transformation initiatives.", image: "/assets/about/industryIcons.png" },
  { year: "2023", description: "Focused on sustainable growth.", image: "/assets/about/industryIcons.png" },
];

export default function OurJourney({ dynamicData }: { dynamicData?: any }) {
  const [selectedYear, setSelectedYear] = useState("2001");
  const [visible, setVisible] = useState(true);

  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(6);
  const yearsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  const timelineData = dynamicData?.journeyCards?.length > 0 ? dynamicData.journeyCards : defaultTimelineData;

  const getImage = (imageStr: string, defaultImg: string) => {
    if (!imageStr) return defaultImg;
    if (imageStr.startsWith('http')) return imageStr;
    return `${getBaseUrl()}${imageStr.startsWith('/') ? '' : '/'}${imageStr}`;
  };

  useEffect(() => {
    // trigger a small fade-out then fade-in when the year changes
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [selectedYear]);

  useEffect(() => {
    const container = yearsRef.current;
    if (!container) return;
    const activeButton = container.querySelector(`[data-year="${activeIndex}"]`) as HTMLElement;
    if (!activeButton) return;
    const left = activeButton.offsetLeft - container.clientWidth / 2 + activeButton.clientWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [activeIndex]);

  const title = dynamicData?.journeyTitle || "Our Journey";

  return (
    <section className="bg-white py-20 company-slider">
      <div className="mx-auto max-w-[1274px] px-6">
        {/* Title */}
        <div className="text-center">
        <h2 className="mb-9 text-center font-[magistral] text-[32px] leading-[40px] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block px-1 italic" dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
      </div>
      </div>

      {/* Timeline - Full Width */}
      <div className="md:mb-12 overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
          <div ref={yearsRef} className="flex justify-center gap-8 mb-10 industries md:overflow-hidden overflow-x-auto">
            {timelineData.map((item: any, index: number) => (
              <button
                key={`${item.year}-${index}`}
                data-year={index}
                onClick={() => {
                  swiperRef.current?.slideTo(index);
                }}
                className={`transition-all shrink-0 duration-300 ${
                  activeIndex === index ? "text-[16px] md:text-[40px] font-bold text-[#1E3C8C]" : "text-[24px] text-[#C8D0E3]"
                }`}
              >
                <span className={`${activeIndex === index ? "text-[20px] md:text-[40px] font-bold" : "text-[16px] md:text-[24px]"}`}>
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-white md:pb-[2px]">
        <div className="md:ml-[5%] mr-auto max-w-[100%]">
          <Swiper
            slidesPerView={1.25}
            centeredSlides={true}
            spaceBetween={10}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            className="pb-10 md:pb-0"
          >
            {timelineData.map((item: any, index: number) => (
              <SwiperSlide key={`${item.year}-${index}`}>
                <div className="grid grid-cols-1 rounded-lg bg-white lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-[280] md:h-[480] overflow-hidden shadow-[3px_43px_250px_0px_#0000000D]">
                    <img
                      src={getImage(item.image, "/assets/about/industryIcons.png")}
                      alt={item.year}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col justify-center p-5 md:p-12">
                    <span className="text-[20px] md:text-[38px] text-[#1E3C8C]">
                      {item.year}
                    </span>
                    <p className="text-[#666]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
