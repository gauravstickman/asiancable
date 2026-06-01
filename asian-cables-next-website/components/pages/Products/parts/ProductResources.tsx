"use client";

import { ChevronRight, DownloadIcon } from "lucide-react";
import { getBaseUrl } from "../../../../utils/api";

export default function ProductResources({ data }: { data?: any }) {
  const getImg = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${getBaseUrl()}/${url.replace(/\\/g, "/")}`;
  };
  return (
    <>
      <section className="reveal-section bg-[#ffffff] pt-[7px] pb-[78.82px]">
        <div className="mx-auto max-w-[1320px] px-4">
          {/* HEADING */}
          <div className="mb-8 text-center md:mb-[39.2px]">
            <h2 className="text-[32px] leading-none font-[700] text-[#1E3C8C] italic md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px]">
              Product Resources
            </h2>
          </div>

          {/* RESOURCE CARD */}
          <div className="relative h-[450px] overflow-hidden rounded-[8px] md:h-[480px]">
            {/* BACKGROUND IMAGE */}
            <img
              src={data?.catalogueImage ? getImg(data.catalogueImage) : "/assets/po.jpg"}
              alt="Resources"
              className="h-full w-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col p-5 md:p-11">
              {/* TOP CONTENT */}
              <div>
                {/* ICON */}
                <div className="mb-[45.2px]">
                  <div className="flex h-[35px] w-[35px] items-center md:h-[60px] md:w-[60px]">
                    <img src="/assets/folder.svg" alt="" className="w-100" />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mb-[11px] max-w-[420px] text-[28px] leading-[43px] font-black text-white italic md:mb-8 md:text-[36px] md:leading-[43.2px]" dangerouslySetInnerHTML={{ __html: data?.catalogueName || 'Product<br className="hidden md:block" />Catalogue' }}>
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[16px] leading-[25.6px] text-white/90">
                  {data?.catalogueDescription || "A comprehensive guide."}
                </p>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="mt-auto flex items-end justify-between">
                {/* BUTTONS */}
                <div className="flex flex-col items-center gap-9 md:flex-row">
                  {/* DOWNLOAD BUTTON */}
                  <a href={data?.cataloguePdf ? getImg(data.cataloguePdf) : "#"} target="_blank" rel="noreferrer" className="flex h-[38px] items-center gap-2  rounded-[5.52px] bg-white px-3 text-[16px] font-[500] text-[#1E3C8C] transition  md:h-[48px] md:px-5 md:text-[20px] md:leading-[29.42px] md:tracking-[-0.46px]">
                    <DownloadIcon />
                    Download Catalogue
                  </a>

                  {/* REQUEST */}
                  <button className="flex h-[38px] items-center gap-2  rounded-[5.52px] bg-none px-3 text-[16px] font-[500] text-[#ffffff] transition  md:h-[48px] md:px-5 md:text-[20px] md:leading-[29.42px] md:tracking-[-0.46px]">
                    Request Datasheet
                    <span className="leading-none">
                      <ChevronRight />
                    </span>
                  </button>
                </div>

                {/* FILE SIZE */}
                <div className="text-[14px] leaing-[21px] font-[500] text-white">
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
