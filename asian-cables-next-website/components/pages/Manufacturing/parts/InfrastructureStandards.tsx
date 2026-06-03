// import React from "react";

// const highlightedCards = [
//   {
//     id: 1,
//     title: "Standards-Led Manufacturing",
//     description:
//       "Manufacturing is aligned to internationally recognised standards including IEC, BS, AS/NZS, and IS, ensuring consistent performance across diverse infrastructure applications.",
//     detail:
//       "This enables seamless integration into global projects across utilities, industrial systems, and specialised environments.",
//     image: "/assets/manufacturing/AC Foundation-04 1.png",
//     label: "Built for Global Infrastructure Standards",
//   },
//   {
//     id: 2,
//     title: "Advanced Technology",
//     description:
//       "Integrated production processes with controlled manufacturing and in-line quality checks ensure precision, repeatability, and consistency across product categories.",
//     image: "/assets/manufacturing/image 2.png",
//   },
//   {
//     id: 3,
//     title: "Sustainable Operations",
//     description:
//       "Manufacturing facilities operate with renewable energy integration, water recycling systems, and energy-efficient processes, reducing environmental impact across operations.",
//     image: "/assets/manufacturing/image 4 (1).png",
//   },
// ];

// const certificationCards = [
//   {
//     id: 1,
//     title: "NABL Accreditation",
//     description: "Testing laboratory accreditation",
//     icon: "/assets/manufacturing/CheckCircle2 (1).png",
//   },
//   {
//     id: 2,
//     title: "IEC",
//     description: "International Electrotechnical Commission",
//     icon: "/assets/manufacturing/CheckCircle2 (2).png",
//   },
//   {
//     id: 3,
//     title: "DSIR Recognition",
//     description: "In-house R&D approved by Government of India",
//     icon: "/assets/manufacturing/CheckCircle2 (3).png",
//   },
//   {
//     id: 4,
//     title: "IGBC Platinum Rating",
//     description: "Green factory certification (Vadodara facility)",
//     icon: "/assets/manufacturing/CheckCircle2 (4).png",
//   },
//   {
//     id: 5,
//     title: "ASTM",
//     description: "American Society for Testing and Materials",
//     icon: "/assets/manufacturing/CheckCircle2 (5).png",
//   },
// ];

// const infrastructureData = [
//   {
//     title: "90+",
//     subtitle: "Countries Served",
//   },
//   {
//     title: "Multi-Standard Compliance",
//     subtitle: "IEC | BS | IS | AS/NZS",
//   },
//   {
//     title: "End-to-End Integration",
//     subtitle: "Utilities | Infra | Industrial",
//   },
// ];;

// function InfrastructureStandards() {
//   return (
//     <section className="w-full bg-[#1E3C8C] py-20">
//       <div className="mx-auto w-[90vw] max-w-[1400px]">
//         <div className="mb-10 text-center">
//           <p className="text-[44px] font-extrabold text-[#FFFFFF] italic">
//             Built for Global Infrastructure Standards
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
//         <article className="relative overflow-hidden rounded-[6px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.16)]">
//   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,60,140,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.97))]" />
  
//   <div
//     className="pointer-events-none absolute top-0 left-0 h-full w-[55%] bg-cover bg-left bg-no-repeat opacity-90"
//     style={{
//       backgroundImage: "url('/assets/manufacturing/bgImage.png')",
//       backgroundPosition: "left center",
//     }}
//   />
  
//   {/* Wire Image - positioned inside the box at bottom left */}
//   <div
//     className="pointer-events-none absolute bottom-0 left-0 z-20"
//     style={{
//       backgroundImage: "url('/assets/manufacturing/wireImage.png')",
//       backgroundSize: "contain",
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "bottom left",
//       width: "400px",
//       height: "500px",
//       marginBottom: "0",
//       marginLeft: "0",
//     }}
//   />
  
//   {/* Content - Positioned on the RIGHT side */}
//   <div className="relative z-10 flex sm:p-10 lg:p-12">
//     <div className="max-w-xl text-left">
//       {/* Title */}
//       <h2 className="text-[30px] font-extrabold text-[#1E3C8C] italic">
//         Standards-Led Manufacturing
//       </h2>

//       {/* Description */}
//       <div className="mt-6 space-y-4">
//         <p className="text-[19px] font-normal text-[#1E3C8C]">
//           Manufacturing is aligned to internationally recognised standards including IEC, BS, AS/NZS, and IS, ensuring consistent performance across diverse infrastructure applications. This enables seamless integration into global projects across utilities, industrial systems, and specialised environments.
//         </p>
//       </div>

//       <div className="space-y-6 mt-4">
//         {infrastructureData.map((items, index) => (
//           <div key={index}>
//             <h4 className="text-[22px] font-extrabold text-[#1E3C8C] italic">
//               {items.title}
//             </h4>

