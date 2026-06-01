"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useEffect } from "react";
export default function MobileProductMenu({
  onClose,
}: {
  onClose: () => void;
}) {


    useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [active, setActive] =
    useState("Power Cables");

  const categories = [
    "Power Cables",
    "Specialty Cables",
    "Telecom Cables",
    "Railway Cables",
    "Overhead Conductors",
  ];

  

const [tab, setTab] = useState<"industry" | "type">("industry");

const industryCategories = [
  {
    title: "Telecom",
    items: ["Fiber Optic Cables", "Copper Telecom Cables"],
  },
  {
    title: "Railways",
    items: ["Signal Cables", "Track Cables"],
  },
  {
    title: "Power",
    items: ["Transmission", "Distribution"],
  },
];

const typeCategories = [
  {
    title: "Power Cables",
    items: ["EHV", "HT", "LT"],
  },
  {
    title: "Specialty Cables",
    items: ["Marine", "Mining", "Solar"],
  },
  {
    title: "Telecom Cables",
    items: ["Fiber", "Copper"],
  },
];

const [mainAccordion, setMainAccordion] =
  useState("industry");

const [openCategory, setOpenCategory] =
  useState("Power Cables");

  return (    
    <div className="fixed inset-0 z-[99999999] h-[calc(100%-80px)] bg-white top-[70px] mx-[10px] rounded-[12px] oveflow-y-auto
  ">

      <div className="absolute right-0 top-0 z-20  px-5 py-5">
        <div className="flex items-center justify-right gap-5">

          <button onClick={onClose}>
            <X
              size={18}
              className="text-[#1E3C8C]"
            />
          </button>

        </div>
      </div>

   <div className="mb-4 overflow-hidden rounded-md  px-5">

 <button
  onClick={() =>
    setMainAccordion(
      mainAccordion === "industry"
        ? ""
        : "industry"
    )
  }
  className={`flex w-full items-center rounded-[5.52px] justify-between px-4 py-4 mt-15 transition-all duration-300 ${
    mainAccordion === "industry"
      ? "bg-[#21409A] text-white"
      : "bg-[#F8F8F8] text-[#21409A]"
  }`}
>
    <h4 className="flex items-center gap-2"><bdi><img
  src="/assets/menu-cable.svg"
  className={`w-[23px] h-[23px] object-contain transition ${
    mainAccordion === "industry"
      ? "brightness-100"
      : "brightness-[0.4]"  
  }`}
/></bdi> <span className="text-[20px] leading-[29px] tracking-[-0.46px] italic font-[700]">
      Cables by Industry
    </span></h4>

    <ChevronDown
      className={`transition-transform ${
        mainAccordion === "industry"
          ? "rotate-180"
          : ""
      }`}
    />
  </button>

  {mainAccordion === "industry" && (
    <div className="py-4">

    <div className="border-l-[1.5px] border-[#BFDBFF] pl-4">

  {[
    "Telecom",
    "Railways",
    "Power",
    "Renewable Energy",
    "Industrial",
    "Infrastructure",
  ].map((category) => (
    <div
      key={category}
      className="mb-3 overflow-hidden bg-white"
    >
      <button
        onClick={() =>
          setOpenCategory(
            openCategory === category
              ? ""
              : category
          )
        }
        className="flex w-full items-center justify-between px-4 py-4  rounded-[8px] border border-[#D9DDE7]"
      >
        <div className="flex items-center  justfy-left gap-3 relative ">

          {/* GRADIENT BAR */}
         
<span
    className="absolute left-0 top-[-4px] right-auto h-[20px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          <span className="pl-3 font-[600] text-[16px] leading-[106%] text-[#0F0F0F] text-left">
            {category}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            openCategory === category
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {openCategory === category && (
        <div className="px-5 py-1">

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            Fiber Optic Cables
          </button>

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            Copper Telecom Cables
          </button>

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            Data Communication Cables
          </button>

        </div>
      )}
    </div>
  ))}

</div>

    </div>
  )}

</div>

<div className="mb-4 overflow-hidden rounded-md  px-5">

  <button
  onClick={() =>
    setMainAccordion(
      mainAccordion === "type"
        ? ""
        : "type"
    )
  }
  className={`flex w-full items-center rounded-[5.52px] justify-between px-4 py-4 transition-all duration-300 ${
    mainAccordion === "type"
      ? "bg-[#21409A] text-white"
      : "bg-[#F8F8F8] text-[#21409A]"
  }`}
>
    <h4 className="flex items-center gap-2"><bdi><img
  src="/assets/menu-cable.svg"
  className={`w-[23px] h-[23px] object-contain transition ${
    mainAccordion === "type"
      ? "brightness-100"
      : "brightness-[0.4]"
  }`}
/></bdi><span className="text-[20px] leading-[29px] tracking-[-0.46px] italic font-[700]">
      Cables by Type
    </span></h4>

    <ChevronDown
      className={`transition-transform ${
        mainAccordion === "type"
          ? "rotate-180"
          : ""
      }`}
    />
  </button>

  {mainAccordion === "type" && (
    <div className="py-4">

      <div className="border-l border-[#D9E3F7] pl-4">

  {[
    "Power Cables",
    "Specialty Cables",
    "Telecom Cables",
    "Railway Cables",
    "Overhead Conductors",
    "Exports / International Cables",
  ].map((category) => (
    <div
      key={category}
      className="mb-3 overflow-hidden  bg-white"
    >
      <button
        onClick={() =>
          setOpenCategory(
            openCategory === category
              ? ""
              : category
          )
        }
        className="flex w-full items-center justify-between px-4 py-4 rounded-[8px] border border-[#D9DDE7]"
      >
        <div className="flex items-center  justfy-left gap-3 relative ">

          {/* GRADIENT BAR */}
         
<span
    className="absolute left-0 top-[-4px] right-auto h-[20px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          <span className="pl-3 font-[600] text-[16px] leading-[106%] text-[#0F0F0F] text-left">
            {category}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            openCategory === category
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {openCategory === category && (
        <div className="px-5 py-1">

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            Control and Instrumentation
          </button>

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            EHV
          </button>

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            HT
          </button>

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            Control & Instrumentation
          </button>

          <button className="block w-full py-2 text-left text-[#5C5C5C] text-[16px] leading-[206%] font-[400]">
            Flexible Cables
          </button>

        </div>
      )}
    </div>
  ))}

</div>

    </div>
  )}

</div>
    </div>
  );
}