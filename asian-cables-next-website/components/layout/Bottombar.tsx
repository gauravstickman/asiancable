"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BottomBar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Power Cables");

    const [openSelect, setOpenSelect] = useState(false);

    const [selectedSelect, setSelectedSelect] = useState("Control and instrumentation");

  const categories = [
    "Power Cables",
    "Specialty Cables",
    "Railway Cables",
    "Control & Instrumentation",
    "Conductors",
    "Telecom & OFC",
  ];

    const categoriesSelect = [
    "Control and instrumentation",
    "Control and instrumentation 2",
    "Control and instrumentation 3",
    "Control and instrumentation 4",
    "Control and instrumentation 5",
    "Control and instrumentation 6",
  ];

  return (
    <div className="w-full rounded-sm bg-[#1E3C8C]">
      <div className="mx-auto flex h-12.5 max-w-330 items-center gap-2 px-3 md:gap-6 md:px-8">
        {/* CATEGORY LABEL */}
        <div className="text-[10px] font-medium whitespace-nowrap text-white md:text-[16px] md:leading-[17.29px]">
          Category :
        </div>

        {/* DROPDOWN */}
        <div className="relative">
          {/* BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-[28px] w-[auto] items-center justify-between rounded-[3.29px] border border-[#6D82C2] bg-[#4D64AD] px-2 text-[12px] text-white md:h-[33px] gap-[6px] md:px-3 md:text-[16px] md:leading-[17.29px]"
          >
            <span>{selected}</span>

            <ChevronDown
              className={`h-4 w-4 transition duration-300 md:h-[14px] md:w-[14px] ${
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
           <div className="relative">
          {/* BUTTON */}
          <button
            onClick={() => setOpenSelect(!openSelect)}
            className="flex h-[30.47px] w-[auto] items-center justify-between rounded-[3.29px] border border-[#ffffff] bg-[#ffffff] px-2 text-[12px] text-[#ffffff] md:h-[33px] gap-[6px] md:px-3 md:text-[16px] md:leading-[17.29px] min-w-[100%]"
          >
            <span className="text-[#777777]">{selectedSelect}</span>

            <ChevronDown
              className={`text-[#1E3C8C] h-4 w-4 transition duration-300 md:h-[14px] md:w-[14px] ${
                openSelect ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* MENU */}
          {openSelect && (
            <div className="absolute top-[58px] left-0 z-50 w-[100%] overflow-hidden rounded-b-[4px] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)]">
              {categoriesSelect.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedSelect(item);
                    setOpenSelect(false);
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
        </div>

        {/* PRODUCT COUNT */}
        <button className="hidden h-[33px] rounded-[3.92px] border border-[#6D82C2] bg-[#4D64AD] px-4 text-[10.71px] leading-[16.06px] whitespace-nowrap text-white md:block">
          • 6 Products
        </button>
      </div>
    </div>
  );
}
