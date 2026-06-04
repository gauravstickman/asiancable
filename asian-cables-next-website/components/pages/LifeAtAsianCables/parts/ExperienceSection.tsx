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
    image: "/assets/Lifeofasiancables/experience2.png",
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
    image: "/assets/Lifeofasiancables/experience3.png",
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
    <section className="py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[80px]">

        {/* Heading */}
        <h2
          className="text-[#21409A] text-[32px] sm:text-[42px] lg:text-[54px] font-bold italic mb-8 lg:mb-12"
          style={{ fontFamily: "Magistral" }}
        >
          What You'll Experience
        </h2>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`
                relative
                flex-1
                min-w-[200px]
                lg:min-w-[320px]
                text-left
                px-5 sm:px-8
                py-5 sm:py-8
                transition-all
                ${
                  activeTab === index
                    ? "bg-[#F4F6FA]"
                    : ""
                }
              `}
            >
              <div className="text-[34px] sm:text-[42px] lg:text-[50px] font-bold italic text-[#21409A]">
                {tab.number}
              </div>

              <div className="text-[16px] sm:text-[18px] lg:text-[20px] mt-2">
                {tab.title}
              </div>

              {/* Active tab indicator — gradient underline */}
              {activeTab === index && (
                <span className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-[#F7931E] to-[#36A9E1]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-10 items-start">

          {/* Left Image */}
          <div>
            <Image
              src={current.image}
              alt={current.title}
              width={500}
              height={550}
              className="rounded-lg object-cover w-full"
            />
          </div>

          {/* Right */}
          <div>
            <h3
              className="text-[#21409A] text-[26px] sm:text-[32px] lg:text-[42px] font-bold italic"
              style={{ fontFamily: "Magistral" }}
            >
              {current.heading}
            </h3>

            <p className="text-[#555] text-[16px] lg:text-[20px] leading-[28px] lg:leading-[36px] mt-5 mb-8">
              {current.description}
            </p>

            <div className="space-y-5">
              {current.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-[#F4F6FA] rounded-lg p-6 flex gap-4"
                >
                  <div className="text-[#21409A] mt-1">
                    {card.icon}
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#21409A]">
                      {card.title}
                    </h4>

                    <p className="text-sm text-gray-600 mt-2">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}