"use client";

import {
  ChevronRight, ArrowRight} from "lucide-react";
const blogs = [
  {
    tag: "Event",
    title: "Conferences & Summits",
    description: "",
    image: "/src/assets/sustainability-bg.jpg",
  },
  {
    tag: "Blog",
    title: "Festivals & Live Experiences",
    description:
      "Best for creative and large public events with high traffic and multi-location challenges.",
      image: "/src/assets/sustainability-bg.jpg",
  },
  {
    tag: "Event",
    title: "Trade Shows & Exhibitions",
    description: "",
       image: "/src/assets/sustainability-bg.jpg",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-[#f6f6f6] py-24">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-[#21409A] text-[46px] leading-none font-black italic">
            Latest From Asian Cables
          </h2>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">

          {blogs.map((blog, index) => (
            <div
              key={index}
              className="relative h-[540px] rounded-[6px] overflow-hidden group"
            >

              {/* IMAGE */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-5 flex flex-col">

                {/* TAG */}
                <div className="mb-3">
                  <span className="bg-white text-[#3D3D3D] text-[14px] px-3 py-1 rounded-[4px]">
                    {blog.tag}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-white text-[24px] leading-tight font-black italic mb-3 max-w-[90%]">
                  {blog.title}
                </h3>

                {/* DESCRIPTION */}
                {blog.description && (
                  <p className="text-white/90 text-[14px] leading-[1.7] max-w-[90%] mb-6">
                    {blog.description}
                  </p>
                )}

                {/* READ MORE */}
                <button className="flex items-center gap-3 text-white text-[14px]">
                  Read More
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* VIEW ALL BUTTON */}
        <button className="w-[162px] h-[48px] bg-[#1E3C8C] rounded-[5.52px]  flex items-center justify-center gap-[6px] mx-auto text-white text-[20px] font-medium hover:bg-[#163174] transition mt-10">
        View All
        <span> <ChevronRight size={18} /></span>
      </button>

      </div>
    </section>
  );
}