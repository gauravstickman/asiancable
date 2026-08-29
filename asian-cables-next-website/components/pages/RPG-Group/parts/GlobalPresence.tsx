"use client";

import React from "react";

function GlobalPresenceSection({ data }: { data?: any }) {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 120);
    return () => clearTimeout(t);
  }, []);

  const topContent = {
    title: data?.globalTitle || "",
    description: data?.globalDescription || "",
  };

  const bottomStats = data?.globalMainStats?.length > 0 ? data.globalMainStats.map((stat: any, index: number) => ({
    value: stat.value,
    label: stat.label,
    divider: index < data.globalMainStats.length - 1
  })) : [
    { value: "35K+", label: "Employees", divider: true },
    { value: "135+", label: "Countries" },
  ];

  const statsData = data?.globalCards?.length > 0 ? data.globalCards.map((card: any, index: number) => ({
    id: index + 1,
    title: <>{card.value}</>,
    label: card.label,
    colSpan: index === data.globalCards.length - 1
  })) : [
    { id: 1, title: <>1979</>, label: "Founded" },
    { id: 2, title: <>USD 5.2<br/>billion</>, label: "Group Turnover" },
    { id: 3, title: <>DR. R P<br/>Goenka</>, label: "Founder", colSpan: true },
  ];

  return (
    <section className="relative overflow-hidden bg-[#002B8F] py-15 md:py-24">
      {/* Background */}
      <img
        src={data?.globalImage ? (data.globalImage.startsWith('http') ? data.globalImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.globalImage}`) : "/assets/rpggroup/bgIcons1.png"}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Main Container */}
      <div className="relative z-20 mx-auto max-w-[1235px] px-6">
        <div className="border-[4px] border-white bg-white p-[8px] shadow-[0px_30px_100px_rgba(0,0,0,0.35)]">
          {/* SAME HEIGHT BOTH SIDES */}
          <div className="grid items-stretch gap-[8px] lg:grid-cols-[580px_1fr]">
            {/* LEFT IMAGE SECTION */}
            <div className="relative h-[398px] overflow-hidden rounded-[4px]">
              <img
                src="/assets/rpggroup/planeIcon.png"
                alt="Global Presence"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 md:px-[36px] md:py-[38px]">
                {/* TOP CONTENT */}
                <div className="md:pt-[70px]">
                  <p className="font-[Magistral] text-[36px] leading-[43px] md:text-[38px] md:leading-[41.8px] font-bold tracking-[0px] text-white italic">
                    {topContent.title}
                  </p>

                  <p className="mt-4 max-w-[430px] font-['Work_Sans'] text-[16px] leading-[27.2px] font-normal tracking-[0px] text-[#FFFFFFCC]">
                    {topContent.description}
                  </p>
                </div>

                {/* BOTTOM STATS */}
                <div className="flex items-end md:mt-0 md:mb-0 mb-10 gap-18">
                  {bottomStats.map((item: any, index: number) => (
                    <div key={index}>
                      <div className="flex relative items-end gap-5">
                        <h3 className="font-[Magistral] text-[20px] leading-[26px] md:text-[36px] md:leading-[54px] font-bold tracking-[0px] text-white italic">
                          {item.value}
                        </h3>

                        {item.divider && (
<div className="absolute  ml-[36px] right-[-36px] top-2 md:top-4 h-[30px] md:h-[46px] w-[3px] bg-[linear-gradient(360deg,#3CAADF_0%,#F04123_50%,#FFD212_100%)]" />                        )}
                      </div>

                      <p className="font-['Work_Sans'] text-[13px] leading-[19.5px] font-normal tracking-[0px] text-[#FFFFFFCC]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT BOXES */}
            <div className="grid md:h-[398px] grid-cols-2 gap-[8px]">
              {/* CARD 1 */}
              <div className="flex h-[129px] md:h-[195px] flex-col justify-center rounded-[4px] bg-[#F6F6F6]  pl-6 md:pl-[36px]">
                <div className="flex flex-col gap-[18px]">
                  <p className="font-[magistral] text-[18px] leading-[26px] md:text-[42px] md:leading-[45px] font-bold tracking-[0px] italic">
                 <span className="pr-1.5 bg-[linear-gradient(270.13deg,#3CAADF_4.69%,#F04123_52.29%,#FFD212_99.89%)] bg-clip-text text-transparent">
{statsData[0]?.title}</span>
                  </p>

                  <p className="font-[work_sans] text-[14px] md:text-[18px] leading-[19.5px] font-normal tracking-normal text-[#000000CC]">
                    {statsData[0].label}
                  </p>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="flex h-[129px] md:h-[195px] flex-col justify-center rounded-[4px] bg-[#F6F6F6]  pl-6 md:pl-[36px]">
                <div className="flex flex-col gap-[18px]">
                  <p className="font-[magistral] text-[18px] leading-[26px] md:text-[42px] md:leading-[45px] font-bold tracking-[0px] italic">
                    <span className="pr-1.5   bg-[linear-gradient(270.13deg,#3CAADF_4.69%,#F04123_52.29%,#FFD212_99.89%)] bg-clip-text text-transparent">
{statsData[1]?.title}</span>
                  </p>

                  <p className="text-[14px] md:text-[18px] leading-[19.5px] font-normal tracking-normal text-[#000000CC]">
                    {statsData[1]?.label}
                  </p>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="col-span-2 flex h-[119px] md:h-[195px] flex-col justify-center rounded-[4px] bg-[#F6F6F6] pl-6 md:pl-[36px]">
                <div className="flex flex-col gap-[18px]">
                  <p className="font-[magistral] text-[18px] leading-[26px] md:text-[42px] md:leading-[45px] font-bold tracking-[0px] italic">
                   <span className="pr-1.5  bg-[linear-gradient(270.13deg,#3CAADF_4.69%,#F04123_52.29%,#FFD212_99.89%)] bg-clip-text text-transparent">
 {statsData[2]?.title}</span>
                  </p>

                  <p className="font-[work_sans] text-[14px] md:text-[18px] leading-[19.5px] font-normal tracking-normal text-[#000000CC]">
                    {statsData[2]?.label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalPresenceSection;
