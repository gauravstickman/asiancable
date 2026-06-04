"use client";

import { useState } from "react";
import { BriefcaseBusiness, MapPin, Clock3 } from "lucide-react";

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
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">

          <div>
            <h2
              className="text-[#21409A] text-[42px] lg:text-[54px] font-bold italic leading-none"
              style={{ fontFamily: "Magistral" }}
            >
              Open Roles
            </h2>

            <p className="text-[#777] mt-2 text-sm">
              3 positions open
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mt-6 lg:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-5 py-3 text-sm transition-all rounded
                  ${
                    activeTab === tab
                      ? "bg-[#21409A] text-white"
                      : "bg-[#F4F5F8] text-[#666]"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

        {/* Job List */}
        <div className="border border-[#ECECEC] rounded-lg overflow-hidden">

          {jobs.map((job, index) => (
            <div
              key={index}
              className={`
                flex flex-col lg:flex-row
                lg:items-center
                justify-between
                px-6 lg:px-8
                py-8
                bg-white
                ${
                  index !== jobs.length - 1
                    ? "border-b border-[#ECECEC]"
                    : ""
                }
              `}
            >
              {/* Left Side */}
              <div className="flex gap-4">

                {/* Icon */}
                <div
                  className={`
                    w-12 h-12
                    rounded-lg
                    bg-[#F8F8F8]
                    flex
                    items-center
                    justify-center
                  `}
                >
                  <BriefcaseBusiness
                    size={20}
                    className="text-[#21409A]"
                  />
                </div>

                {/* Content */}
                <div>
                  {/* Job Title */}
                  <h3 className="text-[#21409A] text-[20px] font-semibold leading-[28px]">
                    {job.title}
                  </h3>

                  {/* Details */}
                  <div className="flex flex-wrap gap-5 mt-3 text-[#777] text-[13px]">

                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness size={13} />
                      {job.category}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={13} />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 size={13} />
                      {job.experience}
                    </span>

                    <span>{job.salary}</span>

                  </div>
                </div>

              </div>

              {/* Apply Button */}
              <button
                className={`
                  mt-5 lg:mt-0
                  bg-[#21409A]
                  hover:bg-[#1A347F]
                  text-white
                  text-sm
                  font-medium
                  px-8
                  py-3
                  rounded
                  transition-all
                `}
              >
                Apply now 〉
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}