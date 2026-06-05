"use client";

const specifications = [
  {
    label: "Products Supplied",
    value:
      "Fibre Optic Cable — Steel Wire Armoured, Fire Survival & Flame Retardant",
  },
  {
    label: "Standards / Approvals",
    value: "ADNOC Approval",
  },
  {
    label: "Key Customisation",
    value: "3 km single drum length, Embossed cable identification",
  },
  {
    label: "Volume Delivered",
    value: "1,072 km",
  },
  {
    label: "Supply Year",
    value: "2025",
  },
];

export default function CaseStudySpecs() {
  return (
    <section className=" max-w-[1320px] mx-auto bg-white ">
      <div className="mr-auto max-w-[830px] px-5 reveal-section">
        <div className="overflow-hidden rounded-[12px] border border-[#C8D0E8]">
          {specifications.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-[272px_1fr] ${
                index !== specifications.length - 1
                  ? "border-b border-[#C8D0E8]"
                  : ""
              }`}
            >
              {/* LEFT */}
              <div className="border-r border-[#1E3C8C40] bg-[#1E3C8C1A] px-[15px] py-[10px] md:px-[24px] md:py-[22px]">
                <h3 className="text-[20px] leading-[42px] tracking-[-0.92px] italic font-[700] text-[#21409A]">
                  {item.label}
                </h3>
              </div>

              {/* RIGHT */}
              <div className="bg-white px-[15px] md:px-[24px] py-[20px] flex items-center">
                <p className="text-[16px] leading-[24px] font-[400] text-[#525252]">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}