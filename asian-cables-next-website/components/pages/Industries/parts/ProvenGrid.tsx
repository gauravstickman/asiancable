import { Award } from "lucide-react";
import { getBaseUrl } from "../../../../utils/api";

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
    <section className="reveal-section mt-24 bg-[#ffffff] pt-24 pb-10 md:py-24">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* HEADING */}
        <div className="mt-7 mb-10 text-center md:mt-0">
          <h2 className="mb-5 text-[32px] leading-none font-black text-[#1E3C8C] italic md:text-[46px]">
            {sectionTitle || "Proven In The Field"}
          </h2>

          <p className="text-[20px] text-[#738ABE] md:text-[18px]">
            {sectionSubtitle || "Real projects. Demanding environments. Reliable outcomes."}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-12 md:gap-4 lg:grid-cols-12">
          {/* LARGE CARD */}
          <div className="lg:col-span-7">
            <div className="group relative h-[620px] overflow-hidden rounded-[6px]">
              {/* IMAGE */}
              <img
                src={displayProjects[0].image}
                alt={displayProjects[0].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* COMPANY */}
                <div className="mb-4">
                  <div className="inline-flex h-[38px] items-center gap-2 rounded-[4px] border border-white/10 bg-white/20 px-4 backdrop-blur-md">
                    <Award size={20} color="#ffffff" />

                    <span className="text-[14px] font-medium text-white">
                      {displayProjects[0].company}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mb-3 max-w-[90%] text-[16px] leading-[1.7] font-black text-white italic md:text-[28px]">
                  {displayProjects[0].title}
                </h3>

                {/* DESC */}
                <p className="mb-4 max-w-[85%] text-[14px] leading-[1.8] text-white/85 md:text-[18px]">
                  {displayProjects[0].description}
                </p>

                {/* TAGS */}
                <div className="flex items-center gap-3">
                  {(displayProjects[0].tags || []).map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="flex h-[32px] items-center justify-center rounded-[4px] border border-white/10 bg-white/39 px-4 text-[12px] text-white backdrop-blur-md md:h-[42px] md:bg-white/15 md:px-5 md:text-[14px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARD */}
          <div className="lg:col-span-5">
            <div className="group relative h-[620px] overflow-hidden rounded-[6px]">
              {/* IMAGE */}
              <img
                src={displayProjects[1].image}
                alt={displayProjects[1].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* COMPANY */}
                <div className="mb-4">
                  <div className="inline-flex h-[38px] items-center gap-2 rounded-[4px] border border-white/10 bg-white/20 px-4 backdrop-blur-md">
                    <Award size={20} color="#ffffff" />

                    <span className="text-[14px] font-medium text-white">
                      {displayProjects[1].company}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mb-3 text-[16px] leading-[1.7] font-black text-white italic md:text-[28px]">
                  {displayProjects[1].title}
                </h3>

                {/* DESC */}
                <p className="text-[14 px] mb-5 leading-[1.8] text-white/85 md:text-[18px]">
                  {displayProjects[1].description}
                </p>

                {/* TAGS */}
                <div className="flex items-center gap-3">
                  {(displayProjects[1].tags || []).map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="flex h-[32px] items-center justify-center rounded-[4px] border border-white/10 bg-white/39 px-4 text-[12px] text-white backdrop-blur-md md:h-[42px] md:bg-white/15 md:px-5 md:text-[14px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
