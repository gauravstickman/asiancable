 
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
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto w-[90vw]">
        {/* Heading */}
        <h2 className="font-[magistral] text-[46px] leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C] text-center">
          Infrastructure Highlights
        </h2>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="[scrollbar-width:none] overflow-x-auto overflow-y-hidden scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex snap-x snap-mandatory gap-6">
            {infrastructureData.map((item) => (
              <div
                key={item.id}
                className="min-w-[90vw] snap-start bg-[#F7F8FC] p-10"
              >
                <div className="flex items-center justify-between gap-20">
                  {/* Left Side */}
                  <div className="max-w-1/2">
                    <h3 className="font-[work_sans] text-[32px] leading-[26px] font-medium tracking-[-0.03em] text-[#1E3C8C]">
                      {item.title}
                    </h3>
                    <p className="font-[work_sans] text-[18px] leading-[26px] font-normal tracking-[-0.004em] text-[#646A69] mb-4 mt-6">
                      {item.description}
                    </p>
                    <div className="space-y-2 pt-3">
                      {item.points.map((point, index) => (
                        <div key={index}>
                          <h4 className="font-[magistral] text-[20px] leading-[44px] font-bold italic text-[#1E3C8C] text-start">
                            {point.title}
                          </h4>

                          <p className="font-[work_sans] text-[16px] leading-[19.5px] font-normal text-[#1E3C8C] text-start">
                            {point.subtitle}
                          </p>
                          <div
                            className="my-6 h-0.5 w-18"
                            style={{
                              background:
                                "linear-gradient(90deg, #3CAADF 0%, #F04123 50%, #FFD212 100%)",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Arrows */}
                    <div className="mt-12 flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="cursor-pointer rounded-full p-2 transition-all duration-500 ease-out hover:-translate-x-1 hover:scale-110 hover:bg-[#1E3C8C]/10 active:scale-95"
                      >
                        <ChevronLeft size={25} />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="cursor-pointer rounded-full p-2 transition-all duration-500 ease-out hover:translate-x-1 hover:scale-110 hover:bg-[#1E3C8C]/10 active:scale-95"
                      >
                        <ChevronRight size={25} />
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="h-130 w-140 shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
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
