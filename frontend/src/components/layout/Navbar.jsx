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

                

            </div>
        </header>
    );
};

export default Navbar;


