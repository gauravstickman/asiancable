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
    <section className="overflow-hidden py-12">
      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-hero text-center font-[magistral] text-[46px] font-bold tracking-[0px] text-[#1E3C8C] italic">
          The RPG Group Ecosystem
        </h2>
        <p className="dm-font text-body text-center text-[19.77px] font-normal tracking-[0px] text-[#525252]">
          A diversified conglomerate with leading brands across multiple
          industries
        </p>
      </div>

      {/* MARQUEE WRAPPER */}
      <div className="relative right-1/2 left-1/2 mt-15 -mr-[50vw] -ml-[50vw] w-screen py-8">
        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max gap-8 bg-gray-50">
            {[...cards, ...cards].map((card, index) => (
              <div
                key={index}
                className={`group relative flex h-[364px] w-[408px] flex-col rounded-t-[8.6px] shadow-sm transition-all duration-10 ease-in-out hover:rounded-[8.6px] hover:border hover:border-[2.87px] hover:border-[#1E3C8C99] hover:shadow-[0_8px_30px_rgba(22,59,140,0.12)]`}
              >
                {/* TOP SECTION */}
                <div className="flex flex-1 items-center justify-center rounded-t-[8px] bg-white">
                  <img
                    src={card.icon}
                    // alt={card.title}
                    className="h-[70px] w-[240px] object-contain"
                  />
                </div>

                {/* BOTTOM SECTION */}
                <div className="flex flex-1 flex-col justify-start bg-[#1E3C8C0F] p-5">
                  <p className="text-center text-[20.06px] leading-[25.79px] font-medium tracking-[0px] text-[#525252]">
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
