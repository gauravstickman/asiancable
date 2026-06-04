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
    <section className="bg-[#F8F8F8] py-15">
      <div className="mx-auto w-[92%] max-w-[1250px]">
        {/* HEADING */}
        <h2 className="font-magistral mb-10 text-hero text-center text-[46px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          Business Verticals
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item, index) => (
            <div
              key={index}
              className="group relative flex h-[321px] w-[401px] flex-col items-center justify-center rounded-[4px] border-2 border-white bg-white p-[2px] px-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-7 flex h-[72px] w-[72px] items-start justify-center transition-all duration-300 group-hover:scale-105">
                <img
                  src={item.icon}
                  alt=""
                  className="h-[80px] w-[80px] object-contain"
                />
              </div>

              <h3 className="font-inter  text-center mt-13 text-[20px] font-medium tracking-[0px] text-[#1E3C8C]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
