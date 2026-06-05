"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  Clock3,
  ChevronRight,
} from "lucide-react";

const jobs = [
  {
    category: "Finance",
    title: "Senior Manager – Finance & Accounts",
    location: "Mumbai, India",
    experience: "8–12 years experience",
    salary: "₹15–20 LPA",
  },
  {
    category: "Sales",
    title: "Executive – Sales & Distribution",
    location: "Pune, India",
    experience: "2–5 years experience",
    salary: "₹5–8 LPA",
  },
  {
    category: "Quality",
    title: "Engineer – Quality Assurance",
    location: "Nashik, India",
    experience: "3–6 years experience",
    salary: "₹6–10 LPA",
  },
];

const tabs = [
  "All Roles",
  "Engineering",
  "Quality",
  "Sales",
  "Finance",
];

export default function OpenRolesSection() {
  const [activeTab, setActiveTab] = useState("All Roles");

  return (
    <section className="w-full bg-white py-[40px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[81px]">
        {/* Top Section */}
        <div className="w-full flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-10 lg:mb-[60px]">
          {/* Left */}
          <div>
            <h2
              className="
                text-[#1E3C8C]
                text-[32px]
                sm:text-[40px]
                lg:text-[46px]
                font-bold
                italic
                leading-[1.15]
                lg:leading-[55px]
                tracking-[-0.92px]
              "
              
            >
              Open Roles
            </h2>

            <p
              className="
                mt-[8px]
                text-[#666666]
                text-[16px]
                sm:text-[18px]
                leading-[30px]
              "
              
            >
              3 positions open
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-[8px]">
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    h-[41px]
                    px-[14px]
                    sm:px-[18px]
                    rounded-[4px]
                    text-[13px]
                    sm:text-[14px]
                    font-medium
                    transition-all
                    ${
                      active
                        ? "bg-[#1E3C8C] text-white border border-[#1E3C8C]"
                        : "bg-[#F6F6F6] text-[#555555] border border-transparent"
                    }
                  `}
                  
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs */}
        <div className="flex flex-col gap-[16px]">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="
                bg-[#FAFAFA]
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
                md:h-[123px]
                p-5
                md:px-[32px]
                md:py-0
              "
            >
              {/* Left Side */}
              <div className="flex items-start sm:items-center gap-[16px] sm:gap-[24px]">
                {/* Icon Box */}
                <div
                  className="
                    w-[40px]
                    h-[40px]
                    flex-shrink-0
                    rounded-[8px]
                    bg-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <BriefcaseBusiness
                    size={18}
                    className="text-[#1E3C8C]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="
                      text-[#1E3C8C]
                      text-[17px]
                      sm:text-[20px]
                      font-medium
                      leading-[26px]
                      sm:leading-[30px]
                      tracking-[0px]
                    "
                  >
                    {job.title}
                  </h3>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-x-[20px]
                      gap-y-[6px]
                      sm:gap-x-[28px]
                      mt-[12px]
                      text-[13px]
                      sm:text-[14px]
                      text-[#808080]
                    "
                    
                  >
                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness size={14} />
                      {job.category}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={14} />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 size={14} />
                      {job.experience}
                    </span>

                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                className="
                  w-full
                  md:w-[148px]
                  flex-shrink-0
                  h-[39px]
                  rounded-[4.39px]
                  bg-[#1E3C8C]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-[7px]
                  text-[14px]
                  font-medium
                  shadow-[0px_2px_6px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:bg-[#15306e]
                  hover:scale-105
                "
                
              >
                Apply now
                <ChevronRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
