"use client";

import { getBaseUrl } from "../../../../utils/api";

const defaultCards = [
  {
    title: "Consistent Quality & Accredited Testing",
    icon: "/assets/about/awardIcon.png",
  },
  {
    title: "Proven Track Record in Critical Projects",
    icon: "/assets/about/mapIcon.png",
  },
  {
    title: "Custom Engineering & Application Specific Solutions",
    icon: "/assets/about/mapIcon.png",
  },
  {
    title: "Wide, End-to-End Product Portfolio",
    icon: "/assets/about/trendingIcon.png",
  },
];

const defaultGovernanceContent = [
  {
    icon: "/assets/about/teamsIcon.png",
    alt: "RPG Group",
    title: ["RPG Governance &", "Institutional Credibility"],
    description:
      "Asian Cables operates under the governance framework of the RPG Group, one of India's most respected business groups, known for its professional management, ethical standards, and long-term value creation. This ensures transparency, accountability, and institutional reliability across operations and partnerships.",
  },
];

function FeatureCard({
  title,
  title1,
  icon,
  tall = false,
}: {
  title: string;
  icon: string;
  title1?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`group flex w-full rounded-[3.9px] bg-[#F9F9F9]  h-[157px] md:h-[238.5px] md:p-[40px] p-5  hover:bg-[url('/assets/rpggroup/hoverbg.jpg')]
    bg-cover
    bg-center
    transition-all duration-500 ${tall ? "h-[157px]" : "h-[238.5px]"}`}
    >
      <div className="flex w-full md:p-0 p-5 flex-row items-center justify-center gap-6">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="resource-img  h-[46.82432556152344px] w-[46.82432556152344px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <h4 className="font-[magistral] text-[20px] md:text-[24px] leading-[29.27px] font-bold text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
          {title}
          {title1 && (
            <>
              <br />
              <span>{title1}</span>
            </>
          )}
        </h4>
      </div>
    </div>
  );
}

export default function GovernanceSection({ dynamicData }: { dynamicData?: any }) {
  const getImage = (imageStr: string, defaultImg: string) => {
    if (!imageStr) return defaultImg;
    if (imageStr.startsWith('http')) return imageStr;
    return `${getBaseUrl()}${imageStr.startsWith('/') ? '' : '/'}${imageStr}`;
  };

  const titleText = dynamicData?.governanceTitle || "Shaped by Governance. Built on Quality.\nProven across Critical Applications.";
  const mainCards = dynamicData?.governanceCards?.length > 0 ? dynamicData.governanceCards : defaultCards;

  const primaryContent = dynamicData?.governancePrimaryTitle ? [
    {
      icon: getImage(dynamicData.governancePrimaryIcon, "/assets/about/teamsIcon.png"),
      alt: "Governance Primary",
      title: dynamicData.governancePrimaryTitle.split('\n'),
      description: dynamicData.governancePrimaryDescription,
    }
  ] : defaultGovernanceContent;

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-20">
      <img
        src="/assets/about/foudationIcon.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-[min(720px,55vw)] object-contain object-right-bottom"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5">
        <div className="text-center">
        <h2 className="mb-8 md:mb-14 text-center font-[magistral] text-[32px] leading-[100%] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block italic" dangerouslySetInnerHTML={{ __html: titleText.replace(/\n/g, '<br />') }} />
</div>
        <div className="grid grid-cols-12 gap-4 bg-[#FFFFFF] md:p-4">
          {/* Left Blue Card */}
          {primaryContent.map((item, index) => (
            <div
              key={index}
              className="group col-span-12 lg:col-span-6 lg:row-span-2"
            >
              <div className="flex md:h-[494px] flex-col rounded-[4px] bg-[#F9F9F9]  hover:bg-[url('/assets/rpggroup/hoverbg.jpg')]
    bg-cover
    bg-center
    transition-all duration-500 p-5 md:p-10">
                <div className="mb-8">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="resource-img  h-12 w-auto object-contain"
                  />
                </div>

                <h3 className="mb-6 font-[magistral] text-[24px] leading-[160%] md:text-[46px] md:leading-[52px] font-bold text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                  {item.title.map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>

                <p className="text-[16px] leading-[31.60px] md:text-[17px] md:leading-[32px]  transition-all duration-300 text-[#525252] group-hover:text-[#ffffff]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Top Right Card */}
          {mainCards[0] && (
            <div className="col-span-12 lg:col-span-6">
              <FeatureCard title={mainCards[0].title} icon={getImage(mainCards[0].icon, "/assets/about/awardIcon.png")} tall />
            </div>
          )}

          {/* Middle Right Card */}
          {mainCards[1] && (
            <div className="col-span-12 lg:col-span-6">
              <FeatureCard title={mainCards[1].title} icon={getImage(mainCards[1].icon, "/assets/about/mapIcon.png")} tall />
            </div>
          )}

          {/* Bottom Left */}
          {mainCards[2] && (
            <div className="col-span-12 lg:col-span-6">
              <FeatureCard title={mainCards[2].title} icon={getImage(mainCards[2].icon, "/assets/about/mapIcon.png")} />
            </div>
          )}

          {/* Bottom Right */}
          {mainCards[3] && (
            <div className="col-span-12 lg:col-span-6">
              <FeatureCard title={mainCards[3].title} icon={getImage(mainCards[3].icon, "/assets/about/trendingIcon.png")} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
