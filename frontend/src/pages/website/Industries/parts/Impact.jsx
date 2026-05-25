export default function AsianCablesImpact() {
  const impacts = [
    {
      icon: "/src/assets/impact2.svg",
      title: "Advanced Cable Engineering",
      description:
        "High-performance power and specialty cables using advanced insulation technologies and high-quality conductors.",
    },
    {
      icon: "/src/assets/impact1.svg",
      title: "Global Standards Compliance",
      description:
        "Internationally recognised standards including IEC, BS, AS/NZS and IS.",
    },
    {
      icon: "/src/assets/impact3.svg",
      title: "Technical & Customer Support",
      description:
        "Dedicated technical teams provide engineering consultation, product selection guidance and project-specific cable solutions. Responsive customer support and after-sales assistance.",
    },
  ];

  return (
    <section className="bg-[#1E3C8C] py-24 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-white text-[46px] leading-none font-black italic">
            Asian Cables Impact
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {impacts.map((item, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] rounded-[10px] p-8 min-h-[420px]"
            >

              {/* ICON */}
              <div className="mb-5">

                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[61px] h-[61px] object-contain"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-[#1E3C8C] text-[28px] leading-[1.6] font-black italic mb-4">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[#1E3C8CCC] text-[18px] leading-[1.6]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}