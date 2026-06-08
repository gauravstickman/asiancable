import Image from "next/image";

const WhyWorkSection = ({ data }: { data?: any }) => {
  const imageUrl = data?.whyWorkImage?.startsWith('http') 
    ? data.whyWorkImage 
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}${data?.whyWorkImage || '/assets/Lifeofasiancables/whywork.png'}`;

  return (
    <section className="bg-white mt-[10] md:mt-[40px] py-[40px]">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="max-w-[1274px] lg:min-h-[596px] mx-auto flex flex-col lg:flex-row gap-[36px] lg:gap-[60px]">

          {/* Left Image */}
          <div className="w-full lg:w-[656px] flex-shrink-0">
            <Image
              src={imageUrl}
              alt={data?.whyWorkTitle || "Why Work at Asian Cables"}
              width={656}
              height={596}
              className="w-full h-[300px] sm:h-[420px] lg:h-[596px] object-cover rounded-[8.55px]"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[552px] flex flex-col justify-center gap-[8px] md:gap-[16px]">

            {/* Heading */}
            <h2
                className="text-[#1E3C8C] text-[28px] md:text-[36px] leading-[42px] font-bold italic tracking-[-0.92px]"
            >
              {data?.whyWorkTitle || "Why Work at Asian Cables"}
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
              className="mt-[12px] text-[#525252] text-[16px] leading-[26px] md:text-[20px] md:leading-[36px] font-[400]"
            >
              {data?.whyWorkDescription1 || "Founded in 1959, Asian Cables has been a pioneer in delivering quality wires and cables across India and abroad. We are part of RPG Group, a USD 5.2 billion global conglomerate. We empower every employee to unlock their potential and play a role in touching lives through our safe, energy-efficient products."}
            </p>

            {/* Paragraph 2 */}
            <p
              className="text-[#555555] text-[16px] leading-[26px] md:text-[20px] md:leading-[36px] font-[400]"
            >
              {data?.whyWorkDescription2 || "When you join Asian Cables, you don't just build a career — you help power progress."}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkSection;
