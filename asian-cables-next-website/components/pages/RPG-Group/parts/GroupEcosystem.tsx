"use client";

import React from "react";

const cards = [
  {
    icon: "/assets/rpggroup/img-1.png",
    description:
      "A pharmaceutical company with a strong portfolio in branded formulations, generics, and synthetic APIs.",
  },
  {
    icon: "/assets/rpggroup/img-2.png",
    description:
      "A leading cable manufacturing company delivering high-performance power, telecom, and industrial cable solutions.",
  },
  {
    icon: "/assets/rpggroup/img-3.png",
    description:
      "A specialist provider of engineering products and services for power, oil & gas, and industrial applications.",
  },
];

export default function GroupEcosystem() {
  return (
    <section className="py-12 overflow-hidden">
      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-[magistral] text-[46px] font-bold italic text-hero text-[#1E3C8C] text-center tracking-[0px]">
          The RPG Group Ecosystem
        </h2>
        <p className="font-[work_sans] font-normal text-body text-[19.77px] text-[#525252] text-center tracking-[0px]">
          A diversified conglomerate with leading brands across multiple industries
        </p>
      </div>

      {/* MARQUEE WRAPPER */}
      <div className="relative mt-15 py-8 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max gap-8 bg-gray-50">
            {[...cards, ...cards].map((card, index) => (
              <div
                key={index}
                className={`group relative flex flex-col w-[408px] h-[364px]
                border border-transparent shadow-sm
                transition-all duration-300
                hover:bg-[#163B8C]/5
                hover:shadow-[0_8px_30px_rgba(22,59,140,0.12)]`}
              >
                {/* TOP SECTION */}
                <div className="flex-1 flex items-center justify-center bg-white">
                  <img
                    src={card.icon}
                    // alt={card.title}
                    className="h-[70px] w-[240px] object-contain"
                  />
                </div>

                {/* BOTTOM SECTION */}
                <div className="flex-1 bg-[#F3F4F6] p-5 flex flex-col justify-start">
                  <p className="font-worksans font-medium text-subheading text-[#525252] tracking-[0px] text-center]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* MARQUEE ANIMATION */}
      <style>{`
        .animate-marquee {
          display: flex;
          animation: marquee 18s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee > * {
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}