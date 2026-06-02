"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { EffectCoverflow, Pagination, Keyboard, Mousewheel, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getBaseUrl } from "../../../../utils/api";
import "swiper/css";

const staticProjects = [
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description:
      "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
];

export default function ProvenFieldSectionMobile({ dynamicData }: { dynamicData?: any[] }) {
  const [projects, setProjects] = useState<any[]>(staticProjects);

  useEffect(() => {
    if (dynamicData && dynamicData.length > 0) {
      const fetchedProjects = dynamicData.map((item: any) => ({
        ...item,
        image: item.image?.startsWith("http")
          ? item.image
          : `${getBaseUrl()}${item.image}`,
        badges: Array.isArray(item.badges) ? item.badges : []
      }));
      setProjects(fetchedProjects);
    }
  }, [dynamicData]);

  return (
    <section className="reveal-section proven overflow-hidden bg-[#1E3C8C] py-10 md:pt-[149px] md:hidden">
      <div className="mx-auto max-w-[100%]">
        {/* HEADING */}
        <div className="mb-8 px-4 text-center md:mb-[84px]">
          <h2 className="mb-[16px] text-[32px]  text-white italic font-[700] md:text-[46px] leading-[100%] tracking-[-2%]">
            Proven In The Field
          </h2>

          <p className="text-[20px] text-white/50 md:text-[24px] leading-[150%]">
            Real projects. Demanding environments. Reliable outcomes.
          </p>
        </div>

        {/* SLIDER */}
     <Swiper
  modules={[Autoplay, EffectCoverflow]}
  effect="coverflow"
    centeredSlides={true}
  slidesPerView={1.1}
  centeredSlidesBounds={true}
autoplay={true}
  loop
  grabCursor
  spaceBetween={0}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: false,
  }}
>
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="">
              <div className="group relative h-[506px] overflow-hidden rounded-[2px]">
                {/* IMAGE */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 rounded-[2px]"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex max-w-[100%] flex-col p-5 md:p-8">
                  {/* TAG */}
                  <div className="mb-auto">
                    <span className="rounded-[2px] bg-white px-3 py-2 text-[14px] leading-[16px] text-[#525252]">
                      {project.tag}
                    </span>
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="mb-[10px] max-w-[100%] text-[22px] leading-[28px] tracking-[-0.5px] font-[700] text-white italic">
                      {project.title}
                    </h3>

                    <p className="mb-[26px] max-w-[100%] md:max-w-[347px] text-[16px] leading-[26px] tracking-[-0.5px]  text-[#E8E8E8]">
                      {project.description}
                    </p>

                    {/* BADGES */}
                    <div className="mb-0 flex flex-wrap gap-[9px]">
                      {project.badges.map((badge: string, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-[4px] bg-white/39 px-4 py-1  text-[14px] md:text-[16px] leading-[26px] tracking-[-0.5px] text-white"
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
        <button className="border-it mx-auto mt-[36px] md:mt-[50px] mb-[14px] md:mb-[81px] flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] border-transparent bg-[#ffffff] text-[20px] font-medium text-[#1E3C8C] transition transition-all duration-300 hover:border-[1.84px] hover:bg-[#ffffff] hover:[border-image:linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)_1]">
          View All
          <span>
            {" "}
            <ChevronRight size={18} />
          </span>
        </button>
      </div>
    </section>
  );
}

// "use client";
// import { useState, useEffect, useRef } from "react";
// import {
//   ChevronRight, ArrowRight} from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   EffectCoverflow,
//   Autoplay,
// } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";

// const projects = [
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//     {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
//   {
//     tag: "RENEWABLES",
//     title: "Offshore Platform Power Distribution",
//     description:
//       "Supplied specialized cables for an offshore drilling platform in the North Sea.",
//     image: "/assets/proven.png",
//     badges: ["High Efficiency", "High Load Capacity"],
//   },
// ];

// export default function ProvenFieldSection() {

// const [startSlider, setStartSlider] =
//   useState(false);

// const sectionRef = useRef(null);

// useEffect(() => {
//   const observer =
//     new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {

//           setStartSlider(true);

//           setTimeout(() => {
//             setIntroDone(true);
//           }, 1400);
//         }
//       },
//       {
//         threshold: 0.25,
//       }
//     );

//   if (sectionRef.current) {
//     observer.observe(sectionRef.current);
//   }

//   return () => observer.disconnect();
// }, []);

// const [introDone, setIntroDone] =
//   useState(false);

//   return (
//     <section    ref={sectionRef} className="bg-[#1E3C8C] py-24 overflow-hidden reveal-section1 proven">
//       <div className="max-w-[100%] mx-auto">

//         {/* HEADING */}
//         <div className="text-center mb-16 px-4">
//           <h2 className="text-white text-[46px] leading-none font-black italic mb-5">
//             Proven In The Field
//           </h2>

//           <p className="text-white/60 text-[24px]">
//             Real projects. Demanding environments. Reliable outcomes.
//           </p>
//         </div>

//         {/* SLIDER */}
//       <Swiper
//   modules={[
//     EffectCoverflow,
//     Autoplay,
//   ]}
//   effect="coverflow"
//   centeredSlides={true}
//   slidesPerView={"auto"}
//   loop={true}
//   speed={1200}
//   grabCursor={true}
//   autoplay={{
//     delay: 3000,
//     disableOnInteraction: false,
//       reverseDirection: true,

//   }}
//   coverflowEffect={{
//     rotate: 0,
//     stretch: -120,
//     depth: 180,
//     modifier: 1,
//     scale: 0.86,
//     slideShadows: false,
//   }}
//   className={`project-swiper transition-all duration-[1400ms] ${
//     startSlider
//       ? "translate-y-0 opacity-100"
//       : "translate-y-[120px] opacity-0"
//   }`}
// >
//           {projects.map((project, index) => (
//             <SwiperSlide key={index}  className="!w-[920px]">
//               <div className="relative h-[504px] rounded-[6px] overflow-hidden group">

//                 {/* IMAGE */}
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
//                 />

//                 {/* OVERLAY */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

//                 {/* CONTENT */}
//                 <div className="absolute inset-0 p-6 flex flex-col max-w-[80%]">

//                   {/* TAG */}
//                   <div className="mb-auto">
//                     <span className="bg-white text-[#525252] text-[14px] px-4 py-2 rounded-[4px]">
//                       {project.tag}
//                     </span>
//                   </div>

//                   {/* TEXT */}
//                   <div>
//                     <h3 className="text-white text-[22px] leading-[28px] font-bold italic mb-4 max-w-[90%]">
//                       {project.title}
//                     </h3>

//                     <p className="text-white/85 text-[16px] leading-[1.7] mb-6 max-w-[90%]">
//                       {project.description}
//                     </p>

//                     {/* BADGES */}
//                     <div className="flex flex-wrap gap-3 mb-0">
//                       {project.badges.map((badge, idx) => (
//                         <div
//                           key={idx}
//                           className="bg-white/39 backdrop-blur-md text-white text-[16px] px-4 py-2 rounded-[4px]"
//                         >
//                           {badge}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* BUTTON */}
//          <button className="border-it w-[162px] h-[48px] bg-[#ffffff] rounded-[5.52px] border-transparent hover:border-[1.84px] hover:[border-image:linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)_1] transition-all duration-300  flex items-center justify-center gap-[6px] mx-auto text-[#1E3C8C] text-[20px] font-medium hover:bg-[#ffffff] transition mt-10">
//             View All
//             <span> <ChevronRight size={18} /></span>
//           </button>

//       </div>
//     </section>
//   );
// }
