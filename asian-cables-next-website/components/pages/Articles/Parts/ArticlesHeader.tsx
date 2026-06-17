import { Dot, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

import { BlogType } from "../Articles";

function ArticleHeader({ blog }: { blog: BlogType }) {
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "Blog" },
];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative md:min-h-[551px]  overflow-hidden">
        {/* Background Image */}
        <img
          src={blog?.image ? (blog.image.startsWith('http') ? blog.image : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/${blog.image}`) : "/assets/events/events-bg.png"}
          alt={blog?.title || ""}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[linear-gradient(259.73deg,_rgba(30,60,140,0.21)_3.79%,_rgba(30,60,140,0.7)_47.77%)]" />
        <div className="relative z-10 m-auto px-5 md:px-0 max-w-[1280px] pt-50 md:pt-40 pb-[60px]">
           <div className="inner-banner max-w-[1052px]">
          <nav className="mb-0 flex flex-wrap items-center gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-worksans text-[14px] leading-[20px] md:text-[16px] md:leading-[36px] font-normal text-[#FFFFFFD4]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-worksans text-[14px] leading-[20px] md:text-[16px] md:leading-[36px] font-medium tracking-[0px] text-[#FFFFFF]">
                    {item.label}
                  </span>
                )}

              {index < breadcrumbs.length - 1 && (
  <Dot className="h-6 w-6 text-white" />
)}
              </React.Fragment>
            ))}
          </nav>
            
            {/* case studies meta */}
<div className="case-meta flex flex-wrap gap-6 md:gap-3 mt-[81px] md:mt-[68px] mb-[24px] md:mb-[34px]">
                <span className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-3 py-1 bg-[#FFA500] tex-[#000000] rounded-[8px] flex items-center gap-2 uppercase tracking-[-0.5px]">Blog - {blog?.category || "Renewable energy"}</span>
            <span className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-3 py-1 bg-white/25 text-white rounded-[8px] flex items-center gap-2 uppercase tracking-[-0.5px]"><Calendar size={16}/> {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'October 19 2026'}</span>
                      <span className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-3 py-1 bg-white/25 text-white rounded-[8px] flex items-center gap-2 uppercase tracking-[-0.5px]"> {blog?.readTime || "10 min read"}</span>

          </div>

          {/* Heading */}
          <h1 className="mb-[24px] mt-[0px] font-[Magistral] text-[28px] leading-[36px] md:text-[54px] md:leading-[64.6px] font-bold tracking-[-1.44px] text-white italic">
          {blog?.title || "Harnessing Renewable Energy: Essential Tips for SaaS Marketing Leaders"}
          </h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ArticleHeader;
