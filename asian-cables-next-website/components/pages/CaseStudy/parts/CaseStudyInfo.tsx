"use client";
import { Building, Flame, MapPin, Calendar, Download } from "lucide-react";
import { CaseStudyData } from "../types";

interface CaseStudyInfoProps {
  data: CaseStudyData;
}

export default function CaseStudyInfo({ data }: CaseStudyInfoProps) {
  return (
    <section className="pt-[36px] md:pt-[60px] pb-[48px] md:pt-[60px] md:pb-[48px] bg-white">
      <div className="mx-auto max-w-[1280px] md:px-0 px-5 reveal-section">
        <div className="grid  grid-cols-1 gap-[40px] lg:grid-cols-[1fr_320px] lg:gap-[80px]">

          {/* LEFT CONTENT */}
          <div className="md:order-none order-2">
            {/* PROJECT OVERVIEW */}
            <div className="mb-[48px]">
                      <h2 className="flex relative mb-[27px]  md:mb-[36px]  pl-[12px] text-[28px] leading-[32px] tracking-[-0.92px] italic font-[700] text-[#1E3C8C] md:text-[36px] md:leading-[42px]">
                 <span
                                         className="absolute left-0 top-0 right-auto h-[38px] w-[3px]"
                                         style={{
                                           background:
                                             "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
                                         }}
                                       />  Project Overview
              </h2>

              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[34px] text-[#525252]">
               {data.overview}
              </p>
            </div>

            {/* CHALLENGE */}
            <div className="mb-[0px]">
                       <h2 className="flex relative mb-[27px]  md:mb-[36px]  pl-[12px] text-[28px] leading-[32px] tracking-[-0.92px] italic font-[700] text-[#1E3C8C] md:text-[36px] md:leading-[42px]">
                 <span
                                         className="absolute left-0 top-0 right-auto h-[38px] w-[3px]"
                                         style={{
                                           background:
                                             "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
                                         }}
                                       /> The Challenge
              </h2>

              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[34px] text-[#525252]">
              {data.challenge}
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="overflow-hidden rounded-[12px] bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.08)]">
              
              {/* HEADER */}
              <div className="bg-[#21409A] px-[30px] py-[30px]">
                <h3 className="text-center text-[28px] leading-[36px] md:text-[32px] md:leading-[42px] tracking-[-0.92px] italic font-[700] text-white">
                  Project Details
                </h3>
              </div>

              {/* BODY */}
              <div className="p-[30px]">
                <div className="space-y-[30px]">

                  <div className="flex gap-[10px] items-center">
                    <span className="w-[40px] h-[40px] bg-[#ECF1FF] rounded-[8px] flex items-center justify-center">
                        <Flame size={20} color="#525252"/>
                    </span>
                    <div className="">
                    <span className="block font-[400] text-[16px] text-[#525252]">
                      Industry
                    </span>
                    <p className="text-[16px] font-[600] text-[#454545]">
                      {data.industry}
                    </p>
                    </div>
                  </div>

                   <div className="flex gap-[10px] items-center">
                    <span className="w-[40px] h-[40px] bg-[#ECF1FF] rounded-[8px] flex items-center justify-center">
                        <Building size={20} color="#525252"/>
                    </span>
                    <div className="">
                    <span className="block font-[400] text-[16px] text-[#525252]">
                      Client
                    </span>
                    <p className="text-[16px] font-[600] text-[#454545]">
                      {data.client}
                    </p>
                    </div>
                  </div>

                   <div className="flex gap-[10px] items-center">
                    <span className="w-[40px] h-[40px] bg-[#ECF1FF] rounded-[8px] flex items-center justify-center">
                        <MapPin size={20} color="#525252"/>
                    </span>
                    <div className="">
                    <span className="block font-[400] text-[16px] text-[#525252]">
                      Location
                    </span>
                    <p className="text-[16px] font-[600] text-[#454545]">
                      {data.location}
                    </p>
                    </div>
                  </div>

               <div className="flex gap-[10px] items-center">
                    <span className="w-[40px] h-[40px] bg-[#ECF1FF] rounded-[8px] flex items-center justify-center">
                        <Calendar size={20} color="#525252"/>
                    </span>
                    <div className="">
                    <span className="block font-[400] text-[16px] text-[#525252]">
                      Year
                    </span>
                    <p className="text-[16px] font-[600] text-[#454545]">
                      {data.year}
                    </p>
                  </div>
                  </div>
                </div>

                <button className="border-it-w m-auto mt-[40px] h-[45px] px-5 flex gap-[10px] items-center  justify-center  rounded-[4px] bg-[#1E3C8C] text-[15px] leading-[22.5px] font-[500] text-white transition">
                  <Download size={20}/>   Download Case Study
                </button>
              </div>
            </div>
          </div>

        </div>

         {/* SOLUTION */}
            <div className="mb-[48px] mt-[48px]">
              <h2 className="flex relative mb-[27px]  md:mb-[36px]  pl-[12px] text-[28px] leading-[32px] tracking-[-0.92px] italic font-[700] text-[#1E3C8C] md:text-[36px] md:leading-[42px]">
                 <span
                                         className="absolute left-0 top-0 right-auto h-[38px] w-[3px]"
                                         style={{
                                           background:
                                             "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
                                         }}
                                       />   
                                        The Solution
              </h2>

              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[34px] text-[#525252]">
               {data.solution}
              </p>
            </div>

            {/* OUTCOME */}
            <div>
                        <h2 className="flex relative mb-[27px]  md:mb-[36px]  pl-[12px] text-[28px] leading-[32px] tracking-[-0.92px] italic font-[700] text-[#1E3C8C] md:text-[36px] md:leading-[42px]">
                 <span
                                         className="absolute left-0 top-0 right-auto h-[38px] w-[3px]"
                                         style={{
                                           background:
                                             "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
                                         }}
                                       /> The Outcome
              </h2>

              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[34px] text-[#525252]">
              {data.outcome}
              </p>
            </div>

      </div>
    </section>
  );
}