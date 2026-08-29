"use client";

import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function ManufacturingHeader({ data }: { data?: any }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "RPG Group" },
  ];

  return (
    <section className="relative min-h-[630px] overflow-hidden bg-white">
      {/* Background Image */}
      <img
        src={data?.heroImage ? (data.heroImage.startsWith('http') ? data.heroImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.heroImage}`) : "/assets/rpggroup/rpgheaderIcon.png"}
        alt="RPG Group"
        className="absolute inset-0 h-full w-full object-cover object-center hidden md:block"
      />
      <img
        src={data?.heroMobileImage ? (data.heroMobileImage.startsWith('http') ? data.heroMobileImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.heroMobileImage}`) : (data?.heroImage ? (data.heroImage.startsWith('http') ? data.heroImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.heroImage}`) : "/assets/rpggroup/rpgheaderIcon.png")}
        alt="RPG Group"
        className="absolute inset-0 h-full w-full object-cover object-center block md:hidden"
      />

      {/* White Fade Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/92 via-[42%] to-transparent" />

      {/* Soft Extra Blur Layer */}
      <div className="absolute inset-0 z-10 bg-white/8 backdrop-blur-[1px]" />

      {/* Content Container */}
        <div className="relative z-10 m-auto max-w-[1280px] px-5 md:px-0  ">
        {/* Left Content aligned exactly like second component */}
        <div className="pt-50 pb-[38px]">
          {/* Breadcrumb */}
          <nav className="md:mb-7 flex flex-wrap items-center md:gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-['Work_Sans'] font-normal text-[14px] md:leading-[21px] md:text-[15.81px] md:leading-[23.72px] text-[#AAAAAA]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-['Work_Sans'] font-medium text-[14px] md:leading-[21px] md:text-[15.81px] md:leading-[23.72px] text-[#4B4B4B]">
                    {item.label}
                  </span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <Dot className="h-6 w-6 text-[#BEBEBE]" />
                )}
              </React.Fragment>
            ))}
          </nav>

            <img src="/assets/rpggroup/rpg.png" alt="RPGnLogo" className="md:max-w-[200px] mt-5 max-w-[150px] md:mt-0 mb-5"/>
          {/* Heading */}
          <h1 className="md:block hidden md:mt-0 mt-2 font-[Magistral] text-[36px] leading-[140%] md:text-[64px] md:leading-[68px] tracking-[-1.44px] font-bold italic text-[#1E3C8C]" dangerouslySetInnerHTML={{ __html: data?.heroTitle ? data.heroTitle.replace(/\n/g, '<br/>') : 'RPG GROUP<br/>Powered by Passion. Driven<br/>by Ethics.' }}>
          </h1>

          <h1 className="md:hidden md:mt-0 mt-2 font-[Magistral] text-[36px] leading-[140%] md:text-[64px] md:leading-[68px] tracking-[-1.44px] font-bold italic text-[#1E3C8C]" dangerouslySetInnerHTML={{ __html: data?.heroTitle ? data.heroTitle.replace(/\n/g, ' ') : 'RPG GROUP Powered by Passion. Driven by Ethics.' }}>
          </h1>

          {/* Subtitle */}
          <p className="mt-[27px] max-w-[550px] font-['Work_Sans'] font-normal text-[18px] md:text-[20px] leading-[31px] tracking-[0px] text-[#767676]">
            {data?.heroDescription || ""}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ManufacturingHeader;