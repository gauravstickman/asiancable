import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function SustainabilityHeader() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Sustainability", href: "/sustainability" },
  ];

  const stats = [
    {
      value: "IGBC",
      description: "Platinum Certified Green Factory",
    },
    {
      value: "96%",
      description: "Mysuru plant running on renewable energy",
    },
    {
      value: "70%",
      description: "Vadodara plant running on renewable energy",
    },
    {
      value: "100%",
      description: "Recycling of water in both plants.",
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/sustainability/bgIcon.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-3 pt-55 pb-[60px] text-white">
          {/* Breadcrumb */}
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-worksans text-[16px] leading-[36px] font-normal text-[#FFFFFFD4]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-worksans text-[16px] leading-[36px] font-medium tracking-[0px] text-[#FFFFFF]">
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
          <h1 className="font-[magistral] text-[68px] leading-[64.6px] font-bold tracking-[-1.44px] italic">
            Powering Infrastructure
            <span className="block font-[magistral] text-[68px] leading-[64.6px] font-bold tracking-[-1.44px] italic">
              Responsibly
            </span>
          </h1>

          {/* Stats */}
          <div className="flex w-[851px] h-[208px] gap-[24px] pl-[16px] relative mt-8 mb-2">
            <div className="mt-13 grid max-w-[920px] h-[208px] grid-cols-2 gap-[24px]">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <h3 className="font-[magistral] text-[42px] leading-[36.46px] font-bold italic tracking-[0px] text-white">
                    {stat.value}
                  </h3>

                  <p className="text-[16px] mt-2 leading-[19.5px] font-normal tracking-[0px] text-[#FFFFFFCC]">
                    {stat.description}
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
