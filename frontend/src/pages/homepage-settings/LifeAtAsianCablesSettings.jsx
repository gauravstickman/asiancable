import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MediaPicker from '../../components/common/MediaPicker';
import { Save, Plus, Trash2, Image, Users, Layout, Briefcase, Video, Settings, Star } from 'lucide-react';
import { FormInput, FormTextarea } from '../../components/admin/FormComponents';
import API from '../../api/axios';

const LifeAtAsianCablesSettings = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const [activeTab, setActiveTab] = useState('hero');

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'whyWork', label: 'Why Work Section', icon: Briefcase },
        { id: 'culture', label: 'Culture & Values', icon: Star },
        { id: 'experience', label: 'Experience Section', icon: Layout },
        { id: 'testimonials', label: 'Testimonials', icon: Users },
        { id: 'dayInLife', label: 'Day in Life', icon: Video },
        { id: 'lifeBeyond', label: 'Life Beyond Work', icon: Image },
        { id: 'openRoles', label: 'Open Roles', icon: Briefcase }
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/life-at-asian-cables');
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const validateSettings = () => {
        if (!settings) return false;
        
        // Hero
        if (!settings.headerTag?.trim()) { toast.error('Hero Section: Tagline is required'); return false; }
        if (!settings.headerTitle?.trim()) { toast.error('Hero Section: Title is required'); return false; }
        if (!settings.headerDescription?.trim()) { toast.error('Hero Section: Description is required'); return false; }
        if (!settings.headerLinkUrl?.trim()) { toast.error('Hero Section: Link URL is required'); return false; }
        if (!settings.headerBgImage?.trim()) { toast.error('Hero Section: Background Image is required'); return false; }

        // Why Work
        if (!settings.whyWorkTitle?.trim()) { toast.error('Why Work Section: Title is required'); return false; }
        if (!settings.whyWorkDescription1?.trim()) { toast.error('Why Work Section: Description Paragraph 1 is required'); return false; }
        if (!settings.whyWorkDescription2?.trim()) { toast.error('Why Work Section: Description Paragraph 2 is required'); return false; }
        if (!settings.whyWorkImage?.trim()) { toast.error('Why Work Section: Image is required'); return false; }

        // Culture
        if (!settings.cultureTitle?.trim()) { toast.error('Culture Section: Title is required'); return false; }
        if (!settings.cultureDescription?.trim()) { toast.error('Culture Section: Description is required'); return false; }
        if (settings.cultureValues && settings.cultureValues.length > 0) {
            for (let i = 0; i < settings.cultureValues.length; i++) {
                const val = settings.cultureValues[i];
                if (!val.icon?.trim()) { toast.error(`Culture Value #${i+1}: Icon URL is required`); return false; }
                if (!val.title?.trim()) { toast.error(`Culture Value #${i+1}: Title is required`); return false; }
                if (!val.description?.trim()) { toast.error(`Culture Value #${i+1}: Description is required`); return false; }
            }
        }

        // Experience
        if (!settings.experienceTitle?.trim()) { toast.error('Experience Section: Title is required'); return false; }
        if (settings.experiencePoints && settings.experiencePoints.length > 0) {
            for (let i = 0; i < settings.experiencePoints.length; i++) {
                const pt = settings.experiencePoints[i];
                if (!pt.title?.trim()) { toast.error(`Experience Point #${i+1}: Tab Title is required`); return false; }
                if (!pt.heading?.trim()) { toast.error(`Experience Point #${i+1}: Heading is required`); return false; }
                if (!pt.description?.trim()) { toast.error(`Experience Point #${i+1}: Description is required`); return false; }
                if (!pt.image?.trim()) { toast.error(`Experience Point #${i+1}: Image is required`); return false; }
                if (pt.cards && pt.cards.length > 0) {
                    for (let j = 0; j < pt.cards.length; j++) {
                        const card = pt.cards[j];
                        if (!card.title?.trim()) { toast.error(`Experience Point #${i+1} > Card #${j+1}: Title is required`); return false; }
                        if (!card.description?.trim()) { toast.error(`Experience Point #${i+1} > Card #${j+1}: Description is required`); return false; }
                        if (!card.image?.trim()) { toast.error(`Experience Point #${i+1} > Card #${j+1}: Image is required`); return false; }
                    }
                }
            }
        }

        // Testimonials
        if (!settings.testimonialsTitle?.trim()) { toast.error('Testimonials Section: Title is required'); return false; }
        if (settings.testimonials && settings.testimonials.length > 0) {
            for (let i = 0; i < settings.testimonials.length; i++) {
                const t = settings.testimonials[i];
                if (!t.quote?.trim()) { toast.error(`Testimonial #${i+1}: Quote is required`); return false; }
                if (!t.name?.trim()) { toast.error(`Testimonial #${i+1}: Name is required`); return false; }
                if (!t.role?.trim()) { toast.error(`Testimonial #${i+1}: Role is required`); return false; }
            }
        }

        // Day in Life
        if (!settings.dayInLifeTitle?.trim()) { toast.error('Day in Life Section: Title is required'); return false; }
        if (!settings.dayInLifeDescription?.trim()) { toast.error('Day in Life Section: Description is required'); return false; }
        if (!settings.dayInLifeImage?.trim()) { toast.error('Day in Life Section: Image Cover is required'); return false; }

        // Life Beyond Work
        if (!settings.lifeBeyondTitle?.trim()) { toast.error('Life Beyond Work Section: Title is required'); return false; }
        if (!settings.lifeBeyondDescription?.trim()) { toast.error('Life Beyond Work Section: Description is required'); return false; }
        if (settings.lifeBeyondImages && settings.lifeBeyondImages.length > 0) {
            for (let i = 0; i < settings.lifeBeyondImages.length; i++) {
                if (!settings.lifeBeyondImages[i]?.trim()) { toast.error(`Life Beyond Work Image #${i+1}: URL cannot be empty`); return false; }
            }
        }

        // Open Roles
        if (!settings.openRolesTitle?.trim()) { toast.error('Open Roles Section: Title is required'); return false; }
        if (!settings.openRolesDescription?.trim()) { toast.error('Open Roles Section: Description is required'); return false; }
        if (settings.openRoles && settings.openRoles.length > 0) {
            for (let i = 0; i < settings.openRoles.length; i++) {
                const role = settings.openRoles[i];
                if (!role.category?.trim()) { toast.error(`Open Role #${i+1}: Category is required`); return false; }
                if (!role.title?.trim()) { toast.error(`Open Role #${i+1}: Title is required`); return false; }
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;
        setLoading(true);
        try {
            await API.put('/life-at-asian-cables', settings);
            toast.success('Settings saved successfully');
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
        handleChange(field, [...(settings[field] || []), defaultObj]);
    };

    const handleRemoveFromArray = (field, index) => {
        const newArray = [...settings[field]];
        newArray.splice(index, 1);
        handleChange(field, newArray);
    };

    const handleNestedArrayChange = (field, index, nestedField, nestedIndex, key, value) => {
        const newArray = [...settings[field]];
        const newNestedArray = [...(newArray[index][nestedField] || [])];
        if (key === null) {
            newNestedArray[nestedIndex] = value;
        } else {
            newNestedArray[nestedIndex] = { ...newNestedArray[nestedIndex], [key]: value };
        }
        newArray[index] = { ...newArray[index], [nestedField]: newNestedArray };
        handleChange(field, newArray);
    };

    const handleAddToNestedArray = (field, index, nestedField, defaultObj) => {
        const newArray = [...settings[field]];
        newArray[index] = {
            ...newArray[index],
            [nestedField]: [...(newArray[index][nestedField] || []), defaultObj]
        };
        handleChange(field, newArray);
    };

    const handleRemoveFromNestedArray = (field, index, nestedField, nestedIndex) => {
        const newArray = [...settings[field]];
        const newNestedArray = [...newArray[index][nestedField]];
        newNestedArray.splice(nestedIndex, 1);
        newArray[index] = { ...newArray[index], [nestedField]: newNestedArray };
        handleChange(field, newArray);
    };

    if (!settings) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-[1400px] mx-auto animate-in fade-in duration-300 mb-20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Settings size={28} className="text-blue-600" />
                        Life at Asian Cables Page Settings
                    </h1>
                    <p className="text-slate-500 mt-1">Manage all sections for the Life at Asian Cables page.</p>
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
                    
                    {/* Hero Section */}
                    {activeTab === 'hero' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Hero Section</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormInput label="Tagline" value={settings.headerTag || ''} onChange={e => handleChange('headerTag', e.target.value)} />
                                <FormInput label="Title" value={settings.headerTitle || ''} onChange={e => handleChange('headerTitle', e.target.value)} />
                                <FormTextarea label="Description" rows={3} value={settings.headerDescription || ''} onChange={e => handleChange('headerDescription', e.target.value)} />
                                <FormInput label="Link URL" value={settings.headerLinkUrl || ''} onChange={e => handleChange('headerLinkUrl', e.target.value)} />
                                
                                <div className="space-y-1 mt-4">
                                    <label className="text-sm font-medium text-slate-700">Background Image</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="text" value={settings.headerBgImage || ''} onChange={e => handleChange('headerBgImage', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <button onClick={() => openMediaPicker((url) => handleChange('headerBgImage', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-1"><Image size={16}/> Choose</button>
                                    </div>
                                    {settings.headerBgImage && (
                                        <img src={settings.headerBgImage.startsWith('http') ? settings.headerBgImage : `${import.meta.env.VITE_API_URL}${settings.headerBgImage}`} alt="Preview" className="h-20 mt-2 rounded border border-slate-200 object-contain bg-slate-50" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />
                                    )}
                                </div>

                                <div className="space-y-1 mt-4">
                                    <label className="text-sm font-medium text-slate-700">Mobile Background Image</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="text" value={settings.headerMobileBgImage || ''} onChange={e => handleChange('headerMobileBgImage', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <button onClick={() => openMediaPicker((url) => handleChange('headerMobileBgImage', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-1"><Image size={16}/> Choose</button>
                                    </div>
                                    {settings.headerMobileBgImage && (
                                        <img src={settings.headerMobileBgImage.startsWith('http') ? settings.headerMobileBgImage : `${import.meta.env.VITE_API_URL}${settings.headerMobileBgImage}`} alt="Preview" className="h-20 mt-2 rounded border border-slate-200 object-contain bg-slate-50" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Why Work Section */}
                    {activeTab === 'whyWork' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Why Work at Asian Cables</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormInput label="Section Title" value={settings.whyWorkTitle || ''} onChange={e => handleChange('whyWorkTitle', e.target.value)} />
                                <FormTextarea label="Description Paragraph 1" rows={4} value={settings.whyWorkDescription1 || ''} onChange={e => handleChange('whyWorkDescription1', e.target.value)} />
                                <FormTextarea label="Description Paragraph 2" rows={4} value={settings.whyWorkDescription2 || ''} onChange={e => handleChange('whyWorkDescription2', e.target.value)} />
                                
                                <div className="space-y-1 mt-4">
                                    <label className="text-sm font-medium text-slate-700">Image</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="text" value={settings.whyWorkImage || ''} onChange={e => handleChange('whyWorkImage', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <button onClick={() => openMediaPicker((url) => handleChange('whyWorkImage', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-1"><Image size={16}/> Choose</button>
                                    </div>
                                    {settings.whyWorkImage && (
                                        <img src={settings.whyWorkImage.startsWith('http') ? settings.whyWorkImage : `${import.meta.env.VITE_API_URL}${settings.whyWorkImage}`} alt="Preview" className="h-20 mt-2 rounded border border-slate-200 object-contain bg-slate-50" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Culture Values */}
                    {activeTab === 'culture' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Culture & Values</h2>
                            </div>
                            <div className="mb-4">
                                <FormInput label="Section Title" value={settings.cultureTitle || ''} onChange={e => handleChange('cultureTitle', e.target.value)} />
                                <div className="mt-4">
                                    <FormTextarea label="Section Description" rows={2} value={settings.cultureDescription || ''} onChange={e => handleChange('cultureDescription', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-2 mt-8">
                                <label className="text-sm font-bold text-slate-800">Values Items</label>
                                <button onClick={() => handleAddToArray('cultureValues', {icon: '', title: '', description: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Value</button>
                            </div>
                            <div className="space-y-4">
                                {settings.cultureValues?.map((val, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button onClick={() => handleRemoveFromArray('cultureValues', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <FormInput label="Icon URL" value={val.icon || ''} onChange={e => handleArrayChange('cultureValues', idx, 'icon', e.target.value)} />
                                                <button onClick={() => openMediaPicker((url) => handleArrayChange('cultureValues', idx, 'icon', url))} className="bg-white px-3 border rounded text-sm mt-6"><Image size={16}/></button>
                                            </div>
                                            {val.icon && <img src={val.icon.startsWith('http') ? val.icon : `${import.meta.env.VITE_API_URL}${val.icon}`} alt="Preview" className="h-10 w-10 object-contain bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                        </div>
                                        <FormInput label="Title" value={val.title || ''} onChange={e => handleArrayChange('cultureValues', idx, 'title', e.target.value)} />
                                        <FormTextarea label="Description" rows={2} value={val.description || ''} onChange={e => handleArrayChange('cultureValues', idx, 'description', e.target.value)} className="md:col-span-2" />
                                    </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Experience Section */}
                    {activeTab === 'experience' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Experience Section</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormInput label="Section Title" value={settings.experienceTitle || ''} onChange={e => handleChange('experienceTitle', e.target.value)} />
                                
                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-slate-800">Experience Points</label>
                                        <button onClick={() => handleAddToArray('experiencePoints', {title: '', heading: '', description: '', image: '', cards: []})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Point</button>
                                    </div>
                                    <div className="space-y-6">
                                        {settings.experiencePoints?.map((point, idx) => (
                                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative flex flex-col gap-4">
                                                <div className="flex justify-between items-center border-b pb-2">
                                                    <h3 className="font-semibold text-slate-700">Point #{idx + 1}</h3>
                                                    <button onClick={() => handleRemoveFromArray('experiencePoints', idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <FormInput label="Tab Title" value={point.title || ''} onChange={e => handleArrayChange('experiencePoints', idx, 'title', e.target.value)} />
                                                    <FormInput label="Heading" value={point.heading || ''} onChange={e => handleArrayChange('experiencePoints', idx, 'heading', e.target.value)} />
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <FormTextarea label="Description" rows={2} value={point.description || ''} onChange={e => handleArrayChange('experiencePoints', idx, 'description', e.target.value)} />
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <div className="flex gap-2">
                                                            <FormInput label="Image URL" value={point.image || ''} onChange={e => handleArrayChange('experiencePoints', idx, 'image', e.target.value)} />
                                                            <button onClick={() => openMediaPicker((url) => handleArrayChange('experiencePoints', idx, 'image', url))} className="bg-white px-3 border rounded text-sm mt-6"><Image size={16}/></button>
                                                        </div>
                                                        {point.image && <img src={point.image.startsWith('http') ? point.image : `${import.meta.env.VITE_API_URL}${point.image}`} alt="Preview" className="h-20 object-contain bg-slate-100 border border-slate-200 self-start rounded" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                                    </div>
                                                </div>
                                                
                                                {/* Nested Cards */}
                                                <div className="mt-4 border-t pt-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <label className="text-sm font-bold text-slate-700">Cards inside "{point.title || `Point #${idx + 1}`}"</label>
                                                        <button onClick={() => handleAddToNestedArray('experiencePoints', idx, 'cards', {title: '', description: '', image: ''})} className="text-blue-600 text-xs font-medium flex items-center gap-1"><Plus size={14}/> Add Card</button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {point.cards?.map((card, cIdx) => (
                                                            <div key={cIdx} className="bg-white p-3 rounded border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <button onClick={() => handleRemoveFromNestedArray('experiencePoints', idx, 'cards', cIdx)} className="absolute top-2 right-2 text-red-400 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                                                                <FormInput label="Card Title" value={card.title || ''} onChange={e => handleNestedArrayChange('experiencePoints', idx, 'cards', cIdx, 'title', e.target.value)} />
                                                                <div className="flex flex-col gap-2 md:col-span-2">
                                                                    <FormTextarea label="Card Description" rows={2} value={card.description || ''} onChange={e => handleNestedArrayChange('experiencePoints', idx, 'cards', cIdx, 'description', e.target.value)} />
                                                                </div>
                                                                <div className="flex flex-col gap-2 md:col-span-2">
                                                                    <div className="flex gap-2">
                                                                        <FormInput label="Card Image (Icon) URL" value={card.image || ''} onChange={e => handleNestedArrayChange('experiencePoints', idx, 'cards', cIdx, 'image', e.target.value)} />
                                                                        <button onClick={() => openMediaPicker((url) => handleNestedArrayChange('experiencePoints', idx, 'cards', cIdx, 'image', url))} className="bg-slate-50 px-3 border rounded text-sm mt-6"><Image size={16}/></button>
                                                                    </div>
                                                                    {card.image && <img src={card.image.startsWith('http') ? card.image : `${import.meta.env.VITE_API_URL}${card.image}`} alt="Preview" className="h-10 w-10 object-contain bg-slate-50 border border-slate-200 self-start rounded" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Testimonials */}
                    {activeTab === 'testimonials' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Testimonials</h2>
                            </div>
                            <div className="mb-4">
                                <FormInput label="Section Title" value={settings.testimonialsTitle || ''} onChange={e => handleChange('testimonialsTitle', e.target.value)} />
                            </div>
                            <div className="flex justify-between items-center mb-2 mt-8">
                                <label className="text-sm font-bold text-slate-800">Testimonials List</label>
                                <button onClick={() => handleAddToArray('testimonials', {quote: '', name: '', role: '', image: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Testimonial</button>
                            </div>
                            <div className="space-y-4">
                                {settings.testimonials?.map((t, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button onClick={() => handleRemoveFromArray('testimonials', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                        <FormTextarea label="Quote" rows={3} value={t.quote || ''} onChange={e => handleArrayChange('testimonials', idx, 'quote', e.target.value)} className="md:col-span-2" />
                                        <FormInput label="Name" value={t.name || ''} onChange={e => handleArrayChange('testimonials', idx, 'name', e.target.value)} />
                                        <FormInput label="Role" value={t.role || ''} onChange={e => handleArrayChange('testimonials', idx, 'role', e.target.value)} />
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <div className="flex gap-2">
                                                <FormInput label="Image URL" value={t.image || ''} onChange={e => handleArrayChange('testimonials', idx, 'image', e.target.value)} />
                                                <button onClick={() => openMediaPicker((url) => handleArrayChange('testimonials', idx, 'image', url))} className="bg-white px-3 border rounded text-sm mt-6"><Image size={16}/></button>
                                            </div>
                                            {t.image && <img src={t.image.startsWith('http') ? t.image : `${import.meta.env.VITE_API_URL}${t.image}`} alt="Preview" className="h-16 w-16 object-cover rounded-full bg-slate-100 border border-slate-200 self-start" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                        </div>
                                    </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Day In Life */}
                    {activeTab === 'dayInLife' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Day in the Life</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormInput label="Section Title" value={settings.dayInLifeTitle || ''} onChange={e => handleChange('dayInLifeTitle', e.target.value)} />
                                <FormTextarea label="Description" rows={3} value={settings.dayInLifeDescription || ''} onChange={e => handleChange('dayInLifeDescription', e.target.value)} />
                                <FormInput label="Video Link URL (Optional)" value={settings.dayInLifeVideo || ''} onChange={e => handleChange('dayInLifeVideo', e.target.value)} />
                                
                                <div className="space-y-1 mt-4">
                                    <label className="text-sm font-medium text-slate-700">Image Cover</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="text" value={settings.dayInLifeImage || ''} onChange={e => handleChange('dayInLifeImage', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <button onClick={() => openMediaPicker((url) => handleChange('dayInLifeImage', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-1"><Image size={16}/> Choose</button>
                                    </div>
                                    {settings.dayInLifeImage && (
                                        <img src={settings.dayInLifeImage.startsWith('http') ? settings.dayInLifeImage : `${import.meta.env.VITE_API_URL}${settings.dayInLifeImage}`} alt="Preview" className="h-20 mt-2 rounded border border-slate-200 object-contain bg-slate-50" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Life Beyond Work */}
                    {activeTab === 'lifeBeyond' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Life Beyond Work</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <FormInput label="Section Title" value={settings.lifeBeyondTitle || ''} onChange={e => handleChange('lifeBeyondTitle', e.target.value)} />
                                <FormTextarea label="Description" rows={3} value={settings.lifeBeyondDescription || ''} onChange={e => handleChange('lifeBeyondDescription', e.target.value)} />
                            </div>
                            
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-slate-800">Gallery Images</label>
                                <button onClick={() => handleAddToArray('lifeBeyondImages', '')} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Image</button>
                            </div>
                            <div className="space-y-4">
                                {settings.lifeBeyondImages?.map((img, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative flex flex-col gap-2">
                                        <div className="flex gap-3 items-center w-full">
                                            <div className="flex-1">
                                                <FormInput label="Image URL" value={img || ''} onChange={e => handleArrayChange('lifeBeyondImages', idx, null, e.target.value)} />
                                            </div>
                                            <button onClick={() => openMediaPicker((url) => {
                                                const newArray = [...settings.lifeBeyondImages];
                                                newArray[idx] = url;
                                                handleChange('lifeBeyondImages', newArray);
                                            })} className="bg-white px-3 py-2 border rounded text-sm mt-6"><Image size={16}/></button>
                                            <button onClick={() => handleRemoveFromArray('lifeBeyondImages', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded mt-6"><Trash2 size={18}/></button>
                                        </div>
                                        {img && <img src={img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL}${img}`} alt="Preview" className="h-20 object-cover bg-slate-100 border border-slate-200 self-start rounded" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150?text=No+Image'; }} />}
                                    </div>
                                ))} 
                            </div>
                        </div>
                    )}

                    {/* Open Roles */}
                    {activeTab === 'openRoles' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800">Open Roles</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <FormInput label="Section Title" value={settings.openRolesTitle || ''} onChange={e => handleChange('openRolesTitle', e.target.value)} />
                                <FormInput label="Description (e.g. 3 positions open)" value={settings.openRolesDescription || ''} onChange={e => handleChange('openRolesDescription', e.target.value)} />
                                <FormInput label="General Link URL" value={settings.openRolesLink || ''} onChange={e => handleChange('openRolesLink', e.target.value)} />
                            </div>
                            
                            <div className="flex justify-between items-center mb-2 mt-8">
                                <label className="text-sm font-bold text-slate-800">Job Positions</label>
                                <button onClick={() => handleAddToArray('openRoles', {category: '', title: '', location: '', experience: '', salary: '', applyLink: ''})} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={16}/> Add Role</button>
                            </div>
                            <div className="space-y-4">
                                {settings.openRoles?.map((role, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button onClick={() => handleRemoveFromArray('openRoles', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>
                                        <FormInput label="Category (e.g. Finance)" value={role.category || ''} onChange={e => handleArrayChange('openRoles', idx, 'category', e.target.value)} />
                                        <FormInput label="Job Title" value={role.title || ''} onChange={e => handleArrayChange('openRoles', idx, 'title', e.target.value)} />
                                        <FormInput label="Location" value={role.location || ''} onChange={e => handleArrayChange('openRoles', idx, 'location', e.target.value)} />
                                        <FormInput label="Experience" value={role.experience || ''} onChange={e => handleArrayChange('openRoles', idx, 'experience', e.target.value)} />
                                        <FormInput label="Salary / Compensation" value={role.salary || ''} onChange={e => handleArrayChange('openRoles', idx, 'salary', e.target.value)} />
                                        <FormInput label="Apply Link (e.g. mailto:hr@asiancables.com)" value={role.applyLink || ''} onChange={e => handleArrayChange('openRoles', idx, 'applyLink', e.target.value)} />
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

export default LifeAtAsianCablesSettings;
