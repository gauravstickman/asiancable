import React from 'react';
import { 
    Users, 
    ShoppingBag, 
    CreditCard, 
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
    Eye,
    Activity,
    ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, percentage, color, glowColor }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="glass-card p-8 overflow-hidden relative group"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded ${color} bg-opacity-5 border border-slate-100`}>
                <Icon size={16} className="text-slate-700" />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {percentage}%
            </div>
        </div>

        <div>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mb-0.5">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const stats = [
        { title: 'Gross Revenue', value: '$124.5K', icon: CreditCard, trend: 'up', percentage: '12.5', color: 'bg-primary-500', glowColor: 'bg-primary-600' },
        { title: 'New Sales', value: '1,452', icon: ShoppingBag, trend: 'up', percentage: '8.2', color: 'bg-accent-500', glowColor: 'bg-accent-600' },
        { title: 'Customers', value: '3,842', icon: Users, trend: 'down', percentage: '3.1', color: 'bg-highlight-500', glowColor: 'bg-highlight-600' },
        { title: 'Live Sessions', value: '42.5K', icon: Eye, trend: 'up', percentage: '24.2', color: 'bg-primary-400', glowColor: 'bg-primary-500' },
    ];

    return (
        <div className="space-y-12 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Overview</h1>
                    <p className="text-slate-500 text-xs font-medium">Real-time system performance metrics.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={12} />
                        Filter
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 premium-gradient rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-sm hover:opacity-90 transition-all">
                        <Download size={12} />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
                <div className="xl:col-span-2 glass-card p-10 flex flex-col relative overflow-hidden group border-t-4 border-t-primary-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                                <Activity size={24} className="text-primary-500" />
                                Growth Trajectory
                            </h2>
                            <p className="text-sm text-slate-500 font-bold">Performance metrics for the current fiscal cycle</p>
                        </div>
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                            {['7D', '30D', '90D', 'ALL'].map(t => (
                                <button key={t} className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all ${t === '30D' ? 'bg-primary-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-1 flex items-end gap-5 min-h-[350px] px-2">
                        {[40, 25, 60, 45, 80, 55, 90, 70, 100, 85, 95, 75, 110, 90, 120].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar h-full justify-end">
                                <div className="w-full bg-white/5 rounded-2xl relative h-full flex items-end overflow-hidden">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 1 }}
                                        className={`w-full ${i === 14 ? 'bg-primary-500' : 'bg-slate-100'} rounded-t-[2px]`}
                                    ></motion.div>
                                </div>
                                <span className={`text-[7px] font-bold uppercase ${i === 14 ? 'text-primary-500' : 'text-slate-300'}`}>{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 glass-card p-6 sm:p-10 flex flex-col border-r-4 border-r-accent-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Recent Events</h2>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Live Update</span>
                        </div>
                    </div>
                    
                    <div className="space-y-10 flex-1">
                        {[
                            { user: 'SC', name: 'Sarah Connor', action: 'Order #2041', info: 'Processed', time: '2m', color: 'text-emerald-600' },
                            { user: 'JD', name: 'John Doe', action: 'New User', info: 'Registered', time: '15m', color: 'text-primary-600' },
                            { user: 'MR', name: 'Mike Ross', action: 'Refund #082', info: '-$89.00', time: '1h', color: 'text-rose-600' },
                            { user: 'HS', name: 'Harvey Specter', action: 'Payment', info: 'Success', time: '2h', color: 'text-emerald-600' },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer items-center">
                                <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                                    {activity.user}
                                </div>
                                <div className="flex-1 flex justify-between items-center border-b border-slate-50 py-3 group-last:border-0">
                                    <div>
                                        <p className="text-[13px] font-semibold text-slate-900">{activity.name}</p>
                                        <p className="text-[11px] text-slate-500">{activity.action}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[11px] font-bold ${activity.color}`}>{activity.info}</p>
                                        <p className="text-[9px] text-slate-300">{activity.time} ago</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2.5 rounded border border-slate-200 text-[10px] font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-widest flex items-center justify-center gap-2 group">
                        Full Activity Log
                        <ExternalLink size={10} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


