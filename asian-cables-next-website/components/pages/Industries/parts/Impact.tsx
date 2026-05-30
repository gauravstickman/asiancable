import { getBaseUrl } from "../../../../utils/api";

export default function AsianCablesImpact({ dynamicData, sectionTitle }: { dynamicData?: any[], sectionTitle?: string }) {
  const fallbackImpacts = [
    {
      icon: "/assets/impact2.svg",
      title: "Advanced Cable Engineering",
      description:
        "High-performance power and specialty cables using advanced insulation technologies and high-quality conductors.",
    },
    {
      icon: "/assets/impact1.svg",
      title: "Global Standards Compliance",
      description:
        "Internationally recognised standards including IEC, BS, AS/NZS and IS.",
    },
    {
      icon: "/assets/impact3.svg",
      title: "Technical & Customer Support",
      description:
        "Dedicated technical teams provide engineering consultation, product selection guidance and project-specific cable solutions. Responsive customer support and after-sales assistance.",
    },
  ];

  const dynamicItems = (dynamicData || []).map((p: any) => ({
    ...p,
    icon: p.icon?.startsWith("http") ? p.icon : `${getBaseUrl()}${p.icon}`
  }));

  const displayImpacts = [
    ...dynamicItems,
    ...fallbackImpacts.slice(dynamicItems.length)
  ].slice(0, 3);

  return (
    <section className="reveal-section bg-[#1E3C8C] py-12 md:py-24">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-[32px] leading-none font-black text-white italic md:text-[46px]">
            {sectionTitle || "Asian Cables Impact"}
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayImpacts.map((item, index) => (
            <div
              key={index}
              className="rounded-[10px] bg-[#F5F5F5] p-10 md:min-h-[420px] md:p-8"
            >
              {/* ICON */}
              <div className="mb-5">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-[48px] w-[48px] object-contain md:h-[61px] md:w-[61px]"
                />
              </div>

              {/* TITLE */}
              <h3 className="mb-4 text-[24px] leading-[1.6] font-black text-[#1E3C8C] italic md:text-[28px]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[16px] leading-[1.6] font-[500] text-[#1E3C8CCC] md:text-[18px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
