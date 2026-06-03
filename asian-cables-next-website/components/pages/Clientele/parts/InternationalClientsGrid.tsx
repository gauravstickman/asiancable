
"use client";

import { MapIcon, MapPinIcon } from "lucide-react";
import React from "react";

const clients = [
  {
    id: 1,
    name: "Saudi Electric Company",
    tag: "Power",
    country: "Saudi Arabia",
    icon: "/assets/clientele/powerIcons.png",
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
  },
];

export default function InternationalClientsGrid() {
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
          {clients.map((client) => (
            <div
              key={client.id}
              className="group relative h-[246px] w-full min-w-0 overflow-hidden rounded-[6px] border border-[#F7F7F7] bg-[#F7F7F7] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#dbe2f2] hover:bg-white hover:shadow-[0_10px_30px_rgba(22,59,140,0.08)]"
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                {/* ICON */}
                <div className="mt-7 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:scale-105">
                  <img
                    src={client.icon}
                    alt={client.name}
                    className="h-6 w-6 object-contain"
                  />
                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-1 text-[11px] font-medium text-[#8a8fa3]">
                  <MapPinIcon className="h-3.5 w-3.5 object-contain opacity-70" />
                  <span>{client.country}</span>
                </div>
              </div>

              {/* TITLE */}
              <h3 className="mt-7 text-[18px] leading-[24px] font-medium text-[#1E3C8C] transition-colors duration-300 group-hover:text-[#0f2f75]">
                {client.name}
              </h3>

              {/* TAG */}
              <div className="mt-5">
                <span className="inline-flex items-center rounded-full bg-[#1E3C8C1A] px-3 py-[6px] text-[10px] font-semibold tracking-wide text-[#1E3C8C]">
                  {client.tag}
                </span>
              </div>

              {/* HOVER SHINE */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute top-0 -left-20 h-full w-16 rotate-12 bg-white/20 blur-xl transition-all duration-700 group-hover:left-[120%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
