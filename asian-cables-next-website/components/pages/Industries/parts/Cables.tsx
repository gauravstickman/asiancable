import { ChevronRight } from "lucide-react";
import { getBaseUrl } from "../../../../utils/api";
import Link from "next/link";

export default function IndustryProducts({ dynamicData, sectionTitle }: { dynamicData?: any[], sectionTitle?: string }) {
  const fallbackProducts = [
    {
      title: "Instrumentation Cables",
      description:
        "Feature high-quality copper conductors, advanced insulation materials and shielding options to minimize signal interference.",
      image: "/assets/product1.png",
    },
    {
      title: "High Voltage Cables / Extra High Voltage Cables",
      description:
        "Manufactured using advanced XLPE insulation technology and precision engineering, these cables ensure superior electrical reliability and long service life.",
      image: "/assets/product2.png",
    },
    {
      title: "Elastomeric / Rubber Cables",
      description:
        "Elastomeric insulation compounds that provide excellent mechanical strength, flexibility and resistance to heat and abrasion.",
      image: "/assets/product3.png",
    },
    {
      title: "Cathodic Protection Cables",
      description:
        "Fluoropolymer insulation and high-molecular-weight polyethylene sheath for superior chemical resistance and durability.",
      image: "/assets/product4.png",
    },
  ];

  const dynamicItems = (dynamicData || []).map((p: any) => ({
    ...p,
    image: p.image?.startsWith("http") ? p.image : `${getBaseUrl()}${p.image}`
  }));

  const displayProducts = [
    ...dynamicItems,
    ...fallbackProducts.slice(dynamicItems.length)
  ].slice(0, 4);

  return (
    <section className="reveal-section bg-[#f6f6f6] py-10 md:py-24">
      <div className="mx-auto max-w-[1320px] md:px-4">
        {/* TOP */}
        <div className="md-gap-0 mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-5 md:px-0">
          {/* HEADING */}
          <h2 className="text-[32px] leading-none font-black text-[#1E3C8C] italic md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px]">
            {sectionTitle || "Cables for Oil & Gas"}
          </h2>

          {/* BUTTON */}
          <button className="border-it-b flex h-[48px] w-[162px] items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-[#ffffff] transition hover:bg-[#1E3C8C]">
            View All
            <span>
              {" "}
              <ChevronRight size={18} />
            </span>
          </button>
        </div>

        {/* CARDS */}
        <div className="hide-scrollbar flex grid-cols-1 flex-nowrap gap-2 md:gap-6 overflow-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:pl-0 p-5">
          {displayProducts.map((item, index) => (
            <div
              key={index}
              className="group relative min-w-[76vw] overflow-hidden rounded-[6px] bg-white md:min-w-[100%]"
            >
              {/* IMAGE */}
              <div className="h-[240px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="relative flex min-h-[268px] flex-col p-7">
                {/* GRADIENT */}
     {/* BACKGROUND IMAGE */}
               <div className="absolute right-0 bottom-0 h-[100%] w-[100%]">
  <img
    src="/assets/obg.png"
    alt=""
    className="h-full w-full object-cover object-bottom opacity-[0.4]"
  />
</div>
                {/* TITLE */}
                <p className="relative z-10 mb-3 text-[17px] leading-[23.8px] font-[600] text-[#1E3C8C]">
                  {item.title}
                </p>

                {/* DESC */}
                <p className="relative z-10 text-[12px] leading-[180%] text-[#6F6F6F]">
                  {item.description}
                </p>

                {/* CTA */}
                {item.link ? (
                  <Link href={item.link} className="relative z-10 mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-[500] leading-[22.5px] text-[#525252] transition hover:text-[#1E3C8C] max-w-max">
                    Know more
                    <span className="text-[18px] leading-none"><ChevronRight size={16}/></span>
                  </Link>
                ) : (
                  <button className="relative z-10 mt-auto flex items-center gap-2 pt-5 text-[15px] font-[500] leading-[22.5px] text-[#525252] transition hover:text-[#1E3C8C]">
                    Know more
                    <span className="text-[18px] leading-none"><ChevronRight size={16}/></span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
