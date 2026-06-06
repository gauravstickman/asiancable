"use client";

function SustainabilityHighlights() {
  const baseSlides = [
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
    <section className="bg-[#F5F5F5] py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="mb-8 text-[46px] leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          Sustainability Highlights
        </h2>
      </div>
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex w-max gap-[24px]">
            {/* FIRST SET */}
            {baseSlides.map((slide, index) => (
              <div
                key={index}
                className="sustain-card relative  w-[779.33px] h-[718px]  flex-shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute top-[1px] left-[1px] w-[779.33px] h-[718px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute right-20 bottom-5 left-10 text-white">
                  <h3 className="font-[Magistral] text-[28px] leading-[50.4px] font-bold tracking-[0px] text-[#FFFFFF] italic">
                    {slide.title}
                  </h3>
                  <p className="mt-2 mb-4 text-[18px] leading-[24px] font-normal tracking-[0px] text-[#FFFFFFE5]">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            {/* DUPLICATE SET */}
            {baseSlides.map((slide, index) => (
              <div
                key={`duplicate-${index}`}
                className="sustain-card relative h-[420px]  w-[779.33px] h-[718px] flex-shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute top-[1px] left-[1px] w-[779.33px] h-[718px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute right-20 bottom-5 left-10 text-white">
                  <h3 className="font-[Magistral] text-[28px] leading-[50.4px] font-bold tracking-[0px] text-[#FFFFFF] italic">
                    {slide.title}
                  </h3>
                  <p className="mt-2 mb-4 text-[18px] leading-[24px] font-normal tracking-[0px] text-[#FFFFFFE5]">
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
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          :global(.animate-marquee) {
            animation: marquee 40s linear infinite;
          }
        `}</style>
    </section>
  );
}

export default SustainabilityHighlights;
