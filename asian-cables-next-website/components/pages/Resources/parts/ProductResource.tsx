"use client";

import { ChevronRight, DownloadIcon } from "lucide-react";
import React from "react";

export default function ProductResource({ data }: { data?: any }) {
  const resourceData = data?.productResource || {
    title: "Product Catalogue",
    description: "A comprehensive guide.",
    image: "/assets/resources/img-1.jpg",
    icon: "/assets/resources/folderIcons.png",
    file: "/assets/resources/catalogue.pdf",
    fileSize: "PDF • 2.4 MB",
    requestText: "Request Datasheet",
  };
  
  const resources = [resourceData];

  return (
    <section className="reveal-section bg-[#ffffff] pt-[7px] pb-[78.82px]">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="mb-8 mt-10 text-center md:mb-[39.2px]">
          <h2 className="text-center font-[Magistral] text-[32px] leading-[39px] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
            {data?.productResourceTitle || "Product Resources"}
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {resources.map((item, index) => (
            <div
              key={index}
              className="relative md:w-[1271px] h-[450px] overflow-hidden rounded-[8px] md:h-[480px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[479.984375px] md:w-[1271px] object-cover"
              />
              {/* dark gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
              {/* content */}
              <div className="absolute inset-0 flex flex-col p-5 md:p-11">
                <div>
                  {/* folder icon */}
                  <div className="md:mb-[45.2px] mb-3">
                    <div className="flex h-[35px] w-[35px] items-center md:h-[60px] md:w-[60px]">
                      <img
                        src={item.icon}
                        alt="folder icon"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                  {/* title */}
                  <h3 className="font-[Magistral] text-[36px] leading-[43.2px] font-bold tracking-[0px] text-[#FFFFFF] italic">
                    {item.title.split(" ").map((word, i) => (
                      <React.Fragment key={i}>
                        {word}
                        {i === 0 && <br />}
                        {" "}
                      </React.Fragment>
                    ))}
                  </h3>
                  {/* description */}
                  <p className="mt-2 text-[16px] leading-[25.6px] font-normal tracking-[0px] text-[#FFFFFFE5]">
                    {item.description}
                  </p>
                </div>
                {/* bottom actions */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col items-center gap-6 md:flex-row md:gap-9">
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-[48.38764953613281px] md:w-[286.0343017578125px] items-center justify-center gap-2 rounded-[5.52px] bg-[#FFFFFF] pt-[9.19px] pb-[9.19px] pl-[29.42px] pr-[29.42px] text-[#1E3C8C] transition hover:opacity-90"
                    >
                      <DownloadIcon size={20} />

                      <p className="font-medium text-[16px] leading-[22px] md:text-[20px] md:leading-[29.42px] tracking-[-0.46px] text-[#1E3C8C] text-center">
                        Download Catalogue
                      </p>
                    </a>

                    {item.requestText && (
                      <a 
                        href={item.requestText} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex h-[38px] items-center justify-center gap-2 rounded-[5.52px] bg-none px-3 text-[16px] font-[500] text-white transition hover:bg-white/10 md:h-[48px] md:px-5 md:text-[20px]"
                      >
                        <p className="font-medium text-[20px] leading-[29.42px] tracking-[-0.46px] text-[#FFFFFF] text-center">
                          Request Datasheet
                        </p>

                        <ChevronRight size={20} />
                      </a>
                    )}
                  </div>
                  {/* <div className="font-medium text-[14px] leading-[21px] tracking-[0px] text-[#FFFFFF]">
                    {item.fileSize}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}