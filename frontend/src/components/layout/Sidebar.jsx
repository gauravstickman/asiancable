import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    X
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
            group: 'Main Menu', 
            items: [
                { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
                { path: '/admin/analytics', name: 'Analytics', icon: TrendingUp },
            ]
        },
        { 
            group: 'Store Management', 
            items: [
                { path: '/admin/categories', name: 'Categories', icon: Layers },
                { path: '/admin/products', name: 'Products', icon: Package },
                { path: '/admin/orders', name: 'Orders', icon: ShoppingCart },
                { path: '/admin/customers', name: 'Customers', icon: Users },
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
            "fixed inset-y-0 left-0 z-50 w-72 glass-panel flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 shadow-2xl lg:shadow-none",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Branding & Mobile Close */}
            <div className="p-6 flex items-center justify-between">
                <Link to="/admin" className="flex items-center gap-3 group" onClick={onClose}>
                    <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
                        <Zap className="text-white" size={16} />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900">NexusHub</h1>
                </Link>
                <button 
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-900 lg:hidden"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar space-y-6">
                {menuItems.map((group) => (
                    <div key={group.group}>
                        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
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
                                            "flex items-center gap-3 px-3 py-2 rounded transition-colors text-sm font-medium",
                                            isActive 
                                                ? "bg-slate-100 text-slate-900 shadow-sm" 
                                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                        )}
                                    >
                                        <item.icon size={18} className={cn(isActive ? "text-slate-900" : "text-slate-400")} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-2 py-3 mb-2">
                    <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {admin?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">{admin?.name || 'Administrator'}</p>
                        <p className="text-[10px] text-slate-500 truncate">Platform Admin</p>
                    </div>
                </div>
                <button
                    onClick={() => dispatch(logout())}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-medium"
                >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;


