"use client";

import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import api from '@/utils/api';

type Props = {
  jobTitle?: string;
  onClose: () => void;
};

export default function JobApplyPopup({ jobTitle = "Job title here", onClose }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobPosition: jobTitle,
  });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", type: "" });

    if (!resume) {
      setStatus({ loading: false, message: "Please upload your resume.", type: "error" });
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("jobPosition", formData.jobPosition);
    submitData.append("resume", resume);

    try {
      // Temporarily use axios or fetch if `api` doesn't support FormData directly, but `api` usually does
      const response = await api.post(`/job-applications`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus({ loading: false, message: "Application submitted successfully!", type: "success" });
      setFormData({ name: "", email: "", phone: "", jobPosition: jobTitle });
      setResume(null);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: "Failed to submit application. Please try again.", type: "error" });
    }
  };

  return (
    <>  
<div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-[#0000007A] backdrop-blur-[6px] p-5">
        <div className="relative w-full max-w-[550px] rounded-[16px] bg-white p-5 md:p-8">

     <div className="form-control relative flex items-center justify-between  mb-3">
<h2 className="   text-[#1E3C8C]
text-[18px]
                md:text-[26px]
                lg:text-35px]
                font-bold
                italic
                leading-[1.15]
                lg:leading-[45px]
                tracking-[-0.92px]">Apply for this position</h2>
                 {/* Close */}
      <button
          onClick={onClose}
        className="flex h-5 w-5 md:h-8 md:w-8 text-[14px] leading-[100%] md:text-[18px] items-center justify-center rounded-full border text-[#1E3C8C] cursor-pointer"
      >
        <X/>
      </button>
      </div>
      
      {status.message && (
        <div className={`mb-4 p-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 md:mb-2  text-[13px] md:text-[16px] block text-[#525252]">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="h-[40px] md:h-[52px] w-full rounded-[8px] bg-[#f5f5f5] px-4"
          />
        </div>

        <div>
          <label className="mb-1 md:mb-2  text-[13px] md:text-[16px] block text-[#525252]">
            Phone *
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
            className="h-[40px] md:h-[52px] w-full rounded-[8px] bg-[#f5f5f5] px-4"
          />
        </div>

        <div>
          <label className="mb-1 md:mb-2 text-[13px] md:text-[16px] block text-[#525252]">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="h-[40px] md:h-[52px] w-full rounded-[8px] bg-[#f5f5f5] px-4"
          />
        </div>

        <div>
          <label className="mb-1 md:mb-2  text-[13px] md:text-[16px] block text-[#525252]">
            Job Position *
          </label>

          <input
            name="jobPosition"
            value={formData.jobPosition}
            readOnly
            className="h-[40px] md:h-[52px] w-full rounded-[8px] bg-[#f5f5f5] px-4"
          />
        </div>

        <div>
          <label className="mb-1 md:mb-2  text-[13px] md:text-[16px] block text-[#525252]">
            Resume *
          </label>

          <input
            type="file"
            onChange={handleFileChange}
            required
            accept=".pdf,.doc,.docx"
            className="w-full rounded-[8px] bg-[#f5f5f5] p-4"
          />
        </div>

        <button
                type="submit"
                disabled={status.loading}
                className="
                border-it-w
                mt-6
                  flex-shrink-0
                  h-[48px]
                  px-6
                  rounded-[4.39px]
                  bg-[#1E3C8C]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-[7px]
                  text-[18px]
                  font-medium
                  shadow-[0px_2px_6px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  disabled:opacity-70
                "
                
              >
                {status.loading ? 'Submitting...' : 'Submit'}
                <ChevronRight size={15} />
              </button>
      </form>
    </div>
  </div>
  </>

  );
}