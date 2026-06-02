"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";

export default function MobileProductMenu({
  onClose,
  industryGroups = {},
  typeGroups = {},
}: {
  onClose: () => void;
  industryGroups?: Record<string, any[]>;
  typeGroups?: Record<string, any[]>;
}) {
    useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [mainAccordion, setMainAccordion] =
    useState("industry");

  const [openCategory, setOpenCategory] =
    useState("");
   const allProducts = Object.values(industryGroups).flat();

  return (    
    <div className="fixed inset-0 z-[99999999] h-[calc(100%-80px)] bg-white top-[70px] mx-[10px] rounded-[12px] overflow-y-auto">

      <div className="absolute right-0 top-0 z-20 px-5 py-5">
        <div className="flex items-center justify-right gap-5">
          <button onClick={onClose}>
            <X
              size={18}
              className="text-[#1E3C8C]"
            />
          </button>
        </div>
      </div>


<div className="grid grid-cols-1 gap-x-20 gap-y-3 p-5">
  <h4 className="font-[700]">All Products</h4>
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
  );
}