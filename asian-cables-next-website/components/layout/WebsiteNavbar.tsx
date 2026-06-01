"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import ProductsMegaMenu from "./ProductsMegaMenu";
import api from "@/utils/api";

import MobileProductMenu from "../../components/layout/MobileProductMenu";
import { usePathname } from "next/navigation";

const WebsiteNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  handleScroll(); 

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );
}, []);

  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const [mobileMenuView, setMobileMenuView] =
  useState("main");

  const [productsTab, setProductsTab] =
  useState("industry");

const [openCategory, setOpenCategory] =
  useState("telecom");

const [industryGroups, setIndustryGroups] = useState<Record<string, any[]>>({});
const [typeGroups, setTypeGroups] = useState<Record<string, any[]>>({});

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      const indGroups: Record<string, any[]> = {};
      const typGroups: Record<string, any[]> = {};

      data.forEach((p: any) => {
        if (p.category && p.category.name) {
          const catName = p.category.name;
          if (!typGroups[catName]) typGroups[catName] = [];
          typGroups[catName].push(p);
        }
        
        if (p.industry) {
          const industries = Array.isArray(p.industry) ? p.industry : [p.industry];
          industries.forEach((ind: any) => {
            if (ind && ind.name) {
              const indName = ind.name;
              if (!indGroups[indName]) indGroups[indName] = [];
              indGroups[indName].push(p);
            }
          });
        }
      });
      setIndustryGroups(indGroups);
      setTypeGroups(typGroups);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };
  fetchProducts();
}, []);

useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.body.style.height = "";
  };
}, [isMenuOpen]);

const [showProductsMenu, setShowProductsMenu] =
  useState(false);


  const pathname = usePathname();

