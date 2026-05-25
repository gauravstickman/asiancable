// Homepage.tsx
"use client";

import { useEffect, useState } from "react";
  import { ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";
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

const slides = [
  {
    id: 1,
    image:
      "/src/assets/home1.jpg",
    title: "Endurance, by design",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Sustainable Impact",
    buttonText: "Explore Products",
    buttonLink: "/products",
  },
  {
    id: 2,
    image:
      "/src/assets/home2.png",
    title: "Transforming lives by building sustainable world-class infrastructure",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Innovation First",
    buttonText: "Sustainability",
    buttonLink: "/products",
  },
  {
    id: 3,
    image:
      "/src/assets/home3.jpg",
    title: "Powering a future that holds the world",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Global Excellence",
    buttonText: "Company Impact",
    buttonLink: "/products",
  },
  {
    id: 4,
    image:
      "/src/assets/home4.jpg",
    title: "Reliability, Redefined",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Reliability, Redefined",
    buttonText: "Watch Full Video",
    buttonLink: "/products",
  },
];



export default function Homepage() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
    <WebsiteNavbar />
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-[1800ms] ease-in-out ${
  current === index
    ? "z-10 opacity-100 scale-100"
    : "z-0 opacity-0 scale-110"
}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
           className={`h-full w-full object-cover transition-transform duration-[2000ms] ease-out ${
  current === index ? "scale-100" : "scale-125"
}`}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,140,255,0.35),_transparent_45%)]" />
        </div>
      ))}

  

      {/* Main Content */}
      <div className="relative z-30 flex h-full items-center px-6 max-w-[1320px] mx-auto">
        <div
  key={current}
  className="max-w-4xl animate-[heroFade_1s_ease] mt-auto mb-[13%]"
>
          <h1 className="text-[64px] font-extrabold italic leading-tight text-white">
            {slides[current].title}
          </h1>

          <p className="mt-6 max-w-xl text-[18px] leading-8 text-white/80">
            {slides[current].description}
          </p>


          <Link
  to={slides[current].buttonLink}
  className="border-it mt-10 inline-flex items-center gap-2  bg-white px-6 py-2 text-[20px] font-[500] text-[#1E3C8C]"
>
  {slides[current].buttonText}

  <ChevronRight size={20} />
</Link>
        </div>
      </div>

      {/* Next Slide Card */}
    {/* NEXT SLIDE CARD */}
<button
  onClick={handleNext}
  className="absolute bottom-40 right-20 z-40 w-[250px] overflow-hidden rounded-[10px] border border-[#383838] shadow-[0px_4px_17.9px_0px_#00000040] bg-black/40 backdrop-blur-xl transition-all duration-500 hover:bg-black/60"
>

  <div className="flex">

    {/* IMAGE */}
    <div className="w-[58px] h-[66px] shrink-0 overflow-hidden">
      <img
        src={slides[(current + 1) % slides.length].image}
        alt="next"
        className="h-full w-full object-cover"
      />
    </div>

    {/* CONTENT */}
    <div className="ml-3">

      {/* TEXT */}
      <div>

        <p className="text-[13.5px] lowercase tracking-wide text-white mb-1 text-left">
          next
        </p>

        <p className="text-[16px] leading-none font-medium  text-white/70">
          {slides[(current + 1) % slides.length].nextText}
        </p>
      </div>

      {/* BULLETS */}
      {/* BULLETS */}
<div className="mt-3 flex items-center gap-2">

  {slides.map((_, index) => {
    const isActive =
      index === (current + 1) % slides.length;

    return (
      <div
        key={index}
        className="relative h-[1.6px] flex-1 overflow-hidden rounded-full bg-[#A2A2A2]"
      >

        {/* ANIMATED FILL */}
        <div
          className={`absolute left-0 top-0 h-full bg-[#1E3C8C] ${
            isActive ? "animate-progress" : "w-0"
          }`}
        />
      </div>
    );
  })}
</div>
    </div>
  </div>
</button>

    </div>
    <div className="blur-divider">
      <img
  src="/src/assets/divider.svg"
  alt=""
  className="max-w-[100%]" 
/>
    </div>  
    <AboutUs/>
          <FactsSection/>
          <EngineeringAccordionSection/>
          <ProvenFieldSection/>
          <ProductRangeSection/>
    <SustainabilitySection/>
    <TestimonialsSection/>
    <Blogs/>
    <Footer/>
    </>
  );
}