export default function ApplicationsSection() {
  return (
    <section className="bg-[#ffffff] py-10 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4 ">
        {/* Heading */}
        <h2 className="text-center text-[#1E3C8C] text-[46px] font-black italic mb-14">
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

                <h3 className="text-[42px] leading-none font-black italic mb-6">
                  Oil & Gas
                </h3>

                <p className="text-[16px] leading-[1.7] text-white/90">
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
      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

    {/* CONTENT */}
    <div className="absolute inset-0 p-5 flex flex-col justify-end">

      {/* TITLE */}
      <h3 className="text-white text-[24px] font-black italic leading-tight mb-0 group-hover:mb-4 transition-all duration-500">
        Power Plants
      </h3>

      {/* DESCRIPTION */}
      <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[120px] group-hover:opacity-100 transition-all duration-500">
        
        <p className="text-white/90 text-[14px] leading-[1.7]">
          Reliable cable systems engineered for thermal,
          hydro and renewable power generation facilities.
        </p>
      </div>
    </div>
  </div>

  {/* UTILITIES */}
  <div className="relative h-[315px] rounded-[10px] overflow-hidden group">
    
    <img
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
      alt="Utilities"
      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

    {/* CONTENT */}
    <div className="absolute inset-0 p-5 flex flex-col justify-end">

      {/* TITLE */}
      <h3 className="text-white text-[24px] font-black italic leading-tight mb-0 group-hover:mb-4 transition-all duration-500">
        Utilities
      </h3>

      {/* DESCRIPTION */}
      <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[120px] group-hover:opacity-100 transition-all duration-500">
        
        <p className="text-white/90 text-[14px] leading-[1.7]">
          Efficient cabling solutions for utility distribution,
          substations and critical infrastructure systems.
        </p>
      </div>
    </div>
  </div>

</div>

            {/* BOTTOM WIDE CARD */}
            <div className="relative h-[320px] rounded-[10px] overflow-hidden group">
  
  <img
    src="https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1400&auto=format&fit=crop"
    alt="Industrial & Heavy Engineering"
    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

  {/* CONTENT */}
  <div className="absolute inset-0 p-6 flex flex-col justify-end">

    {/* TITLE */}
    <h3 className="text-white text-[28px] font-black italic leading-tight mb-0 group-hover:mb-4 transition-all duration-500 max-w-[500px]">
      Industrial & Heavy Engineering
    </h3>

    {/* DESCRIPTION */}
    <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[120px] group-hover:opacity-100 transition-all duration-500">
      
      <p className="text-white/90 text-[15px] leading-[1.8] max-w-[520px]">
        Advanced cable infrastructure supporting manufacturing,
        heavy equipment, automation and industrial operations.
      </p>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
}