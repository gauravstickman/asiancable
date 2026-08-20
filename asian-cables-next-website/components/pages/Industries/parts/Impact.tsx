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
<section className="reveal-section bg-[url('/assets/rpggroup/hoverbg.jpg')] bg-cover py-12 md:py-24">
      <div className="mx-auto max-w-[1320px] md:px-4 px-5">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-[32px] leading-[55.2px] font-[700] text-white italic md:text-[46px] md:leading-[55.2px] tracking-[-0.92px]">
            {sectionTitle || "Asian Cables Impact"}
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:gap-6 gap-[36px] md:grid-cols-2 lg:grid-cols-3">
          {displayImpacts.map((item, index) => (
            <div
              key={index}
              className="impact-part rounded-[10px] bg-[#F5F5F5] p-10 min-h-[400px] md:min-h-[420px] md:p-[40px]"
            >
              {/* ICON */}
              <div className="mb-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-[48px] w-[48px] object-contain md:h-[61px] md:w-[61px]"
                />
              </div>

              {/* TITLE */}
              <h3 className="mb-[24px] md:mb-[10.2px] text-[24px] leading-[140%] font-black text-[#1E3C8C] italic md:text-[28px] md:leading-[42px]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[16px] leading-[27.2px] font-[500] text-[#1E3C8CCC] md:text-[18px] md:leading-[27.2px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
