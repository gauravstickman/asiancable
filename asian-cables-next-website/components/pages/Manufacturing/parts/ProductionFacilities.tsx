"use client";

import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function SpecialisedProductionFacilities({ data }: { data?: any }) {
  const units = data?.productionUnits?.length > 0 ? data.productionUnits.map((u: any, idx: number) => ({
    id: idx + 1,
    name: u.name,
    image: u.image ? (u.image.startsWith('http') ? u.image : `${process.env.NEXT_PUBLIC_BASE_URL}${u.image}`) : '/assets/manufacturing/Preview Image.png'
  })) : [
    {
      id: 1,
      name: "Unit 1, Vadodara",
      image: "/assets/manufacturing/map.png"
    },
    {
      id: 2,
      name: "Unit 2, Mysuru",
      image: "/assets/manufacturing/map.png"
    },
  ];

  const [activeUnit, setActiveUnit] = useState(units[0]?.id || 1);
  const activeImage = units.find((u: any) => u.id === activeUnit)?.image || '/assets/manufacturing/Preview Image.png';

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-[100%] md:px-9">
        {/* Heading */}
        <div className="md:pt-12 pt-[1] text-center">
          {/* Desktop Title & Subtitle */}
          <h2 className="hidden md:inline-block font-[magistral] text-[46px] leading-[61.6px] tracking-[-0.92px] font-bold italic text-center px-1 bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent">
            {data?.productionTitle || "Specialised Production Facilities"}
          </h2>
          <p className="hidden md:block text-[20px] leading-[106%] md:text-[#525252] text-[#738ABE] md:text-[18px] md:leading-[30.6px] font-normal text-center mt-2">
            {data?.productionSubtitle || "2 dedicated state-of-the-art production units."}
          </p>

          {/* Mobile Title & Subtitle */}
          <h2 className="md:hidden mb-2 font-[magistral] text-[32px] leading-[100%] tracking-[-0.92px] font-bold italic text-center text-[#1E3C8C]">
            {data?.productionTitleMobile || "Production Units"}
          </h2>
          <p className="md:hidden text-[20px] leading-[106%] md:text-[#525252] text-[#738ABE] md:text-[18px] md:leading-[30.6px] font-normal text-center">
            {data?.productionSubtitleMobile || "2 dedicated state-of-the-art production units."}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="flex h-[52px] items-center rounded-[6px] bg-[#F3F3F3] gap-3 md:gap-4 px-[10px] py-[10px] flex-wrap">
            {units.map((unit: any) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                className={`h-[33px] min-w-[100px] cursor-pointer rounded-[2px] px-6 text-[14px] md:text-[16px] leading-[30.6px] font-medium transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  activeUnit === unit.id
                    ? `bg-[#1E3C8C] text-white font-[work_sans] text-[14px] md:text-[18px] leading-[30.6px]  font-normal text-center shadow-[0_4px_12px_rgba(29,70,148,0.18)]`
                    : `bg-transparent font-[work_sans] text-[14px] md:text-[18px] leading-[30.6px] font-normal text-center text-[#525252] hover:bg-white/60 hover:text-[#1D4694] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]`
                } `}
              >
                {unit.name}
              </button>
            ))}
          </div>
        </div>

        {/* Background Image Section */}
        <div className="relative h-[450px ] min-h-[500px] md:h-[700px] w-full mt-4">
          {/* Background Image */}
          <div
  key={activeUnit}
  className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-up"
  style={{
    backgroundImage: `url('${activeImage}')`,
  }}
/>

          {/* White Fade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent" />

          {/* Content Area */}
          <div className="animate-fade-up relative z-10 h-full max-w-[90%] md:max-w-[1274px] mx-auto"   key={`content-${activeUnit}`}
  >
            {activeUnit === 1 && (
              <div className="md:absolute top-[30%] right-[10%] left-[auto] md:pt-0 pt-20">
                {/* Unit 1 Content Here */} 
                <div className="flex gap-4 md:flex-row flex-col md:items-center">
                  <div className="location-icon">
                    <img src="/assets/manufacturing/map-point.png" className="h-auto max-h-10 md:max-h-[80px] md:ml-0 ml-8"/>
                    </div>
                    <div className="location-area bg-white p-6 rounded-[20px] space-y-2 text-[12px] md:text-[14.5px]">
                      <h3 className="text-[#1E3C8C] text-[18px] md:text-[20.59px] italic">Vadodara, Gujarat</h3>
                      <p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Focus: </b> EHV / HV / Railway cables</p>
<p className="flex md:gap-1 text-[12px] md:text-[14.5px] md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Capability:</b> High-voltage cable manufacturing and testing</p>
<p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Certification:</b> IGBC Platinum-rated green facility</p>
<p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Infrastructure:</b> Integrated production and in-house validation systems</p>

                      </div>
                  </div>
              </div>
            )}

            {activeUnit === 2 && (
                   <div className="md:absolute top-[30%] right-[10%] left-[auto] md:pt-0 pt-20">
                {/* Unit 1 Content Here */} 
                <div className="flex gap-4 md:flex-row flex-col md:items-center">
                  <div className="location-icon">
                    <img src="/assets/manufacturing/map-point.png" className="h-auto max-h-10 md:max-h-[80px] md:ml-0 ml-8"/>
                    </div>
                    <div className="location-area bg-white p-6 rounded-[20px] space-y-2 text-[12px] md:text-[14.5px]">
                      <h3 className="text-[#1E3C8C] text-[18px] md:text-[20.59px] italic">Mysuru, Karnataka</h3>
  <p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Capability:</b> Communication and distribution cable manufacturing</p>
 <p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Energy:</b> Majority renewable-powered operations</p>
 <p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Role:</b> High-volume, multi-category production</p>
 <p className="flex md:gap-1 text-[12px] md:text-[14.5px]  md:flex-row flex-col"> <b className="flex font-[500]"><CheckCircle color="green" className="w-3 md:w-5 mr-2"/>Focus:</b> LT / Telecom / Optical Fibre cables</p>

                      </div>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
