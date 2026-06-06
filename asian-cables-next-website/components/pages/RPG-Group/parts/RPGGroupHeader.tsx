"use client";

import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function ManufacturingHeader() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Leadership" },
  ];

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-white">
      {/* Background Image */}
      <img
        src="/assets/rpggroup/rpgheaderIcon.png"
        alt="RPG Group"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* White Fade Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/92 via-[42%] to-transparent" />

      {/* Soft Extra Blur Layer */}
      <div className="absolute inset-0 z-10 bg-white/8 backdrop-blur-[1px]" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl">
        {/* Left Content aligned exactly like second component */}
        <div className="pt-58 pb-[64px]">
          {/* Breadcrumb */}
          <nav className="mb-7 flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-['Work_Sans'] font-normal text-[16px] leading-[36px] tracking-[0px] text-[#AAAAAA]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-['Work_Sans'] font-medium text-[16px] leading-[36px] tracking-[0px] text-[#4B4B4B]">
                    {item.label}
                  </span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <Dot className="h-6 w-6 text-[#BEBEBE]" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Heading */}
          <h1 className="font-[Magistral] text-[64px] leading-[68px] tracking-[-1.44px] font-bold italic text-[#1E3C8C]">
            RPG GROUP
            <br />
            Powered by Passion.Driven
            <br />
            by Ethics.
          </h1>

          {/* Subtitle */}
          <p className="mt-[27px] max-w-[550px] font-['Work_Sans'] font-normal text-[20px] leading-[31px] tracking-[0px] text-[#767676]">
            For nearly four decades, Asian Cables has been at the forefront of
            cable manufacturing excellence
          </p>
        </div>
      </div>
    </section>
  );
}

export default ManufacturingHeader;