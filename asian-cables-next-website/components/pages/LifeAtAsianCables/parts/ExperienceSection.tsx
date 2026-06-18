"use client";

import { useState } from "react";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

// Dynamic Icon component
const DynamicIcon = ({ name, size = 20 }: { name: string; size?: number }) => {
  // If it's a URL, render an image
  if (name.startsWith('http') || name.startsWith('/')) {
    return <Image src={name} alt="Icon" width={size} height={size} className="object-contain" />;
  }

  // Otherwise, try to find the Lucide icon
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent size={size} />;
  }

  // Fallback
  return <LucideIcons.CheckCircle size={size} />;
};

const staticTabs = [
  {
    id: 1,
    number: "01",
    title: "Career Growth & Learning",
    image: "/assets/Lifeofasiancables/experience1.png",
    heading: "Room to grow, every step of the way",
    description:
      "We invest in our people through structured learning programmes, skill-building workshops, and leadership development initiatives. Whether you're a fresh graduate or a seasoned professional, there's always room to grow at Asian Cables.",
    cards: [
      {
        icon: <DynamicIcon name="BookOpen" size={20} />,
        title: "Functional, technical, and behavioural training",
        text: "Workshops across manufacturing, engineering, quality, and business functions.",
      },
      {
        icon: <DynamicIcon name="UserStar" size={20} />,
        title: "Leadership & Mentorship Programmes",
        text: "Structured leadership tracks and one-on-one mentorship programmes.",
      },
      {
        icon: <DynamicIcon name="MapPin" size={20} />,
        title: "Move Across Roles & Locations",
        text: "Opportunities to expand horizons across functions and geographies.",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Benefits & Well-being",
    image: "/assets/Lifeofasiancables/experience2.png",
    heading: "Taking care of you — and your family.",
    description:
      "A holistic benefits programme designed around health, financial security, work-life balance, and community — because people do their best work when they feel supported.",
    cards: [
      {
        icon: <DynamicIcon name="HeartPulse" size={20} />,
        title: "Comprehensive Health & Insurance",
        text: "Medical coverage, annual check-ups, life and accident insurance for you and your family.",
      },
      {
        icon: <DynamicIcon name="Medal" size={20} />,
        title: "Competitive Compensation & Rewards",
        text: "Market-linked salary, annual bonuses, and a recognition programme including performance awards and spot recognitions.",
      },
      {
        icon: <DynamicIcon name="BriefcaseBusiness" size={20} />,
        title: "Work-Life Balance",
        text: "Generous leave — vacation, sick, parental — flexible work options, and wellness programmes including EAP and fitness classes.",
      },
      {
        icon: <DynamicIcon name="ShieldCheck" size={20} />,
        title: "Financial Security",
        text: "Provident Fund, gratuity, retirement benefits (NPS / Pension), and employee loan facilities.",
      },

      {
        icon: <DynamicIcon name="Users" size={20} />,
        title: "Community & Fun",
        text: "Team events, sports tournaments, and festival celebrations — we make sure you enjoy the journey.",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Diversity & Inclusion",
    image: "/assets/Lifeofasiancables/experience3.jpg",
    heading: "Everyone belongs here.",
    description:
      "At Asian Cables, everyone belongs. We welcome colleagues of all backgrounds, genders, and experiences.",
    cards: [
      {
        icon: <DynamicIcon name="BookOpen" size={20} />,
        title: "Every Voice Is Respected",
        text: "We echo RPG's founding value of a happy, equitable workplace where every voice is heard.",
      },
      {
        icon: <DynamicIcon name="UserStar" size={20} />,
        title: "Returners, Graduates & Veterans",
        text: "Whether you are returning from a career break, a fresh graduate, or an experienced professional, you will find support and opportunity here.",
      },
      {
        icon: <DynamicIcon name="MapPin" size={20} />,
        title: "Zero Tolerance for Discrimination",
        text: "A firm, uncompromising commitment to a workplace free from discrimination of any kind.",
      },
    ],
  },
];

export default function ExperienceSection({ data }: { data?: any }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = data?.experiencePoints?.length > 0 ? data.experiencePoints.map((pt: any, index: number) => {
    const imageUrl = pt.image?.startsWith('http')
      ? pt.image
      : `${process.env.NEXT_PUBLIC_API_URL}${pt.image}`;

    return {
      id: index + 1,
      number: `0${index + 1}`,
      title: pt.title,
      image: imageUrl,
      heading: pt.heading,
      description: pt.description,
      cards: (pt.cards || []).map((card: any) => ({
        icon: <DynamicIcon name={card.image || 'CheckCircle'} size={20} />,
        title: card.title,
        text: card.description,
      }))
    };
  }) : staticTabs;

  const current = tabs[activeTab] || tabs[0];

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[60px] pt-12 md:pt-[60px] lg:pt-[80px]">
        {/* Top Header */}
        <div className="mb-10 lg:mb-[60px] flex justify-center">
          <h2
            className="text-center text-[#1E3C8C] font-bold italic text-[32px] md:text-[40px] lg:text-[46px] leading-[1.15] lg:leading-[55.2px] tracking-[-0.92px]"
          >
            {data?.experienceTitle || "Experience that Powers Your Growth"}
          </h2>
        </div>


        <div className="md:hidden px-5">
          {tabs.map((tab: any, index: number) => (
            <div
              key={tab.id}
              className="border-b border-[#E5E7EB]"
            >
              <button
                onClick={() => setActiveTab(index)}
                className="relative w-full px-6 py-5 text-left"
                style={{
                  background:
                    activeTab === index
                      ? "#F4F6FA"
                      : "transparent",
                }}
              >
                <h4
                  className="mb-2 text-[32px] leading-[1.1]"
                  style={{
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.92px",
                    color:
                      activeTab === index
                        ? "#1E3C8C"
                        : "#525252",
                  }}
                >
                  {tab.number}
                </h4>

                <div
                  className="font-dm text-[18px]"
                  style={{
                    fontWeight: 500,
                    color:
                      activeTab === index
                        ? "#1E3C8C"
                        : "#525252",
                  }}
                >
                  {tab.title}
                </div>

                {activeTab === index && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[5px]"
                    style={{
                      background:
                        "linear-gradient(269.81deg, #3CAADF 45.65%, #F04123 84.54%, #FFD212 123.44%)",
                    }}
                  />
                )}
              </button>

              {activeTab === index && (
                <div className="py-6 px-2">
                  <div className="flex flex-col gap-6">
                    <Image
                      src={tab.image}
                      alt={tab.title}
                      width={474}
                      height={616}
                      className="h-[300px] w-full rounded-[8px] object-cover"
                    />

                    <h3
                      className="text-[26px] leading-[1.15]"
                      style={{
                        fontWeight: 700,
                        fontStyle: "italic",
                        color: "#1E3C8C",
                      }}
                    >
                      {tab.heading}
                    </h3>

                    <p className="text-[16px] leading-[28px] text-[#555]">
                      {tab.description}
                    </p>

                    <div className="flex flex-col gap-4">
                      {tab.cards.map((card: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 rounded-[8px] bg-[#F6F9FF] p-5"
                        >
                          <div className="mt-[2px] text-[#1E3C8C]">
                            {card.icon}
                          </div>

                          <div>
                            <p className="mb-2 text-[14px] md:text-[16px] font-medium text-[#1E3C8C]">
                              {card.title}
                            </p>

                            <p className="text-[12px] md:text-[14px] leading-[20px] text-[#666]">
                              {card.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tab Buttons Container */}
        <div className="w-full max-w-[1274px] mx-auto hidden md:block">



          {/* Tab buttons row */}
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab: any, index: number) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className="relative flex-1 text-left cursor-pointer px-6 py-5 transition-colors"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor:
                    activeTab === index ? "transparent" : "#E5E7EB",
                  background:
                    activeTab === index ? "#F4F6FA" : "transparent",
                }}
              >
                <h4
                  className="text-[32px] sm:text-[34px] lg:text-[40px] leading-[1.1] lg:leading-[45px] mb-2"
                  style={{
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.92px",
                    color: activeTab === index ? "#1E3C8C" : "#525252",
                  }}
                >
                  {tab.number}
                </h4>
                <div
                  className="font-dm text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.3] lg:leading-[33px]"
                  style={{
                    fontWeight: 500,
                    color: activeTab === index ? "#1E3C8C" : "#525252",
                  }}
                >
                  {tab.title}
                </div>

                {activeTab === index && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[5px]"
                    style={{
                      background:
                        "linear-gradient(269.81deg, #3CAADF 45.65%, #F04123 84.54%, #FFD212 123.44%)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-full p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-9">
              {/* Image */}
              <div className="w-full lg:w-[474px] lg:flex-shrink-0">
                <Image
                  src={current.image}
                  alt={current.title}
                  width={474}
                  height={616}
                  className="w-full h-[300px] sm:h-[420px] lg:h-[616px] object-cover rounded-[8px]"
                />
              </div>

              {/* Side Text Container */}
              <div className="flex w-full flex-col gap-6 lg:gap-9 lg:w-[672px]">
                <h3
                  className="text-[26px] sm:text-[30px] lg:text-[36px] leading-[1.15]"
                  style={{
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.92px",
                    color: "#1E3C8C",
                    margin: 0,
                  }}
                >
                  {current.heading}
                </h3>

                <p
                  className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[28px] lg:leading-[30px]"
                  style={{
                    fontWeight: 400,
                    color: "#555",
                    margin: 0,
                  }}
                >
                  {current.description}
                </p>

                {/* 3 Cards Container */}
                <div className="flex flex-col gap-4 sm:gap-6">
                  {current.cards.map((card: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex w-full items-start gap-4 sm:gap-6 rounded-[8px] p-5 sm:p-6"
                      style={{ backgroundColor: "#F6F9FF" }}
                    >
                      <div
                        className="flex-shrink-0 mt-[2px]"
                        style={{ color: "#1E3C8C" }}
                      >
                        {card.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-[16px] leading-tight mb-2"
                          style={{
                            fontWeight: 500,
                            color: "#1E3C8C",
                          }}
                        >
                          {card.title}
                        </p>
                        <p
                          className="text-[14px] leading-[20px]"
                          style={{
                            fontWeight: 400,
                            color: "#666",
                            margin: 0,
                          }}
                        >
                          {card.text}
                        </p>
                      </div>
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
