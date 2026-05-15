"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      const visible = 1 - rect.top / windowHeight;

      // Clamp between 0 and 1
      const value = Math.max(0, Math.min(1, visible));

      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
  const text =
    "Asian Cables, a part of RPG Group, is one of India’s most respected industrial houses. Our journey began in 1959, at a time when India was building the foundations of its future. Over six decades, we have grown alongside the country, a journey guided by deep commitment to quality, reliability, and engineering discipline.";

  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative pt-20 pb-20 bg-[#f8fafc] flex items-center justify-center px-6"
    >
      <div className="max-w-[758px] text-center">
        <p className="text-[23px] leading-[1.6] font-medium tracking-wide">
          {words.map((word, index) => {
            const wordProgress = index / words.length;

            // Color reveal logic
            const isVisible = progress > wordProgress;

            return (
              <span
                key={index}
                className="transition-colors duration-300"
                style={{
                  color: isVisible ? "#1E3A8A" : "#C9C9C9",
                }}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}