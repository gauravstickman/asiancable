"use client";

import { useEffect, useRef, useState } from "react";

interface AboutUsProps {
  dynamicText?: string;
}

export default function AboutUs({ dynamicText }: AboutUsProps) {
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

  const text = dynamicText || "";
  const words = text.split(" ");

  return (
    <>
    <div className="fadded hidden md:block">
      <img src="/assets/faded.png" loading="eager"
    draggable="false"/>
    </div>
    <section
      ref={sectionRef}
      className="reveal-section1 relative flex items-center justify-center bg-[#ffffff] px-6 pt-20 pb-20 md:pt-[107px] md:pb-[121px]"
    >
     
      <div className="max-w-[758px] text-center">
        <p className="text-[16px] leading-[125%] font-[500] tracking-none md:text-[20px]">
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
    </>
  );
}
