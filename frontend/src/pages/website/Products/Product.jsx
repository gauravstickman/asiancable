import React from 'react';
import { ShoppingBag, Mail, Phone, MapPin, Send, CircleCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import WebsiteNavbarDark from '../../../components/layout/Navbardark';
import Footer from '../../../components/layout/Footer';
import BottomBar from '../../../components/layout/Bottombar';
import FloatingActions from '../../../components/layout/Floatingactions';
import ProjectSection from '../Homepage/Parts/Applications';
import ProvenFieldSection from '../Homepage/Parts/Fields';
import ProductResources from './parts/ProductResources';
const Product = () => {
    return (
        <>
            <WebsiteNavbarDark/>
            <BottomBar/>

            <section className="bg-[#f6f6f6] pt-20 pb-24">
  <div className="max-w-[1320px] mx-auto px-4">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

      {/* LEFT IMAGE */}
      <div className="bg-white h-[680px] flex items-center justify-center">

        <img
          src="/src/assets/p-main.png"
          alt="Control Cable"
          className="w-[88%] object-contain"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div>

        {/* TAG */}
        <div className="inline-flex items-center justify-center h-[30px] px-4 bg-white mb-4">
          <span className="text-[#767676] text-[13px] tracking-[1px] font-medium uppercase">
            Power Cables
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-[#1E3C8C] text-[56px] leading-[1.3] font-black italic mb-4">
          Control and
          <br />
          instrumentation
        </h1>

        {/* DESCRIPTION */}
        <p className="text-[#525252] text-[17px] leading-[27px] mb-8 max-w-[100%]">
          Multicore, multi-pair control and instrumentation constructions
          with screening, individual pair shielding, and specialised
          jacketing options for chemical, temperature or EM-noisy
          environments; available in high-core counts (up to 61 cores and
          above) and varied pair configurations per plant specs.
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-2 gap-y-8 mb-10">

          {/* ITEM */}
          <div className="flex items-start gap-3 items-center">

            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/p-1.svg"
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-[#767676] text-[14px] leading-[1.4] mb-1 font-[500]">
                Voltage Rating
              </p>

              <span className="text-[#1E3C8C] text-[14px] leading-[1.4] font-bold">
                Up to 11 kV
              </span>
            </div>
          </div>

          {/* ITEM */}
          <div className="flex items-start gap-3 items-center">

            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/p-2.svg"
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-[#767676] text-[14px] leading-[1.4] mb-1 font-[500]">
                Conductor
              </p>

              <span className="text-[#1E3C8C] text-[14px] leading-[1.4] font-bold">
                Annealed Copper
              </span>
            </div>
          </div>

          {/* ITEM */}
          <div className="flex items-start gap-3 items-center">

            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/p-3.svg"
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-[#767676] text-[14px] leading-[1.4] mb-1 font-[500]">
                Insulation
              </p>

              <span className="text-[#1E3C8C] text-[14px] leading-[1.4] font-bold">
                PVC / XLPE
              </span>
            </div>
          </div>

          {/* ITEM */}
          <div className="flex items-start gap-3 items-center">

            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/p-4.svg"
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-[#767676] text-[14px] leading-[1.4] mb-1 font-[500]">
                Shielding
              </p>

              <span className="text-[#1E3C8C] text-[14px] leading-[1.4] font-bold">
                Individual / Overall Screening Options
              </span>
            </div>
          </div>
        </div>

        {/* IDEAL FOR */}
        <div>

          {/* LABEL */}
          <div className="flex items-center gap-3 mb-6">

           <div className="w-[3px] h-[26px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

            <h4 className="text-[#3B3B3B] text-[14px] font-semibold">
              Ideal For
            </h4>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-3">

            {[
              "Oil & gas",
              "Petrochemicals",
              "Power plants",
              "Industrial automation systems",
            ].map((item, index) => (
              <div
                key={index}
                className="h-[38px] px-4 bg-white flex items-center justify-center text-[#525252] text-[13px]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<section className="bg-[#ffffff] pt-30 pb-20">
  <div className="max-w-[1320px] mx-auto px-4">

    {/* TOP */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-10">

      {/* LEFT CONTENT */}
      <div>

        {/* TITLE */}
        <h2 className="text-[#1E3C8C] text-[46px] leading-[1.4] font-black italic mb-4">
          Product Overview
        </h2>

        {/* DESCRIPTION */}
        <p className="text-[#6F6F6F] text-[18px] leading-[1.9]  mb-8">
          Asian Cables Instrumentation cables are designed for
          accurate signal transmission in industrial control and
          monitoring systems. These cables feature high-quality
          copper conductors, advanced insulation materials and
          shielding options to minimize signal interference.
          Ideal for industries where precise data and signal
          transmission are critical for operational reliability.
        </p>

        {/* BUTTON */}
        <button className="h-[56px] px-10 bg-[#1E3C8C] rounded-[4px] text-white text-[16px] font-semibold hover:bg-[#17357F] transition">
          Request Technical Consultation
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">

        <div className="rounded-[8px] overflow-hidden shadow-[0px_20px_60px_rgba(0,0,0,0.12)]">

          <img
            src="/src/assets/image99.png"
            alt="Product Overview"
            className="w-full h-[520px] object-cover"
          />
        </div>
      </div>
    </div>

    {/* BOTTOM STATS */}
    <div className="bg-[#F0F0F0] rounded-[8px] px-10 py-6">

      <div className="flex justify-between items-center  px-8">

        {/* ITEM */}
        <div className="flex flex-col items-center justify-between">

          <div>
            <h3 className="text-[#1E3C8C] text-[34px] leading-[1.4] font-black italic">
              3600 km
            </h3>

            <p className="text-[#1E3C8C] text-[14px]">
              annual cable manufacturing capacity
            </p>
          </div>
            
       
        </div>
           {/* DIVIDER */}
          <div className="w-[3px] h-[50px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />

        {/* ITEM */}
        <div className="flex flex-col items-center justify-between">

          <div>
            <h3 className="text-[#1E3C8C] text-[34px] leading-[1.4] font-black italic">
              6+
            </h3>

            <p className="text-[#1E3C8C] text-[14px]">
              Decades of Cable Manufacturing Expertise
            </p>
          </div>
        </div>
   {/* DIVIDER */}
          <div className="w-[3px] h-[50px] bg-[linear-gradient(270deg,_#3CAADF_0%,_#F04123_50%,_#FFD212_100%)]" />
        {/* ITEM */}
        <div className="flex flex-col items-center justify-between">
              <div>
          <h3 className="text-[#1E3C8C] text-[34px] leading-[1.4] font-black italic">
            90+
          </h3>

          <p className="text-[#1E3C8C] text-[14px]">
            Presence in Countries
          </p>
        </div>
        </div>
      </div>
    </div>

  </div>
</section>


<ProductResources/>


<section className="bg-[#f6f6f6] py-15">
  <div className="max-w-[1320px] mx-auto px-4">

    {/* HEADING */}
    <div className="text-center mb-16">
      <h2 className="text-[#1E3C8C] text-[46px] leading-none font-black italic">
        Features & Standards
      </h2>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* LEFT BIG CARD */}
      <div className="lg:col-span-7 bg-white rounded-[6px] overflow-hidden relative min-h-[520px]">

        {/* BACKGROUND IMAGE */}
        <img
          src="/src/assets/Container-2.png"
          alt=""
          className="absolute top-0 right-0 w-[55%] h-full object-cover object-right-topss"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />

        {/* CONTENT */}
        <div className="relative z-10 p-10">

          {/* TITLE */}
          <h3 className="text-[#1E3C8C] text-[36px] leading-none font-black italic mb-12">
            Key Features
          </h3>

          {/* FEATURES */}
          <div className="space-y-8">

            {[
              "Accurate signal transmission with minimal interference",
              "Shielded construction options for noise reduction",
              "Flexible and durable cable construction",
              "Suitable for hazardous and industrial environments",
              "Reliable performance for monitoring and control systems",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                {/* ICON */}
                <div className="w-5 h-5 rounded-full bg-[#1E3C8C] flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-[14px]">
                    <CircleCheck size={25} />
                  </span>
                </div>

                {/* TEXT */}
                <p className="text-[#525252] text-[18px] leading-[1.7]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM RIGHT GRADIENT */}
        <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-[radial-gradient(circle,_rgba(255,210,18,0.35)_0%,_transparent_70%)]" />
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-5 flex flex-col gap-4">

        {/* ISO CARD */}
        <div className="relative bg-[#12398F] rounded-[6px] overflow-hidden h-[250px]">
               {/* BACKGROUND IMAGE */}
        <img
          src="/src/assets/footer.jpg"
          alt=""
          className="absolute top-0 right-0 w-[100%] h-full object-cover"
        />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">

            {/* ICON */}
            <div className="mb-6">
              <Award size={64} color="#ffffff" />
            </div>

            {/* TITLE */}
            <h3 className="text-white text-[28px] leading-none font-black italic mb-8">
              ISO Certifications
            </h3>

            {/* CERTIFICATIONS */}
            <div className="flex items-center gap-8">

              {["ISO 9001", "ISO 14001", "ISO 45001"].map((item, index) => (
                <span
                  key={index}
                  className="text-white text-[15px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STANDARDS CARD */}
        <div className="relative bg-white rounded-[6px] overflow-hidden h-[250px] p-10">

          {/* BACKGROUND GLOW */}
          <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[radial-gradient(circle,_rgba(60,170,223,0.18)_0%,_transparent_70%)]" />

         {/* BACKGROUND IMAGE */}
        <img
          src="/src/assets/Container-3.png"
          alt=""
          className="absolute top-0 right-0 w-[100%] h-full object-cover object-right-top"
        />
          {/* CONTENT */}
          <div className="relative z-10">

            {/* TITLE */}
            <h3 className="text-[#1E3C8C] text-[18px] leading-none font-black italic mb-10">
              Standards
            </h3>

            {/* LIST */}
            <div className="space-y-6">

              {[
                "IEC Standards",
                "BS Standards",
                "IS Standards",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[#1E3C8C]" />

                  <p className="text-[#5B5B5B] text-[15px] leading-[1]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>




<ProjectSection/>

<div className='proven-f w'>
  <ProvenFieldSection/>
</div>

            <Footer/>
        </>
       
    );
};

export default Product;
