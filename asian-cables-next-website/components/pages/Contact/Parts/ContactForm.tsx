"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="relative overflow-hidden bg-[#fff] py-6 md:py-[80px]">
      {/* Background Glow */}
<div
  className="absolute hidden md:block inset-0 bg-cover bg-center bg-no-repeat opacity-100"
  style={{
    backgroundImage: "url('/assets/contact/bg.jpg')",
  }}
/>

<div
  className="absolute md:hidden inset-0 bg-cover bg-center bg-no-repeat opacity-100 bg-position-[66%]"
  style={{
    backgroundImage: "url('/assets/contact/mbl-bg.jpg')",
  }}
/>
      <div className="relative z-10 mx-auto max-w-[1280px] px-5">
        <div className="relative mx-auto rounded-[2px] max-w-[773px] bg-white p-[25px] md:px-[48px] md:py-[35px] shadow-[0px_4px_59px_0px_#00000040]">
          {/* Heading */}
          <h2 className="font-[magistral] text-[32px] leading-[150%] md:text-[42px] md:leading-[63px] font-bold italic text-[#1E3C8C]">
            General Enquiry
          </h2>

          <p className="mt-2 text-[16px] leading-[24px] text-[#525252]">
            Fill out the form below and our team will get back to you promptly.
          </p>

          {/* Form */}
          <form className="mt-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Full Name *
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Email Address *
                </label>

                <input
                  type="email"
                  placeholder="your.email@company.com"
                  className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Company Name
                </label>

                <input
                  type="text"
                  placeholder="Your company"
                  className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]"
                />
              </div>
            </div>

            <div className="mt-6">
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                Inquiry Type *
              </label>

              <select className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]">
                <option>Select Inquiry Type</option>
                <option>Product Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>General Query</option>
              </select>
            </div>

            <div className="mt-6">
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                Message *
              </label>

              <textarea
                rows={6}
                placeholder="Tell us more about your requirements..."
                className="md:h-[auto] h-[148px] text-[15px] w-full rounded-[8px] border border-[#D7D7D7] p-4 outline-none focus:border-[#1E3C8C]"
              />
            </div>

            <button
              type="submit"
              className="border-it-w mt-8 inline-flex h-[48.39px] text-[20px] leading-[29.42px] tracking-[-0.46px] items-center gap-3 rounded-[4px] bg-[#1E3C8C] px-3 md:px-6 text-white transition-all cursor-pointer"
            >
              Submit Query
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Cable Image */}
          <div className="pointer-events-none absolute right-[-208px] bottom-[170px] hidden lg:block">
            <Image
              src="/assets/contact/contact-pro.png"
              alt="Cable"
              width={320}
              height={320}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}