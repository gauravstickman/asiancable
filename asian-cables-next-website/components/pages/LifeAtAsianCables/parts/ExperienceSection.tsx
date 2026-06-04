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
      <div 
        className="mx-auto"
        style={{
          maxWidth: "1440px",
          width: "100%",
          paddingTop: "40px",
          paddingRight: "80px",
          paddingBottom: "40px",
          paddingLeft: "80px",
          gap: "60px",
          opacity: 1,
        }}
      >
        {/* Heading */}
        <div className="flex justify-center mb-12">
          <h2
            className="text-center"
            style={{
              width: "497px",
              height: "56px",
              color: "#1E3C8C",
              fontFamily: "Magistral, 'Inter', sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "46px",
              lineHeight: "55.2px",
              letterSpacing: "-0.92px",
              textAlign: "center",
            }}
          >
            What You'll Experience
          </h2>
        </div>

        {/* Tab Buttons Container */}
        <div style={{ width: "100%", maxWidth: "1274px", margin: "0 auto" }}>
          {/* Tab buttons row */}
          <div className="flex" style={{ gap: 0 }}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                style={{
                  width: "426.6666564941406px",
                  height: "171px",
                  opacity: 1,
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: activeTab === index ? "transparent" : "#E5E7EB",
                  background: activeTab === index ? "#F4F6FA" : "transparent",
                  padding: "0",
                  cursor: "pointer",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <div className="px-6 py-5">
                  <div
                    style={{
                      fontFamily: "Magistral, 'Inter', sans-serif",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "40px",
                      lineHeight: "45px",
                      letterSpacing: "-0.92px",
                      color: "#1E3C8C",
                      marginBottom: "8px",
                    }}
                  >
                    {tab.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      fontSize: "24px",
                      lineHeight: "33px",
                      letterSpacing: "0px",
                      color: "#1E3C8C",
                      width: "330.6666564941406px",
                      height: "33px",
                      opacity: 1,
                    }}
                  >
                    {tab.title}
                  </div>
                </div>
                {activeTab === index && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "5px",
                      background: "linear-gradient(269.81deg, #3CAADF 45.65%, #F04123 84.54%, #FFD212 123.44%)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div
            style={{
              width: "100%",
              maxWidth: "1274px",
              minHeight: "712px",
              opacity: 1,
              gap: "36px",
              padding: "48px",
              backgroundColor: "transparent",
            }}
          >
            <div className="flex gap-9 flex-wrap lg:flex-nowrap">
              {/* Image */}
              <div style={{ width: "474px", height: "616px", flexShrink: 0 }}>
                <Image
                  src={current.image}
                  alt={current.title}
                  width={474}
                  height={616}
                  style={{ borderRadius: "8px", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Side Text Container */}
              <div
                style={{
                  width: "672px",
                  height: "616px",
                  gap: "36px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    width: "672px",
                    height: "43px",
                    fontFamily: "Magistral, 'Inter', sans-serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "36px",
                    lineHeight: "100%",
                    letterSpacing: "-0.92px",
                    color: "#1E3C8C",
                    margin: 0,
                  }}
                >
                  {current.heading}
                </h3>

                <p
                  style={{
                    width: "672px",
                    height: "120px",
                    fontFamily: "Work Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "30px",
                    letterSpacing: "0px",
                    color: "#555",
                    margin: 0,
                  }}
                >
                  {current.description}
                </p>

                {/* 3 Cards Container */}
                <div
                  style={{
                    width: "672px",
                    height: "405px",
                    gap: "24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {current.cards.map((card, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "672px",
                        height: "119px",
                        gap: "24px",
                        borderRadius: "8px",
                        padding: "24px",
                        backgroundColor: "#F6F9FF", // ✅ Ek hi bg for all 3 cards
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flexShrink: 0, marginTop: "2px", color: "#1E3C8C" }}>
                        {card.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            fontFamily: "Work Sans, sans-serif",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0px",
                            color: "#1E3C8C",
                            marginBottom: "8px",
                          }}
                        >
                          {card.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "Work Sans, sans-serif",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0px",
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