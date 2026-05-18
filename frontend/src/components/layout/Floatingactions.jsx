"use client";

import { Download, Phone, FileText } from "lucide-react";

const downloads = [
  {
    name: "Company Profile.pdf",
    url: "/downloads/company-profile.pdf",
  },
  {
    name: "Product Catalog.pdf",
    url: "/downloads/product-catalog.pdf",
  },
  {
    name: "Annual Report.pdf",
    url: "/downloads/annual-report.pdf",
  },
  {
    name: "Technical Datasheet.pdf",
    url: "/downloads/datasheet.pdf",
  },
];

export default function FloatingActions() {
  return (
    <>
      {/* Bottom Floating Menu */}
      <div className="absolute -bottom-[20px] left-1/2 z-[999999] flex -translate-x-1/2 overflow-hidden rounded-md border border-blue-200 bg-white shadow-2xl">
        
        <button className="flex items-center gap-2 border-r px-6 py-4 text-sm font-medium text-blue-900 hover:bg-blue-50">
          <FileText size={18} />
          Company Overview
        </button>

        <button className="flex items-center gap-2 border-r px-6 py-4 text-sm font-medium text-blue-900 hover:bg-blue-50">
          <Phone size={18} />
          Contact us
        </button>

        {/* Downloads Dropdown */}
        <div className="group relative">
          
          <button className="flex items-center gap-2 bg-[#1f4aa8] px-6 py-4 text-sm font-medium text-white hover:bg-[#173983]">
            <Download size={18} />
            Downloads
          </button>

          <div className="absolute bottom-full right-0 mb-2  min-w-[260px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-2xl group-hover:block">
            
            {downloads.map((file, index) => (
              <a
                key={index}
                href={file.url}
                download
                className="flex items-center justify-between border-b px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 last:border-none"
              >
                <span>{file.name}</span>

                <Download
                  size={16}
                  className="text-blue-700"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}