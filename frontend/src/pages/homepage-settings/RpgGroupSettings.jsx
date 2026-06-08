import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Globe, Info, Layers, Target, Briefcase, HelpCircle, Plus, Trash2 } from 'lucide-react';
import { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const RpgGroupSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'global', label: 'Global Presence', icon: Globe },
        { id: 'info', label: 'RPG Group Info', icon: Info },
        { id: 'ecosystem', label: 'Group Ecosystem', icon: Layers },
        { id: 'core', label: 'Core Values', icon: Target },
        { id: 'verticals', label: 'Business Verticals', icon: Briefcase },
        { id: 'faq', label: 'FAQs', icon: HelpCircle },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/rpg-group-page');
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch RPG Group page settings');
            console.error('Error fetching settings:', error);
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

    const handleStringArrayChange = (arrayName, index, value) => {
        setSettings(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray[index] = value;
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
        if (!window.confirm("Are you sure you want to remove this item?")) return;
        setSettings(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray.splice(index, 1);
            return { ...prev, [arrayName]: newArray };
        });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const { data } = await API.put('/rpg-group-page', settings);
            if (data.success) {
                toast.success('Settings saved successfully');
                fetchSettings();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    if (!settings) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-12 p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">RPG Group Settings</h1>
                    <p className="text-slate-500 mt-1">Manage content for the RPG Group page</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
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
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">Hero Section</h2>
                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput label="Hero Title" value={settings.heroTitle || ''} onChange={e => handleChange('heroTitle', e.target.value)} />
                                <FormTextarea label="Hero Description" rows={3} value={settings.heroDescription || ''} onChange={e => handleChange('heroDescription', e.target.value)} />
                                <ImageInput label="Hero Banner / Background Image" value={settings.heroImage || ''} onChange={e => handleChange('heroImage', e.target.value)} onChoose={() => openMediaPicker((url) => handleChange('heroImage', url))} />
                                <ImageInput label="Hero Banner Mobile Image" value={settings.heroMobileImage || ''} onChange={e => handleChange('heroMobileImage', e.target.value)} onChoose={() => openMediaPicker((url) => handleChange('heroMobileImage', url))} />
                            </div>
                        </div>
                    )}

                    {/* GLOBAL PRESENCE */}
                    {activeTab === 'global' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">Global Presence</h2>
                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput label="Section Title" value={settings.globalTitle || ''} onChange={e => handleChange('globalTitle', e.target.value)} />
                                <FormTextarea label="Section Description" rows={2} value={settings.globalDescription || ''} onChange={e => handleChange('globalDescription', e.target.value)} />
                                <ImageInput label="Background Image" value={settings.globalImage || ''} onChange={e => handleChange('globalImage', e.target.value)} onChoose={() => openMediaPicker((url) => handleChange('globalImage', url))} />
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-slate-700 mb-4">Main Stats</h3>
                                <div className="space-y-4">
                                    {(settings.globalMainStats || []).map((stat, idx) => (
                                        <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border">
                                            <FormInput label="Value" value={stat.value || ''} onChange={e => handleArrayChange('globalMainStats', idx, 'value', e.target.value)} />
                                            <FormInput label="Label" value={stat.label || ''} onChange={e => handleArrayChange('globalMainStats', idx, 'label', e.target.value)} />
                                            <button onClick={() => handleRemoveFromArray('globalMainStats', idx)} className="text-red-500 mt-6"><Trash2 size={20}/></button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('globalMainStats', { value: '', label: '' })} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium">
                                        <Plus size={18}/> Add Stat
                                    </button>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-slate-700 mb-4">Card Stats (Right Side)</h3>
                                <div className="space-y-4">
                                    {(settings.globalCards || []).map((stat, idx) => (
                                        <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border">
                                            <FormInput label="Value (e.g. 1979)" value={stat.value || ''} onChange={e => handleArrayChange('globalCards', idx, 'value', e.target.value)} />
                                            <FormInput label="Label (e.g. Founded)" value={stat.label || ''} onChange={e => handleArrayChange('globalCards', idx, 'label', e.target.value)} />
                                            <button onClick={() => handleRemoveFromArray('globalCards', idx)} className="text-red-500 mt-6"><Trash2 size={20}/></button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('globalCards', { value: '', label: '' })} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium">
                                        <Plus size={18}/> Add Card
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RPG GROUP INFO */}
                    {activeTab === 'info' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">RPG Group Info Section</h2>
                            
                            <div className="mb-6">
                                <FormInput label="Heading" value={settings.infoHeading || ''} onChange={e => handleChange('infoHeading', e.target.value)} />
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-slate-700 mb-4">Description Paragraphs</h3>
                                <div className="space-y-4">
                                    {(settings.infoDescriptions || []).map((desc, idx) => (
                                        <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border">
                                            <FormTextarea rows={3} value={desc} onChange={e => handleStringArrayChange('infoDescriptions', idx, e.target.value)} />
                                            <button onClick={() => handleRemoveFromArray('infoDescriptions', idx)} className="text-red-500 mt-2"><Trash2 size={20}/></button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('infoDescriptions', '')} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium">
                                        <Plus size={18}/> Add Paragraph
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <FormInput label="Button Text" value={settings.infoButtonText || ''} onChange={e => handleChange('infoButtonText', e.target.value)} />
                                <FormInput label="Button URL" value={settings.infoButtonUrl || ''} onChange={e => handleChange('infoButtonUrl', e.target.value)} />
                            </div>

                            <ImageInput label="Side Image" value={settings.infoImage || ''} onChange={e => handleChange('infoImage', e.target.value)} onChoose={() => openMediaPicker((url) => handleChange('infoImage', url))} />
                        </div>
                    )}

                    {/* ECOSYSTEM */}
                    {activeTab === 'ecosystem' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">Group Ecosystem</h2>
                            <FormInput label="Section Title" value={settings.ecosystemTitle || ''} onChange={e => handleChange('ecosystemTitle', e.target.value)} />

                            <div className="mt-8">
                                <h3 className="font-bold text-slate-700 mb-4">Ecosystem Cards</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.ecosystemCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border relative">
                                            <button onClick={() => handleRemoveFromArray('ecosystemCards', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 size={18}/></button>
                                            <div className="space-y-4 pt-4">
                                                <FormInput label="Title" value={card.title || ''} onChange={e => handleArrayChange('ecosystemCards', idx, 'title', e.target.value)} />
                                                <FormInput label="URL Link" value={card.url || ''} onChange={e => handleArrayChange('ecosystemCards', idx, 'url', e.target.value)} />
                                                <ImageInput label="Image" value={card.image || ''} onChange={e => handleArrayChange('ecosystemCards', idx, 'image', e.target.value)} onChoose={() => openMediaPicker((url) => handleArrayChange('ecosystemCards', idx, 'image', url))} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('ecosystemCards', { title: '', image: '', url: '' })} className="bg-slate-50/50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[200px]">
                                        <Plus size={32} className="mb-2 opacity-70"/>
                                        <span className="font-medium">Add New Card</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CORE VALUES */}
                    {activeTab === 'core' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">Core Values</h2>
                            <FormInput label="Section Title" value={settings.coreValuesTitle || ''} onChange={e => handleChange('coreValuesTitle', e.target.value)} />

                            <div className="mt-8">
                                <h3 className="font-bold text-slate-700 mb-4">Core Value Cards</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.coreValuesCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border relative">
                                            <button onClick={() => handleRemoveFromArray('coreValuesCards', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 size={18}/></button>
                                            <div className="space-y-4 pt-4">
                                                <FormInput label="Title" value={card.title || ''} onChange={e => handleArrayChange('coreValuesCards', idx, 'title', e.target.value)} />
                                                <FormTextarea label="Description" rows={2} value={card.desc || ''} onChange={e => handleArrayChange('coreValuesCards', idx, 'desc', e.target.value)} />
                                                <ImageInput label="Icon Image" value={card.icon || ''} onChange={e => handleArrayChange('coreValuesCards', idx, 'icon', e.target.value)} onChoose={() => openMediaPicker((url) => handleArrayChange('coreValuesCards', idx, 'icon', url))} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('coreValuesCards', { title: '', desc: '', icon: '' })} className="bg-slate-50/50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[200px]">
                                        <Plus size={32} className="mb-2 opacity-70"/>
                                        <span className="font-medium">Add New Card</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BUSINESS VERTICALS */}
                    {activeTab === 'verticals' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">Business Verticals</h2>
                            <div className="space-y-4 mb-8">
                                <FormInput label="Section Title" value={settings.verticalsTitle || ''} onChange={e => handleChange('verticalsTitle', e.target.value)} />
                                <FormTextarea label="Section Description" rows={2} value={settings.verticalsDescription || ''} onChange={e => handleChange('verticalsDescription', e.target.value)} />
                            </div>

                            <div className="mt-8">
                                <h3 className="font-bold text-slate-700 mb-4">Vertical Cards</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.verticalsCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border relative">
                                            <button onClick={() => handleRemoveFromArray('verticalsCards', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 size={18}/></button>
                                            <div className="space-y-4 pt-4">
                                                <FormInput label="Title" value={card.title || ''} onChange={e => handleArrayChange('verticalsCards', idx, 'title', e.target.value)} />
                                                <ImageInput label="Image" value={card.image || ''} onChange={e => handleArrayChange('verticalsCards', idx, 'image', e.target.value)} onChoose={() => openMediaPicker((url) => handleArrayChange('verticalsCards', idx, 'image', url))} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('verticalsCards', { title: '', image: '' })} className="bg-slate-50/50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[200px]">
                                        <Plus size={32} className="mb-2 opacity-70"/>
                                        <span className="font-medium">Add New Card</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {activeTab === 'faq' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-4 border-b">Frequently Asked Questions</h2>
                            <FormInput label="Section Title" value={settings.faqTitle || ''} onChange={e => handleChange('faqTitle', e.target.value)} />

                            <div className="mt-8">
                                <h3 className="font-bold text-slate-700 mb-4">FAQ List</h3>
                                <div className="space-y-4">
                                    {(settings.faqs || []).map((faq, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border relative flex gap-4">
                                            <div className="flex-1 space-y-4">
                                                <FormInput label="Question" value={faq.question || ''} onChange={e => handleArrayChange('faqs', idx, 'question', e.target.value)} />
                                                <FormTextarea label="Answer" rows={2} value={faq.answer || ''} onChange={e => handleArrayChange('faqs', idx, 'answer', e.target.value)} />
                                            </div>
                                            <button onClick={() => handleRemoveFromArray('faqs', idx)} className="text-red-500 mt-6"><Trash2 size={20}/></button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddToArray('faqs', { question: '', answer: '' })} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium">
                                        <Plus size={18}/> Add FAQ
                                    </button>
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

export default RpgGroupSettings;
