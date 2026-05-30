import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Mail, User, Globe, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = ({ onMenuClick }) => {
    const { admin } = useSelector((state) => state.auth);
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Dashboard';
        if (path === '/categories') return 'Categories';
        if (path === '/products') return 'Products';
        return '';
    };

    return (
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Toggle */}
                <button 
                    onClick={onMenuClick}
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded lg:hidden"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden sm:block">
                    <h2 className="text-[13px] font-semibold text-slate-900 tracking-tight">{getPageTitle()}</h2>
                </div>


            </div>

            <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors relative hidden sm:block">
                    <Mail size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors relative">
                    <Bell size={16} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-500 rounded-full border border-white"></span>
                </button>
                
                <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-2 pl-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;


