"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const infrastructureData = [
  {
    id: 1,
    title: "Integrated Manufacturing Systems",
    description:
      "Manufacturing is distributed across two specialised facilities in Vadodara and Mysuru, each aligned to specific cable categories and voltage ranges. From conductor processing to insulation, sheathing, and final testing, operations are executed through integrated, end-to-end processes, ensuring control, consistency, and traceability across production.",
    image: "/assets/manufacturing/Image (1).png",

    points: [
      {
        title: "EHV / HV / Railway",
        subtitle: "Vadodara Facility Focus",
      },
      {
        title: "LT / Telecom / Optical Fibre",
        subtitle: "Mysuru Facility Focus",
      },
      {
        title: "End-to-End Integration",
        subtitle: "From Conductor to Final Testing",
      },
    ],
  },

  {
    id: 2,
    title: "Certified Manufacturing & Control",
    description:
      "Manufacturing is distributed across two specialised facilities in Vadodara and Mysuru, each aligned to specific cable categories and voltage ranges. From conductor processing to insulation, sheathing, and final testing, operations are executed through integrated, end-to-end processes, ensuring control, consistency, and traceability across production.",

    image: "/assets/manufacturing/Container (5).png",

    points: [
      {
        title: "ISO 9001",
        subtitle: "Quality Management",
      },
      {
        title: "ISO 14001",
        subtitle: "Environmental Systems",
      },
      {
        title: "ISO 45001",
        subtitle: "Occupational Safety",
      },
    ],
  },
];

export default function InfrastructureHighlights() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

      const pct = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, pct)));

      setCurrent(Math.round(scrollLeft / (window.innerWidth * 0.9)));
    };

    el.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nextSlide = () => {
    const el = scrollRef.current;

    if (!el) return;

    const nextIndex = Math.min(infrastructureData.length - 1, current + 1);

    el.scrollTo({
      left: nextIndex * (window.innerWidth * 0.9),
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    const el = scrollRef.current;

    if (!el) return;

    const prevIndex = Math.max(0, current - 1);

    el.scrollTo({
      left: prevIndex * (window.innerWidth * 0.9),
      behavior: "smooth",
    });
  };

  return (
    <section className="scrollbar-hide overflow-hidden bg-white py-20">
      <div className="mx-auto w-[90vw]">
        {/* Heading */}
        <h2 className="text-center font-[magistral] mb-14 text-[46px] leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          Infrastructure Highlights
        </h2>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="scrollbar-hide [scrollbar-width:none] overflow-x-auto overflow-y-hidden scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex h-[728px] w-[1236px] snap-x snap-mandatory gap-6 rounded-[4px]">
            {infrastructureData.map((item) => (
              <div
                key={item.id}
                className="min-w-[1236px] snap-start bg-[#F7F8FC] p-10 p-[64px]"
              >
                <div className="flex items-center justify-between gap-20">
                  {/* Left Side */}
                  <div className="max-w-1/2">
                    <div className="h-[232px] w-[520px] gap-[0px] !p-0 !m-0">
                      <span className="text-[32px] leading-[26px] font-medium tracking-[-0.03em] text-[#1E3C8C]">
                        {item.title}
                      </span>
                      <p className="mt-6 mb-4 font-[work_sans] text-[18px] leading-[26px] font-normal tracking-[-0.004em] text-[#646A69]">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-[274px] w-[274px] gap-[13px] space-y-[6px] pt-15">
                      {item.points.map((point, index) => (
                        <div key={index}>
                          <h4 className="text-start font-[magistral] text-[20px] leading-[44px] font-bold text-[#1E3C8C] italic">
                            {point.title}
                          </h4>

                          <p className="text-start text-[16px] leading-[19.5px] font-normal text-[#1E3C8C]">
                            {point.subtitle}
                          </p>
                          {index !== item.points.length - 1 && (
                            <div
                              className="my-6 h-0.5 w-18"
                              style={{
                                background:
                                  "linear-gradient(90deg, #3CAADF 0%, #F04123 50%, #FFD212 100%)",
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Arrows */}
                    <div className="mt-25 flex h-[32px] w-[80px] gap-[16px]">
                      <button
                        onClick={prevSlide}
                        className="cursor-pointer"
                      >
                        <ChevronLeft size={25} className="text-[#646A69]"  />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="cursor-pointer"
                      >
                        <ChevronRight size={25} className="text-[#646A69]" />
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[488px] w-[488px] rounded-[4px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-[#D9D9D9]">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
