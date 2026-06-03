"use client";
import { useEffect, useState } from "react";
import api, { getBaseUrl } from "../../../utils/api";
import { CircleCheck, Award } from "lucide-react";
import WebsiteNavbarDark from "../../../components/layout/Navbardark";
import Footer from "../../../components/layout/Footer";
// import BottomBar from "../../../components/layout/Bottombar";
import ProjectSection from "../Homepage/Parts/Applications";
import ProductResources from "./parts/ProductResources";
import ProvenFieldSection from "../Homepage/Parts/Fields";
import ProvenFieldSectionMobile from "../Homepage/Parts/FieldsMobile";

const Product = ({ productSlug }: { productSlug?: string }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (productSlug) {
      api.get(`/products/slug/${productSlug}`)
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [productSlug]);

  const p = data || {};
  
  const getImg = (url?: string) => {
    if(!url) return "";
    if(url.startsWith("http")) return url;
    return `${getBaseUrl()}/${url.replace(/\\/g, "/")}`;
  };

  return (
    <>
      <WebsiteNavbarDark />
      {/* <BottomBar currentProduct={p} /> */}

      <section className="bg-[#f6f6f6] md:pt-[64px] pb-15 md:pb-[96px]">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="grid grid-cols-1 items-center md:gap-14 lg:grid-cols-2">
            {/* LEFT IMAGE */}
            <div className="my-8 flex h-[auto] items-center justify-center bg-white md:my-0 md:h-[592px]">
              <img
                src={p.image ? getImg(p.image) : "/assets/p-main.png"}
                alt={p.name || "Control Cable"}
                className="object-contain md:w-[88%]"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              {/* TAG */}
              <div className="mb-[10px] inline-flex h-[30px] items-center justify-center bg-white px-3">
                <span className="text-[14px] font-[500] tracking-[0px] text-[#767676] uppercase">
                  {p.category?.name || p.category || "Power Cables"}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="mb-[18px] text-[32px] leading-[1.3] font-[700] text-[#1E3C8C] italic md:text-[56px] md:leading-[61.2px] md:tracking-[1.12px]">
                {p.name || (
                  <>
                    Control and
                    <br />
                    instrumentation
                  </>
                )}
              </h1>

              {/* DESCRIPTION */}
              <p className="mb-[24px] max-w-[100%] text-[16px] leading-[27.2px] text-[#525252] md:text-[17px]">
                {p.description || "Multicore, multi-pair control and instrumentation constructions with screening, individual pair shielding, and specialised jacketing options for chemical, temperature or EM-noisy environments; available in high-core counts (up to 61 cores and above) and varied pair configurations per plant specs."}
              </p>

              {/* FEATURES */}
              <div className="mb-[33px] grid grid-cols-2 gap-y-8">
                {(p.specifications && p.specifications.length > 0 ? p.specifications : [
                  { label: "Voltage Rating", value: "Up to 11 kV", icon: "/assets/p-1.svg" },
                  { label: "Conductor", value: "Annealed Copper", icon: "/assets/p-2.svg" },
                  { label: "Insulation", value: "PVC / XLPE", icon: "/assets/p-3.svg" },
                  { label: "Shielding", value: "Individual / Overall Screening Options", icon: "/assets/p-4.svg" }
                ]).map((spec: any, idx: number) => {
                  const defaultIcons = ["/assets/p-1.svg", "/assets/p-2.svg", "/assets/p-3.svg", "/assets/p-4.svg"];
                  const displayIcon = spec.icon || defaultIcons[idx % 4] || "/assets/p-1.svg";
                  return (
                  <div key={idx} className="flex items-center items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                      <img src={displayIcon} alt="" className="w-8" />
                    </div>

                    <div>
                      <p className="text-[14px] leading-[21px] font-[500] text-[#767676]">
                        {spec.label}
                      </p>

                      <span className="text-[14px] leading-[21px] font-[600] text-[#1E3C8C]">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                )})}
              </div>

              {/* IDEAL FOR */}
              <div>
                {/* LABEL */}
                <div className="mb-[16px] relative flex items-center gap-3">
<span
    className="absolute left-0 top-0 right-auto h-[19px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />
                  <span className="pl-3 text-[14px] font-[600] leading-[21px] tracking-[0.3px] text-[#525252]">
                    Ideal For
                  </span>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3">
                  {(p.idealFor && p.idealFor.length > 0 ? p.idealFor : [
                    "Oil & gas",
                    "Petrochemicals",
                    "Power plants",
                    "Industrial automation systems",
                  ]).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex h-[32px] items-center justify-center bg-white px-3 text-[12px] text-[#525252] font-[400] md:h-[37.5px] md:px-4 md:text-[13px]"
                    >
                      {item?.name || item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section bg-[#ffffff] pt-10 pb-5 md:pt-30 md:pb-20">
        <div className="mx-auto max-w-[1320px] px-4">
          {/* TOP */}
          <div className="mb-[44px] grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div>
              {/* TITLE */}
              <h2 className="mb-[24px] text-[32px] leading-[1.4] font-black text-[#1E3C8C] italic md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px]">
                Product Overview
              </h2>

              {/* DESCRIPTION */}
              <p className="mb-[36px] text-[18px] font-[400] leading-[32.4px] text-[#6F6F6F]">
                {p.overviewDescription || "Asian Cables Instrumentation cables are designed for accurate signal transmission in industrial control and monitoring systems. These cables feature high-quality copper conductors, advanced insulation materials and shielding options to minimize signal interference. Ideal for industries where precise data and signal transmission are critical for operational reliability."}
              </p>

              {/* BUTTON */}
              <button className="border-it-w h-[56px] rounded-[4px] bg-[#1E3C8C] px-7 text-[16px] font-[600] text-white transition">
                Request Technical Consultation
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="overflow-hidden rounded-[8px] shadow-[0px_20px_60px_rgba(0,0,0,0.12)]">
                <img
                  src={p.overviewImage ? getImg(p.overviewImage) : "/assets/image99.png"}
                  alt="Product Overview"
                  className="h-[480px] w-full object-cover md:h-[487px]"
                />
              </div>
            </div>
          </div>

            {/* BOTTOM STATS */}
          <div className="rounded-[8px] bg-[#F6F6F6] px-10 py-7">
            <div className="flex flex-col items-center justify-between md:flex-row md:px-8">
              {/* ITEM */}
              <div className="flex flex-col items-center justify-between">
                <div className="text-center md:text-left">
                  <h3 className="text-[26px] leading-[1.4] font-[700] text-[#1E3C8C] italic md:text-[34px] md:leading-[43.66px]">
                    3600 km
                  </h3>

                  <p className="text-[14px] leading-[15.59px] text-[#1E3C8C]">
                    annual cable manufacturing capacity
                  </p>
                </div>
              </div>
              {/* DIVIDER */}
              <div className="my-4 h-[2px] w-[152px]  md:my-0 md:h-[50px] md:w-[3px] hidden md:block"  style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }} /> 
    <div className="my-4 h-[2px] w-[152px]  md:my-0 md:h-[50px] md:w-[3px] md:hidden"  style={{
      background:
        "linear-gradient(272deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }} />    

              {/* ITEM */}
              <div className="flex flex-col items-center justify-between">
                <div className="text-center md:text-left">
                  <h3 className="text-[26px] leading-[1.4] font-[700] text-[#1E3C8C] italic md:text-[34px] md:leading-[43.66px]">
                    6+
                  </h3>

                  <p className="text-[14px] leading-[15.59px] text-[#1E3C8C]">
                    Decades of Cable Manufacturing Expertise
                  </p>
                </div>
              </div>
              {/* DIVIDER */}
 <div className="my-4 h-[2px] w-[152px]  md:my-0 md:h-[50px] md:w-[3px] hidden md:block"  style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }} /> 
    <div className="my-4 h-[2px] w-[152px]  md:my-0 md:h-[50px] md:w-[3px] md:hidden"  style={{
      background:
        "linear-gradient(272deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }} />              {/* ITEM */}
              <div className="flex flex-col items-center justify-between">
                <div className="text-center md:text-left">
                  <h3 className="text-[26px] leading-[1.4] font-[700] text-[#1E3C8C] italic md:text-[34px] md:leading-[43.66px]">
                    90+
                  </h3>

                  <p className="text-[14px] leading-[15.59px] text-[#1E3C8C]">
                    Presence in Countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductResources data={p} />

      <section className="reveal-section bg-[#f6f6f6] py-15 md:pt-[99px] md:pb-[100px]">
        <div className="mx-auto max-w-[1320px] px-4">
          {/* HEADING */}
          <div className="mb-[60px] text-center">
            <h2 className="text-[32px] leading-none font-[700] text-[#1E3C8C] italic md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px]">
              Features & Standards
            </h2>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* LEFT BIG CARD */}
            <div className="relative min-h-[520px] overflow-hidden rounded-[6px] bg-white lg:col-span-7">
              {/* BACKGROUND IMAGE */}
              <img
                src={p.featuresImage ? getImg(p.featuresImage) : "/assets/Container-2.png"}
                alt=""
                className="object-right-topss absolute top-0 right-0 h-full w-[55%] object-cover"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />

              {/* CONTENT */}
              <div className="relative z-10 p-7 md:p-10">
                {/* TITLE */}
                <h3 className="mb-12 text-[20px] leading-none font-black text-[#1E3C8C] italic md:text-[36px] md:leading-[54px]">
                  Key Features
                </h3>

                {/* FEATURES */}
                <div className="space-y-5 md:space-y-[33px]">
                  {(p.features && p.features.length > 0 ? p.features : [
                    "Accurate signal transmission with minimal interference",
                    "Shielded construction options for noise reduction",
                    "Flexible and durable cable construction",
                    "Suitable for hazardous and industrial environments",
                    "Reliable performance for monitoring and control systems",
                  ]).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 md:items-start"
                    >
                      {/* ICON */}
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3C8C]">
                        <span className="text-[16px] text-white md:text-[14px]">
                          <CircleCheck size={28} />
                        </span>
                      </div>

                      {/* TEXT */}
                      <p className="text-[18px] leading-[25.6px] text-[#525252]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM RIGHT GRADIENT */}

{/* <div className="absolute right-0 bottom-0 h-[100%] w-[100%]">
  <img
    src="/assets/gbg.png"
    alt=""
    className="h-full w-full object-contain"
  />
</div> */}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-row gap-4 md:flex-col lg:col-span-5">
              {/* ISO CARD */}
              <div className="relative h-[190px] w-[50%] overflow-hidden rounded-[6px] bg-[#12398F] md:h-[250px] md:w-[100%]">
                {/* BACKGROUND IMAGE */}
                <img
                  src="/assets/footer.jpg"
                  alt=""
                  className="absolute top-0 right-0 h-full w-[100%] object-cover"
                />

                {/* CONTENT */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-3 text-center md:px-8">
                  {/* ICON */}
                  <div className="mb-[16px]">
                    <Award
                      className="h-8 w-8 md:h-16 md:w-16"
                      color="#ffffff"
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="mb-[16.5px] text-[18px] leading-none font-black text-white italic md:text-[28px] md:leading-[42px]">
                    ISO Certifications
                  </h3>

                  {/* CERTIFICATIONS */}
                  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8">
                    {(p.isoCertifications && p.isoCertifications.length > 0 ? p.isoCertifications : ["ISO 9001", "ISO 14001", "ISO 45001"]).map(
                      (item: string, index: number) => (
                        <span
                          key={index}
                          className="text-[12px] text-white md:text-[15px] md:leading-[22.5px]"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* STANDARDS CARD */}
              <div className="relative h-[190px] w-[50%] overflow-hidden rounded-[6px] bg-white p-6 md:h-[250px] md:w-[100%] md:p-10">
                {/* BACKGROUND GLOW */}
                <div className="absolute top-0 right-0 h-[180px] w-[180px] bg-[radial-gradient(circle,_rgba(60,170,223,0.18)_0%,_transparent_70%)]" />

                {/* BACKGROUND IMAGE */}
               <div className="absolute right-0 bottom-0 h-[100%] w-[100%]">
  <img
    src="/assets/gbg.png"
    alt=""
    className="h-full w-full object-cover object-bottom-right"
  />
</div>
                {/* CONTENT */}
                <div className="relative z-10">
                  {/* TITLE */}
                  <h3 className="mb-10 text-[16px] leading-none font-black text-[#1E3C8C] italic md:text-[18px] md:leading-[27px]">
                    Standards
                  </h3>

                  {/* LIST */}
                  <div className="space-y-4 md:space-y-[15px]">
                    {(p.standards && p.standards.length > 0 ? p.standards : ["IEC Standards", "BS Standards", "IS Standards"]).map(
                      (item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-[6px] w-[6px] rounded-full bg-[#1E3C8C]" />

                          <p className="text-[14px] leading-[1] text-[#525252] md:text-[15px] md:leading-[22.5px]">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectSection data={p.applications} />

      <div className="proven-f w flex justify-center md:mb-[50px]">
        <ProvenFieldSection dynamicData={p.projects} />
      </div>
      <div className="proven-f w flex justify-center">
        <ProvenFieldSectionMobile dynamicData={p.projects} />
      </div>

      <Footer />
    </>
  );
};

export default Product;
