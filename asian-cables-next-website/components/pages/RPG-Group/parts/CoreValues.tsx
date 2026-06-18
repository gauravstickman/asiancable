"use client";

export default function CoreValues({ data }: { data?: any }) {
  const values = data?.coreValuesCards?.length > 0 ? data.coreValuesCards.map((val: any) => ({
    title: val.title,
    desc: val.desc,
    icon: val.icon ? (val.icon.startsWith('http') ? val.icon : `${process.env.NEXT_PUBLIC_BASE_URL}${val.icon}`) : "/assets/rpggroup/boldpower.png"
  })) : [
    {
      title: "UNLEASH TALENT",
      desc: "Enabling an environment for people to unleash their entrepreneurial spirit and realise their full potential.",
      icon: "/assets/rpggroup/boldpower.png"
    },
    {
      title: "TOUCH LIVES",
      desc: "To understand, care and make a meaningful difference to customers, employees, society and all stakeholders.",
      icon: "/assets/rpggroup/boldpower.png"
    },
    {
      title: "OUT PERFORM",
      desc: "Sustained and clear outperformance relative to all our competitors and industry benchmarks.",
      icon: "/assets/rpggroup/boldpower.png"
    },
    {
      title: "HELLO HAPPINESS",
      desc: "To have fun by creating a high-energy environment with a keen sense of belonging.",
      icon: "/assets/rpggroup/boldpower.png"
    },
  ];

  return (
    <section className="bg-white md:pt-10 pb-20">
      <div className="mx-auto px-5 md:px-0 w-[100%] max-w-[1274px]">
        {/* TITLE */}
        <p className="font-bold md:mb-10 italic text-[24px] leading-[125%] md:text-[46px] md:leading-[61.6px] mb-6 tracking-[-2.8px] text-center text-[#1E3C8C] font-[magistral]">
          {data?.coreValuesTitle || "Core Values"}
        </p>

        {/* GRID */}
        <div className="flex overflow-x-scroll industries flex-nowrap gap-2 md:grid grid-cols-1 md:gap-[32px] md:grid-cols-2 xl:grid-cols-4">
          {values.map((item: any, index: number) => (
            <div
              key={index}
              className="group flex min-w-[240px]  md:min-w-[auto] min-h-[320px] w-[293.75px] flex-col gap-[18px] rounded-[4px] border border-[#E5E7EB] bg-[#B7B7B71A] p-3 md:p-[41px]  md:px-6 py-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
            >
              {/* ICON */}
              <div className="mb-6 flex justify-center">
                <img
                  src={item.icon}
                  alt=""
                  className="h-16 w-16 object-contain transition-transform duration-300"
                />
              </div>

              {/* TITLE */}
              <span className="font-inter font-medium text-[22px] leading-[33px] tracking-[0px] text-center text-[#1E3C8C]">
                {item.title}
              </span>

              {/* DESC */}
              <p className="dm-font text-[14px] text-caption text-center font-normal tracking-[0px] text-[#6F6F6FB2]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
