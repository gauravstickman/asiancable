import {
  ChevronRight, Check} from "lucide-react";
export default function ProductRangeSection() {
  const products = [
    {
      title: "Specialty Cables",
      image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1400&auto=format&fit=crop",
      large: true,
      points: [
        "Fire-Survival & LSZH",
        "Solar & EV Charging Ready",
        "Oil & Gas Rated",
      ],
    },
    {
      title: "Power Cables",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
      points: [
        "Up to 220 kV",
        "Single & Multicore",
        "Factory-Tested",
      ],
    },
    {
      title: "Railway Cables",
      image:
        "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop",
      points: [
        "Contact & Catenary Wires",
        "Signaling & Quad Cables",
        "Fire-Survival for Tunnels",
      ],
    },
    {
      title: "Control & Instrumentation",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
      points: [
        "Screened & Armoured",
        "FR / FRLS / LSZH",
        "Up to 61+ Cores",
      ],
    },
    {
      title: "Conductors",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
      points: [
        "AAC, AAAC, ACSR, Al 59",
        "Overhead Transmission",
        "High-Temperature Rated",
      ],
    },
    {
      title: "Telecom & OFC",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
      wide: true,
      points: [
        "Single & Multi-Mode Fibre",
        "Up to 288+ Fibre Counts",
        "ADSS & Armoured Options",
      ],
    },
  ];

  return (
    <section className="bg-[#f5f5f5] py-20 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-[46px] leading-none font-black italic text-[#1E3C8C] mb-4">
            Our Products Range
          </h2>

          <p className="text-[24px] text-[#5E7BC0] font-medium">
            End-to-End Cable Systems. One Reliable Partner.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* LEFT BIG CARD */}
          <div className="col-span-12 lg:col-span-4">
            <div className="relative h-[650px] rounded-[8px] overflow-hidden group">
              
              <img
                src={products[0].image}
                alt={products[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* TITLE */}
              <div className="absolute top-6 left-6">
                <h3 className="text-white text-[34px] font-black italic">
                  {products[0].title}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="space-y-3">
                  {products[0].points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-white text-[16px]"
                    >
                      <span><Check size={16}/></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute right-0 bottom-0 flex justify-end">
                  <button className="text-white text-[16px] flex items-center gap-2">
                    Read More
                    <span><ChevronRight size={16}/></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
            
            {/* TOP ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CARD */}
              {products.slice(1, 3).map((item, index) => (
                <div
                  key={index}
                  className="relative h-[315px] rounded-[8px] overflow-hidden group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* TITLE */}
                  <div className="absolute top-5 left-5">
                    <h3 className="text-white text-[30px] font-black italic">
                      {item.title}
                    </h3>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="space-y-2">
                      {item.points.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-white text-[15px]"
                        >
                          <span><Check size={16}/></span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute right-0 bottom-0 flex justify-end">
                      <button className="text-white text-[15px] flex items-center gap-2">
                        Read More
                        <span><ChevronRight size={16}/></span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {products.slice(3, 5).map((item, index) => (
                <div
                  key={index}
                  className="relative h-[315px] rounded-[8px] overflow-hidden group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* TITLE */}
                  <div className="absolute top-5 left-5">
                    <h3 className="text-white text-[28px] font-black italic max-w-[300px] leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="space-y-2">
                      {item.points.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-white text-[15px]"
                        >
                          <span><Check size={16}/></span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute right-0 bottom-0 flex justify-end">
                      <button className="text-white text-[15px] flex items-center gap-2">
                        Read More
                        <span><ChevronRight size={15} /></span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

       

          </div>

              {/* BOTTOM WIDE CARD */}
            <div className="relative h-[299px] rounded-[8px] overflow-hidden group w-[100%] lg:col-span-12">
              
              <img
                src={products[5].image}
                alt={products[5].title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* TITLE */}
              <div className="absolute top-6 left-6">
                <h3 className="text-white text-[34px] font-black italic">
                  {products[5].title}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="space-y-3">
                  {products[5].points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-white text-[16px]"
                    >
                      <span><Check size={16}/></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute right-0 bottom-0 flex justify-end absolute right-0 bottom-0">
                  <button className="text-white text-[16px] flex items-center gap-2">
                    Read More
                    <span>›</span>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
  <button className="w-[162px] h-[48px] bg-[#1E3C8C] rounded-[5.52px]  flex items-center justify-center gap-[6px] mx-auto text-white text-[20px] font-medium hover:bg-[#163174] transition mt-10">
  View All
  <span> <ChevronRight size={18} /></span>
</button>
    </section>
  );
}