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
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [industryId, setIndustryId] = useState('');
    const [features, setFeatures] = useState('');
    const [featuresImage, setFeaturesImage] = useState('');
    const [featuresImagePreview, setFeaturesImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    
    // New Fields
    const [description, setDescription] = useState('');
    const [specificationsArray, setSpecificationsArray] = useState([]);
    const [idealFor, setIdealFor] = useState('');
    const [overviewDescription, setOverviewDescription] = useState('');
    const [overviewImage, setOverviewImage] = useState('');
    const [overviewImagePreview, setOverviewImagePreview] = useState('');
    const [standards, setStandards] = useState('');
    const [pickerTarget, setPickerTarget] = useState('image'); // 'image' or 'overviewImage' or 'catalogue'
    
    // New Sections
    const [catalogueName, setCatalogueName] = useState('');
    const [catalogueDescription, setCatalogueDescription] = useState('');
    const [catalogueImage, setCatalogueImage] = useState('');
    const [cataloguePdf, setCataloguePdf] = useState('');
    
    const [applicationsArray, setApplicationsArray] = useState([]);
    const [projectsArray, setProjectsArray] = useState([]);
    const [statsArray, setStatsArray] = useState([]);

    const [submitting, setSubmitting] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    
    const [arrayPickerTarget, setArrayPickerTarget] = useState(null); // { type: 'app', index: 0 }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchIndustries();
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

    const fetchIndustries = async () => {
        try {
            const { data } = await API.get('/industry-page');
            if (data.success) {
                setIndustries(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch industries', error);
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
            setIndustryId(product.industry?._id || product.industry || '');
            setFeatures(product.features ? product.features.join('\n') : '');
            setFeaturesImage(product.featuresImage || '');
            setFeaturesImagePreview(getImageUrl(product.featuresImage));
            
            setDescription(product.description || '');
            setSpecificationsArray(product.specifications || []);
            setIdealFor(product.idealFor ? product.idealFor.join('\n') : '');
            setOverviewDescription(product.overviewDescription || '');
            setOverviewImage(product.overviewImage || '');
            setOverviewImagePreview(getImageUrl(product.overviewImage));
            setStandards(product.standards ? product.standards.join('\n') : '');
            
            setCatalogueName(product.catalogueName || '');
            setCatalogueDescription(product.catalogueDescription || '');
            setCatalogueImage(product.catalogueImage || '');
            setCataloguePdf(product.cataloguePdf || '');
            
            setApplicationsArray(product.applications || []);
            setProjectsArray(product.projects || []);
            setStatsArray(product.stats || []);
            
            setImagePreview(getImageUrl(product.image));
            setImageUrl(product.image || '');
        } else {
            setSelectedProduct(null);
            setName('');
            setCategoryId('');
            setIndustryId('');
            setFeatures('');
            setFeaturesImage('');
            setFeaturesImagePreview('');
            
            setDescription('');
            setSpecificationsArray([]);
            setIdealFor('');
            setOverviewDescription('');
            setOverviewImage('');
            setOverviewImagePreview('');
            setStandards('');
            
            setCatalogueName('');
            setCatalogueDescription('');
            setCatalogueImage('');
            setCataloguePdf('');
            setApplicationsArray([]);
            setProjectsArray([]);
            setStatsArray([]);
            
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
            industry: industryId || undefined,
            features: JSON.stringify(features.split('\n').map(f => f.trim()).filter(f => f.length > 0)),
            featuresImage,
            description,
            specifications: JSON.stringify(specificationsArray),
            idealFor: JSON.stringify(idealFor.split('\n').map(f => f.trim()).filter(f => f.length > 0)),
            overviewDescription,
            overviewImage,
            standards: JSON.stringify(standards.split('\n').map(f => f.trim()).filter(f => f.length > 0)),
            catalogueName,
            catalogueDescription,
            catalogueImage,
            cataloguePdf,
            applications: JSON.stringify(applicationsArray),
            projects: JSON.stringify(projectsArray),
            stats: JSON.stringify(statsArray),
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

                            <div className="space-y-1.5 md:col-span-1">
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

                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Industry (Optional)</label>
                                <select 
                                    value={industryId}
                                    onChange={(e) => setIndustryId(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm cursor-pointer"
                                >
                                    <option value="">No Industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind._id} value={ind._id}>{ind.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                    placeholder="Multicore, multi-pair control and instrumentation constructions..."
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-md font-bold text-slate-800">Specifications</h3>
                                    <button type="button" onClick={() => setSpecificationsArray([...specificationsArray, {label: '', value: ''}])} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Spec</button>
                                </div>
                                <div className="space-y-3">
                                    {specificationsArray.map((spec, idx) => (
                                        <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                    <input type="text" value={spec.label || ''} onChange={(e) => { const arr = [...specificationsArray]; arr[idx].label = e.target.value; setSpecificationsArray(arr); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Label (e.g. Voltage Rating)" />
                                                    <input type="text" value={spec.value || ''} onChange={(e) => { const arr = [...specificationsArray]; arr[idx].value = e.target.value; setSpecificationsArray(arr); }} className="flex-[2] px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Value (e.g. Up to 11 kV)" />
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <input type="text" value={spec.icon || ''} onChange={(e) => { const arr = [...specificationsArray]; arr[idx].icon = e.target.value; setSpecificationsArray(arr); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Icon URL (Optional)" />
                                                    <button type="button" onClick={() => { setArrayPickerTarget({ type: 'spec', index: idx }); setPickerTarget('array'); setPickerOpen(true); }} className="bg-white px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-100 transition-colors" title="Choose Icon"><Image size={16}/></button>
                                                    {spec.icon && <img src={getImageUrl(spec.icon)} alt="Icon" className="h-8 w-8 object-contain bg-white border border-slate-200 p-1 rounded" />}
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => {
                                                const arr = [...specificationsArray]; arr.splice(idx, 1); setSpecificationsArray(arr);
                                            }} className="text-red-500 hover:bg-red-50 p-2 rounded shrink-0"><Trash2 size={18}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Ideal For</label>
                                <textarea 
                                    value={idealFor}
                                    onChange={(e) => setIdealFor(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                    placeholder="Oil & gas&#10;Petrochemicals"
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Product Overview Description</label>
                                <textarea 
                                    value={overviewDescription}
                                    onChange={(e) => setOverviewDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                />
                            </div>
                            
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Overview Image</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={overviewImage}
                                        onChange={(e) => {
                                            setOverviewImage(e.target.value);
                                            setOverviewImagePreview(getImageUrl(e.target.value));
                                        }}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="Select or enter image URL..."
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setPickerTarget('overviewImage');
                                            setPickerOpen(true);
                                        }}
                                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-sm cursor-pointer"
                                    >
                                        <Image size={18} />
                                        Choose
                                    </button>
                                </div>
                                
                                {overviewImagePreview ? (
                                    <div className="mt-4 relative w-40 h-40 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-50 flex items-center justify-center animate-in fade-in duration-300">
                                        <img src={overviewImagePreview} alt="Preview" className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-all duration-500" />
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                setOverviewImage('');
                                                setOverviewImagePreview('');
                                            }}
                                            className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <div className="p-2 bg-red-600 rounded-lg hover:bg-red-700 shadow-md transition-colors">
                                                <Trash2 size={16} />
                                            </div>
                                        </button>
                                    </div>
                                ) : null}
                            </div>

                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Standards</label>
                                <textarea 
                                    value={standards}
                                    onChange={(e) => setStandards(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                    placeholder="IEC Standards&#10;BS Standards"
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Key Features</label>
                                <p className="text-xs text-slate-500 mb-1">One feature per line (bullet points).</p>
                                <textarea 
                                    value={features}
                                    onChange={(e) => setFeatures(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                    placeholder="Accurate signal transmission...&#10;Flexible and durable..."
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Key Features Image</label>
                                <div className="flex gap-2 mb-2">
                                    <input 
                                        type="text" 
                                        value={featuresImage}
                                        onChange={(e) => {
                                            setFeaturesImage(e.target.value);
                                            setFeaturesImagePreview(getImageUrl(e.target.value));
                                        }}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="Features image URL..."
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setPickerTarget('featuresImage');
                                            setPickerOpen(true);
                                        }}
                                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-sm cursor-pointer"
                                    >
                                        <Image size={18} /> Choose
                                    </button>
                                </div>
                                {featuresImagePreview && (
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-50 flex items-center justify-center">
                                        <img src={featuresImagePreview} alt="Preview" className="w-full h-full object-contain p-1" />
                                    </div>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200 mt-4">
                                <h3 className="text-md font-bold text-slate-800 mb-4">Product Resources (Catalogue)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Catalogue Name</label>
                                        <input 
                                            type="text" value={catalogueName} onChange={(e) => setCatalogueName(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                            placeholder="Product Catalogue"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Catalogue Description</label>
                                        <input 
                                            type="text" value={catalogueDescription} onChange={(e) => setCatalogueDescription(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                            placeholder="A comprehensive guide."
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Catalogue PDF URL</label>
                                        <input 
                                            type="text" value={cataloguePdf} onChange={(e) => setCataloguePdf(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                            placeholder="/pdfs/catalogue.pdf"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Catalogue Image URL</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" value={catalogueImage} onChange={(e) => setCatalogueImage(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                                placeholder="/assets/po.jpg"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => { setPickerTarget('catalogue'); setPickerOpen(true); }}
                                                className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 text-slate-650 font-semibold text-sm cursor-pointer"
                                            >Choose</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-md font-bold text-slate-800">Stats (Numbers)</h3>
                                        <p className="text-xs text-slate-500">Maximum 3 stats allowed for the design.</p>
                                    </div>
                                    {statsArray.length < 3 && (
                                        <button type="button" onClick={() => setStatsArray([...statsArray, {value: '', label: ''}])} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Stat</button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {statsArray.map((stat, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <button type="button" onClick={() => {
                                                const arr = [...statsArray]; arr.splice(idx, 1); setStatsArray(arr);
                                            }} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Value</label>
                                                <input type="text" value={stat.value || ''} onChange={(e) => { const arr = [...statsArray]; arr[idx].value = e.target.value; setStatsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="e.g. 3600 km" />
                                            </div>
                                            
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Label</label>
                                                <input type="text" value={stat.label || ''} onChange={(e) => { const arr = [...statsArray]; arr[idx].label = e.target.value; setStatsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="annual cable manufacturing capacity" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-md font-bold text-slate-800">Applications</h3>
                                    <button type="button" onClick={() => setApplicationsArray([...applicationsArray, {title: '', description: '', image: '', tag: ''}])} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Application</button>
                                </div>
                                <div className="space-y-4">
                                    {applicationsArray.map((app, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <button type="button" onClick={() => {
                                                const arr = [...applicationsArray]; arr.splice(idx, 1); setApplicationsArray(arr);
                                            }} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                            
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Title</label>
                                                <input type="text" value={app.title || ''} onChange={(e) => { const arr = [...applicationsArray]; arr[idx].title = e.target.value; setApplicationsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Title" />
                                            </div>
                                            
                                            <div className="space-y-1.5 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Link URL</label>
                                                <input type="text" value={app.link || ''} onChange={(e) => { const arr = [...applicationsArray]; arr[idx].link = e.target.value; setApplicationsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Link URL" />
                                            </div>

                                            <div className="space-y-1.5 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Description</label>
                                                <textarea rows={2} value={app.description || ''} onChange={(e) => { const arr = [...applicationsArray]; arr[idx].description = e.target.value; setApplicationsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none" placeholder="Description" />
                                            </div>

                                            <div className="space-y-1.5 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={app.image || ''} onChange={(e) => { const arr = [...applicationsArray]; arr[idx].image = e.target.value; setApplicationsArray(arr); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Image URL" />
                                                    <button type="button" onClick={() => { setArrayPickerTarget({ type: 'app', index: idx }); setPickerTarget('array'); setPickerOpen(true); }} className="bg-white px-3 border rounded text-sm hover:bg-slate-100 transition-colors"><Image size={16}/></button>
                                                </div>
                                                {app.image && <img src={getImageUrl(app.image)} alt="Preview" className="h-16 mt-2 rounded object-contain bg-slate-100 border border-slate-200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-md font-bold text-slate-800">Proven In The Field (Projects)</h3>
                                    <button type="button" onClick={() => setProjectsArray([...projectsArray, {tag: '', title: '', description: '', image: '', badges: []}])} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Project</button>
                                </div>
                                <div className="space-y-4">
                                    {projectsArray.map((proj, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <button type="button" onClick={() => {
                                                const arr = [...projectsArray]; arr.splice(idx, 1); setProjectsArray(arr);
                                            }} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Tag / Company Name</label>
                                                <input type="text" value={proj.tag || ''} onChange={(e) => { const arr = [...projectsArray]; arr[idx].tag = e.target.value; setProjectsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="e.g. RENEWABLES" />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Project Title</label>
                                                <input type="text" value={proj.title || ''} onChange={(e) => { const arr = [...projectsArray]; arr[idx].title = e.target.value; setProjectsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Project Title" />
                                            </div>

                                            <div className="space-y-1.5 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Description</label>
                                                <textarea rows={2} value={proj.description || ''} onChange={(e) => { const arr = [...projectsArray]; arr[idx].description = e.target.value; setProjectsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none" placeholder="Description" />
                                            </div>

                                            <div className="space-y-1.5 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={proj.image || ''} onChange={(e) => { const arr = [...projectsArray]; arr[idx].image = e.target.value; setProjectsArray(arr); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="Image URL" />
                                                    <button type="button" onClick={() => { setArrayPickerTarget({ type: 'proj', index: idx }); setPickerTarget('array'); setPickerOpen(true); }} className="bg-white px-3 border rounded text-sm hover:bg-slate-100 transition-colors"><Image size={16}/></button>
                                                </div>
                                                {proj.image && <img src={getImageUrl(proj.image)} alt="Preview" className="h-16 mt-2 rounded object-contain bg-slate-100 border border-slate-200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                            </div>

                                            <div className="space-y-1.5 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Badges (comma separated)</label>
                                                <input type="text" value={(proj.badges || []).join(', ')} onChange={(e) => { const arr = [...projectsArray]; arr[idx].badges = e.target.value.split(',').map(s=>s.trim()); setProjectsArray(arr); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm" placeholder="e.g. High Efficiency, High Load" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                                        onClick={() => {
                                            setPickerTarget('image');
                                            setPickerOpen(true);
                                        }}
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
                                            <th className="p-4 text-sm font-semibold text-slate-600">Industry</th>
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
                                                    <td className="p-4 align-middle">
                                                        {product.category ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                                {product.category.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400 italic text-xs">None</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {product.industry ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                                                                {product.industry.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400 italic text-xs">None</span>
                                                        )}
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
                                                <td colSpan="5" className="p-8 text-center text-slate-500 text-sm">
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
                    if (pickerTarget === 'image') {
                        setImageUrl(url);
                        setImagePreview(getImageUrl(url));
                    } else if (pickerTarget === 'overviewImage') {
                        setOverviewImage(url);
                        setOverviewImagePreview(getImageUrl(url));
                    } else if (pickerTarget === 'featuresImage') {
                        setFeaturesImage(url);
                        setFeaturesImagePreview(getImageUrl(url));
                    } else if (pickerTarget === 'catalogue') {
                        setCatalogueImage(url);
                    } else if (pickerTarget === 'array' && arrayPickerTarget) {
                        if (arrayPickerTarget.type === 'app') {
                            const arr = [...applicationsArray];
                            arr[arrayPickerTarget.index].image = url;
                            setApplicationsArray(arr);
                        } else if (arrayPickerTarget.type === 'proj') {
                            const arr = [...projectsArray];
                            arr[arrayPickerTarget.index].image = url;
                            setProjectsArray(arr);
                        } else if (arrayPickerTarget.type === 'spec') {
                            const arr = [...specificationsArray];
                            arr[arrayPickerTarget.index].icon = url;
                            setSpecificationsArray(arr);
                        }
                    }
                }} 
            />
        </div>
    );
};

export default ProductList;
