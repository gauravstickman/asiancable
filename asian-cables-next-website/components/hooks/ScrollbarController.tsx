"use client";

import { useEffect } from "react";

export function ScrollbarController() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  return null;
}