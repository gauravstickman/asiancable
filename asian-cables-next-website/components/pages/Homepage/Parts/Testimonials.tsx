"use client";

const testimonials = [
  {
    text: `"Asian Cables exceeded expectations. Their team collaborated seamlessly, resulting in a visually stunning and functional end product."`,
    name: "Danny Tanner",
    role: "Co-Founder | Atomic",
    image: "/assets/engineering.png",
  },
  {
    text: `"We’ve partnered with several providers in the past, but none compared to Asian Cables’ meticulous attention to detail and true dedication to our needs. They made the whole experience seamless — and the outcomes are undeniable."`,
    name: "Lynn Tanner",
    role: "Co-Founder | Atomic",
    image: "/assets/engineering.png",
  },
  {
    text: `"Working with Asian Cables was like discovering a fresh wave of innovation. They grasped our goals immediately and transformed them into reality with skillful execution and daring design elements."`,
    name: "Kevin Arnold",
    role: "Co-Founder | Atomic",
    image: "/assets/engineering.png",
  },
];

import { getBaseUrl } from "../../../../utils/api";

export default function TestimonialsSection({ dynamicData }: { dynamicData?: any[] }) {
  const displayTestimonials = dynamicData && dynamicData.length > 0
    ? dynamicData.map((item: any) => ({
        text: item.quote ? `"${item.quote}"` : item.text ? `"${item.text}"` : item.description ? `"${item.description}"` : "",
        name: item.name,
        role: item.company ? `${item.position || ""} | ${item.company}` : item.position || "",
        image: item.image?.startsWith("http")
          ? item.image
          : item.image
          ? `${getBaseUrl()}${item.image}`
          : "/assets/engineering.png",
      }))
    : testimonials;

  return (
    <section className="reveal-section overflow-hidden bg-[#ffffff] py-10 md:py-24">
      <div className="mx-auto max-w-[100%]">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-[32px] leading-none font-black text-[#1E3C8C] italic md:text-[46px]">
            What Our Clients Say
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-hidden">
          <div className="animate-marquee flex w-max gap-6">
            {/* FIRST SET */}
            {displayTestimonials.map((item, index) => (
              <div
                key={index}
                className="flex h-[290px] max-w-[460px] min-w-[460px] flex-col justify-between rounded-[6px] bg-[#EEF3F6] p-10"
              >
                {/* TEXT */}
                <p className="text-[17px] leading-[1.5] text-[#111111]">
                  {item.text}
                </p>

                {/* PROFILE */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="mb-2 text-[16px] leading-none font-black text-black italic">
                      {item.name}
                    </h4>

                    <p className="text-[14px] text-[#8B8B8B]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* DUPLICATE */}
            {displayTestimonials.map((item, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex h-[290px] max-w-[460px] min-w-[460px] flex-col justify-between rounded-[6px] bg-[#EEF3F6] p-10"
              >
                {/* TEXT */}
                <p className="text-[17px] leading-[1.5] text-[#111111]">
                  {item.text}
                </p>

                {/* PROFILE */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="mb-2 text-[16px] leading-none font-black text-black italic">
                      {item.name}
                    </h4>

                    <p className="text-[14px] text-[#8B8B8B]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
