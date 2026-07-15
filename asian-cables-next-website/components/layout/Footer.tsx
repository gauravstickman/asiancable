import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white" id="footer">
      <div className="absolute inset-0">
        <img
          src="/assets/footer.png"
          alt="Footer Background"
          className="h-full w-full object-cover object-left md:object-right-top"
        />

        {/* DARK OVERLAY */}
        {/* <div className="absolute inset-0" /> */}

        {/* OPTIONAL GLOW EFFECTS */}
        {/* <div className="absolute top-0 right-0 h-[700px] w-[700px] bg-red-500/30 blur-[140px]" /> */}
        {/* <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] bg-orange-500/20 blur-[120px]" /> */}
      </div>
      <div className="relative z-10 mx-auto max-w-[1272px]  pt-[50px]">
        {/* TOP CTA */}
        <div className="mb-[51px] flex flex-col gap-6 rounded-[6px] bg-white/13 px-[20px] md:px-[30px] py-[20px] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[20px] leading-[24px] tracking-[-1%] mb-[16px] font-black italic md:text-[20px]">
              Connect with us
            </h2>

            <p className="max-w-[550px] text-[14px] leading-[20px] tracking-[-0.4%] text-white/80 md:text-[14px]">
              Have a query or seek support?
              <br />
              Share your details here and our team will revert shortly.
            </p>
          </div>

          <div className="flex w-full flex-col gap-[8px] sm:flex-row lg:w-auto">
            <input
              type="email"
              placeholder="Your e-mail..."
              className="h-[48px] w-full rounded-[6px] bg-white px-4 text-[16px] leading-[24px] tracking-[-0.4%] text-[#646A69] placeholder:text-[#646A69] outline-none md:w-[296px]"
            />

            <button className="ma:justify-center flex h-[48px] items-center gap-3 rounded-lg px-5  text-[16px] leading-[24px] tracking-[-0.4%] transition md:text-[16px]">
              Get in touch
              <img src="/assets/arrow.svg" alt="" className="max-w-[12px]" />
            </button>
          </div>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* LEFT */}
          <div className="lg:col-span-2">
            {/* LOGO */}
            <div className="mb-8 flex items-center gap-5">
              <img
                src="/assets/footer-logo.svg"
                alt="Footer Background"
                className="h-full w-full max-w-[132px] object-cover object-right-bottom"
              />

              <div className="divider">
                <img
                  src="/assets/line.svg"
                  alt="Footer Background"
                  className="h-full w-full max-w-[26px] object-cover object-right-bottom"
                />
              </div>

              <img
                src="/assets/footer-logo-2.png"
                alt="Footer Background"
                className="h-full w-full max-w-[132px] object-cover object-right-bottom"
              />
            </div>

            {/* TEXT */}
            <p className="mb-[24px] md:mb-[68px] font-dm max-w-[412px] text-[16px] leading-[26px] tracking-[-0.5px] text-[#F3F3F3]/83">
              We offer a comprehensive portfolio of cables & conductors. Serving
              infrastructure and industrial systems central to sustainability
              and future growth in a globally connected world.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-2">
              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/in.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/instaa.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/fb.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#1E3C8C] transition">
                <img src="/assets/yt.svg" alt="" className="max-w-[16px]" />
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="lg:col-span-2">
            <p className="mb-[14px] text-[20px] leading-[28px] tracking-[-0.5px] font-[400]">Products</p>

            <ul className="space-y-[26px] text-[16px] leading-[16px] tracking-[-0.5px] font-[400] text-[#FBFBFB]/60 grid md:grid-cols-2">
            <Link href="/product/control-and-instrumentation">  <li>Control and Instrumentation</li></Link>
            <Link href="/product/low-voltage-lv-cables">  <li>Low Voltage (LV) Cables</li></Link>
             <Link href="/product/medium-voltage-cables"> <li>Medium Voltage Cables</li></Link>
           <Link href="/product/high-voltage-ehv-cables">   <li>High Voltage/EHV Cables</li></Link>
            <Link href="/product/elastomeric-rubber-cables">    <li>Elastomeric/Rubber Cables</li></Link>
            <Link href="/product/ev-cables">  <li>EV Cables</li></Link>
            <Link href="/product/overhead-line-conductors">  <li>Overhead LINE Conductors</li></Link>
            <Link href="/product/renewable-energy-cables">  <li>Renewable Energy Cables</li></Link>
             <Link href="/product/concentric-cables"> <li>Concentric Cables</li></Link>
             <Link href="/product/cathodic-protection-cables"> <li>Cathodic Protection Cables</li></Link>
             <Link href="/product/submersible-cables"> <li>Submersible Cables</li></Link>
             <Link href="/product/ul-cables"> <li>UL Cables</li></Link>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <p className="mb-[14px] text-[20px] leading-[28px] tracking-[-0.5px] font-[400]">Company</p>

            <ul className="space-y-[26px] text-[16px] leading-[16px] tracking-[-0.5px] font-[400] grid  text-[#FBFBFB]/60">
              <Link href="/about"><li>About Us</li></Link>
              <Link href="/rpg-group"><li>RPG Group</li></Link>
             <Link href="/resources"> <li>Resources</li></Link>
             <Link href="/manufacturing"> <li>Manufacturing</li></Link>
             <Link href="/clientele"> <li>Clientele</li></Link>
             <Link href="/sustainability"> <li>Sustainability</li></Link>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-[51px] flex flex-col justify-between gap-3 border-t border-white/20 pt-[26px] mb-[26px] md:items-center md:gap-6 lg:flex-row">
          <p className="text-[16px] font-[400] leading-[16px]  tracking-[-0.5px] text-[#D1D1D1]">
            © 2026 Asian Cables. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[16px] font-[400] leading-[16px]  tracking-[-0.5px] text-[#D1D1D1] md:gap-[24px]">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
