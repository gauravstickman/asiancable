"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Blue → White transition
    const first = setTimeout(() => {
      setStage(2);
    }, 1000);

    let value = 0;

    const interval = setInterval(() => {
      value++;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        // Small pause after loading reaches 100%
        setTimeout(() => {
          setReveal(true);

          // Remove preloader after reveal animation
         setTimeout(() => {
  window.dispatchEvent(new Event("preloaderComplete"));

  setHide(true);
  document.body.style.overflow = "";
}, 1100);
        }, 300);
      }
    }, 22);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (hide) return null;

  return (
    <div
      className={`
        fixed
        inset-0
        z-[999999]
        overflow-hidden
        bg-[#1E3C8C]
      `}
    >

      <div
        className={`
          absolute
          inset-0
          bg-[#1E3C8C]
          transition-opacity
          duration-[700ms]
          ease-out
          ${reveal ? "opacity-0" : "opacity-100"}
        `}
      />

    
      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-[0%]
          w-[140%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-4deg]
          bg-white

          transition-all
          duration-[1100ms]
          ease-[cubic-bezier(.76,0,.24,1)]

          ${
            reveal
              ? "h-[150%]"
              : "h-0"
          }
        `}
      />


<div
  className={`
    absolute
    left-1/2
    top-[45%]
    z-40
    -translate-x-1/2
    -translate-y-1/2

    transition-all
    duration-[650ms]
    ease-[cubic-bezier(.76,0,.24,1)]

    ${reveal ? "scale-[0.75] opacity-0" : "scale-100 opacity-100"}
  `}
>
  <img
    src="/assets/footer-logo.png"
    alt="Logo"
    className={`
      w-[190px]
      md:w-[224px]

      transition-all
      duration-500

      ${
        stage >= 2
          ? "opacity-0 scale-90"
          : "opacity-100 scale-100"
      }
    `}
  />

  <img
  src="/assets/LOGO_Dark.png"
  alt="Logo"
  className={`
    absolute
    left-0
    top-0
    w-[190px]
    md:w-[224px]
    transition-all
    duration-500
    ${
      reveal
        ? "opacity-100 scale-100"
        : "opacity-0 scale-90"
    }
  `}
/>
</div>


      <div
        className={`
          absolute
          bottom-0
          left-0
          z-30
          w-full

          transition-all
          duration-500

          ${reveal ? "opacity-0" : "opacity-100"}
        `}
      >
        <div className="h-[6px] bg-[#EAEAEA] md:h-[11px]">
          <div
            className="h-full transition-[width] duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
              boxShadow:
                "0 0 18px rgba(60,170,223,.6), 0 0 25px rgba(240,65,35,.35)",
            }}
          />
        </div>
      </div>

    
      <div
        className={`
          absolute
          bottom-[30px]
          right-[30px]
          z-30
          text-[12px]
          font-medium
          tracking-[0.15em]
          text-white

          transition-all
          duration-500

          ${reveal ? "translate-y-5 opacity-0" : "opacity-100"}
        `}
      >
        {progress}%
      </div>

   
      <div
        className={`
          absolute
          left-1/2
          top-1/2
          z-30
          h-[1px]
          -translate-x-1/2
          -translate-y-1/2
          bg-white

          transition-all
          duration-[900ms]
          ease-[cubic-bezier(.76,0,.24,1)]

          ${
            reveal
              ? "w-[100vw] opacity-0"
              : "w-0 opacity-0"
          }
        `}
      />
    </div>
  );
}