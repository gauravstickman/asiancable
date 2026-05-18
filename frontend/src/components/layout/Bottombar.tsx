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
    <div className="w-full bg-[#1E3C8C] rounded-[4px]">
      <div className="max-w-[1320px] mx-auto h-[50px] px-8 flex items-center gap-6 ">

        {/* CATEGORY LABEL */}
        <div className="text-white text-[16px] font-medium whitespace-nowrap">
          Category :
        </div>

        {/* DROPDOWN */}
        <div className="relative">

          {/* BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="w-[auto] h-[33px] bg-[#4D64AD] border border-[#6D82C2] rounded-[4px] px-5 flex items-center justify-between text-white text-[16px]"
          >
            <span>{selected}</span>

            <ChevronDown
              size={22}
              className={`transition duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* MENU */}
          {open && (
            <div className="absolute top-[58px] left-0 w-[28px] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)] rounded-b-[4px] overflow-hidden z-50">

              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-8 h-[50px] text-[15px] transition ${
                    selected === item
                      ? "bg-[#F7F7F7] text-black font-medium"
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
        <div className="text-white font-normal text-[20px]">
          /
        </div>

        {/* SEARCH INPUT */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Control and instrumentation"
            className="w-full h-[33px] rounded-[4px] bg-white px-6 text-[16px] outline-none placeholder:text-[#6D6D6D]"
          />
        </div>

        {/* PRODUCT COUNT */}
        <button className="h-[33px] px-4 bg-[#4D64AD] border border-[#6D82C2] rounded-[4px] text-white text-[16px] whitespace-nowrap">
          • 6 Products
        </button>

      </div>
    </div>
  );
}