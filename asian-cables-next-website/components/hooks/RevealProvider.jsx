"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealProvider()
{
    const pathname = usePathname();

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
  }, [pathname]);

  return null;
}