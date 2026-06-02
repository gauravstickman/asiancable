"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import {
  Phone,
  Mail,
} from "lucide-react";
import ProductsMegaMenu from "./ProductsMegaMenu";
import { usePathname } from "next/navigation";
import api from "../../utils/api";

const WebsiteNavbarDark = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  handleScroll(); // ← ye line add kar

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


const pathname = usePathname();

const isHomePage = pathname === "/";

  const [productsTab, setProductsTab] =
  useState("industry");

const [openCategory, setOpenCategory] =
  useState("telecom");

const [industryGroups, setIndustryGroups] = useState({});
const [typeGroups, setTypeGroups] = useState({});

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      const indGroups = {};
      const typGroups = {};

      data.forEach((p) => {
        if (p.category && p.category.name) {
          const catName = p.category.name;
          if (!typGroups[catName]) typGroups[catName] = [];
          typGroups[catName].push(p);
        }
        
        if (p.industry) {
          const industries = Array.isArray(p.industry) ? p.industry : [p.industry];
          industries.forEach((ind) => {
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


const isProductsActive =
  pathname.startsWith("/products");
const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  return (
    <nav
      className={`sticky top-0 right-0 left-0 z-50 ${
        isScrolled || showMegaMenu ? "bg-white" : "bg-white"
      }`}
    >
      {isHomePage && (
       <div
    className="absolute top-0 left-0 right-0 h-[5px]"
    style={{
      background:
        "linear-gradient(270deg, #3CAADF 0%, #F04123 60.78%, #FFD212 121.56%)",
    }}
     
  />
   )}
      <div className="mx-auto flex h-[74px] max-w-[1274px] items-center justify-between px-3 md:px-0 md:h-[74px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src={
              isScrolled || showMegaMenu
                ? "/assets/LOGO_Dark.svg"
                : "/assets/LOGO_Dark.svg"
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
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-[#1E3C8C]"
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
                isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-[#1E3C8C]"
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


 <Link
            href="/industries"
            className={`text-[16px] ${
    pathname === "/industries"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-[#1E3C8C]"
            }`}
          >
            Industries
          </Link>


          {/* COMPANY */}
          <Link
            href="/company"
            className={`text-[16px] ${
    pathname === "/company"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-[#1E3C8C]"
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
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-[#1E3C8C]"
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
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-[#1E3C8C]"
            }`}
          >
            Investor
          </Link>
        </div>

        <div className="xs:hidden ml-[auto] flex items-center gap-6 md:gap-[35px] md:ml-0">
          <span
            className={` ${
              isScrolled || showMegaMenu ? "text-[#1E3A8A]" : "text-[#1E3C8C]"
            }`}
          >
            <Search className="" size={18} />
          </span>
          <Link
            href="/contact"
            className={`rounded-[2px] hidden md:block px-6 py-2 text-[16px] leading-[26px] font-medium tracking-[-0.5px]  ${
    pathname === "/contact"
      ? "font-[600]"
      : "font-[400]"
  } ${
              isScrolled || showMegaMenu
                ? "bg-[#1E3C8C] text-[#ffffff]"
                : "bg-[#1E3C8C] text-[#ffffff]"
            }`}
          >
            Contact
          </Link>
        </div>
        {/* Mobile Menu Button */}
       <button
  className={`ml-3 md:hidden ${
    isScrolled || showMegaMenu
      ? "text-[#1e3c8c]"
      : "text-[#1e3c8c]"
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
<span className="m-logo absolute top-6 left-6"> <img src="/assets/LOGO_Dark.svg"/></span>
      <div className="flex flex-col gap-6 mt-6">

        <h4>
        <Link
          href="/"
          onClick={() =>
            setIsMenuOpen(false)
          }
          className="text-[24px] italic font-bold text-[#1E3C8C]"
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

        <h4><Link
          href="/industries"
          className="text-[24px] leading-[26px] trcking-[-0.5px] italic font-[700] text-[#9AA4C0]"
        >
          Industries
        </Link></h4>

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
  <div className="flex gap-4">

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
)}
    </nav>
  );
};

export default WebsiteNavbarDark;
