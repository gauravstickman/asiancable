"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getBaseUrl } from "../../../../utils/api";

const defaultLeaders = [
  {
    name: "Cameron Williamson",
    role: "Senior Sustainability Consultant",
    image: "/assets/about/personIcon.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Courtney Henry",
    role: "Energy Analysts",
    image: "/assets/about/personIcon1.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Dianne Russell",
    role: "Senior Renewable Energy Engineer",
    image: "/assets/about/personIcon2.png",
    linkedin: "https://linkedin.com",
  },
];

export default function LeadershipTeam({ dynamicData }: { dynamicData?: any }) {
  const getImage = (imageStr: string, defaultImg: string) => {
    if (!imageStr) return defaultImg;
    if (imageStr.startsWith('http')) return imageStr;
    return `${getBaseUrl()}${imageStr.startsWith('/') ? '' : '/'}${imageStr}`;
  };

  const title = dynamicData?.leadershipTitle || "Leadership Team";
  const subtitle = dynamicData?.leadershipSubtitle || "Meet the visionaries driving Asian Cables forward";
  const buttonLabel = dynamicData?.leadershipButtonLabel || "View Leadership";
  const buttonUrl = dynamicData?.leadershipButtonUrl || "#";

  const leaders = dynamicData?.leadershipMembers?.length > 0 
    ? dynamicData.leadershipMembers.map((m: any) => ({
        name: m.name,
        role: m.designation,
        image: getImage(m.image, "/assets/about/personIcon.png"),
        linkedin: m.linkedin
      }))
    : defaultLeaders;

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-[1400px] md:px-6 px-5">
        {/* Header */}
        <div className="mb-10 md:px-5 flex md:flex-row flex-col md:items-center md:justify-between">
          <div>
            <h2 className="font-[magistral]  text-[32px] leading-[100%] md:text-[46px] md:leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]" dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
            <p className="mt-4 font-[work_sans] text-[16px] leading-[150%] md:text-[17px] md:leading-[25.5px] font-normal text-[#525252]" dangerouslySetInnerHTML={{ __html: subtitle.replace(/\n/g, '<br />') }} />
          </div>
          <div>
            <Link href={buttonUrl} className="border-it-b cursor-pointer md:mx-auto flex items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] px-5 py-2 text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-[59px] md:mb-[37.61px] md:mt-0 mt-5 w-fit">
              {buttonLabel}
              <span>
                <ChevronRight size={18} />
              </span>
            </Link>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="animate-marquee hover:[animation-play-state:paused] flex w-max gap-[33px]">
            {/* First Set */}
            {leaders.map((leader: any, index: number) => (
              <div key={index} className="md:max-w-[260px] min-w-[260px]">
                {/* Image */}
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[371px] md:w-[314px] w-[80vw] rounded-[4px] full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex w-full flex-row items-start justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      {leader.name}
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  {leader.linkedin ? (
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                      <img
                        src="/assets/about/linkdinIcon.png"
                        alt="LinkedIn"
                        className="h-6 w-6 object-contain cursor-pointer"
                      />
                    </a>
                  ) : (
                    <img
                      src="/assets/about/linkdinIcon.png"
                      alt="LinkedIn"
                      className="h-6 w-6 object-contain cursor-pointer opacity-50"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Duplicate */}
            {leaders.map((leader: any, index: number) => (
              <div key={`dup-${index}`} className="max-w-[260px] min-w-[260px]">
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[371px] w-[314px] rounded-[4px] full object-cover"
                  />
                </div>

                <div className="flex w-full flex-row items-start justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      {leader.name}
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  {leader.linkedin ? (
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                      <img
                        src="/assets/about/linkdinIcon.png"
                        alt="LinkedIn"
                        className="h-6 w-6 object-contain cursor-pointer"
                      />
                    </a>
                  ) : (
                    <img
                      src="/assets/about/linkdinIcon.png"
                      alt="LinkedIn"
                      className="h-6 w-6 object-contain cursor-pointer opacity-50"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
