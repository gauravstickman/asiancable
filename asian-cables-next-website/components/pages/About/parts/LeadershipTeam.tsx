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
            <h2 className="text-[46px] font-bold text-[#1E3C8C] italic">
              Leadership Team
            </h2>

            <p className="font-normal text-[16px] text-[#525252]">
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
          <div className="animate-marquee flex w-max gap-6">
            {/* First Set */}
            {leaders.map((leader, index) => (
              <div key={index} className="max-w-[260px] min-w-[260px]">
                {/* Image */}
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[340px] w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="mt-4 px-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] tracking-wide  font-medium text-[#1D1F1E]">
                      {leader.name}
                    </h3>

                    <p className="mt-1 text-[12px] font-normal text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  <img
                    src="/assets/about/linkdinIcon.png"
                    alt="LinkedIn"
                    className="h-8 w-8 object-contain cursor-pointer"
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
                    className="h-[340px] w-full object-cover"
                  />
                </div>

                <div className="mt-4 px-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] tracking-wide font-medium text-[#1D1F1E]">
                      {leader.name}
                    </h3>

                    <p className="mt-1 font-normal text-[13px] text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  <img
                    src="/assets/about/linkdinIcon.png"
                    alt="LinkedIn"
                    className="h-8 w-8 object-contain cursor-pointer"
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
