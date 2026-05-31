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

      <section className="overflow-hidden1 relative">
        {/* BACKGROUND IMAGE */}
        <img
          src={headerImage}
          alt={headerTitle}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-[1320px] px-4 pt-[210px] pb-[250px] md:pb-[170px]">
          {/* TAG */}
          <div className="mb-5 inline-flex h-[28px] items-center justify-center bg-white/10 px-3 backdrop-blur-md">
            <span className="text-[14px] tracking-[1px] text-white uppercase">
              Industries
            </span>
          </div>

          {/* TITLE */}
          <h1 className="mb-7 text-[42px] leading-[0.9] font-black text-white italic md:text-[72px]">
            {headerTitle}
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-[880px] text-[20px] leading-[1.7] text-white/90">
            {headerDescription}
          </p>
        </div>

        {/* BOTTOM STATS */}
        <div className="reveal-section absolute bottom-0 left-1/2 z-20 w-full max-w-[90%] -translate-x-1/2 translate-y-1/2 px-4 md:max-w-[1320px]">
          <div className="grid grid-cols-1 gap-2.5 overflow-hidden rounded-[6px] bg-white p-2.5 shadow-[0px_25px_60px_rgba(0,0,0,0.25)] md:grid-cols-3">
            {/* STAT ITEM 1 */}
            <div className="bg-[#F9f9f9] px-5 py-5 text-center md:px-10 md:py-10 md:text-left">
              <h3 className="mb-2 bg-[linear-gradient(270.87deg,_#3CAADF_3.87%,_#F04123_63.34%,_#FFD212_122.81%)] bg-clip-text text-[32px] leading-none font-black text-transparent italic md:mb-4 md:text-[52px]">
                {stats[0]?.value || "3600 Km/Yr"}
              </h3>
              <p className="text-[16px] font-[500] text-[#525252]">
                {stats[0]?.label || "EHV Cable Production"}
              </p>
            </div>

            {/* STAT ITEM 2 */}
            <div className="bg-[#F9f9f9] px-5 py-5 text-center md:px-10 md:py-10 md:text-left">
              <h3 className="mb-2 bg-[linear-gradient(270.87deg,_#3CAADF_3.87%,_#F04123_63.34%,_#FFD212_122.81%)] bg-clip-text text-[32px] leading-none font-black text-transparent italic md:mb-4 md:text-[52px]">
                {stats[1]?.value || "60+ Yrs"}
              </h3>
              <p className="text-[16px] font-[500] text-[#525252]">
                {stats[1]?.label || "Cable Manufacturing Expertise"}
              </p>
            </div>

            {/* STAT ITEM 3 */}
            <div className="bg-[#1E3C8C] px-5 py-5 text-center md:px-10 md:py-10 md:text-left">
              <h3 className="mb-2 text-[32px] leading-none font-black text-white italic md:mb-4 md:text-[52px]">
                {stats[2]?.value || "NABL"}
              </h3>
              <p className="text-[16px] font-[500] text-white/90">
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
