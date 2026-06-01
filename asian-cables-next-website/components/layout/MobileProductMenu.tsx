"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export default function MobileProductMenu({
  onClose,
}: {
  onClose: () => void;
}) {
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
    <div className="fixed inset-0 z-[99999999] overflow-y-auto bg-white">

      <div className="sticky top-0 z-20 bg-[#21409A] px-5 py-5">
        <div className="flex items-center justify-between">

          <h2 className="text-[24px] font-bold italic text-white">
            Products
          </h2>

          <button onClick={onClose}>
            <X
              size={30}
              className="text-white"
            />
          </button>

        </div>
      </div>

   <div className="mb-4 overflow-hidden rounded-md border border-[#D9DDE7]">

  <button
    onClick={() =>
      setMainAccordion(
        mainAccordion === "industry"
          ? ""
          : "industry"
      )
    }
    className="flex w-full items-center justify-between bg-[#F8F8F8] px-4 py-4"
  >
    <span className="text-[20px] italic font-bold text-[#21409A]">
      Cables by Industry
    </span>

    <ChevronDown
      className={`transition-transform ${
        mainAccordion === "industry"
          ? "rotate-180"
          : ""
      }`}
    />
  </button>

  {mainAccordion === "industry" && (
    <div className="p-4">

    <div className="border-l border-[#D9E3F7] pl-4">

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
      className="mb-4 overflow-hidden rounded-[8px] border border-[#D9DDE7] bg-white"
    >
      <button
        onClick={() =>
          setOpenCategory(
            openCategory === category
              ? ""
              : category
          )
        }
        className="flex w-full items-center justify-between px-4 py-4"
      >
        <div className="flex items-center gap-3">

          <span
            className="h-6 w-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
            }}
          />

          <span className="font-semibold text-[#2D2D2D]">
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
        <div className="border-t bg-[#F8F8F8] px-5 py-4">

          <button className="block w-full py-2 text-left text-[#666]">
            Fiber Optic Cables
          </button>

          <button className="block w-full py-2 text-left text-[#666]">
            Copper Telecom Cables
          </button>

          <button className="block w-full py-2 text-left text-[#666]">
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

<div className="overflow-hidden rounded-md border border-[#D9DDE7]">

  <button
    onClick={() =>
      setMainAccordion(
        mainAccordion === "type"
          ? ""
          : "type"
      )
    }
    className="flex w-full items-center justify-between bg-[#F8F8F8] px-4 py-4"
  >
    <span className="text-[20px] italic font-bold text-[#21409A]">
      Cables by Type
    </span>

    <ChevronDown
      className={`transition-transform ${
        mainAccordion === "type"
          ? "rotate-180"
          : ""
      }`}
    />
  </button>

  {mainAccordion === "type" && (
    <div className="p-4">

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
      className="mb-4 overflow-hidden rounded-[8px] border border-[#D9DDE7] bg-white"
    >
      <button
        onClick={() =>
          setOpenCategory(
            openCategory === category
              ? ""
              : category
          )
        }
        className="flex w-full items-center justify-between px-4 py-4"
      >
        <div className="flex items-center gap-3">

          {/* GRADIENT BAR */}
          <span
            className="h-6 w-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
            }}
          />

          <span className="font-semibold text-[#2D2D2D]">
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
        <div className="border-t bg-[#F8F8F8] px-5 py-4">

          <button className="block w-full py-2 text-left text-[#666]">
            Control and Instrumentation
          </button>

          <button className="block w-full py-2 text-left text-[#666]">
            EHV
          </button>

          <button className="block w-full py-2 text-left text-[#666]">
            HT
          </button>

          <button className="block w-full py-2 text-left text-[#666]">
            Control & Instrumentation
          </button>

          <button className="block w-full py-2 text-left text-[#666]">
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