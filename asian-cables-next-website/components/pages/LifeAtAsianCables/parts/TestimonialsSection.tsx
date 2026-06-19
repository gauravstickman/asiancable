"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const staticTestimonials = [
  {
    name: "Poonam Rankawat",
    role: "Manager – Design",
    company: "11 Years at Asian Cables",
    text: "My journey at KEC Asian Cables has been defined by continuous learning, meaningful opportunities, and a strong sense of purpose. Culture is the soul of any organisation - it reflects its beliefs and values, and more importantly, how they are lived every day. At KEC Asian Cables, this is evident in a positive and engaging work environment where motivation and job satisfaction are visible across all levels. The balance between accountability and support empowers individuals to take ownership while staying aligned and inspired.",
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"],
  },
  {
    name: "Sitendra Pandey",
    role: "Manager – Business Excellence",
    company: "Asian Cables",
    text: "My time at Asian Cables has been both rewarding and impactful. The organisation's emphasis on discipline, performance, and continuous improvement creates an environment where consistent results and long-term value are prioritised. What truly distinguishes the culture is the positive and engaging work atmosphere where a sense of motivation and satisfaction is reflected across all levels. This balance between accountability and a supportive environment encourages individuals to take ownership while staying connected and driven.",
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"],
  },
  {
    name: "Amit Barasara",
    role: "Manager – Quality",
    company: "11 Years at Asian Cables",
    text: "Every day at KEC Asian Cables, I feel a sense of purpose and pride in what I do. I have been trusted with meaningful responsibilities and given room to grow professionally. The 5-Day Work Week Initiative has been a game-changer for my personal well-being. It gives me the balance to recharge and come back stronger. Here, I do not just feel like an employee - I feel valued, heard, and part of something bigger.",
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"],
  },
];

