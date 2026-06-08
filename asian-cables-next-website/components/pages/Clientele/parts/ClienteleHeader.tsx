import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function ClienteleHeader({ data }: { data?: any }) {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Clientele" }];

  const stats = data?.heroStats?.length ? data.heroStats : [
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

  const titleLines = data?.heroTitle
    ? data.heroTitle.split('\n')
    : ["Trusted By", "Industry Leaders"];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative md:min-h-[613px] overflow-hidden">
        {/* Background Image */}
        <img
          src={data?.heroDesktopImage || "/assets/clientele/clienteleheaderIcons.png"}
          alt="Clientele Hero"
          className="absolute inset-0 h-full w-full object-cover object-center hidden md:block"
        />
        <img
          src={data?.heroMobileImage || data?.heroDesktopImage || "/assets/clientele/clienteleheaderIcons.png"}
          alt="Clientele Hero Mobile"
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.2)_50%,_rgba(0,0,0,0.6)_100%)]" />

        <div className="relative z-10 m-auto max-w-[1280px] px-5 md:px-0 pt-45 pb-[60px] text-white">
          <nav className="md:mb-7 flex flex-wrap items-center md:gap-1.5 text-xs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-worksans text-[14px] md:text-[16px] leading-[36px] font-normal text-[#FFFFFFD4]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-worksans text-[14px] md:text-[16px]  leading-[36px] font-medium tracking-[0px] text-[#FFFFFF]">
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
          <h1 className="font-[Magistral] text-[36px] leading-[140%] md:text-[54px] md:leading-[64.6px] font-bold tracking-[-1.44px] italic">
            {titleLines.length > 1 ? (
              <>
                {titleLines[0]}<br />
                {titleLines.slice(1).join(" ")}
              </>
            ) : (
              data?.heroTitle || "Trusted By Industry Leaders"
            )}
          </h1>
          {/* Stats */}
          <div className="mt-10 md:mt-18 flex flex-wrap items-start gap-5 md:gap-[55px]">
            {stats.map((stat: any) => (
              <div key={stat.label} className="relative md:w-[auto] w-[45%]">
                <p className="relative font-[magistral] text-[24px] leading-[50px] md:text-[38px] md:leading-[83.02px] font-bold text-white italic">
                  {stat.value}
                </p>
                <p className="relative font-worksans text-[14px] md:leading-[21px] md:text-[15.81px] md:leading-[23.72px] font-medium text-[#FFFFFFB5]">
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
