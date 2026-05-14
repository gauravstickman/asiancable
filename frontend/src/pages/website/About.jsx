import React from 'react';
import { ShoppingBag, Users, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Navbar for Website */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="text-white" size={18} />
                            </div>
                            <span className="text-lg sm:text-xl font-black tracking-tighter text-slate-900 uppercase">Nexus<span className="text-slate-400">Store</span></span>
                        </Link>
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">Home</Link>
                            <Link to="/about" className="text-sm font-bold uppercase tracking-widest text-slate-900">About</Link>
                            <Link to="/login" className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Sign In</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
                            WE BUILD THE <br />
                            <span className="text-slate-300">FUTURE OF RETAIL.</span>
                        </h1>
                        <p className="text-slate-500 text-lg sm:text-xl font-medium leading-relaxed">
                            NexusStore is more than just an e-commerce platform. We are a team of designers, engineers, and visionaries dedicated to creating the most seamless shopping experience on the planet.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="glass-card p-10 border-t-4 border-t-indigo-500">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Our Mission</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">To empower modern professionals with tools and products that enhance their lifestyle through minimalist design.</p>
                        </div>
                        <div className="glass-card p-10 border-t-4 border-t-rose-500">
                            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="text-rose-600" size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">The Community</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">We believe in building a global community of creatives who value quality over quantity and utility over trends.</p>
                        </div>
                        <div className="glass-card p-10 border-t-4 border-t-emerald-500">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                                <Award className="text-emerald-600" size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Quality First</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Every product in our collection undergoes rigorous testing to ensure it meets our uncompromising standards of excellence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-6">Join Our Journey</h2>
                    <p className="text-slate-500 text-lg font-medium mb-10 max-w-2xl mx-auto">We are always looking for passionate individuals and partners to collaborate with. Let's redefine the world together.</p>
                    <button className="px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 mx-auto group">
                        Contact Us
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;
