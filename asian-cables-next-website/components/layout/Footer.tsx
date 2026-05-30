const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white" id="footer">
      <div className="absolute inset-0">
        <img
          src="/assets/footer.png"
          alt="Footer Background"
          className="h-full w-full object-cover object-left md:object-right-bottom"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0" />

        {/* OPTIONAL GLOW EFFECTS */}
        <div className="absolute top-0 right-0 h-[700px] w-[700px] bg-red-500/30 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] bg-orange-500/20 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 py-14">
        {/* TOP CTA */}
        <div className="mb-16 flex flex-col gap-6 rounded-lg bg-white/10 px-8 py-8 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[20px ] mb-4 font-black italic md:text-3xl">
              Connect with us
            </h2>

            <p className="max-w-[550px] text-[14px] leading-[22px] text-white/80 md:text-[15px]">
              Have a query or seek support?
              <br />
              Share your details here and our team will revert shortly.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
            <input
              type="email"
              placeholder="Your e-mail..."
              className="h-[48px] w-full rounded-lg bg-white px-6 text-lg text-black outline-none lg:w-[380px]"
            />

            <button className="ma:justify-center flex h-[48px] items-center gap-3 rounded-lg px-8 text-[16px] font-medium transition md:text-[18px]">
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
            <p className="mb-10 max-w-[412px] text-[16px] leading-[26px] text-[#FBFBFB]/83">
              We offer a comprehensive portfolio of cables & conductors. Serving
              infrastructure and industrial systems central to sustainability
              and future growth in a globally connected world.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#1B49B7] transition hover:scale-105">
                <img src="/assets/in.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#1B49B7] transition hover:scale-105">
                <img src="/assets/x.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#1B49B7] transition hover:scale-105">
                <img src="/assets/fb.svg" alt="" className="max-w-[16px]" />
              </div>

              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#1B49B7] transition hover:scale-105">
                <img src="/assets/yt.svg" alt="" className="max-w-[16px]" />
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <p className="mb-4 text-[20px] font-normal">Products</p>

            <ul className="space-y-3 text-[16px] font-normal text-[#FBFBFB]/60">
              <li>Specialty Cables</li>
              <li>Power Cables</li>
              <li>Railway Cables</li>
              <li>Control & Instrumentation</li>
              <li>Conductors</li>
              <li>Telecom & OFC</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <p className="mb-4 text-[20px] font-normal">Company</p>

            <ul className="space-y-3 text-[16px] font-normal text-[#FBFBFB]/60">
              <li>About Us</li>
              <li>Careers</li>
              <li>Sustainability</li>
              <li>Investors</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <p className="mb-4 text-[20px] font-normal">Support</p>

            <ul className="space-y-3 text-[16px] font-normal text-[#FBFBFB]/60">
              <li>Contact Us</li>
              <li>Technical Support</li>
              <li>Downloads</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/20 pt-8 md:items-center md:gap-6 lg:flex-row">
          <p className="text-[16px] text-[#D1D1D1]">
            © 2026 Asian Cables. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[16px] text-[#D1D1D1] md:gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
