import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {
    LayoutDashboard,
    Layers,
    Package,
    Settings,
    LogOut,
    TrendingUp,
    Users,
    ShoppingCart,
    Zap,
    X,
    FileText,
    MessageSquare,
    Factory,
    Info
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.auth);

    const menuItems = [

        {
            group: 'Content Management',
            items: [
                { path: '/admin/homepage-settings', name: 'Home', icon: LayoutDashboard },
                { path: '/admin/about-page', name: 'About', icon: Info },
                { path: '/admin/industry-page', name: 'Industries', icon: FileText },
                { path: '/admin/manufacturing-page', name: 'Manufacturing', icon: Factory },
                // { path: '/admin/categories', name: 'Categories', icon: Layers },
                { path: '/admin/products', name: 'Products', icon: Package },
                // { path: '/admin/blog-categories', name: 'Blog Categories', icon: Layers },
                // { path: '/admin/blogs', name: 'Blogs', icon: FileText },
            ]
        },
        {
            group: 'Configuration',
            items: [
                { path: '/admin/settings', name: 'Settings', icon: Settings },
            ]
        }
    ];

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] border-r border-slate-800 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 shadow-2xl lg:shadow-none",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Branding & Mobile Close */}
            <div className="p-6 flex items-center justify-between">
                <Link to="/admin" className="flex items-center gap-3 group" onClick={onClose}>
                    <img src={logo} alt="Asian Cables" className="h-10 w-auto" />
                </Link>
                <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white lg:hidden"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar space-y-6">
                {menuItems.map((group) => (
                    <div key={group.group}>
                        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                            {group.group}
                        </p>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={onClose}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                                            isActive
                                                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm"
                                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                        )}
                                    >
                                        <item.icon size={18} className={cn(isActive ? "text-blue-400" : "text-slate-400")} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-2 py-3 mb-2">
                    <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                        {admin?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200 truncate">{admin?.name || 'Administrator'}</p>
                        <p className="text-[10px] text-slate-500 truncate">Platform Admin</p>
                    </div>
                </div>
                <button
                    onClick={() => dispatch(logout())}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-xs font-medium"
                >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;


