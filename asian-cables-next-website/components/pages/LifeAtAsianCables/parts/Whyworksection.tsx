import Image from "next/image";

const WhyWorkSection = () => {
  return (
    <section className="bg-white py-[40px]">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="max-w-[1274px] lg:min-h-[596px] mx-auto flex flex-col lg:flex-row gap-[36px] lg:gap-[60px]">

          {/* Left Image */}
          <div className="w-full lg:w-[656px] flex-shrink-0">
            <Image
              src="/assets/Lifeofasiancables/whywork.png"
              alt="Why Work at Asian Cables"
              width={656}
              height={596}
              className="w-full h-[300px] sm:h-[420px] lg:h-[596px] object-cover rounded-[8.55px]"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[552px] flex flex-col justify-center gap-[36px]">

            {/* Heading */}
            <h2
              className="text-[#1E3C8C] text-[36px] leading-[42px] font-bold italic tracking-[-0.92px]"
              style={{ fontFamily: "Magistral" }}
            >
              Why Work at Asian Cables
            </h2>

            {/* Gradient Border Line */}
            <div
              className="w-[171px] border-t-[3px]"
              style={{
                borderImage:
                  "linear-gradient(270.03deg, #3CAADF 3.18%, #F04123 53.61%, #FFD212 104.05%) 1",
              }}
            />

            {/* Paragraph 1 */}
            <p
              className="text-[#555555] text-[20px] leading-[36px] font-normal"
              style={{ fontFamily: "Work Sans" }}
            >
              Founded in 1959, Asian Cables has been a pioneer in delivering
              quality wires and cables across India and abroad. We are part of
              RPG Group, a USD 5.2 billion global conglomerate. We empower
              every employee to unlock their potential and play a role in
              touching lives through our safe, energy-efficient products.
            </p>

            {/* Paragraph 2 */}
            <p
              className="text-[#555555] text-[20px] leading-[36px] font-normal"
              style={{ fontFamily: "Work Sans" }}
            >
              When you join Asian Cables, you don't just build a career — you
              help power progress.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkSection;