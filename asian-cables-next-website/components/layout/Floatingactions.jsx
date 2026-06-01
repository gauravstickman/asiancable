"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Phone,
  FileText,
  X,
} from "lucide-react";

const downloads = [
  {
    name: "Industry Solutions Brochure",
    size: "3.2 MB",
    url: "/downloads/company-profile.pdf",
  },
  {
    name: "Technical Documentation",
    size: "2.1 MB",
    url: "/downloads/technical.pdf",
  },
  {
    name: "Product Catalogue",
    size: "2.8 MB",
    url: "/downloads/catalogue.pdf",
  },
  {
    name: "Case Studies Collection",
    size: "1.5 MB",
    url: "/downloads/case-study.pdf",
  },
  {
    name: "Compliance Certificates",
    size: "1.1 MB",
    url: "/downloads/certificates.pdf",
  },
];

export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const [hideAtFooter, setHideAtFooter] = useState(false);
  const [openDownloads, setOpenDownloads] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShow(true);
      } else {
        setShow(false);
      }

      const footer =
        document.getElementById("footer");

      if (footer) {
        const footerTop =
          footer.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight - 120) {
          setHideAtFooter(true);
        } else {
          setHideAtFooter(false);
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <>
      {/* FLOATING BAR */}
   <div
  className={`fixed left-0 right-0 md:right-auto m-auto w-[96%] md:min-w-[632px] md:w-[auto] md:left-1/2 bottom-6 z-[999999] md:-translate-x-1/2 transition-all duration-500 ${
    show && !hideAtFooter
      ? "translate-y-0 opacity-100"
      : "translate-y-[120px] opacity-0 pointer-events-none"
  }`}
>
  <div className="flex overflow-visible rounded-md border border-blue-200 bg-white shadow-2xl md:justify-center justify-between">

    {/* COMPANY */}
    <button className="flex items-center gap-1 md:gap-2 border-r px-2 py-3 md:px-6 md:py-4 text-[11px] leading-[1.2] md:text-sm font-medium text-blue-900 hover:bg-blue-50 w-[33%] justify-center w-[33%]">
      <FileText size={18} />
      Company Overview
    </button>

    {/* CONTACT */}
    <button className="flex items-center gap-1 md:gap-2 border-r px-2 py-3 md:px-6 md:py-4 text-[11px] leading-[1.2] md:text-sm font-medium text-blue-900 hover:bg-blue-50 w-[33%] justify-center">
      <Phone size={18} />
      Contact us
    </button>

    {/* DOWNLOADS */}
    <div className="relative w-[33%] justify-center md:w-[33.66%]">

      <button
        onClick={() =>
          setOpenDownloads(!openDownloads)
        }
        className="flex download-btn items-center gap-1 md:gap-2 bg-[#1f4aa8] px-2 py-3 md:px-6 md:py-4 text-[11px] leading-[1.2] md:text-sm text-white hover:bg-[#173983] w-[100%] h-[100%] justify-center"
      >
        <Download size={18} />
        Downloads
      </button>

      {/* POPUP */}
      {openDownloads && (
        <div className="absolute bottom-full right-0 mb-0 w-[10vw] md:w-[420px] overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.15)]">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#E5E5E5] px-5 py-4 mb-3">

            <div className="flex items-center gap-4">

              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-md bg-[#21409A] text-white">
                <Download size={18} />
              </div>

              <p className="text-[20px] font-[500] text-[#21409A]">
                Downloads
              </p>
            </div>

            <button
              onClick={() =>
                setOpenDownloads(false)
              }
              className="text-[#8A8A8A] hover:text-black cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>

          {/* FILES */}
          <div className="max-h-[420px] overflow-y-auto">

            {downloads.map((file, index) => (
              <a
                key={index}
                href={file.url}
                download
                className="flex items-center justify-between  px-5 py-5 transition hover:bg-[#F8FAFF]"
              >
                <div className="flex items-center gap-2 md:gap-4">

                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>

                  <div>
                    <p className="text-[16px] md:text-[18px] leading-none font-medium text-[#21409A]">
                      {file.name}
                    </p>
 
                    <p className="mt-1 md:mt-2 text-sm text-[#8A8A8A]">
                      PDF • {file.size}
                    </p>
                  </div>
                </div>

                <Download
                  size={20}
                  className="text-[#8A8A8A]"
                />
              </a>
            ))}
          </div>

          {/* FOOTER */}
          <div className="p-5">
            <button className="w-full rounded-md bg-[#21409A] py-3 text-[16px] font-medium text-white hover:bg-[#173983]">
              Download All Files
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>


    </>
  );
}