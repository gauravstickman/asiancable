import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Loader2, Package } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Products</h1>
                    <p className="text-slate-400">Inventory management at your fingertips.</p>
                </div>
                <button className="premium-gradient px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary-500/20">
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search products by name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    />
                </div>
                <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-all font-semibold">
                    <Filter size={18} />
                    Sort By
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-primary-500" size={40} />
                </div>
            ) : (
                <div className="glass-card overflow-hidden border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Product</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <motion.tr 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={product._id} 
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                                                        {product.image ? (
                                                            <img 
                                                                src={`http://localhost:5000/${product.image.replace(/\\/g, '/')}`} 
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                                <Package size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900">{product.name}</div>
                                                        <div className="text-xs text-slate-500 max-w-[200px] truncate">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium border border-primary-500/20">
                                                    {product.category?.name || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900">
                                                ${product.price}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
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
    );
};

export default ProductList;
