// Homepage.tsx
"use client";

import { useEffect, useState } from "react";
  import { ChevronRight} from "lucide-react";
import ApplicationsSection from "./Parts/Applications";
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
import FloatingActions from "../../../components/layout/Floatingactions";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1920&auto=format&fit=crop",
    title: "Reliability, Redefined",
    description:
      "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Sustainable Impact",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop",
    title: "Powering Future Networks",
    description:
      "Advanced cable solutions designed for modern cities and digital transformation",
    nextText: "Innovation First",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1920&auto=format&fit=crop",
    title: "Built For Critical Systems",
    description:
      "Trusted infrastructure solutions engineered for durability and performance",
    nextText: "Global Excellence",
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
    <div className="relative h-screen w-full overflow-hidden1 bg-black">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,140,255,0.35),_transparent_45%)]" />
        </div>
      ))}

      {/* Network Lines */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[40%] opacity-70">
        <svg
          viewBox="0 0 1200 300"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 240 C200 100 300 280 500 180 S900 120 1200 220"
            fill="none"
            stroke="#66ccff"
            strokeWidth="2"
          />

          <path
            d="M0 260 C300 150 450 260 700 170 S1000 120 1200 260"
            fill="none"
            stroke="#5aa9ff"
            strokeWidth="2"
          />

          {[...Array(18)].map((_, i) => (
            <circle
              key={i}
              cx={i * 70}
              cy={180 + Math.sin(i) * 40}
              r="5"
              fill="white"
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex h-full items-center px-6 max-w-[1320px] mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-[64px] font-extrabold italic leading-tight text-white">
            {slides[current].title}
          </h1>

          <p className="mt-6 max-w-xl text-[18px] leading-8 text-white/80">
            {slides[current].description}
          </p>

          <button className="mt-10 flex items-center gap-2 rounded-md bg-white px-6 py-2 text-[20px] font-semibold text-blue-900 transition hover:bg-blue-50">
            Watch Full Video
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Next Slide Card */}
      <button
        onClick={handleNext}
        className="absolute bottom-36 right-10 z-40 flex w-[250px] items-center overflow-hidden rounded-md border border-white/20 bg-black/40 backdrop-blur-md transition hover:bg-black/60"
      >
        <img
          src={slides[(current + 1) % slides.length].image}
          alt="next"
          className="h-20 w-24 object-cover"
        />

        <div className="px-4 text-left">
          <p className="text-xs uppercase tracking-widest text-white/60">
            next
          </p>

          <h3 className="mt-1 text-lg font-medium text-white">
            {slides[(current + 1) % slides.length].nextText}
          </h3>
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