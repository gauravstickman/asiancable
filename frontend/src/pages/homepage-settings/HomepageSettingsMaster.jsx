import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import MediaPicker from '../../components/common/MediaPicker';
import { Save, Plus, Trash2, Image, Layout, Settings, FileText, BarChart2, Briefcase, Star, PenTool, BookOpen, Leaf } from 'lucide-react';
import { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';

const HomepageSettingsMaster = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);
    
    const [activeTab, setActiveTab] = useState('heroSlides');

    const tabs = [
        { id: 'heroSlides', label: 'Hero Slider', icon: Image },
        { id: 'aboutUs', label: 'About Us', icon: FileText },
        { id: 'facts', label: 'Facts & Impact', icon: BarChart2 },
        { id: 'applications', label: 'Applications', icon: Layout },
        { id: 'provenFields', label: 'Proven Fields', icon: Briefcase },
        { id: 'testimonials', label: 'Testimonials', icon: Star },
        { id: 'engineering', label: 'Engineering', icon: PenTool },
        { id: 'productRange', label: 'Our Products Range', icon: BookOpen },
        { id: 'sustainability', label: 'Sustainability', icon: Leaf },
        { id: 'latestBlogs', label: 'Latest Blogs', icon: FileText }
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/homepage-settings');
            if (data.success) setSettings(data.data);
        } catch (error) {
            toast.error('Failed to fetch Homepage settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put('/homepage-settings', settings);
            toast.success('Homepage settings saved successfully');
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

    const handleChange = (section, field, value) => {
        if (!field) {
            setSettings(prev => ({ ...prev, [section]: value }));
        } else {
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        }
    };

    const handleNestedChange = (section, subsection, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: {
                    ...prev[section][subsection],
                    [field]: value
                }
            }
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...settings[section]];
        if (field === null) {
            newArray[index] = value;
        } else {
            newArray[index][field] = value;
        }
        handleChange(section, null, newArray);
    };

    const handleNestedArrayChange = (section, arrayField, index, field, value) => {
        const newArray = [...settings[section][arrayField]];
        newArray[index][field] = value;
        handleChange(section, arrayField, newArray);
    };

    const handleAddToArray = (section, defaultObj) => {
        handleChange(section, null, [...(settings[section] || []), defaultObj]);
    };

    const handleAddToNestedArray = (section, arrayField, defaultObj) => {
        handleChange(section, arrayField, [...(settings[section][arrayField] || []), defaultObj]);
    };

    const handleRemoveFromArray = (section, index) => {
        const newArray = [...(settings[section] || [])];
        newArray.splice(index, 1);
        handleChange(section, null, newArray);
    };

    const handleRemoveFromNestedArray = (section, arrayField, index) => {
        const newArray = [...settings[section][arrayField]];
        newArray.splice(index, 1);
        handleChange(section, arrayField, newArray);
    };

    if (!settings) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-[1400px] mx-auto animate-in fade-in duration-300 mb-20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Settings size={28} className="text-blue-600" />
                        Homepage Content Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Manage all homepage sections easily from this sidebar interface.</p>
                </div>
                <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium disabled:opacity-50">
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto max-h-[calc(100vh-140px)] sticky top-24">
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
                    {/* Hero Slider */}
                    {activeTab === 'heroSlides' && (
                        <div>
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Hero Slider</h2>
                                <button onClick={() => handleAddToArray('heroSlides', {title: '', description: '', nextText: '', cta: { text: '', link: '' }, image: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"><Plus size={16}/> Add Slide</button>
                            </div>
                            <div className="space-y-4">
                        {settings.heroSlides.map((slide, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('heroSlides', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                <FormInput label="Title" placeholder="Title" value={slide.title || ''} onChange={e => handleArrayChange('heroSlides', idx, 'title', e.target.value)} />
                                <FormInput label="Next Slide Text" placeholder="Next Slide Text" value={slide.nextText || ''} onChange={e => handleArrayChange('heroSlides', idx, 'nextText', e.target.value)} />
                                <FormInput label="Button Name" placeholder="Button Name (e.g. ABOUT US)" value={slide.cta?.text || ''} onChange={e => handleArrayChange('heroSlides', idx, 'cta', { ...(slide.cta || {}), text: e.target.value })} />
                                <FormInput label="Button Link" placeholder="Button Link (e.g. /about)" value={slide.cta?.link || ''} onChange={e => handleArrayChange('heroSlides', idx, 'cta', { ...(slide.cta || {}), link: e.target.value })} />
                                <div className="md:col-span-2">
                                    <FormTextarea label="Description" placeholder="Description" rows={3} value={slide.description || ''} onChange={e => handleArrayChange('heroSlides', idx, 'description', e.target.value)} />
                                </div>
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <FormInput label="Image URL" placeholder="Image URL" value={slide.image || ''} onChange={e => handleArrayChange('heroSlides', idx, 'image', e.target.value)} />
                                        <button onClick={() => openMediaPicker((url) => handleArrayChange('heroSlides', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                    </div>
                                    {slide.image && <img src={slide.image.startsWith('http') ? slide.image : `${import.meta.env.VITE_API_URL}${slide.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                </div>
                            </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* About Us */}
                    {activeTab === 'aboutUs' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">About Us</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormTextarea label="Content / Description" placeholder="Description" rows={6} value={settings.aboutUs?.description || ''} onChange={e => handleChange('aboutUs', 'description', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* Facts */}
                    {activeTab === 'facts' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Facts Section</h2>
                            </div>
                            <div className="space-y-6">
                        <div>
                            <h3 className="font-medium text-slate-700 mb-2">Global Presence</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FormInput label="Title" placeholder="Title" value={settings.facts?.presence?.title || ''} onChange={e => handleNestedChange('facts', 'presence', 'title', e.target.value)} />
                                <FormInput label="Description" placeholder="Description" value={settings.facts?.presence?.description || ''} onChange={e => handleNestedChange('facts', 'presence', 'description', e.target.value)} />
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <FormInput label="Image URL" placeholder="Image URL" value={settings.facts?.presence?.image || ''} onChange={e => handleNestedChange('facts', 'presence', 'image', e.target.value)} />
                                        <button onClick={() => openMediaPicker((url) => handleNestedChange('facts', 'presence', 'image', url))} className="bg-slate-100 px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                    </div>
                                    {settings.facts?.presence?.image && <img src={settings.facts?.presence?.image.startsWith('http') ? settings.facts?.presence?.image : `${import.meta.env.VITE_API_URL}${settings.facts?.presence?.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-slate-700 mb-2">Decades</h3>
                                <div className="space-y-3">
                                    <FormInput label="Title" placeholder="Title (e.g. 5)" value={settings.facts?.decades?.title || ''} onChange={e => handleNestedChange('facts', 'decades', 'title', e.target.value)} />
                                    <FormInput label="Subtitle" placeholder="Subtitle" value={settings.facts?.decades?.subtitle || ''} onChange={e => handleNestedChange('facts', 'decades', 'subtitle', e.target.value)} />
                                    <FormInput label="Description" placeholder="Description" value={settings.facts?.decades?.description || ''} onChange={e => handleNestedChange('facts', 'decades', 'description', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-slate-700 mb-2">Capacity</h3>
                                <div className="space-y-3">
                                    <FormInput label="Title" placeholder="Title (e.g. 20,000)" value={settings.facts?.capacity?.title || ''} onChange={e => handleNestedChange('facts', 'capacity', 'title', e.target.value)} />
                                    <FormInput label="Subtitle" placeholder="Subtitle" value={settings.facts?.capacity?.subtitle || ''} onChange={e => handleNestedChange('facts', 'capacity', 'subtitle', e.target.value)} />
                                    <FormInput label="Description" placeholder="Description" value={settings.facts?.capacity?.description || ''} onChange={e => handleNestedChange('facts', 'capacity', 'description', e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-700 mb-2">Annual Revenue</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FormInput label="Value" placeholder="Value (e.g. 2.5M+)" value={settings.facts?.annual?.value || ''} onChange={e => handleNestedChange('facts', 'annual', 'value', e.target.value)} />
                                <FormInput label="Title" placeholder="Title" value={settings.facts?.annual?.title || ''} onChange={e => handleNestedChange('facts', 'annual', 'title', e.target.value)} />
                                <FormInput label="Description" placeholder="Description" value={settings.facts?.annual?.description || ''} onChange={e => handleNestedChange('facts', 'annual', 'description', e.target.value)} />
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <FormInput label="Image URL" placeholder="Image URL" value={settings.facts?.annual?.image || ''} onChange={e => handleNestedChange('facts', 'annual', 'image', e.target.value)} />
                                        <button onClick={() => openMediaPicker((url) => handleNestedChange('facts', 'annual', 'image', url))} className="bg-slate-100 px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                    </div>
                                    {settings.facts?.annual?.image && <img src={settings.facts?.annual?.image.startsWith('http') ? settings.facts?.annual?.image : `${import.meta.env.VITE_API_URL}${settings.facts?.annual?.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    )}

                    {/* Applications */}
                    {activeTab === 'applications' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Applications (Industries We Serve)</h2>
                            </div>
                            <div className="space-y-6">
                        {['main', 'small1', 'small2', 'wide'].map((key) => (
                            <div key={key} className="bg-slate-50 p-4 rounded-lg border">
                                <h3 className="font-medium text-slate-700 mb-2 uppercase text-xs tracking-wider">{key} Block</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <FormInput label="Title" placeholder="Title" value={settings.applications?.[key]?.title || ''} onChange={e => handleNestedChange('applications', key, 'title', e.target.value)} />
                                    {key === 'main' && (
                                        <FormInput label="Description" placeholder="Description" value={settings.applications?.[key]?.description || ''} onChange={e => handleNestedChange('applications', key, 'description', e.target.value)} />
                                    )}
                                    <div className={`flex flex-col gap-2 ${key === 'main' ? 'md:col-span-2' : ''}`}>
                                        <div className="flex gap-2">
                                            <FormInput label="Image URL" placeholder="Image URL" value={settings.applications?.[key]?.image || ''} onChange={e => handleNestedChange('applications', key, 'image', e.target.value)} />
                                            <button onClick={() => openMediaPicker((url) => handleNestedChange('applications', key, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                        </div>
                                        {settings.applications?.[key]?.image && <img src={settings.applications?.[key]?.image.startsWith('http') ? settings.applications?.[key]?.image : `${import.meta.env.VITE_API_URL}${settings.applications?.[key]?.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                </div>
                            </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Proven Fields */}
                    {activeTab === 'provenFields' && (
                        <div>
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Proven Fields</h2>
                                <button onClick={() => handleAddToArray('provenFields', {tag: '', title: '', description: '', image: '', badges: []})} className="text-blue-600 text-sm font-medium flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"><Plus size={16}/> Add Field</button>
                            </div>
                            <div className="space-y-4">
                        {settings.provenFields.map((field, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('provenFields', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                <FormInput label="Tag" placeholder="Tag" value={field.tag || ''} onChange={e => handleArrayChange('provenFields', idx, 'tag', e.target.value)} />
                                <FormInput label="Title" placeholder="Title" value={field.title || ''} onChange={e => handleArrayChange('provenFields', idx, 'title', e.target.value)} />
                                <FormTextarea label="Description" placeholder="Description" rows={2} value={field.description || ''} onChange={e => handleArrayChange('provenFields', idx, 'description', e.target.value)} className="md:col-span-2" />
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <FormInput label="Image URL" placeholder="Image URL" value={field.image || ''} onChange={e => handleArrayChange('provenFields', idx, 'image', e.target.value)} />
                                        <button onClick={() => openMediaPicker((url) => handleArrayChange('provenFields', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                    </div>
                                    {field.image && <img src={field.image.startsWith('http') ? field.image : `${import.meta.env.VITE_API_URL}${field.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                </div>
                                <FormInput label="Badges" placeholder="Badges (comma separated)" value={(field.badges || []).join(', ')} onChange={e => handleArrayChange('provenFields', idx, 'badges', e.target.value.split(',').map(s=>s.trim()))} />
                            </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Testimonials */}
                    {activeTab === 'testimonials' && (
                        <div>
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Testimonials</h2>
                                <button onClick={() => handleAddToArray('testimonials', {name: '', position: '', company: '', quote: '', image: '', rating: 5})} className="text-blue-600 text-sm font-medium flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"><Plus size={16}/> Add Testimonial</button>
                            </div>
                            <div className="space-y-4">
                        {settings.testimonials.map((test, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button onClick={() => handleRemoveFromArray('testimonials', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                <FormInput label="Name" placeholder="Name" value={test.name || ''} onChange={e => handleArrayChange('testimonials', idx, 'name', e.target.value)} />
                                <FormInput label="Position" placeholder="Position" value={test.position || ''} onChange={e => handleArrayChange('testimonials', idx, 'position', e.target.value)} />
                                <FormInput label="Company" placeholder="Company" value={test.company || ''} onChange={e => handleArrayChange('testimonials', idx, 'company', e.target.value)} />
                                <FormInput type="number" label="Rating" placeholder="Rating (1-5)" value={test.rating || ''} onChange={e => handleArrayChange('testimonials', idx, 'rating', e.target.value)} />
                                <FormTextarea label="Quote" placeholder="Quote" rows={2} value={test.quote || ''} onChange={e => handleArrayChange('testimonials', idx, 'quote', e.target.value)} className="md:col-span-2" />
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <FormInput label="Image URL" placeholder="Image URL" value={test.image || ''} onChange={e => handleArrayChange('testimonials', idx, 'image', e.target.value)} />
                                        <button onClick={() => openMediaPicker((url) => handleArrayChange('testimonials', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                    </div>
                                    {test.image && <img src={test.image.startsWith('http') ? test.image : `${import.meta.env.VITE_API_URL}${test.image}`} alt="Preview" className="h-16 w-16 rounded-full object-cover bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                </div>
                            </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Engineering */}
                    {activeTab === 'engineering' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Engineering Section</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormInput label="Title" placeholder="Title" value={settings.engineering?.title || ''} onChange={e => handleChange('engineering', 'title', e.target.value)} />
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-bold text-slate-800">Engineering Items</label>
                                    <button onClick={() => handleAddToNestedArray('engineering', 'items', {title:'', content:'', image:''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Item</button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.engineering?.items || []).map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 gap-3">
                                            <button onClick={() => handleRemoveFromNestedArray('engineering', 'items', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded z-10"><Trash2 size={18}/></button>
                                            <FormInput label="Title" placeholder="Title" value={item.title || ''} onChange={e => handleNestedArrayChange('engineering', 'items', idx, 'title', e.target.value)} />
                                            <FormTextarea label="Content" placeholder="Content" rows={2} value={item.content || ''} onChange={e => handleNestedArrayChange('engineering', 'items', idx, 'content', e.target.value)} />
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                    <FormInput label="Image URL" placeholder="Image URL" value={item.image || ''} onChange={e => handleNestedArrayChange('engineering', 'items', idx, 'image', e.target.value)} />
                                                    <button onClick={() => openMediaPicker((url) => handleNestedArrayChange('engineering', 'items', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6 shrink-0"><Image size={16}/></button>
                                                </div>
                                                {item.image && <img src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL}${item.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                            </div>
                                        </div>
                                    ))} 
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Our Products Range */}
                    {activeTab === 'productRange' && (
                        <div>
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Our Products Range</h2>
                                <button onClick={() => handleAddToArray('productRange', {title: '', image: '', points: [], link: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"><Plus size={16}/> Add Product</button>
                            </div>
                            <div className="space-y-4">
                                {(settings.productRange || []).map((product, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button onClick={() => handleRemoveFromArray('productRange', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded z-10"><Trash2 size={18}/></button>
                                        <FormInput label="Product Title" placeholder="Product Title (e.g. Specialty Cables)" value={product.title || ''} onChange={e => handleArrayChange('productRange', idx, 'title', e.target.value)} />
                                        <FormInput label="Read More Link" placeholder="Read More Link (e.g. /products)" value={product.link || ''} onChange={e => handleArrayChange('productRange', idx, 'link', e.target.value)} />
                                        <div className="md:col-span-2">
                                            <FormInput label="Features / Points (comma separated)" placeholder="Point 1, Point 2, Point 3" value={Array.isArray(product.points) ? product.points.join(', ') : (typeof product.points === 'string' ? product.points : '')} onChange={e => handleArrayChange('productRange', idx, 'points', e.target.value.split(',').map(s=>s.trim()))} />
                                        </div>
                                        <div className="md:col-span-2 flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <FormInput label="Image URL" placeholder="Image URL" value={product.image || ''} onChange={e => handleArrayChange('productRange', idx, 'image', e.target.value)} />
                                                <button onClick={() => openMediaPicker((url) => handleArrayChange('productRange', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6 shrink-0"><Image size={16}/></button>
                                            </div>
                                            {product.image && <img src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}${product.image}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                        </div>
                                    </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Sustainability */}
                    {activeTab === 'sustainability' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Sustainability Section</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <FormTextarea label="Heading / Tagline" placeholder="We transform lives by building sustainable world-class infrastructure." rows={3} value={settings.sustainability?.heading || ''} onChange={e => handleChange('sustainability', 'heading', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <FormInput label="Background Image URL" placeholder="Background Image URL" value={settings.sustainability?.bgImage || ''} onChange={e => handleChange('sustainability', 'bgImage', e.target.value)} />
                                            <button onClick={() => openMediaPicker((url) => handleChange('sustainability', 'bgImage', url))} className="bg-slate-100 px-3 border rounded text-sm h-10 mt-6"><Image size={16}/></button>
                                        </div>
                                        {settings.sustainability?.bgImage && <img src={settings.sustainability?.bgImage.startsWith('http') ? settings.sustainability?.bgImage : `${import.meta.env.VITE_API_URL}${settings.sustainability?.bgImage}`} alt="Preview" className="h-24 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                    <FormInput label="Primary Button Text" value={settings.sustainability?.primaryBtnText || ''} onChange={e => handleChange('sustainability', 'primaryBtnText', e.target.value)} />
                                    <FormInput label="Primary Button Link" value={settings.sustainability?.primaryBtnLink || ''} onChange={e => handleChange('sustainability', 'primaryBtnLink', e.target.value)} />
                                    <FormInput label="Secondary Button Text" value={settings.sustainability?.secondaryBtnText || ''} onChange={e => handleChange('sustainability', 'secondaryBtnText', e.target.value)} />
                                    <FormInput label="Secondary Button Link" value={settings.sustainability?.secondaryBtnLink || ''} onChange={e => handleChange('sustainability', 'secondaryBtnLink', e.target.value)} />
                                </div>
                                
                                <div className="mt-6 border-t border-slate-100 pt-6">
                                    <h3 className="text-lg font-medium text-slate-800 mb-4">Sustainability Features (Environment, Safety, etc.)</h3>
                                    <div className="space-y-4">
                                        {(settings.sustainability?.features || []).map((feature, idx) => (
                                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FormInput label="Feature Title" value={feature.title || ''} onChange={e => handleNestedArrayChange('sustainability', 'features', idx, 'title', e.target.value)} />
                                                <FormInput label="Description" value={feature.description || ''} onChange={e => handleNestedArrayChange('sustainability', 'features', idx, 'description', e.target.value)} />
                                                <div className="md:col-span-2 flex flex-col gap-2">
                                                    <div className="flex gap-2">
                                                        <FormInput label="Icon URL" value={feature.icon || ''} onChange={e => handleNestedArrayChange('sustainability', 'features', idx, 'icon', e.target.value)} />
                                                        <button onClick={() => openMediaPicker((url) => handleNestedArrayChange('sustainability', 'features', idx, 'icon', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6 shrink-0"><Image size={16}/></button>
                                                    </div>
                                                    {feature.icon && <img src={feature.icon.startsWith('http') ? feature.icon : `${import.meta.env.VITE_API_URL}${feature.icon}`} alt="Preview" className="h-16 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Latest Blogs */}
                    {activeTab === 'latestBlogs' && (
                        <div>
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Latest Blogs (Latest From Asian Cables)</h2>
                                <button onClick={() => handleAddToArray('latestBlogs', {tag: '', title: '', description: '', image: '', link: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"><Plus size={16}/> Add Blog</button>
                            </div>
                            <div className="space-y-4">
                                {(settings.latestBlogs || []).map((blog, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button onClick={() => handleRemoveFromArray('latestBlogs', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded z-10"><Trash2 size={18}/></button>
                                        <FormInput label="Tag / Category" placeholder="Tag (e.g. Event or Blog)" value={blog.tag || ''} onChange={e => handleArrayChange('latestBlogs', idx, 'tag', e.target.value)} />
                                        <FormInput label="Blog Title" placeholder="Title" value={blog.title || ''} onChange={e => handleArrayChange('latestBlogs', idx, 'title', e.target.value)} />
                                        <FormInput label="Read More Link" placeholder="Read More Link (e.g. /blogs)" value={blog.link || ''} onChange={e => handleArrayChange('latestBlogs', idx, 'link', e.target.value)} />
                                        <div className="md:col-span-2">
                                            <FormTextarea label="Description" placeholder="Description" rows={3} value={blog.description || ''} onChange={e => handleArrayChange('latestBlogs', idx, 'description', e.target.value)} />
                                        </div>
                                        <div className="md:col-span-2 flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <FormInput label="Image URL" placeholder="Image URL" value={blog.image || ''} onChange={e => handleArrayChange('latestBlogs', idx, 'image', e.target.value)} />
                                                <button onClick={() => openMediaPicker((url) => handleArrayChange('latestBlogs', idx, 'image', url))} className="bg-white px-3 border rounded text-sm h-10 mt-6 shrink-0"><Image size={16}/></button>
                                            </div>
                                            {blog.image && <img src={blog.image.startsWith('http') ? blog.image : `${import.meta.env.VITE_API_URL}${blog.image}`} alt="Preview" className="h-24 rounded object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
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

export default HomepageSettingsMaster;
