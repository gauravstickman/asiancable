import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Plus, Trash2, Globe, Zap, Award, Sparkles } from 'lucide-react';
import { FormInput, ImageInput, FormTextarea } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const SustainabilitySettings = () => {
    const [settings, setSettings] = useState({
        heroTitle: '',
        heroImage: '',
        heroMobileImage: '',
        stats: []
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'our', label: 'Our Sustainability', icon: Globe },
        { id: 'certifications', label: 'Certifications', icon: Award },
        { id: 'highlights', label: 'Highlights', icon: Sparkles },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/sustainability-page');
            if (data.success && data.data) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            toast.error('Failed to fetch settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field, index, key, value) => {
        setSettings(prev => {
            const newArray = [...(prev[field] || [])];
            newArray[index] = { ...newArray[index], [key]: value };
            return { ...prev, [field]: newArray };
        });
    };

    const handleAddToArray = (field, defaultObj) => {
        setSettings(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), defaultObj]
        }));
    };

    const handleRemoveFromArray = (field, index) => {
        setSettings(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const validateSettings = () => {
        if (activeTab === 'hero') {
            if (!settings.heroTitle?.trim()) {
                toast.error('Hero Title is required');
                return false;
            }
            if (!settings.heroImage?.trim()) {
                toast.error('Hero Desktop Image is required');
                return false;
            }
            if (!settings.heroMobileImage?.trim()) {
                toast.error('Hero Mobile Image is required');
                return false;
            }
            for (let i = 0; i < (settings.stats || []).length; i++) {
                const stat = settings.stats[i];
                if (!stat.value?.trim() || !stat.label?.trim()) {
                    toast.error(`Stat #${i + 1} must have a value and label`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'our') {
            if (!settings.ourSustainabilityTitle?.trim()) {
                toast.error('Our Sustainability Title is required');
                return false;
            }
            if (!settings.ourSustainabilityDescription?.trim()) {
                toast.error('Our Sustainability Description is required');
                return false;
            }
            if (!settings.ourSustainabilityImage?.trim()) {
                toast.error('Our Sustainability Image is required');
                return false;
            }
            for (let i = 0; i < (settings.commitments || []).length; i++) {
                const item = settings.commitments[i];
                if (!item.text?.trim()) {
                    toast.error(`Commitment #${i + 1} text is required`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'certifications') {
            if (!settings.certificationsTitle?.trim()) {
                toast.error('Certifications Title is required');
                return false;
            }
            for (let i = 0; i < (settings.certifications || []).length; i++) {
                const cert = settings.certifications[i];
                if (!cert.title?.trim() || !cert.description?.trim()) {
                    toast.error(`Certification #${i + 1} must have a title and description`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'highlights') {
            if (!settings.highlightsTitle?.trim()) {
                toast.error('Highlights Title is required');
                return false;
            }
            for (let i = 0; i < (settings.highlights || []).length; i++) {
                const item = settings.highlights[i];
                if (!item.title?.trim() || !item.description?.trim()) {
                    toast.error(`Highlight #${i + 1} must have a title and description`);
                    return false;
                }
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setSaving(true);
        try {
            const { data } = await API.put('/sustainability-page', settings);
            if (data.success) {
                toast.success('Sustainability settings saved successfully!');
            }
        } catch (error) {
            console.error('Save failed:', error);
            toast.error(error.response?.data?.message || 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Sustainability Settings</h1>
                    <p className="text-slate-500 mt-1">Manage the content and layout of the Sustainability page</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save All Changes'}
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

                {/* Content Area */}
                <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[600px]">
                    
                    {/* HERO SECTION */}
                    {activeTab === 'hero' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Image size={20} className="text-blue-500" />
                                    Hero Section
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the main banner of the sustainability page.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Main Title"
                                    placeholder="e.g. Sustainability"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <ImageInput
                                            label="Desktop Image (1920x1080)"
                                            value={settings.heroImage || ''}
                                            onChange={e => handleChange('heroImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroImage', url))}
                                        />
                                    </div>
                                    <div>
                                        <ImageInput
                                            label="Mobile Image (768x1024)"
                                            value={settings.heroMobileImage || ''}
                                            onChange={e => handleChange('heroMobileImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroMobileImage', url))}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hero Stats */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Hero Stats</p>
                                    <button onClick={() => handleAddToArray('stats', { value: '', label: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Stat
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(settings.stats || []).map((stat, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                            <button onClick={() => handleRemoveFromArray('stats', idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="space-y-4 pt-4">
                                                <FormInput
                                                    label="Value"
                                                    placeholder="e.g. 100%"
                                                    value={stat.value || ''}
                                                    onChange={e => handleArrayChange('stats', idx, 'value', e.target.value)}
                                                />
                                                <FormInput
                                                    label="Label"
                                                    placeholder="e.g. Renewable Energy"
                                                    value={stat.label || ''}
                                                    onChange={e => handleArrayChange('stats', idx, 'label', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.stats || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No stats added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {/* OUR SUSTAINABILITY SECTION */}
                    {activeTab === 'our' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Globe size={20} className="text-blue-500" />
                                    Our Sustainability
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the "Our Sustainability" section image, title, and description.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Our Sustainability"
                                    value={settings.ourSustainabilityTitle || ''}
                                    onChange={e => handleChange('ourSustainabilityTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Description"
                                    rows={4}
                                    placeholder="e.g. We are committed to making a positive impact..."
                                    value={settings.ourSustainabilityDescription || ''}
                                    onChange={e => handleChange('ourSustainabilityDescription', e.target.value)}
                                />

                                <div>
                                    <ImageInput
                                        label="Section Image"
                                        value={settings.ourSustainabilityImage || ''}
                                        onChange={e => handleChange('ourSustainabilityImage', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleChange('ourSustainabilityImage', url))}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Sustainability Commitments</p>
                                    <button onClick={() => handleAddToArray('commitments', { icon: '', text: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Item
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {(settings.commitments || []).map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group">
                                            <button onClick={() => handleRemoveFromArray('commitments', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Commitment #{idx + 1}</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <ImageInput
                                                        label="Icon / Image"
                                                        value={item.icon || ''}
                                                        onChange={e => handleArrayChange('commitments', idx, 'icon', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('commitments', idx, 'icon', url))}
                                                    />
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <FormTextarea
                                                        label="Commitment Text"
                                                        rows={2}
                                                        placeholder="e.g. Committed to sustainable operations"
                                                        value={item.text || ''}
                                                        onChange={e => handleArrayChange('commitments', idx, 'text', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.commitments || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No commitments added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {/* CERTIFICATIONS SECTION */}
                    {activeTab === 'certifications' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Award size={20} className="text-blue-500" />
                                    Certifications & Accreditations
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the certifications shown on the sustainability page.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Certifications & Accreditations"
                                    value={settings.certificationsTitle || ''}
                                    onChange={e => handleChange('certificationsTitle', e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Certifications List</p>
                                    <button onClick={() => handleAddToArray('certifications', { image: '', title: '', description: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Certification
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {(settings.certifications || []).map((cert, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group flex flex-col">
                                            <button onClick={() => handleRemoveFromArray('certifications', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Certification #{idx + 1}</p>
                                            
                                            <div className="space-y-6 flex-1 flex flex-col">
                                                <div>
                                                    <ImageInput
                                                        label="Logo / Badge"
                                                        value={cert.image || ''}
                                                        onChange={e => handleArrayChange('certifications', idx, 'image', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('certifications', idx, 'image', url))}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <FormInput
                                                        label="Title"
                                                        placeholder="e.g. IGBC"
                                                        value={cert.title || ''}
                                                        onChange={e => handleArrayChange('certifications', idx, 'title', e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <FormTextarea
                                                        label="Description"
                                                        rows={3}
                                                        placeholder="e.g. Platinum-certified green factory"
                                                        value={cert.description || ''}
                                                        onChange={e => handleArrayChange('certifications', idx, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.certifications || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No certifications added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* HIGHLIGHTS SECTION */}
                    {activeTab === 'highlights' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Sparkles size={20} className="text-blue-500" />
                                    Sustainability Highlights
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the highlighted sustainability initiatives and achievements.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Sustainability Highlights"
                                    value={settings.highlightsTitle || ''}
                                    onChange={e => handleChange('highlightsTitle', e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Highlights List</p>
                                    <button onClick={() => handleAddToArray('highlights', { image: '', title: '', description: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Highlight
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {(settings.highlights || []).map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group flex flex-col">
                                            <button onClick={() => handleRemoveFromArray('highlights', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Highlight #{idx + 1}</p>
                                            
                                            <div className="space-y-6 flex-1 flex flex-col">
                                                <div>
                                                    <ImageInput
                                                        label="Background Image"
                                                        value={item.image || ''}
                                                        onChange={e => handleArrayChange('highlights', idx, 'image', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('highlights', idx, 'image', url))}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <FormInput
                                                        label="Title"
                                                        placeholder="e.g. IGBC Platinum Certified..."
                                                        value={item.title || ''}
                                                        onChange={e => handleArrayChange('highlights', idx, 'title', e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <FormTextarea
                                                        label="Description"
                                                        rows={4}
                                                        placeholder="e.g. Our Vadodara manufacturing facility..."
                                                        value={item.description || ''}
                                                        onChange={e => handleArrayChange('highlights', idx, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.highlights || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No highlights added yet.</p>
                                    </div>
                                )}
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

export default SustainabilitySettings;
