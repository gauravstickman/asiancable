
"use client";

import { useEffect, useState } from "react";

const industries = [
  { id: "all", label: "All Industries" },
  { id: "power", label: "Power & Energy" },
  { id: "telecom", label: "Telecom" },
  { id: "infra", label: "Infrastructure" },
  { id: "rail", label: "Railways" },
  { id: "industrial", label: "Industrial" },
];

const iconMap: Record<string, string> = {
  all: "/assets/clientele/globeIcon.png",
  power: "/assets/clientele/power.png",
  telecom: "/assets/clientele/Wifi.png",
  infra: "/assets/clientele/Factory.png",
  rail: "/assets/clientele/trainIcon.png",
  industrial: "/assets/clientele/construction.png",
};

function Icon({ name, active }: { name: string; active: boolean }) {
  return (
    <img
      src={iconMap[name]}
      alt={name}
      className={`h-[15px] w-[15px] object-contain transition-all duration-300 ${
        active ? "opacity-100 brightness-100" : "opacity-40 grayscale"
      } `}
    />
  );
}

export default function IndustryFilter() {
  const [region, setRegion] = useState("international");
  const [industry, setIndustry] = useState("all");

  // Emit filter changes so sibling components can listen
  useEffect(() => {
    const ev = new CustomEvent("client-filter-change", {
      detail: { region, industry },
    });
    window.dispatchEvent(ev);
  }, [region, industry]);

  return (
    <section className="relative z-20 w-full bg-white py-8">
      <div className="mx-auto flex w-[92%] max-w-[1380px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT REGION TABS */}
        <div className="flex w-fit items-center rounded-[4px] bg-white p-[6px] shadow-lg">
          {/* INTERNATIONAL */}
          <button
            onClick={() => setRegion("international")}
            className={`flex cursor-pointer items-center gap-2 rounded-[4px] px-5 py-2.5 text-[13px] font-[600] transition-all duration-300 ${
              region === "international"
                ? "bg-[#163B8C] text-center font-[Work_Sans] text-[15px] leading-[22.5px] font-semibold tracking-normal text-white shadow-md"
                : "text-center font-[Work_Sans] text-[15px] leading-[22.5px] font-semibold tracking-normal hover:text-[#163B8C]"
            } `}
          >
            <span className="text-[13px]">🌎</span>
            <span>International</span>
          </button>

          {/* DOMESTIC */}
          <button
            onClick={() => setRegion("domestic")}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-[600] transition-all duration-300 ${
              region === "domestic"
                ? "bg-[#163B8C] text-center font-[Work_Sans] text-[15px] leading-[22.5px] font-semibold tracking-normal text-white shadow-md"
                : "text-center font-[Work_Sans] text-[15px] leading-[22.5px] font-semibold tracking-normal hover:text-[#163B8C]"
            } `}
          >
            <span className="text-[13px]">🇮🇳</span>
            <span>Domestic</span>
          </button>
        </div>

        {/* RIGHT INDUSTRY FILTERS */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          {industries.map((item) => {
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
