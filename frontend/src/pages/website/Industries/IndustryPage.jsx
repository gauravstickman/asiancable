import React from 'react';
import { ShoppingBag, Mail, Phone, MapPin, Send, CircleCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
// import WebsiteNavbarDark from '../../../components/layout/Navbardark';
import WebsiteNavbar from "../../../components/layout/WebsiteNavbar";
import Footer from '../../../components/layout/Footer';
import BottomBar from '../../../components/layout/Bottombar';
import ProvenProjects from './parts/ProvenGrid';
import TrustedLeaders from './parts/TrustSection';
import IndustryProducts from './parts/Cables';
import AsianCablesImpact from './parts/Impact';
import IndustryApplications from './parts/IndustryApplications';
const IndustryPage = () => {
    return (
        <>
            <WebsiteNavbar/>

          <section className="relative  overflow-hidden1">

  {/* BACKGROUND IMAGE */}
  <img
    src="/src/assets/industry-main.png"
    alt="Oil & Gas"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-[1320px] mx-auto px-4 pt-[180px] pb-[170px]">

    {/* TAG */}
    <div className="inline-flex items-center justify-center h-[28px] px-3 bg-white/10 backdrop-blur-md  mb-5">
      <span className="text-white text-[14px] tracking-[1px] uppercase">
        Industries
      </span>
    </div>

    {/* TITLE */}
    <h1 className="text-white text-[72px] leading-[0.9] font-black italic mb-7">
      Oil & Gas
    </h1>

    {/* DESCRIPTION */}
    <p className="max-w-[880px] text-white/90 text-[20px] leading-[1.7]">
      Enabling uninterrupted operations across upstream,
      midstream, and downstream facilities through cabling
      solutions aligned to safety protocols, reliability
      requirements, and asset integrity expectations.
      Specialized cable solutions support energy infrastructure
      including refineries, petrochemical plants and pipeline
      protection systems.
    </p>
  </div>

  {/* BOTTOM STATS */}
  <div className="absolute left-1/2 bottom-0 z-20 w-full max-w-[1320px] -translate-x-1/2 translate-y-1/2 px-4">

    <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-[6px] shadow-[0px_25px_60px_rgba(0,0,0,0.25)]">

      {/* ITEM */}
      <div className="bg-[#F3F3F3] px-10 py-10">

        <h3 className="text-[52px] leading-none font-black italic mb-4 bg-[linear-gradient(270.87deg,_#3CAADF_3.87%,_#F04123_63.34%,_#FFD212_122.81%)]  bg-clip-text text-transparent">
          3600 Km/Yr
        </h3>

        <p className="text-[#525252] text-[16px]">
          EHV Cable Production
        </p>
      </div>

      {/* ITEM */}
      <div className="bg-[#F3F3F3] border-l border-[#E2E2E2] px-10 py-10">

        <h3 className="text-[52px] leading-none font-black italic mb-4 bg-[linear-gradient(270.87deg,_#3CAADF_3.87%,_#F04123_63.34%,_#FFD212_122.81%)] bg-clip-text text-transparent">
          60+ Yrs
        </h3>

        <p className="text-[#525252] text-[16px]">
          Cable Manufacturing Expertise
        </p>
      </div>

      {/* ITEM */}
      <div className="bg-[#1E3C8C] px-10 py-10">

        <h3 className="text-white text-[52px] leading-none font-black italic mb-4">
          NABL
        </h3>

        <p className="text-white/90 text-[16px]">
          Accredited Testing Lab
        </p>
      </div>
    </div>
  </div>
</section>

<ProvenProjects/>
<TrustedLeaders/>
<IndustryProducts/>
<AsianCablesImpact/>
<IndustryApplications/>
            <Footer/>
        </>
       
    );
};

export default IndustryPage;
