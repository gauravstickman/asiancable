import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Hero = ({ data }: { data?: any }) => {
  const bgImage = data?.headerBgImage?.startsWith('http') 
    ? data.headerBgImage 
    : `${process.env.NEXT_PUBLIC_API_URL}${data?.headerBgImage || '/assets/Lifeofasiancables/ImageWithFallback.png'}`;

  return (
    <div>
        <section
        className="relative  bg-cover bg-[position:75%_center] lg:bg-center"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 flex  items-center">
          <div className="max-w-[711px] mt-[185px] mb-[78.61px] px-5 sm:px-0 ml-0 sm:ml-8 md:ml-16 lg:ml-20 text-white">

            {/* Breadcrumb */}
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm flex items-center gap-2">
              <span>Home</span>
              <span>•</span>
              <span className="font-semibold">{data?.headerTag || 'Culture'}</span>
            </div>

            {/* Heading */}
            <h1
              className={`
                max-w-[522px]
                text-[34px]
                sm:text-[42px]
                md:text-[54px]
                leading-[1.2]
                md:leading-[64.6px]
                tracking-[-1.44px]
                font-bold italic
                mb-4 sm:mb-6
              `}
            >
              {data?.headerTitle || 'Your Connection to Brighter Future'}
            </h1>

            {/* Paragraph */}
            <p
              className={`
                max-w-[711px]
                text-[16px]
                md:text-[20px]
                leading-[28px]
                md:leading-[33px]
                tracking-[-0.5px]
                font-normal
                text-white/95
                mb-9 sm:mb-8
              `}
            >
              {data?.headerDescription || "At Asian Cables, part of RPG Group, we don't just manufacture wires and cables — we build the connections that power homes, industries, and progress across the globe."}
            </p>

            {/* Button */}
 
 <Link
  href="#openroles"
  className="sparkle
    group
    relative
    inline-flex
    items-center
    gap-2
    rounded-[6px]
    bg-white
    px-5
    py-2
    text-[16px]
    font-[500]
    text-[#1E3C8C]
    transition-all
    duration-300
    hover:bg-transparent
    hover:text-white
    md:text-[20px]
  "
>
  Explore Open Roles

  <ChevronRight size={20} />

  <span
    className="
      absolute
      inset-0
      rounded-[6px]
      opacity-0
      group-hover:opacity-100
      transition-opacity
      duration-300
      pointer-events-none
    "
    style={{
      boxShadow:
        "inset 0 0 0 2px transparent",
      borderRadius: "6px",
      background:
        "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      padding: "2px",
    }}
  />
</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
