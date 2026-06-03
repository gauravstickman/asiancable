"use client";

import React from "react";

const values = [
  {
    title: "UNLEASH TALENT",
    desc: "Enabling an environment for people to unleash their entrepreneurial spirit and realise their full potential.",
  },
  {
    title: "TOUCH LIVES",
    desc: "To understand, care and make a meaningful difference to customers, employees, society and all stakeholders.",
  },
  {
    title: "OUT PERFORM",
    desc: "Sustained and clear outperformance relative to all our competitors and industry benchmarks.",
  },
  {
    title: "HELLO HAPPINESS",
    desc: "To have fun by creating a high-energy environment with a keen sense of belonging.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto w-[92%] max-w-[1250px]">
        
        {/* TITLE */}
        <h2
          className="
            mb-14
            text-center
            text-[38px]
            font-[700]
            italic
            tracking-[-1px]
            text-[#1E3C8C]
          "
        >
          Core Values
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map((item, index) => (
            <div
              key={index}
              className="
                group
                rounded-[4px]
                border
                border-[#8B8B8B33]
                bg-[#B7B7B71A]
                px-6
                py-10
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]
              "
            >
              {/* ICON */}
              <div className="mb-6 flex justify-center">
                <img
                  src="/assets/rpggroup/boldpower.png"
                  alt=""
                  className="
                    h-10
                    w-10
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              {/* TITLE */}
              <h3
                className="
                  mb-4
                  text-[20px]
                  font-medium
                  tracking-wide
                  text-[#1E3C8C]
                "
              >
                {item.title}
              </h3>

              {/* DESC */}
              <p
                className="
                  text-[14px]
                  font-normal
                  leading-[24px]
                  text-[#6F6F6FB2]
                "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}