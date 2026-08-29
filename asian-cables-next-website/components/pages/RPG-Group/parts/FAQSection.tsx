"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function FAQSection({ data }: { data?: any }) {
  const faqs = data?.faqs?.length > 0 ? data.faqs : [
    {
      question: "What is the concept of sustainable energy?",
      answer:
        "Sustainable energy refers to energy sources that are environmentally friendly and can be maintained for future generations.",
    },
    {
      question: "How does sustainable energy positively impact the environment?",
      answer:
        "It reduces greenhouse gas emissions and decreases dependence on fossil fuels.",
    },
    {
      question: "What sustainable energy solutions does your company offer?",
      answer:
        "We offer a range of sustainable energy solutions, such as solar panel installations, wind power systems, energy-efficient appliances, and smart home technologies to promote eco-friendly practices.",
    },
    {
      question:
        "What type of support do you provide after installing sustainable energy solutions?",
      answer:
        "We provide maintenance, consultation, and ongoing technical support.",
    },
  ];
  const [active, setActive] = useState<number | null>(2);

  const toggleFAQ = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="bg-[#FFFFFF] py-10 md:py-20">
      <div className="mx-auto w-[92%] max-w-[950px]">
        {/* TITLE */}
                <div className="text-center">

        <h2 className="mb-8 md:mb-14 text-center text-[32px] md:text-[38px] font-[700] tracking-[-1px] text-[#1E3C8C] italic bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block px-1">
          {data?.faqTitle || ""}
        </h2>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                className="group overflow-hidden rounded-[4px] border border-[#12693F14] bg-[#FFFFFF] transition-all duration-500 ease-in-out hover:shadow-[0_8px_30px_rgba(30,60,140,0.06)]"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-7 py-6 text-left transition-all duration-300"
                >
                  <span
                    className={`pr-5 text-[14px] md:text-[18px] leading-[24px] font-[500] transition-all duration-300 ${isActive
                        ? "text-[#1E3C8C]"
                        : "text-[#646A69] group-hover:text-[#1E3C8C]"
                      } `}
                  >
                    {faq.question}
                  </span>

                  {/* ICON */}
                  <span className="flex items-center justify-center text-[#1D1F1E] transition-all duration-300">
                    {isActive ? (
                      <Minus size={20} className="rotate-0 cursor-pointer" />
                    ) : (
                      <Plus
                        size={20}
                        className="cursor-pointer text-[#1D1F1E]"
                      />
                    )}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                    } `}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-7 transition-all duration-500 ${isActive ? "translate-y-0 pb-6" : "-translate-y-2 pb-0"
                        } `}
                    >
                      <p className="max-w-[100%] text-[14px] leading-[20px] md:text-[16px] md:leading-[26px] text-[#646A69] transition-all duration-300">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
