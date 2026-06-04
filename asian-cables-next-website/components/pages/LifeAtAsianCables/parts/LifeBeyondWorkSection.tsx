"use client";

import Image from "next/image";

export default function LifeBeyondWorkSection() {
  return (
    <section className="bg-white py-[40px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-[40px] lg:px-[60px]">

        {/* Heading */}
        <div className="mb-8 lg:mb-12">
          <h2
            className="text-[#21409A] text-[30px] sm:text-[36px] lg:text-[44px] font-bold italic leading-none"
            style={{ fontFamily: "Magistral" }}
          >
            Life Beyond Work
          </h2>
          

          <p className="max-w-[1150px] mt-5 text-[#5F5F5F] text-[16px] lg:text-[20px] leading-[28px] lg:leading-[38px]">
            We believe great workplaces are built on meaningful human
            connections. Across our locations, employees come together
            through celebrations, team engagement activities, learning
            experiences, recognition moments, and community initiatives.
            It's all part of creating a workplace where people feel
            connected, valued, and inspired.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-4">

          {/* Left Large Image */}
          <div className="relative h-[430px] lg:h-[620px] overflow-hidden rounded-[10px]">
            <Image
              src="/assets/Lifeofasiancables/lifebeyondwork1.png"
              alt="Life Beyond Work"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-4">

            <div className="relative h-[210px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src="/assets/Lifeofasiancables/lifebeyondwork2.png"
                alt="Team Meeting"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="relative h-[210px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src="/assets/Lifeofasiancables/lifebeyondwork3.png"
                alt="Discussion"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="relative h-[210px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src="/assets/Lifeofasiancables/lifebeyondwork4.png"
                alt="Event"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="relative h-[210px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src="/assets/Lifeofasiancables/lifebeyondwork5.png"
                alt="Conference"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}