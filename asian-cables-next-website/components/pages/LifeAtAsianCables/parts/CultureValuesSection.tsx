"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

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
    image: "/assets/Lifeofasiancables/carasel3.png",
    points: [
      "Meaningful work that powers progress in homes and industries",
      "A supportive environment where personal and professional well-being matter",
    ],
  },
  {
    title: "Outperforming Together",
    image: "/assets/Lifeofasiancables/carasel2.png",
    points: [
      "Clear goals, transparent feedback, and recognition for excellence",
      "Collaborative teams that celebrate shared success",
      "Continuous improvement as a way of life",
    ],
  },
  {
    title: "Happiness",
    image: "/assets/Lifeofasiancables/carasel4.png",
    // Narrow source (239x504) — center the subject so the face/shoulders
    // aren't cropped when object-cover zooms it to fill the card width.
    position: "center 30%",
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
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="mb-[40px] md:mb-[60px] pl-4 md:pl-8 lg:pl-12">
          <h2
            className="text-[#21409A] text-[28px] md:text-[36px] lg:text-[44px] font-bold italic leading-none"
            style={{ fontFamily: "Magistral" }}
          >
            Our Culture & Core Values
          </h2>

          <p className="mt-4 max-w-[1100px] text-[#5F5F5F] text-[14px] md:text-[16px] leading-[24px] md:leading-[28px]">
            Our culture is anchored in the core values of the RPG Group,
            which inspires us to act with integrity and pursue excellence.
            We nurture an inclusive, entrepreneurial, and people-first
            culture where every individual is valued and empowered to make
            a difference.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            grabCursor={true}
            className="culture-carousel"
          >
            {values.map((item, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <div className="culture-card group relative flex flex-col overflow-hidden text-white">
                  {/* Image fills the entire card edge-to-edge (object-cover),
                      anchored to the top so the top portion stays visible */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 450px"
                    style={{ objectPosition: item.position ?? "center top" }}
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

                  {/* Content (positioned by the card's padding) */}
                  <h3 className="relative z-10 text-[22px] md:text-[24px] font-medium">
                    {item.title}
                  </h3>

                  <ul className="relative z-10 space-y-2">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex gap-2 text-[13px] md:text-[14px] leading-[22px]">
                        <span className="text-[16px]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .culture-carousel {
          padding: 10px 0 20px 0;
        }

        .culture-card {
          width: 398.57px;
          max-width: 90vw;
          height: 488.33px;
          border-radius: 8.55px;
          padding: 246.83px 42.74px 12px 23px;
          gap: 17.1px;
          transition: width 0.3s ease, height 0.3s ease,
            border-radius 0.3s ease, padding 0.3s ease, gap 0.3s ease,
            box-shadow 0.3s ease;
        }

        .culture-card:hover {
          width: 447.22px;
          height: 547.93px;
          border-radius: 9.59px;
          padding: 276.96px 47.96px 12px 28px;
          gap: 19.18px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
        }
      `}</style>
    </section>
  );
};

export default CultureValuesSection;
