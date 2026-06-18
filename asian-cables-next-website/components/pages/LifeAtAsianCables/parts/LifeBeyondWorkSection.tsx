"use client";

import Image from "next/image";

export default function LifeBeyondWorkSection({ data }: { data?: any }) {

  // Ensure we have 5 images for the grid layout by falling back to static images
  const apiImages = data?.lifeBeyondImages || [];
  
  const staticImages = [
    "/assets/Lifeofasiancables/gallery1.png",
    "/assets/Lifeofasiancables/gallery2.png",
    "/assets/Lifeofasiancables/gallery3.png",
    "/assets/Lifeofasiancables/gallery4.png",
    "/assets/Lifeofasiancables/gallery5.png"
  ];
  
  const getImageUrl = (index: number) => {
    if (apiImages[index]) {
      const url = apiImages[index];
      return url.startsWith('http') 
        ? url 
        : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    }
    return staticImages[index];
  };

  return (
    <section className=" md:mt-10 bg-white py-[40px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-[40px] lg:px-[60px]">

        {/* Heading */}
        <div className="mb-8 lg:mb-12">
          <h2
            className="text-[#21409A] text-[30px] sm:text-[36px] lg:text-[44px] font-bold italic leading-none"
            
          >
            {data?.lifeBeyondTitle || "Life Beyond Work"}
          </h2>
          

          <p className="max-w-[100%] mt-5 text-[#525252] text-[16px] lg:text-[18px] leading-[28px] lg:leading-[36px]">
            {data?.lifeBeyondDescription || "A quick glimpse into the moments that make Asian Cables a great place to work — from celebrations and community events to the everyday interactions that build our culture."}
          </p>
        </div>

        {/* Gallery */}
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-3 md:gap-4">

          {/* Left Large Image */}
          <div className="relative h-[315px] lg:h-[620px] overflow-hidden rounded-[10px]">
            <Image
              src={getImageUrl(0)}
              alt="Life Beyond Work"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">

            <div className="relative h-[184px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src={getImageUrl(1)}
                alt="Team Meeting"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="relative h-[184px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src={getImageUrl(2)}
                alt="Discussion"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="relative h-[184px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src={getImageUrl(3)}
                alt="Event"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="relative h-[184px] lg:h-[302px] overflow-hidden rounded-[10px]">
              <Image
                src={getImageUrl(4)}
                alt="Conference"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}