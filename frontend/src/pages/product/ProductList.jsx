import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Loader2, Package, X, Image } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import MediaPicker from '../../components/common/MediaPicker';

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [features, setFeatures] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch products');
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${API_URL}/${img.replace(/^\//, '').replace(/\\/g, '/')}`;
    };

    const handleOpenForm = (product = null) => {
        if (product) {
            setSelectedProduct(product);
            setName(product.name);
            setCategoryId(product.category?._id || product.category || '');
            setFeatures(product.features ? product.features.join('\n') : '');
            setImagePreview(getImageUrl(product.image));
            setImageUrl(product.image || '');
        } else {
            setSelectedProduct(null);
            setName('');
            setCategoryId('');
            setFeatures('');
            setImagePreview('');
            setImageUrl('');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Product name is required');
            return;
        }

        setSubmitting(true);
        const payload = {
            name,
            category: categoryId || undefined,
            features: features.split('\n').map(f => f.trim()).filter(f => f.length > 0),
            image: imageUrl
        };

        try {
            if (selectedProduct) {
                // Update
                await API.put(`/products/${selectedProduct._id}`, payload);
                toast.success('Product updated successfully');
            } else {
                // Create
                await API.post('/products', payload);
                toast.success('Product created successfully');
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(prod => 
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
            {isModalOpen ? (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-650 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer"
                            >
                                <X size={16} />
                                Back to List
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Package size={20} className="text-blue-600" />
                                    {selectedProduct ? 'Edit Product details' : 'Add New Product'}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-205 shadow-sm p-6 space-y-6 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Product Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                    placeholder="e.g. LSZH Solar Cable"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Category (Optional)</label>
                                <select 
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm cursor-pointer"
                                >
                                    <option value="">No Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Features</label>
                                <p className="text-xs text-slate-500 mb-2">Enter each feature on a new line. These will be displayed as bullet points.</p>
                                <textarea 
                                    value={features}
                                    onChange={(e) => setFeatures(e.target.value)}
                                    rows={5}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                    placeholder="Up to 220 kV&#10;Single & Multicore&#10;Factory-Tested"
                                />
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Product Image / Banner</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={imageUrl}
                                        onChange={(e) => {
                                            setImageUrl(e.target.value);
                                            setImagePreview(getImageUrl(e.target.value));
                                        }}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="Select or enter image URL..."
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setPickerOpen(true)}
                                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-sm cursor-pointer"
                                    >
                                        <Image size={18} />
                                        Choose
                                    </button>
                                </div>
                                
                                {imagePreview ? (
                                    <div className="mt-4 relative w-40 h-40 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-50 flex items-center justify-center animate-in fade-in duration-300">
                                        <img src={imagePreview} alt="Selected Preview" className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-all duration-500" />
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                setImageUrl('');
                                                setImagePreview('');
                                            }}
                                            className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <div className="p-2 bg-red-600 rounded-lg hover:bg-red-700 shadow-md transition-colors">
                                                <Trash2 size={16} />
                                            </div>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-slate-300 bg-slate-50 rounded-lg p-5 w-40 h-40 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                                        <Image size={24} className="text-slate-300" />
                                        <span>No image selected.</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-5 border-t border-slate-205">
                            <button 
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 rounded-lg text-slate-655 hover:bg-slate-50 font-medium border border-slate-200 text-sm transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {submitting && <Loader2 className="animate-spin" size={14} />}
                                {selectedProduct ? 'Update Product' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                            <p className="text-slate-500 mt-1">Manage your product inventory and showcase.</p>
                        </div>
                        <button 
                            onClick={() => handleOpenForm()}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium cursor-pointer"
                        >
                            <Plus size={18} />
                            Add Product
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search products by name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-blue-600" size={40} />
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="p-4 text-sm font-semibold text-slate-600">Product</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Category</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Features</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 w-28 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {filteredProducts.map((product) => (
                                                <motion.tr 
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    key={product._id} 
                                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                                >
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                                {product.image ? (
                                                                    <img 
                                                                        src={getImageUrl(product.image)} 
                                                                        alt={product.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                        <Package size={16} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-800 text-sm">{product.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                            {product.category?.name || 'Uncategorized'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="text-xs text-slate-600 space-y-1">
                                                            {product.features && product.features.length > 0 ? (
                                                                product.features.slice(0, 3).map((feature, idx) => (
                                                                    <div key={idx} className="flex items-center gap-1.5">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                                                        <span className="line-clamp-1">{feature}</span>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <span className="text-slate-400 italic">No features</span>
                                                            )}
                                                            {product.features?.length > 3 && (
                                                                <div className="text-blue-500 pl-3">+{product.features.length - 3} more</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button 
                                                                onClick={() => handleOpenForm(product)}
                                                                className="p-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-md text-slate-500 transition-colors cursor-pointer"
                                                                title="Edit Product"
                                                            >
                                                                <Edit size={14} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(product._id)}
                                                                className="p-1.5 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-md text-slate-500 transition-colors cursor-pointer"
                                                                title="Delete Product"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                        {filteredProducts.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-slate-500 text-sm">
                                                    No products found matching your criteria.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Reusable Media Picker Modal */}
            <MediaPicker 
                isOpen={pickerOpen} 
                onClose={() => setPickerOpen(false)} 
                onSelect={(url) => {
                    setImageUrl(url);
                    setImagePreview(getImageUrl(url));
                }} 
            />
        </div>
    );
};

export default ProductList;
