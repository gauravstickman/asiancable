"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

const leaders = [
  {
    name: "Cameron Williamson",
    role: "Senior Sustainability Consultant",
    image: "/assets/about/personIcon.png",
  },
  {
    name: "Courtney Henry",
    role: "Energy Analysts",
    image: "/assets/about/personIcon1.png",
  },
  {
    name: "Dianne Russell",
    role: "Senior Renewable Energy Engineer",
    image: "/assets/about/personIcon2.png",
  },
  {
    name: "Cameron Williamson",
    role: "Senior Sustainability Consultant",
    image: "/assets/about/personIcon.png",
  },
  {
    name: "Courtney Henry",
    role: "Energy Analysts",
    image: "/assets/about/personIcon1.png",
  },
  {
    name: "Dianne Russell",
    role: "Senior Renewable Energy Engineer",
    image: "/assets/about/personIcon2.png",
  },
];

export default function LeadershipTeam() {
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="mb-10 px-5 flex items-center justify-between">
          <div>
            <h2 className="font-[magistral] text-[46px] leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]">
              Leadership Team
            </h2>

            <p className="mt-3 font-[work_sans] text-[17px] leading-[25.5px] font-normal text-[#525252]">
              Meet the visionaries driving Asian Cables forward
            </p>
          </div>
          <div>
            <button className="border-it-b cursor-pointer mx-auto flex items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] px-5 py-2 text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-[59px] md:mb-[37.61px]">
              View Leadership
              <span>
                <ChevronRight size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="animate-marquee hover:[animation-play-state:paused] flex w-max gap-[33px]">
            {/* First Set */}
            {leaders.map((leader, index) => (
              <div key={index} className="max-w-[260px] min-w-[260px]">
                {/* Image */}
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[371px] w-[314px] rounded-[4px] full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex w-full flex-row items-start justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      {leader.name}
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  <img
                    src="/assets/about/linkdinIcon.png"
                    alt="LinkedIn"
                    className="h-6 w-6 object-contain cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* Duplicate */}
            {leaders.map((leader, index) => (
              <div key={`dup-${index}`} className="max-w-[260px] min-w-[260px]">
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[371px] w-[314px] rounded-[4px] full object-cover"
                  />
                </div>

                <div className="flex w-full flex-row items-start justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <h3 className="font-[figtree] text-[16px] leading-[24px] font-medium tracking-[-0.010] text-[#1D1F1E]">
                      {leader.name}
                    </h3>

                    <p className="font-[figtree] text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  <img
                    src="/assets/about/linkdinIcon.png"
                    alt="LinkedIn"
                    className="h-6 w-6 object-contain cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
