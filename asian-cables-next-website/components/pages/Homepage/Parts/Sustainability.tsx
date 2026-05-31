import { ChevronRight, Leaf, ShieldCheck, Factory } from "lucide-react";
export default function SustainabilitySection() {
  return (
    <section className="reveal-section relative w-full overflow-hidden pb-12 md:pb-[109px] md:h-[auto] md:pb-[auto]">
      {/* BACKGROUND IMAGE */}
      <img
        src="/assets/sustainability-bg.jpg"
        alt="Sustainability"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto h-full max-w-[1280px] px-6 md:px-0">
        {/* TOP CONTENT */}
        <div className="pt-10 md:pt-[131px]">
          {/* HEADING */}
          <h2 className="mb-[33px] max-w-[645px] text-[32px] leading-[1.3] font-black tracking-[-3%] text-white italic md:text-[48px] md:leading-[57px]">
            We transform lives by building sustainable world-class
            infrastructure.
          </h2>

          {/* BUTTONS */}
          <div className="flex flex-col items-start gap-[29px] md:flex-row md:items-center">
            {/* PRIMARY BUTTON */}
            <button className="flex h-[48px] items-center gap-2 rounded-[5.52px] bg-white px-6 text-[18px] font-[500] text-[#1E3C8C] shadow-lg transition md:text-[20px] md:leading-[29.42px] md:tracking-[-0.46px]">
              Our Sustainability Practices
              <ChevronRight size={18} />
            </button>

            {/* SECONDARY LINK */}
            <button className="flex items-center gap-2 text-[18px] font-[500] text-white transition md:text-[20px] md:leading-[29.42px] md:tracking-[-0.46px]">
              View Certifications
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div className="right-6 bottom-20 left-6 mt-25  md:mt-[234.61px]">
          <div className="md:flex md:gap-[95px] grid grid-cols-1 gap-10">
            {/* ITEM */}
            <div className="flex items-center gap-[18px]  md:max-w-[276px]">
              {/* ICON */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <img src="/assets/sus1.png" className="text-white" />
              </div>

              {/* TEXT */}
              <div>
                <p className="mb-[4px] text-[20px] leading-[25px] font-[500] text-white md:text-[22px] md:leading-[28px] md:tracking-[-0.5px]">
                  Environment
                </p>

                <p className="max-w-[272px] text-[14px] leading-[20px] tracking-[-0.5px] text-white">
                  IGBC Platinum-certified green factory
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="flex items-center gap-[18px] md:max-w-[266px]">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
 <img src="/assets/sus2.png" className="text-white" />              </div>

              <div>
                <p className="mb-[4px] text-[20px] leading-[25px] font-[500] text-white md:text-[22px] md:leading-[28px] md:tracking-[-0.5px]">
                  Safety
                </p>

                <p className="max-w-[266px] text-[14px] leading-[20px] tracking-[-0.5px] text-white">
                  ISO 45001 occupational health & safety certified
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="flex items-center gap-[18px] md:max-w-[370px]">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
 <img src="/assets/sus3.png" className="text-white" />              
 </div>

              <div>
                <p className="mb-[4px] text-[20px] leading-[25px] font-[500] text-white md:text-[22px] md:leading-[28px] md:tracking-[-0.5px]">
                  Responsible Manufacturing
                </p>

                <p className="max-w-[337px] text-[14px] leading-[20px] tracking-[-0.5px] text-white">
                  Waste reduction through optimised production
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
