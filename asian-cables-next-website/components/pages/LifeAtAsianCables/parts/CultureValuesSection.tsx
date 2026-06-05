"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <section
      style={{
        width: "100%",
        background: "#FFFFFF",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 80px)",
          paddingRight: "clamp(20px, 5vw, 80px)",
        }}
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
            style={{
              fontFamily: "Magistral",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(28px, 5vw, 46px)",
              lineHeight: 1.2,
              letterSpacing: "-0.92px",
              color: "#1E3C8C",
              margin: 0,
            }}
          >
            Our Culture & Core Values
          </h2>

          <p
            style={{
              maxWidth: "1280px",
              fontFamily: "Work Sans",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "30.6px",
              letterSpacing: "0px",
              color: "#525252",
              margin: 0,
              textAlign: "left",
              opacity: 1,
            }}
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
      <div className="cv-marquee">
        <div className="cv-track">
          {loopCards.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                aria-hidden={index >= values.length}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className="cv-card relative overflow-hidden cursor-pointer"
                style={{
                  width: isActive
                    ? "447.21875px"
                    : "411.0078125px",

                  height: isActive
                    ? "547.9329223632812px"
                    : "503.5672302246094px",

                  borderRadius: isActive
                    ? "9.59px"
                    : "8.82px",

                  paddingTop: isActive
                    ? "276.96px"
                    : "254.54px",

                  paddingRight: isActive
                    ? "47.96px"
                    : "44.08px",

                  paddingBottom: "12px",

                  paddingLeft: isActive
                    ? "28px"
                    : "25px",

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
                  className="relative z-10 flex flex-col"
                  style={{
                    gap: isActive ? "19.18px" : "17.63px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Work Sans",
                      fontWeight: 500,
                      fontSize: "23.51px",
                      lineHeight: "35.26px",
                      letterSpacing: "0px",
                      color: "#FFFFFF",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h3>

                  <ul
                    style={{
                      width: "322.8559875488281px",
                      height: "146px",
                      margin: 0,
                      paddingLeft: "18px",
                      listStyle: "none",
                    }}
                  >
                    {item.points.map((point, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "Work Sans",
                          fontWeight: 400,
                          fontStyle: "Regular",
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

      <style jsx global>{`
        .cv-marquee {
          width: 100%;
          overflow: hidden;
          /* room for the hover-expanded card so it isn't clipped */
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
