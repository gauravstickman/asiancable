export default function TrustedLeaders() {
  const logos = [
    "/src/assets/jica.svg",
    "/src/assets/gprc.svg",
    "/src/assets/csiro.svg",
    "/src/assets/bode.svg",
    "/src/assets/daniel.svg",
  ];

  return (
    <section className="bg-[#ffffff] pt-5 pb-24 reveal-section">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-20">
          <h2 className="text-[#7A7A7A] text-[23px] leading-none font-black italic">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* LOGOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center">

          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-50 hover:opacity-100 transition duration-300"
            >

              <img
                src={logo}
                alt="Client Logo"
                className="max-h-[60px] object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}