"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Phone,
  FileText,
  ChevronDown,
  X,
} from "lucide-react";
import Link from "next/link";
import ContactForm from "../pages/Contact/Parts/ContactForm";

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
  const [contactOpen, setContactOpen] = useState(false);
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
  className={`fixed left-0 right-0 md:right-auto m-auto w-[96%] md:min-w-[589px] md:w-[auto] md:left-1/2 bottom-3 md:bottom-6 z-[999999] md:-translate-x-1/2 transition-all duration-500 ${
    show && !hideAtFooter
      ? "translate-y-0 opacity-100"
      : "translate-y-[120px] opacity-0 pointer-events-none"
  }`}
>
  <div className="flex overflow-visible rounded-md border border-blue-200 bg-white/65 border-[1px] shadow-[0px_20px_60px_0px_#00000026] p-2 md:justify-center justify-between gap-[10px] md:gap-[25px]">

    {/* COMPANY */}
    <Link href="/about" className="flex  f-part f-first flex min-h-[45px] items-center rounded-[4px]  gap-1 md:gap-[10px]   text-[12px] leading-[18px]  md:text-[15px] md:leading-[22.5px] font-[15px] text-[#1E3C8C] font-[500] bg-white/60  w-[35%] md:w-[40%] justify-center">
      <FileText className="h-[15px] w-[15px] md:h-5 md:w-5" />
      Company Overview
    </Link>

    {/* CONTACT */}
    <Link href="/contact"  className="flex f-part min-h-[45px]  flex items-center rounded-[4px]  gap-1 md:gap-[10px]   text-[12px] leading-[18px] md:text-[15px] md:leading-[22.5px] font-[15px] text-[#1E3C8C] font-[500] bg-white/60  w-[35%] justify-center md:w-[30%]">
      <Phone className="h-[15px] w-[15px] md:h-5 md:w-5" />
      Contact us
    </Link>

    {/* DOWNLOADS */}
    <div className="relative justify-center w-[40%] md:w-[30%]">

      <button
        onClick={() =>
          setOpenDownloads(!openDownloads)
        }
        className="flex min-h-[45px] download-btn rounded-[4px] items-center gap-1 md:gap-2 bg-[#1E3C8C]  text-[12px] leading-[18px]  md:text-[15px] md:leading-[1.2] md:text-sm text-white hover:bg-[#1E3C8C] w-[100%] h-[100%] justify-center"
      >
        <Download   className="h-[15px] w-[15px] md:h-5 md:w-5" />
        Downloads  <ChevronDown
                        size={15}
                        className={` ${
                          openDownloads ? "rotate-180" : ""
                        } ${
            openDownloads
              ? "font-[600]"
              : "font-[400]"
          }`}
                      />
      </button>

      {/* POPUP */}
      {openDownloads && (
        <div className="absolute bottom-full right-0 mb-0 floating-bar md:w-[420px] overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.15)]">

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

<button
  type="button"
  onClick={() => setContactOpen(true)}
  className={`fixed right-6 bottom-8 z-[999999] hidden cursor-pointer rounded-[4px] bg-[#1e3c8c] px-5 py-3 text-[#ffffff] transition-all duration-500 md:block ${
    show && !hideAtFooter
      ? "translate-y-0 opacity-100"
      : "pointer-events-none translate-y-[120px] opacity-0"
  }`}
>
  Contact Us Today!
</button>

{contactOpen && (
  <div
    className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60  px-4"
    onClick={() => setContactOpen(false)}
  >
    <div
      className="relative max-h-[90vh] w-full max-w-[700px] overflow-y-auto min-h-[300px] flex items-center justify-center rounded-[12px] bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        type="button"
        onClick={() => setContactOpen(false)}
        className="absolute cursor-pointer right-4 top-4 z-20 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1e3c8c] text-[24px] leading-none text-white"
        aria-label="Close"
      >
        ×
      </button>
     <h2 className="text-2xl">Form Coming Soon!</h2>
    </div>
  </div>
)}



    </>
  );
}