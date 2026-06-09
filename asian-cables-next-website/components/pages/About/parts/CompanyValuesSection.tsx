"use client";

import React from "react";
import { getBaseUrl } from "../../../../utils/api";

export default function CompanyValuesSection({ dynamicData }: { dynamicData?: any }) {
  const defaultCards = [
    { title: "Our Vision", description: "To reduce risk in irreversible system choices by engineering high-performance solutions that deliver quiet assurance and confident progress.", icon: "/assets/about/eyeIcon.png" },
    { title: "Our Mission", description: "To be the force of certainty in every environment, empowering the systems that drive progress and the spaces that define human life.", icon: "/assets/about/targetIcon.png" },
    { title: "Our Purpose", description: "To enable safer, smarter, and more reliable environments through engineering solutions that connect industries, infrastructure, and everyday life.", icon: "/assets/about/targetIcon.png" },
    { title: "Our Values", description: "To lead with integrity, build with precision, and foster partnerships grounded in trust, accountability, and long-term progress.", icon: "/assets/about/targetIcon.png" }
  ];

  const cards = dynamicData?.valueCards?.length > 0 ? dynamicData.valueCards : defaultCards;
  
  const getIcon = (iconStr: string, defaultIcon: string) => {
    if (!iconStr) return defaultIcon;
    if (iconStr.startsWith('http')) return iconStr;
    return `${getBaseUrl()}${iconStr.startsWith('/') ? '' : '/'}${iconStr}`;
  };

  const title = dynamicData?.builtOnTitle || "Built on Precision. Driven by Purpose.";
  const subtitle = dynamicData?.builtOnSubtitle || "Engineering systems that power certainty across industries, infrastructure, and everyday life.";

  return (
    <section className="bg-[#F8F9FB] py-6 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="mb-6">
          <h1 className="mb-4 font-[magistral] text-[32px] leading-[40px] md:text-[46px] md:leading-[42.17px] font-bold italic text-[#1E3C8C] text-center" dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
          <p className="font-[work_sans] text-[16px] leading-[24px] md:text-[19.77px] md:leading-[31.62px] font-normal text-[#525252] text-center" dangerouslySetInnerHTML={{ __html: subtitle.replace(/\n/g, '<br />') }} />
        </div>
        
        {/* Top Row */}
        <div className="mb-4 grid grid-cols-12 gap-4">
          {cards[0] && (
            <div className="col-span-12 md:col-span-8">
              <div className="h-full rounded-[8px] bg-[#1E3C8C] p-8">
                <div className="mb-2 flex items-center gap-8">
                  <img src={getIcon(cards[0].icon, "/assets/about/eyeIcon.png")} alt="Vision Icon" className={cards[0].icon ? "h-12 w-12 object-contain" : ""} />
                </div>
                <h2 className="block mb-3 text-[32px] md:text-[36px] font-black text-[#ffffff] italic transition-colors duration-300 group-hover:text-white">
                  {cards[0].title}
                </h2>
                <p className="font-[work_sans] text-[18px] leading-[28px] font-normal text-[#FFFFFF]">
                  {cards[0].description}
                </p>
              </div>
            </div>
          )}

          {cards[1] && (
            <div className="col-span-12 md:col-span-4">
              <div className="group h-full rounded-[8px] border border-[#1E3C8C26] bg-white p-8 transition-all duration-300 hover:bg-[#1E3C8C] shadow-[0px_4px_12px_0px_#1E3C8C26]">
                <div className="mb-5 flex items-center gap-5">
                  <img src={getIcon(cards[1].icon, "/assets/about/targetIcon.png")} className="resource-img" alt="Mission Icon" />
                  <h2 className="text-[32px] md:text-[36px] font-black text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                    {cards[1].title}
                  </h2>
                </div>
                <p className="font-[work_sans] text-[18px] leading-[28px] font-normal text-[#525252] transition-colors duration-300 group-hover:text-white">
                  {cards[1].description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-4">
          {cards[2] && (
            <div className="col-span-12 md:col-span-6">
              <div className="group h-full rounded-[8px] border border-[#1E3C8C26] bg-white p-8 transition-all duration-300 hover:text-white hover:bg-[#1E3C8C] shadow-[0px_4px_12px_0px_#1E3C8C26]">
                <div className="mb-5 flex items-center gap-8">
                  <img src={getIcon(cards[2].icon, "/assets/about/targetIcon.png")} alt="Purpose Icon" className="resource-img" />
                  <h2 className="text-[32px] md:text-[36px] font-black text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                    {cards[2].title}
                  </h2>
                </div>
                <p className="font-[work_sans] text-[18px] leading-[28px] font-normal text-[#525252] transition-colors duration-300 group-hover:text-white">
                  {cards[2].description}
                </p>
              </div>
            </div>
          )}

          {cards[3] && (
            <div className="col-span-12 md:col-span-6">
              <div className="group h-full rounded-[8px] border border-[#1E3C8C26] bg-white p-8 transition-all duration-300 hover:bg-[#1E3C8C] shadow-[0px_4px_12px_0px_#1E3C8C26]">
                <div className="mb-5 flex items-center gap-8">
                  <img src={getIcon(cards[3].icon, "/assets/about/targetIcon.png")} alt="Values Icon" className="resource-img" />
                  <h2 className="text-[32px] md:text-[36px] font-black text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                    {cards[3].title}
                  </h2>
                </div>
                <p className="font-[work_sans] text-[18px] leading-[28px] font-normal text-[#525252] transition-colors duration-300 group-hover:text-white">
                  {cards[3].description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
