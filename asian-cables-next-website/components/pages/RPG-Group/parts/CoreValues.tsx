"use client";

const values = [
  {
    title: "UNLEASH TALENT",
    desc: "Enabling an environment for people to unleash their entrepreneurial spirit and realise their full potential.",
  },
  {
    title: "TOUCH LIVES",
    desc: "To understand, care and make a meaningful difference to customers, employees, society and all stakeholders.",
  },
  {
    title: "OUT PERFORM",
    desc: "Sustained and clear outperformance relative to all our competitors and industry benchmarks.",
  },
  {
    title: "HELLO HAPPINESS",
    desc: "To have fun by creating a high-energy environment with a keen sense of belonging.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white md:pt-10 pb-20">
      <div className="mx-auto px-5 md:px-0 w-[100%] max-w-[1274px]">
        {/* TITLE */}
        <p className="font-bold md:mb-10 italic text-[24px] leading-[125%] md:text-[46px] md:leading-[61.6px] mb-6 tracking-[-2.8px] text-center text-[#1E3C8C] font-[magistral]">
          Core Values
        </p>

        {/* GRID */}
        <div className="flex overflow-x-scroll industries flex-nowrap gap-2 md:grid grid-cols-1 md:gap-[32px] md:grid-cols-2 xl:grid-cols-4">
          {values.map((item, index) => (
            <div
              key={index}
              className="group flex min-w-[240px]  md:min-w-[auto] h-[301px] w-[293.75px] flex-col gap-[18px] rounded-[4px] border border-[#E5E7EB] bg-[#B7B7B71A] p-3 md:p-[41px]  md:px-6 py-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
            >
              {/* ICON */}
              <div className="mb-6 flex justify-center">
                <img
                  src="/assets/rpggroup/boldpower.png"
                  alt=""
                  className="h-15 w-15 object-contain transition-transform duration-300 group-hover:scale-110"
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
