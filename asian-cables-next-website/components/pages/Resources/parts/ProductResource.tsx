"use client";

import { ChevronRight, DownloadIcon } from "lucide-react";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductResource({ data }: { data?: any }) {
  const resourceData = data?.productResource || {
    title: "",
    description: "",
    image: "",
    icon: "",
    file: "",
    fileSize: "",
    requestText: "",
  };

  const resources = data?.productResourcesList && data.productResourcesList.length > 0
    ? data.productResourcesList
    : [resourceData];

  let sliderResources = [...resources];
  // Swiper loop mode needs enough slides to clone. If we have 5 items and show 3.6, it might glitch.
  while (sliderResources.length > 0 && sliderResources.length < 10) {
    sliderResources = [...sliderResources, ...resources];
  }

  return (
    <section className="reveal-section bg-[#ffffff] pt-[7px] pb-[78.82px]" id="product-resources">
      <div className="mx-auto md:px-0 px-0">
        <div className="mb-8 mt-10 text-center md:mb-[39.2px] px-5">
          <h2 className="text-center font-[Magistral] text-[32px] leading-[39px] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] px-1 bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block italic">
            {data?.productResourceTitle || ""}
          </h2>
        </div>
        <Swiper
          slidesPerView={1.2}
          centeredSlides={true}

          spaceBetween={10}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1600: {
              slidesPerView: 3.6,
              spaceBetween: 24,
            },
          }}
        >
          {sliderResources.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-[350px] md:h-[450px] overflow-hidden rounded-[8px] md:h-[480px]"
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
                    <h3 className="font-[Magistral] text-[26px] md:text-[36px] leading-[43.2px] font-bold tracking-[0px] text-[#FFFFFF] italic">
                      {item.title.split(" ").map((word: string, i: number) => (
                        <React.Fragment key={i}>
                          {word}
                          {i === 0 && <br className="hidden" />}
                          {" "}
                        </React.Fragment>
                      ))}
                    </h3>
                    {/* description */}
                    {/* <p className="mt-2 text-[16px] leading-[25.6px] font-normal tracking-[0px] text-[#FFFFFFE5]">
                    {item.description}
                  </p> */}
                  </div>
                  {/* bottom actions */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col items-start gap-6  md:gap-6">
                      {/* {item.requestText && (
                        <a
                          href={item.requestText}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-[38px] items-center justify-center gap-2 rounded-[5.52px] bg-none  text-[16px] font-[500] text-white transition hover:bg-white/10 md:h-[48px]  md:text-[20px]"
                        >
                          <p className="font-medium text-[16px] md:text-[20px] leading-[29.42px] tracking-[-0.46px] text-[#FFFFFF] text-center">
                            Request Datasheet
                          </p>

                          <ChevronRight size={20} />
                        </a>
                      )} */}
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                        className="pr-5 pl-5 flex md:h-[48.38764953613281px] md:w-[286.0343017578125px] items-center justify-center gap-2 rounded-[5.52px] bg-[#FFFFFF] pt-[9.19px] pb-[9.19px] md:pl-[29.42px] md:pr-[29.42px] text-[#1E3C8C] transition hover:opacity-90"
                      >
                        <DownloadIcon size={20} />

                        <p className="font-medium text-[16px] leading-[22px] md:text-[20px] md:leading-[29.42px] tracking-[-0.46px] text-[#1E3C8C] text-center">
                          Download Catalogue
                        </p>
                      </a>


                    </div>
                    {/* <div className="font-medium text-[14px] leading-[21px] tracking-[0px] text-[#FFFFFF]">
                    {item.fileSize}
                  </div> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}