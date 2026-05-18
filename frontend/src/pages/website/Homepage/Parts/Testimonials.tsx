"use client";

const testimonials = [
  {
    text: `"Asian Cables exceeded expectations. Their team collaborated seamlessly, resulting in a visually stunning and functional end product."`,
    name: "Danny Tanner",
    role: "Co-Founder | Atomic",
    image: "/src/assets/engineering.png",
  },
  {
    text: `"We’ve partnered with several providers in the past, but none compared to Asian Cables’ meticulous attention to detail and true dedication to our needs. They made the whole experience seamless — and the outcomes are undeniable."`,
    name: "Lynn Tanner",
    role: "Co-Founder | Atomic",
    image: "/src/assets/engineering.png",
  },
  {
    text: `"Working with Asian Cables was like discovering a fresh wave of innovation. They grasped our goals immediately and transformed them into reality with skillful execution and daring design elements."`,
    name: "Kevin Arnold",
    role: "Co-Founder | Atomic",
    image: "/src/assets/engineering.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#ffffff] overflow-hidden">
      <div className="max-w-[100%] mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-[46px] leading-none font-black italic text-[#1E3C8C]">
            What Our Clients Say
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-hidden">

          <div className="flex gap-6 w-max animate-marquee">

            {/* FIRST SET */}
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-[460px] max-w-[460px] h-[290px] bg-[#EEF3F6] rounded-[6px] p-10 flex flex-col justify-between"
              >
                {/* TEXT */}
                <p className="text-[17px] leading-[1.5] text-[#111111]">
                  {item.text}
                </p>

                {/* PROFILE */}
                <div className="flex items-center gap-4">
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-[16px] leading-none font-black italic text-black mb-2">
                      {item.name}
                    </h4>

                    <p className="text-[14px] text-[#8B8B8B]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* DUPLICATE */}
            {testimonials.map((item, index) => (
              <div
                key={`duplicate-${index}`}
                className="min-w-[460px] max-w-[460px] h-[290px] bg-[#EEF3F6] rounded-[6px] p-10 flex flex-col justify-between"
              >
                {/* TEXT */}
                <p className="text-[17px] leading-[1.5] text-[#111111]">
                  {item.text}
                </p>

                {/* PROFILE */}
                <div className="flex items-center gap-4">
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-[16px] leading-none font-black italic text-black mb-2">
                      {item.name}
                    </h4>

                    <p className="text-[14px] text-[#8B8B8B]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}