"use client";
import Link from "next/link";
// import WebsiteNavbarDark from '../../../components/layout/Navbardark';
import { useEffect, useState } from "react";
import api, { getBaseUrl } from "../../../utils/api";
import WebsiteNavbar from "../../../components/layout/WebsiteNavbar";
import Footer from "../../../components/layout/Footer";
import ProvenProjects from "./parts/ProvenGrid";
import TrustedLeaders from "./parts/TrustSection";
import IndustryProducts from "./parts/Cables";
import AsianCablesImpact from "./parts/Impact";
import IndustryApplications from "./parts/IndustryApplications";

const IndustryPage = ({ slug = "oil-and-gas" }: { slug?: string }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      api.get(`/industry-page/slug/${slug}`)
        .then((res) => {
          const resData = res.data;
          if (resData.success) {
            setData(resData.data);
          }
        })
        .catch((error) => console.warn("Error fetching industry page:", error));
    }
  }, [slug]);

  // Use fallback hardcoded values initially so it matches the design while loading
  const headerTitle = data?.headerTitle || "Oil & Gas";
  const headerDescription = data?.headerDescription || "Enabling uninterrupted operations across upstream, midstream, and downstream facilities through cabling solutions aligned to safety protocols, reliability requirements, and asset integrity expectations. Specialized cable solutions support energy infrastructure including refineries, petrochemical plants and pipeline protection systems.";
  const headerImage = data?.headerBgImage ? (data.headerBgImage.startsWith("http") ? data.headerBgImage : `${getBaseUrl()}/${data.headerBgImage.replace(/\\/g, "/")}`) : "/assets/industry-main.png";
  const stats = data?.stats || [
    { value: "3600 Km/Yr", label: "EHV Cable Production" },
    { value: "60+ Yrs", label: "Cable Manufacturing Expertise" },
    { value: "NABL", label: "Accredited Testing Lab" },
  ];

  return (
    <>
      <WebsiteNavbar />

      <section className="overflow-hidden1 relative md:mb-0 mb-[-300px]">
        {/* BACKGROUND IMAGE */}
        <img
          src={headerImage}
          alt={headerTitle}
          className="absolute inset-0 h-full w-full object-cover hidden md:block"
        />

<img src="/assets/industry-bg.jpg" alt={headerTitle} className="absolute inset-0 h-full w-full object-cover position-top md:hidden" />


        {/* OVERLAY */}
<div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_32.35%,_#000000_91.59%)]" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-[1320px] px-4 pt-[210px] pb-[60px] md:pt-[228px] md:pb-[0px]">
          {/* TAG */}
          <div className="mb-[19px] inline-flex h-[27px] items-center justify-center bg-[#D8D8D81A] px-2">
            <span className="text-[14px] tracking-[1px] leading-[21px] text-white uppercase">
              Industries
            </span>
          </div>

          {/* TITLE */}
          <h1 className="mb-[30px] text-[42px] leading-[0.9] font-[700] text-white italic md:text-[72px] md:leading-[79.2px] md:tracking-[-1.44px]">
            {headerTitle}
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-[894px] text-[18px] leading-[30px] text-white md:text-[20px] md:leading-[34px] md:text-white/90">
            {headerDescription}
          </p>
        </div>

        {/* BOTTOM STATS */}
        <div className="reveal-section relative i-stats bottom-0 md:left-1/2 z-20 w-full max-w-[90%] md:-translate-x-1/2 md:translate-y-1/2 px-4 md:max-w-[1320px] md:mt-[-45px]">
          <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-[2px] bg-white p-2 shadow-[0px_4px_133.5px_0px_#9D9D9D40] md:grid-cols-3">
            {/* STAT ITEM 1 */}
            <div className="bg-[#F9f9f9] px-5 py-5 text-center md:px-7 md:py-7 md:text-left">
              <h3 className="bg-[linear-gradient(270.87deg,_#3CAADF_3.87%,_#F04123_63.34%,_#FFD212_122.81%)] bg-clip-text text-[30px] leading-[40px] font-black text-transparent italic md:text-[45px] md:leading-[55px]">
                {stats[0]?.value || "3600 Km/Yr"}
              </h3>
              <p className="mt-[10px] text-[15.81px] leading-[23.72px] font-[500] text-[#525252]">
                {stats[0]?.label || "EHV Cable Production"}
              </p>
            </div>

            {/* STAT ITEM 2 */}
            <div className="bg-[#F9f9f9] px-5 py-5 text-center md:px-7 md:py-7 md:text-left">
              <h3 className="inset-0 bg-[linear-gradient(270.87deg,_#3CAADF_3.87%,_#F04123_63.34%,_#FFD212_122.81%)] bg-clip-text text-[30px] leading-[40px] font-black text-transparent italic md:text-[45px] md:leading-[55px]">
                {stats[1]?.value || "60+ Yrs"}
              </h3>
              <p className="mt-[10px] text-[15.81px] leading-[23.72px] font-[500] text-[#525252]">
                {stats[1]?.label || "Cable Manufacturing Expertise"}
              </p>
            </div>

            {/* STAT ITEM 3 */}
            <div className="bg-[#1E3C8C] px-5 py-5 text-center md:px-7 md:py-7 md:text-left">
              <h3 className=" text-[30px] leading-[40px] font-black text-[#ffffff] italic md:text-[45px] md:leading-[55px]">
                {stats[2]?.value || "NABL"}
              </h3>
              <p className="mt-[10px] text-[15.81px] leading-[23.72px] font-[500] text-white/90">
                {stats[2]?.label || "Accredited Testing Lab"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProvenProjects dynamicData={data?.projects} sectionTitle={data?.provenProjectsTitle} sectionSubtitle={data?.provenProjectsSubtitle} />
      <TrustedLeaders dynamicData={data?.trustedLogos} sectionTitle={data?.trustedTitle} />
      <IndustryProducts dynamicData={data?.products} sectionTitle={data?.productsTitle || `Cables for ${headerTitle}`} />
      <AsianCablesImpact dynamicData={data?.impacts} sectionTitle={data?.impactTitle || `Asian Cables Impact on ${headerTitle}`} />
      <IndustryApplications dynamicData={data?.applications} sectionTitle={data?.applicationsTitle || `Applications for ${headerTitle}`} />
      <Footer />
    </>
  );
};

export default IndustryPage;
