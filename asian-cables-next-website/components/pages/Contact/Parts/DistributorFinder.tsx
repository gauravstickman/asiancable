"use client";

import {
  MapPin,
  Phone,
  Search,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const distributors = [
  {
    name: "Asian Cables Distributor - Andheri",
    address:
      "123 Link Road, Andheri West, Mumbai - 400053",
    phone: "+91 22 1234 5678",
  },
  {
    name: "Power Solutions Dealer",
    address:
      "456 MG Road, Vile Parle, Mumbai - 400056",
    phone: "+91 22 8765 4321",
  },
];

export default function DistributorFinder({ data }: { data?: any }) {
  const distributorsToUse = data?.distributorsList?.length > 0 ? data.distributorsList : distributors;

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const states = Array.from(new Set(distributorsToUse.map((d: any) => d.state).filter(Boolean))) as string[];
  const cities = selectedState 
    ? Array.from(new Set(distributorsToUse.filter((d: any) => d.state === selectedState).map((d: any) => d.city).filter(Boolean))) as string[]
    : Array.from(new Set(distributorsToUse.map((d: any) => d.city).filter(Boolean))) as string[];

  const filteredDistributors = distributorsToUse.filter((d: any) => {
    let match = true;
    if (selectedState && d.state !== selectedState) match = false;
    if (selectedCity && d.city !== selectedCity) match = false;
    return match;
  });

  return (
    <section className="bg-[#FFFFFF] pb-[40px] md:pb-[80px] md:pt-[80px]">
      <div className="mx-auto max-w-[1280px] px-5">
        {/* Heading */}
        <h2 className="font-[magistral] text-[32px] leading-[100%] md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px] italic font-bold text-[#1E3C8C]">
          {data?.distributorSectionTitle || "Find Distributors & Dealers"}
        </h2>

        <div className="mt-9 md:mt-15 grid gap-6 md:gap-[35px] lg:grid-cols-[1fr_413px]">
          {/* Left */}
          <div className="rounded-[4px] bg-[#1E3C8C0A] p-4 md:p-10">
            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_140px]">
              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Select State
                </label>

                <select 
                  className="appearance-none h-[53px] w-full rounded-[2px] border border-[#E5E5E5] bg-white px-4 outline-none"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity(""); // Reset city when state changes
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((state, idx) => (
                    <option key={idx} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Select City
                </label>

                <select 
                  className="appearance-none h-[53px] w-full rounded-[2px] border border-[#E5E5E5] bg-white px-5 outline-none"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button className="flex h-[50px] w-full items-center text-[14px] leading-[21px] justify-center gap-2 rounded-[2px] bg-[#1E3C8C] text-white">
                  <Search size={16} />
                  Search
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="mt-7 space-y-4">
              {filteredDistributors.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-[4px] border border-[#E5E5E5]">
                  <p className="text-[#767676]">No distributors found for the selected filters.</p>
                </div>
              ) : (
                filteredDistributors.map((item: any, index: number) => (
                  <div
                  key={index}
                  className="group rounded-[4px] bg-white p-6 transition-all hover:shadow-[0px_4px_24px_0px_#00000012]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[16px] md:text-[18px] leading-[27px] font-medium text-[#1E3C8C]">
                        {item.name}
                      </p>

                      <div className="mt-2 flex items-start gap-2">
                        <MapPin
                          className="md:h-4.5 md:w-4.5 mt-[2px] text-[#767676]"
                        />

                        <span className="text-[12px] md:text-[14px] leading-[21px] text-[#525252]">
                          {item.address}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Phone
                          size={16}
                          className="text-[#767676]"
                        />

                        <span className="text-[14px] leading-[21px] text-[#1E3C8C]">
                          {item.phone}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="text-[#E1E2E5] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              )))}
            </div>
          </div>

          {/* Right Card */}
          <div className="overflow-hidden rounded-[4px] bg-[#1E3C8C] p-5 md:p-10 text-white">
            <MapPin
              size={48}
              strokeWidth={1.8}
            />

            <h3 className="mt-[20px] font-[magistral] text-[32px] leading-[35.3px] font-bold italic" dangerouslySetInnerHTML={{ __html: (data?.networkTitle || "Nationwide <br/>Network").replace('\n', '<br/>') }} />

            <p className="mt-[12px] md:max-w-[293px] text-[15px] leading-[25.2px] text-white/85">
              {data?.networkDescription || "500+ distributors and dealers across all major cities in India"}
            </p>

            <div className="mt-30 flex gap-4">
              <div className="flex  min-w-[138px] flex-col justify-center rounded-[4px] border border-white/15 bg-white/10 p-4">
                <span className="font-[magistral] text-[28px] leading-[42px] font-bold italic">
                  {data?.networkStat1Number || "500+"}
                </span>
                <span className="text-[16px] leading-[16.5px] text-white/70">
                  {data?.networkStat1Label || "Dealers"}
                </span>
              </div>

              <div className="flex min-w-[138px] flex-col justify-center rounded-[4px] border border-white/15 bg-white/10 p-4">
                <span className="font-[magistral] text-[28px] leading-[42px] font-bold italic">
                  {data?.networkStat2Number || "28"}
                </span>
                <span className="text-[16px] leading-[16.5px] text-white/70">
                  {data?.networkStat2Label || "States"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}