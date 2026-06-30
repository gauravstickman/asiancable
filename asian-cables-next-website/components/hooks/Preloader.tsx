"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

const [slideUp, setSlideUp] = useState(false);


  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Blue → White
    const first = setTimeout(() => {
      setStage(2);
    }, 1000);

    let value = 0;

    const interval = setInterval(() => {
      value++;

      setProgress(value);

      if (value >= 100) {
  clearInterval(interval);

  setTimeout(() => {
    setSlideUp(true);

    setTimeout(() => {
      setHide(true);
      document.body.style.overflow = "";
    }, 900); // animation duration
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
transition-transform
duration-[900ms]
ease-[cubic-bezier(.76,0,.24,1)]
${slideUp ? "-translate-y-full" : "translate-y-0"}
`}
    >
      {/* BLUE */}
      <div className="absolute inset-0 bg-[#1E3C8C]" />

      {/* WHITE PANEL */}

      <div
        className={`
absolute
inset-0
bg-white
transition-transform
duration-[900ms]
ease-[cubic-bezier(.7,0,.3,1)]
${stage >= 2 ? "translate-y-0" : "translate-y-full"}
`}
      />

      {/* WHITE LOGO */}

      <img
        src="assets/footer-logo.png"
        className={`
absolute
left-1/2
top-[45%]
w-[190px]
md:w-[224px]
-translate-x-1/2
-translate-y-1/2
transition-all
duration-500
${stage >= 2 ? "opacity-0 scale-90" : "opacity-100 scale-100"}
`}
      />

      {/* BLUE LOGO */}

      <img
        src="assets/LOGO_Dark.png"
        className={`
absolute
left-1/2
top-[45%]
w-[190px]
md:w-[224px]
-translate-x-1/2
-translate-y-1/2
transition-all
duration-500
${stage >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-90"}
`}
      />

      {/* Loader */}

      {stage >= 2 && (
       <div className="absolute bottom-0 left-0 w-full">
  <div className="h-[6px] md:h-[11px] bg-[#EAEAEA]">
   <div
    className="h-full"
    style={{
      width: `${progress}%`,
      background:
        "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
      boxShadow:
        "0 0 18px rgba(60,170,223,.6),0 0 25px rgba(240,65,35,.35)",
    }}
  />
  </div>
</div>
      )}
    </div>
  );
}