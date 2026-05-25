import {
  ChevronRight, ArrowRight} from "lucide-react";
export default function IndustryProducts() {
  const products = [
    {
      title: "Instrumentation Cables",
      description:
        "Feature high-quality copper conductors, advanced insulation materials and shielding options to minimize signal interference.",
      image: "/src/assets/product1.png",
    },
    {
      title:
        "High Voltage Cables / Extra High Voltage Cables",
      description:
        "Manufactured using advanced XLPE insulation technology and precision engineering, these cables ensure superior electrical reliability and long service life.",
      image: "/src/assets/product2.png",
    },
    {
      title: "Elastomeric / Rubber Cables",
      description:
        "Elastomeric insulation compounds that provide excellent mechanical strength, flexibility and resistance to heat and abrasion.",
      image: "/src/assets/product3.png",
    },
    {
      title: "Cathodic Protection Cables",
      description:
        "Fluoropolymer insulation and high-molecular-weight polyethylene sheath for superior chemical resistance and durability.",
      image: "/src/assets/product4.png",
    },
  ];

  return (
    <section className="bg-[#f6f6f6] py-24 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* TOP */}
        <div className="flex items-center justify-between mb-14">

          {/* HEADING */}
          <h2 className="text-[#1E3C8C] text-[46px] leading-none font-black italic">
            Cables for Oil & Gas
          </h2>

             {/* BUTTON */}
                 <button className="w-[162px] h-[48px] bg-[#1E3C8C] rounded-[5.52px]  flex items-center justify-center gap-[6px]  text-[#ffffff] text-[20px] font-medium hover:bg-[#1E3C8C] transition">
                    View All
                    <span> <ChevronRight size={18} /></span>
                  </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[6px] overflow-hidden relative"
            >

              {/* IMAGE */}
              <div className="h-[240px] overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* CONTENT */}
              <div className="relative p-7 min-h-[262px] flex flex-col">

                {/* GRADIENT */}
                <div className="absolute bottom-0 right-0 w-[160px] h-[160px] bg-[radial-gradient(circle,_rgba(255,210,18,0.18)_0%,_transparent_70%)]" />

                {/* TITLE */}
                <p className="relative z-10 text-[#1E3C8C] text-[17px] leading-[1.7] font-[600] mb-4">
                  {item.title}
                </p>

                {/* DESC */}
                <p className="relative z-10 text-[#6F6F6F] text-[12px] leading-[1.8]">
                  {item.description}
                </p>

                {/* CTA */}
                <button className="relative z-10 mt-auto pt-5 text-[#525252] text-[15px] font-semibold flex items-center gap-2 hover:text-[#1E3C8C] transition">

                  Know more

                  <span className="text-[18px] leading-none">
                    ›
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}