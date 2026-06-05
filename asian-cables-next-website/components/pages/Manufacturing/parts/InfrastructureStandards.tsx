"use client";

import React, { useEffect, useState } from "react";

const highlightedCards = [
  {
    id: 1,
    title: "Standards-Led Manufacturing",
    description:
      "Manufacturing is aligned to internationally recognised standards including IEC, BS, AS/NZS, and IS, ensuring consistent performance across diverse infrastructure applications.",
    detail:
      "This enables seamless integration into global projects across utilities, industrial systems, and specialised environments.",
    image: "/assets/manufacturing/AC Foundation-04 1.png",
    label: "Built for Global Infrastructure Standards",
  },
  {
    id: 2,
    title: "Advanced Technology",
    description:
      "Integrated production processes with controlled manufacturing and in-line quality checks ensure precision, repeatability, and consistency across product categories.",
    image: "/assets/manufacturing/image 2.png",
  },
  {
    id: 3,
    title: "Sustainable Operations",
    description:
      "Manufacturing facilities operate with renewable energy integration, water recycling systems, and energy-efficient processes, reducing environmental impact across operations.",
    image: "/assets/manufacturing/image 4 (1).png",
  },
];

const certificationCards = [
  {
    id: 1,
    title: "NABL Accreditation",
    description: "Testing laboratory accreditation",
    icon: "/assets/manufacturing/CheckCircle2 (1).png",
  },
  {
    id: 2,
    title: "IEC",
    description: "International Electrotechnical Commission",
    icon: "/assets/manufacturing/CheckCircle2 (2).png",
  },
  {
    id: 3,
    title: "DSIR Recognition",
    description: "In-house R&D approved by Government of India",
    icon: "/assets/manufacturing/CheckCircle2 (3).png",
  },
  {
    id: 4,
    title: "IGBC Platinum Rating",
    description: "Green factory certification (Vadodara facility)",
    icon: "/assets/manufacturing/CheckCircle2 (4).png",
  },
  {
    id: 5,
    title: "ASTM",
    description: "American Society for Testing and Materials",
    icon: "/assets/manufacturing/CheckCircle2 (5).png",
  },
];

const infrastructureData = [
  {
    title: "90+",
    subtitle: "Countries Served",
  },
  {
    title: "Multi-Standard Compliance",
    subtitle: "IEC | BS | IS | AS/NZS",
  },
  {
    title: "Cross-Sector Deployment",
    subtitle: "Utilities | Infra | Industrial",
  },
];

function InfrastructureStandards() {
  // ✅ ADDED ONLY FOR SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const duration = 4000;
  const cardWidth = 270;

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const percentage = (elapsed / duration) * 100;

      if (percentage >= 100) {
        setProgress(0);

        setCurrentSlide((prev) => prev + 1);
      } else {
        setProgress(percentage);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [currentSlide]);
  useEffect(() => {
    if (currentSlide === certificationCards.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 700);
    }
  }, [currentSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-[#1E3C8C] py-20">
      <div className="relative z-10 mx-auto w-[90vw] max-w-[1400px]">
        {/* Heading with Wire Image positioned nearby */}
        <div className="relative mb-10 h-full text-center">
          <div
            className="pointer-events-none absolute z-20"
            style={{
              backgroundImage: "url('/assets/manufacturing/wireImage.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "300px",
              height: "1420px",
              top: "0",
              left: "-90px",
              bottom: "-10",
            }}
          />

          <p className="text-center font-[magistral] text-[46px] leading-[70.4px] font-bold tracking-[-1.44px] text-[#FFFFFF] italic">
            Built for Global Infrastructure Standards
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="relative min-h-[700px] overflow-hidden rounded-[6px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,60,140,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.97))]" />
            <div
              className="pointer-events-none absolute top-0 left-0 h-full w-[55%] bg-cover bg-left bg-no-repeat opacity-90"
              style={{
                backgroundImage: "url('/assets/manufacturing/bgImage.png')",
                backgroundPosition: "left center",
              }}
            />

            <div className="relative z-10 flex sm:p-10 lg:p-12">
              <div className="max-w-xl text-left">
                <h2 className="font-[magistral] text-[32px] leading-[61.6px] font-bold text-[#1E3C8C] italic">
                  Standards-Led Manufacturing
                </h2>

                <div className="space-y-4">
                  <p className="font-[work_sans] text-[19px] leading-[34.2px] font-normal text-[#1E3C8C]">
                    Manufacturing is aligned to internationally recognised
                    standards including IEC, BS, AS/NZS, and IS, ensuring
                    consistent performance across diverse infrastructure
                    applications. This enables seamless integration into global
                    projects across utilities, industrial systems, and
                    specialised environments.
                  </p>
                </div>

                <div className="mt-5">
                  {infrastructureData.map((items, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-[magistral] text-[20px] leading-[34px] font-bold text-[#1E3C8C] italic">
                        {items.title}
                      </h4>

                      <p className="font-[work_sans] text-[16px] leading-[21px] font-normal text-[#1E3C8CB2]">
                        {items.subtitle}
                      </p>

                      {index !== infrastructureData.length - 1 && (
                        <div
                          className="my-4 h-0.5 w-18"
                          style={{
                            background:
                              "linear-gradient(90deg, #3CAADF 0%, #F04123 50%, #FFD212 100%)",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {highlightedCards.slice(1).map((card) => (
              <article
                key={card.id}
                className="relative overflow-hidden rounded-[6px] bg-slate-950 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />
                <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
                  <h3 className="mt-6 text-[24px] leading-tight font-bold text-[#FFFFFF] italic">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[16px] font-normal text-[#FFFFFF]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* 🔥 ONLY FIXED SECTION BELOW */}
        {/* ========================= */}

        <div className="mt-25">
          <p className="text-center font-[magistral] text-[24px] leading-[32px] font-bold text-white italic">
            Certifications & Standards
          </p>

          <div className="relative mt-15 w-full  ">
            <div
              className="flex justify-start gap-[36px] transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * cardWidth}px)`,
                transition: isTransitioning
                  ? "transform 700ms ease-in-out"
                  : "none",
              }}
            >
              {[...certificationCards, ...certificationCards].map((card, i) => (
                <div
                  key={i}
                  className="flex h-[175px] w-[232.5px] flex-shrink-0 flex-col items-center justify-center rounded-[17.61px] bg-[#F9F9F9] p-5"
                >
                  <div className="rounded-[17.61px] bg-[#F7F9FF] p-3">
                    <img src={card.icon} className="h-11 w-11 object-contain" />
                  </div>
                  <h4 className="text-center font-[work_sans] text-[18px] font-semibold text-black">
                    {card.title}
                  </h4>
                  <p className="text-center font-[work_sans] text-[14px] text-black/70">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 🔥 GRADIENT LOADER */}
            <div className="mt-6 h-[3px] w-full rounded-full bg-white/20">
              <div
                className="h-full bg-gradient-to-r from-[#3CAADF] via-[#F04123] to-[#FFD212]"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfrastructureStandards;
