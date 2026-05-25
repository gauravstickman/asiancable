"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RevealProvider()
{
    const location = useLocation();

  useEffect(() => {
    const elements =
      document.querySelectorAll(".reveal-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((el) => {
      el.classList.remove("is-visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}