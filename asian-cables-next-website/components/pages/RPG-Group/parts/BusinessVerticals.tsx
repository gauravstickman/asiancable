"use client";

import React from "react";

const verticals = [
  {
    title: "Infrastructure & Engineering",
    icon: "/assets/rpggroup/buildingIcon.png",
  },
  {
    title: "Information Technology (IT Services)",
    icon: "/assets/rpggroup/translateIcon.png",
  },
  {
    title: "Energy & Industrial Solutions",
    icon: "/assets/rpggroup/boltpowerIcon.png",
  },
  {
    title: "Automotive (Tyres)",
    icon: "/assets/rpggroup/wheelIcon.png",
  },
  {
    title: "Pharmaceuticals & Life Sciences",
    icon: "/assets/rpggroup/pillIcons.png",
  },
  {
    title: "Plantations & Agri Business",
    icon: "/assets/rpggroup/cartlargeIcons.png",
  },
];

export default function BusinessVerticals() {
  return (
    <section className="bg-[#F8F8F8] py-20">
      <div className="mx-auto w-[92%] max-w-[1250px]">
        {/* HEADING */}
        <h2 className="mb-14 text-center text-[38px] font-[700] tracking-[-1px] text-[#1E3C8C] italic">
          Business Verticals
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item, index) => (
            <div
              key={index}
              className="group flex h-[260px] flex-col items-center justify-center rounded-[4px] border border-[#EFEFEF] bg-white px-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-7 flex h-[72px] w-[72px] items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img
                  src={item.icon}
                  alt=""
                  className="h-[60px] w-[60px] object-contain"
                />
              </div>

              <h3 className="text-[15px] mt-7 tracking-wide leading-[24px] font-[500] text-[#1E3C8C]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
