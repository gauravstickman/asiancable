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
    <section className="relative h-screen min-h-[760px] overflow-hidden bg-white">
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
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          {/* Left Content */}
          <div className="max-w-[760px] pt-10">
            {/* Breadcrumb */}
            <nav className="mb-10 flex items-center gap-1 text-[14px]">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-medium text-[#9A9A9A] transition-colors duration-300 hover:text-[#1E3C8C]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-[#5B5B5B]">
                      {item.label}
                    </span>
                  )}

                  {index < breadcrumbs.length - 1 && (
                    <Dot className="h-4 w-4 text-[#BEBEBE]" />
                  )}
                </React.Fragment>
              ))}
            </nav>
            <h1 className="w-full text-[60px] leading-[0.95] font-black tracking-[-3px] text-[#1E3C8C] italic ">
              RPG GROUP
              <br />
              Powered by Passion.Driven
              <br />
               by Ethics.
            </h1>
            <p className="mt-10 max-w-[550px] text-[16px] leading-[1.6] font-normal text-[#767676]">
              For nearly four decades, Asian Cables has been at the forefront of
              cable manufacturing excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManufacturingHeader;
