import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const WebsiteNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className={`text-2xl font-black italic tracking-tighter uppercase transition-colors ${
            isScrolled ? 'text-[#1E3A8A]' : 'text-white'
          }`}>
            Asian<span className={isScrolled ? 'text-blue-500' : 'text-blue-200'}>Cables</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'About', 'Products', 'Applications', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-[#1E3A8A]' : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
            </Link>
          ))}
          <Link 
            to="/login" 
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              isScrolled 
                ? 'bg-[#1E3A8A] text-white hover:bg-blue-800' 
                : 'bg-white text-[#1E3A8A] hover:bg-blue-50'
            }`}
          >
            Client Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6">
            {['Home', 'About', 'Products', 'Applications', 'Contact'].map((item) => (
              <Link 
                key={item} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-[#1E3A8A]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="w-full py-4 bg-[#1E3A8A] text-white text-center text-xs font-black uppercase tracking-widest rounded-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Client Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default WebsiteNavbar;
