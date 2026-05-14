export default function ApplicationsSection() {
  return (
    <section className="bg-[#ffffff] py-20">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text-[#21409A] text-5xl md:text-6xl font-black italic mb-14">
          Applications
        </h2>

        {/* EXACT LAYOUT */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* LEFT BIG CARD */}
          <div className="col-span-12 lg:col-span-7 row-span-2">
            <div className="relative h-[650px] rounded-[10px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
                alt="Oil & Gas"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F63] via-[#0B1F63]/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-10 left-10 max-w-[520px] text-white">
                <span className="inline-block text-[11px] font-bold tracking-[2px] px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/20 mb-5">
                  PRIMARY USE
                </span>

                <h3 className="text-[52px] leading-none font-black italic mb-6">
                  Oil & Gas
                </h3>

                <p className="text-[22px] leading-[1.7] text-white/90">
                  Enabling uninterrupted operations across upstream,
                  midstream, and downstream facilities through cabling
                  solutions aligned to safety protocols, reliability
                  requirements, and asset integrity expectations.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            
            {/* TOP 2 SMALL CARDS */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* POWER PLANTS */}
              <div className="relative h-[315px] rounded-[10px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop"
                  alt="Power Plants"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-5 left-5">
                  <h3 className="text-white text-[22px] font-black italic leading-tight">
                    Power Plants
                  </h3>
                </div>
              </div>

              {/* UTILITIES */}
              <div className="relative h-[315px] rounded-[10px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                  alt="Utilities"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-5 left-5">
                  <h3 className="text-white text-[22px] font-black italic leading-tight">
                    Utilities
                  </h3>
                </div>
              </div>
            </div>

            {/* BOTTOM WIDE CARD */}
            <div className="relative h-[320px] rounded-[10px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1400&auto=format&fit=crop"
                alt="Industrial & Heavy Engineering"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-[34px] font-black italic leading-tight max-w-[500px]">
                  Industrial & Heavy Engineering
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}