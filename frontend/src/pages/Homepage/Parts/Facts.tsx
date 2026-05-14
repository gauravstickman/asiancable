
export default function FactsSection() {
  return (
    <section className="bg-[#ffffff] py-20">
      <div className="max-w-[1320px] mx-auto px-4  py-4 shadow-[0px_4px_133.5px_0px_#9D9D9D40]">
        <div className="grid grid-cols-12 gap-4">
          
          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
            
            {/* TOP CARD */}
            <div className="bg-[#f9f9f9] border border-[#f9f9f9] p-5 rounded-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                
                {/* TEXT */}
                <div className="max-w-[500px]">
                  <h2 className="text-[22px] leading-none font-black italic text-[#21409A] mb-2">
                    Presence in 90+ Countries
                  </h2>

                  <p className="text-[14px] leading-[1.6] text-[#6f6f6f]">
                    The company exports cables worldwide, serving global
                    infrastructure projects across Asia, Africa, Europe,
                    the Middle East and Australia.
                  </p>
                </div>

                {/* FLAGS */}
                <div className="flex items-center flex-wrap gap-2 border-[0.5px] border-[#E1E2E5] rounded-[100px] p-1">
              <img
  src="/src/assets/Flags.svg"
  alt="Manufacturing"
  className="w-full h-full object-cover"
/>
                </div>
              </div>
            </div>

            {/* BOTTOM CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CARD 1 */}
              <div className="bg-[#f9f9f9] border border-[#f9f9f9] p-5  flex flex-col justify-between">
                
                <div>
                  <h3 className="text-[48px] font-bold italic leading-none mb-20 bg-gradient-to-r from-orange-500 via-red-500 to-cyan-400 text-transparent bg-clip-text">
                    6+ Decades
                  </h3>

                  <div>
                    <h4 className="text-[24px] leading-tight font-black italic text-[#21409A] mb-4">
                      Manufacturing Expertise
                    </h4>

                    <p className="text-[16px] leading-[1.6] text-[#6f6f6f]">
                      Asian Cables has been delivering advanced cable
                      solutions since its inception, with continuous
                      innovation in power and telecom cable technologies.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="bg-[#f9f9f9] border border-[#f9f9f9] p-5  flex flex-col justify-between">
                
                <div>
                  <h3 className="text-[48px] font-black italic leading-none mb-20 bg-gradient-to-r from-orange-500 via-red-500 to-cyan-400 text-transparent bg-clip-text">
                    Up To 220 KV
                  </h3>

                  <div>
                    <h4 className="text-[24px] leading-tight font-black italic text-[#21409A] mb-4">
                      Manufacturing Capability
                    </h4>

                    <p className="text-[16px] leading-[1.6] text-[#6f6f6f]">
                      High Voltage and Extra High Voltage cables up to
                      220 kV are manufactured at the advanced facility
                      in Vadodara.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="bg-[#f9f9f9] border border-[#f9f9f9] h-full">
              
              {/* IMAGE */}
              <div className="relative h-[450px] overflow-hidden">
               <img
  src="/src/assets/pdc.png"
  alt="Manufacturing"
  className="w-full h-full object-cover"
/>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                {/* BIG TEXT */}
                <div className="absolute top-8 left-8">
                  <h2 className="text-[64px] leading-none font-black italic text-white">
                    3600 Km
                  </h2>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 bottom-[10px] absolute">
                <h3 className="text-[24px] leading-[1.6] font-black italic text-[#21409A] mb-4">
                  Annual Cable manufacturing capacity
                </h3>

                <p className="text-[16px] leading-[1.6] text-[#3d3d3d]">
                  The infrastructure, the expertise, and the scale to
                  power industries across Asia and beyond.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}