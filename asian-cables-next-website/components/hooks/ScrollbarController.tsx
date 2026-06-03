"use client";

import { useEffect } from "react";

export function ScrollbarController() {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleScroll = () => {
      document.documentElement.classList.add("show-scrollbar");

      clearTimeout(timer);

      timer = setTimeout(() => {
        document.documentElement.classList.remove("show-scrollbar");
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
}