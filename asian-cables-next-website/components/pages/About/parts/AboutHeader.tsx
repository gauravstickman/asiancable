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
        <div className="relative z-10 mx-auto ml-13 w-full px-8 pt-40 pb-[60px] text-white">
          {/* Breadcrumb */}
          <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-white/75 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-bold text-white">{item.label}</span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <Dot className="h-6 w-6 text-white" />
                )}
              </React.Fragment>
            ))}
          </nav>
          {/* Heading */}
          <h1 className="mb-5 text-[54px] leading-[1.08] font-black tracking-[-2px] text-white italic">
            Reliability, <span className="block italic">Redefined.</span>
          </h1>
          {/* Stats */}
          <div className="mt-35 flex flex-wrap items-start gap-[55px]">
            {stats.map((stat) => (
              <div key={stat.value} className="relative">
                <p
                  className={`relative z-10 m-0 text-[45px] leading-none font-black text-white ${stat.value !== "2" ? "italic" : ""} `}
                >
                  {stat.value}
                </p>
                <div className="mt-3">
                  <p className="text-[12px] font-medium text-[#FFFFFFB5]">
                    {stat.line1}
                  </p>

                  <p className="text-[12px] font-medium text-[#FFFFFFB5]">
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
