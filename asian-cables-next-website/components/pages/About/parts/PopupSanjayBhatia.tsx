    "use client";

    import { ChevronRight, X } from "lucide-react";
    import { useState } from "react";

    type Props = {
    onCloseSanjay: () => void;
    };

    export default function PopupSanjayBhatia({ onCloseSanjay }: Props) {

        const [expanded, setExpanded] = useState(false);

    return (
        <>  
    <div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-[#0000007A] backdrop-blur-[6px] p-5">
        
        <div className="relative h-[90vh] md:h-[90vh] md:max-h-[700px] w-full max-w-[1200px] rounded-[8px] bg-white p-[12px] md:p-[14px]">

            {/* Close */}
            <button
            type="button"
            onClick={onCloseSanjay}
            className="absolute right-4 top-4 z-10 flex h-[36px] w-[36px] items-center justify-center md:bg-[transparent] bg-[#ffffff] rounded-full border border-white md:border-black text-black cursor-pointer"
            >
            <X size={18} />
            </button>

            <div className="grid md:grid-cols-[460px_1fr] gap-2 md:gap-8 md:overflow-hidden h-[100%] ">
            
            {/* Image */}
            <div className="h-[300px] md:h-[calc(90vh-30px)]">
                <img
                src="/assets/about/leader1.jpg"
                alt="Sanjay Bhatia"
                className="h-[100%] w-full rounded-[8px] object-cover"
                />
            </div>

            {/* Content */}
            <div className="md:pr-4">

                <h2 className="font-[magistral] text-[24px] md:text-[40px] md:leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]">
                Sanjay Bhatia
                </h2>

                <p className="md:mt-[6px] text-[16px] md:text-[20px] leading-[20px] text-[#424242]">
                Chief Financial Officer
                </p>

                {/* Meta */}
                <div className="mt-4 md:mt-8 space-y-4">

                <div className="grid grid-cols-[130px_1fr]">
                    <span className="text-[#767676] text-[15px] md:text-[18px] leading-[20px] tracking-[0.4%]">Experience</span>
                    <span className="text-[15px] md:text-[18px] leading-[20px] font-[500] tracking-[0.4%] text-[#1E3C8C]">
                    23 years
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
                    Chartered Accountant
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
                Sanjay Bhatia is a Chartered Accountant with over 23 years of experience in financial strategy, performance management, treasury, governance, and large-scale business transformation across manufacturing and infrastructure-linked organisations.
                </p>

                <p className="mt-2">
                A long-standing member of the RPG Group ecosystem, Sanjay brings deep institutional knowledge built across senior finance roles at CEAT Limited, where he led plant finance, corporate accounts, treasury, and business partnering at the Vice President level. His tenure at CEAT included leading consolidated financial reporting under Ind AS, managing forex risk and banking relationships, driving working capital optimisation, and executing capital market transactions — including a successful ₹400 Crore QIP. He was also instrumental in large-scale digital transformation initiatives, including SAP HANA implementation and robotic process automation.
    </p>

                <p className="mt-2">
                As CFO of KEC Asian Cables Limited, Sanjay is responsible for financial strategy, capital allocation, treasury, governance, and building the financial infrastructure that supports the company's next phase of growth and operational excellence.
                
                </p>

                <p className="mt-2">
                His expertise spans financial planning and analysis, balance-sheet efficiency, IND AS compliance, shared services transformation, and cross-functional business partnering — with a consistent track record of improving profitability and strengthening stakeholder confidence.
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