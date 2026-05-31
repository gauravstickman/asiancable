import { ChevronRight, Leaf, ShieldCheck, Factory } from "lucide-react";

export default function SustainabilitySection() {
  return (
    <section className="reveal-section relative w-full overflow-hidden pb-12 md:h-[900px] md:pb-[auto]">
      {/* BACKGROUND IMAGE */}
      <img
        src="/assets/sustainability-bg.jpg"
        alt="Sustainability"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto h-full max-w-[1200px] px-6">
        {/* TOP CONTENT */}
        <div className="pt-10 md:pt-36">
          {/* HEADING */}
          <h2 className="mb-12 max-w-[645px] text-[32px] leading-[1.3] font-black tracking-[-3%] text-white italic md:text-[48px]">
            We transform lives by building sustainable world-class
            infrastructure.
          </h2>

          {/* BUTTONS */}
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
            {/* PRIMARY BUTTON */}
            <button className="flex h-[48px] items-center gap-4 rounded-[6px] bg-white px-6 text-[18px] font-semibold text-[#1E3C8C] shadow-lg transition hover:scale-[1.02] md:text-[20px]">
              Our Sustainability Practices
              <ChevronRight size={18} />
            </button>

            {/* SECONDARY LINK */}
            <button className="flex items-center gap-4 text-[20px] font-medium text-white transition hover:opacity-80">
              View Certifications
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div className="right-6 bottom-20 left-6 mt-25 md:absolute md:mt-0">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* ITEM */}
            <div className="flex items-start gap-4">
              {/* ICON */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Leaf size={24} className="text-white" />
              </div>

              {/* TEXT */}
              <div>
                <p className="mb-3 text-[20px] leading-none font-[500] text-white md:text-[22px]">
                  Environment
                </p>

                <p className="max-w-[320px] text-[14px] leading-[1.4] text-white/90">
                  IGBC Platinum-certified green factory
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <ShieldCheck size={24} className="text-white" />
              </div>

              <div>
                <p className="mb-3 text-[20px] leading-none font-[500] text-white md:text-[22px]">
                  Safety
                </p>

                <p className="max-w-[320px] text-[14px] leading-[1.4] text-white/90">
                  ISO 45001 occupational health & safety certified
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Factory size={24} className="text-white" />
              </div>

              <div>
                <p className="mb-3 text-[20px] leading-none font-[500] text-white md:text-[22px]">
                  Responsible Manufacturing
                </p>

                <p className="max-w-[420px] text-[14px] leading-[1.4] text-white/90">
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
