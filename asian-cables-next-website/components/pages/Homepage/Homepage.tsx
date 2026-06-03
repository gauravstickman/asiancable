// Homepage.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Footer from "../../../components/layout/Footer";
import AboutUs from "./Parts/About";
import FactsSection from "./Parts/Facts";
import ProductRangeSection from "./Parts/Productrange";
import WebsiteNavbar from "../../../components/layout/WebsiteNavbar";
import SustainabilitySection from "./Parts/Sustainability";
import EngineeringAccordionSection from "./Parts/Enginnering";
import TestimonialsSection from "./Parts/Testimonials";
import Blogs from "./Parts/Blogs";
import ProvenFieldSection from "./Parts/Fields";
import ProvenFieldSectionMobile from "./Parts/FieldsMobile";
import { Swiper, SwiperSlide } from "swiper/react";

import { Parallax, Autoplay } from "swiper/modules";

import "swiper/css";
import { useRef } from "react";
import api, { getBaseUrl } from "../../../utils/api";

const staticSlides = [
  {
    id: 1,
    image: "/assets/home1.jpg",
    title: "Endurance, by design",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Sustainable Impact",
    buttonText: "Explore Products",
    buttonLink: "/products",
  },
  {
    id: 2,
    image: "/assets/home2.png",
    title:
      "Transforming lives by building\nsustainable world-class infrastructure",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Innovation First",
    buttonText: "Sustainability",
    buttonLink: "/products",
  },
  {
    id: 3,
    image: "/assets/home3.jpg",
    title: "Powering a future\nthat holds the world",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Global Excellence",
    buttonText: "Company Impact",
    buttonLink: "/products",
  },
  {
    id: 4,
    image: "/assets/home4.jpg",
    title: "Reliability, Redefined",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Reliability, Redefined",
    buttonText: "Watch Full Video",
    buttonLink: "/products",
  },
];

