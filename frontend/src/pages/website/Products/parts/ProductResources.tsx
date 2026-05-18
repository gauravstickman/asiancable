"use client";

import { ArrowBigRightIcon, ChevronRight, DownloadIcon } from "lucide-react";

export default function ProductResources() {
 


  return (
   <>
   <section className="bg-[#ffffff] pt-8 pb-20">
  <div className="max-w-[1320px] mx-auto px-4">

    {/* HEADING */}
    <div className="text-center mb-14">
      <h2 className="text-[#21409A] text-[46px] leading-none font-black italic">
        Product Resources
      </h2>
    </div>

    {/* RESOURCE CARD */}
    <div className="relative h-[480px] rounded-[8px] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/src/assets/po.jpg"
        alt="Resources"
        className="w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

      {/* CONTENT */}
      <div className="absolute inset-0 p-9 flex flex-col">

        {/* TOP CONTENT */}
        <div>

          {/* ICON */}
          <div className="mb-6">

            <div className="w-[60px] h-[60px]  flex items-center ">
              
              <img
                src="src/assets/folder.svg"
                alt=""
                className="w-10"
              />
            </div>
          </div>

          {/* TITLE */}
          <h3 className="text-white text-[36px] leading-[43px] font-black italic mb-8 max-w-[420px]">
            Product
            <br />
            Catalogue
          </h3>

          {/* DESCRIPTION */}
          <p className="text-white/90 text-[16px] leading-[1.7]">
            A comprehensive guide.
          </p>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="mt-auto flex items-end justify-between">

          {/* BUTTONS */}
          <div className="flex items-center gap-8">

            {/* DOWNLOAD BUTTON */}
            <button className="h-[48px] px-6 bg-white rounded-[6px] text-[#21409A] text-[18px] font-semibold flex items-center gap-3 hover:bg-[#ECECEC] transition">

              <DownloadIcon/>

              Download Catalogue
            </button>

            {/* REQUEST */}
            <button className="text-white text-[18px] font-medium flex items-center gap-3 hover:opacity-80 transition">
              Request Datasheet

              <span className="leading-none">
                <ChevronRight size={16}/>
              </span>
            </button>
          </div>

          {/* FILE SIZE */}
          <div className="text-white text-[14px] font-medium">
            PDF • 2.4 MB
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
   </>
  );
}