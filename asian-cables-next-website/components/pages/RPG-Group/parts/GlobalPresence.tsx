"use client";

import React from "react";

const topContent = {
  title: "Global Presence",
  description:
    "Operating across 135+ countries with world-class manufacturing and distribution facilities",
};

const bottomStats = [
  {
    value: "35K+",
    label: "Employees",
    divider: true,
  },
  {
    value: "135+",
    label: "Countries",
  },
];

function GlobalPresenceSection() {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 120);
    return () => clearTimeout(t);
  }, []);

  const statsData = [
    {
      id: 1,
      title: (
        <>
          <span className="text-[#FF9800]">19</span>
          <span  className={`inline-block bg-gradient-to-r from-[#FFD212] via-[#F04123] to-[#3CAADF] bg-clip-text text-transparent ${
              animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            } transition-all duration-700`}
            style={{ transitionDelay: "360ms" }}>79</span>
        </>
      ),
      label: "Founded",
    },
    {
      id: 2,
      title: (
        <>
          <span
            className={`inline-block ${
              animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            } font-black text-[#3CAADF] transition-all duration-700`}
            style={{ transitionDelay: "120ms" }}
          >
            USD
          </span>{" "}
          <span
               className={`inline-block bg-gradient-to-r from-[#FFD212] via-[#F04123] to-[#3CAADF] bg-clip-text text-transparent ${
              animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            } transition-all duration-700`}
            style={{ transitionDelay: "360ms" }}
          >
            5.0
          </span>
          <br />
          <span
            className={`inline-block bg-gradient-to-r from-[#3CAADF] via-[#F04123] to-[#FFD212] bg-clip-text text-transparent ${
              animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            } transition-all duration-700`}
            style={{ transitionDelay: "360ms" }}
          >
            billion
          </span>
        </>
      ),
      label: "Group Turnover",
    },
    {
      id: 3,
      title: (
        <>
          <span className="bg-gradient-to-r from-[#FFD212] to-[#F04123] bg-clip-text text-transparent">
            DR. R P
          </span>{" "}
          <span
            className={`inline-block bg-gradient-to-r from-[#FFD212] via-[#F04123] to-[#3CAADF] bg-clip-text text-transparent ${
              animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            } transition-all duration-700`}
            style={{ transitionDelay: "360ms" }}
          >
            Goenka
          </span>
        </>
      ),
      label: "Founder",
      colSpan: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#002B8F] py-24">
      {/* Background */}
      <img
        src="/assets/rpggroup/bgIcons.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[#002B8F]/70" />

      <div className="absolute top-[-120px] right-[-220px] h-[520px] w-[520px] rounded-full bg-[#FF5A1F]/40 blur-[140px]" />

      <div className="absolute bottom-[-250px] left-[18%] h-[420px] w-[420px] rounded-full bg-[#FFB11F]/35 blur-[140px]" />

      {/* Main Container */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6">
        <div className="border-[4px] border-white bg-white p-[8px] shadow-[0px_30px_100px_rgba(0,0,0,0.35)]">
          {/* SAME HEIGHT BOTH SIDES */}
          <div className="grid items-stretch gap-[8px] lg:grid-cols-[580px_1fr]">
            {/* LEFT IMAGE SECTION */}
            <div className="relative h-[398px] overflow-hidden rounded-[4px]">
              <img
                src="/assets/rpggroup/planeIcon.png"
                alt="Global Presence"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 flex h-full flex-col justify-between px-[36px] py-[38px]">
                {/* TOP CONTENT */}
                <div className="pt-[70px]">
                  <p className="font-[Magistral] text-[38px] leading-[41.8px] font-bold tracking-[0px] text-white italic">
                    {topContent.title}
                  </p>

                  <p className="mt-6 max-w-[430px] font-['Work_Sans'] text-[16px] leading-[27.2px] font-normal tracking-[0px] text-[#FFFFFFCC]">
                    {topContent.description}
                  </p>
                </div>

                {/* BOTTOM STATS */}
                <div className="flex items-end gap-14">
                  {bottomStats.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-end gap-3">
                        <h3 className="font-[Magistral] text-[36px] leading-[54px] font-bold tracking-[0px] text-white italic">
                          {item.value}
                        </h3>

                        {item.divider && (
                          <div className="mt-6 ml-[36px] h-[40px] w-[3px] bg-gradient-to-b from-[#3CAADF] via-[#F04123] to-[#FFD212]" />
                        )}
                      </div>

                      <p className="font-['Work_Sans'] text-[13px] leading-[19.5px] font-normal tracking-[0px] text-[#FFFFFFCC]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT BOXES */}
            <div className="grid h-[398px] grid-cols-2 gap-[8px]">
              {/* CARD 1 */}
              <div className="flex h-[195px] flex-col justify-center rounded-[4px] bg-[#F6F6F6] pl-[36px]">
                <div className="flex flex-col gap-[26.5px]">
                  <p className="font-[magistral] text-[42px] leading-[42px] font-bold tracking-[0px] italic">
                    {statsData[0].title}
                  </p>

                  <p className="font-[work_sans] text-[18px] leading-[19.5px] font-normal tracking-normal text-[#000000CC]">
                    {statsData[0].label}
                  </p>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="flex h-[195px] flex-col justify-center rounded-[4px] bg-[#F6F6F6] pl-[36px]">
                <div className="flex flex-col gap-[26.5px]">
                  <p className="font-[magistral] text-[42px] leading-[42px] font-bold tracking-[0px] italic">
                    {statsData[1].title}
                  </p>

                  <p className="text-[18px] leading-[19.5px] font-normal tracking-normal text-[#000000CC]">
                    {statsData[1].label}
                  </p>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="col-span-2 flex h-[195px] flex-col justify-center rounded-[4px] bg-[#F6F6F6] pl-[36px]">
                <div className="flex flex-col gap-[26.5px]">
                  <p className="font-[magistral] text-[42px] leading-[42px] font-bold tracking-[0px] italic">
                    {statsData[2].title}
                  </p>

                  <p className="font-[work_sans] text-[18px] leading-[19.5px] font-normal tracking-normal text-[#000000CC]">
                    {statsData[2].label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalPresenceSection;