export default function Homepage() {
  const swiperRef = useRef<any>(null);

  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>(staticSlides);
  const [aboutText, setAboutText] = useState<string>("");
  const [factsData, setFactsData] = useState<any>(null);
  const [engineeringData, setEngineeringData] = useState<any>(null);
  const [provenData, setProvenData] = useState<any[]>([]);
  const [testimonialsData, setTestimonialsData] = useState<any[]>([]);
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [sustainabilityData, setSustainabilityData] = useState<any>(null);

  useEffect(() => {
    api.get("/homepage-settings")
      .then((res) => {
        const data = res.data;
        if (data.success && data.data) {
          if (data.data.heroSlides && data.data.heroSlides.length > 0) {
            const fetchedSlides = data.data.heroSlides.map((item: any, index: number) => ({
              ...item,
              id: item._id || index,
              buttonText: item.cta?.text || item.buttonText,
              buttonLink: item.cta?.link || item.buttonLink,
              image: item.image?.startsWith("http")
                ? item.image
                : `${getBaseUrl()}${item.image}`,
            }));
            setSlides(fetchedSlides);
          }
          if (data.data.aboutUs) {
            setAboutText(data.data.aboutUs.description || data.data.aboutUs.text || data.data.aboutUs.content || "");
          } else if (data.data.about) {
            setAboutText(data.data.about.description || data.data.about.text || data.data.about.content || "");
          } else if (data.data.aboutSection) {
            setAboutText(data.data.aboutSection.description || data.data.aboutSection.text || data.data.aboutSection.content || "");
          }
          if (data.data.facts) {
            setFactsData(data.data.facts);
          }
          if (data.data.engineering) {
            setEngineeringData(data.data.engineering);
          }
          if (data.data.provenFields && data.data.provenFields.length > 0) {
            setProvenData(data.data.provenFields);
          }
          if (data.data.testimonials && data.data.testimonials.length > 0) {
            setTestimonialsData(data.data.testimonials);
          }
          if (data.data.sustainability) {
            setSustainabilityData({
              ...data.data.sustainability,
              bgImage: data.data.sustainability.bgImage
                ? (data.data.sustainability.bgImage.startsWith("http")
                  ? data.data.sustainability.bgImage
                  : `${getBaseUrl()}${data.data.sustainability.bgImage.startsWith('/') ? data.data.sustainability.bgImage : '/' + data.data.sustainability.bgImage}`)
                : "",
              features: (data.data.sustainability.features || []).map((f: any) => ({
                ...f,
                icon: f.icon
                  ? (f.icon.startsWith("http")
                    ? f.icon
                    : `${getBaseUrl()}${f.icon.startsWith('/') ? f.icon : '/' + f.icon}`)
                  : ""
              }))
            });
          }
          if (data.data.productRange && data.data.productRange.length > 0) {
            const formattedProducts = data.data.productRange.map((p: any) => ({
              title: p.title,
              image: p.image
                ? (p.image.startsWith("http")
                  ? p.image
                  : `${getBaseUrl()}${p.image.startsWith('/') ? p.image : '/' + p.image}`)
                : "",
              points: Array.isArray(p.points) ? p.points : [],
              link: p.link || "/products",
            }));
            setProductsData(formattedProducts);
          }
          if (data.data.latestBlogs && data.data.latestBlogs.length > 0) {
            const formattedBlogs = data.data.latestBlogs.map((b: any) => ({
              tag: b.tag || "Blog",
              title: b.title,
              description: b.description || "",
              image: b.image
                ? (b.image.startsWith("http")
                  ? b.image
                  : `${getBaseUrl()}${b.image.startsWith('/') ? b.image : '/' + b.image}`)
                : "",
              link: b.link || "/blogs"
            }));
            setBlogsData(formattedBlogs);
          }
          console.log("API DATA:", data.data);
        }
      })
      .catch((error) => console.warn("Error fetching homepage settings:", error));
  }, []);

  // Auto slide
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, [current]);

  // const handleNext = () => {
  //   setCurrent((prev) => (prev + 1) % slides.length);
  // };

  return (
    <>
      <WebsiteNavbar />
      <Swiper
        key={slides.length}
        modules={[Parallax, Autoplay]}
        speed={1200}
        parallax={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        className="main-banner relative h-screen w-full overflow-hidden bg-black"
      >
        {slides.map((slide, index) => (




          <SwiperSlide key={slide.id}>
            {/* BG IMAGE */}
            {/* <div
  className="absolute inset-0"
  data-swiper-parallax="-23%"
> */}

            <div className="absolute inset-0 overflow-hidden">
              {/* for desktop */}

              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full scale-110 object-cover hidden md:block"
              />
{/* for mobile */}

               <img
                src={slide.image}
                alt={slide.title}
                className="h-full object-cover md:hidden"
              />
            </div>

         <div className="overlay1" />
          <div className="overlay2" />
            <div className="relative z-30 mx-auto flex h-full max-w-[1320px] items-end px-6 pb-[50%] md:pb-[9%]">
              <div className="md:max-w-[1165px]" data-swiper-parallax="-180">
                <h1
                  data-swiper-parallax="-50"
                  className="whitespace-pre-line text-[36px] leading-[42px] font-[700] text-white italic tracking-[-5%] md:text-[64px] md:leading-[71px]"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />

                <p
                  data-swiper-parallax="-50"
                  className="max-w-[456px] mt-[16px] text-[16px] leading-[26px] text-[#ECECEC] md:text-[18px] md:leading-[26px] tracking-[-0.4%]"
                  dangerouslySetInnerHTML={{ __html: slide.description }}
                />

                <div data-swiper-parallax="-50">
              <Link
  href={slide.buttonLink}
  className="sparkle
    group
    relative
    mt-6
    inline-flex
    items-center
    gap-2
    rounded-[6px]
    bg-white
    px-5
    py-2
    text-[16px]
    font-[500]
    text-[#1E3C8C]
    transition-all
    duration-300
    hover:bg-transparent
    hover:text-white
    md:text-[20px]
  "
>
  {slide.buttonText}

  <ChevronRight size={20} />

  <span
    className="
      absolute
      inset-0
      rounded-[6px]
      opacity-0
      group-hover:opacity-100
      transition-opacity
      duration-300
      pointer-events-none
    "
    style={{
      boxShadow:
        "inset 0 0 0 2px transparent",
      borderRadius: "6px",
      background:
        "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      padding: "2px",
    }}
  />
</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        

        {/* NEXT CARD */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="md:hidden absolute right-[20px] bottom-[20px] left-[20px] z-40 w-[auto] overflow-hidden rounded-[0px] md:border md:border-[#383838] bg-[linear-gradient(90deg,_#3178C0_0%,_#F4D3B6_100%)] md:bg-black/40 shadow-[0px_4px_17.9px_0px_#00000040] backdrop-blur-xl transition-all duration-500  md:right-20 md:bottom-40 md:left-[auto] md:w-[250px] md:rounded-[10px]"
        >
          <div className="flex">
            {/* IMAGE */}
            <div className="h-[58px] w-[58px] shrink-0 overflow-hidden md:h-[66px]">
              <img
                src={slides[(current + 1) % slides.length].image}
                alt="next"
                className="h-full w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="ml-3 w-[100%] pr-[10px] text-left md:w-[auto] md:pr-[auto] mt-[7.29px] mb-[2.31px]">
              <p className="mb-1 text-left text-[13.12px] leading-[100%] text-white font-[500] lowercase">
                next
              </p>

              <p className="text-[16px] leading-[100%] font-[500] text-white/76">
                {slides[(current + 1) % slides.length].nextText}
              </p>

              {/* BULLETS */}
              <div className="mt-[9px] flex items-center gap-2">
                {slides.map((_, index) => {
                  const isActive = index === (current + 1) % slides.length;

                  return (
                    <div
                      key={index}
                      className="relative h-[1.6px] flex-1 overflow-hidden rounded-full bg-[#ffffff]"
                    >
                      <div
                        className={`absolute top-0 left-0 h-full bg-[#1E3C8C] ${isActive ? "animate-progress" : "w-0"
                          }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </button>

         {/* NEXT CARD Desktop */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:block absolute right-[20px] bottom-[20px] left-[20px] z-40 w-[auto] overflow-hidden rounded-[0px] md:border md:border-[#383838] bg-black/40 shadow-[0px_4px_17.9px_0px_#00000040] backdrop-blur-xl transition-all duration-500  md:right-20 md:bottom-40 md:left-[auto] md:w-[250px] md:rounded-[10px]"
        >
          <div className="flex">
            {/* IMAGE */}
            <div className="h-[58px] w-[58px] shrink-0 overflow-hidden md:h-[66px]">
              <img
                src={slides[(current + 1) % slides.length].image}
                alt="next"
                className="h-full w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="ml-3 w-[100%] pr-[10px] text-left md:w-[auto] md:pr-[auto] mt-[7.29px] mb-[2.31px]">
              <p className="mb-1 text-left text-[13.12px] leading-[100%] text-white font-[500] lowercase">
                next
              </p>

              <p className="text-[16px] leading-[100%] font-[500] text-white/76">
                {slides[(current + 1) % slides.length].nextText}
              </p>

              {/* BULLETS */}
              <div className="mt-3 flex items-center gap-2">
                {slides.map((_, index) => {
                  const isActive = index === (current + 1) % slides.length;

                  return (
                    <div
                      key={index}
                      className="relative h-[1.6px] flex-1 overflow-hidden rounded-full bg-[#A2A2A2]"
                    >
                      <div
                        className={`absolute top-0 left-0 h-full bg-[#1E3C8C] ${isActive ? "animate-progress" : "w-0"
                          }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </button>
      <div className="fadded-mbl md:hidden"> <img src="/assets/faded.png" loading="eager"
    draggable="false"/> </div>
      </Swiper>
      
      <AboutUs dynamicText={aboutText} />
      <FactsSection dynamicData={factsData} />
      <EngineeringAccordionSection dynamicData={engineeringData} />
      <ProvenFieldSection dynamicData={provenData} />
      <ProvenFieldSectionMobile dynamicData={provenData}  />
      <ProductRangeSection dynamicData={productsData} />
      <SustainabilitySection dynamicData={sustainabilityData} />
      <TestimonialsSection dynamicData={testimonialsData} />
      <Blogs dynamicData={blogsData} />
      <Footer />
    </>
  );
}
