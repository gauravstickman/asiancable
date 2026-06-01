interface FactsData {
  presence?: { title: string; description: string; image?: string };
  decades?: { title: string; subtitle: string; description: string };
  capacity?: { title: string; subtitle: string; description: string };
  annual?: { value: string; title: string; description: string; image?: string };
}

interface FactsProps {
  dynamicData?: FactsData;
}

export default function FactsSection({ dynamicData }: FactsProps) {
  return (
    <section className="reveal-section bg-[#ffffff] px-[20px] pb-10 md:px-0 md:pb-[100px]">
      <div className="mx-auto max-w-[1272px] px-[10px] py-[10px] md:px-2 md:py-3 shadow-[0px_4px_133.5px_0px_#9D9D9D40]">
        <div className="md:flex grid grid-cols-12 gap-3">
          {/* LEFT SIDE */}
          <div className="col-span-12 flex flex-col gap-6 md:gap-3 lg:col-span-8 md:max-w-[862px]">
            {/* TOP CARD */}
            <div className="group rounded-sm border border-[#f9f9f9] bg-[#f9f9f9] p-5 transition-all duration-300 hover:bg-[#1E3C8C]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* TEXT */}
                <div className="max-w-[508px]">
                  <h2 className="mb-2 text-[20px]  font-[700] text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white md:text-[22px] leading-[160%]">
                    {dynamicData?.presence?.title || "Presence in 90+ Countries"}
                  </h2>

                  <p className="text-[16px] leading-[150%] text-[#767676] transition-colors duration-300 group-hover:text-white/80 md:text-[14px]">
                    {dynamicData?.presence?.description || "The company exports cables worldwide, serving global infrastructure projects across Asia, Africa, Europe, the Middle East and Australia."}
                  </p>
                </div>

                {/* FLAGS */}
                <div className="flex w-[90%] flex-wrap items-center gap-2 rounded-[100px] border-[0.5px] border-[#E1E2E5] p-1 md:max-w-[278px]">
                  <img
                    src={dynamicData?.presence?.image || "/assets/Flags.svg"}
                    alt="Manufacturing"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM CARDS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3 pb-5 md:pb-0">
              {/* CARD 1 */}
              <div className="group flex flex-col justify-between border border-[#f9f9f9] bg-[#f9f9f9] p-5 transition-all duration-300 hover:bg-[#1E3C8C]">
                <div>
                  <h3 className="mb-8 bg-[linear-gradient(270.11deg,_#3CAADF_60.24%,_#F04123_82.12%,_#FFD212_104%)] bg-clip-text text-[32px] leading-none font-black text-transparent italic transition-all duration-300 group-hover:bg-none group-hover:text-white md:mb-20 md:text-[48px]">
                    {dynamicData?.decades?.title ? dynamicData.decades.title : "6+ Decades"}
                  </h3>

                  <div>
                    <h4 className="mb-4 text-[20px] leading-[160%] font-[700] text-[#1E3C8C] italic group-hover:text-white md:text-[24px]">
                      {dynamicData?.decades?.subtitle || "Manufacturing Expertise"}
                    </h4>

                    <p className="text-[16px] leading-[150%] text-[#767676] group-hover:text-white/80">
                      {dynamicData?.decades?.description || "Asian Cables has been delivering advanced cable solutions since its inception, with continuous innovation in power and telecom cable technologies."}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="group flex flex-col justify-between border border-[#f9f9f9] bg-[#f9f9f9] p-5 transition-all duration-300 hover:bg-[#1E3C8C]">
                <div>
                  <h3 className="mb-8 bg-[linear-gradient(270.11deg,_#3CAADF_60.24%,_#F04123_82.12%,_#FFD212_104%)] bg-clip-text text-[32px] leading-none font-black text-transparent italic transition-all duration-300 group-hover:bg-none group-hover:text-white md:mb-20 md:text-[48px]">
                    {dynamicData?.capacity?.title ? dynamicData.capacity.title : "Up To 220 KV"}
                  </h3>

                  <div>
                    <h4 className="mb-4 text-[20px] leading-[160%] font-[700] text-[#1E3C8C] italic group-hover:text-white md:text-[24px]">
                      {dynamicData?.capacity?.subtitle || "Manufacturing Capability"}
                    </h4>

                    <p className="text-[16px] leading-[150%] text-[#767676] group-hover:text-white/80">
                      {dynamicData?.capacity?.description || "High Voltage and Extra High Voltage cables up to 220 kV are manufactured at the advanced facility in Vadodara."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative col-span-12 hidden md:block lg:col-span-4">
            <div className="h-full border border-[#f9f9f9] bg-[#ffffff]">
              {/* IMAGE */}
              <div className="relative h-[450px] overflow-hidden">
                <img
                  src={dynamicData?.annual?.image || "/assets/pdc.png"}
                  alt="Manufacturing"
                  className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                {/* BIG TEXT */}
                <div className="absolute top-8 left-8">
                  <h2 className="text-[48px] leading-none font-black text-white italic md:text-[64px]">
                    {dynamicData?.annual?.value || "3600 Km"}
                  </h2>
                </div>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-[10px] p-8">
                <h3 className="mb-4 text-[20px] leading-[160%] font-[700] text-[#1E3C8C] italic md:text-[24px]">
                  {dynamicData?.annual?.title || "Annual Cable manufacturing capacity"}
                </h3>

                <p className="text-[16px] leading-[150%] text-[#383838]">
                  {dynamicData?.annual?.description || "The infrastructure, the expertise, and the scale to power industries across Asia and beyond."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile only  */}

      <div className="mx-auto max-w-[1320px] shadow-[0px_4px_133.5px_0px_#9D9D9D40] md:hidden">
        <div className="grid grid-cols-12 gap-4">
          {/* RIGHT SIDE */}
          <div className="relative col-span-12 lg:col-span-4">
            <div className="h-full border border-[#f9f9f9] bg-[#f9f9f9]">
              {/* IMAGE */}
              <div className="relative h-[auto] overflow-hidden">
                <img
                  src={dynamicData?.annual?.image || "/assets/pdc.png"}
                  alt="Manufacturing"
                  className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                {/* BIG TEXT */}
                <div className="absolute top-8 left-8">
                  <h2 className="text-[48px] leading-none font-black text-white italic md:text-[64px]">
                    {dynamicData?.annual?.value || "3600 Km"}
                  </h2>
                </div>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-[10px] p-4 pb-0">
                <h3 className="mb-4 text-[20px] leading-[160%] font-[700] text-[#1E3C8C] italic md:text-[24px]">
                  {dynamicData?.annual?.title || "Annual Cable manufacturing capacity"}
                </h3>

                <p className="text-[16px] leading-[150%] text-[#383838]">
                  {dynamicData?.annual?.description || "The infrastructure, the expertise, and the scale to power industries across Asia and beyond."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
