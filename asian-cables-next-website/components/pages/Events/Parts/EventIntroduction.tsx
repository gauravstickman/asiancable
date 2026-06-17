import EventGallery from "./EventGallery";

export default function EventIntroduction({ event }: { event?: any }) {
  const title = event?.title || "Wire & Cable India 2025";
  const location = event?.location || "Pragati Maidan, New Delhi";
  const duration = event?.duration || "4-Day Exhibition";
  const description = event?.description;
  const galleryImages = event?.galleryImages && event.galleryImages.length > 0 ? event.galleryImages : [
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
  ];

  return (
    <div className="reveal-section">
      <h2 className="mb-1 text-[24px] font-bold italic text-[#1E3C8C] tracking-[1%]">
        EVENT RECAP – {title}
      </h2>

      <p className="text-[16px] md:text-[20px] tracking-[1%] text-[#767676]">
        {location} | {duration}
      </p>

      {description ? (
        <div className="mt-5 space-y-8 event-description">
          {description.split('. ').map((sentence: string, index: number) => {
            if (!sentence.trim()) return null;
            return (
              <p key={index} className="text-[16px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]">
                {sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}
              </p>
            );
          })}
        </div>
      ) : (
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
      )}

<EventGallery
  images={galleryImages}
/>

    </div>
  );
}