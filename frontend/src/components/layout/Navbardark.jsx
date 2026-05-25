  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { Menu, X, ChevronRight, Search } from 'lucide-react';

const WebsiteNavbarDark = () => {
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
  className={`sticky top-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-white/90 backdrop-blur-md shadow-sm"
      : "bg-transparent"
  }`}
>
      <div className="max-w-[1320px] mx-auto px-6 h-[85px] flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
           <img
    src={
      isScrolled
        ? "/src/assets/LOGO_Dark.svg"
        : "/src/assets/LOGO_Dark.svg"
    }
    alt="Asian Cables"
    className="h-[36px] w-auto transition-all duration-300"
  />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Products', 'The Company', 'Career', 'Investors'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`text-[16px]  font-normal  transition-colors ${
                isScrolled ? 'text-[#1E3C8C] hover:text-[#1E3C8C]' : 'text-[#1E3C8C] hover:text-[#1E3C8C]'
              }`}
            >
              {item}
            </Link>
          ))}
        
        </div>
           <div className="xs:hidden flex items-center gap-6">
             <span
  className={`transition-colors duration-300 ${
    isScrolled
      ? "text-[#1E3A8A]"
      : "text-[#1E3A8A]"
  }`}
>
  <Search size={20} />
</span>
          <Link 
            to="/login" 
            className={`px-7 py-2 rounded-[2px] text-[16px] font-medium leading-[24px] tracking-[0px] transition-all ${
              isScrolled 
                ? 'bg-[#1E3A8A] text-[#ffffff] hover:bg-blue-800' 
                : 'bg-[#1E3A8A] text-[#ffffff] hover:bg-blue-50'
            }`}
          >
            Contact
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
              className="w-full py-4 bg-[#1E3C8C] text-white text-center text-xs font-black uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              contact
            </Link>
          </div>
        </div>
      )}
    </nav>

    
  );
};

export default WebsiteNavbarDark;
