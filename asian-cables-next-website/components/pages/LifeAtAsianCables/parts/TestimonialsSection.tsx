"use client";

const testimonials = [
  {
    name: "Poonam Rankawat",
    role: "Manager – Design",
    company: "11 Years at Asian Cables",
    text: "My journey at KEC Asian Cables has been defined by continuous learning, meaningful opportunities, and a strong sense of purpose. Culture is the soul of any organisation - it reflects its beliefs and values, and more importantly, how they are lived every day. At KEC Asian Cables, this is evident in a positive and engaging work environment where motivation and job satisfaction are visible across all levels. The balance between accountability and support empowers individuals to take ownership while staying aligned and inspired.",
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"],
  },
  {
    name: "Sitendra Pandey",
    role: "Manager – Business Excellence",
    company: "Asian Cables",
    text: "My time at Asian Cables has been both rewarding and impactful. The organisation's emphasis on discipline, performance, and continuous improvement creates an environment where consistent results and long-term value are prioritised. What truly distinguishes the culture is the positive and engaging work atmosphere where a sense of motivation and satisfaction is reflected across all levels. This balance between accountability and a supportive environment encourages individuals to take ownership while staying connected and driven.",
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"],
  },
  {
    name: "Amit Barasara",
    role: "Manager – Quality",
    company: "11 Years at Asian Cables",
    text: "Every day at KEC Asian Cables, I feel a sense of purpose and pride in what I do. I have been trusted with meaningful responsibilities and given room to grow professionally. The 5-Day Work Week Initiative has been a game-changer for my personal well-being. It gives me the balance to recharge and come back stronger. Here, I do not just feel like an employee - I feel valued, heard, and part of something bigger.",
    tags: ["Inspired", "Supported", "Growing", "Energized", "Proud"],
  },
];

// 3 unique testimonials -> 6 base cards -> duplicated to 12 for the loop.
// The track's second half is an exact copy of the first, so translateX(-50%)
// lands precisely on the copy: no jump, flicker, or reset. The 6-card loop
// unit is wider than any viewport, so no empty space appears even on ultrawide.
const loopCards = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#21409A] py-[40px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <div className="mb-10 lg:mb-[60px] px-5 sm:px-8 lg:px-12">
          <h2
            className="
              text-white
              text-[30px]
              sm:text-[38px]
              lg:text-[46px]
              font-bold
              italic
              leading-[1.2]
              lg:leading-[55.2px]
              tracking-[-0.92px]
            "
            style={{ fontFamily: "Magistral" }}
          >
            Hear From Our People
          </h2>

          <p
            className="
              mt-2
              text-white
              text-[18px]
              leading-[30.6px]
              font-normal
            "
            
          >
            Real voices from real journeys.
          </p>
        </div>
      </div>

      {/* Slider — full-bleed auto-scrolling marquee (outer container removed) */}
      <div className="ts-marquee">
        <div className="ts-track">
          {loopCards.map((item, index) => (
            <div
              key={index}
              aria-hidden={index >= testimonials.length}
              className="ts-card bg-white rounded-[10px] p-6 flex flex-col overflow-hidden h-[436px]"
            >
              {/* Quote */}
              <div className="w-[30px] h-[27px]">
                <svg
                  width="30"
                  height="27"
                  viewBox="0 0 30 27"
                  fill="#1E3C8C"
                >
                  <path d="M0 27V15.8C0 9.6 1.6 5 4.8 2C8 0 12 0 12 0V5C9.6 5 8 5.8 7 7.2C6 8.6 5.4 10.6 5.2 13H12V27H0ZM18 27V15.8C18 9.6 19.6 5 22.8 2C26 0 30 0 30 0V5C27.6 5 26 5.8 25 7.2C24 8.6 23.4 10.6 23.2 13H30V27H18Z" />
                </svg>
              </div>

              {/* Content */}
              <p
                className="mt-6 text-[18px] leading-[28px] text-[#555555] font-normal overflow-hidden line-clamp-6"
                
              >
                {item.text}
              </p>

              <div className="flex-1" />

              {/* Tags */}
              <div className="flex flex-wrap gap-3 pb-6 border-b border-[#E2E2E2]">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      h-[34px]
                      px-4
                      rounded-[68px]
                      flex
                      items-center
                      justify-center
                      bg-[#BECFFF33]
                      text-[#767676]
                      text-[16px]
                      leading-none
                    "
                    
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-6">
                <h3
                  className="text-[24px] font-semibold leading-[26px] text-black"
                  
                >
                  {item.name}
                </h3>

                <p
                  className="mt-2 text-[16px] font-medium text-[#767676]"
                  
                >
                  {item.role}
                </p>

                <p
                  className="mt-2 text-[12px] font-normal text-[#3CAADF]"
                  
                >
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .ts-marquee {
          width: 100%;
          overflow: hidden;
          /* vertical breathing room so a hover-scaled card isn't clipped */
          padding-top: 16px;
          padding-bottom: 16px;
        }

        .ts-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ts-scroll 50s linear infinite;
        }

        /* Per-card right margin (not flex gap) keeps both halves of the track
           exactly equal in width, so translateX(-50%) loops with no half-gap
           jump. 18px matches the original slide spacing. */
        .ts-track .ts-card {
          flex: 0 0 auto;
          /* fluid on small screens, capped at the original 538px. All cards
             share the same width, so the two track halves stay equal and
             translateX(-50%) remains seamless. */
          width: min(538px, 86vw);
          margin-right: 18px;
          /* hover scale — independent of the track's translateX, so it works
             while the carousel is auto-scrolling */
          position: relative;
          z-index: 1;
          transition: transform 0.35s ease;
        }

        /* Smoothly scale the hovered card up and lift it above neighbors. */
        .ts-track .ts-card:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        /* Pause on hover; CSS freezes the exact position and resumes from
           there when the pointer leaves. */
        .ts-marquee:hover .ts-track {
          animation-play-state: paused;
        }

        @keyframes ts-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
