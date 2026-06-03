"use client";

import React from "react";
import { Eye, Target } from "lucide-react";

export default function CompanyValuesSection() {
  return (
    <section className="bg-[#F8F9FB] py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="mb-12">
          <h1 className="text-center text-[40px] font-bold text-[#1E3C8C] italic">
            Built on Precision. Driven by Purpose.
          </h1>
          <p className="text-center text-[16px] font-normal text-[#525252]">
            Engineering systems that power certainty across industries,
            infrastructure, and everyday life.
          </p>
        </div>
        {/* Top Row */}
        <div className="mb-4 grid grid-cols-12 gap-4">
          {/* Vision Card - Active */}
          <div className="col-span-12 md:col-span-8">
            <div className="h-full rounded-[8px] bg-[#1E3C8C] p-8 shadow-[0px_4px_16px_rgba(30,60,140,0.15)]">
              <div className="mb-2 flex items-center gap-8">
                <img src="/assets/about/eyeIcon.png" alt="Purpose Icon" />
                
              </div>
              <h2 className="block text-[34px] text-[#ffffff] italic transition-colors duration-300 group-hover:text-white">
                  Our Vision
                </h2>
              <p className="max-w-[600px] text-[16px] text-[#FFFFFF]">
                To reduce risk in irreversible system choices by engineering
                high-performance solutions that deliver quiet assurance and
                confident progress.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="col-span-12 md:col-span-4">
            <div className="group h-full rounded-[8px] border border-[#DDE3EF] bg-white p-8 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-[#1E3C8C]">
              <div className="mb-5 flex items-center gap-5">
                <img src="/assets/about/targetIcon.png" alt="Purpose Icon" />
                <h2 className="text-[34px] font-black text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                  Our Mission
                </h2>
              </div>

              <p className="text-[15px] leading-[28px] text-[#6B7280] transition-colors duration-300 group-hover:text-white/90">
                To be the force of certainty in every environment, empowering
                the systems that drive progress and the spaces that define human
                life.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-4">
          {/* Purpose Card */}
          <div className="col-span-12 md:col-span-6">
            <div className="group h-full rounded-[8px] border border-[#DDE3EF] bg-white p-8 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-[#1E3C8C]">
              <div className="mb-5 flex items-center gap-8">
                <img src="/assets/about/targetIcon.png" alt="Purpose Icon" />
                <h2 className="text-[34px] font-black text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                  Our Purpose
                </h2>
              </div>

              <p className="text-[15px] leading-[28px] text-[#6B7280] transition-colors duration-300 group-hover:text-white/90">
                To enable safer, smarter, and more reliable environments through
                engineering solutions that connect industries, infrastructure,
                and everyday life.
              </p>
            </div>
          </div>

          {/* Values Card */}
          <div className="col-span-12 md:col-span-6">
            <div className="group h-full rounded-[8px] border border-[#DDE3EF] bg-white p-8 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-[#1E3C8C]">
              <div className="mb-5 flex items-center gap-8">
                <img src="/assets/about/targetIcon.png" alt="Purpose Icon" />
                <h2 className="text-[34px] font-black text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                  Our Values
                </h2>
              </div>

              <p className="text-[15px] leading-[28px] text-[#6B7280] transition-colors duration-300 group-hover:text-white/90">
                To lead with integrity, build with precision, and foster
                partnerships grounded in trust, accountability, and long-term
                progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
