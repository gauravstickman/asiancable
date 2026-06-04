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

const statsData = [
  {
    id: 1,
    title: (
      <>
        <span className="text-[#FF9800]">19</span>
        <span className="text-[#53A7FF]">79</span>
      </>
    ),
    label: "Founded",
    borderRight: true,
    borderBottom: true,
  },
  {
    id: 2,
    title: (
      <>
        <span className="text-[#FFB100]">USD</span>{" "}
        <span className="text-[#D26489]">5.2</span>
        <br />
        <span className="text-[#D26489]">billion</span>
      </>
    ),
    label: "Group Turnover",
    borderBottom: true,
  },
  {
    id: 3,
    title: (
      <>
        <span className="text-[#FFB000]">DR. R P</span>{" "}
        <span className="text-[#D75A58]">Goenka</span>
      </>
    ),
    label: "Founder",
    colSpan: true,
  },
];

function GlobalPresenceSection() {
  return (
    <section className="relative overflow-hidden bg-[#002B8F] py-24">
      <img
        src="/assets/rpggroup/bgIcons.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#002B8F]/70" />
      <div className="absolute top-[-120px] right-[-220px] h-[520px] w-[520px] rounded-full bg-[#FF5A1F]/40 blur-[140px]" />
      <div className="absolute bottom-[-250px] left-[18%] h-[420px] w-[420px] rounded-full bg-[#FFB11F]/35 blur-[140px]" />
      <div className="relative z-20 mx-auto max-w-[1400px] px-6">
        <div className="overflow-hidden border-[4px] border-white bg-white shadow-[0px_30px_100px_rgba(0,0,0,0.35)]">
          <div className="grid lg:grid-cols-[1.12fr_1fr]">
            <div className="relative m-3 min-h-[470px] overflow-hidden">
              <img
                src="/assets/rpggroup/planeIcon.png"
                alt="Global Presence"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="relative z-10 flex h-full flex-col justify-between px-8 py-25">
                <div className="">
                  <h2 className="text-[56px] leading-[0.9] font-black italic tracking-[-2.5px] text-white">
                    {topContent.title}
                  </h2>
                  <p className="mt-6 max-w-[430px] text-[16px] font-normal leading-[2] font-medium text-[#FFFFFFCC]">
                    {topContent.description}
                  </p>
                </div>
                {/* BOTTOM STATS */}
                <div className="flex items-end gap-14">
                  {bottomStats.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-end gap-3">
                        <h3 className="text-[52px] leading-none font-black italic tracking-[-2px] text-white">
                          {item.value}
                        </h3>
                        {item.divider && (
                          <div className="mb-[-18] ml-[43px] h-[65px] w-[3px] bg-gradient-to-b from-[#3CAADF] via-[#F04123] to-[#FFD212]" />
                        )}
                      </div>
                      <p className="mt-2 text-[12px] uppercase tracking-[1.5px] text-white/70">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 bg-[#FFFFFF] p-4">
              {statsData.map((item) => (
                <div
                  key={item.id}
                  className={
                    `bg-[#F6F6F6] rounded-lg p-8 shadow-sm flex flex-col justify-center` +
                    (item.colSpan ? " col-span-2" : "")
                  }
                >
                  <h3 className="text-[58px] leading-[0.9] font-black italic tracking-[-2px] bg-clip-text text-transparent bg-gradient-to-r from-[#3CAADF] via-[#F04123] to-[#3CAADF]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[16px] font-medium text-[#4F4F4F]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalPresenceSection;