"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const closePopup = () => {
    localStorage.setItem("cookie-consent", "closed");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 md:bottom-5  md:right-5 md:ml-0 z-[99999999] md:w-[95%] max-w-[1005px]  rounded-[18px] bg-white p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,.18)]">
      {/* Close */}
      <button
        onClick={closePopup}
        className="absolute right-6 top-6 text-[#1E3C8C] transition hover:rotate-90 cursor-pointer"
      >
        <X size={20} strokeWidth={1.7} />
      </button>

      <h2 className="font-[magistral] text-[20px] md:text-[22px] italic -tracking-[2%] font-bold text-[#1E3C8C]">
        Let’s Talk Cookies
      </h2>

      <p className="mt-[11px] max-w-[1200px] text-[16px] md:text-[16px] leading-[23px] -tracking-[1%] text-[#1E3C8C]">
        Asian Cables uses cookies to ensure our website functions properly,
        improve your browsing experience, and help us understand how visitors
        interact with our content. You can accept all cookies or manage your
        preferences at any time.
      </p>

      <div className="mt-5 flex flex-wrap gap-4">
        <button
          onClick={acceptCookies}
          className="h-[38px] rounded-[8px] bg-[#1E3C8C] px-4 text-[14px] -tracking-[0.4%] font-[400] text-white transition hover:bg-[#17316f]"
        >
          Accept All
        </button>

        <button
          className="h-[38px] rounded-[8px] border border-[#1E3C8C] bg-white px-4 text-[14px] -tracking-[0.4%] font-[400] text-[#1E3C8C] transition hover:bg-[#1E3C8C] hover:text-white"
        >
          Customise Settings
        </button>
      </div>
    </div>
  );
}