
"use client";

import { MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";

const clients = [
  {
    id: 1,
    name: "Saudi Electric Company",
    tag: "Power",
    country: "Saudi Arabia",
    icon: "/assets/clientele/powerIcons.png",
    region: "international",
    description:
      "The Saudi Electric Company is a top electricity provider ",
  },
  {
    id: 2,
    name: "Dubai Municipality",
    tag: "Infrastructure",
    country: "UAE",
    icon: "/assets/clientele/industryIcons.png",
  },
  {
    id: 3,
    name: "Qatar Rail",
    tag: "Railway",
    country: "Qatar",
    icon: "/assets/clientele/bluietIcons.png",
  },
  {
    id: 4,
    name: "Etisalat",
    tag: "Telecom",
    country: "UAE",
    icon: "/assets/clientele/distIcons.png",
    region: "international",
    description:
      "Etisalat is a leading telecom operator in the UAE delivering innovative connectivity and digital services.",
  },
  {
    id: 5,
    name: "ADNOC",
    tag: "Power",
    country: "UAE",
    icon: "/assets/clientele/powerIcons.png",
  },
  {
    id: 6,
    name: "Kenya Power",
    tag: "Power",
    country: "Kenya",
    icon: "/assets/clientele/powerIcons.png",
    region: "international",
    description: "Kenya Power provides electricity distribution and reliable power services across Kenya.",
  },
  {
    id: 7,
    name: "Bangladesh Railway",
    tag: "Railway",
    country: "Bangladesh",
    icon: "/assets/clientele/bluietIcons.png",
  },
  {
    id: 8,
    name: "Nepal Telecom",
    tag: "Telecom",
    country: "Nepal",
    icon: "/assets/clientele/distIcons.png",
  },
  {
    id: 9,
    name: "Sri Lanka Ports",
    tag: "Infrastructure",
    country: "Sri Lanka",
    icon: "/assets/clientele/industryIcons.png",
    region: "international",
    description: "Sri Lanka Ports manages and operates major ports and maritime infrastructure in Sri Lanka.",
  },
  // Domestic examples
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
    name: "Railways India",
    tag: "Railway",
    country: "India",
    icon: "/assets/clientele/bluietIcons.png",
    region: "domestic",
    description: "Railways India oversees major rail infrastructure and passenger/freight services nationwide.",
  },
  {
    id: 12,
    name: "BSNL",
    tag: "Telecom",
    country: "India",
    icon: "/assets/clientele/distIcons.png",
    region: "domestic",
    description: "BSNL is a state-owned telecom operator providing connectivity across urban and rural India.",
  },
];

export default function InternationalClientsGrid() {
  const [selectedRegion, setSelectedRegion] = useState("international");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

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

  const filteredClients = clients.filter((client) => {
    if (selectedRegion && client.region !== selectedRegion) return false;
    if (selectedIndustry && selectedIndustry !== "all") {
      const tagNorm = client.tag.toLowerCase();
      if (tagNorm.indexOf(selectedIndustry) === -1) return false;
    }
    return true;
  });

  return (
    <section className="relative overflow-hidden py-14">
      {/* LEFT BLUR BACKGROUND */}
      <img
        src="/assets/clientele/clientbgImage.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-full object-cover opacity-90"
      />

      {/* RIGHT SIDE GLOW */}
      <div className="absolute right-0 bottom-0 z-0 h-[260px] w-[260px] rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1380px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="group relative h-[246px] w-full min-w-0 overflow-hidden rounded-[6px] border border-[#F7F7F7] bg-[#F7F7F7] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#dbe2f2] hover:bg-white hover:shadow-[0_10px_30px_rgba(22,59,140,0.08)]"
            >
              {/* COMPACT CARD CONTENT (default) */}
              <div className="relative z-20">
                <div className="flex items-start justify-between">
                  <div className="mt-7 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gradient-to-b from-[#F6F6F6] to-[#FFFFFF] transition-all duration-300 group-hover:scale-105">
                    <img src={client.icon} alt={client.name} className="h-6 w-6 object-contain" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-medium text-[#8a8fa3]">
                    <MapPinIcon className="h-3.5 w-3.5 object-contain opacity-70" />
                    <span className="font-[Work_Sans] font-normal text-[14px] leading-[21px] tracking-[0]">{client.country}</span>
                  </div>
                </div>

                <p className="mt-7 font-['Work_Sans'] font-medium text-[20px] leading-[30px] tracking-[0px] text-[#1E3C8C] transition-colors duration-300 group-hover:text-[#0f2f75]">
                  {client.name}
                </p>

                <div className="mt-5">
                  <span className="inline-flex font-[Work_Sans] items-center rounded-full bg-[#1E3C8C1A] px-3 py-[6px] text-[10px] font-semibold tracking-wide text-[#1E3C8C]">
                    {client.tag}
                  </span>
                </div>
              </div>

              {/* HOVER OVERLAY (reveals full background image + description) */}
              <div className="absolute inset-0 z-30 rounded-[6px] overflow-hidden opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                <img
                  src="/assets/manufacturing/image 2.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-40 flex h-full flex-col justify-center px-8 text-white">
                  <h3 className="font-[Work_Sans] font-medium text-[28px] leading-[30px] tracking-[0]">{client.name}</h3>
                  <p className="mt-4 max-w-[70%] text-[15px] leading-7 opacity-90">{client.description}</p>

                  <div className="mt-6">
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
