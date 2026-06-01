import { getBaseUrl } from "../../../../utils/api";

export default function ApplicationsSection({ data }: { data?: any[] }) {
  const getImg = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${getBaseUrl()}/${url.replace(/\\/g, "/")}`;
  };

  const app1 = data && data.length > 0 ? data[0] : {
    title: "Oil & Gas",
    description: "Enabling uninterrupted operations across upstream, midstream, and downstream facilities through cabling solutions aligned to safety protocols, reliability requirements, and asset integrity expectations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
  };

  const app2 = data && data.length > 1 ? data[1] : {
    title: "Power Plants",
    description: "Reliable cable systems engineered for thermal, hydro and renewable power generation facilities.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop"
  };

  const app3 = data && data.length > 2 ? data[2] : {
    title: "Utilities",
    description: "Efficient cabling solutions for utility distribution, substations and critical infrastructure systems.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
  };

  const app4 = data && data.length > 3 ? data[3] : {
    title: "Industrial & Heavy Engineering",
    description: "Advanced cable infrastructure supporting manufacturing, heavy equipment, automation and industrial operations.",
    image: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1400&auto=format&fit=crop"
  };

  return (
    <section className="reveal-section bg-[#ffffff] pt-10 pb-3 md:py-10">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* Heading */}
        <h2 className="mb-8 text-center text-[32px] font-black text-[#1E3C8C] italic md:mb-14 md:text-[46px]">
          Applications
        </h2>

        {/* EXACT LAYOUT */}
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT BIG CARD */}
          <div className="col-span-12 row-span-2 lg:col-span-7">
            <div className="group relative h-[440px] overflow-hidden rounded-[10px] md:h-[650px]">
              <img
                src={getImg(app1.image) || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"}
                alt={app1.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F63] via-[#0B1F63]/40 to-transparent" />

              {/* Content */}
              <div className="absolute right-5 bottom-10 left-5 max-w-[520px] text-white md:right-0 md:left-10">
                <span className="mb-5 inline-block rounded-md border border-white/20 bg-white/30 px-4 py-2 text-[11px] font-bold tracking-[2px] backdrop-blur-sm md:bg-white/20">
                  PRIMARY USE
                </span>

                <h3 className="mb-[36px] text-[28px] leading-none font-black italic md:text-[42px] md:leading-[32px] md:tracking-[-0.5px]">
                  {app1.title}
                </h3>

                <p className="text-[16px] leading-[1.7] text-white/90 md:text-[16px] md:leading-[22px] md:tracking-[-0.5px]">
                  {app1.description}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-5">
            {/* TOP 2 SMALL CARDS */}
            <div className="grid grid-cols-2 gap-4">
              {/* POWER PLANTS */}
              <div className="group relative h-[234px] overflow-hidden rounded-[10px] md:h-[315px]">
                <img
                  src={getImg(app2.image) || "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop"}
                  alt={app2.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  {/* TITLE */}
                  <h3 className="mb-0 text-[18px] leading-tight font-black text-white italic transition-all duration-500 group-hover:mb-4 md:text-[24px] md:leading-[32px] md:tracking-[-0.5px]">
                    {app2.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100">
                                    <p className="text-[16px] leading-[1.7] text-white/90 md:text-[16px] md:leading-[22px] md:tracking-[-0.5px]">

                      {app2.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* UTILITIES */}
              <div className="group relative h-[234px] overflow-hidden rounded-[10px] md:h-[315px]">
                <img
                  src={getImg(app3.image) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"}
                  alt={app3.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  {/* TITLE */}
                  <h3 className="mb-0 text-[18px] leading-tight font-black text-white italic transition-all duration-500 group-hover:mb-4 md:text-[24px] md:leading-[22px] md:tracking-[-0.5px]">
                    {app3.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100">
                                    <p className="text-[16px] leading-[1.7] text-white/90 md:text-[16px] md:leading-[22px] md:tracking-[-0.5px]">

                      {app3.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM WIDE CARD */}
            <div className="group relative h-[234px] overflow-hidden rounded-[10px] md:h-[315px]">
              <img
                src={getImg(app4.image) || "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1400&auto=format&fit=crop"}
                alt={app4.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* TITLE */}
                <h3 className="mb-0 max-w-[500px] text-[18px] leading-tight font-black text-white italic transition-all duration-500 group-hover:mb-4 md:text-[24px] md:leading-[22px] md:tracking-[-0.5px]">
                  {app4.title}
                </h3>

                {/* DESCRIPTION */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100">
                <p className="text-[16px] leading-[1.7] text-white/90 md:text-[16px] md:leading-[22px] md:tracking-[-0.5px]">
                    {app4.description}
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
