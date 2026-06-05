import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import {
    Save, Plus, Trash2, Image, Info, Target, Link, TrendingUp, Shield, Users
} from 'lucide-react';
import { FormInput, FormTextarea, FormSelect, ImageInput } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const AboutSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'builton', label: 'Built On', icon: Target },
        { id: 'journey', label: 'Our Journey', icon: TrendingUp },
        { id: 'governance', label: 'Governance', icon: Shield },
        { id: 'leadership', label: 'Leadership', icon: Users },
    ];

    const currentYear = new Date().getFullYear();
    const yearsOptions = Array.from(new Array(currentYear - 1950 + 1), (val, index) => (currentYear - index).toString());

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/about-page');
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch about page settings');
            console.error('Error fetching about settings:', error);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setSettings(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [arrayName]: newArray };
        });
    };

    const handleAddToArray = (arrayName, defaultItem) => {
        setSettings(prev => ({
            ...prev,
            [arrayName]: [defaultItem, ...(prev[arrayName] || [])]
        }));
    };

    const handleRemoveFromArray = (arrayName, index) => {
        setSettings(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray.splice(index, 1);
            return { ...prev, [arrayName]: newArray };
        });
    };

    const validateSettings = () => {
        // Hero Section
        if (activeTab === 'hero') {
            if (!settings.heroTitle?.trim()) {
                toast.error('Hero Section: Main Title is required');
                return false;
            }
            if (!settings.heroImage?.trim()) {
                toast.error('Hero Section: Background Image is required');
                return false;
            }
            if (!settings.heroMobileImage?.trim()) {
                toast.error('Hero Section: Mobile Image is required');
                return false;
            }
            for (let i = 0; i < (settings.heroStats || []).length; i++) {
                const stat = settings.heroStats[i];
                if (!stat.value?.trim() || !stat.label?.trim()) {
                    toast.error(`Hero Section: Stat #${i + 1} must have both value and label`);
                    return false;
                }
            }
        }

        // Built On Section
        if (activeTab === 'builton') {
            if (!settings.builtOnTitle?.trim() || !settings.builtOnSubtitle?.trim()) {
                toast.error('Built On Section: Title and Subtitle are required');
                return false;
            }
            for (let i = 0; i < (settings.valueCards || []).length; i++) {
                const card = settings.valueCards[i];
                if (!card.title?.trim() || !card.description?.trim()) {
                    toast.error(`Built On Section: Feature Card #${i + 1} must have title and description`);
                    return false;
                }
            }
        }

        // Our Journey Section
        if (activeTab === 'journey') {
            if (!settings.journeyTitle?.trim()) {
                toast.error('Our Journey Section: Section Title is required');
                return false;
            }
            for (let i = 0; i < (settings.journeyCards || []).length; i++) {
                const card = settings.journeyCards[i];
                if (!card.year?.trim() || !card.description?.trim() || !card.image?.trim()) {
                    toast.error(`Our Journey Section: Milestone #${i + 1} must have year, image, and description`);
                    return false;
                }
            }
        }

        // Governance Section
        if (activeTab === 'governance') {
            if (!settings.governanceTitle?.trim()) {
                toast.error('Governance Section: Section Title is required');
                return false;
            }
            if (!settings.governancePrimaryTitle?.trim() || !settings.governancePrimaryIcon?.trim() || !settings.governancePrimaryDescription?.trim()) {
                toast.error('Governance Section: Primary Governance Card must have title, icon, and description');
                return false;
            }
            for (let i = 0; i < (settings.governanceCards || []).length; i++) {
                const card = settings.governanceCards[i];
                if (!card.title?.trim() || !card.icon?.trim()) {
                    toast.error(`Governance Section: Card #${i + 1} must have title and icon`);
                    return false;
                }
            }
        }

        // Leadership Section
        if (activeTab === 'leadership') {
            if (!settings.leadershipTitle?.trim() || !settings.leadershipSubtitle?.trim()) {
                toast.error('Leadership Section: Title and Subtitle are required');
                return false;
            }
            for (let i = 0; i < (settings.leadershipMembers || []).length; i++) {
                const member = settings.leadershipMembers[i];
                if (!member.name?.trim() || !member.designation?.trim() || !member.image?.trim()) {
                    toast.error(`Leadership Section: Member #${i + 1} must have name, designation, and image`);
                    return false;
                }
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setLoading(true);
        try {
            const { data } = await API.put('/about-page', settings);
            if (data.success) {
                toast.success('About page settings saved successfully');
                fetchSettings();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    if (!settings) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">About Page Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage content, images, and layout for the About Page</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
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
                                    className={`flex items-center gap-3 text-left px-5 py-3.5 font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
                                    }`}
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

                    {/* ── HERO SECTION ── */}
                    {activeTab === 'hero' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Image size={20} className="text-blue-500" />
                                    Hero Section
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the top banner / hero area of the About page.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <FormInput
                                    label="Main Title"
                                    placeholder="e.g. About Asian Cables"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />
                                <div>
                                    <ImageInput
                                        label="Hero Banner / Background Image"
                                        value={settings.heroImage || ''}
                                        onChange={e => handleChange('heroImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('heroImage', url))}
                                    />
                                    {settings.heroImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.heroImage.startsWith('http') ? settings.heroImage : `${import.meta.env.VITE_API_URL}${settings.heroImage}`}
                                                alt="Hero Banner Preview"
                                                className="w-full h-40 rounded-xl border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x200?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <ImageInput
                                        label="Hero Banner Mobile Image"
                                        value={settings.heroMobileImage || ''}
                                        onChange={e => handleChange('heroMobileImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('heroMobileImage', url))}
                                    />
                                    {settings.heroMobileImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.heroMobileImage.startsWith('http') ? settings.heroMobileImage : `${import.meta.env.VITE_API_URL}${settings.heroMobileImage}`}
                                                alt="Hero Mobile Preview"
                                                className="w-40 h-40 rounded-xl border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Stats</label>
                                    <button onClick={() => handleAddToArray('heroStats', { value: '', label: '' })} className="text-blue-600 text-xs font-medium flex items-center gap-1 px-2 py-1 border border-blue-200 bg-blue-50 rounded-md">
                                        <Plus size={14} /> Add Stat
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(settings.heroStats || []).map((stat, idx) => (
                                        <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                            <FormInput label="Value" placeholder="e.g. 50+" value={stat.value || ''} onChange={e => handleArrayChange('heroStats', idx, 'value', e.target.value)} />
                                            <FormInput label="Label" placeholder="e.g. Years of Excellence" value={stat.label || ''} onChange={e => handleArrayChange('heroStats', idx, 'label', e.target.value)} />
                                            <button onClick={() => handleRemoveFromArray('heroStats', idx)} className="text-red-400 hover:text-red-600 p-2 mt-5"><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                    {(settings.heroStats || []).length === 0 && (
                                        <p className="text-sm text-slate-400 text-center py-4 border-2 border-dashed border-slate-200 rounded-lg">
                                            No stats added yet. Click "Add Stat" to add one.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── BUILT ON SECTION ── */}
                    {activeTab === 'builton' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Target size={20} className="text-blue-500" />
                                    Built on Precision
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the vision, mission, purpose & values section.</p>
                            </div>

                            {/* Title & Subtitle */}
                            <div className="grid grid-cols-1 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Built on Precision. Driven by Purpose."
                                    value={settings.builtOnTitle || ''}
                                    onChange={e => handleChange('builtOnTitle', e.target.value)}
                                />
                                <FormTextarea
                                    label="Section Subtitle"
                                    rows={2}
                                    placeholder="Engineering systems that power certainty..."
                                    value={settings.builtOnSubtitle || ''}
                                    onChange={e => handleChange('builtOnSubtitle', e.target.value)}
                                />
                            </div>

                            {/* Quick Links */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                        <Link size={14} /> Quick Links
                                    </label>
                                    <button onClick={() => handleAddToArray('builtOnLinks', { label: '', url: '', icon: 'file' })} className="text-blue-600 text-xs font-medium flex items-center gap-1 px-2 py-1 border border-blue-200 bg-blue-50 rounded-md">
                                        <Plus size={14} /> Add Link
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(settings.builtOnLinks || []).map((link, idx) => (
                                        <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                            <FormInput label="Label" placeholder="e.g. User Manual" value={link.label || ''} onChange={e => handleArrayChange('builtOnLinks', idx, 'label', e.target.value)} />
                                            <FormInput label="URL" placeholder="e.g. /user-manual" value={link.url || ''} onChange={e => handleArrayChange('builtOnLinks', idx, 'url', e.target.value)} />
                                            <div className="w-32 shrink-0">
                                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Icon</label>
                                                <select
                                                    value={link.icon || 'file'}
                                                    onChange={e => handleArrayChange('builtOnLinks', idx, 'icon', e.target.value)}
                                                    className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                >
                                                    <option value="file">📄 File</option>
                                                    <option value="calculator">🧮 Calculator</option>
                                                    <option value="download">⬇️ Download</option>
                                                    <option value="link">🔗 Link</option>
                                                </select>
                                            </div>
                                            <button onClick={() => handleRemoveFromArray('builtOnLinks', idx)} className="text-red-400 hover:text-red-600 p-2 mt-5"><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Value Cards */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Value Cards (Vision / Mission / Purpose / Values)</p>
                                    <button onClick={() => handleAddToArray('valueCards', { title: '', description: '', icon: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Card
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.valueCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('valueCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Card #{idx + 1}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FormInput label="Title" placeholder="e.g. Our Vision" value={card.title || ''} onChange={e => handleArrayChange('valueCards', idx, 'title', e.target.value)} />
                                                <FormInput label="Icon Image URL" placeholder="Icon URL (optional)" value={card.icon || ''} onChange={e => handleArrayChange('valueCards', idx, 'icon', e.target.value)} />
                                                <div className="md:col-span-2">
                                                    <FormTextarea label="Description" rows={3} placeholder="Card description..." value={card.description || ''} onChange={e => handleArrayChange('valueCards', idx, 'description', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.valueCards || []).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <Target size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No value cards added yet. Click "Add Card" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── OUR JOURNEY SECTION ── */}
                    {activeTab === 'journey' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-blue-500" />
                                    Our Journey
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the timeline of events and milestones.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Our Journey"
                                    value={settings.journeyTitle || ''}
                                    onChange={e => handleChange('journeyTitle', e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Timeline Cards</p>
                                    <button onClick={() => handleAddToArray('journeyCards', { year: '', description: '', image: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Card
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.journeyCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('journeyCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Milestone #{idx + 1}</p>
                                            
                                            <div className="space-y-4">
                                                <FormSelect label="Year" options={yearsOptions} value={card.year || ''} onChange={e => handleArrayChange('journeyCards', idx, 'year', e.target.value)} />
                                                
                                                <div>
                                                    <ImageInput
                                                        label="Card Image"
                                                        value={card.image || ''}
                                                        onChange={e => handleArrayChange('journeyCards', idx, 'image', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('journeyCards', idx, 'image', url))}
                                                    />
                                                    {card.image && (
                                                        <div className="mt-3">
                                                            <img
                                                                src={card.image.startsWith('http') ? card.image : `${import.meta.env.VITE_API_URL}${card.image}`}
                                                                alt="Preview"
                                                                className="h-28 rounded-lg border border-slate-200 object-cover bg-slate-50 w-full sm:w-1/2 md:w-1/3"
                                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x112?text=No+Image'; }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <FormTextarea label="Description" rows={3} placeholder="Merger of..." value={card.description || ''} onChange={e => handleArrayChange('journeyCards', idx, 'description', e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.journeyCards || []).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <TrendingUp size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No timeline events added yet. Click "Add Card" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── GOVERNANCE SECTION ── */}
                    {activeTab === 'governance' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Shield size={20} className="text-blue-500" />
                                    Shaped By Governance
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the governance section title and feature cards.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Shaped By Governance. Built On Quality..."
                                    value={settings.governanceTitle || ''}
                                    onChange={e => handleChange('governanceTitle', e.target.value)}
                                />
                            </div>

                            {/* Primary Card (Static) */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">Primary Governance Card <span className="text-slate-400 lowercase font-normal">(Displays as solid blue)</span></p>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                                    <FormInput
                                        label="Title"
                                        placeholder="e.g. RPG Governance..."
                                        value={settings.governancePrimaryTitle || ''}
                                        onChange={e => handleChange('governancePrimaryTitle', e.target.value)}
                                    />
                                    <div>
                                        <ImageInput
                                            label="Card Icon (Image URL)"
                                            value={settings.governancePrimaryIcon || ''}
                                            onChange={e => handleChange('governancePrimaryIcon', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('governancePrimaryIcon', url))}
                                        />
                                        {settings.governancePrimaryIcon && (
                                            <div className="mt-3">
                                                <img
                                                    src={settings.governancePrimaryIcon.startsWith('http') ? settings.governancePrimaryIcon : `${import.meta.env.VITE_API_URL}${settings.governancePrimaryIcon}`}
                                                    alt="Icon Preview"
                                                    className="h-12 w-12 rounded object-contain bg-white border border-slate-200 p-1"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48?text=?'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <FormTextarea
                                        label="Description"
                                        rows={3}
                                        placeholder="Card description..."
                                        value={settings.governancePrimaryDescription || ''}
                                        onChange={e => handleChange('governancePrimaryDescription', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Dynamic Cards */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Other Governance Cards</p>
                                    <button onClick={() => handleAddToArray('governanceCards', { title: '', icon: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Card
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.governanceCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('governanceCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Card #{idx + 1}</p>
                                            
                                            <div className="space-y-4">
                                                <FormInput label="Title" placeholder="e.g. Consistent Quality..." value={card.title || ''} onChange={e => handleArrayChange('governanceCards', idx, 'title', e.target.value)} />
                                                
                                                <div>
                                                    <ImageInput
                                                        label="Card Icon (Image URL)"
                                                        value={card.icon || ''}
                                                        onChange={e => handleArrayChange('governanceCards', idx, 'icon', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('governanceCards', idx, 'icon', url))}
                                                    />
                                                    {card.icon && (
                                                        <div className="mt-3">
                                                            <img
                                                                src={card.icon.startsWith('http') ? card.icon : `${import.meta.env.VITE_API_URL}${card.icon}`}
                                                                alt="Icon Preview"
                                                                className="h-12 w-12 rounded object-contain bg-white border border-slate-200 p-1"
                                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48?text=?'; }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.governanceCards || []).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <Shield size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No other cards added yet. Click "Add Card" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── LEADERSHIP TEAM SECTION ── */}
                    {activeTab === 'leadership' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Users size={20} className="text-blue-500" />
                                    Leadership Team
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the leadership team section and member cards.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Leadership Team"
                                    value={settings.leadershipTitle || ''}
                                    onChange={e => handleChange('leadershipTitle', e.target.value)}
                                />
                                <FormInput
                                    label="Subtitle"
                                    placeholder="e.g. Meet the visionaries..."
                                    value={settings.leadershipSubtitle || ''}
                                    onChange={e => handleChange('leadershipSubtitle', e.target.value)}
                                />
                                <FormInput
                                    label="Button Label"
                                    placeholder="e.g. View Leadership"
                                    value={settings.leadershipButtonLabel || ''}
                                    onChange={e => handleChange('leadershipButtonLabel', e.target.value)}
                                />
                                <FormInput
                                    label="Button URL"
                                    placeholder="e.g. /leadership"
                                    value={settings.leadershipButtonUrl || ''}
                                    onChange={e => handleChange('leadershipButtonUrl', e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Team Members</p>
                                    <button onClick={() => handleAddToArray('leadershipMembers', { name: '', designation: '', image: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Member
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.leadershipMembers || []).map((member, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('leadershipMembers', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Member #{idx + 1}</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <FormInput label="Name" placeholder="e.g. John Doe" value={member.name || ''} onChange={e => handleArrayChange('leadershipMembers', idx, 'name', e.target.value)} />
                                                    <FormInput label="Designation" placeholder="e.g. CEO" value={member.designation || ''} onChange={e => handleArrayChange('leadershipMembers', idx, 'designation', e.target.value)} />
                                                </div>
                                                <div>
                                                    <ImageInput
                                                        label="Member Image URL"
                                                        value={member.image || ''}
                                                        onChange={e => handleArrayChange('leadershipMembers', idx, 'image', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('leadershipMembers', idx, 'image', url))}
                                                    />
                                                    {member.image && (
                                                        <div className="mt-3">
                                                            <img
                                                                src={member.image.startsWith('http') ? member.image : `${import.meta.env.VITE_API_URL}${member.image}`}
                                                                alt="Preview"
                                                                className="h-28 rounded-lg border border-slate-200 object-cover bg-slate-50 w-full sm:w-1/2"
                                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200?text=No+Image'; }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.leadershipMembers || []).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <Users size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No members added yet. Click "Add Member" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Media Picker Modal */}
            <MediaPicker
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={(url) => {
                    if (onSelectCallback) onSelectCallback(url);
                    setPickerOpen(false);
                }}
            />
        </div>
    );
};

export default AboutSettings;
