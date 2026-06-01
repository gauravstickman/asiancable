"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function BottomBar({ currentProduct }: { currentProduct?: any }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const [selected, setSelected] = useState("Power Cables");
  const [selectedSelect, setSelectedSelect] = useState("Control and instrumentation");

  const [categories, setCategories] = useState<string[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        
        const catMap: Record<string, any[]> = {};
        const catList: string[] = [];

        data.forEach((p: any) => {
          const catName = p.category && typeof p.category === 'object' 
            ? p.category.name 
            : (p.category || "General");

          if (!catMap[catName]) {
            catMap[catName] = [];
            catList.push(catName);
          }
          catMap[catName].push(p);
        });

        setCategories(catList);
        setProductsByCategory(catMap);
        setLoading(false);

        // Pre-select based on currentProduct if available
        if (currentProduct && currentProduct.name) {
          const curCat = currentProduct.category && typeof currentProduct.category === 'object'
            ? currentProduct.category.name
            : (currentProduct.category || "General");
          
          setSelected(curCat);
          setSelectedSelect(currentProduct.name);
        } else if (catList.length > 0) {
          const firstCat = catList[0];
          setSelected(firstCat);
          if (catMap[firstCat] && catMap[firstCat].length > 0) {
            setSelectedSelect(catMap[firstCat][0].name);
          }
        }
      } catch (err) {
        console.error("Error fetching products in BottomBar", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentProduct]);

  // Handle currentProduct changes when page loads/transitions
  useEffect(() => {
    if (currentProduct && currentProduct.name) {
      const curCat = currentProduct.category && typeof currentProduct.category === 'object'
        ? currentProduct.category.name
        : (currentProduct.category || "General");
      
      setSelected(curCat);
      setSelectedSelect(currentProduct.name);
    }
  }, [currentProduct]);

  const handleCategorySelect = (catName: string) => {
    setSelected(catName);
    setOpen(false);
    const prods = productsByCategory[catName] || [];
    if (prods.length > 0) {
      setSelectedSelect(prods[0].name);
      router.push(`/product/${prods[0].slug}`);
    }
  };

  const handleProductSelect = (product: any) => {
    setSelectedSelect(product.name);
    setOpenSelect(false);
    router.push(`/product/${product.slug}`);
  };

  const currentCategoryProducts = productsByCategory[selected] || [];

  return (
    <div className="w-full rounded-sm bg-[#1E3C8C] md:static relative">
      <div className="mx-auto flex h-12.5 max-w-330 items-center gap-2 px-3 md:gap-6 md:px-8">
        {/* CATEGORY LABEL */}
        <div className="text-[10px] font-medium whitespace-nowrap text-white md:text-[16px] md:leading-[17.29px]">
          Category :
        </div>

        {/* DROPDOWN */}
        <div className="relative">
          {/* BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-[28px] w-[auto] one-line items-center justify-between rounded-[3.29px] border border-[#6D82C2] bg-[#4D64AD] px-2 text-[12px] text-white md:h-[33px] gap-[6px] md:px-3 md:text-[16px] md:leading-[17.29px]"
          >
            <span>{selected}</span>

            <ChevronDown
              className={`h-4 w-4 transition duration-300 md:h-[14px] md:w-[14px] ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* MENU */}
          {open && (
            <div className="absolute top-[35px]  md:top-[38px] left-0 z-50 w-[280px] max-h-[300px] overflow-y-auto rounded-[4px] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)]">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(item)}
                  className={`h-[50px] w-full px-8 text-left text-[15px] transition ${
                    selected === item
                      ? "bg-[#F7F7F7] font-medium text-black"
                      : "bg-white text-[#5E5E5E] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SLASH */}
        <div className="text-[20px] font-normal text-white">/</div>

        {/* SEARCH INPUT */}
        <div className="flex-1">
          <div className="md:relative one-line-big">
            {/* BUTTON */}
            <button
              onClick={() => setOpenSelect(!openSelect)}
              className="flex h-[30.47px] w-full items-center justify-between rounded-[3.29px] border border-[#ffffff] bg-[#ffffff] px-2 text-[12px] text-[#777777] md:h-[33px] gap-[6px] md:px-3 md:text-[16px] md:leading-[17.29px]"
            >
              <span className="text-[#777777] truncate">{selectedSelect}</span>

              <ChevronDown
                className={`text-[#1E3C8C] h-4 w-4 transition duration-300 md:h-[14px] md:w-[14px] shrink-0 ${
                  openSelect ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* MENU */}
            {openSelect && (
              <div className="absolute top-[50px] top-[35px] md:top-[38px] left-0 z-50 w-full max-h-[300px] overflow-y-auto rounded-[4px] bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)] z-[auto]">
                {currentCategoryProducts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleProductSelect(item)}
                    className={`h-[50px] w-full px-8 text-left text-[15px] transition truncate ${
                      selectedSelect === item.name
                        ? "bg-[#F7F7F7] font-medium text-black"
                        : "bg-white text-[#5E5E5E] hover:bg-[#F7F7F7]"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PRODUCT COUNT */}
        <button className="hidden h-[33px] rounded-[3.92px] border border-[#6D82C2] bg-[#4D64AD] px-4 text-[10.71px] leading-[16.06px] whitespace-nowrap text-white md:block">
          • {currentCategoryProducts.length} Products
        </button>
      </div>
    </div>
  );
}
