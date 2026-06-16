import EventGallery from "./EventGallery";

export default function EventIntroduction() {
  return (
    <div className="reveal-section">
      <h2 className="mb-1 text-[24px] font-bold italic text-[#1E3C8C] tracking-[1%]">
        EVENT RECAP – Wire & Cable India 2025
      </h2>

      <p className="text-[16px] md:text-[20px] tracking-[1%] text-[#767676]">
        Pragati Maidan, New Delhi | 4-Day Exhibition
      </p>

      <div className="mt-5 space-y-8">
        <p className="text-[16px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]">
          Asian Cables participated in Wire & Cable India 2025 — one of
          India's most significant platforms for the wire, cable, and allied
          industries. The event brought together manufacturers, EPC companies,
          consultants, infrastructure developers, OEMs, and distribution
          partners from across India and internationally.
        </p>

        <p className="text-[16px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]">
          The Asian Cables pavilion showcased a comprehensive portfolio spanning
          Low and Medium Voltage Power Cables, Building Wires, Flexible and
          Control Cables, Fire Resistant and Fire Survival Cables, Solar PV
          Cables, and customised project-specific solutions — drawing strong
          interest from across the electrical and infrastructure ecosystem.
        </p>

        <p className="text-[16px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]">
          Over four days, the team engaged with electrical consultants, EPC
          contractors, infrastructure and real estate developers, government
          representatives, OEMs, renewable energy companies, and dealer
          partners. Conversations centred on product performance,
          application-specific requirements, and emerging opportunities across
          power distribution, smart buildings, renewable energy, data centres,
          metro rail, and industrial automation.
        </p>

        <p className="text-[16px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]">
          The participation reinforced Asian Cables' position as a trusted
          engineering partner — and opened new ground for partnerships that will
          carry forward well beyond the exhibition floor.
        </p>
      </div>

<EventGallery
  images={[
    "assets/events/main-g.png",
    "assets/events/2.jpg",
    "assets/events/3.jpg",
    "assets/events/4.jpg",
    "assets/events/5.jpg",
    "assets/events/6.jpg",
    "assets/events/7.jpg",
    "assets/events/8.jpg",
     "assets/events/9.jpg",
    "assets/events/10.jpg",
    "assets/events/11.png",
  ]}
/>

    </div>
  );
}