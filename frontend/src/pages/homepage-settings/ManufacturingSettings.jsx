import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import MediaPicker from '../../components/common/MediaPicker';
import {
    Save, Plus, Trash2, Image, Settings,
    Layers, Building2, BarChart2, Factory, Globe, Award, CheckCircle
} from 'lucide-react';
import { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';

const ManufacturingSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);
    const [activeTab, setActiveTab] = useState('hero');

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'infrastructure', label: 'Infrastructure Highlights', icon: Building2 },
        { id: 'production', label: 'Production Units', icon: Factory },
        { id: 'global', label: 'Global Standards', icon: Globe },
        { id: 'quality', label: 'Quality Control', icon: CheckCircle },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/manufacturing-page');
            if (data.success) setSettings(data.data);
        } catch (error) {
            toast.error('Failed to fetch Manufacturing page settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const validateSettings = () => {
        // ── Hero Section ──
        if (!settings.heroTitle?.trim()) {
            toast.error('Hero Section: Main Title is required');
            return false;
        }
        if (!settings.heroDescription?.trim()) {
            toast.error('Hero Section: Description is required');
            return false;
        }
        for (let i = 0; i < (settings.heroStats || []).length; i++) {
            const s = settings.heroStats[i];
            if (!s.value?.trim() || !s.label?.trim()) {
                toast.error(`Hero Section: Stat #${i + 1} must have both value and label`);
                return false;
            }
        }

        // ── Infrastructure Highlights ──
        if (!settings.infraTitle?.trim()) {
            toast.error('Infrastructure: Section Title is required');
            return false;
        }
        if (!settings.infraImage?.trim()) {
            toast.error('Infrastructure: Section Image is required');
            return false;
        }
        if (!settings.infraDescription?.trim()) {
            toast.error('Infrastructure: Description is required');
            return false;
        }
        for (let i = 0; i < (settings.infraHighlights || []).length; i++) {
            const h = settings.infraHighlights[i];
            if (!h.title?.trim() || !h.subtitle?.trim()) {
                toast.error(`Infrastructure: Highlight #${i + 1} must have both title and subtitle`);
                return false;
            }
        }

        // ── Production Units ──
        if (!settings.productionTitle?.trim()) {
            toast.error('Production Units: Section Title is required');
            return false;
        }
        for (let i = 0; i < (settings.productionUnits || []).length; i++) {
            const u = settings.productionUnits[i];
            if (!u.name?.trim() || !u.image?.trim()) {
                toast.error(`Production Units: Unit #${i + 1} must have both name and image`);
                return false;
            }
        }

        // ── Global Standards ──
        if (!settings.globalTitle?.trim()) {
            toast.error('Global Standards: Section Title is required');
            return false;
        }
        if (!settings.standardsCardTitle?.trim() || !settings.standardsCardDescription?.trim()) {
            toast.error('Global Standards: Standards Card must have title and description');
            return false;
        }
        for (let i = 0; i < (settings.standardsCardStats || []).length; i++) {
            const s = settings.standardsCardStats[i];
            if (!s.value?.trim() || !s.label?.trim()) {
                toast.error(`Global Standards: Stat #${i + 1} must have both value and label`);
                return false;
            }
        }
        for (let i = 0; i < (settings.featureCards || []).length; i++) {
            const c = settings.featureCards[i];
            if (!c.title?.trim() || !c.description?.trim()) {
                toast.error(`Global Standards: Feature Card #${i + 1} must have title and description`);
                return false;
            }
        }
        for (let i = 0; i < (settings.certifications || []).length; i++) {
            const c = settings.certifications[i];
            if (!c.name?.trim() || !c.description?.trim()) {
                toast.error(`Global Standards: Certification #${i + 1} must have name and description`);
                return false;
            }
        }

        // ── Quality Control ──
        if (!settings.qualityTitle?.trim()) {
            toast.error('Quality Control: Section Title is required');
            return false;
        }
        for (let i = 0; i < (settings.qualityItems || []).length; i++) {
            const q = settings.qualityItems[i];
            if (!q.title?.trim() || !q.logo?.trim()) {
                toast.error(`Quality Control: Item #${i + 1} must have title and logo`);
                return false;
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setLoading(true);
        try {
            await API.put('/manufacturing-page', settings);
            toast.success('Manufacturing page settings saved successfully');
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

    if (!settings) return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3 text-slate-400">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading Manufacturing settings...</span>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-[1400px] mx-auto animate-in fade-in duration-300 mb-20">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Settings size={28} className="text-blue-600" />
                        Manufacturing Page Settings
                    </h1>
                    <p className="text-slate-500 mt-1">Manage the Hero section and Infrastructure Highlights for the Manufacturing page.</p>
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
                                <p className="text-sm text-slate-500 mt-1">Configure the top banner / hero area of the Manufacturing page.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Main Title"
                                        placeholder="e.g. State-of-the-Art Manufacturing"
                                        value={settings.heroTitle || ''}
                                        onChange={e => handleChange('heroTitle', e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <FormTextarea
                                        label="Description"
                                        rows={3}
                                        placeholder="Hero section description..."
                                        value={settings.heroDescription || ''}
                                        onChange={e => handleChange('heroDescription', e.target.value)}
                                    />
                                </div>
                                {/* Background Image */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Background Image
                                    </label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            value={settings.heroBgImage || ''}
                                            onChange={e => handleChange('heroBgImage', e.target.value)}
                                            placeholder="Image URL or choose from media library"
                                            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                        />
                                        <button
                                            onClick={() => openMediaPicker((url) => handleChange('heroBgImage', url))}
                                            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <Image size={16} /> Choose
                                        </button>
                                    </div>
                                    {settings.heroBgImage && (
                                        <div className="mt-3">
                                            <img
                                                src={settings.heroBgImage.startsWith('http') ? settings.heroBgImage : `${import.meta.env.VITE_API_URL}${settings.heroBgImage}`}
                                                alt="Hero Preview"
                                                className="h-28 rounded-lg border border-slate-200 object-cover bg-slate-50"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x112?text=No+Image'; }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                        <BarChart2 size={16} className="text-blue-500" />
                                        Stats (Bottom of Hero)
                                    </label>
                                    <button
                                        onClick={() => handleAddToArray('heroStats', { value: '', label: '' })}
                                        className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg"
                                    >
                                        <Plus size={16} /> Add Stat
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(settings.heroStats || []).map((stat, idx) => (
                                        <div key={idx} className="flex gap-2 items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <FormInput
                                                label="Value"
                                                placeholder="e.g. 3600+"
                                                value={stat.value || ''}
                                                onChange={e => handleArrayChange('heroStats', idx, 'value', e.target.value)}
                                            />
                                            <FormInput
                                                label="Label"
                                                placeholder="e.g. MT Production"
                                                value={stat.label || ''}
                                                onChange={e => handleArrayChange('heroStats', idx, 'label', e.target.value)}
                                            />
                                            <button
                                                onClick={() => handleRemoveFromArray('heroStats', idx)}
                                                className="text-red-400 hover:text-red-600 p-2 mt-5 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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

                    {/* ── INFRASTRUCTURE HIGHLIGHTS SECTION ── */}
                    {activeTab === 'infrastructure' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Building2 size={20} className="text-blue-500" />
                                    Infrastructure Highlights
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the infrastructure section with image, description and facility highlights.</p>
                            </div>

                            {/* Section Header Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Infrastructure Highlights"
                                    value={settings.infraTitle || ''}
                                    onChange={e => handleChange('infraTitle', e.target.value)}
                                />
                                <FormInput
                                    label="Badge Text"
                                    placeholder="e.g. Zero Accidents"
                                    value={settings.infraBadgeText || ''}
                                    onChange={e => handleChange('infraBadgeText', e.target.value)}
                                />
                            </div>

                            {/* Image */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Section Image
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={settings.infraImage || ''}
                                        onChange={e => handleChange('infraImage', e.target.value)}
                                        placeholder="Image URL or choose from media library"
                                        className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                    />
                                    <button
                                        onClick={() => openMediaPicker((url) => handleChange('infraImage', url))}
                                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <Image size={16} /> Choose
                                    </button>
                                </div>
                                {settings.infraImage && (
                                    <div className="mt-3">
                                        <img
                                            src={settings.infraImage.startsWith('http') ? settings.infraImage : `${import.meta.env.VITE_API_URL}${settings.infraImage}`}
                                            alt="Infrastructure Preview"
                                            className="h-32 rounded-lg border border-slate-200 object-cover bg-slate-50"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x128?text=No+Image'; }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Description + Read More */}
                            <div className="grid grid-cols-1 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormTextarea
                                    label="Description"
                                    rows={3}
                                    placeholder="e.g. Manufacturing is distributed across two specialised facilities..."
                                    value={settings.infraDescription || ''}
                                    onChange={e => handleChange('infraDescription', e.target.value)}
                                />
                                <FormInput
                                    label="Read More Link"
                                    placeholder="e.g. /manufacturing"
                                    value={settings.infraReadMoreLink || ''}
                                    onChange={e => handleChange('infraReadMoreLink', e.target.value)}
                                />
                            </div>

                            {/* Highlights List */}
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                    <BarChart2 size={16} className="text-blue-500" />
                                    Facility Highlights
                                </label>
                                <button
                                    onClick={() => handleAddToArray('infraHighlights', { title: '', subtitle: '' })}
                                    className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg"
                                >
                                    <Plus size={16} /> Add Highlight
                                </button>
                            </div>

                            <div className="space-y-3">
                                {(settings.infraHighlights || []).map((item, idx) => (
                                    <div key={idx} className="flex gap-2 items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <FormInput
                                            label="Title"
                                            placeholder="e.g. EHV / HV / Railway"
                                            value={item.title || ''}
                                            onChange={e => handleArrayChange('infraHighlights', idx, 'title', e.target.value)}
                                        />
                                        <FormInput
                                            label="Subtitle"
                                            placeholder="e.g. Vadodara Facility Focus"
                                            value={item.subtitle || ''}
                                            onChange={e => handleArrayChange('infraHighlights', idx, 'subtitle', e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleRemoveFromArray('infraHighlights', idx)}
                                            className="text-red-400 hover:text-red-600 p-2 mt-5 rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                {(settings.infraHighlights || []).length === 0 && (
                                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <Building2 size={32} className="mx-auto mb-2 opacity-40" />
                                        <p className="text-sm">No highlights added yet. Click "Add Highlight" to get started.</p>
                                    </div>
                                )}
                            </div>
                </div>
                    )}

                    {/* ── PRODUCTION UNITS SECTION ── */}
                    {activeTab === 'production' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Factory size={20} className="text-blue-500" />
                                    Production Units
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage production unit tabs with name and image for each facility.</p>
                            </div>

                            {/* Section Header Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Production Units"
                                    value={settings.productionTitle || ''}
                                    onChange={e => handleChange('productionTitle', e.target.value)}
                                />
                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Section Subtitle"
                                        placeholder="e.g. 12 state-of-the-art facilities..."
                                        value={settings.productionSubtitle || ''}
                                        onChange={e => handleChange('productionSubtitle', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Units List */}
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                    <Factory size={16} className="text-blue-500" />
                                    Units
                                </label>
                                <button
                                    onClick={() => handleAddToArray('productionUnits', { name: '', image: '' })}
                                    className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg"
                                >
                                    <Plus size={16} /> Add Unit
                                </button>
                            </div>

                            <div className="space-y-4">
                                {(settings.productionUnits || []).map((unit, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                        <button
                                            onClick={() => handleRemoveFromArray('productionUnits', idx)}
                                            className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            Unit #{idx + 1}
                                        </p>
                                        <div className="space-y-3">
                                            <FormInput
                                                label="Unit Name"
                                                placeholder="e.g. Unit 1, Vadodara"
                                                value={unit.name || ''}
                                                onChange={e => handleArrayChange('productionUnits', idx, 'name', e.target.value)}
                                            />
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                                    Unit Image
                                                </label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Image URL"
                                                        value={unit.image || ''}
                                                        onChange={e => handleArrayChange('productionUnits', idx, 'image', e.target.value)}
                                                        className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                                    />
                                                    <button
                                                        onClick={() => openMediaPicker((url) => handleArrayChange('productionUnits', idx, 'image', url))}
                                                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2 whitespace-nowrap"
                                                    >
                                                        <Image size={16} /> Choose
                                                    </button>
                                                </div>
                                                {unit.image && (
                                                    <div className="mt-3">
                                                        <img
                                                            src={unit.image.startsWith('http') ? unit.image : `${import.meta.env.VITE_API_URL}${unit.image}`}
                                                            alt="Unit Preview"
                                                            className="h-28 rounded-lg border border-slate-200 object-cover bg-slate-50"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x112?text=No+Image'; }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(settings.productionUnits || []).length === 0 && (
                                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <Factory size={32} className="mx-auto mb-2 opacity-40" />
                                        <p className="text-sm">No production units added yet. Click "Add Unit" to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── GLOBAL STANDARDS SECTION ── */}
                    {activeTab === 'global' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Globe size={20} className="text-blue-500" />
                                    Built for Global Infrastructure Standards
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage standards card, feature cards and certifications.</p>
                            </div>

                            {/* Section Title */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Built for Global Infrastructure Standards"
                                    value={settings.globalTitle || ''}
                                    onChange={e => handleChange('globalTitle', e.target.value)}
                                />
                            </div>

                            {/* ─ Standards Card ─ */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">Standards Card</p>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormInput
                                        label="Card Title"
                                        placeholder="e.g. Standards-Led Manufacturing"
                                        value={settings.standardsCardTitle || ''}
                                        onChange={e => handleChange('standardsCardTitle', e.target.value)}
                                    />
                                    <FormTextarea
                                        label="Card Description"
                                        rows={4}
                                        placeholder="Manufacturing is aligned to internationally recognised standards..."
                                        value={settings.standardsCardDescription || ''}
                                        onChange={e => handleChange('standardsCardDescription', e.target.value)}
                                    />
                                </div>

                                {/* Stats */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Stats</label>
                                        <button onClick={() => handleAddToArray('standardsCardStats', { value: '', label: '' })} className="text-blue-600 text-xs font-medium flex items-center gap-1 px-2 py-1 border border-blue-200 bg-blue-50 rounded-md">
                                            <Plus size={14} /> Add Stat
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {(settings.standardsCardStats || []).map((stat, idx) => (
                                            <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                                <FormInput label="Value/Title" placeholder="e.g. 90+ or Multi-Standard Compliance" value={stat.value || ''} onChange={e => handleArrayChange('standardsCardStats', idx, 'value', e.target.value)} />
                                                <FormInput label="Label/Subtitle" placeholder="e.g. Countries Served or IEC | BS..." value={stat.label || ''} onChange={e => handleArrayChange('standardsCardStats', idx, 'label', e.target.value)} />
                                                <button onClick={() => handleRemoveFromArray('standardsCardStats', idx)} className="text-red-400 hover:text-red-600 p-2 mt-5"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ─ Feature Cards ─ */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Feature Cards</p>
                                    <button onClick={() => handleAddToArray('featureCards', { title: '', description: '', image: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Card
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(settings.featureCards || []).map((card, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('featureCards', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Card #{idx + 1}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FormInput label="Title" placeholder="e.g. Advanced Technology" value={card.title || ''} onChange={e => handleArrayChange('featureCards', idx, 'title', e.target.value)} />
                                                <div />
                                                <div className="md:col-span-2">
                                                    <FormTextarea label="Description" rows={2} placeholder="Card description..." value={card.description || ''} onChange={e => handleArrayChange('featureCards', idx, 'description', e.target.value)} />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Card Image</label>
                                                    <div className="flex gap-2 items-center">
                                                        <input type="text" placeholder="Image URL" value={card.image || ''} onChange={e => handleArrayChange('featureCards', idx, 'image', e.target.value)} className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" />
                                                        <button onClick={() => openMediaPicker((url) => handleArrayChange('featureCards', idx, 'image', url))} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:text-blue-600 text-sm flex items-center gap-2"><Image size={16} /> Choose</button>
                                                    </div>
                                                    {card.image && <img src={card.image.startsWith('http') ? card.image : `${import.meta.env.VITE_API_URL}${card.image}`} alt="Preview" className="h-24 mt-2 rounded-lg border border-slate-200 object-cover bg-slate-50" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x96?text=No+Image'; }} />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ─ International Certifications ─ */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                                        <Award size={16} /> International Certifications
                                    </p>
                                    <button onClick={() => handleAddToArray('certifications', { logo: '', name: '', description: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg">
                                        <Plus size={16} /> Add Certification
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <FormInput label="Certifications Section Title" placeholder="e.g. International Certifications" value={settings.certificationsTitle || ''} onChange={e => handleChange('certificationsTitle', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    {(settings.certifications || []).map((cert, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                            <button onClick={() => handleRemoveFromArray('certifications', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Certification #{idx + 1}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FormInput label="Name" placeholder="e.g. IEC" value={cert.name || ''} onChange={e => handleArrayChange('certifications', idx, 'name', e.target.value)} />
                                                <FormInput label="Description" placeholder="e.g. International Electrotechnical Commission" value={cert.description || ''} onChange={e => handleArrayChange('certifications', idx, 'description', e.target.value)} />
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Logo</label>
                                                    <div className="flex gap-2 items-center">
                                                        <input type="text" placeholder="Logo URL" value={cert.logo || ''} onChange={e => handleArrayChange('certifications', idx, 'logo', e.target.value)} className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" />
                                                        <button onClick={() => openMediaPicker((url) => handleArrayChange('certifications', idx, 'logo', url))} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:text-blue-600 text-sm flex items-center gap-2"><Image size={16} /> Choose</button>
                                                    </div>
                                                    {cert.logo && <img src={cert.logo.startsWith('http') ? cert.logo : `${import.meta.env.VITE_API_URL}${cert.logo}`} alt="Logo" className="h-12 w-12 mt-2 rounded object-contain bg-white border border-slate-200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48?text=?'; }} />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(settings.certifications || []).length === 0 && (
                                        <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <Award size={28} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-sm">No certifications added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── QUALITY CONTROL & ASSURANCE SECTION ── */}
                    {activeTab === 'quality' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-blue-500" />
                                    Quality Control & Assurance
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage certifications and accreditions lists.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Quality Control & Assurance"
                                    value={settings.qualityTitle || ''}
                                    onChange={e => handleChange('qualityTitle', e.target.value)}
                                />
                                <FormInput
                                    label="View All Button Link"
                                    placeholder="e.g. /quality"
                                    value={settings.qualityViewAllLink || ''}
                                    onChange={e => handleChange('qualityViewAllLink', e.target.value)}
                                />
                            </div>

                            {/* Items List */}
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-500" />
                                    Quality Items (Certifications / Accreditions)
                                </label>
                                <button
                                    onClick={() => handleAddToArray('qualityItems', { type: 'certification', logo: '', title: '', subtitle: '', file: '' })}
                                    className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg"
                                >
                                    <Plus size={16} /> Add Item
                                </button>
                            </div>

                            <div className="space-y-4">
                                {(settings.qualityItems || []).map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                                        <button
                                            onClick={() => handleRemoveFromArray('qualityItems', idx)}
                                            className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            Item #{idx + 1}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Item Type / Category (Tab Name)</label>
                                                <select
                                                    value={item.type || 'certification'}
                                                    onChange={e => handleArrayChange('qualityItems', idx, 'type', e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                                                >
                                                    <option value="certification">Certifications</option>
                                                    <option value="accredition">Accreditions</option>
                                                    <option value="compliance">Compliance</option>
                                                </select>
                                                <p className="text-xs text-slate-400 mt-1">This determines which tab the item appears under.</p>
                                            </div>
                                            
                                            <FormInput
                                                label="Title"
                                                placeholder="e.g. ISO 9001"
                                                value={item.title || ''}
                                                onChange={e => handleArrayChange('qualityItems', idx, 'title', e.target.value)}
                                            />
                                            <FormInput
                                                label="Subtitle"
                                                placeholder="e.g. Certifications"
                                                value={item.subtitle || ''}
                                                onChange={e => handleArrayChange('qualityItems', idx, 'subtitle', e.target.value)}
                                            />
                                            
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                                    Logo Image
                                                </label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Logo URL"
                                                        value={item.logo || ''}
                                                        onChange={e => handleArrayChange('qualityItems', idx, 'logo', e.target.value)}
                                                        className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                                    />
                                                    <button
                                                        onClick={() => openMediaPicker((url) => handleArrayChange('qualityItems', idx, 'logo', url))}
                                                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2 whitespace-nowrap"
                                                    >
                                                        <Image size={16} />
                                                    </button>
                                                </div>
                                                {item.logo && (
                                                    <img
                                                        src={item.logo.startsWith('http') ? item.logo : `${import.meta.env.VITE_API_URL}${item.logo}`}
                                                        alt="Logo Preview"
                                                        className="h-10 w-10 mt-2 rounded border border-slate-200 object-contain bg-white"
                                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40?text=?'; }}
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                                    Download File (PDF)
                                                </label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="File URL"
                                                        value={item.file || ''}
                                                        onChange={e => handleArrayChange('qualityItems', idx, 'file', e.target.value)}
                                                        className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                                    />
                                                    <button
                                                        onClick={() => openMediaPicker((url) => handleArrayChange('qualityItems', idx, 'file', url))}
                                                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2 whitespace-nowrap"
                                                    >
                                                        <Image size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(settings.qualityItems || []).length === 0 && (
                                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <CheckCircle size={32} className="mx-auto mb-2 opacity-40" />
                                        <p className="text-sm">No quality items added yet. Click "Add Item" to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <MediaPicker
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={(url) => { if (onSelectCallback) onSelectCallback(url); }}
            />
        </div>
    );
};

export default ManufacturingSettings;
