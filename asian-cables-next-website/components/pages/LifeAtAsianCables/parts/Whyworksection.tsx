import Image from "next/image";
import { FileText, Calculator, Download } from "lucide-react";

const WhyWorkSection = () => {
  return (
    <section className="bg-[#f7f7f7] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left Image */}
          <div>
            <Image
              src="/assets/Lifeofasiancables/whywork.png"
              alt="Why Work at Asian Cables"
              width={520}
              height={420}
              className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover rounded-lg"
            />
          </div>

          {/* Right Content */}
          <div className="max-w-full lg:max-w-[520px]">
            <h2
              className="text-[#21409A] text-[22px] md:text-[26px] font-bold italic leading-tight"
              style={{ fontFamily: "Magistral" }}
            >
              Why Work at Asian Cables
            </h2>

            <div className="w-[120px] h-[3px] bg-gradient-to-r from-[#F7931E] to-[#36A9E1] mt-4 mb-6 md:mb-8" />

            <p className="text-[#555555] text-[15px] md:text-[16px] leading-[30px] md:leading-[36px]">
              Founded in 1959, Asian Cables has been a pioneer in
              delivering quality wires and cables across India and
              abroad. We are part of RPG Group, a USD 5.2 billion
              global conglomerate. We empower every employee to
              unlock their potential and play a role in touching lives
              through our safe, energy-efficient products.
            </p>

            <p className="text-[#555555] text-[15px] md:text-[16px] leading-[30px] md:leading-[36px] mt-6 md:mt-8">
              When you join Asian Cables, you don't just build a
              career — you help power progress.
            </p>
          </div>
        </div>

        {/* Floating Action Bar */}
        {/*
        <div className="flex justify-center mt-8 lg:-mt-[16px] relative ">
          <div
            className="
              w-full
              max-w-[576px]
              min-h-[58px]
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              rounded-[4px]
              border
              border-white/40
              bg-white/65
              backdrop-blur-md
              shadow-[0px_20px_60px_0px_rgba(0,0,0,0.15)]
              px-[6px]
              py-2
            "
          >
            {/* Open Roles *}
            <button
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-[4px]
                bg-white
                text-[#21409A]
                text-sm
                font-medium
                transition-all
                hover:bg-[#21409A]
                hover:text-white
              "
            >
              <FileText size={16} />
              Open Roles
            </button>

            {/* Pricing Calculator *}
            <button
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-[4px]
                bg-white
                text-[#21409A]
                text-sm
                font-medium
                transition-all
                hover:bg-[#21409A]
                hover:text-white
              "
            >
              <Calculator size={16} />
              Pricing Calculator
            </button>

            {/* Downloads *}
            <button
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-[4px]
                bg-[#21409A]
                text-white
                text-sm
                font-medium
              "
            >
              <Download size={16} />
              Downloads
            </button>
          </div>
        </div>
        */}

      </div>
    </section>
  );
};

export default WhyWorkSection;