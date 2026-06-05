import React from 'react'

const Hero = () => {
  return (
    <div>
        <section
        className="relative min-h-screen bg-cover bg-[position:75%_center] lg:bg-center"
        style={{
          backgroundImage:
            "url('/assets/Lifeofasiancables/ImageWithFallback.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="max-w-[711px] px-6 sm:px-0 ml-0 sm:ml-8 md:ml-16 lg:ml-20 text-white">

            {/* Breadcrumb */}
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm flex items-center gap-2">
              <span>Home</span>
              <span>•</span>
              <span className="font-semibold">Culture</span>
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
              Your Connection to
              <br />
              Brighter Future
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
                mb-6 sm:mb-8
              `}
             
            >
              At Asian Cables, part of RPG Group, we don't just
              manufacture wires and cables — we power industries,
              enable homes, and connect communities. Be part of a
              team that builds with purpose and grows with pride.
            </p>

            {/* Button */}
 <button
  className={`
    w-full
    sm:w-auto
    inline-flex
    items-center
    justify-center
    gap-2
    bg-white
    text-[#1F3A93]
    text-[16px]
    px-[29.42px]
    py-[14px]
    sm:py-[9.19px]
    rounded-[8px]
    sm:rounded-[5.52px]
    border border-transparent
    font-semibold
    transition-all
    duration-300
    hover:bg-transparent
    hover:text-white
  `}
  onMouseEnter={(e) => {
    e.currentTarget.style.border = "2px solid";
    e.currentTarget.style.borderImage =
      "linear-gradient(90deg,#FFD600,#FF4D4D,#00BFFF) 1";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.border = "1px solid transparent";
    e.currentTarget.style.borderImage = "";
  }}
>
  Explore Open Roles 〉
</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
