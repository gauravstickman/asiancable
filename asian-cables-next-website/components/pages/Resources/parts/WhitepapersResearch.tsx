"use client";

import { ChevronRight, Download } from "lucide-react";

const sample = [
  {
    title: "Future of Cable Technology in Renewable Energy",
    desc: "Comprehensive analysis of cable requirements for solar and wind installations",
    author: "Dr. Rajesh Kumar, CTO",
    date: "March 2024",
    href: "/assets/resources/whitepaper-1.pdf",
  },
  {
    title: "Smart Grid Integration: Challenges and Solutions",
    desc: "Technical insights on integrating advanced cables with smart grid infrastructure",
    author: "Priya Sharma, Head of R&D",
    date: "February 2024",
    href: "/assets/resources/whitepaper-2.pdf",
  },
  {
    title: "Sustainability in Cable Manufacturing",
    desc: "Our approach to eco-friendly manufacturing and circular economy practices",
    author: "Amit Patel, VP Operations",
    date: "January 2024",
    href: "/assets/resources/whitepaper-3.pdf",
  },
];

export default function WhitepapersResearch() {
  return (
    <section className="reveal-section bg-white py-8 md:py-16">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-[Magistral] text-[46px] leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
            Whitepapers & Research
          </h2>

          <button className="border-it-b flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174]">
            View All
            <span>
              <ChevronRight size={18} />
            </span>
          </button>
        </div>

        <div className="flex w-[1270px] flex-col gap-[24px]">
          {sample.map((item, idx) => (
            <div
              key={idx}
              className="flex h-[190px] w-[1290px] gap-6 rounded-[4px] border-[2px] border-transparent bg-[#1E3C8C0A] pt-[42px] pr-[42px] pb-[42px] pl-[42px]"
            >
              <div className="mr-6 mt-5">
                <img
                  src="/assets/resources/Lightbulb.png"
                  alt="icon"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="text-[22px] leading-[33px] font-medium tracking-[0px] text-[#1E3C8C]">
                  {item.title}
                </p>
                <p className="text-[15px] leading-[25.5px] font-normal tracking-[0px] text-[#525252]">
                  {item.desc}
                </p>
                <div className="mt-4 flex gap-6">
                  <p className="text-[13px] leading-[19.5px] font-medium tracking-[0px] text-[#767676]">
                    {item.author}
                  </p>
                  <p className="text-[13px] leading-[19.5px] font-normal tracking-[0px] text-[#767676]">
                    {item.date}
                  </p>
                </div>
              </div>

              <div className="ml-6 flex flex-col items-end">
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-center text-[14px] leading-[21px] font-semibold tracking-[0px] text-[#1E3C8C]"
                >
                  <Download size={16} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
