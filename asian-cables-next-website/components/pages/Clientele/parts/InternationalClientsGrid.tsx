
"use client";

import { MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";

const defaultClients = [
  // INTERNATIONAL
  {
    id: 1,
    name: "Saudi Electric Company",
    tag: "Power",
    country: "Saudi Arabia",
    icon: "/assets/clientele/powerIcons.png",
    region: "international",
    description: "The Saudi Electric Company is a top electricity provider.",
  },
  {
    id: 2,
    name: "Dubai Municipality",
    tag: "Infrastructure",
    country: "UAE",
    icon: "/assets/clientele/industryIcons.png",
    region: "international",
    description: "Dubai Municipality oversees major civic and infrastructure projects in Dubai.",
  },
  {
    id: 3,
    name: "Qatar Rail",
    tag: "Railway",
    country: "Qatar",
    icon: "/assets/clientele/bluietIcons.png",
    region: "international",
    description: "Qatar Rail is responsible for the design and construction of Qatar's railway network.",
  },
  {
    id: 4,
    name: "Etisalat",
    tag: "Telecom",
    country: "UAE",
    icon: "/assets/clientele/distIcons.png",
    region: "international",
    description: "Etisalat is a leading telecom operator in the UAE delivering innovative connectivity.",
  },
  {
    id: 5,
    name: "Global Industrial Corp",
    tag: "Industrial",
    country: "Germany",
    icon: "/assets/clientele/industryIcons.png",
    region: "international",
    description: "A leading industrial manufacturing firm with global operations.",
  },

  // DOMESTIC
  {
    id: 10,
    name: "Power Grid Corporation of India",
    tag: "Power",
    country: "India",
    icon: "/assets/clientele/powerIcons.png",
    region: "domestic",
    description: "Power Grid Corporation plans and operates India's national power transmission network.",
  },
  {
    id: 11,
    name: "L&T Infrastructure",
    tag: "Infrastructure",
    country: "India",
    icon: "/assets/clientele/industryIcons.png",
    region: "domestic",
    description: "Larsen & Toubro is a major technology, engineering, construction, and manufacturing company.",
  },
  {
    id: 12,
    name: "Railways India",
    tag: "Railway",
    country: "India",
    icon: "/assets/clientele/bluietIcons.png",
    region: "domestic",
    description: "Railways India oversees major rail infrastructure and passenger/freight services nationwide.",
  },
  {
    id: 13,
    name: "BSNL",
    tag: "Telecom",
    country: "India",
    icon: "/assets/clientele/distIcons.png",
    region: "domestic",
    description: "BSNL is a state-owned telecom operator providing connectivity across urban and rural India.",
  },
  {
    id: 14,
    name: "Reliance Industries",
    tag: "Industrial",
    country: "India",
    icon: "/assets/clientele/industryIcons.png",
    region: "domestic",
    description: "A massive Indian conglomerate operating in diverse industrial sectors.",
  }
];

export default function InternationalClientsGrid({ data }: { data?: any }) {
  const [selectedRegion, setSelectedRegion] = useState("international");
  const [selectedIndustry, setSelectedIndustry] = useState("all-industries");

  useEffect(() => {
    function handler(e: Event) {
      // @ts-ignore - CustomEvent
      const detail = (e as CustomEvent).detail || {};
      if (detail.region) setSelectedRegion(detail.region);
      if (detail.industry) setSelectedIndustry(detail.industry);
    }

    window.addEventListener("client-filter-change", handler as EventListener);
    return () => window.removeEventListener("client-filter-change", handler as EventListener);
  }, []);

  const clientsList = data?.clients && data.clients.length > 0 
    ? data.clients.map((c: any, index: number) => ({
        id: c._id || index,
        name: c.name,
        tag: c.industry,
        country: c.location,
        icon: c.logo || "/assets/clientele/powerIcons.png",
        region: c.region?.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: c.description || "",
      }))
    : defaultClients;

  const filteredClients = clientsList.filter((client: any) => {
    if (selectedRegion && client.region !== selectedRegion) return false;
    if (selectedIndustry && selectedIndustry !== "all-industries") {
      const tagNorm = client.tag?.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (!tagNorm || tagNorm.indexOf(selectedIndustry) === -1) return false;
    }
    return true;
  });

  return (
    <section className="relative overflow-hidden pb-10 md:py-14">
      {/* LEFT BLUR BACKGROUND */}
      <img
        src="/assets/clientele/clientbgImage.png"
        alt=""
        className="hidden h-full md:block pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-full object-cover opacity-90"
      />

      {/* RIGHT SIDE GLOW */}
      <div className="hidden md:block  absolute right-0 bottom-0 z-0 h-[260px] w-[260px] rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1274px]">
        <div className="grid grid-cols-2 gap-5 md:gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredClients.map((client: any) => (
            <div
              key={client.id}
              className="group relative h-[170px] md:h-[247px] w-full min-w-0 overflow-hidden rounded-[6px] border border-[#F7F7F7] bg-[#F7F7F7] px-2 py-2 md:px-5 md:py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#dbe2f2] hover:bg-white hover:shadow-[0_10px_30px_rgba(22,59,140,0.08)]"
            >
              {/* COMPACT CARD CONTENT (default) */}
              <div className="relative z-20">
                <div className="flex items-start justify-between">
                  <div className="flex h-[48px] w-[48px] md:h-[72px] md:w-[72px] items-center justify-center rounded-xl bg-gradient-to-b from-[#F6F6F6] to-[#FFFFFF] transition-all duration-300 group-hover:scale-105">
                    <img src={client.icon} alt={client.name} className="h-7 w-7 md:h-10 md:w-10 object-contain" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-medium text-[#8a8fa3]">
                    <MapPinIcon className="h-3.5 w-3.5 object-contain opacity-70" />
                    <span className="font-[Work_Sans] font-normal text-[12px] leading-[14.9px] md:text-[14px] md:leading-[21px] tracking-[0]">{client.country}</span>
                  </div>
                </div>

                <p className="md:mt-7 mt-3 font-['Work_Sans'] font-medium text-[14px] leading-[21px] md:text-[20px] md:leading-[30px] tracking-[0px] text-[#1E3C8C] transition-colors duration-300 group-hover:text-[#0f2f75]">
                  {client.name}
                </p>

                <div className="mt-5">
                  <span className="inline-flex font-[Work_Sans] items-center rounded-full bg-[#1E3C8C1A] px-3 py-[6px] text-[10px] font-semibold tracking-wide text-[#1E3C8C]">
                    {client.tag}
                  </span>
                </div>
              </div>

              {/* HOVER OVERLAY (reveals full background image + description) */}
              <div className="md:block hidden absolute inset-0 z-30 rounded-[6px] overflow-hidden opacity-0  group-hover:opacity-100 transition-all duration-700 ease-out">
                <img
                  src="/assets/manufacturing/image 2.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-40 flex h-full flex-col justify-center px-8 text-white">
                   <div className=" flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-gradient-to-b from-[#F6F6F6] to-[#FFFFFF] transition-all duration-300 group-hover:translate-y-[-90px]">
                    <img src={client.icon} alt={client.name} className="h-10 w-10 object-contain" />
                  </div>
                  <div className="transition-all duration-300 group-hover:translate-y-[-35px]">
                  <p className="font-[Work_Sans] font-medium text-[20px] leading-[30px] tracking-[0px]">{client.name}</p  >
                  <p className="mt-4 max-w-[100%] text-[14px] leading-[22px] line-clamp-3 opacity-90">{client.description}</p>
                    </div>
                  <div className="mt-6 transition-all duration-300 group-hover:translate-y-[-40px]">
                    <span className="inline-flex items-center rounded-full bg-gray-800 px-3 py-2 text-[12px] font-semibold tracking-wide text-white/90">
                      {client.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
