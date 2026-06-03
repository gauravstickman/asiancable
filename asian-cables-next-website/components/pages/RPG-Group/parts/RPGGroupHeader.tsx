// import { Dot } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// function ManufacturingHeader() {
//   const breadcrumbs = [
//     { label: "Home", href: "/" },
//     { label: "The Company", href: "/company" },
//     { label: "Manufacturing" },
//   ];
//   const stats = [
//     {
//       value: "2",
//       label: "Production Facilities",
//       highlight: false,
//     },
//     {
//       value: "3600 KM",
//       label: "Annual Manufacturing Capacity",
//       highlight: true,
//     },
//     {
//       value: "Up to 220 kV",
//       label: "Voltage Capability",
//       highlight: false,
//     },
//   ];
//   return (
//     <main className="bg-white text-slate-900">
//       <section className="relative min-h-[700px] overflow-hidden">
//         {/* Background Image */}
//         <img
//           src="/assets/rpggroup/rpgheaderIcon.png"
//           alt="Manufacturing Hero"
//           className="absolute inset-0 h-full w-full object-cover object-center"
//         />
//         {/* Content */}
//         <div className="relative z-50 mx-auto ml-13 w-full px-8 pt-40 pb-[60px] text-white">
//           {/* Breadcrumb */}
//           <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-xs">
//             {breadcrumbs.map((item, index) => (
//               <React.Fragment key={item.label}>
//                 {item.href ? (
//                   <Link
//                     href={item.href}
//                     className="text-white/75 transition-colors duration-300 hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 ) : (
//                   <span className="font-bold text-white">{item.label}</span>
//                 )}

//                 {index < breadcrumbs.length - 1 && (
//                   <Dot className="h-6 w-6 text-white" />
//                 )}
//               </React.Fragment>
//             ))}
//           </nav>

//           {/* Heading */}
//           <h1 className="mb-5 text-[54px] leading-[1.08] font-black tracking-[-2px] text-[#1E3C8C] italic">
//             RPG GROUP <br /> Powered by Passion. Driven <br/> by Ethics.
//           </h1>
//           {/* Subtitle */}
//           <p className="max-w-1/3 text-[18px] leading-[1.65] font-normal text-[#FFFFFF]">
//            For nearly four decades, Asian Cables has been at the forefront of cable manufacturing excellence
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default ManufacturingHeader;



"use client";

import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function ManufacturingHeader() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Leadership" },
  ];

  return (
    <section className="relative h-screen min-h-[760px] overflow-hidden bg-white">
      {/* Background Image */}

      <img
        src="/assets/rpggroup/rpgheaderIcon.png"
        alt="RPG Group"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* White Fade Overlay */}

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/92 via-[42%] to-transparent" />

      {/* Soft Extra Blur Layer */}

      <div className="absolute inset-0 z-10 bg-white/8 backdrop-blur-[1px]" />

      {/* Content Container */}

      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          {/* Left Content */}

          <div className="max-w-[760px] pt-10">
            {/* Breadcrumb */}

            <nav className="mb-10 flex items-center gap-1 text-[14px]">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-medium text-[#9A9A9A] transition-colors duration-300 hover:text-[#1E3C8C]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-[#5B5B5B]">
                      {item.label}
                    </span>
                  )}

                  {index < breadcrumbs.length - 1 && (
                    <Dot className="h-4 w-4 text-[#BEBEBE]" />
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Main Heading */}

            <h1 className="max-w-[900px] text-[56px] leading-[0.95] font-black italic tracking-[-3px] text-[#1E3C8C] lg:text-[74px]">
              RPG GROUP
              <br />
              Powered by Passion.
              <br />
              Driven by Ethics.
            </h1>

            {/* Description */}

            <p className="mt-10 max-w-[620px] text-[22px] leading-[1.6] font-normal text-[#6F6F6F]">
              For nearly four decades, Asian Cables has been at the
              forefront of cable manufacturing excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManufacturingHeader;