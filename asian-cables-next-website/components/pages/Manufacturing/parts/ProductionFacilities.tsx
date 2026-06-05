"use client";

import { useState } from "react";

const units = [
  {
    id: 1,
    name: "Unit 1, Vadodara",
  },
  {
    id: 2,
    name: "Unit 2, Mysuru",
  },
];

export default function SpecialisedProductionFacilities() {
  const [activeUnit, setActiveUnit] = useState(2);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-[90vw]">
        {/* Heading */}
        <div className="pt-12 text-center">
          <h2 className="font-[magistral] text-[46px] leading-[61.6px] tracking-[-0.92px] font-bold italic text-center text-[#1E3C8C]">
            Specialised Production Facilities
          </h2>

          <p className=" text-[18px] leading-[30.6px] font-normal text-center">
            2 dedicated state-of-the-art production units.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="flex h-[52px] items-center rounded-[6px] bg-[#F3F3F3] px-2 py-2">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                className={`h-[30px] min-w-[100px] cursor-pointer rounded-[4px] px-6 text-[16px] font-medium transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  activeUnit === unit.id
                    ? `bg-[#1D4694] text-white font-[work_sans] text-[18px] leading-[30.6px]  font-normal text-center shadow-[0_4px_12px_rgba(29,70,148,0.18)]`
                    : `bg-transparent font-[work_sans] text-[18px] leading-[30.6px] font-normal text-center text-[#5A5A5A] hover:bg-white/60 hover:text-[#1D4694] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]`
                } `}
              >
                {unit.name}
              </button>
            ))}
          </div>
        </div>

        {/* Background Image Section */}
        <div className="relative h-[700px] w-full">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/manufacturing/Preview Image.png')",
            }}
          />

          {/* White Fade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent" />

          {/* Content Area */}
          <div className="relative z-10 h-full">
            {activeUnit === 1 && (
              <div className="absolute top-[20%] left-[10%]">
                {/* Unit 1 Content Here */}
              </div>
            )}

            {activeUnit === 2 && (
              <div className="absolute top-[20%] left-[10%]">
                {/* Unit 2 Content Here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
