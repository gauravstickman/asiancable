import { Zap } from "lucide-react";

interface HeaderItem {
  id: number;
  name: string;
  title: string;
  description: string;
}

function SustainabilityOutlook({ data }: { data?: any }) {
  const sustainabilityItems = data?.commitments?.length > 0 
    ? data.commitments.map((c: any) => c.text)
    : [];

  const headerTitle = data?.ourSustainabilityTitle || "";
  const titleParts = headerTitle.split("\n");
  const name = titleParts[0] || "";
  const title = titleParts[1] || "";

  const headerItems: HeaderItem[] = [
    {
      id: 1,
      name: name,
      title: title,
      description: data?.ourSustainabilityDescription || "",
    },
  ];

  const image = data?.ourSustainabilityImage
    ? (data.ourSustainabilityImage.startsWith('http') ? data.ourSustainabilityImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.ourSustainabilityImage}`)
    : "/assets/sustainability/img-5.png";

  return (
    <section className="flex w-full items-center justify-center bg-[#f5f5f5] pt-10 pb-5 md:pt-25 md:p-25">
      <div className="relative top-[-14px] left-[3px] flex w-[1267px] flex-col gap-4 bg-[#FFFFFF] p-4">
        <div className="overflow-hidden bg-[#FFFFFF]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[58%_42%]">
            {/* Left Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.25)_7.98%,_rgba(0,0,0,0.25)_54.92%)]"></div>
              <img
                src={image}
                alt="Sustainability Outlook"
                className="md:W-[714PX] h-[726px] rounded-[3.91px] object-cover"
              />
              <div className="absolute bottom-8 md:left-9 md:right-9  left-5 right-5 ms:max-w-[520px] text-[46.87px] leading-[51.56px] font-bold text-[#FFFFFF] italic">
                {headerItems.map((item) => (
                  <div key={item.id}>
                    <h2 className="mb-4 text-[32px] md:text-[46.87px] leading-[51.56px] leading-[0.95] font-bold italic">
                       {item.name}
                      <br />
                      {item.title}
                    </h2>
                    <p className="text-[18px] md:text-[16.6px] leading-[29.88px] font-normal text-[#FFFFFFE5]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="md:h-[726px] md:w-[502px] bg-[#FFFFFF]">
              {sustainabilityItems.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex md:h-[145.2px] md:w-[502.86px] flex-row items-center justify-start gap-[24px] border-b border-[#E1E2E5] bg-[#F8F8F8] p-[24px] md:p-[36px]"
                >
                  <Zap className="h-[16.6px] w-[15.0px] shrink-0 text-[#1E3C8C]" />
                  <p className="text-[16px] leading-[32.22px] font-normal tracking-[0px] text-[#1E3C8C]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SustainabilityOutlook;