//             <p className="mt-1 text-[15px] font-normal text-[#1E3C8C]">
//               {items.subtitle}
//             </p>
//             <div
//               className="my-3 h-0.5 w-18"
//               style={{
//                 background: "linear-gradient(90deg, #3CAADF 0%, #F04123 50%, #FFD212 100%)",
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </article>

//           <div className="grid gap-6">
//             {highlightedCards.slice(1).map((card) => (
//               <article
//                 key={card.id}
//                 className="relative overflow-hidden rounded-[6px] bg-slate-950 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
//               >
//                 <div
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{ backgroundImage: `url('${card.image}')` }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />
//                 <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
//                   <h3 className="mt-6 text-[24px] leading-tight font-bold text-[#FFFFFF] italic">
//                     {card.title}
//                   </h3>
//                   <p className="mt-4 text-[16px] font-normal text-[#FFFFFF]">
//                     {card.description}
//                   </p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//         <div className="mt-14 ">
//           <p className="px-4 text-center text-[24px] font-extrabold text-[#FFFFFF] italic">
//             Certifications & Standards
//           </p>

//           {/* CAROUSEL - Full width, no gaps */}
//           <div className="relative right-1/2 left-1/2 mt-8 -mr-[50vw] -ml-[50vw] w-screen">
//             <div className="overflow-hidden">
//               <div className="animate-marquee flex w-max gap-4 md:gap-5">
//                 {/* FIRST SET */}
//                 {certificationCards.map((card, index) => (
//                   <div
//                     key={index}
//                     className="flex h-[180px] w-[250px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[18px] bg-[#F9F9F9] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:shadow-xl"
//                   >
//                     <div className="rounded-[18px] bg-[#F7F9FF] p-3">
//                       <img
//                         src={card.icon}
//                         alt={card.title}
//                         className="h-11 w-11 object-contain"
//                       />
//                     </div>
//                     <h4 className="mt-2 text-center text-[20px] font-semibold text-[#0A0A0A]">
//                       {card.title}
//                     </h4>
//                     <p className="mt-1 text-center text-[14px] font-normal text-[#0A0A0A]">
//                       {card.description}
//                     </p>
//                   </div>
//                 ))}

//                 {/* DUPLICATE SET */}
//                 {certificationCards.map((card, index) => (
//                   <div
//                     key={`duplicate-${index}`}
//                     className="flex h-[180px] w-[250px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[18px] bg-[#F9F9F9] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:shadow-xl"
//                   >
//                     <div className="rounded-[18px] bg-[#F7F9FF] p-3">
//                       <img
//                         src={card.icon}
//                         alt={card.title}
//                         className="h-11 w-11 object-contain"
//                       />
//                     </div>
//                     <h4 className="mt-2 text-center text-[20px] font-semibold text-[#0A0A0A]">
//                       {card.title}
//                     </h4>
//                     <p className="mt-1 text-center text-[14px] font-normal text-[#0A0A0A]">
//                       {card.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default InfrastructureStandards;\



import React from "react";

const highlightedCards = [
  {
    id: 1,
    title: "Standards-Led Manufacturing",
    description:
      "Manufacturing is aligned to internationally recognised standards including IEC, BS, AS/NZS, and IS, ensuring consistent performance across diverse infrastructure applications.",
    detail:
      "This enables seamless integration into global projects across utilities, industrial systems, and specialised environments.",
    image: "/assets/manufacturing/AC Foundation-04 1.png",
    label: "Built for Global Infrastructure Standards",
  },
  {
    id: 2,
    title: "Advanced Technology",
    description:
      "Integrated production processes with controlled manufacturing and in-line quality checks ensure precision, repeatability, and consistency across product categories.",
    image: "/assets/manufacturing/image 2.png",
  },
  {
    id: 3,
    title: "Sustainable Operations",
    description:
      "Manufacturing facilities operate with renewable energy integration, water recycling systems, and energy-efficient processes, reducing environmental impact across operations.",
    image: "/assets/manufacturing/image 4 (1).png",
  },
];

const certificationCards = [
  {
    id: 1,
    title: "NABL Accreditation",
    description: "Testing laboratory accreditation",
    icon: "/assets/manufacturing/CheckCircle2 (1).png",
  },
  {
    id: 2,
    title: "IEC",
    description: "International Electrotechnical Commission",
    icon: "/assets/manufacturing/CheckCircle2 (2).png",
  },
  {
    id: 3,
    title: "DSIR Recognition",
    description: "In-house R&D approved by Government of India",
    icon: "/assets/manufacturing/CheckCircle2 (3).png",
  },
  {
    id: 4,
    title: "IGBC Platinum Rating",
    description: "Green factory certification (Vadodara facility)",
    icon: "/assets/manufacturing/CheckCircle2 (4).png",
  },
  {
    id: 5,
    title: "ASTM",
    description: "American Society for Testing and Materials",
    icon: "/assets/manufacturing/CheckCircle2 (5).png",
  },
];

