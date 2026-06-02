import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function ProductRangeSection({ dynamicData }: { dynamicData?: any[] }) {
  const staticProducts = [
    {
      title: "Specialty Cables",
      image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1400&auto=format&fit=crop",
      large: true,
      points: [
        "Fire-Survival & LSZH",
        "Solar & EV Charging Ready",
        "Oil & Gas Rated",
      ],
    },
    {
      title: "Power Cables",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
      points: ["Up to 220 kV", "Single & Multicore", "Factory-Tested"],
    },
    {
      title: "Railway Cables",
      image:
        "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop",
      points: [
        "Contact & Catenary Wires",
        "Signaling & Quad Cables",
        "Fire-Survival for Tunnels",
      ],
    },
    {
      title: "Control & Instrumentation",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
      points: ["Screened & Armoured", "FR / FRLS / LSZH", "Up to 61+ Cores"],
    },
    {
      title: "Conductors",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
      points: [
        "AAC, AAAC, ACSR, Al 59",
        "Overhead Transmission",
        "High-Temperature Rated",
      ],
    },
    {
      title: "Telecom & OFC",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
      wide: true,
      points: [
        "Single & Multi-Mode Fibre",
        "Up to 288+ Fibre Counts",
        "ADSS & Armoured Options",
      ],
    },
  ];

  // We need exactly 6 products for the UI grid to look complete on desktop
  // So we pad with static products if dynamic ones aren't enough
  const displayProducts = [
    ...(dynamicData || []),
    ...staticProducts.slice(dynamicData?.length || 0),
  ].slice(0, 6);

  return (
    <section className="reveal-section bg-[#f5f5f5] pt-[72px] py-10 md:pt-[100px]">
      <div className="mx-auto max-w-[1320px] md:px-4">
        {/* HEADING */}
        <div className="mb-8 text-center md:px-0 px-4 md:mb-[39px]">
          <h2 className="mb-2 md:mb-4 text-[32px]  text-[#1E3C8C] italic font-[700] md:text-[46px] leading-[100%] tracking-[-2%]">
            Our Products Range
          </h2>

          <p className="text-[20px] leading-[106%] font-[500] text-[#5E7BC0] md:text-[24px] md:leading-[150%]">
            End-to-End Cable Systems. One Reliable Partner.
          </p>
        </div>

        {/* GRID */}
        <div className="hidden md:grid gap-4 md:grid-cols-12">
          {/* LEFT BIG CARD */}
          <div className="col-span-12 lg:col-span-4">
            <div className="group relative h-[646px] overflow-hidden rounded-[4px]">
              <img
                src={displayProducts[0].image}
                alt={displayProducts[0].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* TITLE */}
              <div className="absolute top-6 left-6">
                <h3 className="text-[20px] font-[700] text-white italic md:text-[24px] leading-[32px] tracking-[-0.5px]">
                  {displayProducts[0].title}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="absolute right-[18px] bottom-[30px] left-[18px]">
                <div className="space-y-2 md:space-y-2">
                  {displayProducts[0].points.map((point: string, index: number) => (
                    <div
                      key={index}
                      className="flex font-dm items-center gap-2 font-[400] text-[16px] leading-[26px] tracking-[-0.5px] text-white"
                    >
                      <span>
                        <Check size={14} />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute right-0 bottom-0 flex justify-end">
                  <Link href={displayProducts[0].link || "/products"} className="flex font-dm items-center gap-2 text-[16px] leading-[16px] tracking-[-0.5px] text-white hover:underline">
                    Read More
                    <span>
                      <ChevronRight size={15} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID */}
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-8">
            {/* TOP ROW */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* CARD */}
              {displayProducts.slice(1, 3).map((item, index) => (
                <div
                  key={index}
                  className="group relative h-[315px] overflow-hidden rounded-[4px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* TITLE */}
                  <div className="absolute top-5 left-5">
                    <h3 className="text-[20px] font-black text-white italic md:text-[24px] leading-[32px] tracking-[-0.5px]">
                      {item.title}
                    </h3>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute right-5 bottom-5 left-5">
                    <div className="space-y-2 md:space-y-2">
                      {item.points.map((point: string, idx: number) => (
                       <div
                      key={idx}
                      className="flex font-dm items-center gap-2 font-[400] text-[16px] leading-[26px] tracking-[-0.5px] text-white"
                    >
                          <span>
                            <Check size={14} />
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute right-0 bottom-0 flex justify-end">
                    <Link href={item.link || "/products"} className="flex font-dm items-center gap-2 text-[16px] leading-[16px] tracking-[-0.5px] text-white hover:underline">
                    Read More
                    <span>
                      <ChevronRight size={15} />
                    </span>
                  </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {displayProducts.slice(3, 5).map((item, index) => (
                <div
                  key={index}
                  className="group relative h-[315px] overflow-hidden rounded-[4px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* TITLE */}
                  <div className="absolute top-5 left-5">
                    <h3 className="max-w-[300px] text-[20px] font-[700] text-white italic md:text-[24px] leading-[32px] tracking-[-0.5px]">
                      {item.title}
                    </h3>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute right-5 bottom-5 left-5">
                    <div className="space-y-2 md:space-y-2">
                      {item.points.map((point: string, idx: number) => (
                       <div
                      key={idx}
                      className="flex font-dm items-center gap-2 font-[400] text-[16px] leading-[26px] tracking-[-0.5px] text-white"
                    >
                          <span>
                            <Check size={14} />
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute right-0 bottom-0 flex justify-end">
                    <Link href={item.link || "/products"} className="flex font-dm items-center gap-2 text-[16px] leading-[16px] tracking-[-0.5px] text-white hover:underline">
                    Read More
                    <span>
                      <ChevronRight size={15} />
                    </span>
                  </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM WIDE CARD */}
          <div className="group relative h-[299px] w-[100%]  overflow-hidden rounded-[4px] lg:col-span-12">
            <img
              src={displayProducts[5].image}
              alt={displayProducts[5].title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* TITLE */}
            <div className="absolute top-6 left-6">
              <h3 className="text-[20px] font-black text-white italic md:text-[34px]">
                {displayProducts[5].title}
              </h3>
            </div>

            {/* CONTENT */}
            <div className="absolute right-6 bottom-6 left-6">
              <div className="space-y-2 md:space-y-2">
                {displayProducts[5].points.map((point: string, index: number) => (
                  <div
                      key={index}
                      className="flex font-dm items-center gap-2 font-[400] text-[16px] leading-[26px] tracking-[-0.5px] text-white"
                    >
                    <span>
                      <Check size={14 } />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="absolute right-0 bottom-0 flex justify-end">
                <Link href={displayProducts[5].link || "/products"} className="flex font-dm items-center gap-2 text-[16px] leading-[16px] tracking-[-0.5px] text-white hover:underline">
                    Read More
                    <span>
                      <ChevronRight size={15} />
                    </span>
                  </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE */}

        <div className=" px-5 md:hidden">
  <Swiper
  
  modules={[Pagination, Autoplay]}
  slidesPerView={1}
  loop={true}
  pagination={{
    clickable: true,
  }}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
  }}
  className="mx-5"
  >
    {displayProducts.map((item, index) => (
      <SwiperSlide key={index}>

        {/* SAME CARD CONTENT */}
        <div className="relative h-[600px] overflow-hidden rounded-[4px]">
          
  {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <h3 className="text-[20px] font-black text-white italic md:text-[34px]">
                    {item.title}
                  </h3>
                </div>
                {/* CONTENT */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  {/* FEATURES */}
                  <div className="absolute right-4 bottom-6 left-4">
                    <div className="space-y-2 md:space-y-3">
                      <div className="mt-8 flex flex-col gap-1">
                        {item.points.map((feature: string, i: number) => (
                          <div
                            key={i}
                            className="flex max-w-[215px] items-center gap-3"
                          >
                            <span className="text-white">✓</span>

                            <span className="text-[15px] text-white">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="absolute right-4 bottom-6 flex justify-end">
                    <Link href={item.link || "/products"} className="flex items-center gap-2 text-[16px] text-white hover:underline">
                      Read More
                      <span>›</span>
                    </Link>
                  </div>
                </div>

        </div>

      </SwiperSlide>
    ))}
  </Swiper>
</div>
      </div>
      <button className="border-it-b mx-auto mt-[39px] mb-[32px] md:mb-[60px] flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174]">
        View All
        <span>
          {" "}
          <ChevronRight size={18} />
        </span>
      </button>
    </section>
  );
}
