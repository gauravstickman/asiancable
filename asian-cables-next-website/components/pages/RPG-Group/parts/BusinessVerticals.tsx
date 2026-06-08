"use client";

export default function BusinessVerticals({ data }: { data?: any }) {
  const verticals = data?.verticalsCards?.length > 0 ? data.verticalsCards.map((v: any) => ({
    title: v.title,
    icon: v.image ? (v.image.startsWith('http') ? v.image : `${process.env.NEXT_PUBLIC_BASE_URL}${v.image}`) : "/assets/rpggroup/buildingIcon.png"
  })) : [
    {
      title: "Infrastructure & Engineering",
      icon: "/assets/rpggroup/buildingIcon.png",
    },
    {
      title: "Information Technology (IT Services)",
      icon: "/assets/rpggroup/translateIcon.png",
    },
    {
      title: "Energy & Industrial Solutions",
      icon: "/assets/rpggroup/boltpowerIcon.png",
    },
    {
      title: "Automotive (Tyres)",
      icon: "/assets/rpggroup/wheelIcon.png",
    },
    {
      title: "Pharmaceuticals & Life Sciences",
      icon: "/assets/rpggroup/pillIcons.png",
    },
    {
      title: "Plantations & Agri Business",
      icon: "/assets/rpggroup/cartlargeIcons.png",
    },
  ];

  return (
    <section className="md:bg-[#F8F8F8] md:py-15">
      <div className="mx-auto px-5 md:px-0 w-[100%] max-w-[1274px]">
        {/* HEADING */}
        <h2 className="font-magistral mb-3 md:mb-5 text-hero text-center text-[32px] md:text-[46px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          {data?.verticalsTitle || "Business Verticals"}
        </h2>
        {data?.verticalsDescription && (
          <p className="text-center text-[#525252] text-[16px] md:text-[18px] mb-10">
            {data.verticalsDescription}
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item: any, index: number) => (
            <div
              key={index}
              className="group cursor-pointer v-box relative flex h-[236px] md:h-[321px] md:w-[401px] flex-col items-center justify-center rounded-[4px] border-2 border-white bg-white p-[2px] px-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-7 flex h-[72px] w-[72px] items-start justify-center transition-all duration-300 group-hover:scale-105">
                <img
                  src={item.icon}
                  alt=""
                  className="h-[80px] w-[80px] object-contain"
                />
              </div>
              <p className="font-inter  text-center md:mt-13 text-[20px] font-medium tracking-[0px] text-[#1E3C8C]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
