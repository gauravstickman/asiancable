import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, ChevronRight, Star, ArrowRight, Camera, Send, Share2 } from 'lucide-react';

const HomeNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="text-white" size={18} />
                        </div>
                        <span className="text-lg sm:text-xl font-black tracking-tighter text-slate-900 uppercase">Nexus<span className="text-slate-400">Store</span></span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link to="/" className="text-[13px] font-bold uppercase tracking-widest text-slate-900">Home</Link>
                        <Link to="/about" className="text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">About</Link>
                        <Link to="/contact" className="text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Contact</Link>
                        {['New Arrivals', 'Categories', 'Featured'].map((item) => (
                            <a key={item} href="#" className="text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <Search size={20} />
                        </button>
                        <Link to="/login" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <User size={20} />
                        </Link>
                        <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <ShoppingBag size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 md:hidden">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const ProductCard = ({ name, price, category, image }) => (
    <div className="group cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 rounded-2xl mb-4 border border-slate-100 group-hover:border-slate-200 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <button className="absolute bottom-4 left-4 right-4 py-3 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                Add to Cart
            </button>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{category}</p>
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">{name}</h3>
            <p className="text-sm font-black text-slate-900">{price}</p>
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <HomeNavbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
                                New Collection 2024
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
                                REDEFINE YOUR <br />
                                <span className="text-slate-300">LIFESTYLE.</span>
                            </h1>
                            <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-md leading-relaxed mb-10">
                                Discover the intersection of minimalist design and high-performance technology. Crafted for the modern professional.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 group">
                                    Shop Collection
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                                    View Lookbook
                                </button>
                            </div>
                        </div>

                        <div className="relative animate-fade-in [animation-delay:200ms]">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
                                <img 
                                    src="/hero_product_premium_1778689537316.png" 
                                    alt="Premium Product" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 max-w-[200px] hidden sm:block">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-xs font-bold text-slate-900 mb-1">"The best audio experience I've ever had."</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">— Alex Rivera</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">Featured Categories</h2>
                            <p className="text-slate-500 font-medium text-sm">Explore our curated selections for every need.</p>
                        </div>
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2 group">
                            All Categories
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Electronics', count: '120+ Products', color: 'bg-indigo-600' },
                            { name: 'Lifestyle', count: '85+ Products', color: 'bg-rose-500' },
                            { name: 'Workplace', count: '45+ Products', color: 'bg-emerald-500' },
                        ].map((cat, i) => (
                            <div key={i} className="relative h-80 group cursor-pointer overflow-hidden rounded-3xl">
                                <div className={`absolute inset-0 ${cat.color} opacity-90 transition-transform duration-700 group-hover:scale-110`}></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-black tracking-tight uppercase mb-1">{cat.name}</h3>
                                    <p className="text-sm font-medium opacity-80 mb-6">{cat.count}</p>
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:w-full group-hover:rounded-xl transition-all duration-500 overflow-hidden">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">Trending Now</h2>
                        <div className="w-16 h-1 bg-slate-900 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        <ProductCard name="Sonic A1 Headphones" price="$299.00" category="Electronics" image="/hero_product_premium_1778689537316.png" />
                        <ProductCard name="Vantage Desk Mat" price="$49.00" category="Workplace" image="/hero_product_premium_1778689537316.png" />
                        <ProductCard name="Nomad Water Bottle" price="$35.00" category="Lifestyle" image="/hero_product_premium_1778689537316.png" />
                        <ProductCard name="Core Backpack" price="$120.00" category="Lifestyle" image="/hero_product_premium_1778689537316.png" />
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-32 bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-6">Stay Ahead of the Curve.</h2>
                    <p className="text-slate-400 text-lg font-medium mb-10">Subscribe to our newsletter for exclusive drops, early access, and minimalist living tips.</p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
                        />
                        <button className="px-10 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="text-white" size={18} />
                                </div>
                                <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">NexusStore</span>
                            </div>
                            <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
                                Designing tools for the modern creative. Our products are built on the principles of minimalism, quality, and utility.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Shop</h4>
                            <ul className="space-y-4">
                                {['Electronics', 'Workplace', 'Lifestyle', 'New Arrivals'].map(link => (
                                    <li key={link}><a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Social</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                                    <Camera size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                                    <Send size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                                    <Share2 size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs font-bold text-slate-300 tracking-widest uppercase">© 2024 NexusStore Global. All Rights Reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
