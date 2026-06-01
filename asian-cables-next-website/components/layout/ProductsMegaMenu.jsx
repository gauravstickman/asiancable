import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductsMegaMenu({ industryGroups = {}, typeGroups = {} }) {
  const [activeTab, setActiveTab] =
    useState("industry");

  return (
    <>
    <div className="w-full border-t border-[#ffffff] bg-white">

      <div className="max-w-[1320px] mx-auto px-6 py-14">

        <div className="grid grid-cols-12 gap-14">

          {/* LEFT */}
          <div className="col-span-3">

            <div className="flex flex-col gap-[15px]">

              {/* INDUSTRY */}
              <button
                onMouseEnter={() =>
                  setActiveTab("industry")
                }
                className={`flex items-center justify-between rounded-md px-6 py-5 text-left text-[21.02px] leading-[106%] italic font-[700] transition ${
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
                className={`flex items-center justify-between rounded-md px-6 py-5 text-left text-[21.02px] leading-[106%] italic font-[700] transition ${
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
              <div className=" grid-cols-3 gap-x-20 gap-y-14 masonry">
                {Object.entries(industryGroups).map(([indName, prods]) => (
                  <div key={indName} className="break-inside-avoid masonry-item">
                <p className="relative flex items-center mb-[15px] h-[24px] pl-3 text-[16px] font-[600] leading-[106%] text-[#2D2D2D]">
 <span
    className="absolute left-0 top-0 right-auto h-[24px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />                      {indName}
                    </p>
                    <div className="flex flex-col gap-0">
                      {prods.map(p => (
                        <Link
                          key={p._id}
                          href={`/product/${p.slug}`}
                          className="text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TYPE CONTENT */}
            {activeTab === "type" && (
              <div className="grid-cols-3 gap-x-20 gap-y-14 masonry">
                {Object.entries(typeGroups).map(([catName, prods]) => (
                  <div key={catName} className="break-inside-avoid masonry-item">
                    <p className="relative flex items-center mb-[15px] h-[24px] pl-3 text-[16px] font-[600] leading-[106%] text-[#2D2D2D]">
 <span
    className="absolute left-0 top-0 right-auto h-[24px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />  
                      {catName}
                    </p>
                    <div className="flex flex-col gap-4">
                      {prods.map(p => (
                        <Link
                          key={p._id}
                          href={`/product/${p.slug}`}
                          className="text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
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