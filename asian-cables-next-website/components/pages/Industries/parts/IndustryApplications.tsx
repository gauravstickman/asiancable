import { getBaseUrl } from "../../../../utils/api";

export default function IndustryApplications({ dynamicData, sectionTitle }: { dynamicData?: any[], sectionTitle?: string }) {
  const fallbackApplications = [
    {
      title: "Offshore Platforms",
      description: "Marine-grade cables for drilling rigs and platforms",
      image: "/assets/ia1.jpg",
      large: true,
      tag: "PRIMARY APPLICATION",
    },
    {
      title: "Refineries",
      description: "High-temperature resistant cables for processing units",
      image: "/assets/ip2.jpg",
    },
    {
      title: "Pipelines",
      description: "Instrumentation cables for SCADA and monitoring systems",
      image: "/assets/ia4.jpg",
      tall: true,
    },
    {
      title: "Storage Facilities",
      description: "Fire-resistant cables for tank farms and depots",
      image: "/assets/ia2.jpg",
      wide: true,
    },
    {
      title: "Storage Facilities",
      description: "Fire-resistant cables for tank farms and depots",
      image: "/assets/ia2.jpg",
      wide: true,
    },
    {
      title: "Storage Facilities",
      description: "Fire-resistant cables for tank farms and depots",
      image: "/assets/ia2.jpg",
      wide: true,
    }
  ];

  const dynamicItems = (dynamicData || []).map((p: any) => ({
    ...p,
    image: p.image?.startsWith("http") ? p.image : `${getBaseUrl()}${p.image}`
  }));

  const displayApplications = [
    ...dynamicItems,
    ...fallbackApplications.slice(dynamicItems.length)
  ].slice(0, 6);

  return (
    <section className="reveal-section bg-[#ffffff] py-10 md:py-24">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-[32px] leading-none font-[700] text-[#1E3C8C] italic md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px]">
            {sectionTitle || "Industry Applications"}
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 md:gap-4 gap-[10px]">
          {/* LEFT COLUMN */}
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
            {/* LARGE CARD */}
            <div className="group relative h-[440px] overflow-hidden rounded-[4px] md:rounded-[8px] md:h-[620px]">
              <img
                src={displayApplications[0].image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F7A]/90 via-black/10 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-[24px] md:p-8">
                {/* TAG */}
                {/* <div className="mb-[16px]">
                  <span className="inline-flex h-[32px] items-center justify-center rounded-[8px]  bg-white/20 px-3 text-[12px] tracking-[1px] text-white uppercase  md:h-[40px] md:px-4 md:text-[13px] leading-[19.5px]">
                    {displayApplications[0].tag || "PRIMARY APPLICATION"}
                  </span>
                </div> */}

                {/* TITLE */}
                <h3 className="mb-[12.3px] text-[28px] leading-[32px]  tracking-[-0.5px] font-black text-white italic md:text-[38px] md:leading-[41.8px]">
                  {displayApplications[0].title}
                </h3>

                {/* DESC */}
                <p className="md:max-w-[80%] text-[14px] leading-[22px] tracking-[-0.5px] text-white md:text-[17px] md:leading-[27.2px] md:text-white/90">
                  {displayApplications[0].description}
                </p>
              </div>
            </div>

            {/* WIDE CARD */}
            <div className="group relative h-[234px] overflow-hidden rounded-[8px] md:h-[310px]">
              <img
                src={displayApplications[3].image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6">
                <h3 className="mb-1 md:mb-2 text-[18px] leading-[24px] font-black text-white italic md:text-[32px] md:leading-[38.4px]">
                  {displayApplications[3].title}
                </h3>

                <p className="md:max-w-[70%] text-[14px] leading-[22px] text-white md:text-[16px] md:leading-[25.6px] md:text-white/90">
                  {displayApplications[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
        <div className="col-span-6 lg:col-span-3">
  <div className="grid h-full gap-4 grid-rows-2">

    {/* TOP CARD */}
    <div className="group relative min-h-[234px] overflow-hidden rounded-[8px] md:min-h-[442px]">
      <img
        src={displayApplications[1].image}
        alt=""
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6">
        <h3 className="mb-1 md:mb-4 text-[18px] leading-[24px] font-black text-white italic md:text-[32px] md:leading-[38.4px]">
          {displayApplications[1].title}
        </h3>

        <p className="text-[14px] leading-[22px] text-white md:text-white/90 md:text-[15px] md:leading-[24px]">
          {displayApplications[1].description}
        </p>
      </div>
    </div>

    {/* BOTTOM CARD */}
    <div className="group relative min-h-[234px] overflow-hidden rounded-[8px] md:min-h-[442px]">
      <img
        src={displayApplications[2].image}
        alt=""
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6">
        <h3 className="mb-1 md:mb-4 text-[18px] leading-[24px] font-black text-white italic md:text-[32px] md:leading-[38.4px]">
          {displayApplications[2].title}
        </h3>

        <p className="text-[14px] leading-[22px] text-white md:text-white/90 md:text-[15px] md:leading-[24px]">
          {displayApplications[2].description}
        </p>
      </div>
    </div>

  </div>
</div>

          {/* RIGHT COLUMN */}
         <div className="col-span-6 lg:col-span-3">
  <div className="grid h-full gap-4 grid-rows-2">

    {/* TOP CARD */}
    <div className="group relative min-h-[234px] overflow-hidden rounded-[8px] md:min-h-[442px]">
      <img
        src={displayApplications[4].image}
        alt=""
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6">
        <h3 className="mb-[4px] md:mb-4 text-[18px] leading-[24px] font-black text-white italic md:text-[28px]">
          {displayApplications[4].title}
        </h3>

        <p className="text-[14px] leading-[22px] text-white md:max-w-[214px]">
          {displayApplications[4].description}
        </p>
      </div>
    </div>

    {/* BOTTOM CARD */}
    <div className="group relative min-h-[234px] overflow-hidden rounded-[8px] md:min-h-[442px]">
      <img
        src={displayApplications[5].image}
        alt=""
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6">
        <h3 className="mb-[4px] md:mb-4  leading-[24px] font-black text-white italic md:text-[28px]">
          {displayApplications[5].title}
        </h3>

        <p className="text-[14px] leading-[22px] text-white md:max-w-[214px]">
          {displayApplications[5].description}
        </p>
      </div>
    </div>

  </div>
</div>
        </div>
      </div>
    </section>
  );
}
