import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import MediaPicker from '../../components/common/MediaPicker';
import { Save, Plus, Trash2, Edit2, Image, Layers, Settings, FileText, BarChart2, Briefcase, Star, PenTool, Layout, ShieldCheck } from 'lucide-react';
import { FormInput, FormTextarea, ImageInput, FormSelect } from '../../components/admin/FormComponents';

const IndustryPageSettings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const [activeTab, setActiveTab] = useState('hero');

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'projects', label: 'Proven Projects', icon: Briefcase },
        { id: 'leaders', label: 'Trusted Leaders', icon: ShieldCheck },
        { id: 'products', label: 'Cables / Products', icon: Layout },
        { id: 'impact', label: 'Asian Cables Impact', icon: BarChart2 },
        { id: 'applications', label: 'Applications', icon: Layers }
    ];

    const PREDEFINED_INDUSTRIES = [
        "Oil & Gas",
        "Solar",
        "Wind Energy",
        "EV Charging",
        "Power & Transmission",
        "Mining",
        "Marine",
        "Renewables",
        "Telecom & OFC",
        "Railways"
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get(`/industry-page/${id}`);
            if (data.success) setSettings(data.data);
        } catch (error) {
            toast.error('Failed to fetch Industry Page settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put(`/industry-page/${id}`, settings);
            toast.success('Industry Page settings saved successfully');
            fetchSettings();
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field, index, key, value) => {
        const newArray = [...settings[field]];
        if (key === null) {
            newArray[index] = value;
        } else {
            newArray[index][key] = value;
        }
        handleChange(field, newArray);
    };

    const handleAddToArray = (field, defaultObj) => {
        handleChange(field, [...settings[field], defaultObj]);
    };

    const handleRemoveFromArray = (field, index) => {
        const newArray = [...settings[field]];
        newArray.splice(index, 1);
        handleChange(field, newArray);
    };

    if (!settings) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-[1400px] mx-auto animate-in fade-in duration-300 mb-20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <button onClick={() => navigate('/admin/industry-page')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-white">
                            &larr; Back to List
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Settings size={28} className="text-blue-600" />
                        Industry Page Manager: {settings.name}
                    </h1>
                    <p className="text-slate-500 mt-1">Manage all industry page sections easily from this sidebar interface.</p>
                </div>
                <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium disabled:opacity-50">
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                    <div className="flex flex-col py-2">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 text-left px-5 py-3.5 font-medium transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[600px]">
                    {/* Header Section */}
                    {activeTab === 'hero' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Hero Section</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-6 border-b border-slate-100">
                                <div className="space-y-1">
                                    <FormInput 
                                        label="Industry Name (System Name)" 
                                        value={settings.name || ''} 
                                        onChange={e => {
                                            const val = e.target.value;
                                            const slug = val.toString().toLowerCase()
                                                .replace(/\s+/g, '-')
                                                .replace(/[^\w\-]+/g, '')
                                                .replace(/\-\-+/g, '-')
                                                .replace(/^-+/, '')
                                                .replace(/-+$/, '');
                                            setSettings(prev => ({ ...prev, name: val, slug: slug }));
                                        }} 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <FormInput label="Slug / URL (Auto Generated)" value={settings.slug || ''} onChange={e => handleChange('slug', e.target.value)} />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <FormInput label="Tagline" value={settings.headerTag || ''} onChange={e => handleChange('headerTag', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <FormInput label="Title" value={settings.headerTitle || ''} onChange={e => handleChange('headerTitle', e.target.value)} />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <FormTextarea label="Description" rows={3} value={settings.headerDescription || ''} onChange={e => handleChange('headerDescription', e.target.value)} className="md:col-span-2" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Background Image</label>
                                <div className="flex gap-2 items-center">
                                    <input type="text" value={settings.headerBgImage || ''} onChange={e => handleChange('headerBgImage', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    <button onClick={() => openMediaPicker((url) => handleChange('headerBgImage', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-1"><Image size={16}/> Choose</button>
                                </div>
                                {settings.headerBgImage && (
                                    <div className="mt-2">
                                        {settings.headerBgImage && <img src={settings.headerBgImage.startsWith('http') ? settings.headerBgImage : `${import.meta.env.VITE_API_URL}${settings.headerBgImage}`} alt="Preview" className="h-20 rounded border border-slate-200 object-contain bg-slate-50" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-slate-800">Stats (Bottom of Hero)</label>
                                <button onClick={() => handleAddToArray('stats', {value: '', label: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Stat</button>
                            </div>
                            <div className="space-y-3">
                                {settings.stats.map((stat, idx) => (
                                    <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border">
                                        <FormInput label="Value" placeholder="Value (e.g. 3600)" value={stat.value || ''} onChange={e => handleArrayChange('stats', idx, 'value', e.target.value)} />
                                        <FormInput label="Label" placeholder="Label (e.g. Production)" value={stat.label || ''} onChange={e => handleArrayChange('stats', idx, 'label', e.target.value)} />
                                        <button onClick={() => handleRemoveFromArray('stats', idx)} className="text-red-500 p-2"><Trash2 size={18}/></button>
                                    </div>
                                ))} 
                            </div>
                        </div>
                        </div>
                    )}

                    {/* Proven Projects Section */}
                    {activeTab === 'projects' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Proven Projects</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <FormInput label="Section Title" value={settings.provenProjectsTitle || ''} onChange={e => handleChange('provenProjectsTitle', e.target.value)} />
                            </div>
                            <div>
                                <FormInput label="Section Subtitle" value={settings.provenProjectsSubtitle || ''} onChange={e => handleChange('provenProjectsSubtitle', e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-slate-800">Projects List</label>
                            <button onClick={() => handleAddToArray('projects', {company: '', title: '', description: '', image: '', tags: []})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Project</button>
                        </div>
                        <div className="space-y-4">
                            {settings.projects.map((proj, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('projects', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                    <FormInput label="Company Name" placeholder="Company Name" value={proj.company || ''} onChange={e => handleArrayChange('projects', idx, 'company', e.target.value)} />
                                    <FormInput label="Project Title" placeholder="Project Title" value={proj.title || ''} onChange={e => handleArrayChange('projects', idx, 'title', e.target.value)} />
                                    <FormTextarea label="Description" placeholder="Description" rows={2} value={proj.description || ''} onChange={e => handleArrayChange('projects', idx, 'description', e.target.value)} className="md:col-span-2" />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <FormInput label="Image URL" placeholder="Image URL" value={proj.image || ''} onChange={e => handleArrayChange('projects', idx, 'image', e.target.value)} />
                                            <button onClick={() => openMediaPicker((url) => handleArrayChange('projects', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                        </div>
                                        {proj.image && <img src={proj.image.startsWith('http') ? proj.image : `${import.meta.env.VITE_API_URL}${proj.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                    <FormInput label="Tags" placeholder="Tags (comma separated)" value={(proj.tags || []).join(', ')} onChange={e => handleArrayChange('projects', idx, 'tags', e.target.value.split(',').map(s=>s.trim()))} />
                                </div>
                                ))} 
                        </div>
                        </div>
                    )}

                    {/* Trusted Leaders Section */}
                    {activeTab === 'leaders' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Trusted Leaders</h2>
                            </div>
                            <div className="mb-4">
                            <FormInput label="Section Title" value={settings.trustedTitle || ''} onChange={e => handleChange('trustedTitle', e.target.value)} />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-slate-800">Logos</label>
                            <button onClick={() => handleAddToArray('trustedLogos', '')} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Logo</button>
                        </div>
                        <div className="space-y-4">
                            {settings.trustedLogos.map((logo, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative flex flex-col gap-2">
                                    <div className="flex gap-3 items-center w-full">
                                        <div className="flex-1">
                                            <FormInput label="Image URL" placeholder="Image URL" value={logo || ''} onChange={e => handleArrayChange('trustedLogos', idx, null, e.target.value)} />
                                        </div>
                                        <button onClick={() => openMediaPicker((url) => {
                                            const newArray = [...settings.trustedLogos];
                                            newArray[idx] = url;
                                            handleChange('trustedLogos', newArray);
                                        })} className="bg-white px-3 py-2 border rounded text-sm mt-6"><Image size={16}/></button>
                                        <button onClick={() => handleRemoveFromArray('trustedLogos', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded mt-6"><Trash2 size={18}/></button>
                                    </div>
                                    {logo && <img src={logo.startsWith('http') ? logo : `${import.meta.env.VITE_API_URL}${logo}`} alt="Preview" className="h-12 object-contain bg-white border border-slate-200 p-1 self-start rounded" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                </div>
                                ))} 
                        </div>
                        </div>
                    )}

                    {/* Cables / Products Section */}
                    {activeTab === 'products' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Cables / Products</h2>
                            </div>
                            <div className="mb-4">
                            <FormInput label="Section Title" value={settings.productsTitle || ''} onChange={e => handleChange('productsTitle', e.target.value)} />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-slate-800">Products</label>
                            <button onClick={() => handleAddToArray('products', {title: '', description: '', image: '', link: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Product</button>
                        </div>
                        <div className="space-y-4">
                            {settings.products.map((prod, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('products', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                    <FormInput label="Title" placeholder="Title" value={prod.title || ''} onChange={e => handleArrayChange('products', idx, 'title', e.target.value)} />
                                    <FormInput label="Link" placeholder="e.g. /product/slug" value={prod.link || ''} onChange={e => handleArrayChange('products', idx, 'link', e.target.value)} />
                                    <FormTextarea label="Description" placeholder="Description" rows={2} value={prod.description || ''} onChange={e => handleArrayChange('products', idx, 'description', e.target.value)} className="md:col-span-2" />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <FormInput label="Image URL" placeholder="Image URL" value={prod.image || ''} onChange={e => handleArrayChange('products', idx, 'image', e.target.value)} />
                                            <button onClick={() => openMediaPicker((url) => handleArrayChange('products', idx, 'image', url))} className="bg-white px-3 py-2 border rounded text-sm mt-6"><Image size={16}/></button>
                                        </div>
                                        {prod.image && <img src={prod.image.startsWith('http') ? prod.image : `${import.meta.env.VITE_API_URL}${prod.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                </div>
                                ))} 
                        </div>
                        </div>
                    )}

                    {/* Impact Section */}
                    {activeTab === 'impact' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Asian Cables Impact</h2>
                            </div>
                            <div className="mb-4">
                            <FormInput label="Section Title" value={settings.impactTitle || ''} onChange={e => handleChange('impactTitle', e.target.value)} />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-slate-800">Impact Items</label>
                            <button onClick={() => handleAddToArray('impacts', {icon: '', title: '', description: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Impact</button>
                        </div>
                        <div className="space-y-4">
                            {settings.impacts.map((imp, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('impacts', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <FormInput label="Icon URL" placeholder="Icon URL" value={imp.icon || ''} onChange={e => handleArrayChange('impacts', idx, 'icon', e.target.value)} />
                                            <button onClick={() => openMediaPicker((url) => handleArrayChange('impacts', idx, 'icon', url))} className="bg-white px-3 border rounded text-sm mt-6"><Image size={16}/></button>
                                        </div>
                                        {imp.icon && <img src={imp.icon.startsWith('http') ? imp.icon : `${import.meta.env.VITE_API_URL}${imp.icon}`} alt="Preview" className="h-12 w-12 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                    <FormInput label="Title" placeholder="Title" value={imp.title || ''} onChange={e => handleArrayChange('impacts', idx, 'title', e.target.value)} />
                                    <FormTextarea label="Description" placeholder="Description" rows={2} value={imp.description || ''} onChange={e => handleArrayChange('impacts', idx, 'description', e.target.value)} className="md:col-span-2" />
                                </div>
                                ))} 
                        </div>
                        </div>
                    )}

                    {/* Applications Section */}
                    {activeTab === 'applications' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Applications</h2>
                            </div>
                            <div className="mb-4">
                            <FormInput label="Section Title" value={settings.applicationsTitle || ''} onChange={e => handleChange('applicationsTitle', e.target.value)} />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-slate-800">Application Items (Need exactly 4 items for the design)</label>
                            <button onClick={() => handleAddToArray('applications', {title: '', description: '', image: '', tag: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add App</button>
                        </div>
                        <div className="space-y-4">
                            {settings.applications.map((app, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('applications', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                    <FormInput label="Title" placeholder="Title" value={app.title || ''} onChange={e => handleArrayChange('applications', idx, 'title', e.target.value)} />
                                    <FormInput label="Tag" placeholder="Tag (e.g. PRIMARY APPLICATION)" value={app.tag || ''} onChange={e => handleArrayChange('applications', idx, 'tag', e.target.value)} />
                                    <FormTextarea label="Description" placeholder="Description" rows={2} value={app.description || ''} onChange={e => handleArrayChange('applications', idx, 'description', e.target.value)} className="md:col-span-2" />
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <FormInput label="Image URL" placeholder="Image URL" value={app.image || ''} onChange={e => handleArrayChange('applications', idx, 'image', e.target.value)} />
                                            <button onClick={() => openMediaPicker((url) => handleArrayChange('applications', idx, 'image', url))} className="bg-white px-3 border rounded text-sm mt-6"><Image size={16}/></button>
                                        </div>
                                        {app.image && <img src={app.image.startsWith('http') ? app.image : `${import.meta.env.VITE_API_URL}${app.image}`} alt="Preview" className="h-24 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                </div>
                                ))} 
                        </div>
                        </div>
                    )}
                </div>
            </div>

            <MediaPicker isOpen={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={(url) => { if (onSelectCallback) onSelectCallback(url); }} />
        </div>
    );
};

export default IndustryPageSettings;
