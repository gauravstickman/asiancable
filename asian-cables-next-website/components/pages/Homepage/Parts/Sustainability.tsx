import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface SustainabilitySectionProps {
  dynamicData?: {
    bgImage?: string;
    heading?: string;
    primaryBtnText?: string;
    primaryBtnLink?: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
    features?: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export default function SustainabilitySection({ dynamicData }: SustainabilitySectionProps) {
  const bgImage = dynamicData?.bgImage || "";
  const heading = dynamicData?.heading || "";
  const primaryBtnText = dynamicData?.primaryBtnText || "";
  const primaryBtnLink = dynamicData?.primaryBtnLink || "#";
  const secondaryBtnText = dynamicData?.secondaryBtnText || "";
  const secondaryBtnLink = dynamicData?.secondaryBtnLink || "#";

  const defaultFeatures = [
    {
      title: "Environment",
      description: "IGBC Platinum-certified green factory",
      icon: "/assets/sus1.png"
    },
    {
      title: "Safety",
      description: "ISO 45001 occupational health & safety certified",
      icon: "/assets/sus2.png"
    },
    {
      title: "Responsible Manufacturing",
      description: "Waste reduction through optimised production",
      icon: "/assets/sus3.png"
    }
  ];

  const features = dynamicData?.features && dynamicData.features.length > 0
    ? dynamicData.features
    : defaultFeatures;

  return (
    <section className="reveal-section relative w-full overflow-hidden pb-12 md:pb-[109px] md:h-[auto] md:pb-[auto]">
      {/* BACKGROUND IMAGE */}
      <img
        src={bgImage}
        alt="Sustainability"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="hidden md:block absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto h-full max-w-[1280px] px-5 md:px-6 md:px-0">
        {/* TOP CONTENT */}
        <div className="pt-10 md:pt-[131px]">
          {/* HEADING */}
          <h2 className="mb-[33px] max-w-[645px] text-[32px] leading-[47px] font-black tracking-[-3%] text-white italic md:text-[48px] md:leading-[57px]">
            {heading}
          </h2>

          {/* BUTTONS */}
          <div className="flex flex-col items-start gap-[29px] md:flex-row md:items-center">
            {/* PRIMARY BUTTON */}
            <Link href={primaryBtnLink}>
              <button className="cursor-pointer flex h-[48px] items-center gap-2 rounded-[5.52px] bg-white px-6 text-[18px] font-[500] text-[#1E3C8C] shadow-lg transition md:text-[20px] leading-[29.42px] tracking-[-0.46px]">
                {primaryBtnText}
                <ChevronRight size={18} />
              </button>
            </Link>

            {/* SECONDARY LINK */}
            {/* <Link href={secondaryBtnLink}>
              <button className="flex items-center gap-2 text-[18px] font-[500] text-white transition md:text-[20px] leading-[29.42px] tracking-[-0.46px]">
                {secondaryBtnText}
                <ChevronRight size={18} />
              </button>
            </Link> */}
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div className="right-6 bottom-20 left-6 mt-[124px]  md:mt-[234.61px]">
          <div className="md:flex md:gap-[95px] grid grid-cols-1 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-[18px] md:max-w-[370px]">
                {/* ICON */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <img src={feature.icon} className="text-white" alt={feature.title} />
                </div>

                {/* TEXT */}
                <div>
                  <p className="mb-[4px] text-[20px] leading-[25px] font-[500] text-white md:text-[22px] md:leading-[28px] md:tracking-[-0.5px]">
                    {feature.title}
                  </p>

                  <p className="max-w-[337px] text-[14px] leading-[20px] tracking-[-0.5px] text-white">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