const isHomePage = pathname === "/";

  const isProductsActive =
  pathname.startsWith("/products");

  return (
    <>
    {isHomePage && (
       <div
    className="absolute top-0 left-0 right-0 h-[5px]"
    style={{
      background:
        "linear-gradient(270deg, #3CAADF 0%, #F04123 60.78%, #FFD212 121.56%)",
    }}
     
  />
   )}
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled || showMegaMenu ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[1274px] items-center justify-between px-3 md:px-0 md:h-[74px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src={
              isScrolled || showMegaMenu
                ? "/assets/LOGO_Dark.svg"
                : "/assets/footer-logo.svg"
            }
            alt="Asian Cables"
            className="h-[34px] max-h-[34px] w-[110px] w-auto max-w-[110px] min-w-[110px]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden font-dm items-center gap-[35px] md:flex">
          {/* HOME */}
         <Link
            href="/"
            className={`text-[16px] leading-[26px] tracking-[-0.5px] ${
    pathname === "/"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            Home
          </Link>

          {/* PRODUCTS */}
           <div
            className="relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            
          >
            
            <button
              className={`flex items-center gap-1  text-[16px] leading-[26px] cursor-pointer tracking-[-0.5px] ${
                isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
              } ${
    isProductsActive || showMegaMenu
      ? "font-[400]"
      : "font-[400]"
  }`}
            >
             Products
              <ChevronDown
                size={15}
                className={` ${
                  showMegaMenu ? "rotate-180" : ""
                } ${
    showMegaMenu
      ? "font-[600]"
      : "font-[400]"
  }`}
              />
            </button>

            {/* MEGA MENU */}
            <div
              className={`fixed top-[74px] left-0 w-full ${
                showMegaMenu ? "visible opacity-100" : "invisible opacity-0"
              }`}

               onMouseEnter={() => setShowMegaMenu(true)}
  onMouseLeave={() => setShowMegaMenu(false)}
            >
              <ProductsMegaMenu />
            </div>
          </div>

          {/* COMPANY */}
             <Link
            href="/company"
            className={`text-[16px] ${
    pathname === "/company"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            The Company
          </Link>

             {/* CAREERS */}
          <Link
            href="/career"
            className={`text-[16px] ${
    pathname === "/career"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            Careers
          </Link>

         {/* INVESTOR */}
          <Link
            href="/investor"
            className={`text-[16px] ${
    pathname === "/investor"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            Investor
          </Link>
        </div>
        <div className="xs:hidden ml-[auto] flex items-center gap-6 md:gap-[35px] md:ml-0">
         <span
            className={` ${
              isScrolled || showMegaMenu ? "text-[#1E3A8A]" : "text-white"
            }`}
          >
            <Search className="hidden md:block" size={18} />
          </span>
           <Link
            href="/contact"
            className={`rounded-[2px] px-6 py-2 text-[16px] hidden md:block leading-[26px] font-medium tracking-[-0.5px]  ${
    pathname === "/contact"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu
                ? "bg-[#1E3C8C] text-white hover:bg-blue-800"
                : "bg-white text-[#1E3C8C] hover:bg-blue-50"
            }`}
          >
            Contact
          </Link>

      
<button
  onClick={() => setShowProductsMenu(true)}
  className={`
    mobile-menu-btn
    relative md:hidden
    inline-flex
    sparkle
    items-center
    gap-2
    font-dm
    overflow-hidden
    rounded-[6px]
    px-5
    py-2
    text-[16px]
    font-[500]
    transition-all
    duration-300
    backdrop-blur-[50px]
shadow-[0px_4px_20px_0px_#0000001A]
bg-white/[0.06]
text-[14px]
font-semibold
leading-[11px]
tracking-[-0.46px]
px-[10px]
h-[30px]
    ${
      isScrolled
        ? "bg-[#1E3C8C] text-red"
        : "bg-transparent text-white"
    }
  `}
>
  <span
    className="absolute font-dm inset-0 rounded-[6px] pointer-events-none"
    style={{
      boxShadow: "inset 0 0 0 2px transparent",
      background:
        "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      padding: "2px",
    }}
  />

  <span className="relative z-10">
    Products
  </span>
  <ChevronDown
        size={18}
        className="relative z-10"
      />
</button>


 {/* <Link
  href="/contact"
  className={`
    relative
    inline-flex
    items-center
    gap-2
    overflow-hidden
    rounded-[6px]
    px-5
    py-2
    text-[16px]
    font-[500]
    transition-all
    duration-300
    ${
      isScrolled
        ? "bg-[#1E3C8C] text-white"
        : "bg-transparent text-white"
    }
  `}
>
  <span
    className="
      absolute
      inset-0
      rounded-[6px]
      pointer-events-none
    "
    style={{
      boxShadow: "inset 0 0 0 2px transparent",
      background:
        "linear-gradient(270deg,#3CAADF 0%,#F04123 50%,#FFD212 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      padding: "2px",
    }}
  />

  <span className="relative z-10">
    Contact Us
  </span>
</Link> */}


 {/* PRODUCTS MENU */}
    {showProductsMenu && (
      <MobileProductMenu
        onClose={() =>
          setShowProductsMenu(false)
        }
      />
    )}

        </div>
        {/* Mobile Menu Button */}
       <button
  className={`ml-3 transition-colors md:hidden ${
    isScrolled || showMegaMenu
      ? "text-slate-900"
      : "text-white"
  }`}
  onClick={() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setMobileMenuView("main");
    } else {
      setIsMenuOpen(true);
      setMobileMenuView("main");
    }
  }}
>
  {isMenuOpen ? (
    <X size={30} />
  ) : (
    <Menu size={30} />
  )}
</button>
      </div>

      {/* Mobile Menu */}
     {isMenuOpen && (
  <div className="fixed inset-0 z-[9999999] bg-white md:hidden akn-mobile-menu">



    {/* MAIN MENU */}
 <div
  className={`absolute inset-0 pt-[80px] px-8 bg-white z-10 transition-transform duration-300 ${
    mobileMenuView === "main"
      ? "translate-x-0"
      : "-translate-x-full"
  }`}
>

   {/* CLOSE BUTTON */}
<div className="flex justify-end px-6 pt-6">
  <button
    onClick={() => setIsMenuOpen(false)}
    className="text-[#1E3C8C] text-[36px] leading-none"
  >
    ×
  </button>
</div>
      <div className="flex flex-col gap-8">

        <Link
          href="/"
          onClick={() =>
            setIsMenuOpen(false)
          }
          className="text-[24px] italic font-bold text-[#1E3C8C]"
        >
          Home
        </Link>

        <Link
          href="/company"
          className="text-[24px] italic font-bold text-[#9AA4C0]"
        >
          The Company
        </Link>

        <Link
          href="/career"
          className="text-[24px] italic font-bold text-[#9AA4C0]"
        >
          Careers
        </Link>

        <Link
          href="/investors"
          className="text-[24px] italic font-bold text-[#9AA4C0]"
        >
          Investors
        </Link>

        <Link
          href="/contact"
          className="text-[24px] italic font-bold text-[#9AA4C0]"
        >
          Contact
        </Link>
      </div>
    </div>



  </div>
)}
    </nav>
        </>

  );
};

export default WebsiteNavbar;
