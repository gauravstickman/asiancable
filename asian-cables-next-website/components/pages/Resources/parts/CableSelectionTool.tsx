"use client";

import { ChevronRight } from "lucide-react";

export default function CableSelectionTool({ data }: { data?: any }) {
  const topCards = [
    {
      title: data?.featuredTool?.title || "Cable Selection Tool",
      desc: data?.featuredTool?.description || "Identify the right cable for your application based on voltage, current, installation conditions, and performance requirements.",
      icon: data?.featuredTool?.icon || "/assets/resources/calculator.png",
      bgImage: data?.featuredTool?.backgroundImage || "/assets/resources/img-1.jpg",
      button: true,
      buttonText: data?.featuredTool?.buttonText || "Launch Tool",
      buttonLink: data?.featuredTool?.buttonLink || "#",
    },
    {
      title: "D-Rating Tool",
      desc: "Calculate derating factors based on installation conditions, ambient temperature, and load requirements.",
      icon: "/assets/resources/wrenchIcon.png",
    },
  ];

  const bottomCards = data?.toolsList && data.toolsList.length >= 2
    ? data.toolsList.slice(0, 2)
    : [
      {
        title: "Pricing Calculator",
        desc: "Generate indicative pricing based on cable specifications and project requirements.",
        icon: "/assets/resources/rupeeIcon.png",
        active: true,
      },
      {
        title: "Technical Blogs & Insights",
        desc: "Access technical perspectives, application insights, and industry developments across cable systems and infrastructure.",
        icon: "/assets/resources/openbookIcon.png",
      },
    ];

  const tabs = [
    { id: "cable", label: "Cable Selection" },
    { id: "rating", label: "D Rating" },
    { id: "calculator", label: "Pricing Calculator" },
  ];

  return (
    <section className="mt-5 bg-gray-50  md:py-12">
      <div className="mx-auto max-w-[1264px] px-0">
        {/* CARD CONTAINER */}
        <div className="relative  bg-[#FFFFFF] px-[16px] py-[15px]">
          {/* TOP SECTION - Two column grid 65/35 ratio */}
          <div className="mb-6 flex flex-col md:grid md:grid-cols-[814px_394px] gap-6">
            {topCards.map((item, index) => (
              <div
                key={index}
                className={`group relative flex md:h-[270px] flex-col overflow-hidden rounded-[4px] transition-all duration-500 hover:-translate-y-[6px] hover:shadow-[0_18px_45px_rgba(30,60,140,0.22)] ${index === 0
                    ? "bg-gradient-to-r from-[#2A4FA0] to-[#1E3C8C] text-white"
                    : "bg-[#F9F9F9] text-gray-900 hover:bg-[#1E3C8C]"
                  } ${index === 0
                    ? "px-[30px] pt-[36px] pb-[36px]"
                    : "px-[30px] pt-[36px] pb-[36px]"
                  }`}
              >
                {/* Background image */}
                {item.bgImage && (
                  <>
                    <img
                      src={item.bgImage}
                      alt=""
                      className="resource-img pointer-events-none absolute inset-0 object-cover object-right"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2A4FA0] via-[#2A4FA0]/85 to-[#1E3C8C]/70" />
                  </>
                )}

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col">
                  {/* TOP CONTENT */}
                  <div className="flex flex-col gap-[9.5px]">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-[48px] w-[48px] resource-img md:h-[64px] md:w-[64px] object-contain transition-all duration-500 group-hover:scale-110"
                    />

                    <div className="flex justify-between">
                      <p
                        className={`${index === 0
                            ? "max-w-[420px] font-[Magistral] text-[26px] md:text-[38px] md:leading-[46.2px] font-bold tracking-[0px] text-[#FFFFFF] italic"
                            : "max-w-[240px] text-[26px] leading-[36px] font-medium tracking-[0px] text-[#1E3C8C] transition-all duration-500 group-hover:text-white"
                          }`}
                      >
                        {item.title}
                      </p>

                      {item.button && (
                        <div className="mt-auto md:flex justify-end hidden">
                          <a href={item.buttonLink} className="flex h-[48.39px] w-fit items-center gap-[9.19px] rounded-[5.52px] bg-white px-[29.42px] py-[9.19px] transition-all duration-500 hover:bg-gray-50">
                            <span className="font-['Work_Sans'] text-[20px] leading-[29.42px] font-medium tracking-[-0.46px] text-[#1E3C8C]">
                              {item.buttonText}
                            </span>

                            <ChevronRight
                              size={22}
                              className="text-[#1E3C8C]"
                            />
                          </a>
                        </div>
                      )}
                    </div>

                    <p
                      className={`${index === 0
                          ? "max-w-[430px] text-[#FFFFFFE5]"
                          : "text-[16px] leading-[27.5px] md:text-[18px] md:leading-[21px] font-normal tracking-[0px] text-[#1E3C8CCC] transition-all duration-500 group-hover:text-[#FFFFFFE5]"
                        }`}
                    >
                      {item.desc}
                    </p>


                    {item.button && (
                      <div className="mt-auto flex justify-end md:hidden">
                        <a href={item.buttonLink}  className=" mr-auto mt-[30px] flex h-[48.39px] w-fit items-center gap-[9.19px] rounded-[5.52px] bg-white px-[29.42px] py-[9.19px] transition-all duration-500 hover:bg-gray-50">
                          <span className="font-['Work_Sans'] text-[20px] leading-[29.42px] font-medium tracking-[-0.46px] text-[#1E3C8C]">
                            {item.buttonText}
                          </span>

                          <ChevronRight
                            size={22}
                            className="text-[#1E3C8C]"
                          />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* BUTTON */}
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM SECTION - Two equal columns */}
          <div className="flex flex-col md:grid grid-cols-[394px_814px] gap-6">
            {bottomCards.map((item: any, index: number) => (
              <div
                key={index}
                className={`group flex md:h-[270px] flex-col items-start rounded-[4px] bg-[#F9F9F9] transition-all duration-500 hover:-translate-y-[6px] hover:bg-[#1E3C8C] hover:shadow-[0_18px_45px_rgba(30,60,140,0.22)] ${index === 0
                    ? "px-[30px] pt-[36px] pb-[36px]"
                    : "px-[30px] pt-[36px] pb-[36px]"
                  }`}
              >
                {/* CONTENT */}
                <div className="flex flex-col gap-[11.5px]">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-10 w-10 resource-img object-contain transition-all duration-500 group-hover:scale-110"
                  />

                  <p className="text-[26px] leading-[36px] font-medium tracking-[0px] text-[#1E3C8C] transition-all duration-500 group-hover:text-white">
                    {item.title}
                  </p>

                  <p className="max-w-[640px] text-[18px] leading-[21px] font-normal tracking-[0px] text-[#1E3C8CCC] transition-all duration-500 group-hover:text-[#FFFFFFE5]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
