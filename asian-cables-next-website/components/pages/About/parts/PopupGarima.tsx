    "use client";

    import { ChevronRight, X } from "lucide-react";
    import { useState } from "react";

    type Props = {
    onCloseGarima: () => void;
    };

    export default function PopupGarima({ onCloseGarima }: Props) {

        const [expanded, setExpanded] = useState(false);

    return (
        <>  
    <div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-[#0000007A] backdrop-blur-[6px] p-5">
        
        <div className="relative h-[90vh] md:h-[90vh] md:max-h-[700px] w-full max-w-[1200px] rounded-[8px] bg-white p-[12px] md:p-[14px]">

            {/* Close */}
            <button
            type="button"
            onClick={onCloseGarima}
            className="absolute right-4 top-4 z-10 flex h-[36px] w-[36px] items-center justify-center md:bg-[transparent] bg-[#ffffff] rounded-full border border-white md:border-black text-black cursor-pointer"
            >
            <X size={18} />
            </button>

            <div className="grid md:grid-cols-[460px_1fr] gap-2 md:gap-8 md:overflow-hidden h-[100%] ">
            
            {/* Image */}
            <div className="h-[300px] md:h-[calc(90vh-30px)]">
                <img
                src="/assets/about/leader1.jpg"
                alt="Garima Bhatia"
                className="h-[auto] w-full rounded-[8px] object-cover"
                />
            </div>

            {/* Content */}
            <div className="md:pr-4">

                <h2 className="font-[magistral] text-[24px] md:text-[40px] md:leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]">
                Garima Kochar
                </h2>

                <p className="md:mt-[6px] text-[16px] md:text-[20px] leading-[20px] text-[#424242]">
                Chief Human Resources Officer
                </p>

                {/* Meta */}
                <div className="mt-4 md:mt-8 space-y-4">

                <div className="grid grid-cols-[130px_1fr]">
                    <span className="text-[#767676] text-[15px] md:text-[18px] leading-[20px] tracking-[0.4%]">Experience</span>
                    <span className="text-[15px] md:text-[18px] leading-[20px] font-[500] tracking-[0.4%] text-[#1E3C8C]">
                    21 years
                    </span>
                </div>

                <div className="grid grid-cols-[130px_1fr]">
                    <span className="text-[#767676] text-[15px] md:text-[18px] leading-[20px] tracking-[0.4%]">Location</span>
                    <span className="text-[15px] md:text-[18px] leading-[20px] font-[500] tracking-[0.4%] text-[#1E3C8C]">
                    Mumbai
                    </span>
                </div>

                <div className="grid grid-cols-[130px_1fr]">
                <span className="text-[#767676] text-[15px] md:text-[18px] leading-[20px] tracking-[0.4%]">Education</span>
                    <span className="text-[15px] md:text-[18px] leading-[20px] font-[500] tracking-[0.4%] text-[#1E3C8C]">
                    MBA in Human Resources.<br/>
B.E. in Electronics & Communication

                    </span>
                </div>

                <div className="grid grid-cols-[130px_1fr] items-center">
                    <span className="text-[#767676] text-[15px] md:text-[18px]  leading-[20px] tracking-[0.4%]">Connect on</span>

                    <div className="flex gap-2 md:gap-4">

                    <a
                        href="#"
                        className="flex h-7 w-7 items-center justify-center rounded-[4px]  text-white"
                    >
                        <img src="assets/about/twitter.png"/>
                    </a>
                    <a
                        href="#"
                        className="flex h-7 w-7 items-center justify-center rounded-[4px]  text-white"
                    >
                        <img src="assets/about/linkedin.png"/>
                    </a>
                    </div>
                </div>
                </div>

                {/* Divider */}
    <div
    className="w-full border-t mt-10 mb-6"
    style={{
        borderImage:
        "linear-gradient(90deg, rgba(30, 60, 140, 0.95141) 0%, #1E3C8C 50.63%, rgba(30, 60, 140, 0) 100%) 1",
    }}
    />
                {/* Bio */}
                
                <div
                className={`text-[16px] md:text-[18px] leading-[20px] md:pb-0 pb-5 tracking-[0.4%] text-[#767676] ${
                    expanded
                    ? "max-h-[none] md:max-h-[142px] lg:max-h-[240px] 2xl:max-h-[270px] overflow-y-auto pr-3"
                    : "max-h-[none] md:max-h-[142px] lg:max-h-[240px] 2xl:max-h-[270px] overflow-hidden"
                }`}
                >
                <p>
Garima Kochar is a seasoned HR leader with over 21 years of experience across Cement, Building Materials, Steel, Power, Renewable Energy, Advanced Metering, and Cables — bringing cross-industry depth to the people agenda at KEC Asian Cables Limited.                </p>

                <p className="mt-2">
As CHRO, Garima is responsible for driving HR strategy, strengthening organisational capability, and enabling business growth through people-first interventions. Her mandate spans the full spectrum of HR leadership — from culture transformation and leadership development to workforce planning, performance architecture, and HR digitisation.    </p>

                <p className="mt-2">
Over her career, Garima has led large-scale HR transformations across complex, multi-location businesses — building leadership pipelines, institutionalising succession frameworks, designing performance-driven reward structures, and driving culture change across corporate and plant environments. She has a strong track record in HR operating model transformation, governance strengthening, and the adoption of digital HR solutions to improve efficiency and decision-making.                
                </p>

                <p className="mt-2">
At KEC Asian Cables, she is focused on building a high-performance, future-ready organisation — one where people strategy is tightly aligned to business priorities and where the foundations are in place to support long-term growth.
                </p>
               <p className="mt-2">
Garima holds a B.E. in Electronics & Communication and an MBA in Human Resources.
                </p> 

                </div>

                <button
                onClick={() => setExpanded(!expanded)}
                className="hidden md:block mt-2 text-[18px] leading-[20px] tracking-[0.4%] text-[#1E3C8C] cursor-pointer"
                >
                {expanded ? "Read less" : "Read more"}
                </button>
            </div>
            </div>
        </div>
    </div>
    </>

    );
    }