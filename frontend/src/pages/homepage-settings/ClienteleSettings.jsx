import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Globe, Briefcase, Users, Plus, Trash2 } from 'lucide-react';
import { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const ClienteleSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'regions', label: 'Regions', icon: Globe },
        { id: 'industries', label: 'Industries', icon: Briefcase },
        { id: 'clients', label: 'Clients List', icon: Users },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/clientele-page');
            if (data.success) {
                const fetchedData = data.data || {};
                setSettings({
                    ...fetchedData,
                    regions: fetchedData.regions || [],
                    industries: fetchedData.industries || [],
                    clients: fetchedData.clients || []
                });
            }
        } catch (error) {
            toast.error('Failed to fetch clientele page settings');
            console.error('Error fetching clientele page settings:', error);
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
            if (field === null) {
                newArray[index] = value; // For array of strings
            } else {
                newArray[index] = { ...newArray[index], [field]: value }; // For array of objects
            }
            return { ...prev, [arrayName]: newArray };
        });
    };

    const handleAddToArray = (arrayName, defaultItem) => {
        setSettings(prev => {
            const newIndex = (prev[arrayName] || []).length;
            setTimeout(() => {
                const el = document.getElementById(`${arrayName}-${newIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return {
                ...prev,
                [arrayName]: [...(prev[arrayName] || []), defaultItem]
            };
        });
    };

    const handleRemoveFromArray = (arrayName, index) => {
        if (!window.confirm("Are you sure you want to remove this item?")) return;
        setSettings(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray.splice(index, 1);
            return { ...prev, [arrayName]: newArray };
        });
    };

    const validateSettings = () => {
        if (activeTab === 'hero') {
            if (!settings.heroTitle?.trim()) {
                toast.error('Hero Section: Title is required'); return false;
            }
            if (!settings.heroDesktopImage?.trim()) {
                toast.error('Hero Section: Desktop Background Image is required'); return false;
            }
            if (!settings.heroMobileImage?.trim()) {
                toast.error('Hero Section: Mobile Background Image is required'); return false;
            }
            for (let i = 0; i < (settings.heroStats || []).length; i++) {
                const s = settings.heroStats[i];
                if (!s.value?.trim() || !s.label?.trim()) {
                    toast.error(`Hero Section: Stat #${i + 1} must have both value and label`);
                    return false;
                }
            }
        }
        
        if (activeTab === 'regions') {
            for (let i = 0; i < (settings.regions || []).length; i++) {
                if (!settings.regions[i]?.name?.trim()) {
                    toast.error(`Regions: Region #${i + 1} name cannot be empty`); return false;
                }
                if (!settings.regions[i]?.icon?.trim()) {
                    toast.error(`Regions: Region '${settings.regions[i].name}' must have an icon`); return false;
                }
            }
        }
        
        if (activeTab === 'industries') {
            for (let i = 0; i < (settings.industries || []).length; i++) {
                if (!settings.industries[i]?.trim()) {
                    toast.error(`Industries: Industry #${i + 1} cannot be empty`); return false;
                }
            }
        }
        
        if (activeTab === 'clients') {
            for (let i = 0; i < (settings.clients || []).length; i++) {
                const client = settings.clients[i];
                if (!client.name?.trim()) {
                    toast.error(`Clients List: Client #${i + 1} is missing a name`); return false;
                }
                if (!client.logo?.trim()) {
                    toast.error(`Clients List: Client '${client.name || i+1}' is missing a logo`); return false;
                }
                if (!client.location?.trim()) {
                    toast.error(`Clients List: Client '${client.name || i+1}' is missing a location`); return false;
                }
                if (!client.industry?.trim()) {
                    toast.error(`Clients List: Client '${client.name || i+1}' is missing an industry selection`); return false;
                }
                if (!client.region?.trim()) {
                    toast.error(`Clients List: Client '${client.name || i+1}' is missing a region selection`); return false;
                }
            }
        }
        
        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setLoading(true);
        try {
            const { data } = await API.put('/clientele-page', settings);
            if (data.success) {
                toast.success('Clientele settings saved successfully');
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
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Clientele Settings</h1>
                    <p className="text-slate-500 mt-1">Manage hero section, region/industry filters, and the clients list.</p>
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
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Image size={20} className="text-blue-500" />
                                    Hero Section
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the main banner and the three stat blocks.</p>
                            </div>

                            <div className="space-y-6">
                                <FormInput
                                    label="Hero Title"
                                    placeholder="e.g. Trusted By Industry Leaders"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Desktop Background Image</label>
                                        <ImageInput
                                            value={settings.heroDesktopImage || ''}
                                            onChange={e => handleChange('heroDesktopImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroDesktopImage', url))}
                                            placeholder="No image selected"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Background Image</label>
                                        <ImageInput
                                            value={settings.heroMobileImage || ''}
                                            onChange={e => handleChange('heroMobileImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroMobileImage', url))}
                                            placeholder="No image selected"
                                        />
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mt-8">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Stat Blocks</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {(settings.heroStats || []).map((stat, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 relative shadow-sm">
                                                <button 
                                                    onClick={() => handleRemoveFromArray('heroStats', idx)} 
                                                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors"
                                                    title="Remove Stat"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <div className="space-y-4 pt-6">
                                                    <FormInput
                                                        label={`Stat ${idx + 1} Value`}
                                                        placeholder="e.g. 2500+"
                                                        value={stat.value || ''}
                                                        onChange={e => handleArrayChange('heroStats', idx, 'value', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label={`Stat ${idx + 1} Label`}
                                                        placeholder="e.g. Employees"
                                                        value={stat.label || ''}
                                                        onChange={e => handleArrayChange('heroStats', idx, 'label', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {(!settings.heroStats || settings.heroStats.length === 0) && (
                                        <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white mt-4">
                                            <p className="text-sm">No stats added yet.</p>
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => handleAddToArray('heroStats', { value: '', label: '' })}
                                        className="mt-6 w-full flex justify-center items-center gap-2 px-4 py-3 border-2 border-dashed border-blue-200 bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 hover:border-blue-300 rounded-xl transition-all"
                                    >
                                        <Plus size={18} /> Add New Stat
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* REGIONS FILTER TAB */}
                    {activeTab === 'regions' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Globe size={20} className="text-blue-500" />
                                    Regions Filters
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Edit the names of the 2 primary regions used for filtering clients.</p>
                            </div>

                            <div className="space-y-6">
                                {(settings.regions || []).slice(0, 2).map((region, idx) => (
                                    <div id={`regions-${idx}`} key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Region {idx + 1}</h3>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Region Icon</label>
                                            <ImageInput
                                                value={region.icon || ''}
                                                onChange={e => handleArrayChange('regions', idx, 'icon', e.target.value)}
                                                onChoose={() => openMediaPicker((url) => handleArrayChange('regions', idx, 'icon', url))}
                                                placeholder="No icon selected"
                                            />
                                        </div>
                                        <FormInput
                                            label="Region Name"
                                            placeholder={`e.g. ${idx === 0 ? 'International' : 'Domestic'}`}
                                            value={region.name || ''}
                                            onChange={e => handleArrayChange('regions', idx, 'name', e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* INDUSTRIES FILTER TAB */}
                    {activeTab === 'industries' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Briefcase size={20} className="text-blue-500" />
                                    Industries Filters
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the list of industries used for filtering clients.</p>
                            </div>

                            <div className="space-y-4">
                                {(settings.industries || []).map((industry, idx) => (
                                    <div id={`industries-${idx}`} key={idx} className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <FormInput
                                                placeholder="e.g. Power & Energy"
                                                value={industry}
                                                onChange={e => handleArrayChange('industries', idx, null, e.target.value)}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveFromArray('industries', idx)}
                                            className="text-red-500 hover:bg-red-50 p-2.5 rounded-lg transition-colors border border-transparent hover:border-red-200 mt-1"
                                            title="Remove Industry"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}

                                {(!settings.industries || settings.industries.length === 0) && (
                                    <p className="text-center py-6 text-slate-400">No industries added yet.</p>
                                )}

                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <button 
                                        onClick={() => handleAddToArray('industries', 'New Industry')}
                                        className="text-blue-600 font-medium flex items-center gap-2 px-6 py-2 border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm"
                                    >
                                        <Plus size={20} /> Add Industry
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CLIENTS LIST TAB */}
                    {activeTab === 'clients' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Users size={20} className="text-blue-500" />
                                    Clients List
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the individual client cards and map them to regions/industries.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {(settings.clients || []).map((client, idx) => (
                                    <div id={`clients-${idx}`} key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm relative group">
                                        <button 
                                            onClick={() => handleRemoveFromArray('clients', idx)}
                                            className="absolute top-2 right-2 text-white bg-red-500/80 hover:bg-red-600 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                                            title="Remove Client"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        
                                        <div className="space-y-4 pt-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Client Logo</label>
                                                <ImageInput
                                                    value={client.logo || ''}
                                                    onChange={e => handleArrayChange('clients', idx, 'logo', e.target.value)}
                                                    onChoose={() => openMediaPicker((url) => handleArrayChange('clients', idx, 'logo', url))}
                                                    placeholder="No logo selected"
                                                />
                                            </div>
                                            
                                            <FormInput
                                                label="Client Name"
                                                placeholder="e.g. Saudi Electric Company"
                                                value={client.name || ''}
                                                onChange={e => handleArrayChange('clients', idx, 'name', e.target.value)}
                                            />
                                            
                                            <FormInput
                                                label="Location"
                                                placeholder="e.g. Qatar"
                                                value={client.location || ''}
                                                onChange={e => handleArrayChange('clients', idx, 'location', e.target.value)}
                                            />
                                            
                                            <FormTextarea
                                                label="Description"
                                                placeholder="e.g. A top provider..."
                                                value={client.description || ''}
                                                onChange={e => handleArrayChange('clients', idx, 'description', e.target.value)}
                                            />
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Region</label>
                                                    <select
                                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white text-slate-700 text-sm"
                                                        value={client.region || ''}
                                                        onChange={e => handleArrayChange('clients', idx, 'region', e.target.value)}
                                                    >
                                                        <option value="">Select Region</option>
                                                        {(settings.regions || []).map((reg, i) => (
                                                            <option key={i} value={reg.name}>{reg.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                                                    <select
                                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white text-slate-700 text-sm"
                                                        value={client.industry || ''}
                                                        onChange={e => handleArrayChange('clients', idx, 'industry', e.target.value)}
                                                    >
                                                        <option value="">Select Industry</option>
                                                        {(settings.industries || []).map((ind, i) => (
                                                            <option key={i} value={ind}>{ind}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(!settings.clients || settings.clients.length === 0) && (
                                <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50 mt-4">
                                    <Users size={32} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">No clients added yet.</p>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                <button 
                                    onClick={() => handleAddToArray('clients', { name: '', logo: '', location: '', industry: '', region: '', description: '' })}
                                    className="text-blue-600 font-medium flex items-center gap-2 px-8 py-3 border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm"
                                >
                                    <Plus size={20} /> Add Client
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Media Picker Modal */}
            <MediaPicker
                isOpen={pickerOpen}
                onClose={() => {
                    setPickerOpen(false);
                    setOnSelectCallback(null);
                }}
                onSelect={(url) => {
                    if (onSelectCallback) onSelectCallback(url);
                    setPickerOpen(false);
                    setOnSelectCallback(null);
                }}
            />
        </div>
    );
};

export default ClienteleSettings;
