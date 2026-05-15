"use client";
import {
  ChevronRight, ArrowRight} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const projects = [
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
    {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/src/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
];

export default function ProvenFieldSection() {
  return (
    <section className="bg-[#1E3C8C] py-24 overflow-hidden">
      <div className="max-w-[100%] mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-white text-[46px] leading-none font-black italic mb-5">
            Proven In The Field
          </h2>

          <p className="text-white/60 text-[24px]">
            Real projects. Demanding environments. Reliable outcomes.
          </p>
        </div>

        {/* SLIDER */}
        <Swiper
  spaceBetween={20}
  slidesPerView={2}
  centeredSlides={true}
  grabCursor={true}
  loop={true}
  breakpoints={{
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 2, 
    },
  }}
  className="!overflow-visible"
>
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[504px] rounded-[6px] overflow-hidden group">

                {/* IMAGE */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 p-6 flex flex-col max-w-[80%]">

                  {/* TAG */}
                  <div className="mb-auto">
                    <span className="bg-white text-[#525252] text-[14px] px-4 py-2 rounded-[4px]">
                      {project.tag}
                    </span>
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-white text-[22px] leading-[28px] font-bold italic mb-4 max-w-[90%]">
                      {project.title}
                    </h3>

                    <p className="text-white/85 text-[16px] leading-[1.7] mb-6 max-w-[90%]">
                      {project.description}
                    </p>

                    {/* BADGES */}
                    <div className="flex flex-wrap gap-3 mb-0">
                      {project.badges.map((badge, idx) => (
                        <div
                          key={idx}
                          className="bg-white/39 backdrop-blur-md text-white text-[16px] px-4 py-2 rounded-[4px]"
                        >
                          {badge}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BUTTON */}
         <button className="w-[162px] h-[48px] bg-[#ffffff] rounded-[5.52px]  flex items-center justify-center gap-[6px] mx-auto text-[#1E3C8C] text-[20px] font-medium hover:bg-[#ffffff] transition mt-10">
            View All
            <span> <ChevronRight size={18} /></span>
          </button>

      </div>
    </section>
  );
}