
"use client";

import { useEffect, useState } from "react";

const defaultIndustries = [
  { id: "all-industries", label: "All Industries" },
  { id: "power", label: "Power & Energy" },
  { id: "telecom", label: "Telecom" },
  { id: "infra", label: "Infrastructure" },
  { id: "rail", label: "Railways" },
  { id: "industrial", label: "Industrial" },
];

const iconMap: Record<string, string> = {
  "all-industries": "/assets/clientele/globeIcon.png",
  all: "/assets/clientele/globeIcon.png",
  power: "/assets/clientele/power.png",
  telecom: "/assets/clientele/Wifi.png",
  infra: "/assets/clientele/Factory.png",
  rail: "/assets/clientele/trainIcon.png",
  industrial: "/assets/clientele/construction.png",
};

function Icon({ name, active }: { name: string; active: boolean }) {
  const src = iconMap[name] || iconMap["all-industries"];
  return (
    <img
      src={src}
      alt={name}
      className={`h-[15px] w-[15px] object-contain transition-all duration-300 ${
        active ? "opacity-100 brightness-100" : "opacity-40 grayscale"
      } `}
    />
  );
}

export default function IndustryFilter({ data }: { data?: any }) {
  const [region, setRegion] = useState("international");
  const [industry, setIndustry] = useState("all-industries");

  const regionTabs = data?.regions && data.regions.length > 0 
    ? data.regions.map((r: any) => ({
        id: r.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        label: r.name,
        icon: r.icon || "/assets/clientele/globe.png"
      }))
    : [
        { id: "international", label: "International", icon: "/assets/clientele/globe.png" },
        { id: "domestic", label: "Domestic", icon: "/assets/clientele/flag-of-india.png" }
      ];

  const industryTabs = data?.industries && data.industries.length > 0
    ? [
        { id: "all-industries", label: "All Industries" },
        ...data.industries.map((ind: string) => ({
          id: ind.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          label: ind
        }))
      ]
    : defaultIndustries;

  // Emit filter changes so sibling components can listen
  useEffect(() => {
    const ev = new CustomEvent("client-filter-change", {
      detail: { region, industry },
    });
    window.dispatchEvent(ev);
  }, [region, industry]);

  return (
    <section className="relative z-20 w-full bg-white py-8">
      <div className="mx-auto flex px-5 md:px-0 w-[100%] max-w-[1274px] flex-col md:items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT REGION TABS */}
        <div className="flex md:w-fit w-[94%] md:mr-auto md:ml-0 m-auto justify-between rounded-[4px] bg-white gap-2 p-[6px] shadow-lg overflow-x-auto scrollbar-hide">
          {regionTabs.map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => setRegion(tab.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-[4px] px-5 py-2.5 text-[13px] font-[600] transition-all duration-300 whitespace-nowrap ${
                region === tab.id
                  ? "bg-[#163B8C] text-center font-[Work_Sans] text-[14px] md:text-[15px] leading-[22.5px] font-semibold tracking-normal text-white shadow-md"
                  : "text-center font-[Work_Sans] text-[14px] md:text-[15px] leading-[22.5px] font-semibold tracking-normal hover:text-[#163B8C]"
              } `}
            >
              <span className="w-[18px]"><img src={tab.icon}/></span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* RIGHT INDUSTRY FILTERS */}
<div className="industries md:pb-0 pb-4 flex overflow-x-auto whitespace-nowrap gap-[45px] md:gap-4 md:flex-wrap md:overflow-visible md:whitespace-normal md:gap-x-7 md:gap-y-4 scrollbar-hide">          
  {industryTabs.map((item: any) => {
            const active = industry === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setIndustry(item.id)}
                className={`group flex cursor-pointer items-center gap-2 text-[13px] font-[500] whitespace-nowrap transition-all duration-300 ${
                  active
                    ? "text-[#163B8C]"
                    : "text-[#8A8FA3] hover:text-[#163B8C]"
                } `}
              >
                <Icon name={item.id} active={active} />
                <span className="relative top-[0.5px] text-center text-[13px] leading-[19.5px] font-medium tracking-normal">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
