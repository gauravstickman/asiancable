"use client";

import { ChevronRight, DownloadIcon } from "lucide-react";

export default function ProductResources() {
  return (
    <>
      <section className="reveal-section bg-[#ffffff] pt-8 pb-20">
        <div className="mx-auto max-w-[1320px] px-4">
          {/* HEADING */}
          <div className="mb-8 text-center md:mb-14">
            <h2 className="text-[32px] leading-none font-black text-[#1E3C8C] italic md:text-[46px]">
              Product Resources
            </h2>
          </div>

          {/* RESOURCE CARD */}
          <div className="relative h-[450px] overflow-hidden rounded-[8px] md:h-[480px]">
            {/* BACKGROUND IMAGE */}
            <img
              src="/assets/po.jpg"
              alt="Resources"
              className="h-full w-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col p-5 md:p-9">
              {/* TOP CONTENT */}
              <div>
                {/* ICON */}
                <div className="mb-6">
                  <div className="flex h-[35px] w-[35px] items-center md:h-[60px] md:w-[60px]">
                    <img src="src/assets/folder.svg" alt="" className="w-10" />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mb-2 max-w-[420px] text-[28px] leading-[43px] font-black text-white italic md:mb-8 md:text-[36px]">
                  Product
                  <br className="hidden md:block" />
                  Catalogue
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[16px] leading-[1.7] text-white/90">
                  A comprehensive guide.
                </p>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="mt-auto flex items-end justify-between">
                {/* BUTTONS */}
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  {/* DOWNLOAD BUTTON */}
                  <button className="flex h-[38px] items-center gap-3 rounded-[6px] bg-white px-3 text-[16px] font-semibold text-[#1E3C8C] transition hover:bg-[#ECECEC] md:h-[48px] md:px-6 md:text-[18px]">
                    <DownloadIcon />
                    Download Catalogue
                  </button>

                  {/* REQUEST */}
                  <button className="flex items-center gap-3 text-[16px] font-medium text-white transition hover:opacity-80 md:text-[18px]">
                    Request Datasheet
                    <span className="leading-none">
                      <ChevronRight size={16} />
                    </span>
                  </button>
                </div>

                {/* FILE SIZE */}
                <div className="text-[14px] font-medium text-white">
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
