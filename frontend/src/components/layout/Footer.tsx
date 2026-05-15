import React from "react";
import { Globe, Mail, Phone, MapPin, Share2, Camera, Send } from "lucide-react";

const Footer = () => {
  return (
     <footer className=" relative overflow-hidden text-white">
         <div className="absolute inset-0">
      <img
        src="/src/assets/footer.png"
        alt="Footer Background"
        className="w-full h-full object-cover object-right-bottom"
      />
    
      {/* DARK OVERLAY */}
      <div className="absolute inset-0" />
    
      {/* OPTIONAL GLOW EFFECTS */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-red-500/30 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-orange-500/20 blur-[120px]" />
    </div>
          <div className="relative z-10 max-w-[1320px] mx-auto px-4 py-14">
            {/* TOP CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-8 py-8 mb-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black italic mb-4">
                  Connect with us
                </h2>
    
                <p className="text-white/80 text-[15px] leading-[22px] max-w-[550px]">
                  Have a query or seek support?
                  <br />
                  Share your details here and our team will revert shortly.
                </p>
              </div>
    
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Your e-mail..."
                  className="w-full lg:w-[380px] h-[48px] px-6 rounded-lg bg-white text-black outline-none text-lg"
                />
    
                <button className="h-[48px] px-8 rounded-lg transition flex items-center justify-center gap-3 text-[18px] font-medium">
                  Get in touch
    <img
      src="/src/assets/arrow.svg"
      alt=""
      className="max-w-[12px]" 
    />
                </button>
              </div>
            </div>
    
            {/* MAIN FOOTER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* LEFT */}
              <div className="lg:col-span-2">
                {/* LOGO */}
                <div className="flex items-center gap-5 mb-8">
                 <img
      src="/src/assets/footer-logo.svg"
      alt="Footer Background"
      className="w-full h-full object-cover object-right-bottom max-w-[132px]" 
    />
    
                  <div className="divider">
      <img
      src="/src/assets/line.svg"
      alt="Footer Background"
      className="w-full h-full object-cover object-right-bottom max-w-[26px]" 
    />
                  </div>
    
                  <span className="text-lg text-[14px]">
                    An RPG Company
                  </span>
                </div>
    
                {/* TEXT */}
                <p className="text-[#FBFBFB]/83  text-[16px] leading-[26px] max-w-[412px] mb-10">
                  We offer a comprehensive portfolio of cables &
                  conductors. Serving infrastructure and industrial systems
                  central to sustainability and future growth in a globally
                  connected world.
                </p>
    
                {/* SOCIAL */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#1B49B7] flex items-center justify-center cursor-pointer hover:scale-105 transition">
                      <img
      src="/src/assets/in.svg"
      alt=""
      className="max-w-[16px]" 
    />
                  </div>
    
                  <div className="w-10 h-10 rounded-lg bg-[#1B49B7] flex items-center justify-center cursor-pointer hover:scale-105 transition">
                       <img
      src="/src/assets/x.svg"
      alt=""
      className="max-w-[16px]" 
    />
                  </div>
    
                  <div className="w-10 h-10 rounded-lg bg-[#1B49B7] flex items-center justify-center cursor-pointer hover:scale-105 transition">
                        <img
      src="/src/assets/fb.svg"
      alt=""
      className="max-w-[16px]" 
    />
                  </div>
    
                  <div className="w-10 h-10 rounded-lg bg-[#1B49B7] flex items-center justify-center cursor-pointer hover:scale-105 transition">
                   <img
      src="/src/assets/yt.svg"
      alt=""
      className="max-w-[16px]" 
    />
                  </div>
                </div>
              </div>
    
              {/* PRODUCTS */}
              <div>
                <h3 className="text-[20px] font-normal mb-4">
                  Products
                </h3>
    
                <ul className="space-y-5 text-[#FBFBFB]/60 text-lg text-[16px]">
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
                <h3 className="text-[20px] font-normal mb-4">
                  Company
                </h3>
    
                <ul className="space-y-5 text-[#FBFBFB]/60 text-lg text-[16px]">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Sustainability</li>
                  <li>Investors</li>
                </ul>
              </div>
    
              {/* SUPPORT */}
              <div>
                <h3 className="text-[20px] font-normal mb-4">
                  Support
                </h3>
    
                <ul className="space-y-5 text-[#FBFBFB]/60 text-lg text-[16px]">
                  <li>Contact Us</li>
                  <li>Technical Support</li>
                  <li>Downloads</li>
                  <li>FAQs</li>
                </ul>
              </div>
            </div>
    
            {/* BOTTOM */}
            <div className="border-t border-white/20 mt-16 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
              <p className="text-[#D1D1D1]  text-[16px]">
                © 2026 Asian Cables. All rights reserved.
              </p>
    
              <div className="flex flex-wrap items-center gap-8 text-[#D1D1D1]  text-[16px]">
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
