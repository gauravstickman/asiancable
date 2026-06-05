"use client";
import { Building, Flame, MapPin, Calendar, Download } from "lucide-react";

export default function CaseStudyInfo() {
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
                When Tecnimont required a large-scale supply of fibre optic
                cables for ADNOC facilities, the requirements were
                uncompromising — steel wire armoured design, fire survival
                capability, and drum lengths long enough to minimise
                installation joints across demanding oil and gas environments.
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
                The project required Asian Cables to develop a specialised
                steel wire armoured fibre optic cable with both fire survival
                and flame retardant properties — a combination rarely supplied
                at this volume. Additional complexity came from the need for 3
                km single drum lengths, which required precise manufacturing
                control, along with embossed cable identification for full field
                traceability.
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
                      Oil & Gas
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
                      ADNOC
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
                      UAE / Italy
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
                      2025
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
                Asian Cables engineered a steel wire armoured fibre optic cable
                with fire survival and flame retardant properties,
                manufactured at the Mysore facility. A 3 km single drum length
                was achieved, significantly reducing the number of field joints
                required during installation.
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
                A total of 1,072 km of steel wire armoured fibre optic cables
                were delivered within the committed project schedule. The
                client acknowledged timely delivery and compliance with
                project-specific quality requirements.
              </p>
            </div>

      </div>
    </section>
  );
}