export default function TestimonialsSection({ data }: { data?: any }) {
  const testimonials = data?.testimonials?.length > 0 ? data.testimonials.map((t: any) => ({
    name: t.name,
    role: t.role,
    company: "Asian Cables", // Fallback to maintain design
    text: t.quote,
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"], // Fallback to maintain design
  })) : staticTestimonials;

  // 3 unique testimonials -> 6 base cards -> duplicated to 12 for the loop.
  // The track's second half is an exact copy of the first, so translateX(-50%)
  // lands precisely on the copy: no jump, flicker, or reset. The 6-card loop
  // unit is wider than any viewport, so no empty space appears even on ultrawide.
  const loopCards = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  const mobileTestimonials =
    testimonials.length <= 4
      ? [...testimonials, ...testimonials, ...testimonials]
      : testimonials;

  return (
    <section className="bg-[#21409A] pt-[40px] pb-[40px]  md:pt-[60px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div className="mb-10 lg:mb-[60px] md:px-0 px-5">
          <h2
            className="
              text-white
              text-[30px]
              sm:text-[38px]
              lg:text-[46px]
              font-bold
              italic
              leading-[1.2]
              lg:leading-[55.2px]
              tracking-[-0.92px]
            "
            
          >
            {data?.testimonialsTitle || "Hear From Our People"}
          </h2>

          <p
            className="
              mt-2
              text-white
              text-[18px]
              leading-[30.6px]
              font-normal
            "
            
          >
            Real voices from real journeys.
          </p>
        </div>
      </div>

      {/* Slider — full-bleed auto-scrolling marquee (outer container removed) */}
      <div className="ts-marquee md:block hidden">
        <div className="ts-track">
          {loopCards.map((item: any, index: number) => (
            <div
              key={index}
              aria-hidden={index >= testimonials.length}
              className="ts-card bg-white rounded-[10px] group p-6 flex flex-col h-[436px]"
            >
              {/* Quote */}
              <div className="w-[30px] h-[27px]">
                <svg
                  width="30"
                  height="27"
                  viewBox="0 0 30 27"
                  fill="#1E3C8C"
                >
                  <path d="M0 27V15.8C0 9.6 1.6 5 4.8 2C8 0 12 0 12 0V5C9.6 5 8 5.8 7 7.2C6 8.6 5.4 10.6 5.2 13H12V27H0ZM18 27V15.8C18 9.6 19.6 5 22.8 2C26 0 30 0 30 0V5C27.6 5 26 5.8 25 7.2C24 8.6 23.4 10.6 23.2 13H30V27H18Z" />
                </svg>
              </div>

              {/* Content */}
              <p
                className="mt-6 text-[18px] leading-[28px] text-[#555555] font-normal  line-clamp-3 transition-all duration-300 group-hover:line-clamp-6"
                
              >
                {item.text}
              </p>

              <div className="flex-1" />

              {/* Tags */}
              <div className="flex flex-wrap gap-3 pb-6 border-b border-[#E2E2E2] group-hover:hidden">
                {item.tags.map((tag: any, i: number) => (
                  <span
                    key={i}
                    className="
                      h-[34px]
                      px-4
                      rounded-[68px]
                      flex
                      items-center
                      justify-center
                      bg-[#BECFFF33]
                      text-[#767676]
                      text-[16px]
                      leading-none
                    "
                    
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-6">
                <p
                  className="text-[24px] font-semibold leading-[26px] text-black"
                  
                >
                  {item.name}
                </p>

                <p
                  className="mt-2 text-[16px] font-medium text-[#767676]"
                  
                >
                  {item.role}
                </p>

                <p
                  className="mt-2 text-[12px] font-normal text-[#3CAADF]"
                  
                >
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="block md:hidden">
  <Swiper
    modules={[Autoplay]}
    centeredSlides
    slidesPerView={1.2}
    spaceBetween={0}
    loop
    speed={600}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
  >
    {mobileTestimonials.map((item: any, index: number) => (
      <SwiperSlide key={index}>
        {({ isActive }) => (
          <div
            className={`bg-white rounded-[10px] p-6 flex flex-col 
            transition-all duration-500 ${
              isActive
                ? "scale-100 opacity-100 h-auto"
                : "scale-[0.92] opacity-70 h-[343px]"
            }`}
          >
            {/* Quote */}
            <div className="w-[30px] h-[27px]">
              <svg
                width="30"
                height="27"
                viewBox="0 0 30 27"
                fill="#1E3C8C"
              >
                <path d="M0 27V15.8C0 9.6 1.6 5 4.8 2C8 0 12 0 12 0V5C9.6 5 8 5.8 7 7.2C6 8.6 5.4 10.6 5.2 13H12V27H0ZM18 27V15.8C18 9.6 19.6 5 22.8 2C26 0 30 0 30 0V5C27.6 5 26 5.8 25 7.2C24 8.6 23.4 10.6 23.2 13H30V27H18Z" />
              </svg>
            </div>

            <p
              className={`mt-6 text-[14px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#767676]
              transition-all duration-500 ${
    isActive
      ? "line-clamp-6"
      : "line-clamp-3"
  } `}
            >
              {item.text}
            </p>

            <div className="flex-1" />

            <div
              className={`flex mt-3 flex-wrap gap-3 pb-6 border-b border-[#E2E2E2]
              transition-all duration-500 ${
                isActive
                  ? "opacity-100"
                  : "opacity-100"
              }`}
            >
              {item.tags.map((tag: any, i: number) => (
                <span
                  key={i}
                  className="md:h-[34px] px-2 md:px-4 rounded-[68px]
                  flex items-center justify-center
                  bg-[#BECFFF33] text-[#767676] text-[12px] leading-[26px] md:text-[16px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <p className="text-[16px] md:text-[24px] font-semibold leading-[26px] text-black">
                {item.name}
              </p>

              <p className="mt-1 text-[16px] font-medium text-[#767676]">
                {item.role}
              </p>

              <p className="mt-1 text-[10px] md:text-[12px] font-normal text-[#3CAADF]">
                {item.company}
              </p>
            </div>
          </div>
        )}
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    </section>
  );
}
