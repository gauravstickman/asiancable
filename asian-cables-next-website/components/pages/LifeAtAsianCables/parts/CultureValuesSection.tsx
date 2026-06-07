"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
const values = [
  {
    title: "Nurturing Talent",
    image: "/assets/Lifeofasiancables/carasel1.png",
    position: "center top",
    points: [
      "Opportunities to learn, grow, and lead",
      "Exposure to diverse projects and cross-functional collaboration",
      "Recognition that rewards initiative, innovation, and ownership",
    ],
  },
  {
    title: "Touching Lives",
    image: "/assets/Lifeofasiancables/carasel3.png",
    position: "center center",
    points: [
      "Meaningful work that powers progress in homes and industries",
      "A supportive environment where personal and professional well-being matter",
    ],
  },
  {
    title: "Outperforming Together",
    image: "/assets/Lifeofasiancables/carasel2.png",
    position: "center center",
    points: [
      "Clear goals, transparent feedback, and recognition for excellence",
      "Collaborative teams that celebrate shared success",
      "Continuous improvement as a way of life",
    ],
  },
  {
    title: "Happiness",
    image: "/assets/Lifeofasiancables/carasel4.png",
    position: "center 40%",
    points: [
      "A workplace where people enjoy what you do",
      "Celebrations, camaraderie, and a sense of belonging",
      "Work-life balance that respects individual needs",
    ],
  },
];

// 4 unique cards duplicated -> 8 cards.
// The second set is identical to the first, so translateX(-50%) lands
// exactly on the start of the duplicate set for a seamless loop.
const loopCards = [...values, ...values];

const CultureValuesSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
const [mobileActive, setMobileActive] = useState(0);
const mobileSlides =
  values.length <= 4
    ? [...values, ...values, ...values]
    : values;
    
  return (
    <section
      style={{
        width: "100%",
        background: "#FFFFFF",
        paddingTop: "50px",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
        className="md:px-0 px-5"
      >
        {/* Heading - Left Aligned */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            gap: "10px",
            marginBottom: "60px",
          }}
        >
          <h2
                 className="text-[#1E3C8C] text-[28px] md:text-[36px] leading-[42px] font-bold italic tracking-[-0.92px]"

          >
            Our Culture & Core Values
          </h2>

          <p
                         className="mt-[12px] text-[#525252] text-[16px] leading-[26px] md:text-[20px] md:leading-[36px] font-[400]"

          >
            Our culture is anchored in the core values of the RPG Group,
            which inspires us to act with integrity and pursue excellence.
            We nurture an inclusive, entrepreneurial, and people-first
            culture where every individual is valued and empowered to make
            a difference.
          </p>
        </div>
      </div>

      {/* Cards — full-bleed infinite auto-scrolling carousel */}
      <div className="cv-marquee hidden md:block">
        <div className="cv-track flex items-center">
          {loopCards.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                aria-hidden={index >= values.length}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className="cv-card relative overflow-hidden cursor-pointer z-[9]"
                style={{
                    scale: isActive
                    ? "1.1"
                    : "1",


                  width: isActive
                    ? "411.0078125px"
                    : "411.0078125px",

                  height: isActive
                    ? "503.5672302246094px"
                    : "503.5672302246094px",

                  borderRadius: isActive
                    ? "9.59px"
                    : "9.59px",

                  paddingTop: isActive
                    ? "276.96px"
                    : "276.96px",

                  paddingRight: isActive
                    ? "47.96px"
                    : "47.96px",

                  paddingBottom: "12px",

                  paddingLeft: isActive
                    ? "28px"
                    : "28px",

                  transition: "all .35s ease",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="450px"
                  className="object-cover"
                  style={{
                    objectPosition:
                      item.position || "center center",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                <div
                  className="relative z-10 flex flex-col bottom-8"
                  style={{
                    gap: isActive ? "19.18px" : "19.18px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "23.51px",
                      lineHeight: "35.26px",
                      letterSpacing: "0px",
                      color: "#FFFFFF",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </p>

                  <ul
                    style={{
                      width: "322.8559875488281px",
                      height: "146px",
                      margin: 0,
                      paddingLeft: "5px",
                      listStyle: "none",
                    }}
                  >
                    {item.points.map((point, i) => (
                      <li
                        key={i}
                        style={{
                          fontWeight: 400,
                          fontStyle: "  Regular",
                          fontSize: "17.1px",
                          lineHeight: "29.06px",
                          letterSpacing: "0px",
                          color: "#FFFFFF",
                          marginBottom: "4px",
                        }}
                      >
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
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
  onSlideChange={(swiper) =>
  setMobileActive(swiper.realIndex)
}
>
    {mobileSlides.map((item, index) => (
      <SwiperSlide key={index}>
        {({ isActive }) => (
          <div
            className={`relative h-[440px] overflow-hidden rounded-[10px] transition-all duration-500 ${
              isActive
                ? "scale-100 opacity-100"
                : "scale-[0.92] opacity-70"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

            <div className="absolute bottom-0 left-0 z-10 p-6">
              <p className="mb-4 text-[24px] font-medium text-white">
                {item.title}
              </p>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isActive
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2">
                  {item.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-[16px] leading-[28px] text-white"
                    >
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </SwiperSlide>
    ))}
  </Swiper>
</div>

      <style jsx global>{`
        .cv-marquee {
          width: 100%;
            padding-bottom: 50px;
        }

        .cv-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: cv-scroll 30s linear infinite;
        }

        /* Per-card right margin (not flex gap) keeps the two card sets
           equal in width, so translateX(-50%) loops with no half-gap jump. */
        .cv-track .cv-card {
          flex: 0 0 auto;
          margin-right: 39px;
        }

        /* Pause on hover; CSS keeps the exact frozen position and resumes
           from there when the pointer leaves. */
        .cv-marquee:hover .cv-track {
          animation-play-state: paused;
        }

        @keyframes cv-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cv-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CultureValuesSection;
