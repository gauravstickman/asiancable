
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
            Precision led Manufacturing
          </h1>

          {/* Subtitle */}
          <p className="max-w-1/3 text-[18px] leading-[1.65] font-normal text-[#FFFFFF]">
            Integrated manufacturing facilities built for scale, precision, and
            consistent quality.
          </p>

          {/* Stats */}
          <div className="mt-35 flex flex-wrap items-start gap-[55px]">
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

                <p
                  className={`relative z-10 m-0 text-[45px] leading-none font-black text-white ${stat.value !== "2" ? "italic" : ""} `}
                >
                  {stat.value}
                </p>

                <p
                  className={`mt-2 text-[11px] font-normal tracking-[0.02em] ${
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

export default ManufacturingHeader;
