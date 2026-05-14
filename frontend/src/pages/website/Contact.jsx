import React from 'react';
import { ShoppingBag, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Navbar */}
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
                            <Link to="/about" className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">About</Link>
                            <Link to="/contact" className="text-sm font-bold uppercase tracking-widest text-slate-900">Contact</Link>
                            <Link to="/login" className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Sign In</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="pt-40 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6">Get In Touch</h1>
                            <p className="text-slate-500 text-lg font-medium mb-12 max-w-md">Have a question or feedback? We'd love to hear from you. Our team is here to help.</p>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-slate-900" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email Us</h4>
                                        <p className="text-slate-900 font-bold">hello@nexusstore.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-slate-900" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Call Us</h4>
                                        <p className="text-slate-900 font-bold">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-slate-900" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Visit Us</h4>
                                        <p className="text-slate-900 font-bold">123 Design Street, Creative Valley, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10">
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                    <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                                    <textarea rows="4" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all resize-none"></textarea>
                                </div>
                                <button className="w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                    Send Message
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
