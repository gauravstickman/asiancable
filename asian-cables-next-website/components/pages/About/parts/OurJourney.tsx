"use client";

import { useEffect, useState } from "react";

const timelineData = [
  {
    year: "1959",
    description: "Company established in Mumbai.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "1966",
    description: "Expanded manufacturing operations.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "1978",
    description: "Installed advanced machinery.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "1985",
    description: "Expanded cable production facilities.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "1988",
    description: "Adopted new cable technologies.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "1995",
    description: "Started exporting globally.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "2001",
    description: "Merger of RPC Cables Ltd. into KEC International Ltd.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "2010",
    description: "Enhanced manufacturing capabilities.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "2012",
    description: "Innovation in cable manufacturing.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "2018",
    description: "Expanded presence across continents.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "2022",
    description: "Digital transformation initiatives.",
    image: "/assets/about/industryIcons.png",
  },
  {
    year: "2023",
    description: "Focused on sustainable growth.",
    image: "/assets/about/industryIcons.png",
  },
];

export default function OurJourney() {
  const [selectedYear, setSelectedYear] = useState("2001");
  const [visible, setVisible] = useState(true);

  const selectedData =
    timelineData.find((item) => item.year === selectedYear) || timelineData[0];

  // Keep the left image static so only the content area updates
  const imageSrc = timelineData[0].image;

  useEffect(() => {
    // trigger a small fade-out then fade-in when the year changes
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [selectedYear]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Title */}

        <h2 className="mb-9 text-center font-[magistral] text-[46px] leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          Our Journey
        </h2>
      </div>

      {/* Timeline - Full Width */}

      <div className="mb-12 overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

          <div className="animate-marquee flex w-max gap-[50px]">
            {/* FIRST SET */}
            {timelineData.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`font-worksans flex min-w-[100px] cursor-pointer items-center justify-center  leading-[57.67px] font-semibold text-[#1E3C8C] transition-all duration-300 ${
                  selectedYear === item.year
                    ? "text-[48px] font-black text-[#1E3C8C]"
                    : "text-[28px] font-semibold text-[#C8D0E3]"
                }`}
              >
                {item.year}
              </button>
            ))}

            {/* DUPLICATE FOR CONTINUOUS SCROLL */}
            {timelineData.map((item) => (
              <button
                key={`dup-${item.year}`}
                onClick={() => setSelectedYear(item.year)}
                className={`font-worksans flex min-w-[100px] cursor-pointer items-center justify-center  leading-[57.67px] font-semibold text-[#1E3C8C] transition-all duration-300 ${
                  selectedYear === item.year
                    ? "text-[48px] font-black text-[#1E3C8C]"
                    : "text-[28px] font-semibold text-[#C8D0E3]"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-[#FFFFFF] bg-[#FFFFFF] shadow-md lg:grid-cols-2">
          {/* Image */}

          <div className="h-[500px]">
            <img
              src={imageSrc}
              alt="Our journey"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}

          <div
            className={`flex flex-col justify-center bg-white p-12 transition-all duration-300 ${
              visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
            aria-live="polite"
          >
            <h3 className="mb-3 text-[56px] font-light text-[#1E3C8C]">
              {selectedData.year}
            </h3>

            <p className=" font-worksans text-[16px] leading-[27.2px] font-normal text-[#666]">
              {selectedData.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
