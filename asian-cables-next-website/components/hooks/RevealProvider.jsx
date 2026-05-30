"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeElements = () => {
      document.querySelectorAll(".reveal-section:not(.is-visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}