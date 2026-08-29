"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ArrowBigRight, ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  images: string[];
};

export default function EventGallery({ images }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!images?.length) return null;

  const heroImage = images[0];
  const twoImages = images.slice(1, 3);
  const sliderImages = images.slice(3);

  return (
    <section className="mt-[12px] w-full md:mt-[30px] reveal-section1">

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">
        {(() => {
          const blocks = [];
          let i = 0;

          while (i < images.length) {
            // Full width image
            blocks.push(
              <div
                key={`hero-${i}`}
                className="mt-[12px] overflow-hidden rounded-[6px]"
              >
                <img
                  src={images[i]}
                  alt=""
                  className="w-full rounded-[6px] object-cover"
                />
              </div>
            );

            i++;

            // First row of 2
            if (i < images.length) {
              blocks.push(
                <div
                  key={`row1-${i}`}
                  className="mt-[12px] grid grid-cols-2 gap-[12px]"
                >
                  {images.slice(i, i + 2).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="h-[204px] w-full rounded-[6px] object-cover"
                    />
                  ))}
                </div>
              );
            }

            i += 2;

            // Second row of 2
            if (i < images.length) {
              blocks.push(
                <div
                  key={`row2-${i}`}
                  className="mt-[12px] grid grid-cols-2 gap-[12px]"
                >
                  {images.slice(i, i + 2).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="h-[204px] w-full rounded-[6px] object-cover"
                    />
                  ))}
                </div>
              );
            }

            i += 2;
          }

          return blocks;
        })()}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="mx-auto hidden w-full md:block md:px-0">

        {/* HERO */}
        <div className="overflow-hidden rounded-[6px] md:min-h-[579px] md:max-h-[600px] md:rounded-[20px]">
          <img
            src={heroImage}
            alt=""
            className="w-full rounded-[6px] object-cover md:rounded-[20px]"
          />
        </div>

        {/* ROW OF 2 */}
        {twoImages.length > 0 && (
          <div className="mt-[12px] grid grid-cols-2 gap-[12px] md:mt-[30px] md:gap-[30px]">
            {twoImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[6px] md:rounded-[20px]"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full rounded-[6px] object-cover md:h-[409px] md:rounded-[20px]"
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= SLIDER ================= */}
        {sliderImages.length > 0 && (
          <div className="relative mt-[12px] w-full md:mt-[30px]">

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView="auto"
              spaceBetween={30}
              speed={600}
              loop={sliderImages.length > 3}
              className="w-full"
            >
              {sliderImages.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    width: "calc((100% - 60px) / 3)",
                  }}
                >
                  <div className="overflow-hidden rounded-[6px] md:rounded-[20px]">
                    <img
                      src={image}
                      alt=""
                      className="block h-[409px] w-full rounded-[6px] object-cover md:rounded-[20px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* PREVIOUS ARROW */}
            {sliderImages.length > 3 && (
              <button
                type="button"
                aria-label="Previous images"
                onClick={() => swiperRef.current?.slidePrev()}
                className="
                  absolute
                  left-[15px]
                  top-1/2
                  z-[50]
                  flex
                  h-[46px]
                  w-[46px]
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                  transition-transform
                  duration-300
                  hover:scale-110
                "
              >
                <ArrowLeft/>
              </button>
            )}

            {/* NEXT ARROW */}
            {sliderImages.length > 3 && (
              <button
                type="button"
                aria-label="Next images"
                onClick={() => swiperRef.current?.slideNext()}
                className="
                  absolute
                  right-[15px]
                  top-1/2
                  z-[50]
                  flex
                  h-[46px]
                  w-[46px]
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                  transition-transform
                  duration-300
                  hover:scale-110
                "
              >
                <ArrowRight/>
              </button>
            )}

          </div>
        )}

      </div>
    </section>
  );
}