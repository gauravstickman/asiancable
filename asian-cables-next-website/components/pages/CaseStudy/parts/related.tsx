"use client";

import { ChevronRight, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
const casestudies = [
  {
    tag: "OIL & GAS",
    title: "HV and LV Power Cable Supply for Infrastructure Development, Oman",
    description:
      "Supplied 33 kV, 11 kV, and 1 kV power cables for large-scale infrastructure development in Oman from a single manufacturing source.",
    image: "/assets/case-studies/case-1.png",
    country: "Oman",
    year: "2026",
    badges: ["IEC Compliant", "Single-Supplier Delivery"],
    link: "/case-study/oman-power-cables",
  },
  {
    tag: "TRANSMISSION",
    title: "Control Cable Supply for Transmission Infrastructure, Sri Lanka",
    description:
      "Supplied IEC-compliant control cables supporting transmission infrastructure development across Sri Lanka.",
    image: "/assets/case-studies/case-2.jpg",
    country: "Sri Lanka",
    year: "2025",
    badges: ["On-time Delivery", "IEC Compliant"],
    link: "/case-study/sri-lanka-transmission",
  },
  {
    tag: "RENEWABLES",
    title: "Solar Farm Cabling Solution for Utility Scale Power Generation",
    description:
      "Delivered solar DC and AC cable systems for a large-scale renewable energy project.",
    image: "/assets/case-studies/case-3.jpg",
    country: "India",
    year: "2024",
    badges: ["UV Resistant", "Renewable Certified"],
    link: "/case-study/solar-farm",
  },
  {
    tag: "RAILWAYS",
    title: "Signalling and Communication Cable Supply for Metro Expansion",
    description:
      "Provided specialized railway signalling and communication cables for metro infrastructure expansion.",
    image: "/assets/case-studies/case-4.png",
    country: "India",
    year: "2025",
    badges: ["Metro Approved", "Low Smoke"],
    link: "/case-study/metro-cables",
  },
  {
    tag: "POWER",
    title: "High Voltage Cable Package for National Grid Upgrade",
    description:
      "Manufactured and supplied high-performance power cables for critical grid modernization projects.",
    image: "/assets/case-studies/case-5.jpg",
    country: "Saudi Arabia",
    year: "2026",
    badges: ["Grid Certified", "High Reliability"],
    link: "/case-study/grid-upgrade",
  },
];


export default function Related() {
 const displayBlogs = casestudies.map(blog => ({
  ...blog,
  link: "/case-study",
}));


const sliderData =
  displayBlogs.length <= 3
    ? [...displayBlogs, ...displayBlogs]
    : displayBlogs;

  return (
    <section className="reveal-section bg-[#ffffff] py-10 md:pt-[84.5px]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-0">
        {/* HEADING */}
        <div className="mb-10 text-left md:mb-[60px] flex items-center justify-between">
          <h2 className="text-[32px] leading-[40px] text-[#1E3C8C] italic font-[700] md:text-[46px] md:leading-[100%] tracking-[-2%]">
            More Case Studies
          </h2>

               {/* VIEW ALL BUTTON */}
        <button className="hidden border-it-b md:flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition">
          View All
          <span>
            <ChevronRight size={18} />
          </span>
        </button>
        </div>
         

{/* MOBILE SLIDER */}
<div className=" case-slider max-w-[100%] pb-6">
 <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={18}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    
    768: {
      slidesPerView: 3,
      spaceBetween: 18,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 18,

    },
  }}
>
  {sliderData.map((blog, index) => (
  <SwiperSlide key={index}
>
         <div className="overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_24px_0px_#00000026] md:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
    
    {/* IMAGE */}
    <div className="relative h-[253px] md:h-[334px] overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2F6A]/80 via-[#1B2F6A]/20 to-transparent" />

      {/* Badge */}
      <div className="absolute left-6 top-6">
        <span className="rounded-[4px] bg-white px-3 py-2 text-[14px] md:text-[16px] font-[600] text-[#1E3C8C]">
          {blog.tag}
        </span>
      </div>

      {/* Meta */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
        <span className="flex items-center gap-1 md:gap-2 text-[14px] md:text-[20px] leading-[100%] font-[400]">
          <MapPin className="h-3 w-3 md:h-5 md:w-5"/> {blog.country}
        </span>

        <span className="text-[14px] md:text-[20px]  leading-[100%] font-[400]">
          {blog.year}
        </span>
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-6">
      <p className="mb-3 md:line-clamp-2 text-[16px] leading-[24px] md:text-[20px] font-[500] md:leading-[30px] text-[#1E3C8C]">
        {blog.title}
      </p>

      <p className="mb-6 md:line-clamp-3 text-[14px] leading-[20px] md:text-[16px] md:leading-[26px] text-[#525252] md:min-h-[78px]">
        {blog.description}
      </p>

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-3">
       {blog.badges.map((badge, idx) => (
  <span
    key={idx}
    className=" h-[26px] md:h-[34px] rounded-[4px] bg-[#BECFFF40] px-3 py-1 text-[14px] leading-[20px] md:text-[16px] md:leading-[26px] text-[#767676]"
  >
    {badge}
  </span>
))}
      </div>

      {/* CTA */}
    <Link
  href={blog.link}
  className="inline-flex items-center gap-2 text-[16px] leading-[26px] md:text-[20px] md:leading-[29.42px] tracking-[-0.46px] font-[500] text-[#1E3C8C]"
>
  View Case Study
  <ArrowRight size={20} />
</Link>
    </div>
  </div>

          </SwiperSlide>
    ))}
  </Swiper>
</div>


 <button className="md:hidden border-it-b  flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition">
          View All
          <span>
            <ChevronRight size={18} />
          </span>
        </button>
   
      </div>
    </section>
  );
}
