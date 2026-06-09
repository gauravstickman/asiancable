"use client";

import {
  MapPin,
  Phone,
  Search,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

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

export default function DistributorFinder() {
  return (
    <section className="bg-[#FFFFFF] md:py-[80px]">
      <div className="mx-auto max-w-[1280px] px-5">
        {/* Heading */}
        <h2 className="font-[magistral] text-[32px] leading-[100%] md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px] italic font-bold text-[#1E3C8C]">
          Find Distributors & Dealers
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

                <select className="h-[53px] w-full rounded-[2px] border border-[#E5E5E5] bg-white px-4 outline-none">
                  <option>Select State</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Select City
                </label>

                <select className="h-[53px] w-full rounded-[2px] border border-[#E5E5E5] bg-white px-5 outline-none">
                  <option>Select City</option>
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
              {distributors.map((item, index) => (
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
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="overflow-hidden rounded-[4px] bg-[#1E3C8C] p-5 md:p-10 text-white">
            <MapPin
              size={48}
              strokeWidth={1.8}
            />

            <h3 className="mt-[20px] font-[magistral] text-[32px] leading-[35.3px] font-bold italic">
              Nationwide <br/>Network
            </h3>

            <p className="mt-[12px] md:max-w-[293px] text-[15px] leading-[25.2px] text-white/85">
              500+ distributors and dealers across all
              major cities in India
            </p>

            <div className="mt-30 flex gap-4">
              <div className="flex  min-w-[138px] flex-col justify-center rounded-[4px] border border-white/15 bg-white/10 p-4">
                <span className="font-[magistral] text-[28px] leading-[42px] font-bold italic">
                  500+
                </span>
                <span className="text-[16px] leading-[16.5px] text-white/70">
                  Dealers
                </span>
              </div>

              <div className="flex min-w-[138px] flex-col justify-center rounded-[4px] border border-white/15 bg-white/10 p-4">
                <span className="font-[magistral] text-[28px] leading-[42px] font-bold italic">
                  28
                </span>
                <span className="text-[16px] leading-[16.5px] text-white/70">
                  States
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}