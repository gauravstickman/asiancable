"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
  {
    id: 3,
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
    id: 4,
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

export default function InfrastructureHighlights({ data }: { data?: any }) {
  const dynamicSlides = data?.infraSlides?.length > 0 ? data.infraSlides.map((slide: any, index: number) => ({
    id: index + 1,
    title: slide.title,
    description: slide.description,
    image: slide.image ? (slide.image.startsWith('http') ? slide.image : `${process.env.NEXT_PUBLIC_BASE_URL}${slide.image}`) : "/assets/manufacturing/Image (1).png",
    points: slide.highlights?.map((hl: any) => ({
      title: hl.title,
      subtitle: hl.subtitle
    })) || []
  })) : infrastructureData;

const slides =
  dynamicSlides.length === 2
    ? [...dynamicSlides, ...dynamicSlides]
    : dynamicSlides;

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
const [activeIndex, setActiveIndex] = useState(0);

const [progress, setProgress] = useState(0);
const swiperRef = useRef<any>(null);

const nextSlide = () => {
  setProgress(0);
  swiperRef.current?.slideNext();
};

const prevSlide = () => {
  setProgress(0);
  swiperRef.current?.slidePrev();
};
  

useEffect(() => {
  let value = 0;

  const interval = setInterval(() => {
    value += 1;

    setProgress(value);

    if (value >= 100) {
      value = 0;
      swiperRef.current?.slideNext();
    }
  }, 50);

  return () => clearInterval(interval);
}, []);




  return (
    <section className="scrollbar-hide overflow-hidden bg-white py-15 md:py-20">





      <div className="mx-auto w-[100%] md:ml-[84px]">
        {/* Heading */}
        <h2 className="text-center font-[magistral] mb-14 text-[29px] leading-[100%] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          {data?.infraTitle || "Infrastructure Highlights"}
        </h2>

        {/* Carousel */}
     <Swiper
  slidesPerView={1.2}
  spaceBetween={30}
  loop={true}
  breakpoints={{
    0: {
      slidesPerView: 1,
      spaceBetween: 2,
    },
    768: {
      slidesPerView: 1.2,
      spaceBetween: 30,
    },
  }}
  onSwiper={(swiper) => {
    swiperRef.current = swiper;
  }}
  onSlideChange={(swiper) => {
    setActiveIndex(swiper.realIndex);
    setProgress(0);
  }}
>
 {slides.map((item: any, index: number) => (
    <SwiperSlide key={item.id}>
      <div className="bg-[#F7F8FC] p-5 md:p-[64px] md:mx-0 mx-5">

   <div className="flex flex-col md:flex-row items-center justify-between pt-5 md:pt-0 gap-6 md:gap-20">
                  {/* Left Side */}
                  <div className="md:max-w-1/2">
                    <div className="md:h-[232px] md:w-[520px] gap-[0px] !p-0 !m-0">
                      <span className="text-[24px] leading-[26px] md:text-[32px] md:leading-[26px] font-medium tracking-[-0.03em] text-[#1E3C8C]">
                        {item.title}
                      </span>
                      <div className="md:hidden mt-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-[284px] w-[100%]  md:max-w-[488px] rounded-[4px] object-cover"
                        />
                      </div>
                      <p className="mt-6 mb-4 font-[work_sans] text-[16px] md:text-[18px] leading-[26px] font-normal tracking-[-0.004em] text-[#646A69]">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-[274px] w-[274px] gap-[13px] space-y-[6px] pt-5 md:pt-15">
                      {item.points.map((point: any, index: number) => (
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
                        <ChevronLeft size={25} className="text-[#646A69]" />
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
                  <div className="md:block hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[284px] w-[100%] md:h-[488px] md:w-[488px] rounded-[4px] object-cover"
                    />
                  </div>
                </div>
   


   

      </div>
      {activeIndex === index && (
  <div className="mt-0 h-[6px] overflow-hidden rounded-full bg-[#D9D9D9] md:mx-0 mx-5">
    <div
      className="h-full rounded-full"
      style={{
        width: `${progress}%`,
        background:
          "linear-gradient(90deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
      }}
    />
  </div>
)}
    </SwiperSlide>
  ))}
</Swiper>


   
      </div>
    </section>
  );
}
