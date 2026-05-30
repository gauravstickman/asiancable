"use client";

import { ChevronRight, ArrowRight } from "lucide-react";
const blogs = [
  {
    tag: "Event",
    title: "Conferences & Summits",
    description: "",
    image: "/assets/sustainability-bg.jpg",
  },
  {
    tag: "Blog",
    title: "Festivals & Live Experiences",
    description:
      "Best for creative and large public events with high traffic and multi-location challenges.",
    image: "/assets/sustainability-bg.jpg",
  },
  {
    tag: "Event",
    title: "Trade Shows & Exhibitions",
    description: "",
    image: "/assets/sustainability-bg.jpg",
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
    <section className="reveal-section bg-[#f6f6f6] py-10 md:py-24">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-[32px] leading-none font-black text-[#1E3C8C] italic md:text-[46px]">
            Latest From Asian Cables
          </h2>
        </div>

        {/* BLOG GRID */}
        <div className="hide-scrollbar mb-10 flex grid-cols-1 gap-4 overflow-x-auto md:mb-14 md:grid md:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, index) => (
            <div
              key={index}
              className="group relative h-[317px] min-w-[82vw] overflow-hidden rounded-[4px] md:h-[540px] md:min-w-[100%] md:rounded-[6px]"
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
                <div className="mb-3">
                  <span className="rounded-[4px] bg-white px-3 py-1 text-[14px] text-[#3D3D3D]">
                    {blog.tag}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mb-3 max-w-[90%] text-[20px] leading-tight font-black text-white italic md:text-[24px]">
                  {blog.title}
                </h3>

                {/* DESCRIPTION */}
                {blog.description && (
                  <p className="mb-6 max-w-[90%] text-[14px] leading-[1.7] text-white/90">
                    {blog.description}
                  </p>
                )}

                {/* READ MORE */}
                <button className="flex items-center gap-3 text-[14px] text-white">
                  Read More
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <button className="mx-auto flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-10">
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
