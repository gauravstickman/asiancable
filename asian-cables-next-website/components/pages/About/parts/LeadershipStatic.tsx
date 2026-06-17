"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getBaseUrl } from "../../../../utils/api";
import { useState, useEffect } from "react";
import PopupSanjayBhatia from "./PopupSanjayBhatia";
import PopupGarima from "./PopupGarima";
import PopupKushal from "./PopupKushal";

const defaultLeaders = [
  {
    name: "Cameron Williamson",
    role: "Senior Sustainability Consultant",
    image: "/assets/about/personIcon.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Courtney Henry",
    role: "Energy Analysts",
    image: "/assets/about/personIcon1.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Dianne Russell",
    role: "Senior Renewable Energy Engineer",
    image: "/assets/about/personIcon2.png",
    linkedin: "https://linkedin.com",
  },
];
type Props = {
  onCloseSanjay: () => void;
  onCloseGarima: () => void;
  onCloseKushal: () => void;
};

export default function LeadershipStatic({
  onCloseSanjay,
  onCloseGarima,
  onCloseKushal,
}: Props) {

const [showPopupSanjay, setShowPopupSanjay] = useState(false);
const [showPopupGarima, setShowPopupGarima] = useState(false);
const [showPopupKushal, setShowPopupKushal] = useState(false);


useEffect(() => {
  if (!showPopupSanjay) return;

  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);
  };
}, [showPopupSanjay]);

useEffect(() => {
  const nav = document.querySelector("nav");

  if (showPopupSanjay) {
    nav?.classList.add("pointer-events-none");
  } else {
    nav?.classList.remove("pointer-events-none");
  }

  return () => {
    nav?.classList.remove("pointer-events-none");
  };
}, [showPopupSanjay]);




// second popup


useEffect(() => {
  if (!showPopupGarima) return;

  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);
  };
}, [showPopupGarima]);

useEffect(() => {
  const nav = document.querySelector("nav");

  if (showPopupGarima) {
    nav?.classList.add("pointer-events-none");
  } else {
    nav?.classList.remove("pointer-events-none");
  }

  return () => {
    nav?.classList.remove("pointer-events-none");
  };
}, [showPopupGarima]);



// third popup


useEffect(() => {
  if (!showPopupKushal) return;

  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);
  };
}, [showPopupKushal]);

useEffect(() => {
  const nav = document.querySelector("nav");

  if (showPopupKushal) {
    nav?.classList.add("pointer-events-none");
  } else {
    nav?.classList.remove("pointer-events-none");
  }

  return () => {
    nav?.classList.remove("pointer-events-none");
  };
}, [showPopupKushal]);

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-[1274px]">
        {/* Header */}
        <div className="mb-10 md:px-0 px-5 flex md:flex-row flex-col md:items-center md:justify-between">
          <div>
            <h2 className="font-[magistral]  text-[32px] leading-[100%] md:text-[46px] md:leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]">              Leadership Team
</h2>
            <p className="mt-4 font-[work_sans] text-[16px] leading-[150%] md:text-[17px] md:leading-[25.5px] font-normal text-[#525252]">Meet the visionaries driving Asian Cables forward