const infrastructureData = [
  {
    title: "90+",
    subtitle: "Countries Served",
  },
  {
    title: "Multi-Standard Compliance",
    subtitle: "IEC | BS | IS | AS/NZS",
  },
  {
    title: "End-to-End Integration",
    subtitle: "Utilities | Infra | Industrial",
  },
];

function InfrastructureStandards() {
  return (
    <section className="w-full bg-[#1E3C8C] py-20 relative overflow-hidden">
      <div className="mx-auto w-[90vw] max-w-[1400px] relative z-10">
        
        {/* Heading with Wire Image positioned nearby */}
        <div className="relative mb-10 text-center h-full">
          <div
            className="pointer-events-none absolute z-20 "
            style={{
              backgroundImage: "url('/assets/manufacturing/wireImage.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "300px",
              height: "1350px",
              top: "0",
              left: "-100px",
              bottom: "-10",
            }}
          />
          
          <p className="text-[44px] font-extrabold text-[#FFFFFF] italic relative z-10">
            Built for Global Infrastructure Standards
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="relative overflow-hidden rounded-[6px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,60,140,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.97))]" />
            
            <div
              className="pointer-events-none absolute top-0 left-0 h-full w-[55%] bg-cover bg-left bg-no-repeat opacity-90"
              style={{
                backgroundImage: "url('/assets/manufacturing/bgImage.png')",
                backgroundPosition: "left center",
              }}
            />
            
            {/* Content - Positioned on the RIGHT side */}
            <div className="relative z-10 flex sm:p-10 lg:p-12">
              <div className="max-w-xl text-left">
                {/* Title */}
                <h2 className="text-[30px] font-extrabold text-[#1E3C8C] italic">
                  Standards-Led Manufacturing
                </h2>

                {/* Description */}
                <div className="mt-6 space-y-4">
                  <p className="text-[19px] font-normal text-[#1E3C8C]">
                    Manufacturing is aligned to internationally recognised standards including IEC, BS, AS/NZS, and IS, ensuring consistent performance across diverse infrastructure applications. This enables seamless integration into global projects across utilities, industrial systems, and specialised environments.
                  </p>
                </div>

                <div className="space-y-6 mt-4">
                  {infrastructureData.map((items, index) => (
                    <div key={index}>
                      <h4 className="text-[22px] font-extrabold text-[#1E3C8C] italic">
                        {items.title}
                      </h4>

                      <p className="mt-1 text-[15px] font-normal text-[#1E3C8C]">
                        {items.subtitle}
                      </p>
                      <div
                        className="my-3 h-0.5 w-18"
                        style={{
                          background: "linear-gradient(90deg, #3CAADF 0%, #F04123 50%, #FFD212 100%)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {highlightedCards.slice(1).map((card) => (
              <article
                key={card.id}
                className="relative overflow-hidden rounded-[6px] bg-slate-950 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />
                <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
                  <h3 className="mt-6 text-[24px] leading-tight font-bold text-[#FFFFFF] italic">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[16px] font-normal text-[#FFFFFF]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="mt-14">
          <p className="px-4 text-center text-[24px] font-extrabold text-[#FFFFFF] italic">
            Certifications & Standards
          </p>

          {/* CAROUSEL - Full width, no gaps */}
          <div className="relative right-1/2 left-1/2 mt-8 -mr-[50vw] -ml-[50vw] w-screen">
            <div className="overflow-hidden">
              <div className="animate-marquee flex w-max gap-4 md:gap-5">
                {/* FIRST SET */}
                {certificationCards.map((card, index) => (
                  <div
                    key={index}
                    className="flex h-[180px] w-[250px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[18px] bg-[#F9F9F9] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="rounded-[18px] bg-[#F7F9FF] p-3">
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="h-11 w-11 object-contain"
                      />
                    </div>
                    <h4 className="mt-2 text-center text-[20px] font-semibold text-[#0A0A0A]">
                      {card.title}
                    </h4>
                    <p className="mt-1 text-center text-[14px] font-normal text-[#0A0A0A]">
                      {card.description}
                    </p>
                  </div>
                ))}

                {/* DUPLICATE SET */}
                {certificationCards.map((card, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex h-[180px] w-[250px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[18px] bg-[#F9F9F9] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="rounded-[18px] bg-[#F7F9FF] p-3">
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="h-11 w-11 object-contain"
                      />
                    </div>
                    <h4 className="mt-2 text-center text-[20px] font-semibold text-[#0A0A0A]">
                      {card.title}
                    </h4>
                    <p className="mt-1 text-center text-[14px] font-normal text-[#0A0A0A]">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfrastructureStandards;
