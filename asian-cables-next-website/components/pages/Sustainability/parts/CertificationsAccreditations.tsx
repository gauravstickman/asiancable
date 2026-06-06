
function CertificationsAccreditations() {
  const items = [
    {
      img: "/assets/sustainability/img-1.png",
      title: "IGBC",
      desc: "Platinum-certified green factory (Vadodara)",
    },
    {
      img: "/assets/sustainability/img-2.png",
      title: "ISO 14001",
      desc: "Environmental Management Systems",
    },
    {
      img: "/assets/sustainability/img-3.png",
      title: "ISO 9001",
      desc: "Quality Management Systems",
    },
    {
      img: "/assets/sustainability/img-4.png",
      title: "ISO 45001",
      desc: "Occupational Health & Safety",
    },
  ];

  return (
    <section className="bg-white py-[47px] mb-10">
      <div className="mx-auto flex max-h-[473px] max-w-[1425px] flex-col items-center justify-center px-6">
        {/* Heading */}
        <h2 className="mb-[47px] font-[magistral] text-[46px] leading-[55.2px] font-bold tracking-[-0.92px] text-[#1E3C8C] italic">
          Certifications & Accreditations
        </h2>

        {/* Cards */}
        <div className="grid w-[1271px] grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex h-[209px] w-[299.75px] flex-col justify-center rounded-[4px] bg-[#F9F9F9] p-[24px] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-sm"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-[59px] w-[61px] object-contain"
              />

              <p className="mt-[16px] text-[22px] leading-[22.1px] font-medium text-[#1E3C8C]">
                {item.title}
              </p>

              <p className="mt-[16px] text-[16px] leading-[19.5px] font-normal text-[#767676]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificationsAccreditations;
