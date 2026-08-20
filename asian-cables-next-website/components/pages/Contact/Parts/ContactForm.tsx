"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import api from '@/utils/api';

export default function ContactForm({ data }: { data?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: ""
  });
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", type: "" });
    
    try {
      const response = await api.post(`/enquiries`, formData);
      setStatus({ loading: false, message: "Enquiry submitted successfully!", type: "success" });
      setFormData({
        name: "", email: "", phone: "", company: "", inquiryType: "", message: ""
      });
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: "Failed to submit enquiry. Please try again.", type: "error" });
    }
  };

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
          <h2 className="font-[magistral] text-[32px] leading-[150%] md:text-[42px] md:leading-[63px] font-bold italic px-1 bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block">
            {data?.formTitle || "General Enquiry"}
          </h2>

          <p className="mt-2 text-[16px] leading-[24px] text-[#525252]">
            {data?.formDescription || "Fill out the form below and our team will get back to you promptly."}
          </p>

          {status.message && (
            <div className={`mt-4 p-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {status.message}
            </div>
          )}

          {/* Form */}
          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
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
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]"
                />
              </div>
            </div>

            <div className="mt-6">
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                Inquiry Type *
              </label>

              <select 
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
                className="h-[56px] w-full rounded-[8px] border border-[#D7D7D7] px-4 outline-none focus:border-[#1E3C8C]">
                <option value="">Select Inquiry Type</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="General Query">General Query</option>
              </select>
            </div>

            <div className="mt-6">
                <label className="mb-2 block text-[14px] leading-[21px] font-[600] text-[#525252]">
                Message *
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us more about your requirements..."
                className="md:h-[auto] h-[148px] text-[15px] w-full rounded-[8px] border border-[#D7D7D7] p-4 outline-none focus:border-[#1E3C8C]"
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="border-it-w font-[500] mt-8 inline-flex h-[48.39px] text-[20px] leading-[29.42px] tracking-[-0.46px] items-center gap-3 rounded-[4px] bg-[#1E3C8C] px-3 md:px-6 text-white transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status.loading ? 'Submitting...' : 'Submit Query'}
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