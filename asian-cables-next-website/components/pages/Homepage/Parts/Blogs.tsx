"use client";

import { ChevronRight, ArrowRight } from "lucide-react";
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
      }))
    : blogs;

  return (
    <section className="reveal-section bg-[#f6f6f6] py-10 md:pt-[84.5px]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-[70.5px]">
          <h2 className="text-[32px]  text-[#1E3C8C] italic font-[700] md:text-[46px] leading-[100%] tracking-[-2%]">
            Latest From Asian Cables
          </h2>
        </div>

        {/* BLOG GRID */}
        <div className="hide-scrollbar mb-10 flex grid-cols-1 gap-2 overflow-x-auto md:mb-14 md:grid md:grid-cols-2 lg:grid-cols-3">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

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
                <button className="flex items-center gap-3 text-[14px] leading-[150%] text-white">
                  Read More
                  <ArrowRight size={18} />
                </button>
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
