"use client";

import { Phone, Mail } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const officeLocations = [
  {
    state: "GUJARAT",
    title: "Vadodara Factory",
    company: "KEC Asian Cables Limited",
    subsidiary: "A KEC International Ltd. Subsidiary",
    address: [
      "Village: Godampura (Samlaya)",
      "Taluka: Savli",
      "Savli-Samlaya Road, Vadodara, 391520",
    ],
    phone: "+91 XX XXXX XXXX",
    email: "contact@asiancables.com",
  },
  {
    state: "KARNATAKA",
    title: "Mysore Factory",
    company: "KEC Asian Cables Limited",
    subsidiary: "A KEC International Ltd. Subsidiary",
    address: [
      "No 349 /350, Hebbal Industrial Area",
      "Hootagalli, Mysore, 570018",
    ],
    phone: "+91 XX XXXX XXXX",
    email: "contact@asiancables.com",
  },
  {
    state: "KARNATAKA",
    title: "Bangalore",
    company: "KEC Asian Cables Limited",
    subsidiary: "A KEC International Ltd. Subsidiary",
    address: [
      "# 2471, E-Block, 1st Floor, 10th Cross,",
      "13th Main Road, Opp. BBMP Park, Sahakar Nagar",
      "Bengaluru, 560092",
    ],
    phone: "+91 XX XXXX XXXX",
    email: "contact@asiancables.com",
  },

  // Repeat as many as needed
  {
    state: "MAHARASHTRA",
    title: "Mumbai Office",
    company: "KEC Asian Cables Limited",
    subsidiary: "Corporate Office",
    address: [
      "RPG House, 463 Dr. Annie Besant Road",
      "Worli",
      "Mumbai, 400030",
    ],
    phone: "+91 XX XXXX XXXX",
    email: "contact@asiancables.com",
  },
];

function OfficeCard({ item }: { item: (typeof officeLocations)[0] }) {
  return (
    <div className="h-full rounded-[12px] border-2 border-[#E1E2E580] bg-white p-6 shadow-[0px_4px_142.8px_0px_#0000000D]">
      <p className="mb-6 text-[10px] font-medium uppercase tracking-[0px] text-[#525252]">
        {item.state}
      </p>

      <h3 className="font-[magistral] text-[18px] italic font-bold text-[#1E3C8C]">
        {item.title}
      </h3>

      <p className="mt-2 text-[14px] leading-[21px] font-[600] text-[#525252]">
        {item.company}
      </p>

      <p className="mt-[2px] mt-2 text-[14px] leading-[21px] font-[400] text-[#525252]">
        {item.subsidiary}
      </p>

      <div className="mt-3">
        {item.address.map((line, idx) => (
          <p
            key={idx}
            className="text-[14px] leading-[29px] text-[#525252]"
          >
            {line}
          </p>
        ))}
      </div>

      <div className="my-6 h-px bg-[#E5E5E5]" />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Phone
            size={16}
            className="text-[#1E3C8C]"
          />
          <span className="text-[14px] leding-[21px] font-[500] text-[#525252]">
            {item.phone}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Mail
            size={16}
            className="text-[#1E3C8C]"
          />
          <span className="text-[14px] leding-[21px] text-[#525252]">
            {item.email}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function OfficeLocations() {

const mobileLocations =
  officeLocations.length < 5
    ? [...officeLocations, ...officeLocations]
    : officeLocations;

  return (
    <section className="bg-[#FFFFFF] py-10 md:py-[80px]">
      <div className="mx-auto max-w-[1280px] px-5">
        {/* Heading */}
        <h2 className="font-[magistral] text-[28px] leading-[100%] tracking-[-2%] md:text-[46px] md:leading-[55.2px] md:tracking-[-0.92px] italic font-bold text-[#1E3C8C]">
          Our Offices & Manufacturing Facilities
        </h2>

        <p className="mt-[16px] md:mt-[10px] text-[16px] leading-[150%] md:text-[18px] md:leading-[30.6px] text-[#525252]">
          Serving customers across India through manufacturing
          facilities, regional offices, and commercial hubs.
        </p>

        {/* Desktop */}
        <div className="mt-15 hidden md:grid grid-cols-3 gap-9">
          {officeLocations.map((item, index) => (
            <OfficeCard
              key={index}
              item={item}
            />
          ))}
        </div>

        
      </div>
      {/* Mobile */}
            <div className="mt-10 block md:hidden ml-5">
            <Swiper
    modules={[Autoplay]}
    slidesPerView={1.15}
    centeredSlides={false}
    spaceBetween={12}
    loop={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    speed={800}
  >
                {mobileLocations.map((item, index) => (
                <SwiperSlide key={index} className="py-5">
                    <OfficeCard item={item} />
                </SwiperSlide>
                ))}
            </Swiper>
            </div>
    </section>
  );
}