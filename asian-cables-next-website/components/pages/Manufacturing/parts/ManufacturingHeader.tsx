import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function ManufacturingHeader() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Manufacturing" },
  ];
  const stats = [
    {
      value: "2",
      label: "Production Facilities",
      highlight: false,
    },
    {
      value: "3600 KM",
      label: "Annual Manufacturing Capacity",
      highlight: true,
    },
    {
      value: "Up to 220 kV",
      label: "Voltage Capability",
      highlight: false,
    },
  ];
  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/manufacturing/Rectangle 2707.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(30,40,52,0.72) 0%, rgba(30,40,52,0.45) 38%, rgba(30,40,52,0.12) 65%, rgba(30,40,52,0.0) 100%)",
          }}
        />
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-3 pt-45 pb-[60px] text-white">
          {/* Breadcrumb */}
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
          <h1 className="font-[Magistral] text-[54px] leading-[64.6px] font-bold tracking-[-1.44px] italic">
            Precision led Manufacturing
          </h1>

          {/* Subtitle */}
          <p className="pt-[10px] font-[Work_Sans] text-[20px] leading-[33px] font-normal tracking-[-0.5px]">
            Integrated manufacturing facilities built for scale,
            <br />
            precision, and consistent quality.
          </p>

          {/* Stats */}
          <div className="mt-18 flex flex-wrap items-start gap-[55px]">
            {stats.map((stat) => (
              <div key={stat.label} className="relative">
                {stat.highlight && (
                  <div
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[220px] -translate-x-1/2 -translate-y-1/2 opacity-90 blur-[80px]"
                    style={{
                      background: `
                              radial-gradient(
                                ellipse at center,
                                #7A1F0A 0%,
                                #8B250F 25%,
                                #B54708 55%,
                                #D97706 80%,
                                transparent 100%
                              )
                            `,
                    }}
                  />
                )}

                <p className="relative font-[magistral] text-[38px] leading-[83.02px] font-bold text-white italic">
                  {stat.value}
                </p>
                <p className="relative font-worksans text-[15.81px] leading-[23.72px] font-medium text-[#FFFFFFB5]">
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

export default ManufacturingHeader;
