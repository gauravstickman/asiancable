import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Globe, Plus, Trash2, Briefcase, Layers, Heart, Layout, HelpCircle } from 'lucide-react';
import { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const LeadershipSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'global', label: 'Global Presence', icon: Globe },
        { id: 'group', label: 'RPG Group Info', icon: Briefcase },
        { id: 'ecosystem', label: 'Ecosystem', icon: Layers },
        { id: 'values', label: 'Core Values', icon: Heart },
        { id: 'verticals', label: 'Business Verticals', icon: Layout },
        { id: 'faq', label: 'FAQ Section', icon: HelpCircle },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/leadership-page');
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch leadership settings');
            console.error('Error fetching leadership settings:', error);
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
            [arrayName]: [...(prev[arrayName] || []), defaultItem]
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
        if (activeTab === 'hero') {
            if (!settings.heroTitle?.trim()) {
                toast.error('Main Title is required');
                return false;
            }
            if (!settings.heroImage?.trim()) {
                toast.error('Desktop Image is required');
                return false;
            }
            if (!settings.heroMobileImage?.trim()) {
                toast.error('Mobile Image is required');
                return false;
            }
        }
        
        if (activeTab === 'global') {
            if (!settings.globalTitle?.trim()) {
                toast.error('Global Title is required');
                return false;
            }
            if (!settings.globalDescription?.trim()) {
                toast.error('Global Description is required');
                return false;
            }
            if (!settings.globalImage?.trim()) {
                toast.error('Global Image is required');
                return false;
            }
            for (let i = 0; i < (settings.globalMainStats || []).length; i++) {
                const stat = settings.globalMainStats[i];
                if (!stat.value?.trim() || !stat.label?.trim()) {
                    toast.error(`Main Stat #${i + 1} must have both value and label`);
                    return false;
                }
            }
            for (let i = 0; i < (settings.globalCards || []).length; i++) {
                const card = settings.globalCards[i];
                if (!card.value?.trim() || !card.label?.trim()) {
                    toast.error(`Highlight Card #${i + 1} must have both value and label`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'group') {
            if (!settings.groupTitle?.trim()) {
                toast.error('Group Title is required');
                return false;
            }
            if (!settings.groupDescription?.trim()) {
                toast.error('Group Description is required');
                return false;
            }
            if (!settings.groupImage?.trim()) {
                toast.error('Group Image is required');
                return false;
            }
            if (!settings.groupLinkUrl?.trim()) {
                toast.error('Group Link URL is required');
                return false;
            }
        }
        
        if (activeTab === 'ecosystem') {
            if (!settings.ecosystemTitle?.trim()) {
                toast.error('Ecosystem Title is required');
                return false;
            }
            for (let i = 0; i < (settings.ecosystemCards || []).length; i++) {
                const card = settings.ecosystemCards[i];
                if (!card.description?.trim()) {
                    toast.error(`Ecosystem Card #${i + 1} must have a description`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'values') {
            if (!settings.valuesTitle?.trim()) {
                toast.error('Core Values Title is required');
                return false;
            }
            for (let i = 0; i < (settings.valuesCards || []).length; i++) {
                const card = settings.valuesCards[i];
                if (!card.title?.trim() || !card.description?.trim()) {
                    toast.error(`Value Card #${i + 1} must have a title and description`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'verticals') {
            if (!settings.verticalsTitle?.trim()) {
                toast.error('Business Verticals Title is required');
                return false;
            }
            for (let i = 0; i < (settings.verticalsCards || []).length; i++) {
                const card = settings.verticalsCards[i];
                if (!card.title?.trim()) {
                    toast.error(`Vertical Card #${i + 1} must have a title`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'faq') {
            if (!settings.faqTitle?.trim()) {
                toast.error('FAQ Title is required');
                return false;
            }
            for (let i = 0; i < (settings.faqs || []).length; i++) {
                const faq = settings.faqs[i];
                if (!faq.question?.trim() || !faq.answer?.trim()) {
                    toast.error(`FAQ #${i + 1} must have both question and answer`);
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
            const { data } = await API.put('/leadership-page', settings);
            if (data.success) {
                toast.success('Leadership settings saved successfully');
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
                    <h1 className="text-2xl font-bold text-slate-800">Leadership Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage content and images for the Leadership section</p>
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

                    {/* HERO SECTION */}
                    {activeTab === 'hero' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Image size={20} className="text-blue-500" />
                                    Hero Section
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the main leadership hero area.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <FormInput
                                    label="Main Title"
                                    placeholder="e.g. Leadership"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Description"
                                    rows={3}
                                    placeholder="Description..."
                                    value={settings.heroDescription || ''}
                                    onChange={e => handleChange('heroDescription', e.target.value)}
                                />

                                <div>
                                    <ImageInput
                                        label="Desktop Image"
                                        value={settings.heroImage || ''}
                                        onChange={e => handleChange('heroImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('heroImage', url))}
                                    />
                                    {settings.heroImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.heroImage.startsWith('http') ? settings.heroImage : `${import.meta.env.VITE_API_URL}${settings.heroImage}`}
                                                alt="Desktop Preview"
                                                className="w-full h-40 rounded-xl border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x200?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-2">
                                    <ImageInput
                                        label="Mobile Image"
                                        value={settings.heroMobileImage || ''}
                                        onChange={e => handleChange('heroMobileImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('heroMobileImage', url))}
                                    />
                                    {settings.heroMobileImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.heroMobileImage.startsWith('http') ? settings.heroMobileImage : `${import.meta.env.VITE_API_URL}${settings.heroMobileImage}`}
                                                alt="Mobile Preview"
                                                className="w-40 h-40 rounded-xl border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* GLOBAL PRESENCE SECTION */}
                    {activeTab === 'global' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Globe size={20} className="text-blue-500" />
                                    Global Presence
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the Global stats and founder cards.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-6">
                                <FormInput
                                    label="Global Title"
                                    placeholder="e.g. Global"
                                    value={settings.globalTitle || ''}
                                    onChange={e => handleChange('globalTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Global Description"
                                    rows={3}
                                    placeholder="e.g. Operating across 135+ countries..."
                                    value={settings.globalDescription || ''}
                                    onChange={e => handleChange('globalDescription', e.target.value)}
                                />
                                
                                <div>
                                    <ImageInput
                                        label="Image"
                                        value={settings.globalImage || ''}
                                        onChange={e => handleChange('globalImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('globalImage', url))}
                                    />
                                    {settings.globalImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.globalImage.startsWith('http') ? settings.globalImage : `${import.meta.env.VITE_API_URL}${settings.globalImage}`}
                                                alt="Image Preview"
                                                className="w-full h-40 rounded-xl border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x200?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Global Main Stats (Overlay on Image) */}
                            <div className="mb-8 pb-6 border-b border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Main Stats (On Image)</p>
                                    <button onClick={() => handleAddToArray('globalMainStats', { value: '', label: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Stat
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.globalMainStats || []).map((stat, idx) => (
                                        <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <div className="flex-1">
                                                <FormInput label="Value" placeholder="e.g. 35K+" value={stat.value || ''} onChange={e => handleArrayChange('globalMainStats', idx, 'value', e.target.value)} />
                                            </div>
                                            <div className="flex-1">
                                                <FormInput label="Label" placeholder="e.g. Employees" value={stat.label || ''} onChange={e => handleArrayChange('globalMainStats', idx, 'label', e.target.value)} />
                                            </div>
                                            <button onClick={() => handleRemoveFromArray('globalMainStats', idx)} className="text-red-400 hover:text-red-600 p-2 mt-5 bg-white border border-slate-200 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                    {(settings.globalMainStats || []).length === 0 && (
                                        <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <p className="text-sm">No main stats added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Global Bottom Cards */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Bottom Highlight Cards</p>
                                    <button onClick={() => handleAddToArray('globalCards', { value: '', label: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Card
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.globalCards || []).map((card, idx) => (
                                        <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <div className="flex-1">
                                                <FormInput label="Highlight Text (Value)" placeholder="e.g. 1979" value={card.value || ''} onChange={e => handleArrayChange('globalCards', idx, 'value', e.target.value)} />
                                            </div>
                                            <div className="flex-1">
                                                <FormInput label="Description (Label)" placeholder="e.g. Founded" value={card.label || ''} onChange={e => handleArrayChange('globalCards', idx, 'label', e.target.value)} />
                                            </div>
                                            <button onClick={() => handleRemoveFromArray('globalCards', idx)} className="text-red-400 hover:text-red-600 p-2 mt-5 bg-white border border-slate-200 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                    {(settings.globalCards || []).length === 0 && (
                                        <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <p className="text-sm">No highlight cards added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* RPG GROUP SECTION */}
                    {activeTab === 'group' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Briefcase size={20} className="text-blue-500" />
                                    RPG Group Information
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the group information section and link.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <FormInput
                                    label="Group Title"
                                    placeholder="e.g. A 5.2Bn Group..."
                                    value={settings.groupTitle || ''}
                                    onChange={e => handleChange('groupTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Group Description"
                                    rows={4}
                                    placeholder="e.g. The RPG Group is one of India's leading..."
                                    value={settings.groupDescription || ''}
                                    onChange={e => handleChange('groupDescription', e.target.value)}
                                />

                                <div>
                                    <ImageInput
                                        label="Group Image"
                                        value={settings.groupImage || ''}
                                        onChange={e => handleChange('groupImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('groupImage', url))}
                                    />
                                    {settings.groupImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.groupImage.startsWith('http') ? settings.groupImage : `${import.meta.env.VITE_API_URL}${settings.groupImage}`}
                                                alt="Group Preview"
                                                className="w-full h-40 rounded-xl border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x200?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <FormInput
                                        label="Link URL"
                                        placeholder="e.g. https://www.rpggroup.com"
                                        value={settings.groupLinkUrl || ''}
                                        onChange={e => handleChange('groupLinkUrl', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* ECOSYSTEM SECTION */}
                    {activeTab === 'ecosystem' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Layers size={20} className="text-blue-500" />
                                    RPG Group Ecosystem
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the ecosystem section title, subtitle, and brand cards.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Ecosystem Title"
                                    placeholder="e.g. The RPG Group Ecosystem"
                                    value={settings.ecosystemTitle || ''}
                                    onChange={e => handleChange('ecosystemTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Ecosystem Subtitle"
                                    rows={2}
                                    placeholder="e.g. A diversified conglomerate with leading brands..."
                                    value={settings.ecosystemSubtitle || ''}
                                    onChange={e => handleChange('ecosystemSubtitle', e.target.value)}
                                />
                            </div>

                            {/* Ecosystem Cards */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Ecosystem Brand Cards</p>
                                    <button onClick={() => handleAddToArray('ecosystemCards', { logo: '', description: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Card
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.ecosystemCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('ecosystemCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Card #{idx + 1}</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <ImageInput
                                                        label="Brand Logo"
                                                        value={card.logo || ''}
                                                        onChange={e => handleArrayChange('ecosystemCards', idx, 'logo', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('ecosystemCards', idx, 'logo', url))}
                                                    />
                                                    {card.logo && (
                                                        <div className="mt-3">
                                                            <img
                                                                src={card.logo.startsWith('http') ? card.logo : `${import.meta.env.VITE_API_URL}${card.logo}`}
                                                                alt="Logo Preview"
                                                                className="h-16 rounded object-contain bg-white border border-slate-200 p-2"
                                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x80?text=No+Image'; }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-4">
                                                    <FormTextarea 
                                                        label="Description" 
                                                        rows={4}
                                                        placeholder="e.g. A leading cable manufacturing company..." 
                                                        value={card.description || ''} 
                                                        onChange={e => handleArrayChange('ecosystemCards', idx, 'description', e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.ecosystemCards || []).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <Layers size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No cards added yet. Click "Add Card" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CORE VALUES SECTION */}
                    {activeTab === 'values' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Heart size={20} className="text-blue-500" />
                                    Core Values
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the core values title and cards.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Core Values Title"
                                    placeholder="e.g. Core Values"
                                    value={settings.valuesTitle || ''}
                                    onChange={e => handleChange('valuesTitle', e.target.value)}
                                />
                            </div>

                            {/* Values Cards */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Core Value Cards</p>
                                    <button onClick={() => handleAddToArray('valuesCards', { icon: '', title: '', description: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Value
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.valuesCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative text-center">
                                            <button onClick={() => handleRemoveFromArray('valuesCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            <div className="mb-4 flex flex-col items-center">
                                                <ImageInput
                                                    label="Icon / Image"
                                                    value={card.icon || ''}
                                                    onChange={e => handleArrayChange('valuesCards', idx, 'icon', e.target.value)}
                                                    onChoose={() => openMediaPicker((url) => handleArrayChange('valuesCards', idx, 'icon', url))}
                                                />
                                                {card.icon && (
                                                    <div className="mt-3">
                                                        <img
                                                            src={card.icon.startsWith('http') ? card.icon : `${import.meta.env.VITE_API_URL}${card.icon}`}
                                                            alt="Icon Preview"
                                                            className="h-16 w-16 rounded-lg object-contain bg-white border border-slate-200 p-2 mx-auto"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64?text=Icon'; }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-4 text-left">
                                                <FormInput
                                                    label="Title"
                                                    placeholder="e.g. UNLEASH TALENT"
                                                    value={card.title || ''}
                                                    onChange={e => handleArrayChange('valuesCards', idx, 'title', e.target.value)}
                                                />
                                                <FormTextarea 
                                                    label="Description" 
                                                    rows={4}
                                                    placeholder="e.g. Enabling an environment for people..." 
                                                    value={card.description || ''} 
                                                    onChange={e => handleArrayChange('valuesCards', idx, 'description', e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.valuesCards || []).length === 0 && (
                                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <Heart size={32} className="mx-auto mb-2 opacity-40" />
                                        <p className="text-sm">No core values added yet. Click "Add Value" to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* BUSINESS VERTICALS SECTION */}
                    {activeTab === 'verticals' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Layout size={20} className="text-blue-500" />
                                    Business Verticals
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the business verticals title and cards.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Verticals Title"
                                    placeholder="e.g. Business Verticals"
                                    value={settings.verticalsTitle || ''}
                                    onChange={e => handleChange('verticalsTitle', e.target.value)}
                                />
                            </div>

                            {/* Verticals Cards */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Vertical Cards</p>
                                    <button onClick={() => handleAddToArray('verticalsCards', { icon: '', title: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Vertical
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(settings.verticalsCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative text-center">
                                            <button onClick={() => handleRemoveFromArray('verticalsCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            <div className="mb-4 flex flex-col items-center">
                                                <ImageInput
                                                    label="Icon / Image"
                                                    value={card.icon || ''}
                                                    onChange={e => handleArrayChange('verticalsCards', idx, 'icon', e.target.value)}
                                                    onChoose={() => openMediaPicker((url) => handleArrayChange('verticalsCards', idx, 'icon', url))}
                                                />
                                                {card.icon && (
                                                    <div className="mt-3">
                                                        <img
                                                            src={card.icon.startsWith('http') ? card.icon : `${import.meta.env.VITE_API_URL}${card.icon}`}
                                                            alt="Icon Preview"
                                                            className="h-16 w-16 rounded-lg object-contain bg-white border border-slate-200 p-2 mx-auto"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64?text=Icon'; }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-4 text-left">
                                                <FormInput
                                                    label="Title"
                                                    placeholder="e.g. Infrastructure & Engineering"
                                                    value={card.title || ''}
                                                    onChange={e => handleArrayChange('verticalsCards', idx, 'title', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.verticalsCards || []).length === 0 && (
                                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <Layout size={32} className="mx-auto mb-2 opacity-40" />
                                        <p className="text-sm">No business verticals added yet. Click "Add Vertical" to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* FAQ SECTION */}
                    {activeTab === 'faq' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <HelpCircle size={20} className="text-blue-500" />
                                    FAQ Section
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the Frequently Asked Questions title and items.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="FAQ Section Title"
                                    placeholder="e.g. Frequently Asked Questions"
                                    value={settings.faqTitle || ''}
                                    onChange={e => handleChange('faqTitle', e.target.value)}
                                />
                            </div>

                            {/* FAQ Items */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">FAQ Items</p>
                                    <button onClick={() => handleAddToArray('faqs', { question: '', answer: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add FAQ
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.faqs || []).map((faq, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('faqs', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">FAQ #{idx + 1}</p>
                                            
                                            <div className="space-y-4">
                                                <FormInput
                                                    label="Question"
                                                    placeholder="e.g. What is the scope of business?"
                                                    value={faq.question || ''}
                                                    onChange={e => handleArrayChange('faqs', idx, 'question', e.target.value)}
                                                />
                                                <FormTextarea 
                                                    label="Answer" 
                                                    rows={3}
                                                    placeholder="e.g. We operate globally across multiple sectors..." 
                                                    value={faq.answer || ''} 
                                                    onChange={e => handleArrayChange('faqs', idx, 'answer', e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.faqs || []).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <HelpCircle size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No FAQs added yet. Click "Add FAQ" to get started.</p>
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

export default LeadershipSettings;
