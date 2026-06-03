"use client";

import { Award, MapPin, TrendingUp, Users } from "lucide-react";

export default function GovernanceSection() {
  const cards = [
    {
      title: "Consistent Quality & Accredited Testing",
      icon: (
        <img
          src="/assets/about/awardIcon.png"
          alt="Quality Icon"
          className="h-10 w-10"
        />
      ),
    },
    {
      title: "Proven Track Record in Critical Projects",
      icon: (
        <img
          src="/assets/about/mapIcon.png"
          alt="Track Record Icon"
          className="h-10 w-10"
        />
      ),
    },
    {
      title: "Custom Engineering & Application-Specific Solutions",
      icon: (
        <img
          src="/assets/about/mapIcon.png"
          alt="Map Pin Icon"
          className="h-10 w-10"
        />
      ),
    },
    {
      title: "Wide, End-to-End Product Portfolio",
      icon: (
        <img
          src="/assets/about/trendingIcon.png"
          alt="Trending Up Icon"
          className="h-10 w-10"
        />
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Bottom Right Background */}
      <img
        src="/assets/about/foudationIcon.png"
        alt=""
        className="pointer-events-none absolute right-0 bottom-0 z-0 object-contain"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4">
        {/* Heading */}
        <h2 className="mb-14 text-center text-[43px] leading-[1.15] font-bold text-[#1E3C8C] italic">
          Shaped by Governance. Built on Quality.
          <br />
          Proven across Critical Applications.
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-4 rounded-[4px] bg-[#FFFFFF] p-3">
          {/* Left Blue Card */}
          <div className="col-span-12 lg:col-span-6">
            <div className="h-full rounded-[8px] bg-[#1E3C8C] p-8 shadow-lg">
              <div className="mb-8">
                <img
                  src="/assets/about/teamsIcon.png"
                  alt="RPG Group Logo"
                  className="h-12 object-contain"
                />
              </div>

              <h3 className="mb-6 text-[43px] leading-[1.1] font-bold text-[#FFFFFF] italic">
                RPG Governance &
                <br />
                Institutional Credibility
              </h3>

              <p className="max-w-[480px] text-[15px] leading-[30px] font-normal text-[#FFFFFFE5]">
                Asian Cables operates under the governance framework of the RPG
                Group, one of India's most respected business groups, known for
                its professional management, ethical standards, and long-term
                value creation. This ensures transparency, accountability, and
                institutional reliability across operations and partnerships.
              </p>
            </div>
          </div>

          {/* Right Cards */}
          <div className="col-span-12 lg:col-span-6">
            <div className="grid h-full gap-4">
              {cards.slice(0, 2).map((card) => (
                <div
                  key={card.title}
                  className="group flex items-center gap-5 rounded-[8px] bg-[#F9F9F9] p-8 shadow-sm transition-all duration-300 hover:bg-[#1E3C8C]"
                >
                  <div className="text-[#1E3C8C] transition-colors duration-300 group-hover:text-[#F7A928]">
                    {card.icon}
                  </div>

                  <h4 className="text-[24px] font-bold text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          {cards.slice(2).map((card) => (
            <div key={card.title} className="col-span-12 md:col-span-6">
              <div className="group flex h-[160px] items-center gap-5 rounded-[4px] bg-[#F9F9F9] p-8 shadow-sm transition-all duration-300 hover:bg-[#1E3C8C]">
                <div className="text-[#1E3C8C] transition-colors duration-300 group-hover:text-[#F7A928]">
                  {card.icon}
                </div>

                <h4 className="text-[24px] font-bold text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
