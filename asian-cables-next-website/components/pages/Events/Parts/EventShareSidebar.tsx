"use client";
import { useEffect, useState } from "react";

export default function EventShareSidebar() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="w-full rounded-[10px] bg-[#F3F3F3] p-5 md:sticky top-24  md:min-w-[340px]">
      <p className="mb-5 text-[16px] font-[600] leading-[100%] text-[#152999]">
        Share with your community!
      </p>

      <div className="flex gap-5">
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded bg-[#F3F3F3] text-white cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/assets/events/facebook.png" alt="Facebook" className="w-[30px] h-[30px] object-contain"/>
        </a>

        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded bg-[#F3F3F3] text-white cursor-pointer hover:opacity-80 transition-opacity">
         <img src="/assets/events/twitter.png" alt="Twitter" className="w-[30px] h-[30px] object-contain"/>
        </a>

        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded bg-[#F3F3F3] text-white cursor-pointer hover:opacity-80 transition-opacity">
        <img src="/assets/events/linkedin.png" alt="LinkedIn" className="w-[30px] h-[30px] object-contain"/>
        </a>
      </div>
    </div>
  );
}