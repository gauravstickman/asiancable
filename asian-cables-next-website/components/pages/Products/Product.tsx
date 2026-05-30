"use client";
import { useEffect, useState } from "react";
import api, { getBaseUrl } from "../../../utils/api";
import { CircleCheck, Award } from "lucide-react";
import WebsiteNavbarDark from "../../../components/layout/Navbardark";
import Footer from "../../../components/layout/Footer";
import BottomBar from "../../../components/layout/Bottombar";
import ProjectSection from "../Homepage/Parts/Applications";
import ProvenFieldSection from "../Homepage/Parts/Fields";
import ProductResources from "./parts/ProductResources";

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
      <BottomBar />

      <section className="bg-[#f6f6f6] pt-20 pb-15 md:pb-24">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* LEFT IMAGE */}
            <div className="mb-8 flex h-[280px] items-center justify-center bg-white md:mb-0 md:h-[680px]">
              <img
                src={p.image ? getImg(p.image) : "/assets/p-main.png"}
                alt={p.name || "Control Cable"}
                className="object-contain md:w-[88%]"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              {/* TAG */}
              <div className="mb-4 inline-flex h-[30px] items-center justify-center bg-white px-4">
                <span className="text-[13px] font-medium tracking-[1px] text-[#767676] uppercase">
                  {p.category?.name || "Power Cables"}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="mb-4 text-[32px] leading-[1.3] font-black text-[#1E3C8C] italic md:text-[56px]">
                {p.name || (
                  <>
                    Control and
                    <br />
                    instrumentation
                  </>
                )}
              </h1>

              {/* DESCRIPTION */}
              <p className="mb-8 max-w-[100%] text-[16px] leading-[27px] text-[#525252] md:text-[17px]">
                {p.description || "Multicore, multi-pair control and instrumentation constructions with screening, individual pair shielding, and specialised jacketing options for chemical, temperature or EM-noisy environments; available in high-core counts (up to 61 cores and above) and varied pair configurations per plant specs."}
              </p>

              {/* FEATURES */}
              <div className="mb-10 grid grid-cols-2 gap-y-8">
                {(p.specifications && p.specifications.length > 0 ? p.specifications : [
                  { label: "Voltage Rating", value: "Up to 11 kV" },
                  { label: "Conductor", value: "Annealed Copper" },
                  { label: "Insulation", value: "PVC / XLPE" },
                  { label: "Shielding", value: "Individual / Overall Screening Options" }
                ]).map((spec: any, idx: number) => (
                  <div key={idx} className="flex items-center items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                      <img src={`/assets/p-${(idx % 4) + 1}.svg`} alt="" className="w-8" />
                    </div>

                    <div>
                      <p className="text-[14px] leading-[1.4] font-[500] text-[#767676] md:mb-1">
                        {spec.label}
                      </p>
                      <span className="text-[14px] leading-[1.4] font-bold text-[#1E3C8C]">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* IDEAL FOR */}
              <div>
                {/* LABEL */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-[26px] w-[3px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

                  <h4 className="text-[14px] font-semibold text-[#3B3B3B]">
                    Ideal For
                  </h4>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3">
                  {(p.idealFor && p.idealFor.length > 0 ? p.idealFor : [
                    "Oil & gas",
                    "Petrochemicals",
                    "Power plants",
                    "Industrial automation systems",
                  ]).map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex h-[32px] items-center justify-center bg-white px-3 text-[12px] text-[#525252] md:h-[38px] md:px-4 md:text-[13px]"
                    >
                      {item}
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
          <div className="mb-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div>
              {/* TITLE */}
              <h2 className="mb-4 text-[32px] leading-[1.4] font-black text-[#1E3C8C] italic md:text-[46px]">
                Product Overview
              </h2>

              {/* DESCRIPTION */}
              <p className="mb-8 text-[18px] leading-[1.9] text-[#6F6F6F]">
                {p.overviewDescription || "Asian Cables Instrumentation cables are designed for accurate signal transmission in industrial control and monitoring systems. These cables feature high-quality copper conductors, advanced insulation materials and shielding options to minimize signal interference. Ideal for industries where precise data and signal transmission are critical for operational reliability."}
              </p>

              {/* BUTTON */}
              <button className="h-[56px] rounded-[4px] bg-[#1E3C8C] px-10 text-[16px] font-semibold text-white transition hover:bg-[#17357F]">
                Request Technical Consultation
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="overflow-hidden rounded-[8px] shadow-[0px_20px_60px_rgba(0,0,0,0.12)]">
                <img
                  src={p.overviewImage ? getImg(p.overviewImage) : "/assets/image99.png"}
                  alt="Product Overview"
                  className="h-[480px] w-full object-cover md:h-[520px]"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="rounded-[8px] bg-[#F0F0F0] px-10 py-6">
            <div className="flex flex-col items-center justify-between md:flex-row md:px-8">
              {(p.stats && p.stats.length > 0 ? p.stats : [
                { value: "3600 km", label: "annual cable manufacturing capacity" },
                { value: "6+", label: "Decades of Cable Manufacturing Expertise" },
                { value: "90+", label: "Presence in Countries" }
              ]).map((stat: any, idx: number, arr: any[]) => (
                <div key={idx} className="flex flex-col md:flex-row items-center w-full justify-between">
                  <div className="flex flex-col items-center mx-auto text-center md:text-left">
                    <h3 className="text-[26px] leading-[1.4] font-black text-[#1E3C8C] italic md:text-[34px]">
                      {stat.value}
                    </h3>
                    <p className="text-[14px] text-[#1E3C8C]">
                      {stat.label}
                    </p>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="my-4 h-[2px] w-[152px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)] md:my-0 md:h-[50px] md:w-[3px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductResources data={p} />

      <section className="reveal-section bg-[#f6f6f6] py-15">
        <div className="mx-auto max-w-[1320px] px-4">
          {/* HEADING */}
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-[32px] leading-none font-black text-[#1E3C8C] italic md:text-[46px]">
              Features & Standards
            </h2>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* LEFT BIG CARD */}
            <div className="relative min-h-[520px] overflow-hidden rounded-[6px] bg-white lg:col-span-7">
              <img
                src="/assets/Container-2.png"
                alt=""
                className="object-right-topss absolute top-0 right-0 h-full w-[55%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />

              <div className="relative z-10 p-7 md:p-10">
                <h3 className="mb-12 text-[20px] leading-none font-black text-[#1E3C8C] italic md:text-[36px]">
                  Key Features
                </h3>
                <div className="space-y-5 md:space-y-8">
                  {(p.features && p.features.length > 0 ? p.features : [
                    "Accurate signal transmission with minimal interference",
                    "Shielded construction options for noise reduction",
                    "Flexible and durable cable construction",
                    "Suitable for hazardous and industrial environments",
                    "Reliable performance for monitoring and control systems",
                  ]).map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 md:items-start"
                    >
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3C8C]">
                        <span className="text-[16px] text-white md:text-[14px]">
                          <CircleCheck size={25} />
                        </span>
                      </div>
                      <p className="text-[18px] leading-[1.7] text-[#525252]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 bottom-0 h-[220px] w-[220px] bg-[radial-gradient(circle,_rgba(255,210,18,0.35)_0%,_transparent_70%)]" />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-row gap-4 md:flex-col lg:col-span-5">
              <div className="relative h-[190px] w-[50%] overflow-hidden rounded-[6px] bg-[#12398F] md:h-[250px] md:w-[100%]">
                <img
                  src="/assets/footer.jpg"
                  alt=""
                  className="absolute top-0 right-0 h-full w-[100%] object-cover"
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-3 text-center md:px-8">
                  <div className="mb-6">
                    <Award
                      className="h-8 w-8 md:h-16 md:w-16"
                      color="#ffffff"
                    />
                  </div>
                  <h3 className="mb-8 text-[18px] leading-none font-black text-white italic md:text-[28px]">
                    ISO Certifications
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8">
                    {["ISO 9001", "ISO 14001", "ISO 45001"].map(
                      (item, index) => (
                        <span
                          key={index}
                          className="text-[12px] text-white md:text-[15px]"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="relative h-[190px] w-[50%] overflow-hidden rounded-[6px] bg-white p-6 md:h-[250px] md:w-[100%] md:p-10">
                <div className="absolute top-0 right-0 h-[180px] w-[180px] bg-[radial-gradient(circle,_rgba(60,170,223,0.18)_0%,_transparent_70%)]" />
                <img
                  src="/assets/Container-3.png"
                  alt=""
                  className="absolute top-0 right-0 h-full w-[100%] object-cover object-right-top"
                />
                <div className="relative z-10">
                  <h3 className="mb-10 text-[16px] leading-none font-black text-[#1E3C8C] italic md:text-[18px]">
                    Standards
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    {(p.standards && p.standards.length > 0 ? p.standards : ["IEC Standards", "BS Standards", "IS Standards"]).map(
                      (item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#1E3C8C]" />
                          <p className="text-[14px] leading-[1] text-[#5B5B5B] md:text-[15px]">
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

      <div className="proven-f w">
        <ProvenFieldSection dynamicData={p.projects} />
      </div>

      <Footer />
    </>
  );
};

export default Product;
