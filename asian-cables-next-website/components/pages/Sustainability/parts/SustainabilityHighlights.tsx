"use client";

function SustainabilityHighlights({ data }: { data?: any }) {
  const baseSlides = data?.highlights?.length > 0 ? data.highlights.map((h: any, i: number) => ({
      id: i + 1,
      image: h.image ? (h.image.startsWith('http') ? h.image : `${process.env.NEXT_PUBLIC_BASE_URL}${h.image}`) : "/assets/sustainability/img-6.png",
      title: h.title,
      description: h.description,
  })) : [
    {
      id: 1,
      image: "/assets/sustainability/img-6.png",
      title: "IGBC Platinum Certified Green Factory",
      description:
        "Our Vadodara manufacturing facility has been awarded Platinum Certification by the Indian Green Building Council (IGBC), reflecting our commitment to environmentally responsible industrial infrastructure and sustainable manufacturing practices.",
    },
    {
      id: 2,
      image: "/assets/sustainability/img-7.png",
      title: "Environmentally Responsible Manufacturing",
      description:
        "We follow sustainable manufacturing practices to minimise environmental impact and conserve resources.",
    },
    {
      id: 3,
      image: "/assets/sustainability/img-7.png",
      title: "Circular Materials & Energy Efficiency",
      description:
        "Investing in energy efficiency and circular material flows across our operations.",
    },
    {
      id: 4,
      image: "/assets/sustainability/img-6.png",
      title: "Sustainable Infrastructure",
      description:
        "Building sustainable world-class infrastructure through responsible manufacturing.",
    },
  ];

  // Duplicate slides for infinite marquee effect
  const slides = [...baseSlides, ...baseSlides];

  return (
    <section className="md:bg-[#F5F5F5]  pb-15 md:pt-20 md:pb-20">
      <div className="mx-auto max-w-[1280px] px-5">
        <h2 className="mb-8 text-[30px] leading-[40px] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] px-1 bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block italic">
          {data?.highlightsTitle || "Sustainability Highlights"}
        </h2>
      </div>
      <div className="relative highlights  oveflow-auto cursor-grab">
        <div className="  flex w-max gap-3 md:gap-[24px]  md:mx-[83px] mx-5">
            {/* FIRST SET */}
            {baseSlides.map((slide: any, index: number) => (
              <div
                key={index}
                className="sustain-card overflow-hidden1 relative w-[88vw] md:w-[779.33px] h-[418px] md:h-[718px]  flex-shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute top-[1px] left-[1px] w-[779.33px] h-[718px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute md:right-10 md:bottom-5 md:left-10 left-3 right-3 bottom-4 text-white">
                  <h3 className="font-[Magistral] text-[20px] leading-[28px] md:text-[28px] md:leading-[50.4px] font-bold tracking-[0px] text-[#FFFFFF] italic">
                    {slide.title}
                  </h3>
                  <p className="mt-2 sustain-desc mb-4 text-[16px] md:text-[18px] leading-[24px] font-normal tracking-[0px] text-[#FFFFFFE5]">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            {/* DUPLICATE SET */}
            {baseSlides.map((slide: any, index: number) => (
              <div
                key={`duplicate-${index}`}
                className="sustain-card overflow-hidden1 relative h-[420px] w-[88vw]  md:h-[718px] flex-shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute top-[1px] left-[1px] w-[100%] h-[718px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute md:right-10 md:bottom-5 md:left-10 left-3 right-3 bottom-4 text-white">
                  <h3 className="font-[Magistral] text-[20px] leading-[28px] md:text-[28px] md:leading-[50.4px] font-bold tracking-[0px] text-[#FFFFFF] italic">
                    {slide.title}
                  </h3>
                  <p className="mt-2 sustain-desc mb-4 text-[16px] md:text-[18px] leading-[24px] font-normal tracking-[0px] text-[#FFFFFFE5]">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          :global(.sustain-card) {
            border-radius: 8px;
            transition:
              transform 300ms ease,
              filter 300ms ease;
          }
          @keyframes marquee1 {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          :global(.animate-marquee2) {
            animation: none;
          }
            
    
        `}</style>
    </section>
  );
}

export default SustainabilityHighlights;
