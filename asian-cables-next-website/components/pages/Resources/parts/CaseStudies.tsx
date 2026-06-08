"use client";

import { useState } from "react";
import { ArrowRight, Clock3, Tag, User } from "lucide-react";

function CaseStudies({ data }: { data?: any }) {
  const [activeTab, setActiveTab] = useState("all");

  const featuredArticles = data?.featuredBlogs && data.featuredBlogs.length > 0
    ? data.featuredBlogs.filter((b: any) => b.isFeatured).map((b: any, i: number) => ({
      id: b._id || i,
      image: b.image || "/assets/resources/fallback4.png",
      tag: b.category,
      title: b.title,
      description: b.description,
      author: b.author,
      date: b.date,
      blog: "Blog",
      readTime: b.readTime || "5 min read",
      link: b.link || "#",
    }))
    : [
      {
        id: 1,
        image: "/assets/resources/fallback4.png",
        tag: "Renewable Energy",
        title: "The Future of Renewable Energy Cables",
        description:
          "Exploring the latest innovations in cable technology for solar and wind energy installations, and how they're shaping the future of sustainable power distribution.",
        author: "Dr. Rajesh Kumar",
        date: "March 1, 2024",
        blog: "Blog",
        readTime: "8 min read",
        link: "#",
      },
      {
        id: 2,
        image: "/assets/resources/fallbackImage.png",
        tag: "Technical Guide",
        title: "Cable Installation Workshop for Industrial Applications",
        description:
          "A comprehensive guide to proper cable installation techniques, safety protocols, and maintenance procedures for industrial environments.",
        author: "Dr. Amit Sharma",
        blog: "Event",
        date: "February 27, 2024",
        readTime: "12 min read",
        link: "#",
      },
    ];

  const caseStudies = data?.featuredBlogs && data.featuredBlogs.length > 0
    ? data.featuredBlogs.filter((b: any) => !b.isFeatured).map((b: any, i: number) => ({
      id: b._id || i + 100,
      image: b.image || "/assets/resources/img5.png",
      tag: b.category,
      title: b.title,
      description: b.description,
      readTime: b.readTime || "6 min read",
      link: b.link || "#",
    }))
    : [
      {
        id: 3,
        image: "/assets/resources/img5.png",
        tag: "Smart Infrastructure",
        title: "Smart Cities and the Role of Advanced Cable Infrastructure",
        description:
          "Understanding how modern cable technology enables smart city initiatives, from IoT networks to intelligent traffic management systems.",
        readTime: "6 min read",
        link: "#",
      },
      {
        id: 4,
        image: "/assets/resources/fallback2.png",
        tag: "Manufacturing",
        title: "Industry 4.0: Cables for Manufacturing Excellence",
        description:
          "Discover the specialized cable requirements for robotic systems, automated assembly lines, and the future of smart manufacturing.",
        readTime: "6 min read",
        link: "#",
      },
      {
        id: 5,
        image: "/assets/resources/fallback3.png",
        tag: "Electric Vehicles",
        title: "EV Charging Infrastructure: Cable and Standards",
        description:
          "Technical overview of cable specifications for electric vehicle stations, including safety standards and performance requirements.",
        readTime: "6 min read",
        link: "#",
      },
    ];

  const tabs = data?.blogsCategories && data.blogsCategories.length > 0
    ? data.blogsCategories.map((c: string) => ({ id: c.toLowerCase().replace(/[^a-z0-9]/g, '-'), label: c }))
    : [
      { id: "all", label: "All" },
      { id: "blogs", label: "Blogs" },
      { id: "events", label: "Events" },
      { id: "case-studies", label: "Case studies" },
    ];

  return (
    <section className="bg-[#1E3C8C0A] py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        {/* HEADER */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          {/* LEFT */}
          <div>
            <h1 className="mb-3 text-[34px] leading-[42px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic md:text-[46px] md:leading-[55px]">
              {data?.blogsTitle || "Articles & Case studies"}
            </h1>

            <p className="max-w-[640px] text-[16px] leading-[28px] text-[#525252]">
              {data?.blogsSubtitle || "Industry trends, technical articles, and expert opinions from our team"}
            </p>
          </div>
          {/* TABS */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-[49px] min-w-[120px] rounded-[4px] px-5 text-[14px] font-medium transition-all duration-300 ${activeTab === tab.id
                    ? "bg-[#1E3C8C] text-white"
                    : "bg-white text-[#525252] hover:bg-[#1E3C8C] hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* FEATURED ARTICLES */}
        <div className="mb-14 md:mb-12">
          <p className="mb-8 text-[22px] leading-[33px] font-[500] text-[#1E3C8C]">
            {data?.blogsFeaturedTitle || "Featured Articles"}
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredArticles.map((article: any) => (
              <div
                key={article.id}
                className="group overflow-hidden rounded-[8px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-[595.1875px] h-full w-[621px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* BLOG BADGE */}
                  <div className="absolute top-5 left-5">
                    <span className="rounded-[6px] bg-[#1E3C8C] px-[12px] py-[6px] text-[12px] font-semibold tracking-wide text-white">
                      {article.blog}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex h-[315.1875px] w-[621px] flex-col justify-between rounded-[4px] p-8">
                  {/* TOP CONTENT */}
                  <div>
                    {/* CATEGORY + READ TIME */}
                    <div className="mb-5 flex flex-wrap items-center gap-5 text-[14px] text-[#6B7280]">
                      <div className="flex items-center gap-2">
                        <Tag size={15} className="text-[#1E3C8C]" />
                        <span className="text-[12px] leading-[18px] font-medium tracking-[0px] text-[#1E3C8C]">
                          {article.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={15} />
                        <p className="text-[12px] leading-[18px] font-normal tracking-[0px] text-[#767676]">
                          {article.readTime}
                        </p>
                      </div>
                    </div>

                    <div className="w-[512px]">
                      <h3 className="mb-5 text-[28px] leading-[33.6px] font-bold tracking-[0px] text-[#1E3C8C] italic">
                        {article.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-[15px] leading-[25.5px] font-normal tracking-[0px] text-[#525252]">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-5 flex items-center justify-between">
                    {/* AUTHOR */}
                    <div className="flex items-center gap-2 text-[15px] text-[#4B5563]">
                      <User size={16} />
                      <span className="text-[13px] leading-[19.5px] font-medium tracking-[0px] text-[#525252]">
                        {article.author}
                      </span>
                    </div>

                    {/* DATE */}
                    <div className="text-[13px] leading-[19.5px] font-normal tracking-[0px] text-[#767676]">
                      {article.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CASE STUDIES */}
        <div>
          <p className="mb-8 text-[22px] leading-[33px] font-medium tracking-[0px] text-[#1E3C8C] ">
            Case Studies
          </p>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((study: any) => (
              <div
                key={study.id}
                className="group overflow-hidden rounded-[8px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex min-h-[208px] w-[407px] flex-col justify-between px-8 py-3">
                  {/* TOP CONTENT */}
                  <div>
                    {/* CATEGORY */}
                    <div className="mb-3 mt-3 flex items-center gap-2">
                      <Tag size={15} className="text-[#1E3C8C]" />

                      <p className="text-[11px] leading-[16.5px] font-medium tracking-[0px] text-[#1E3C8C]">
                        {study.tag}
                      </p>
                    </div>
                    {/* TITLE */}
                    <div className="w-[330px]">
                      <p className="mb-2 text-[18px] leading-[23.4px] font-medium tracking-[0px] text-[#1E3C8C]">
                        {study.title}
                      </p>

                      {/* DESCRIPTION */}
                      <p className="text-[14px] leading-[22.4px] font-normal tracking-[0px] text-[#525252]">
                        {study.description}
                      </p>
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="mt-4 w-[330px] flex items-center justify-between">
                    {/* READ TIME */}
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={15}
                        strokeWidth={1.8}
                        className="text-[#767676]"
                      />

                      <span className="text-[11px] leading-[16.5px] font-normal tracking-[0px] text-[#767676]">
                        {study.readTime}
                      </span>
                    </div>
                    {/* ARROW */}
                    <a href={study.link} className="flex items-center justify-center text-[#1E3C8C] transition-all duration-300 group-hover:translate-x-1">
                      <ArrowRight size={20} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
