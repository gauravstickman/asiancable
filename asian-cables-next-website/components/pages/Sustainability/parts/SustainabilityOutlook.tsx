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
    : [
        "Committed to sustainable operations",
        "Advancing the green economy and reducing our ecological footprint",
        "Preserving and enhancing natural capital",
        "Comprehensive environmental stewardship",
        "Healthier planet & a sustainable future",
      ];

  const headerTitle = data?.ourSustainabilityTitle || "Our Sustainability\nOutlook";
  const titleParts = headerTitle.split('\n');
  const name = titleParts[0] || "Our Sustainability";
  const title = titleParts[1] || "Outlook";

  const headerItems: HeaderItem[] = [
    {
      id: 1,
      name: name,
      title: title,
      description: data?.ourSustainabilityDescription ||
        "At Asian Cables, sustainability is an integral part of our manufacturing philosophy and business operations. Our facilities and processes are designed to deliver high-performance cable solutions while minimizing environmental impact and ensuring responsible resource management. As encapsulated in our sustainability purpose, “We transform lives by building sustainable world-class infrastructure.”",
    },
  ];

  const image = data?.ourSustainabilityImage
    ? (data.ourSustainabilityImage.startsWith('http') ? data.ourSustainabilityImage : `${process.env.NEXT_PUBLIC_BASE_URL}${data.ourSustainabilityImage}`)
    : "/assets/sustainability/img-5.png";

  return (
    <section className="flex w-full items-center justify-center bg-[#f5f5f5] py-25">
      <div className="relative top-[-14px] left-[3px] flex w-[1267px] flex-col gap-4 bg-[#FFFFFF] p-4">
        <div className="overflow-hidden bg-[#FFFFFF]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[58%_42%]">
            {/* Left Side */}
            <div className="relative">
              <img
                src={image}
                alt="Sustainability Outlook"
                className="W-[714PX] h-[726px] rounded-[3.91px] object-cover"
              />
              <div className="absolute bottom-8 left-9 max-w-[520px] text-[46.87px] leading-[51.56px] font-bold text-[#FFFFFF] italic">
                {headerItems.map((item) => (
                  <div key={item.id}>
                    <h2 className="mb-5 text-[52px] leading-[0.95] font-bold italic">
                       {item.name}
                      <br />
                      {item.title}
                    </h2>
                    <p className="text-[16.6px] leading-[29.88px] font-normal text-[#FFFFFFE5]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="h-[726px] w-[502px] bg-[#FFFFFF]">
              {sustainabilityItems.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex h-[145.2px] w-[502.86px] flex-row items-center justify-start gap-[24px] border-b border-[#E1E2E5] bg-[#F8F8F8] p-[36px]"
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
