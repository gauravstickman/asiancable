import {
  ChevronRight,
  Leaf,
  ShieldCheck,
  Factory,
} from "lucide-react";

export default function SustainabilitySection() {
  return (
    <section className="relative w-full h-[900px] overflow-hidden reveal-section">
      
      {/* BACKGROUND IMAGE */}
      <img
        src="/src/assets/sustainability-bg.jpg"
        alt="Sustainability"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-6">

        {/* TOP CONTENT */}
        <div className="pt-36">
          
          {/* HEADING */}
          <h2 className="max-w-[645px] text-white text-[48px] leading-[1.3] font-black italic tracking-[-3%] mb-12">
            We transform lives by building sustainable world-class infrastructure.
          </h2>

          {/* BUTTONS */}
          <div className="flex items-center gap-10">
            
            {/* PRIMARY BUTTON */}
            <button className="h-[48px] px-6 rounded-[6px] bg-white text-[#1E3C8C] text-[20px] font-semibold flex items-center gap-4 shadow-lg hover:scale-[1.02] transition">
              Our Sustainability Practices
              <ChevronRight size={18} />
            </button>

            {/* SECONDARY LINK */}
            <button className="text-white text-[20px] font-medium flex items-center gap-4 hover:opacity-80 transition">
              View Certifications
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div className="absolute bottom-20 left-6 right-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* ITEM */}
            <div className="flex items-start gap-4">
              
              {/* ICON */}
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Leaf size={24} className="text-white" />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-white text-[22px] leading-none font-medium mb-3">
                  Environment
                </h3>

                <p className="text-white/90 text-[14px] leading-[1.4] max-w-[320px]">
                  IGBC Platinum-certified green factory
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="flex items-start gap-4">
              
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <ShieldCheck size={24} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-[22px] leading-none font-medium mb-3">
                  Safety
                </h3>

                <p className="text-white/90 text-[14px] leading-[1.4] max-w-[320px]">
                  ISO 45001 occupational health & safety certified
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="flex items-start gap-4">
              
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Factory size={24} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-[22px] leading-none font-medium mb-3">
                  Responsible Manufacturing
                </h3>

                <p className="text-white/90 text-[14px] leading-[1.4] max-w-[420px]">
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