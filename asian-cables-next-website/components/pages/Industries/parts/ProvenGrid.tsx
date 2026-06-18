import { Award } from "lucide-react";
import { getBaseUrl } from "../../../../utils/api";
import Link from "next/link";

export default function ProvenProjects({ dynamicData, sectionTitle, sectionSubtitle }: { dynamicData?: any[], sectionTitle?: string, sectionSubtitle?: string }) {
  const fallbackProjects = [
    {
      company: "ONGC",
      title: "Offshore Platform Electrification",
      description:
        "Complete cable solution for offshore drilling platform in the Arabian Sea.",
      image: "/assets/ip1.png",
      large: true,
      tags: ["High Efficiency", "High Load Capacity"],
    },
    {
      company: "ONGC",
      title: "Refinery Power Distribution",
      description:
        "High-voltage cables for refinery power distribution systems.",
      image: "/assets/ip2.jpg",
      tags: ["High Efficiency", "High Load Capacity"],
    },
  ];

  const dynamicItems = (dynamicData || []).map((p: any) => ({
    ...p,
    image: p.image?.startsWith("http") ? p.image : `${getBaseUrl()}${p.image}`
  }));

  const displayProjects = [
    ...dynamicItems,
    ...fallbackProjects.slice(dynamicItems.length)
  ].slice(0, 2);

  return (
    <section className="reveal-section pt-[275px]  bg-[#ffffff] md:pt-24 md:pb-10 ">
      <div className="mx-auto max-w-[1320px] mt-24 md:px-4 px-6 md:mt-[74px]">
        {/* HEADING */}
        <div className="mt-7 mb-10 text-center md:mt-0">
          <h2 className="mb-5 text-[32px] leading-none font-[700] text-[#1E3C8C] italic md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px]">
            {sectionTitle || "Proven In The Field"}
          </h2>

          <p className="text-[20px] text-[#738ABE] md:text-[18px] md:leading-[150%]">
            {sectionSubtitle || "Real projects. Demanding environments. Reliable outcomes."}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-12 md:gap-[23.67px] lg:grid-cols-12">
          {/* LARGE CARD */}
          <div className="lg:col-span-7">
            <div className="group relative h-[506px] md:h-[720px] overflow-hidden rounded-[4px] md:rounded-[8px]">
              {/* IMAGE */}
              <img
                src={displayProjects[0].image}
                alt={displayProjects[0].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-[48px]">
                {/* COMPANY */}
                <div className="mb-3">
                  <div className="inline-flex h-[40px] items-center gap-2 rounded-[4px]   bg-white/20 px-4">
                    <Award size={20} color="#ffffff" />

                    <span className="text-[14px] font-medium text-white">
                      {displayProjects[0].company}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mb-[10px] max-w-[90%] text-[16px] leading-[28px] leading-[-0.5px] font-black text-white italic md:text-[28px] md:leading-[50.4px]">
                  {displayProjects[0].title}
                </h3>

                {/* DESC */}
                <p className="mb-6 max-w-[85%] text-[14px] leading-[26px] leading-[-0.5px] text-white/85 md:text-[18px] md:leading-[36px]">
                  {displayProjects[0].description}
                </p>

                {/* TAGS */}
                <div className="flex items-center gap-3">
                  {(displayProjects[0].tags || []).map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="flex h-[32px] items-center justify-center rounded-[5px]  bg-white/39 px-4 text-[14px] text-white tracking-[-0.5px] md:h-[32px] md:bg-white/15 md:px-4 md:text-[16px] md:leading-[26px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* LINK COVER */}
              {displayProjects[0].link && (
                <Link href={displayProjects[0].link} className="absolute inset-0 z-20" aria-label={displayProjects[0].title}></Link>
              )}
            </div>
          </div>

          {/* SMALL CARD */}
          <div className="lg:col-span-5">
            <div className="group relative h-[506px] md:h-[720px] overflow-hidden rounded-[4px] md:rounded-[8px]">
              {/* IMAGE */}
              <img
                src={displayProjects[1].image}
                alt={displayProjects[1].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-[32px]">
                {/* COMPANY */}
                <div className="mb-3">
                  <div className="inline-flex h-[40px] items-center gap-2 rounded-[4px]   bg-white/20 px-4">
                    <Award size={20} color="#ffffff" />

                    <span className="text-[15px] font-[500] text-white">
                      {displayProjects[1].company}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mb-[10px] max-w-[90%] text-[16px] leading-[28px] leading-[-0.5px] font-black text-white italic md:text-[28px] md:leading-[50.4px]">
                  {displayProjects[1].title}
                </h3>

                {/* DESC */}
                <p className="mb-6 max-w-[85%] text-[14px] leading-[26px] leading-[-0.5px] text-white/85 md:text-[18px] md:leading-[36px]">
                  {displayProjects[1].description}
                </p>

                {/* TAGS */}
                <div className="flex items-center gap-3">
                  {(displayProjects[1].tags || []).map((tag: string, index: number) => (
                   <div
                      key={index}
                      className="flex h-[32px] items-center justify-center rounded-[5px]  bg-white/39 px-4 text-[14px] text-white tracking-[-0.5px] md:h-[32px] md:bg-white/15 md:px-4 md:text-[16px] md:leading-[26px]"
                    >
                      
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* LINK COVER */}
              {displayProjects[1].link && (
                <Link href={displayProjects[1].link} className="absolute inset-0 z-20" aria-label={displayProjects[1].title}></Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
