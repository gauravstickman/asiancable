import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductsMegaMenu() {
  const [activeTab, setActiveTab] =
    useState("industry");

  return (
    <>
    <div className="w-full border-t border-[#ffffff] bg-white">

      <div className="max-w-[1320px] mx-auto px-6 py-14">

        <div className="grid grid-cols-12 gap-14">

          {/* LEFT */}
          <div className="col-span-3">

            <div className="flex flex-col gap-4">

              {/* INDUSTRY */}
              <button
                onMouseEnter={() =>
                  setActiveTab("industry")
                }
                className={`flex items-center justify-between rounded-md px-6 py-5 text-left text-[21px] italic font-[700] transition ${
                  activeTab === "industry"
                    ? "bg-[#F5F5F5] text-[#21409A]"
                    : "text-[#9AA4C0]"
                }`}
              >
               <span className="flex items-center gap-2">
                   <bdi><img
  src="/assets/menu-cable.svg"
  className={`w-[23px] h-[23px] object-contain transition ${
    activeTab === "industry"
      ? "brightness-0"
      : "brightness-[0.4]"
  }`}
/></bdi> Cables by Industry
                </span>

              </button>

              {/* TYPE */}
              <button
                onMouseEnter={() =>
                  setActiveTab("type")
                }
                className={`flex items-center justify-between rounded-md px-6 py-5 text-left text-[21px] italic font-[700] transition ${
                  activeTab === "type"
                    ? "bg-[#F5F5F5] text-[#21409A]"
                    : "text-[#9AA4C0]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <bdi><img
  src="/assets/menu-cable.svg"
  className={`w-[23px] h-[23px] object-contain transition ${
    activeTab === "type"
      ? "brightness-0"
      : "brightness-[0.4]"
  }`}
/></bdi> Cables by Type
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-9">

            {/* INDUSTRY CONTENT */}
            {activeTab === "industry" && (
              <div className="grid grid-cols-3 gap-x-20 gap-y-14">

                <div>
                  <p className="relative mb-6 pl-4 text-[16px] font-[600] text-[#2D2D2D]">

                    <span className="absolute left-0 top-1 h-6 w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                    Telecom cables
                  </p>

                  <div className="flex flex-col gap-4">

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Optical fibre
                    </Link>

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Jelly filled
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="relative mb-6 pl-4 text-[16px] font-[600] text-[#2D2D2D]">

                    <span className="absolute left-0 top-1 h-6 w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                    Railway Cables

                  </p>

                  <div className="flex flex-col gap-4">

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Signalling cables
                    </Link>

                  
                  </div>
                </div>
              </div>
            )}

            {/* TYPE CONTENT */}
            {activeTab === "type" && (
              <div className="grid grid-cols-3 gap-x-20 gap-y-14">

                <div>
                  <p className="relative mb-6 pl-4 text-[16px] font-[600] text-[#2D2D2D]">

                    <span className="absolute left-0 top-1 h-6 w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                    Power Cables

                  </p>

                  <div className="flex flex-col gap-4">

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                     Control and instrumentation
                    </Link>

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      EHV
                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
HT                   </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Control & Instrumentation

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Flexible cables 
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="relative mb-6 pl-4 text-[16px] font-[600] text-[#2D2D2D]">

                    <span className="absolute left-0 top-1 h-6 w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                    Specialty Cables

                  </p>

                  <div className="flex flex-col gap-4">

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Elastomeric

                    </Link>

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      E-Beam

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                     Hybrid

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Green Cables

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Cathodic Protection

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Concentric Cables

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      Submersible Cables

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                     EV Charging Cables

                    </Link>
                  
                  </div>
                </div>


                <div>
                  <p className="relative mb-6 pl-4 text-[16px] font-[600] text-[#2D2D2D]">

                    <span className="absolute left-0 top-1 h-6 w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                    Overhead conductors

                  </p>

                  <div className="flex flex-col gap-4">

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      ACSR

                    </Link>

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                    AAC

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                     AAAC

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                    AL-59

                    </Link>

                  
                  </div>

                  <p className="relative mt-10 mb-6 pl-4 text-[16px] font-[600] text-[#2D2D2D]">

                    <span className="absolute left-0 top-1 h-6 w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                    Exports / International Cables


                  </p>

                  <div className="flex flex-col gap-4">

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                      LV Australia


                    </Link>

                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                    LV Europe (IC)

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                     LV US (UL)

                    </Link>
                    <Link
                      href="/"
                      className="text-[16px] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                    >
                    MV Australia


                    </Link>

                  
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
          <img src="/assets/menu-prop.png" className="absolute right-0 bottom-0 w-[200px]" />

    </>
  );
}