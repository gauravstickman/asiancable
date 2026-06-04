"use client";

import Image from "next/image";
import { Play } from "lucide-react";

export default function DayInLifeSection() {
  return (
    <section className="bg-white py-12 md:py-[80px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[60px]">


        {/* Heading */}
        <h2
          className="text-[#21409A] text-[30px] sm:text-[36px] lg:text-[44px] font-bold italic mb-8 lg:mb-12"
          style={{ fontFamily: "Magistral" }}
        >
          A Day in the Life
        </h2>

        {/* Content */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-center">

          {/* Video Thumbnail */}
          <div className="relative">

            <Image
              src="/assets/Lifeofasiancables/dayinlife.png"
              alt="Day In Life"
              width={900}
              height={550}
              className="rounded-[10px] w-full object-cover"
            />

            {/* Play Button */}
            <button
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[64px]
                h-[64px]
                md:w-[90px]
                md:h-[90px]
                rounded-full
                bg-white/30
                backdrop-blur-sm
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:scale-110
              "
            >
              <Play
                size={34}
                fill="#4A4A4A"
                className="ml-1 text-[#4A4A4A]"
              />
            </button>
          </div>

          {/* Right Text */}
          <div className="max-w-full lg:max-w-[420px]">
            <p className="text-[#555] text-[16px] lg:text-[20px] leading-[30px] lg:leading-[42px]">
              In this section, we follow a junior engineer through
              a full working day at Asian Cables — from morning
              meetings and shop floor time to the everyday
              moments of collaboration, problem-solving, and
              progress that define life here.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}