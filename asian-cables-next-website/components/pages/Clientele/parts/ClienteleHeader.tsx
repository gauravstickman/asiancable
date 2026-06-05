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
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/clientele/clienteleheaderIcons.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 mx-auto px-2 max-w-7xl pt-60 pb-[60px] text-white">
          <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-xs">
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
          <h1 className="font-[Magistral] text-[68px] leading-[64.6px] font-bold tracking-[-1.44px] text-white italic">
            Trusted By{" "}
            <span className="block font-[Magistral] text-[68px] leading-[64.6px] font-bold tracking-[-1.44px] italic">
              Industry Leaders
            </span>
          </h1>
          {/* Stats */}
          <div className="mt-15 flex flex-wrap items-start gap-[49px]">
            {stats.map((stat) => (
              <div key={stat.label} className="relative">
                <p className="relative font-[magistral] text-[36px] leading-[83.02px] font-bold text-white italic">
                  {stat.value}
                </p>
                <p className="relative font-[work_sans] text-[15.81px] leading-[23.72px] font-medium text-[#FFFFFFB5]">
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
