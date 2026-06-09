"use client";

import { ChevronRight, Download } from "lucide-react";

export default function WhitepapersResearch({ data }: { data?: any }) {
  const sample = data?.whitepapersList && data.whitepapersList.length > 0
    ? data.whitepapersList.map((item: any) => ({
        title: item.title,
        desc: item.description,
        author: item.author,
        date: item.date,
        href: item.downloadLink || "#",
        icon: item.icon || "/assets/resources/Lightbulb.png",
        downloadText: item.downloadText || "Download",
      }))
    : [
        {
          title: "Future of Cable Technology in Renewable Energy",
          desc: "Comprehensive analysis of cable requirements for solar and wind installations",
          author: "Dr. Rajesh Kumar, CTO",
          date: "March 2024",
          href: "/assets/resources/whitepaper-1.pdf",
          icon: "/assets/resources/Lightbulb.png",
          downloadText: "Download",
        },
        {
          title: "Smart Grid Integration: Challenges and Solutions",
          desc: "Technical insights on integrating advanced cables with smart grid infrastructure",
          author: "Priya Sharma, Head of R&D",
          date: "February 2024",
          href: "/assets/resources/whitepaper-2.pdf",
          icon: "/assets/resources/Lightbulb.png",
          downloadText: "Download",
        },
        {
          title: "Sustainability in Cable Manufacturing",
          desc: "Our approach to eco-friendly manufacturing and circular economy practices",
          author: "Amit Patel, VP Operations",
          date: "January 2024",
          href: "/assets/resources/whitepaper-3.pdf",
          icon: "/assets/resources/Lightbulb.png",
          downloadText: "Download",
        },
      ];

  return (
    <section className="reveal-section bg-white py-8 md:py-16">
      <div className="mx-auto max-w-[1320px] md:pl-0 pl-5">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="font-[Magistral] text-[29px] leading-[55.2px] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
            {data?.whitepapersTitle || "Whitepapers & Research"}
          </h2>

          <a href={data?.whitepapersViewAllLink || "#"} className="border-it-b md:mt-0 mt-5 flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174]">
            View All
            <span>
              <ChevronRight size={18} />
            </span>
          </a>
        </div>

        <div className="flex flex-nowrap overflow-x-auto industries  md:flex-col gap-[24px]">
          {sample.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex md:flex-row  flex-col md:h-[190px] md:min-w-[1290px] md:min-w-[auto] min-w-[80vw] gap-6 rounded-[4px] border-[2px] border-transparent bg-[#1E3C8C0A] md:pt-[42px] md:pr-[42px] md:pb-[42px] md:pl-[42px] p-6"
            >
              <div className="mr-6 md:mt-5">
                <img
                  src={item.icon}
                  alt="icon"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="text-[20px] md:text-[22px] leading-[33px] font-medium tracking-[0px] text-[#1E3C8C]">
                  {item.title}
                </p>
                  <div className="mt-1 mb-4 flex gap-6 md:hidden">
                  <p className="text-[13px] leading-[19.5px] font-medium tracking-[0px] text-[#76767680]">
                    {item.author}
                  </p>
                  <p className="text-[13px] leading-[19.5px] font-normal tracking-[0px] text-[#76767680]">
                    {item.date}
                  </p>
                </div>
                <p className="text-[14    px] md:text-[15px] leading-[25.5px] font-normal tracking-[0px] text-[#525252]">
                  {item.desc}
                </p>
                <div className="mt-4 md:flex gap-6 hidden">
                  <p className="text-[13px] leading-[19.5px] font-medium tracking-[0px] text-[#767676]">
                    {item.author}
                  </p>
                  <p className="text-[13px] leading-[19.5px] font-normal tracking-[0px] text-[#767676]">
                    {item.date}
                  </p>
                </div>
              </div>

              <div className="md:ml-6 flex flex-col md:items-end md:mt-0 mt-3">
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-center text-[14px] leading-[21px] font-semibold tracking-[0px] text-[#1E3C8C]"
                >
                  <Download size={16} />
                  <span>{item.downloadText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
