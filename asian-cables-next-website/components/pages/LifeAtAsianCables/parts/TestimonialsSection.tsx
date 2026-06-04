"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const testimonials = [
  {
    name: "poonam Rankawat",
    role: "Design",
    company: "Asian Cables",
    text: "My journey at KEC Asian Cables has been defined by continuous learning, meaningful opportunities, and a strong sense of purpose. Culture is the soul of any organisation—it reflects its beliefs and values, and more importantly, how they are lived every day. At KEC Asian Cables, this is evident in a positive and engaging work environment where motivation and job satisfaction are visible across all levels. The balance between accountability and support empowers individuals to take ownership while staying aligned and inspired. KEC Asian Cables' commitment to diversity, along with its active encouragement of women in leadership, creates an inclusive space where talent is recognised, voices are heard, and individuals are empowered to grow and lead with confidence.",
    tags: ["inspired", "supported","Growing", "Energized","proud"],
  },
  {
    name: "Sitendra Pandey",
    role: "Manager – Business Excellence",
    company: "Asian Cables",
    text: "My time at Asian Cables has been both rewarding and impactful. The organisation's emphasis on discipline, performance, and continuous improvement creates an environment where consistent results and long-term value are prioritised. What truly distinguishes the culture is the positive and engaging work atmosphere, where a sense of motivation and satisfaction is reflected across all levels. This balance between accountability and a supportive environment encourages individuals to take ownership while staying connected and driven. This experience has further strengthened my ability to drive outcomes, collaborate effectively across functions, and maintain a structured, solution-oriented approach in dynamic situations.",
    tags: ["inspired", "supported","Growing", "Energized","proud"],
  },
  {
    name: "Amit Barasara",
    role: "Manager – Quality",
    company: "11 Years at Asian Cables",
    text: "Every day at KEC Asian Cables, I feel a sense of purpose and pride in what I do. I have been trusted with meaningful responsibilities and given room to grow professionally. The 5-Day Work Week Initiative has been a game-changer for my personal well-being—it gives me the balance to recharge and come back stronger. Here, I don't just feel like an employee—I feel valued, heard, and part of something bigger.",
    tags: ["inspired", "supported","Growing", "Energized","proud"],
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#21409A] py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 mx-12 md:mb-12 text-center md:text-left">
          <h2
            className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-bold italic leading-none"
            style={{ fontFamily: "Magistral" }}
          >
            Hear From Our People
          </h2>

          <p className="text-white/80 text-[15px] md:text-[16px] m mt-3">
            Real voices from real journeys.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-6 md:px-10">
          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            grabCursor={true}
            className="testimonials-carousel"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <div
                  className="
                    bg-white
                    rounded-[10px]
                    p-6
                    gap-6
                    w-[538px]
                    max-w-[90vw]
                    h-[518px]
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-2xl
                    flex
                    flex-col
                  "
                >
                  {/* Quote */}
                  <div className="text-[#21409A] text-[48px] font-bold leading-none">
                    ❝
                  </div>

                  {/* Text */}
                  <p className="text-[#555] text-[14px] leading-[26px] line-clamp-5 flex-1">
                    {item.text}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="
                          px-3 py-1
                          rounded-full
                          bg-[#F0F2F8]
                          text-[#666]
                          text-[11px]
                          font-medium
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#E5E5E5]" />

                  {/* User */}
                  <div>
                    <h3 className="text-[18px] font-bold text-[#111]">
                      {item.name}
                    </h3>

                    <p className="text-[#666] text-[13px] mt-1">
                      {item.role}
                    </p>

                    <p className="text-[#36A9E1] text-[11px] mt-1 font-medium">
                      {item.company}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      <style jsx global>{`
        .testimonials-carousel {
          padding: 10px 0 20px 0;
        }
      `}</style>
    </section>
  );
}
