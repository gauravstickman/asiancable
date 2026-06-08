"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

const certificationData = [

  {
    id: 1,
    title: "ISO 9001",
    subtitle: "Certifications",
    icon: "/assets/manufacturing/image 5.png",
  },
  {
    id: 2,
    title: "ISO 14001",
    subtitle: "Certifications",
    icon: "/assets/manufacturing/for.png",
  },
  {
    id: 3,
    title: "ISO 45001",
    subtitle: "Certifications",
    icon: "/assets/manufacturing/ff.png",
  },
  {
    id: 4,
    title: "IEC",
    subtitle: "Compliance",
    icon: "/assets/manufacturing/image 5 (3).png",
  },
  {
    id: 5,
    title: "IS",
    subtitle: "Compliance",
    icon: "/assets/manufacturing/bsi.png",
  },
  {
    id: 6,
    title: "BS",
    subtitle: "Compliance",
    icon: "/assets/manufacturing/bsc.png",
  },
  {
    id: 7,
    title: "AS/NZS",
    subtitle: "Compliance",
    icon: "/assets/manufacturing/aus.png",
  },
  {
    id: 8,
    title: "NABL Accredited Laboratory",
    subtitle: "Accreditations",
    icon: "/assets/manufacturing/nabl.png",
  },
  {
    id: 9,
    title: "DSIR Recognised R&D",
    subtitle: "Accreditations",
    icon: "/assets/manufacturing/dsir.png",
  },
  {
    id: 10,
    title: "IGBC Platinum Facility",
    subtitle: "Accreditations",
    icon: "/assets/manufacturing/igbc.png",
  },
];

const accreditationData = [
  {
    id: 1,
    title: "NABL Accredited Laboratory",
    subtitle: "Accreditations",
    icon: "/assets/manufacturing/image 6 (1).png",
  },
  {
    id: 2,
    title: "DSIR Recognised R&D",
    subtitle: "Accreditations",
    icon: "/assets/manufacturing/image 6 (2).png",
  },
  {
    id: 3,
    title: "IGBC Platinum Facility",
    subtitle: "Accreditations",
    icon: "/assets/manufacturing/image 6 (3).png",
  },
];

const QualityControlAssurance = ({ data }: { data?: any }) => {
  const [activeTab, setActiveTab] = useState("certifications");

  const qualityItems = data?.qualityItems?.length > 0 ? data.qualityItems.map((item: any, idx: number) => ({
    id: idx + 1,
    title: item.title,
    subtitle: item.subtitle,
    icon: item.logo ? (item.logo.startsWith('http') ? item.logo : `${process.env.NEXT_PUBLIC_BASE_URL}${item.logo}`) : "/assets/manufacturing/image 5.png",
    fileUrl: item.file || "#"
  })) : [
    ...certificationData,
    ...accreditationData
  ];

  const dynamicCertifications = qualityItems.filter((item: any) => !item.subtitle?.toLowerCase().includes("accreditation"));
  const dynamicAccreditations = qualityItems.filter((item: any) => item.subtitle?.toLowerCase().includes("accreditation"));

  const displayedData =
    activeTab === "certifications" ? dynamicCertifications : dynamicAccreditations;

  return (
    <section className="w-full bg-white py-[56px] md:py-20">
      <div className="mx-auto max-w-[1274px] px-5 md:px-0">
        {/* Heading */}
        <h2 className="font-[magistral] text-[32px] leading-[100%] tracking-[-2%] md:text-[46px] md:leading-[55.2px] md:  tracking-[-0.92px] font-bold italic text-[#1E3C8C] text-center">
          {data?.qualityTitle || "Quality Control & Assurance"}
        </h2>
        <div className="mb-12 pt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab("certifications")}
            className={`relative overflow-hidden cursor-pointer px-6 py-2 font-medium transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] ${activeTab === "certifications"
                ? "bg-[#163B8C] font-[work_sans] text-[14px] md:text-[15px] leading-[22.5px] font-medium text-center text-white shadow-lg shadow-blue-500/20"
                : "font-[work_sans] text-[14px] md:text-[15px] leading-[22.5px] font-medium text-[#767676F2] text-center hover:text-[#163B8C]"
              }`}
          >
            Certifications
          </button>

          <button
            onClick={() => setActiveTab("accreditations")}
            className={`relative overflow-hidden cursor-pointer rounded-[2px] px-6 py-2 text-sm font-medium transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] ${activeTab === "accreditations"
                ? "bg-[#163B8C] font-[work_sans] text-[14px] md:text-[15px] leading-[22.5px] font-medium text-center text-white shadow-lg shadow-blue-500/20"
                : "font-[work_sans] text-[14px] md:text-[15px] leading-[22.5px] font-medium text-[#767676F2] text-center hover:text-[#163B8C]"
              }`}
          >
            Accreditations
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedData.map((item: any) => (
            <div
              key={item.id}
              className="flex h-[78px] cursor-pointer items-center justify-between rounded-[6px] bg-[#F5F6FA] px-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-[42px] w-[42px] object-contain"
                />

                <div>
                  <p className="font-[work_sans] text-[16px] leading-[24px] font-medium text-[#6E6E6E]">
                    {item.title}
                  </p >

                  <p className="font-[work_sans] text-[16px] leading-[24px] font-medium text-[#6E6E6E]">{item.subtitle}</p>
                </div>
              </div>
              <img
                src="/assets/manufacturing/Download.png"
                alt="Download icon"
                className="h-5 w-5"
              />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 flex justify-center">
          <button className="border-it-b mx-auto flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-[59px] md:mb-[37.61px]">
            View All
            <span>
              <ChevronRight size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default QualityControlAssurance;
