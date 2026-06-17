    "use client";

    import { ChevronRight, X } from "lucide-react";
    import { useState } from "react";

    type Props = {
    onCloseKushal: () => void;
    };

    export default function PopupKushal({ onCloseKushal }: Props) {

        const [expanded, setExpanded] = useState(false);

    return (
        <>  
    <div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-[#0000007A] backdrop-blur-[6px] p-5">
        
        <div className="relative h-[90vh] md:h-[90vh] md:max-h-[700px] w-full max-w-[1200px] rounded-[8px] bg-white p-[12px] md:p-[14px]">

            {/* Close */}
            <button
            type="button"
            onClick={onCloseKushal}
            className="absolute right-4 top-4 z-10 flex h-[36px] w-[36px] items-center justify-center md:bg-[transparent] bg-[#ffffff] rounded-full border border-white md:border-black text-black cursor-pointer"
            >
            <X size={18} />
            </button>

            <div className="grid md:grid-cols-[460px_1fr] gap-2 md:gap-8 md:overflow-hidden h-[100%] ">
            
            {/* Image */}
            <div className="h-[300px] md:h-[calc(90vh-30px)]">
                <img
                src="/assets/about/leader1.jpg"
                alt="Kushal Bhatia"
                className="h-[100%] w-full rounded-[8px] object-cover"
                />
            </div>

            {/* Content */}
            <div className="md:pr-4">

                <h2 className="font-[magistral] text-[24px] md:text-[40px] md:leading-[55.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]">
               Khushal Rathore
                </h2>

                <p className="md:mt-[6px] text-[16px] md:text-[20px] leading-[20px] text-[#424242]">
VP — Factory Operations
                </p>

                {/* Meta */}
                <div className="mt-4 md:mt-8 space-y-4">

                <div className="grid grid-cols-[130px_1fr]">
                    <span className="text-[#767676] text-[15px] md:text-[18px] leading-[20px] tracking-[0.4%]">Experience</span>
                    <span className="text-[15px] md:text-[18px] leading-[20px] font-[500] tracking-[0.4%] text-[#1E3C8C]">
                    27 years
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
                   B.E. in Mechanical Engineering<br/>
COO Certification (IIM Lucknow)<br/>
PGDBA in Operations Management (Symbiosis)



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
                    ? "max-h-[none] md:max-h-[142px] lg:max-h-[230px] 2xl:max-h-[250px] overflow-y-auto pr-3"
                    : "max-h-[none] md:max-h-[142px] lg:max-h-[230px] 2xl:max-h-[250px] overflow-hidden"
                }`}
                >
                <p>
Khushal Rathore is an operations and business transformation leader with over 27 years of experience across manufacturing, engineering, infrastructure, and industrial sectors. He brings a distinctive combination of operational rigour and commercial acumen — with a track record of building high-performing, future-ready manufacturing businesses at scale.
</p>
                <p className="mt-2">
In his current role at KEC Asian Cables, Khushal leads nationwide manufacturing operations across cable and infrastructure business units, with full accountability for operational performance, EBITDA, and strategic growth. Prior to this, he held senior operations leadership roles at Polycab India, Greenply Samet, ESAB India, Jakson, and Siemens India — where he commissioned a greenfield traction motor facility and implemented global manufacturing excellence practices.

                <p className="mt-2">
His career highlights include managing operations contributing to over ₹4,000 crore in annual revenue, delivering 20–25% year-on-year EBITDA growth, improving OEE from 65% to 85% through Lean and TPM implementation, and freeing ₹25 crore in working capital through supply chain optimisation. He has led multiple greenfield manufacturing ventures, launched new product verticals, and driven large-scale Industry 4.0, MES, IoT, and AI-driven planning transformations.
</p>

                <p className="mt-2">
Khushal holds a B.E. in Mechanical Engineering from Pune University — First Rank — alongside a COO Certification from IIM Lucknow, PGDBA in Operations Management from Symbiosis, Lean Six Sigma Green Belt, and a Certified Business Manager credential from Siemens AG.                </p>
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