</p>
          </div>
          <div>
            <Link href="#" className="border-it-w cursor-pointer md:mx-auto flex items-center justify-center gap-[6px] rounded-[5.52px] bg-[#1E3C8C] px-5 py-2 text-[20px] font-medium text-white transition hover:bg-[#163174] md:mt-[59px] md:mb-[37.61px] md:mt-0 mt-5 w-fit">
             View Leadership <span>
                <ChevronRight size={18} />
              </span>
            </Link>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="animate-marquee1 hover:[animation-play-state:paused] md:ml-0 ml-5 md:pr-0 pr-5 md:overflow-x-hidden overflow-x-auto industries md:grid grid-cols-3 flex gap-6 md:gap-[33px]">
            {/* First Set */}
              <div className=" min-w-[80vw] md:min-w-[33%] cursor-pointer" onClick={() => setShowPopupSanjay(true)} >
                {/* Image */}
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src="assets/about/leader1.jpg"
                    alt="Sanjay Bhatia"
                    className="md:h-[371px] md:w-[100%] w-[80vw] rounded-[4px] full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex w-full flex-row items-center justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] md:text-[18px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      Sanjay Bhatia
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                     Chief Financial Officer
                    </p>
                  </div>

                  
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/assets/about/linkdinIcon.png"
                        alt="LinkedIn"
                        className="h-8 w-8 object-contain cursor-pointer"
                      />
                    </a>
                 
                </div>
              </div>


                {/* First Set */}
              <div className=" min-w-[80vw] md:min-w-[33%] cursor-pointer" onClick={() => setShowPopupGarima(true)}>
                {/* Image */}
                <div className="overflow-hidden rounded-[4px]">
                  <img
src="assets/about/leader1.jpg"                    alt=""
                    className="md:h-[371px] md:w-[100%] w-[80vw] rounded-[4px] full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex w-full flex-row items-center justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] md:text-[18px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      Garima Kochar
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                     Chief Human Resources Officer

                    </p>
                  </div>

                  
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/assets/about/linkdinIcon.png"
                        alt="LinkedIn"
                        className="h-8 w-8 object-contain cursor-pointer"
                      />
                    </a>
                 
                </div>
              </div>


                {/* First Set */}
              <div className=" min-w-[80vw] md:min-w-[33%] cursor-pointer"  onClick={() => setShowPopupKushal(true)}>
                {/* Image */}
                <div className="overflow-hidden rounded-[4px]">
                  <img
src="assets/about/leader1.jpg"                    alt=""
                    className="md:h-[371px] md:w-[100%] w-[80vw] rounded-[4px] full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex w-full flex-row items-center justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] md:text-[18px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      Khushal Rathore
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                     VP — Factory Operations
                    </p>
                  </div>

                  
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/assets/about/linkdinIcon.png"
                        alt="LinkedIn"
                        className="h-8 w-8 object-contain cursor-pointer"
                      />
                    </a>
                 
                </div>
              </div>

            {/* Duplicate */}
            {/* {leaders.map((leader: any, index: number) => (
              <div key={`dup-${index}`} className="max-w-[260px] min-w-[260px]">
                <div className="overflow-hidden rounded-[4px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[371px] w-[314px] rounded-[4px] full object-cover"
                  />
                </div>

                <div className="flex w-full flex-row items-start justify-between h-auto gap-[4px] rounded-[4px] p-[16px]">
                  <div >
                    <p className="text-[16px] leading-[24px] font-medium tracking-[-0.4%] text-[#1D1F1E]">
                      {leader.name}
                    </p>

                    <p className=" text-[14px] leading-[20px] font-normal tracking-[-0.004em] text-[#646A69]">
                      {leader.role}
                    </p>
                  </div>

                  {leader.linkedin ? (
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                      <img
                        src="/assets/about/linkdinIcon.png"
                        alt="LinkedIn"
                        className="h-6 w-6 object-contain cursor-pointer"
                      />
                    </a>
                  ) : (
                    <img
                      src="/assets/about/linkdinIcon.png"
                      alt="LinkedIn"
                      className="h-6 w-6 object-contain cursor-pointer opacity-50"
                    />
                  )}
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>


{/* popup1 */}

{showPopupSanjay && (
  <PopupSanjayBhatia onCloseSanjay={() => setShowPopupSanjay(false)} />
)}

{/* popup1 */}

{showPopupGarima && (
  <PopupGarima  onCloseGarima={() => setShowPopupGarima(false)} />
)}

{/* popup1 */}

{showPopupKushal && (
  <PopupKushal onCloseKushal={() => setShowPopupKushal(false)} />
  
)}

    </section>
  );
}
