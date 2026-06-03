import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function ClienteleHeader() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Clientele" }];
  const stats = [
    {
      value: "2500+",
      label: "Employees",
      highlight: false,
    },
    {
      value: "15+",
      label: "Locations",
      highlight: true,
    },
    {
      value: "50+",
      label: "Open Positions",
      highlight: false,
    },
  ];
  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/clientele/clienteleheaderIcons.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Content */}
        <div className="relative z-10 mx-auto ml-13 w-full px-8 pt-45 pb-[60px] text-white">
          {/* Breadcrumb */}
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs">
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
          <h1 className="mb-5 text-[68px] leading-[1.08] font-black tracking-[-2px] text-white italic">
            Trusted By <span className="block">Industry Leaders</span>
          </h1>

          {/* Stats */}
          <div className="mt-35 flex flex-wrap items-start gap-[55px]">
            {stats.map((stat) => (
              <div key={stat.label} className="relative">
                <p
                  className={`relative z-10 m-0 text-[50px] leading-none font-black text-white italic ${stat.value !== "2" ? "italic" : ""} `}
                >
                  {stat.value}
                </p>

                <p
                  className={`mt-2 text-[13px] font-normal tracking-[0.02em] italic ${
                    stat.highlight ? "relative z-0 text-white" : "text-white"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClienteleHeader;
