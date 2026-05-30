"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BottomBar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Power Cables");

  const categories = [
    "Power Cables",
    "Specialty Cables",
    "Railway Cables",
    "Control & Instrumentation",
    "Conductors",
    "Telecom & OFC",
  ];

  return (
    <div className="w-full rounded-sm bg-[#1E3C8C]">
      <div className="mx-auto flex h-12.5 max-w-330 items-center gap-2 px-3 md:gap-6 md:px-8">
        {/* CATEGORY LABEL */}
        <div className="text-[10px] font-medium whitespace-nowrap text-white md:text-[16px]">
          Category :
        </div>

        {/* DROPDOWN */}
        <div className="relative">
          {/* BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-[28px] w-[auto] items-center justify-between rounded-[4px] border border-[#6D82C2] bg-[#4D64AD] px-2 text-[12px] text-white md:h-[33px] md:px-5 md:text-[16px]"
          >
            <span>{selected}</span>

            <ChevronDown
              className={`h-4 w-4 transition duration-300 md:h-[22px] md:w-[22px] ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* MENU */}
          {open && (
            <div className="absolute top-[58px] left-0 z-50 w-[280px] overflow-hidden rounded-b-[4px] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)]">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className={`h-[50px] w-full px-8 text-left text-[15px] transition ${
                    selected === item
                      ? "bg-[#F7F7F7] font-medium text-black"
                      : "bg-white text-[#5E5E5E] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SLASH */}
        <div className="text-[20px] font-normal text-white">/</div>

        {/* SEARCH INPUT */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Control and instrumentation"
            className="h-[28px] w-full rounded-[4px] bg-white px-3 text-[12px] outline-none placeholder:text-[#6D6D6D] md:h-[33px] md:px-6 md:text-[16px]"
          />
        </div>

        {/* PRODUCT COUNT */}
        <button className="hidden h-[33px] rounded-[4px] border border-[#6D82C2] bg-[#4D64AD] px-4 text-[16px] whitespace-nowrap text-white md:block">
          • 6 Products
        </button>
      </div>
    </div>
  );
}
