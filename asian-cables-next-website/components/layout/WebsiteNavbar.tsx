"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import ProductsMegaMenu from "./ProductsMegaMenu";
import api from "@/utils/api";

const WebsiteNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      const { data } = await api.get('/products');
      const indGroups: Record<string, any[]> = {};
      const typGroups: Record<string, any[]> = {};

      data.forEach((p: any) => {
        if (p.category && p.category.name) {
          const catName = p.category.name;
          if (p.industry) {
            if (!indGroups[catName]) indGroups[catName] = [];
            indGroups[catName].push(p);
          } else {
            if (!typGroups[catName]) typGroups[catName] = [];
            typGroups[catName].push(p);
          }
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
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [isMenuOpen]);

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

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled || showMegaMenu ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-3 md:h-[85px] md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src={
              isScrolled || showMegaMenu
                ? "assets/LOGO_Dark.svg"
                : "assets/footer-logo.svg"
            }
            alt="Asian Cables"
            className="h-[34px] max-h-[34px] w-[110px] w-auto max-w-[110px] min-w-[110px] transition-all duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {/* HOME */}
          <Link
            href="/"
            className={`text-[16px] transition-colors ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            Home
          </Link>

          {/* PRODUCTS */}
          <div
            className="relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            
            <button
              className={`flex items-center gap-1 text-[16px] transition-colors ${
                isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
              } ${
    showMegaMenu
      ? "font-[500]"
      : "font-normal"
  }`}
            >
              Products
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${
                  showMegaMenu ? "rotate-180" : ""
                } ${
    showMegaMenu
      ? "font-[500]"
      : "font-normal"
  }`}
              />
            </button>

            {/* MEGA MENU */}
            <div
              className={`fixed top-[85px] left-0 w-full transition-all duration-300 ${
                showMegaMenu ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <ProductsMegaMenu industryGroups={industryGroups} typeGroups={typeGroups} />
            </div>
          </div>

          {/* COMPANY */}
          <Link
            href="/company"
            className={`text-[16px] transition-colors ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            The Company
          </Link>

          {/* CAREERS */}
          <Link
            href="/career"
            className={`text-[16px] transition-colors ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            Careers
          </Link>

          {/* INVESTOR */}
          <Link
            href="/investor"
            className={`text-[16px] transition-colors ${
              isScrolled || showMegaMenu ? "text-[#1E3C8C]" : "text-white"
            }`}
          >
            Investor
          </Link>
        </div>

        <div className="xs:hidden ml-[auto] flex items-center gap-6 md:ml-0">
          <span
            className={`transition-colors duration-300 ${
              isScrolled || showMegaMenu ? "text-[#1E3A8A]" : "text-white"
            }`}
          >
            <Search className="hidden md:block" size={20} />
          </span>
          <Link
            href="/login"
            className={`rounded-[2px] px-7 py-2 text-[16px] leading-[24px] font-medium tracking-[0px] transition-all ${
              isScrolled || showMegaMenu
                ? "bg-[#1E3A8A] text-white hover:bg-blue-800"
                : "bg-white text-[#1E3A8A] hover:bg-blue-50"
            }`}
          >
            Contact
          </Link>
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

    {/* TOP BAR */}
    <div className="relative z-[99999999] flex items-center justify-between px-6 py-4 bg-white border-b">

  {mobileMenuView === "submenu" ? (
    <button
      onClick={() => setMobileMenuView("main")}
      className="text-[#1E3C8C] font-medium"
    >
      ← Back
    </button>
  ) : (
    <div />
  )}

  <button
    onClick={() => {
      setIsMenuOpen(false);
      setMobileMenuView("main");
    }}
    className="text-[#1E3C8C] text-[32px] leading-none"
  >
    ×
  </button>

</div>

    {/* MAIN MENU */}
  <div
  className={`absolute inset-0 pt-[80px] px-8 bg-white z-10 transition-transform duration-300 ${
  mobileMenuView === "main"
    ? "translate-x-0"
    : "-translate-x-full"
}`}
>
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

        <button
          onClick={() =>
            setMobileMenuView("submenu")
          }
          className="flex items-center justify-between text-[24px] italic font-bold text-[#9AA4C0]"
        >
          Products

          <span>›</span>
        </button>

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

    {/* PRODUCTS SUBMENU */}
 <div
 className={`absolute inset-0 pt-[80px] px-8 bg-white z-10 transition-transform duration-300 ${
  mobileMenuView === "submenu"
    ? "translate-x-0"
    : "translate-x-full"
}`}
>
   <div className="flex flex-col gap-4">

  {/* TABS */}

  <button
    onClick={() => {
      setProductsTab("industry");
      setOpenCategory("telecom");
    }}
    className={`text-left text-[24px] italic font-bold ${
      productsTab === "industry"
        ? "text-[#21409A]"
        : "text-[#9AA4C0]"
    }`}
  >
    Cables by Industry
  </button>

  <button
    onClick={() => {
      setProductsTab("type");
      setOpenCategory("power");
    }}
    className={`text-left text-[24px] italic font-bold ${
      productsTab === "type"
        ? "text-[#21409A]"
        : "text-[#9AA4C0]"
    }`}
  >
    Cables by Type
  </button>

  {/* INDUSTRY */}

  {productsTab === "industry" && (
    <div className="mt-4 border-l border-[#D4DFF7] pl-4">
      {Object.entries(industryGroups).map(([indName, prods]) => (
        <div key={indName} className="mb-4 rounded-md border">
          <button
            onClick={() => setOpenCategory(openCategory === indName ? "" : indName)}
            className="flex w-full items-center justify-between p-4"
          >
            <span className="font-semibold">{indName}</span>
          </button>
          {openCategory === indName && (
            <div className="px-4 pb-4 flex flex-col gap-3 text-[#666]">
              {prods.map(p => (
                <Link key={p._id} href={`/product/${p._id}`}>{p.name}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )}

  {/* TYPE */}

  {productsTab === "type" && (
    <div className="mt-4 border-l border-[#D4DFF7] pl-4">
      {Object.entries(typeGroups).map(([catName, prods]) => (
        <div key={catName} className="mb-4 rounded-md border">
          <button
            onClick={() => setOpenCategory(openCategory === catName ? "" : catName)}
            className="flex w-full items-center justify-between p-4"
          >
            <span className="font-semibold">{catName}</span>
          </button>
          {openCategory === catName && (
            <div className="px-4 pb-4 flex flex-col gap-3 text-[#666]">
              {prods.map(p => (
                <Link key={p._id} href={`/product/${p._id}`}>{p.name}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>
    </div>

  </div>
)}
    </nav>
  );
};

export default WebsiteNavbar;
