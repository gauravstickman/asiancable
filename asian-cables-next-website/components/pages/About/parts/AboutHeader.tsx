import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function AboutHeader() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "About" },
  ];

  const stats = [
    {
      value: "90+",
      line1: "Countries.",
      line2: "A strong global presence.",
    },
    {
      value: "6+",
      line1: "Decades of",
      line2: "Cable Manufacturing Expertise",
    },
    {
      value: "3600 KM",
      line1: "Annual",
      line2: "Manufacturing Capacity",
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/about/aboutbgIcon.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-3 pt-60 pb-[60px] text-white">
          {/* Breadcrumb */}
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-worksans text-[16px] leading-[36px] font-normal text-[#FFFFFFD4]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-worksans text-[16px] leading-[36px] font-medium tracking-[0px] text-[#FFFFFF]">
                    {item.label}
                  </span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <Dot className="h-6 w-6 text-white" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Heading */}
          <h1 className="font-[magistral] text-[68px] leading-[64.6px] tracking-[-1.44px] font-bold italic">
            Reliability,
            <span className="block font-[magistral] text-[68px] leading-[64.6px] tracking-[-1.44px] font-bold italic">
              Redefined.
            </span>
          </h1>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap items-start gap-36">
            {stats.map((stat) => (
              <div key={stat.value}>
                <p className="font-[magistral] text-[38px] leading-[83.02px] font-bold italic text-white">
                  {stat.value}
                </p>

                <div>
                  <p className="font-worksans text-[15.81px] leading-[23.72px] font-medium text-[#FFFFFFB5]">
                    {stat.line1}
                  </p>

                  <p className="font-worksans text-[15.81px] leading-[23.72px] font-medium text-[#FFFFFFB5]">
                    {stat.line2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutHeader;