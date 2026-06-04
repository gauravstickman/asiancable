"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const values = [
  {
    title: "Nurturing Talent",
    image: "/assets/Lifeofasiancables/carasel1.png",
    points: [
      "Opportunities to learn, grow, and lead",
      "Exposure to diverse projects and cross-functional collaboration",
      "Recognition that rewards initiative, innovation, and ownership",
    ],
  },
  {
    title: "Touching Lives",
    image: "/assets/Lifeofasiancables/carasel2.png",
    points: [
      "Meaningful work that powers progress in homes and industries",
      "A supportive environment where personal and professional well-being matter",
    ],
  },
  {
    title: "Outperforming Together",
    image: "/assets/Lifeofasiancables/carasel3.png",
    points: [
      "Clear goals, transparent feedback, and recognition for excellence",
      "Collaborative teams that celebrate shared success",
      "Continuous improvement as a way of life",
    ],
  },
  {
    title: "Happiness",
    image: "/assets/Lifeofasiancables/carasel4.png",
    points: [
      "A workplace where people enjoy what they do",
      "Celebrations, camaraderie, and a sense of belonging",
      "Work-life balance that respects individual needs",
    ],
  },
];

const CultureValuesSection = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Heading - Left Padding Diya */}
        <div className="mb-[40px] md:mb-[60px] pl-4 md:pl-8 lg:pl-12">
          <h2
            className="text-[#21409A] text-[18px] md:text-[20px] font-bold italic leading-none"
            style={{ fontFamily: "Magistral" }}
          >
            Our Culture & Core Values
          </h2>

          <p className="mt-3 max-w-[900px] text-[#5F5F5F] text-[13px] md:text-[14px] leading-[22px] md:leading-[26px]">
            Our culture is anchored in the core values of the RPG Group,
            which inspires us to act with integrity and pursue excellence.
            We nurture an inclusive, entrepreneurial, and people-first
            culture where every individual is valued and empowered to make
            a difference.
          </p>
        </div>

        {/* Carousel - 4 Cards Visible */}
        <div className="relative px-4 md:px-8 lg:px-12">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={15}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="culture-carousel"
          >
            {values.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group relative h-[380px] overflow-hidden rounded-[8px] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/40 transition-all duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-[18px] md:text-[20px] font-medium mb-2">
                      {item.title}
                    </h3>

                    <ul className="space-y-1.5">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex gap-1.5 text-[11px] md:text-[12px] leading-[18px]">
                          <span className="text-[12px] md:text-[14px]">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#21409A] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="swiper-button-next-custom absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#21409A] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .culture-carousel {
          padding: 10px 0 20px 0;
        }
        
        @media (max-width: 768px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CultureValuesSection;