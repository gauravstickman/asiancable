// "use client";

// import React, { useState } from "react";

// const industries = [
//   { id: "all", label: "All Industries" },
//   { id: "power", label: "Power & Energy" },
//   { id: "telecom", label: "Telecom" },
//   { id: "infra", label: "Infrastructure" },
//   { id: "rail", label: "Railways" },
//   { id: "industrial", label: "Industrial" },
// ];
// const iconMap: Record<string, string> = {
//   all: "/assets/clientele/globeIcon.png",
//   power: "/assets/clientele/power.png",
//   telecom: "/assets/clientele/Wifi.png",
//   infra: "/assets/clientele/Factory.png",
//   rail: "/assets/clientele/trainIcon.png",
//   industrial: "/assets/clientele/construction.png",
// };
// function Icon({ name, active }: { name: string; active: boolean }) {
//   return (
//     <img src={iconMap[name]} alt={name}   className={`h-5 w-5 ${
//      active ? "#1E3C8C" : "opacity-40"
//   }`} />
//   );
// }

// export default function IndustryFilter() {
//   const [region, setRegion] = useState("international");
//   const [industry, setIndustry] = useState("all");

//   return (
//     <section className="w-screen pt-10 px-20">
//       <div className="flex w-full justify-between items-center gap-10 px-10">
//         {/* Region Tabs */}
//         <div className="flex items-center bg-white rounded-lg p-2 shadow-md">
//           <button
//             onClick={() => setRegion("international")}
//             className={`flex items-center gap-2 rounded-md px-6 py-3 text-[15px] font-medium transition-all duration-300 ${
//               region === "international"
//                 ? "bg-[#163B8C] text-[#FFFFFF]"
//                 : "text-gray-600"
//             }`}
//           >
//             🌎
//             <span >International</span>
//           </button>

//           <button
//             onClick={() => setRegion("domestic")}
//             className={`flex items-center gap-2 rounded-md px-6 py-3 text-[15px] font-medium transition-all duration-300 ${
//               region === "domestic"
//                 ? "bg-[#163B8C] text-[#FFFFFF]"
//                 : "text-gray-600"
//             }`}
//           >
//             🇮🇳
//             <span>Domestic</span>
//           </button>
//         </div>

//         {/* Industry Filters */}
//         <div className="flex flex-1 items-center gap-8 overflow-x-auto">
//           {industries.map((item) => {
//             const active = industry === item.id;

//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setIndustry(item.id)}
//                 className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
//                   active
//                     ? "text-[#163B8C]"
//                     : "text-[#808080] hover:text-[#163B8C]"
//                 }`}
//               >
//                 <Icon name={item.id} active={active} />

//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";

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

function Icon({
  name,
  active,
}: {
  name: string;
  active: boolean;
}) {
  return (
    <img
      src={iconMap[name]}
      alt={name}
      className={`
        h-[15px]
        w-[15px]
        object-contain
        transition-all
        duration-300
        ${
          active
            ? "opacity-100 brightness-100"
            : "opacity-40 grayscale"
        }
      `}
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
    <section className="relative z-20 w-full py-8 bg-white">
      <div className="mx-auto flex w-[92%] max-w-[1380px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* LEFT REGION TABS */}
        <div
          className="
            flex
            w-fit
            items-center
            rounded-[4px]
            bg-white
            p-[6px]
            shadow-lg
          "
        >
          {/* INTERNATIONAL */}
          <button
            onClick={() => setRegion("international")}
            className={`
              flex
              items-center
              gap-2
              rounded-[4px]
              px-5
              py-2.5
              text-[13px]
              font-[600]
              transition-all
              cursor-pointer
              duration-300
              ${
                region === "international"
                  ? "bg-[#163B8C] text-white font-[Work_Sans] font-semibold text-[15px] leading-[22.5px] tracking-normal text-center shadow-md"
                  : "font-[Work_Sans] font-semibold text-[15px] leading-[22.5px] tracking-normal text-center hover:text-[#163B8C]"
              }
            `}
          >
            <span className="text-[13px]">🌎</span>
            <span>International</span>
          </button>

          {/* DOMESTIC */}
          <button
            onClick={() => setRegion("domestic")}
            className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-5
              py-2.5
              text-[13px]
              cursor-pointer
              font-[600]
              transition-all
              duration-300
              ${
                region === "domestic"
                  ? "bg-[#163B8C] text-white font-[Work_Sans] font-semibold text-[15px] leading-[22.5px] tracking-normal text-center shadow-md"
                  : "font-[Work_Sans] font-semibold text-[15px] leading-[22.5px] tracking-normal text-center hover:text-[#163B8C]"
              }
            `}
          >
            <span className="text-[13px]">🇮🇳</span>
            <span>Domestic</span>
          </button>
        </div>

        {/* RIGHT INDUSTRY FILTERS */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-7
            gap-y-4
          "
        >
          {industries.map((item) => {
            const active = industry === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setIndustry(item.id)}
                className={`
                  group
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap
                  text-[13px]
                  cursor-pointer  
                  font-[500]
                  transition-all
                  duration-300
                  ${
                    active
                      ? "text-[#163B8C]"
                      : "text-[#8A8FA3] hover:text-[#163B8C]"
                  }
                `}
              >
                <Icon
                  name={item.id}
                  active={active}
                />

                <span className="relative top-[0.5px] font-[Work_Sans] font-medium text-[13px] leading-[19.5px] tracking-normal text-center">
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