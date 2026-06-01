"use client";

import { useState } from "react";

const accordionData = [
  {
    title: "Renewable Energy Cables",
    content:
      "Advanced renewable energy cable systems engineered for solar, wind, and clean energy infrastructure projects.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Telecom & Optical Fibre Cables",
    content:
      "High-performance cables designed for scalable telecom networks, broadband infrastructure, and high-speed data transmission.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Railway Cables",
    content:
      "Reliable railway cable solutions engineered for signaling, rolling stock, and rail infrastructure.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Conductors",
    content:
      "Premium-grade conductors designed for efficient power transmission and industrial infrastructure.",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Elastomeric & Mining Cables",
    content:
      "Heavy-duty elastomeric and mining cables built for harsh industrial and underground environments.",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Specialty & Industrial Cables",
    content:
      "Custom-engineered specialty cable solutions tailored for industrial and mission-critical operations.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function EngineeringAccordionSection({ dynamicData }: { dynamicData?: any }) {
  const [activeIndex, setActiveIndex] = useState(0); // Safest to default to 0

  const finalAccordionData = dynamicData?.items && dynamicData.items.length > 0
    ? dynamicData.items.map((item: any, i: number) => ({
        title: item.title,
        content: item.description || item.content,
        image: item.image || accordionData[i % accordionData.length].image,
        link: item.link
      }))
    : accordionData;

  return (
    <section className="reveal-section bg-[#f6f6f6] py-8 md:pb-[182px] md:pt-[92px]">
      <div className="mx-auto max-w-[1272px] px-5 md:px-0">
        {/* HEADING */}
        <div className="mb-8 text-center md:mb-[91px]">
          <h2 className="mx-auto max-w-[700px] text-[32px]  text-[#1E3C8C] italic  font-[700] md:text-[46px] leading-[100%] tracking-[-2%]">
            {dynamicData?.title || "Engineering Trust. Enabling Progress."}
          </h2>
          {dynamicData?.tagline && (
            <p className="mt-4 text-[18px] text-[#6F6F6F]">{dynamicData.tagline}</p>
          )}
        </div>

        {/* CONTENT */}
        {/* DESKTOP */}
        <div className="hidden grid-cols-2 items-start gap-[80px] lg:grid">
          {/* LEFT IMAGE */}
          <div className="relative h-[100%] h-[590px] overflow-hidden rounded-[6px]">
            <img
              src={finalAccordionData[activeIndex]?.image}
              alt="Engineering"
              className="h-full w-full object-cover transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* RIGHT ACCORDION */}
          <div className="flex flex-col pt-2">
            {finalAccordionData.map((item: any, index: number) => {
              const active = activeIndex === index;

              return (
                <div key={index} className="relative">
                  <button
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full cursor-pointer text-left ${
                      index === 0 ? "pt-0 pb-[10.6px]" : "py-5"
                    } ${active ? "text-[#1E3C8C]" : "text-[#8B8B8B]"}`}
                  >
                    <h3
                      className={`text-[23.99px] leading-[39.98px] tracking-[-3%] font-[600] italic ${
                        active ? "text-[#1E3C8C]" : "text-[#8B8B8B]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </button>

                  <div
                    className={`relative mt-1 h-[2px] w-full overflow-hidden ${
                      active ? "bg-[#D9D9D9]" : "bg-transparent"
                    }`}
                  >
                    {active && (
                      <div className="absolute bottom-0 left-0 h-full w-[72%] bg-gradient-to-r from-[#F7C948] via-[#F28C8C] to-[#6EC1FF]" />
                    )}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-0 ${
                      active
                        ? "max-h-[300px] pb-1 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mb-3 max-w-[620px] pt-5 text-[16px] leading-[1.3] text-[#6F6F6F]">
                      {item.content}
                    </p>

                    <button className="text-[16px] font-medium text-[#1E3C8C] hover:underline">
                      Learn more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE */}
        {/* MOBILE */}
        <div className="flex flex-col gap-4 lg:hidden">
          {finalAccordionData.map((item: any, index: number) => {
            const active = activeIndex === index;

            return (
              <div
                key={index}
                className={`pb-2 ${
                  active
                    ? "border-b border-[transparent]"
                    : "border-b border-transparent"
                }`}
              >
                {/* TITLE */}
                <button
                  onClick={() => setActiveIndex(index)}
                  className="w-full text-left"
                >
                  <h3
                    className={`text-[23.99px] leading-[39.99px] font-[700] tracking-[-3%] italic transition ${
                      active ? "text-[#1E3C8C]" : "text-[#8B8B8B]"
                    }`}
                  >
                    {item.title}
                  </h3>
                </button>

                {/* DIVIDER */}
                <div
                  className={`relative mt-4 h-[2px] w-full overflow-hidden ${
                    active ? "bg-[#D9D9D9]" : "bg-transparent"
                  }`}
                >
                  {active && (
                    <div className="absolute bottom-0 left-0 h-full w-[72%] bg-gradient-to-r from-[#F7C948] via-[#F28C8C] to-[#6EC1FF]" />
                  )}
                </div>

                {/* ACCORDION CONTENT */}
                <div
                  className={`overflow-hidden transition-all duration-0 ${
                    active ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="mt-5 overflow-hidden rounded-[4px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[369px] w-full object-cover"
                    />
                  </div>

                  {/* TEXT */}
                  <p className="mt-[21.33px] text-[16px] leading-[17.33px] tracking-[-0.4%] text-[#6B6B6B]">
                    {item.content}
                  </p>

                  <button className="mt-[10.66px] text-[16px] leading-[15.99px] tracking-[-0.4%]  font-medium text-[#1E3C8C]">
                    Learn more
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
