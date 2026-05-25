export default function IndustryApplications() {
  const applications = [
    {
      title: "Offshore Platforms",
      description:
        "Marine-grade cables for drilling rigs and platforms",
      image: "/src/assets/ia1.jpg",
      large: true,
      tag: "PRIMARY APPLICATION",
    },
    {
      title: "Refineries",
      description:
        "High-temperature resistant cables for processing units",
      image: "/src/assets/ip2.jpg",
    },
    {
      title: "Pipelines",
      description:
        "Instrumentation cables for SCADA and monitoring systems",
      image: "/src/assets/ia4.jpg",
      tall: true,
    },
    {
      title: "Storage Facilities",
      description:
        "Fire-resistant cables for tank farms and depots",
      image: "/src/assets/ia2.jpg",
      wide: true,
    },
  ];

  return (
    <section className="bg-[#ffffff] py-24 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-[#1E3C8C] text-[46px] leading-none font-black italic">
            Industry Applications
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-4">

          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">

            {/* LARGE CARD */}
            <div className="relative h-[620px] rounded-[8px] overflow-hidden group">

              <img
                src={applications[0].image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F7A]/90 via-black/10 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">

                {/* TAG */}
                <div className="mb-6">

                  <span className="h-[40px] px-5 inline-flex items-center justify-center rounded-[4px] bg-white/20 backdrop-blur-md border border-white/20 text-white text-[13px] tracking-[1px] uppercase">
                    {applications[0].tag}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-white text-[38px] leading-[0.95] font-black italic mb-5">
                  {applications[0].title}
                </h3>

                {/* DESC */}
                <p className="text-white/90 text-[17px] leading-[1.7] max-w-[80%]">
                  {applications[0].description}
                </p>
              </div>
            </div>

            {/* WIDE CARD */}
            <div className="relative h-[310px] rounded-[8px] overflow-hidden group">

              <img
                src={applications[3].image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">

                <h3 className="text-white text-[32px] leading-none font-black italic mb-4">
                  {applications[3].title}
                </h3>

                <p className="text-white/90 text-[16px] leading-[1.7] max-w-[70%]">
                  {applications[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="col-span-12 lg:col-span-3">

            <div className="relative h-full min-h-[900px] rounded-[8px] overflow-hidden group">

              <img
                src={applications[1].image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">

                <h3 className="text-white text-[32px] leading-none font-black italic mb-4">
                  {applications[1].title}
                </h3>

                <p className="text-white/90 text-[16px] leading-[1.8]">
                  {applications[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-3">

            <div className="relative h-full min-h-[900px] rounded-[8px] overflow-hidden group">

              <img
                src={applications[2].image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">

                <h3 className="text-white text-[32px] leading-none font-black italic mb-4">
                  {applications[2].title}
                </h3>

                <p className="text-white/90 text-[16px] leading-[1.8]">
                  {applications[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}