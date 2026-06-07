import { Dot, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CaseStudyData } from "../types";

interface MainBannerProps {
  data: CaseStudyData;
}

function MainBanner({ data }: MainBannerProps) {
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: data.title },
];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative  overflow-hidden">
        {/* Background Image */}
        <img
          src={data.image}
          alt={data.title}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(259.73deg,_rgba(30,60,140,0.21)_3.79%,_rgba(30,60,140,0.7)_47.77%)]" />
        <div className="relative z-10 m-auto px-5 md:px-0 max-w-[1280px] pt-40 pb-[60px]">
           <div className="inner-banner max-w-[833px]">
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
          <div className="case-meta flex gap-3 mt-[68px] mb-[24px] md:mb-[34px]">
            <span className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-3 py-1 bg-[#FFA500] tex-[#000000] rounded-[8px] flex items-center gap-2">{data.category}</span>
            <span className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-3 py-1 bg-white/25 text-white rounded-[8px] flex items-center gap-2"><MapPin size={16}/> {data.location}</span>
            <span className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-3 py-1 bg-white/25 text-white rounded-[8px] flex items-center gap-2"><Calendar size={16}/> {data.year}</span>
          </div>

          {/* Heading */}
          <h1 className="mb-[24px] mt-[0px] font-[Magistral] text-[28px] leading-[36px] md:text-[54px] md:leading-[64.6px] font-bold tracking-[-1.44px] text-white italic">
           {data.title}
          </h1>
          {/* Subtitle */}
          <div className="flex flex-wrap items-start text-[16px] leading-[26px] md:text-[20px] text-white md:leading-[33px] tracking-[-0.5px]">
          <p>{data.subtitle}</p>
</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainBanner;
