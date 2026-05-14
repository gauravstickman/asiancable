import React from "react";
import { Globe, Mail, Phone, MapPin, Share2, Camera, Send, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold italic tracking-tighter uppercase">
            Asian<span className="text-blue-200">Cables</span>
          </h3>
          <p className="text-blue-100/80 text-sm leading-relaxed">
            Powering progress through innovation since 1959. Delivering world-class 
            cable solutions for critical infrastructure across the globe.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-300 transition-colors"><Share2 size={20} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Send size={20} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Camera size={20} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Globe size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-blue-100/80">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/products" className="hover:text-white transition-colors">Product Range</a></li>
            <li><a href="/applications" className="hover:text-white transition-colors">Applications</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Products</h4>
          <ul className="space-y-4 text-sm text-blue-100/80">
            <li><a href="#" className="hover:text-white transition-colors">Power Cables</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Control Cables</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instrumentation Cables</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Telecom Cables</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Specialty Cables</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-blue-100/80">
            <li className="flex gap-3">
              <MapPin size={18} className="text-blue-300 shrink-0" />
              <span>RPG House, 463, Dr. Annie Besant Road, Worli, Mumbai - 400 030</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-blue-300 shrink-0" />
              <span>+91 22 2493 0621</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-blue-300 shrink-0" />
              <span>contact@asiancables.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-blue-800 text-center text-xs text-blue-200/50 uppercase tracking-widest">
        <p>© 2026 Asian Cables. A part of RPG Group. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
