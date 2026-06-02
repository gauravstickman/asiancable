"use client";

import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
const blogs = [
  {
    tag: "Event",
    title: "Conferences & Summits",
    description: "",
    image: "assets/Picture18.png",
  },
  {
    tag: "Blog",
    title: "Festivals & Live Experiences",
    description:
      "Best for creative and large public events with high traffic and multi-location challenges.",
    image: "assets/Picture16.png",
  },
  {
    tag: "Event",
    title: "Trade Shows & Exhibitions",
    description: "",
    image: "assets/Picture22.png",
  },
];

import { getBaseUrl } from "../../../../utils/api";

export default function BlogSection({ dynamicData }: { dynamicData?: any[] }) {
  const displayBlogs = dynamicData && dynamicData.length > 0
    ? dynamicData.map((item: any) => ({
        tag: item.category?.name || item.tag || "Blog",
        title: item.title,
        description: item.description,
        image: item.image?.startsWith("http")
          ? item.image
          : item.image
          ? `${getBaseUrl()}${item.image}`
          : "/assets/sustainability-bg.jpg",
        link: item.link || "/blogs",
      }))
    : blogs.map(b => ({ ...b, link: "/blogs" }));

  return (
    <section className="reveal-section bg-[#f6f6f6] py-10 md:pt-[84.5px]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-0">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-[70.5px]">
          <h2 className="text-[32px]  text-[#1E3C8C] italic font-[700] md:text-[46px] leading-[100%] tracking-[-2%]">
            Latest From Asian Cables
          </h2>
        </div>


{/* MOBILE SLIDER */}
<div className="md:hidden mb-10 blog-slider">
  <Swiper
    modules={[Pagination, Autoplay]}
    slidesPerView={1}
      spaceBetween={8}
  loop

    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
  >
    {displayBlogs.map((blog, index) => (
      <SwiperSlide key={index}>
        <div className="relative h-[327px] overflow-hidden rounded-[4px]">
          
          {/* IMAGE */}
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_#000000_0%,_rgba(0,0,0,0)_66.11%)]" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col p-5">

            <div className="mb-[19px]">
              <span className="inline-flex h-[27px] items-center rounded-[4px] bg-white px-3 text-[14px] font-[500] text-[#525252]">
                {blog.tag}
              </span>
            </div>

            <h3 className="mb-[7px] max-w-[90%] text-[20px] italic font-[700] leading-[120%] text-white">
              {blog.title}
            </h3>

            {blog.description && (
              <p className="mb-[16px] max-w-[90%] text-[14px] leading-[150%] text-white">
                {blog.description}
              </p>
            )}

            <Link
              href={blog.link}
              className="flex items-center gap-3 text-[14px] text-white"
            >
              Read More
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

        {/* BLOG GRID */}
        <div className="hidden md:grid hide-scrollbar mb-10 flex grid-cols-1 gap-2 overflow-x-auto md:mb-14 md:grid md:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, index) => (
            <div
              key={index}
              className="group relative h-[327px] min-w-[82vw] overflow-hidden rounded-[4px] md:h-[509px] md:min-w-[100%] md:rounded-[6px]"
            >
              {/* IMAGE */}
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_#000000_0%,_rgba(0,0,0,0)_66.11%)]" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col p-5">
                {/* TAG */}
                <div className="mb-[19px]">
                  <span className="rounded-[4px] bg-white px-3 inline-flex items-center h-[27px] text-[14px] leading-[16px] font-[500] text-[#525252]">
                    {blog.tag}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mb-[7px] max-w-[90%] text-[20px] font-[700] text-white italic md:text-[24px] leading-[120%]">
                  {blog.title}
                </h3>

                {/* DESCRIPTION */}
                {blog.description && (
                  <p className="mb-[16px] max-w-[90%] text-[14px] leading-[150%] text-white">
                    {blog.description}
                  </p>
                )}

                {/* READ MORE */}
                <Link href={blog.link} className="flex items-center gap-3 text-[14px] leading-[150%] text-white hover:underline mt-auto1 self-start">
                  Read More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <button className="border-it-b mx-auto flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-[59px] md:mb-[37.61px]">
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
