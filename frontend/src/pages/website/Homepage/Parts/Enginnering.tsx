"use client";

import { useState } from "react";

const accordionData = [
  {
    title: "Renewable Energy Cables",
    content:
      "Advanced renewable energy cable systems engineered for solar, wind, and clean energy infrastructure projects.",
  },
  {
    title: "Telecom & Optical Fibre Cables",
    content:
      "High-performance cables designed for scalable telecom networks, broadband infrastructure, and high-speed data transmission, built to meet carrier-grade compliance and evolving bandwidth demands.",
  },
  {
    title: "Railway Cables",
    content:
      "Reliable railway cable solutions engineered for signaling, rolling stock, and critical rail infrastructure applications.",
  },
  {
    title: "Conductors",
    content:
      "Premium-grade conductors designed for efficient power transmission and industrial infrastructure.",
  },
  {
    title: "Elastomeric & Mining Cables",
    content:
      "Heavy-duty elastomeric and mining cables built for harsh industrial and underground environments.",
  },
  {
    title: "Specialty & Industrial Cables",
    content:
      "Custom-engineered specialty cable solutions tailored for industrial and mission-critical operations.",
  },
];

export default function EngineeringAccordionSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="bg-[#f6f6f6] py-24">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-20">
          <h2 className="text-[#1E3C8C] text-[46px] leading-[1.3] font-black italic max-w-[700px] mx-auto">
            Engineering Trust. Enabling Progress.
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT IMAGE */}
          <div className="relative  max-h-[550px] rounded-[6px] overflow-hidden">

            <img
              src="/src/assets/engineering.png"
              alt="Engineering"
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* RIGHT ACCORDION */}
          <div className="flex flex-col">

            {accordionData.map((item, index) => {
              const active = activeIndex === index;

              return (
                <div
                  key={index}
                  className="relative"
                >
                 
                  <button
                    onClick={() => setActiveIndex(index)}
                   className={`w-full text-left transition ${
  index === 0 ? "pt-0 pb-5" : "pt-5 pb-5"
} ${
  active
    ? "text-[#1E3C8C]"
    : "text-[#8B8B8B]"
}`}
                  >
                    <h3
                      className={`text-[23px] leading-tight font-black italic transition ${
                        active
                          ? "text-[#1E3C8C]"
                          : "text-[#8B8B8B]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </button>

                     {active && (
  <div className="h-[2px] w-full bg-[#D9D9D9] relative overflow-hidden">
    
    {/* GRADIENT ACTIVE LINE */}
    <div className="absolute left-0 top-auto bottom-0 h-full w-[72%] bg-gradient-to-r from-[#F7C948] via-[#F28C8C] to-[#6EC1FF]" />
  
  </div>
)}

                  {/* CONTENT */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      active
                        ? "max-h-[300px] pb-8 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="pt-5 text-[16px] leading-[1.4] text-[#6B6B6B] max-w-[620px] mb-6">
                      {item.content}
                    </p>

                    <button className="text-[#1E3C8C] text-[16px] font-medium hover:underline">
                      Learn more
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}