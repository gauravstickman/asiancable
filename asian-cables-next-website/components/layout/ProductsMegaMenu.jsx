import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductsMegaMenu({ industryGroups = {}, typeGroups = {} }) {
  const [activeTab, setActiveTab] =
    useState("industry");
const allProducts = Object.values(industryGroups).flat();
  return (
    <>
      <div className=" border-t border-[#ffffff] bg-white">

        <div className="max-w-[1320px] mx-auto px-6 py-14">

          <div className="grid grid-cols-12 gap-14">

         

            {/* RIGHT */}
            <div className="col-span-12">

     <div className="grid grid-cols-3 gap-x-20 gap-y-4">
  {allProducts.map((p) => (
    <Link
      key={p._id}
      href={`/product/${p.slug}`}
      className="relative flex items-center pl-3 text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
    >
      <span
        className="absolute left-0 top-[8px] h-[18px] w-[3px]"
        style={{
          background:
            "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
        }}
      />

      {p.name}
    </Link>
  ))}
</div>
             

            </div>
          </div>
        </div>

      </div>
      <img src="/assets/menu-prop.png" className="absolute right-0 bottom-0 w-[120px]" />

    </>
  );
}