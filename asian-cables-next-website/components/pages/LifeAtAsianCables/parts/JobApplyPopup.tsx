"use client";

import { ChevronRight, X } from "lucide-react";
import { useState } from "react";


type Props = {
  onClose: () => void;
};

export default function JobApplyPopup({ onClose }: Props) {


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
      <form className="space-y-5">
        <div>
          <label className="mb-1 md:mb-2  text-[13px] md:text-[16px] block text-[#525252]">
            Name *
          </label>
          <input
            type="text"
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
            placeholder="Email"
            className="h-[40px] md:h-[52px] w-full rounded-[8px] bg-[#f5f5f5] px-4"
          />
        </div>

        <div>
          <label className="mb-1 md:mb-2  text-[13px] md:text-[16px] block text-[#525252]">
            Job Position *
          </label>

          <input
            value="Job title here"
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
            className="w-full rounded-[8px] bg-[#f5f5f5] p-4"
          />
        </div>

        <button
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
                "
                
              >
                Submit
                <ChevronRight size={15} />
              </button>
      </form>
    </div>
  </div>
  </>

  );
}