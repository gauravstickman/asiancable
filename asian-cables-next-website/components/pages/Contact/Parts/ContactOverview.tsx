"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  MessageSquare,
  CircleAlert,
  Clock3,
} from "lucide-react";

export default function ContactOverview({ data }: { data?: any }) {
  return (
    <section className="bg-[#ffffff] pt-[130px]  pb-[40px] md:pt-[80px] md:pb-[80px]">
        
      <div className="mx-auto max-w-[1280px] px-5">
        <div className="grid gap-[40px] lg:grid-cols-[1fr_552px]">
          {/* Left */}
          <div className="max-w-[665px]">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-[14px] md:text-[16px] text-[#AAAAAA]">
              <Link href="/">Home</Link>
              <span>•</span>
              <span className="font-[500] text-[#4B4B4B]">Contact</span>
            </div>

            {/* Heading */}
            <h1 className="font-[magistral] text-[36px] leading-[140%] tracking-[5%] md:text-[72px] italic font-bold md:leading-[64px] md:tracking-[-3.6px] text-[#1E3C8C]">
              {data?.title || "Let's Connect"}
            </h1>

            <p className="mt-[32px] max-w-[520px] text-[16px] leading-[26px] md:text-[20px] md:leading-[36px] text-[#525252]">
              {data?.description || "Our team is ready to help with product inquiries, technical support, partnership opportunities, or any questions about Asian Cables."}
            </p>

            {/* Contact Info */}
            <div className="mt-[36px] md:mt-[47.7px] space-y-[16px] md:space-y-[30px]">
              {/* Address */}
                <div className="flex items-center gap-4 md:gap-6">
                <div className="h-[70px] min-w-[2px] md:h-[70px] md:w-[3px] bg-[linear-gradient(0deg,#3CAADF_0%,#F04123_50%,#FFD212_100%)]" />

                <MapPin
                  className="h-9 w-9 md:h-5.5 md:w-5.5 mt-1 text-[#1E3C8C]"
                />

                <div>
                  <p className="font-[600] text-[16px] leading-[24px] text-[#1E3C8C]">
                    {data?.addressTitle || "KEC Asian Cables Limited"}
                  </p>

                  <p className="text-[13px] leading-[19.5px] text-[#767676]">
                    {data?.addressDescription ? data.addressDescription.split('\n').map((line: string, i: number) => (
                      <span key={i}>{line}<br /></span>
                    )) : (
                      <>
                        16th Floor, RPG House, 463, Dr Annie Besant Rd,
                        Hanuman Nagar,
                        <br />
                        Worli, Mumbai, Maharashtra, 400030
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex items-center gap-6">
                <div className="h-[70px] min-w-[2px] md:h-[70px] md:w-[3px] bg-[linear-gradient(0deg,#3CAADF_0%,#F04123_50%,#FFD212_100%)]" />

                  <Phone
                    size={20}
                    className="mt-1 text-[#1E3C8C]"
                  />

                  <div>
                  <p className="font-[600] text-[16px] leading-[24px] text-[#1E3C8C]">
                      {data?.phoneTitle || "022 6667 0253"}
                    </p>

                  <p className="text-[13px] leading-[19.5px] text-[#767676]">
                      {data?.phoneSubtitle || "Mon-Sat, 9AM-6PM IST"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                <div className="h-[70px] min-w-[2px] md:h-[70px] md:w-[3px] bg-[linear-gradient(0deg,#3CAADF_0%,#F04123_50%,#FFD212_100%)]" />

                  <Mail
                    size={20}
                    className="mt-1 text-[#1E3C8C]"
                  />

                  <div>
                  <p className="font-[600] text-[16px] leading-[24px] text-[#1E3C8C]">
                      {data?.emailTitle || "contact@asiancables.com"}
                    </p>

                  <p className="text-[13px] leading-[19.5px] text-[#767676]">
                      {data?.emailSubtitle || "Response within 24 hours"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Distributor Button */}
              <Link
                href={data?.distributorLinkUrl || "#"}
                className="relative mt-[19px] rounded-[4px] group inline-flex h-[67px] w-full max-w-[410px] items-center justify-between bg-[#1E3C8C] px-8 text-white transition-all hover:bg-[#173170]"
              >
                                <div className="absolute left-0 h-[70px] w-[2px] md:h-[70px] md:w-[3px] bg-[linear-gradient(0deg,#3CAADF_0%,#F04123_50%,#FFD212_100%)]" />

                <div>
                  <div className="font-[600] text-[16px] leading-[24px]">
                    {data?.distributorTitle || "Find Distributor"}
                  </div>

                  <div className="text-[13px] leading-[19.5px] text-[#B1B1B1]">
                    {data?.distributorSubtitle || "Get distributor details around you"}
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Right Cards */}
          <div className="space-y-6">
            
            {/* Support */}
            <div className="bg-[#1E3C8C] p-5 md:p-8 text-white">
              <MessageSquare
                size={48}
                strokeWidth={1.5}
              />

              <h3 className="mt-6 font-[magistral] text-[30px] md:text-[32px] leading-[35.2px] italic font-bold leading-none">
                {data?.supportTitle || "Customer Support"}
              </h3>

              <p className="mt-3 text-[15px] leading-[25.5px] text-white/80">
                {data?.supportDescription || "Technical support, product queries, and after-sales assistance available round the clock."}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[14px] leading-[21px]">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
                {data?.supportStatus || "Online 24/7"}
              </div>
            </div>

            {/* Grievance */}
            <div className="border border-[#F04123] bg-white p-5 md:p-8">
              <CircleAlert
                size={48}
                className="text-[#F04123]"
                strokeWidth={2}
              />

              <h3 className="mt-6 font-[magistral] text-[30px] md:text-[32px] leading-[35.5px] italic font-bold leading-none text-[#1E3C8C]">
                {data?.grievanceTitle || "Grievance Redressal"}
              </h3>

              <p className="mt-3 text-[15px] leading-[25.5px] leading-[28px] text-[#1E3C8C]">
                {data?.grievanceDescription || "Report issues for prompt resolution. We guarantee response within 48 hours."}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[14px] leading-[21px] font-medium text-[#1E3C8C]">
                <Clock3 size={15} />
                {data?.grievanceStatus || "48hr Response Guaranteed"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}