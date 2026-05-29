import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Loader2, X, Image, Check } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import MediaPicker from '../../components/common/MediaPicker';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const [pointsStr, setPointsStr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

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

    const handleOpenModal = (category = null) => {
        if (category) {
            setSelectedCategory(category);
            setName(category.name);
            setPointsStr(category.points ? category.points.join(', ') : '');
            setImagePreview(category.image ? (category.image.startsWith('http') ? category.image : `http://localhost:5000/${category.image.replace(/\\/g, '/')}`) : '');
            setImageUrl(category.image || '');
        } else {
            setSelectedCategory(null);
            setName('');
            setPointsStr('');
            setImagePreview('');
            setImageUrl('');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Category name is required');
            return;
        }

        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', name);
        
        // Split comma-separated string into array of trimmed strings
        const pointsArray = pointsStr
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length > 0);
        formData.append('points', JSON.stringify(pointsArray));

        if (imageUrl) {
            formData.append('image', imageUrl);
        }

        try {
            if (selectedCategory) {
                // Update
                await API.put(`/categories/${selectedCategory._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Category updated successfully');
            } else {
                // Create
                await API.post('/categories', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Category created successfully');
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
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
                    <p className="text-slate-400">Manage your product categories & homepage range efficiently.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="premium-gradient px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary-500/20 cursor-pointer"
                >
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
                                className="glass-card overflow-hidden group border border-slate-100 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="h-48 bg-slate-800 relative overflow-hidden">
                                        {category.image ? (
                                            <img 
                                                src={`http://localhost:5000/${category.image.replace(/\\/g, '/')}`} 
                                                alt={category.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                No Image Uploaded
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => handleOpenModal(category)}
                                                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-blue-500 transition-colors cursor-pointer"
                                            >
                                                <Edit size={20} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(category._id)}
                                                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{category.name}</h3>
                                            <p className="text-slate-400 text-xs font-medium">{category.slug}</p>
                                        </div>
                                        
                                        {/* Points list */}
                                        {category.points && category.points.length > 0 && (
                                            <div className="space-y-1 pt-2 border-t border-slate-100">
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Features / Points</p>
                                                <div className="space-y-1">
                                                    {category.points.map((pt, idx) => (
                                                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                                                            <Check size={12} className="text-[#21409A]" />
                                                            <span className="truncate">{pt}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900">
                                {selectedCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Category Name</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                    placeholder="e.g. Specialty Cables"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Bullet Points / Features (Comma separated)</label>
                                <textarea 
                                    value={pointsStr}
                                    onChange={(e) => setPointsStr(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
                                    placeholder="e.g. Fire-Survival & LSZH, Solar & EV Charging Ready, Oil & Gas Rated"
                                />
                                <p className="text-[11px] text-slate-400">Add points separated by commas to display under the product range block on the homepage.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Category Image</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={imageUrl}
                                        onChange={(e) => {
                                            setImageUrl(e.target.value);
                                            setImagePreview(e.target.value ? (e.target.value.startsWith('http') ? e.target.value : `http://localhost:5000/${e.target.value.replace(/^\//, '').replace(/\\/g, '/')}`) : '');
                                        }}
                                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
                                        placeholder="Select or enter image URL..."
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setPickerOpen(true)}
                                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-sm cursor-pointer"
                                        title="Choose from Library"
                                    >
                                        <Image size={18} />
                                        Choose
                                    </button>
                                </div>
                                
                                {imagePreview && (
                                    <div className="mt-3 relative w-32 h-32 rounded-xl overflow-hidden border border-slate-100 group shadow-sm bg-slate-50">
                                        <img src={imagePreview} alt="Selected Preview" className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                setImageUrl('');
                                                setImagePreview('');
                                            }}
                                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer border border-slate-200 text-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 premium-gradient text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    {submitting && <Loader2 className="animate-spin" size={16} />}
                                    {selectedCategory ? 'Update Category' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Reusable Media Picker Modal */}
            <MediaPicker 
                isOpen={pickerOpen} 
                onClose={() => setPickerOpen(false)} 
                onSelect={(url) => {
                    setImageUrl(url);
                    setImagePreview(`http://localhost:5000${url}`);
                }} 
            />
        </div>
    );
};

export default CategoryList;
