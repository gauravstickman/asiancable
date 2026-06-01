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
    <section className="reveal-section overflow-hidden bg-[#ffffff] py-10 md:pt-[140px]">
      <div className="mx-auto max-w-[100%]">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-[64px ]">
          <h2 className="text-[32px]  text-[#1E3C8C] italic font-[700] md:text-[46px] leading-[100%] tracking-[-2%]">
            What Our Clients Say
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-hidden md:mb-[37px]">
          <div className="animate-marquee flex w-max gap-6 md:gap-[32px]">
            {/* FIRST SET */}
            {displayTestimonials.map((item, index) => (
              <div
                key={index}
                className="flex h-[290px] max-w-[460px] min-w-[460px] flex-col justify-between rounded-[2px] bg-[#3CAADF12] p-6"
              >
                {/* TEXT */}
                <p className="text-[16px] md:text-[18px] leading-[150%] text-[#03020B]">
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
                    <h4 className="mb-[4px] text-[16px] leading-[150%] font-[700] text-[#03020B] italic">
                      {item.name}
                    </h4>

                    <p className="relative flex items-center gap-[12px] text-[14px] leading-[150%] text-[#767676]"> <span
    className="absolute left-0 top-0 right-auto h-[20px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  /> <bdi className="block pl-3">{item.role}</bdi></p>
                  </div>
                </div>
              </div>
            ))}

            {/* DUPLICATE */}
            {displayTestimonials.map((item, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex h-[290px] max-w-[460px] min-w-[460px] flex-col justify-between rounded-[6px] bg-[#3CAADF12] p-6"
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

                     <p className="relative flex items-center gap-[12px] text-[14px] leading-[150%] text-[#767676]"> <span
    className="absolute left-0 top-0 right-auto h-[20px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  /> <bdi className="block pl-3">{item.role}</bdi></p>
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
