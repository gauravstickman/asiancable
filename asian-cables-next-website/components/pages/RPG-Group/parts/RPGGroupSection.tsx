"use client";

import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const content = {
  heading: [
    "A 5.2Bn Group with",
    "Businesses from major",
    "sectors of the economy.",
  ],
  descriptions: [
    "The RPG Group is one of India's leading diversified business conglomerates, built on a foundation of ethical leadership, professional governance, and long-term value creation. With a strong presence across infrastructure, engineering, technology, pharmaceuticals, and consumer businesses, the Group operates at the intersection of scale, capability, and responsibility.",

    "Founded by Shri R. P. Goenka in 1979, RPG has evolved into a globally respected enterprise with a multi-sector portfolio and international footprint. The RPG Group brings together diverse businesses, united by ethics, professional governance, and long-term value creation.",
  ],
  buttonText: "Visit RPG Website",
  image: "/assets/rpggroup/personImage.png",
};

export default function RPGGroupSection() {
  return (
    <section className="overflow-hidden py-14 sm:py-16 lg:py-24">
      <div className="mx-auto flex w-[92%] max-w-[1280px] flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-20">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-[580px] text-center lg:text-left">
          {/* HEADING */}
          <h2 className="text-[35px] font-[700] text-[#1E3C8C] italic sm:text-[36px] tracking-[-1px] sm:leading-[70px] lg:max-w-[540px] lg:text-[46px] lg:leading-[55px]">
            {content.heading.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h2>

          {/* DESCRIPTION */}
          <div className="mt-7 space-y-2 sm:mt-8">
            {content.descriptions.map((text, index) => (
              <p
                key={index}
                className="text-[15px] leading-[28px] text-[#525252] sm:text-[15px] sm:leading-[30px]"
              >
                {text}
              </p>
            ))}
          </div>

          {/* BUTTON */}
          <button className="border-it-b flex h-[48px] w-[162px] w-fit justify-center items-center py-3 px-6 gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-[59px] md:mb-[37.61px]">
             {content.buttonText}
            <span>
              <ChevronRight size={18} />
            </span>
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full max-w-[640px]">
          {/* IMAGE CONTAINER */}
          <div className="group relative">
        
            {/* IMAGE */}
            <img
              src={content.image}
              alt="RPG Group"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* SOFT OVERLAY */}
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1C4A]/10 via-transparent to-white/10" /> */}

            {/* SHINE EFFECT */}
            {/* <div className="absolute top-0 -left-40 h-full w-24 rotate-12 bg-white/20 blur-2xl transition-all duration-1000 group-hover:left-[120%]" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
