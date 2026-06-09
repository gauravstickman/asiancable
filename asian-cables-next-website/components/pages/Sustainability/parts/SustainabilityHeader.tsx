import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function SustainabilityHeader({ data }: { data?: any }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Sustainability", href: "/sustainability" },
  ];

  const stats = data?.stats?.length > 0 ? data.stats : [
    {
      value: "IGBC",
      label: "Platinum Certified Green Factory",
    },
    {
      value: "96%",
      label: "Mysuru plant running on renewable energy",
    },
    {
      value: "70%",
      label: "Vadodara plant running on renewable energy",
    },
    {
      value: "100%",
      label: "Recycling of water in both plants.",
    },
  ];

  const bgImage = data?.heroImage 
    ? (data.heroImage.startsWith('http') ? data.heroImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.heroImage}`) 
    : "/assets/sustainability/bgIcon.png";
    
  const heroTitle = data?.heroTitle || "Powering Infrastructure\nResponsibly";

  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src={bgImage}
          alt="Sustainability Hero"
          className="absolute inset-0 h-full w-full object-cover object-center hidden md:block"
        />
        {/* Mobile Background Image can be handled via CSS or another img tag if data.heroMobileImage is used, but following existing layout we keep it simple or use heroMobileImage if provided */}
        <img
          src={data?.heroMobileImage ? (data.heroMobileImage.startsWith('http') ? data.heroMobileImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.heroMobileImage}`) : bgImage}
          alt="Sustainability Hero Mobile"
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.2)_50%,_rgba(0,0,0,0.6)_100%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-3 pt-55 pb-[60px] text-white">
          {/* Breadcrumb */}
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-worksans text-[14px] md:text-[16px] leading-[36px] font-normal text-[#FFFFFFD4]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-worksans text-[14px] md:text-[16px] leading-[36px] font-medium tracking-[0px] text-[#FFFFFF]">
                    {item.label}
                  </span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <Dot className="h-6 w-6 text-white" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Heading */}

          <h1 
            className="font-[magistral] text-[36px] leading-[140%] md:text-[68px] md:leading-[64.6px]  font-bold tracking-[-1.44px] italic"
            dangerouslySetInnerHTML={{ __html: heroTitle.replace(/\n/g, '<br/>') }}
          />

          {/* Stats */}
          <div className="flex md:w-[851px]  gap-[24px]  md:pl-[16px] relative mt-8 mb-2">
            <div className="mt-13 grid md:max-w-[920px]  grid-cols-2 gap-[24px]">
              {stats.map((stat: any) => (
                <div key={stat.value} className="md:w-[auto]">
                <p className="relative font-[magistral] text-[24px] leading-[50px] md:text-[38px] md:leading-[83.02px] font-bold text-white italic">
                    {stat.value}
                  </p>

                <p className="relative font-worksans text-[14px] md:leading-[21px] md:text-[15.81px] md:leading-[23.72px] font-medium text-[#FFFFFFB5]">
                    {stat.label || stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SustainabilityHeader;
