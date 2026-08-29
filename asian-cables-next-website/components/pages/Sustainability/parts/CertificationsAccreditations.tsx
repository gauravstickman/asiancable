
function CertificationsAccreditations({ data }: { data?: any }) {
  const items = data?.certifications?.length > 0 ? data.certifications.map((c: any) => ({
    img: c.image ? (c.image.startsWith('http') ? c.image : `${process.env.NEXT_PUBLIC_BASE_URL}${c.image}`) : "/assets/sustainability/img-1.png",
    title: c.title,
    desc: c.description
  })) : [
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
      <div className="mx-auto flex  md:max-h-[473px] max-w-[1425px] flex-col items-center justify-center px-6">
        {/* Heading */}
        <h2 className="mb-[47px] font-[magistral] text-[32px] leading-[40px] md:text-[46px] md:leading-[55.2px] font-bold tracking-[-0.92px] px-1 bg-[linear-gradient(269.91deg,#3CAADF_4.39%,#F04123_59.1%,#FFD212_113.8%)] bg-clip-text text-transparent inline-block italic">
          {data?.certificationsTitle || ""}
        </h2>

        {/* Cards */}
        <div className="flex flex-nowrap w-[100%] overflow-x-auto industries md:grid md:w-[1271px] grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex md:text-left text-center md:h-[209px] md:min-w-[auto] min-w-[80vw] md:w-[299.75px] flex-col justify-center rounded-[4px] bg-[#F9F9F9] p-[24px] transition-all duration-300 ease-in-out hover:shadow-sm"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-[59px] w-[61px] object-contain md:m-0   m-auto"
              />

              <p className="mt-[16px] text-[18px] md:text-[22px] leading-[22.1px] font-medium text-[#1E3C8C]">
                {item.title}
              </p>

              <p className="mt-[16px] text-[14px] md:text-[16px] leading-[19.5px] font-normal text-[#767676]">
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
