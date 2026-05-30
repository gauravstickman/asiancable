import { getBaseUrl } from "../../../../utils/api";

export default function TrustedLeaders({ dynamicData, sectionTitle }: { dynamicData?: any[], sectionTitle?: string }) {
  const fallbackLogos = [
    "/assets/jica.svg",
    "/assets/gprc.svg",
    "/assets/csiro.svg",
    "/assets/bode.svg",
    "/assets/daniel.svg",
  ];

  const dynamicItems = (dynamicData || []).map((logo: any) => {
    const logoUrl = typeof logo === 'string' ? logo : (logo?.image || logo?.url || logo?.logo || "");
    if (!logoUrl) return "";
    return logoUrl.startsWith("http") ? logoUrl : `${getBaseUrl()}${logoUrl}`;
  }).filter(Boolean);

  const displayLogos = [
    ...dynamicItems,
    ...fallbackLogos.slice(dynamicItems.length)
  ].slice(0, 5);

  return (
    <section className="reveal-section bg-[#ffffff] pt-5 pb-10 md:pb-24">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* HEADING */}
        <div className="mb-10 text-center md:mb-20">
          <h2 className="text-[23px] leading-none font-black text-[#7A7A7A] italic">
            {sectionTitle || "Trusted by Industry Leaders"}
          </h2>
        </div>

        {/* LOGOS */}
        <div className="grid grid-cols-5 items-center gap-4 md:grid-cols-5 md:gap-12 lg:grid-cols-5">
          {displayLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center transition duration-300 hover:opacity-100 md:opacity-50"
            >
              <img
                src={logo}
                alt="Client Logo"
                className="max-h-[50px] object-contain grayscale transition duration-300 hover:grayscale-0 md:max-h-[60px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
