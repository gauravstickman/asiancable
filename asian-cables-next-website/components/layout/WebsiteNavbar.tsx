"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown,  } from "lucide-react";
import {
  Phone,
  Mail,
} from "lucide-react";
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
const [showCompanyMenu, setShowCompanyMenu] = useState(false);
 const [showIndustryMenu, setShowIndustryMenu] = useState(false);
// const [showIndustryMobileMenu, setShowIndustryMobileMenu] = useState(false);

const [showIndustryMobileMenu, setShowIndustryMobileMenu] = useState(
  pathname.startsWith("/industries")
);

useEffect(() => {
  if (pathname.startsWith("/industries")) {
    setShowIndustryMobileMenu(true);
  }
}, [pathname]);
console.log("pathname =", pathname);
  return (
    <>
       <div
    className="relative top-0 left-0 right-0 h-[5px]"
    style={{
      background:
        "linear-gradient(270deg, #3CAADF 0%, #F04123 60.78%, #FFD212 121.56%)",
    }}
     
  />

   
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all z-[1] ${
        isScrolled || showMegaMenu ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] md:h-[74px] max-w-[1274px] items-center justify-between px-3 md:px-0 md:h-[74px]">
        {/* Logo */}
        <Link className="flex items-center gap-2"
  href="/"
  onClick={(e) => {
    if (pathname === "/") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }}
>
          <img
            src={
              isScrolled || showMegaMenu
                ? "/assets/LOGO_Dark.png"
                : "/assets/footer-logo.png"
            }
            alt="Asian Cables"
            className="h-[34px] max-h-[34px] w-[110px] w-auto max-w-[110px] min-w-[110px]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden font-dm items-center gap-[35px] md:flex">
          {/* HOME */}
        

          {/* PRODUCTS */}
           <div
            className="relative"
            onMouseEnter={() => {
  setShowIndustryMenu(false);
  setShowMegaMenu(true);
}}
            
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
              <ProductsMegaMenu industryGroups={industryGroups} typeGroups={typeGroups} />
            </div>
          </div>


             <div
  className="relative"
  onMouseEnter={() => setShowIndustryMenu(true)}
  onMouseLeave={() => setShowIndustryMenu(false)}
>
  <button
 onMouseEnter={() => {
  setShowMegaMenu(false);
  setShowIndustryMenu(true);
}}
  className={`flex items-center gap-1 text-[16px] ${
    pathname === "/industries"
      ? "font-[600]"
      : "font-[400]"
  } ${
    isScrolled || showMegaMenu
      ? "text-[#1E3C8C]"
      : "text-white"
  }`}
>
  Industries

  <ChevronDown
    size={16}
    className={`transition-transform duration-300 ${
      showIndustryMenu ? "rotate-180" : ""
    }`}
  />
</button>

  {showIndustryMenu && (
    <div className="absolute top-full left-0 z-50 min-w-[280px] rounded-[6px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-2 pt-3">

        <Link
          href="/industries/renewables"
        className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          Renewables
        </Link>

        <Link
          href="/industries/infrastructure"
        className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          Infrastructure
        </Link>

        <Link
          href="/industries/industrial"
         className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          Industrial
        </Link>

        <Link
          href="/industries/transportation"
          className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          Transportation
        </Link>

        <Link
          href="/industries/oil-and-gas"
          className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          Oil & Gas
        </Link>

      <Link
          href="/industries/utilities"
          className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />    
          Utilities
        </Link>



        <Link
          href="/industries/manufacturing"
           className=" relative flex items-center mb-[15px] h-[18px] pl-3  text-[16px] leading-[206%] text-[#5C5C5C] font-[400] hover:text-[#21409A]"
        >
          <span
    className="absolute left-0 top-0 right-auto h-[18px] w-[3px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />   
          Manufacturing
        </Link>

      </div>
    </div>
  )}
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
                ? "bg-[#1E3C8C] text-white"
                : "bg-white text-[#1E3C8C]"
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
        industryGroups={industryGroups}
        typeGroups={typeGroups}
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
  <div className="fixed inset-0 z-[9999999] bg-white md:hidden akn-mobile-menu overflow-auto">
 <div className="h-[calc(100vh_-_80px)] overflow-y-auto overscroll-contain">
    {/* MAIN MENU */}
 <div
  className={` absolute inset-0 pt-[80px] px-8 bg-white z-10 transition-transform duration-300 ${
    mobileMenuView === "main"
      ? "translate-x-0"
      : "-translate-x-full"
  }`}
>
  

   <div
    className="absolute w-[100%] h-[80px] inset-0 bg-cover bg-center bg-no-repeat bg-right z-[-1]"
    style={{
      backgroundImage: "url('/assets/menu-bg.svg')",
    }}
  />

   {/* CLOSE BUTTON */}
<div className="absolute flex justify-end px-6 pt-6 top-0 right-0">
 
  <button
    onClick={() => setIsMenuOpen(false)}
    className="text-[#1E3C8C] text-[40px]  leading-none opacity-0"
  >
    ×
  </button>
</div>
<span className="m-logo absolute top-6 left-6"> <img src="/assets/LOGO_Dark.png"/></span>
      <div className="flex flex-col gap-6 mt-6 overflow-it">

        <h4>
<Link
  href="/"
  onClick={() => setIsMenuOpen(false)}
  
  className={`text-[24px] leading-[26px] trcking-[-0.5px] italic font-[700] ${
    pathname === "/"
      ? "!text-[#1E3C8C]"
      : "!text-[#9AA4C0]"
  }`}
>
  Home
</Link>
        </h4>

     <div>
  <button
  onClick={() =>
    setShowCompanyMenu(!showCompanyMenu)
  }
  className={`flex items-center gap-3 text-[24px] leading-[26px] italic font-[700] transition-colors duration-300 ${
    showCompanyMenu
      ? "text-[#1E3C8C]"
      : "text-[#9AA4C0]"
  }`}
>
  <h4>The Company</h4>

  <ChevronDown
    size={22}
    className={`transition-transform duration-300 ${
      showCompanyMenu
        ? "rotate-180"
        : ""
    }`}
  />
</button>

  {showCompanyMenu && (
    <div className="mt-6 flex flex-col gap-3 pl-0">

      <h5><Link
        href="/about-us"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        About us
      </Link></h5>

      <h5><Link
        href="/leadership"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        Leadership
      </Link></h5>

      <h5><Link
        href="/rpg-group"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        RPG Group
      </Link></h5>

      <h5><Link
        href="/csr"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        CSR
      </Link></h5>

      <h5><Link
        href="/resources"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        Resources
      </Link></h5>

      <h5><Link
        href="/manufacturing"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        Manufacturing
      </Link></h5>  

      <h5><Link
        href="/clientele"
        className="text-[20px] italic font-[700] text-[#8B8B8B]"
      >
        Clientele
      </Link></h5>
    </div>
  )}
</div>



<div>
  <button
  onClick={() =>
    setShowIndustryMobileMenu(!showIndustryMobileMenu)
  }
  className={`flex items-center gap-3 text-[24px] leading-[26px] italic font-[700] transition-colors duration-300 ${
    showIndustryMobileMenu
      ? "text-[#1E3C8C]"
      : "text-[#9AA4C0]"
  }`}
>
  <h4>Industries</h4>

  <ChevronDown
    size={22}
    className={`transition-transform duration-300 ${
      showIndustryMobileMenu
        ? "rotate-180"
        : ""
    }`}
  />
</button>

  {showIndustryMobileMenu && (
    <div className="mt-6 flex flex-col gap-3 pl-0">

      <h5><Link
        href="/industries/renewables"
        className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/renewables`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >  
        Renewables</Link></h5>

      <h5><Link
        href="/industries/infrastructure"
         className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/infrastructure`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >   
        Infrastructure
      </Link></h5>

      <h5><Link
        href="/industries/industrial"
      className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/industrial`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >  
        Industrial
      </Link></h5>

      <h5><Link
        href="/industries/transportation"
        className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/transportation`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >  
        Transportation
      </Link></h5>

      <h5><Link
        href="/industries/oil-and-gas"
       className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/oil-and-gas`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >  
        Oil & Gas
      </Link></h5>

      <h5><Link
        href="/industries/manufacturing"
        className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/manufacturing`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >  
        Manufacturing
      </Link></h5>  

      <h5><Link
        href="/industries/utilities"
       className={`text-[20px] italic font-[700] text-[#8B8B8B] ${
    pathname === `/industries/utilities`
      ? "text-[#21409A] font-[600]"
      : "text-[#5C5C5C] hover:text-[#21409A]"
  }`} >  
        Utilities
      </Link></h5>
    </div>
  )}
</div>


           <h4><Link
          href="/career"
          className="text-[24px] leading-[26px] trcking-[-0.5px] italic font-[700] text-[#9AA4C0]"
        >
          Careers
        </Link></h4>

        <h4><Link
          href="/investors"
          className="text-[24px] leading-[26px] trcking-[-0.5px] italic font-[700] text-[#9AA4C0]"
        >
          Investors
        </Link></h4>

        <h4><Link
          href="/contact"
          className="text-[24px] leading-[26px] trcking-[-0.5px] italic font-[700] text-[#9AA4C0]"
        >
          Contact
        </Link></h4>

     <div className="mt-auto pt-5">

  {/* PHONE */}
  <div className="relative mb-8 flex items-start gap-4  items-center pl-4">

    <span
    className="absolute left-0 top-0 right-auto h-[100%] w-[2px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />

    <Phone
      size={24}
      className="mt-1 text-[#1E3C8C]"
    />

    <div>
      <a
        href="tel:+912212345678"
        className="block text-[16px] leading-[24px] font-[600] text-[#1E3C8C]"
      >
        +91 22 1234 5678
      </a>

      <p className="text-[13px] leading-[19.5px] font-[400] text-[#767676]">
        Mon-Sat, 9AM-6PM IST
      </p>
    </div>
  </div>

  {/* EMAIL */}
  <div className="relative mb-8 flex items-start gap-4 items-center pl-4">

     <span
    className="absolute left-0 top-0 right-auto h-[100%] w-[2px]"
    style={{
      background:
        "linear-gradient(180deg, #FFD212 0%, #F04123 50%, #3CAADF 100%)",
    }}
  />

    <Mail
      size={24}
      className="mt-1 text-[#1E3C8C]"
    />

    <div>
      <a
        href="mailto:info@asiancables.com"
        className="block text-[16px] leading-[24px] font-[600] text-[#1E3C8C]"
      >
        info@asiancables.com
      </a>

      <p className="text-[13px] leading-[19.5px] font-[400] text-[#767676]">
        Response within 24 hours
      </p>
    </div>
  </div>

  {/* SOCIAL */}
  <div className="flex gap-4 pb-3">

    {/* SOCIAL */}
            <div className="flex items-center gap-2">
              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/in.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/x.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/fb.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/yt.svg" alt="" className="max-w-[16px]" />
              </div>
            </div>
          </div>

</div>
      </div>
      
    </div>
  </div>


  </div>
)}
    </nav>
        </>

  );
};

export default WebsiteNavbar;
