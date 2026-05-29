import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, Loader2, Plus, Tag, FileText } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const BlogCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Form states
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('/blog-categories');
            setCategories(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch blog categories');
            setLoading(false);
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setName(category.name);
        setDescription(category.description || '');
    };

    const handleClearSelection = () => {
        setSelectedCategory(null);
        setName('');
        setDescription('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Category name is required');
            return;
        }

        setSubmitting(true);
        const payload = {
            name,
            description
        };

        try {
            if (selectedCategory) {
                // Update
                await API.put(`/blog-categories/${selectedCategory._id}`, payload);
                toast.success('Blog category updated successfully');
            } else {
                // Create
                await API.post('/blog-categories', payload);
                toast.success('Blog category created successfully');
            }
            handleClearSelection();
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category? Associated blogs will lose their category association.')) {
            try {
                await API.delete(`/blog-categories/${id}`);
                toast.success('Blog category deleted');
                // If the deleted category was selected for editing, clear the form
                if (selectedCategory && selectedCategory._id === id) {
                    handleClearSelection();
                }
                fetchCategories();
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Blog Categories</h1>
                <p className="text-slate-500 mt-1">Manage categories for your website blogs & publications.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Search & List (8 cols) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search blog categories..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-blue-600" size={40} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {filteredCategories.map((category) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={category._id}
                                        className={`bg-white rounded-lg shadow-sm border p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 ${
                                            selectedCategory?._id === category._id ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'
                                        }`}
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-base font-bold text-slate-900 mb-1">{category.name}</h3>
                                                <p className="text-slate-400 text-xs font-mono">/{category.slug}</p>
                                            </div>
                                            
                                            <p className="text-sm text-slate-650 line-clamp-3 leading-relaxed">
                                                {category.description || 'No description provided.'}
                                            </p>
                                        </div>

                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-6">
                                            <button 
                                                onClick={() => handleSelectCategory(category)}
                                                className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-500 transition-colors cursor-pointer border border-slate-100"
                                                title="Edit Category"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(category._id)}
                                                className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-500 transition-colors cursor-pointer border border-slate-100"
                                                title="Delete Category"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {filteredCategories.length === 0 && (
                                <div className="col-span-full text-center py-12 text-slate-500 text-sm">
                                    No blog categories found. Use the form on the right to create one.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column: Persistent Form Card (4 cols) */}
                <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 animate-in fade-in duration-300">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            {selectedCategory ? 'Edit Blog Category' : 'Add Blog Category'}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                            {selectedCategory ? 'Modify your category fields below.' : 'Create a new category for publication tags.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                <Tag size={14} className="text-slate-400" />
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 bg-white"
                                placeholder="e.g. Events, Company News"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                <FileText size={14} className="text-slate-400" />
                                Description
                            </label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 resize-none bg-white"
                                placeholder="Brief description of the category..."
                            />
                        </div>

                        <div className="flex gap-2 justify-end pt-4 border-t border-slate-205">
                            {selectedCategory && (
                                <button 
                                    type="button"
                                    onClick={handleClearSelection}
                                    className="px-4 py-2 rounded-lg text-slate-650 hover:bg-slate-50 font-medium border border-slate-200 text-sm transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                            )}
                            <button 
                                type="submit"
                                disabled={submitting}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {submitting && <Loader2 className="animate-spin" size={14} />}
                                {selectedCategory ? 'Save Changes' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogCategoryList;
