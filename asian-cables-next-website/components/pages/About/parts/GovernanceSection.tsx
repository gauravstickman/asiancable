"use client";

const cards = [
  {
    title: "Consistent Quality & Accredited Testing",
    icon: "/assets/about/awardIcon.png",
  },
  {
    title: "Proven Track Record in Critical Projects",
    icon: "/assets/about/mapIcon.png",
  },
  {
    title: "Custom Engineering & Application",
    title1: "Specific Solutions",
    icon: "/assets/about/mapIcon.png",
  },
  {
    title: "Wide, End-to-End Product Portfolio",
    icon: "/assets/about/trendingIcon.png",
  },
];
const governanceContent = [
  {
    icon: "/assets/about/teamsIcon.png",
    alt: "RPG Group",
    title: ["RPG Governance &", "Institutional Credibility"],
    description:
      "Asian Cables operates under the governance framework of the RPG Group, one of India's most respected business groups, known for its professional management, ethical standards, and long-term value creation. This ensures transparency, accountability, and institutional reliability across operations and partnerships.",
  },
];

function  FeatureCard({
  title,
  title1,
  icon,
  tall = false,
}: {
  title: string;
  icon: string;
  title1?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`group flex w-full rounded-[3.9px] bg-[#F9F9F9] transition-all duration-300 hover:bg-[#1E3C8C] ${tall ? "h-[157px]" : "h-[238.5px]"}`}
    >
      <div className="flex w-full md:p-0 p-5 flex-row items-center justify-center gap-6">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="resource-img  h-[46.82432556152344px] w-[46.82432556152344px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <h4 className="font-[magistral] text-[20px] md:text-[24px] leading-[29.27px] font-bold text-[#1E3C8C] italic transition-colors duration-300 group-hover:text-white">
          {title}
          <br />
          <span>{title1}</span>
        </h4>
      </div>
    </div>
  );
}

export default function GovernanceSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-20">
      <img
        src="/assets/about/foudationIcon.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-[min(720px,55vw)] object-contain object-right-bottom"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5">
        <h2 className="mb-8 md:mb-14 text-center font-[magistral] text-[32px] leading-[100%] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          Shaped by Governance. Built on Quality.
          <br />
          Proven across Critical Applications.
        </h2>

        <div className="grid grid-cols-12 gap-4 bg-[#FFFFFF] md:p-4">
          {/* Left Blue Card */}
          {governanceContent.map((item, index) => (
            <div
              key={index}
              className="col-span-12 lg:col-span-6 lg:row-span-2"
            >
              <div className="flex md:h-[494px] flex-col rounded-[4px] bg-[#1E3C8C] p-5 md:p-10">
                <div className="mb-8">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="h-12 w-auto object-contain"
                  />
                </div>

                <h3 className="mb-6 font-[magistral] text-[24px] leading-[160%] md:text-[46px] md:leading-[52px] font-bold text-white italic">
                  {item.title.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>

                <p className="text-[16px] leading-[31.60px] md:text-[17px] md:leading-[32px] text-[#FFFFFFE5]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Top Right Card */}
          <div className="col-span-12 lg:col-span-6">
            <FeatureCard {...cards[0]} tall />
          </div>

          {/* Middle Right Card */}
          <div className="col-span-12 lg:col-span-6">
            <FeatureCard {...cards[1]} tall />
          </div>

          {/* Bottom Left */}
          <div className="col-span-12 lg:col-span-6">
            <FeatureCard {...cards[2]} />
          </div>

          {/* Bottom Right */}
          <div className="col-span-12 lg:col-span-6">
            <FeatureCard {...cards[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
