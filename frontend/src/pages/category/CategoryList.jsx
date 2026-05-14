import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Loader2 } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('/categories');
            setCategories(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch categories');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await API.delete(`/categories/${id}`);
                toast.success('Category deleted');
                fetchCategories();
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Categories</h1>
                    <p className="text-slate-400">Manage your product categories efficiently.</p>
                </div>
                <button className="premium-gradient px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary-500/20">
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search categories..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    />
                </div>
                <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-all font-semibold">
                    <Filter size={18} />
                    Filters
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-primary-500" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredCategories.map((category) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={category._id}
                                className="glass-card overflow-hidden group"
                            >
                                <div className="h-48 bg-slate-800 relative overflow-hidden">
                                    {category.image ? (
                                        <img 
                                            src={`http://localhost:5000/${category.image.replace(/\\/g, '/')}`} 
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary-500 transition-colors">
                                            <Edit size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(category._id)}
                                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{category.name}</h3>
                                    <p className="text-slate-500 text-sm">{category.slug}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
