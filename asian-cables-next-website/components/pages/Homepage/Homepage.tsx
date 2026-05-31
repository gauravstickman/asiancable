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

  useEffect(() => {
    api.get("/homepage-settings")
      .then((res) => {
        const data = res.data;
        if (data.success && data.data && data.data.heroSlides && data.data.heroSlides.length > 0) {
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
          console.log("API DATA:", data.data);
        }
      })
      .catch((error) => console.warn("Error fetching homepage settings:", error));
  }, []);

  useEffect(() => {
    api.get("/blogs")
      .then((res) => {
        const data = res.data;
        const blogsArray = Array.isArray(data) ? data : (data.data || data.blogs || []);
        if (blogsArray.length > 0) {
          setBlogsData(blogsArray);
        }
      })
      .catch((error) => console.warn("Error fetching blogs:", error));
  }, []);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const responseData = res.data;
        const productsArray = Array.isArray(responseData) ? responseData : (responseData.data || []);
        if (Array.isArray(productsArray) && productsArray.length > 0) {
          const formattedProducts = productsArray.map((p: any) => ({
            title: p.name,
            image: p.image
              ? (p.image.startsWith("http")
                ? p.image
                : `${getBaseUrl()}/${p.image.replace(/\\/g, "/")}`)
              : "",
            points: p.features || [],
          }));
          setProductsData(formattedProducts);
        }
      })
      .catch((error) => console.warn("Error fetching products:", error));
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
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full scale-110 object-cover"
              />
            </div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

            {/* BLUE OVERLAY */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_bottom,_rgba(0,140,255,0.35),_transparent_45%)]" />

            {/* CONTENT */}
            <div className="relative z-30 mx-auto flex h-full max-w-[1320px] items-end px-6 pb-[50%] md:pb-[9%]">
              <div className="md:max-w-[1165px]" data-swiper-parallax="-180">
                <h1
                  data-swiper-parallax="-50"
                  className="whitespace-pre-line text-[36px] leading-[42px] font-[700] text-white italic tracking-[-5%] md:text-[64px] md:leading-[71px]"
                >
                  {slide.title}
                </h1>

                <p
                  data-swiper-parallax="-50"
                  className="max-w-[456px] mt-[16px]  text-[16px] leading-[26px] text-[#ECECEC] md:text-[18px] md:leading-[26px] tracking-[-0.4%]"
                >
                  {slide.description}
                </p>

                <div data-swiper-parallax="-50">
                  <Link
                    href={slide.buttonLink}
                    className="border-it mt-[40px] inline-flex items-center gap-1 bg-white px-[29px] py-2 text-[16px] font-[500] text-[#1E3C8C] md:text-[20px] tracking-[-0.46px] md:leading-[29.42px]"
                  >
                    {slide.buttonText}

                    <ChevronRight size={19} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* NEXT CARD */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-[20px] bottom-[20px] left-[20px] z-40 w-[auto] overflow-hidden rounded-[0px] border border-[#383838] bg-black/40 shadow-[0px_4px_17.9px_0px_#00000040] backdrop-blur-xl transition-all duration-500 hover:bg-black/60 md:right-20 md:bottom-40 md:left-[auto] md:w-[250px] md:rounded-[10px]"
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
      </Swiper>
      <div className="blur-divider">
        <img src="/assets/divider.svg" alt="" className="max-w-[100%]" />
      </div>
      <AboutUs dynamicText={aboutText} />
      <FactsSection dynamicData={factsData} />
      <EngineeringAccordionSection dynamicData={engineeringData} />
      <ProvenFieldSection dynamicData={provenData} />
      <ProductRangeSection dynamicData={productsData} />
      <SustainabilitySection />
      <TestimonialsSection dynamicData={testimonialsData} />
      <Blogs dynamicData={blogsData} />
      <Footer />
    </>
  );
}
