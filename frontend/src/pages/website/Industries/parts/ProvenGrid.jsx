import { Award } from 'lucide-react';

export default function ProvenProjects() {
  const projects = [
    {
      company: "ONGC",
      title: "Offshore Platform Electrification",
      description:
        "Complete cable solution for offshore drilling platform in the Arabian Sea.",
      image: "/src/assets/ip1.png",
      large: true,
      tags: ["High Efficiency", "High Load Capacity"],
    },
    {
      company: "ONGC",
      title: "Refinery Power Distribution",
      description:
        "High-voltage cables for refinery power distribution systems.",
       image: "/src/assets/ip2.jpg",
      tags: ["High Efficiency", "High Load Capacity"],
    },
  ];

  return (
    <section className="bg-[#ffffff] py-24 mt-24 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-10">

          <h2 className="text-[#1E3C8C] text-[46px] leading-none font-black italic mb-5">
            Proven In The Field
          </h2>

          <p className="text-[#6A7EB7] text-[18px]">
            Real projects. Demanding environments. Reliable outcomes.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* LARGE CARD */}
          <div className="lg:col-span-7">

            <div className="relative h-[620px] rounded-[6px] overflow-hidden group">

              {/* IMAGE */}
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">

                {/* COMPANY */}
                <div className="mb-4">

                  <div className="inline-flex items-center gap-2 h-[38px] px-4 rounded-[4px] bg-white/15 backdrop-blur-md border border-white/10">

                    <Award size={20} color='#ffffff' />

                    <span className="text-white text-[14px] font-medium">
                      {projects[0].company}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-white text-[28px] leading-[1.7] font-black italic mb-3 max-w-[90%]">
                  {projects[0].title}
                </h3>

                {/* DESC */}
                <p className="text-white/85 text-[18px] leading-[1.8] max-w-[85%] mb-4">
                  {projects[0].description}
                </p>

                {/* TAGS */}
                <div className="flex items-center gap-3">

                  {projects[0].tags.map((tag, index) => (
                    <div
                      key={index}
                      className="h-[42px] px-5 rounded-[4px] bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-[14px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARD */}
          <div className="lg:col-span-5">

            <div className="relative h-[620px] rounded-[6px] overflow-hidden group">

              {/* IMAGE */}
              <img
                src={projects[1].image}
                alt={projects[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">

                {/* COMPANY */}
                <div className="mb-4">

                  <div className="inline-flex items-center gap-2 h-[38px] px-4 rounded-[4px] bg-white/15 backdrop-blur-md border border-white/10">

                   <Award size={20} color='#ffffff' />

                    <span className="text-white text-[14px] font-medium">
                      {projects[1].company}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-white text-[28px] leading-[1.7] font-black italic mb-3">
                  {projects[1].title}
                </h3>

                {/* DESC */}
                <p className="text-white/85 text-[18px] leading-[1.8] mb-5">
                  {projects[1].description}
                </p>

                {/* TAGS */}
                <div className="flex items-center gap-3">

                  {projects[1].tags.map((tag, index) => (
                    <div
                      key={index}
                      className="h-[42px] px-5 rounded-[4px] bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-[14px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}