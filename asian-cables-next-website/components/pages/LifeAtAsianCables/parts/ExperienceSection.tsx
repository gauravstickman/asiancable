"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  UserRound,
  MapPin,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

const tabs = [
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
        icon: <BookOpen size={20} />,
        title: "Functional, technical, and behavioural training",
        text: "Workshops across manufacturing, engineering, quality, and business functions.",
      },
      {
        icon: <UserRound size={20} />,
        title: "Leadership & Mentorship Programmes",
        text: "Structured leadership tracks and one-on-one mentorship programmes.",
      },
      {
        icon: <MapPin size={20} />,
        title: "Move Across Roles & Locations",
        text: "Opportunities to expand horizons across functions and geographies.",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Benefits & Well-being",
    image: "/assets/Lifeofasiancables/experience1.png",
    heading: "Supporting your well-being",
    description:
      "We care about our employees and provide benefits that support physical, emotional and financial well-being.",
    cards: [
      {
        icon: <Heart size={20} />,
        title: "Health & Wellness",
        text: "Comprehensive medical and wellness support.",
      },
      {
        icon: <ShieldCheck size={20} />,
        title: "Insurance Coverage",
        text: "Security and protection for employees and families.",
      },
      {
        icon: <Users size={20} />,
        title: "Work-Life Balance",
        text: "Flexible and employee-friendly culture.",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Diversity & Inclusion",
    image: "/assets/Lifeofasiancables/experience1.png",
    heading: "A workplace where everyone belongs",
    description:
      "We celebrate diverse perspectives and create an inclusive culture where everyone can thrive.",
    cards: [
      {
        icon: <Users size={20} />,
        title: "Inclusive Teams",
        text: "Respectful and collaborative environment.",
      },
      {
        icon: <Heart size={20} />,
        title: "Equal Opportunities",
        text: "Growth opportunities for everyone.",
      },
      {
        icon: <ShieldCheck size={20} />,
        title: "Safe Workplace",
        text: "A culture built on trust and respect.",
      },
    ],
  },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[80px] py-[40px]">
        {/* Heading */}
        <div className="flex justify-center mb-10 lg:mb-12">
          <h2
            className="text-center text-[#1E3C8C] font-bold italic text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.15] lg:leading-[55.2px] tracking-[-0.92px]"
          >
            What You'll Experience
          </h2>
        </div>

        {/* Tab Buttons Container */}
        <div className="w-full max-w-[1274px] mx-auto">
          {/* Tab buttons row */}
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab, index) => (
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
                <div
                  className="text-[32px] sm:text-[34px] lg:text-[40px] leading-[1.1] lg:leading-[45px] mb-2"
                  style={{
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.92px",
                    color: "#1E3C8C",
                  }}
                >
                  {tab.number}
                </div>
                <div
                  className="text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.3] lg:leading-[33px]"
                  style={{
                    fontWeight: 500,
                    color: "#1E3C8C",
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
                  {current.cards.map((card, idx) => (
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
                        <h4
                          className="text-[16px] leading-tight mb-2"
                          style={{
                            fontWeight: 500,
                            color: "#1E3C8C",
                          }}
                        >
                          {card.title}
                        </h4>
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
