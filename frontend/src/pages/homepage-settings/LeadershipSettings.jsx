import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Users, Plus, Trash2, Link as LinkIcon, FileText } from 'lucide-react';
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
        { id: 'spotlight', label: 'Leadership Spotlight', icon: Users },
        { id: 'board', label: 'Board of Directors', icon: Users },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/leadership-page');
            if (data.success) {
                // Merge default arrays if they don't exist
                const fetchedData = data.data || {};
                setSettings({
                    ...fetchedData,
                    spotlightLeaders: fetchedData.spotlightLeaders || [],
                    boardMembers: fetchedData.boardMembers || []
                });
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
            if (!settings.heroDescription?.trim()) {
                toast.error('Hero Section: Description is required'); return false;
            }
            if (!settings.heroFeaturedImage?.trim()) {
                toast.error('Hero Section: Featured Image/Video is required'); return false;
            }
            if (!settings.heroFeaturedName?.trim()) {
                toast.error('Hero Section: Featured Leader Name is required'); return false;
            }
            if (!settings.heroFeaturedRole?.trim()) {
                toast.error('Hero Section: Featured Leader Role is required'); return false;
            }
        }
        
        if (activeTab === 'spotlight') {
            if (!settings.spotlightTitle?.trim()) {
                toast.error('Spotlight Section: Title is required'); return false;
            }
            if (!settings.spotlightSubtitle?.trim()) {
                toast.error('Spotlight Section: Subtitle is required'); return false;
            }
            for (let i = 0; i < (settings.spotlightLeaders || []).length; i++) {
                const leader = settings.spotlightLeaders[i];
                if (!leader.name?.trim()) {
                    toast.error(`Spotlight Section: Leader #${i + 1} is missing a name`); return false;
                }
                if (!leader.role?.trim()) {
                    toast.error(`Spotlight Section: Leader '${leader.name || i+1}' is missing a role`); return false;
                }
                if (!leader.image?.trim()) {
                    toast.error(`Spotlight Section: Leader '${leader.name || i+1}' is missing an image`); return false;
                }
            }
        }
        
        if (activeTab === 'board') {
            if (!settings.boardTitle?.trim()) {
                toast.error('Board Section: Title is required'); return false;
            }
            if (!settings.boardSubtitle?.trim()) {
                toast.error('Board Section: Subtitle is required'); return false;
            }
            for (let i = 0; i < (settings.boardMembers || []).length; i++) {
                const member = settings.boardMembers[i];
                if (!member.name?.trim()) {
                    toast.error(`Board Section: Member #${i + 1} is missing a name`); return false;
                }
                if (!member.role?.trim()) {
                    toast.error(`Board Section: Member '${member.name || i+1}' is missing a role`); return false;
                }
                if (!member.image?.trim()) {
                    toast.error(`Board Section: Member '${member.name || i+1}' is missing an image`); return false;
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

    if (!settings) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Leadership Settings</h1>
                    <p className="text-slate-500 mt-1">Manage content and leaders for the Leadership page</p>
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
                                <p className="text-sm text-slate-500 mt-1">Configure the main leadership hero area and featured leader.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Hero Title"
                                    placeholder="e.g. Leadership That Drives Performance"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Hero Description"
                                    rows={3}
                                    placeholder="e.g. A team of experienced industry leaders..."
                                    value={settings.heroDescription || ''}
                                    onChange={e => handleChange('heroDescription', e.target.value)}
                                />
                            </div>

                            {/* Featured Leader Overlay */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Featured Leader (Hero Image Overlay)</h3>
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <ImageInput
                                            label="Featured Image / Video Thumbnail"
                                            value={settings.heroFeaturedImage || ''}
                                            onChange={e => handleChange('heroFeaturedImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroFeaturedImage', url))}
                                        />
                                        {settings.heroFeaturedImage && (
                                            <div className="mt-3">
                                                <img
                                                    src={settings.heroFeaturedImage.startsWith('http') ? settings.heroFeaturedImage : `${import.meta.env.VITE_API_URL}${settings.heroFeaturedImage}`}
                                                    alt="Featured Preview"
                                                    className="w-full h-48 rounded-xl border border-slate-200 object-cover bg-slate-100"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x400?text=No+Image'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <FormInput
                                        label="Featured Leader Name"
                                        placeholder="e.g. Cameron Williamson"
                                        value={settings.heroFeaturedName || ''}
                                        onChange={e => handleChange('heroFeaturedName', e.target.value)}
                                    />
                                    <FormInput
                                        label="Featured Leader Role"
                                        placeholder="e.g. MD & CEO"
                                        value={settings.heroFeaturedRole || ''}
                                        onChange={e => handleChange('heroFeaturedRole', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SPOTLIGHT SECTION */}
                    {activeTab === 'spotlight' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Users size={20} className="text-blue-500" />
                                    Leadership Spotlight
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the grid of leaders displayed below the hero section.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    label="Spotlight Title"
                                    placeholder="e.g. Leadership Spotlight"
                                    value={settings.spotlightTitle || ''}
                                    onChange={e => handleChange('spotlightTitle', e.target.value)}
                                />
                                <FormInput
                                    label="Spotlight Subtitle"
                                    placeholder="e.g. Click on a leader to explore..."
                                    value={settings.spotlightSubtitle || ''}
                                    onChange={e => handleChange('spotlightSubtitle', e.target.value)}
                                />
                            </div>

                            {/* Leaders Grid */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Leader Cards</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.spotlightLeaders || []).map((leader, idx) => (
                                        <div id={`spotlightLeaders-${idx}`} key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">
                                            <button 
                                                onClick={() => handleRemoveFromArray('spotlightLeaders', idx)}
                                                className="absolute top-2 right-2 text-white bg-red-500/80 hover:bg-red-600 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm"
                                                title="Remove Leader"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            {leader.image && (
                                                <img
                                                    src={leader.image.startsWith('http') ? leader.image : `${import.meta.env.VITE_API_URL}${leader.image}`}
                                                    alt={leader.name || 'Leader'}
                                                    className="w-full h-48 object-cover bg-slate-100 border-b border-slate-100"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x500?text=No+Image'; }}
                                                />
                                            )}
                                            
                                            <div className="p-5 space-y-4 flex-1">
                                                <ImageInput
                                                    label="Leader Image"
                                                    value={leader.image || ''}
                                                    onChange={e => handleArrayChange('spotlightLeaders', idx, 'image', e.target.value)}
                                                    onChoose={() => openMediaPicker((url) => handleArrayChange('spotlightLeaders', idx, 'image', url))}
                                                />
                                                <FormInput
                                                    label="Name"
                                                    placeholder="e.g. Cameron Williamson"
                                                    value={leader.name || ''}
                                                    onChange={e => handleArrayChange('spotlightLeaders', idx, 'name', e.target.value)}
                                                />
                                                <FormInput
                                                    label="Role / Position"
                                                    placeholder="e.g. CEO"
                                                    value={leader.role || ''}
                                                    onChange={e => handleArrayChange('spotlightLeaders', idx, 'role', e.target.value)}
                                                />
                                                <FormInput
                                                    label="LinkedIn URL (Optional)"
                                                    placeholder="e.g. https://linkedin.com/in/..."
                                                    value={leader.linkedinUrl || ''}
                                                    onChange={e => handleArrayChange('spotlightLeaders', idx, 'linkedinUrl', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {(!settings.spotlightLeaders || settings.spotlightLeaders.length === 0) && (
                                    <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50 mt-4">
                                        <Users size={32} className="mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">No leaders added to spotlight yet.</p>
                                    </div>
                                )}
                                
                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                    <button 
                                        onClick={() => handleAddToArray('spotlightLeaders', { image: '', name: '', role: '', linkedinUrl: '' })}
                                        className="text-blue-600 font-medium flex items-center gap-2 px-8 py-3 border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm"
                                    >
                                        <Plus size={20} /> Add Leader to Spotlight
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BOARD OF DIRECTORS SECTION */}
                    {activeTab === 'board' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Users size={20} className="text-blue-500" />
                                    Board of Directors
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the grid of board members displayed in the Board of Directors section.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    label="Board Title"
                                    placeholder="e.g. Board of Directors"
                                    value={settings.boardTitle || ''}
                                    onChange={e => handleChange('boardTitle', e.target.value)}
                                />
                                <FormInput
                                    label="Board Subtitle"
                                    placeholder="e.g. Meet our board members..."
                                    value={settings.boardSubtitle || ''}
                                    onChange={e => handleChange('boardSubtitle', e.target.value)}
                                />
                            </div>

                            {/* Board Members Grid */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Board Member Cards</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.boardMembers || []).map((member, idx) => (
                                        <div id={`boardMembers-${idx}`} key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">
                                            <button 
                                                onClick={() => handleRemoveFromArray('boardMembers', idx)}
                                                className="absolute top-2 right-2 text-white bg-red-500/80 hover:bg-red-600 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm"
                                                title="Remove Member"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            {member.image && (
                                                <img
                                                    src={member.image.startsWith('http') ? member.image : `${import.meta.env.VITE_API_URL}${member.image}`}
                                                    alt={member.name || 'Member'}
                                                    className="w-full h-48 object-cover bg-slate-100 border-b border-slate-100"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x500?text=No+Image'; }}
                                                />
                                            )}
                                            
                                            <div className="p-5 space-y-4 flex-1">
                                                <ImageInput
                                                    label="Member Image"
                                                    value={member.image || ''}
                                                    onChange={e => handleArrayChange('boardMembers', idx, 'image', e.target.value)}
                                                    onChoose={() => openMediaPicker((url) => handleArrayChange('boardMembers', idx, 'image', url))}
                                                />
                                                <FormInput
                                                    label="Name"
                                                    placeholder="e.g. Jane Doe"
                                                    value={member.name || ''}
                                                    onChange={e => handleArrayChange('boardMembers', idx, 'name', e.target.value)}
                                                />
                                                <FormInput
                                                    label="Role / Position"
                                                    placeholder="e.g. Board Member"
                                                    value={member.role || ''}
                                                    onChange={e => handleArrayChange('boardMembers', idx, 'role', e.target.value)}
                                                />
                                                <FormInput
                                                    label="LinkedIn URL (Optional)"
                                                    placeholder="e.g. https://linkedin.com/in/..."
                                                    value={member.linkedinUrl || ''}
                                                    onChange={e => handleArrayChange('boardMembers', idx, 'linkedinUrl', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {(!settings.boardMembers || settings.boardMembers.length === 0) && (
                                    <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50 mt-4">
                                        <Users size={32} className="mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">No board members added yet.</p>
                                    </div>
                                )}
                                
                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                    <button 
                                        onClick={() => handleAddToArray('boardMembers', { image: '', name: '', role: '', linkedinUrl: '' })}
                                        className="text-blue-600 font-medium flex items-center gap-2 px-8 py-3 border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm"
                                    >
                                        <Plus size={20} /> Add Board Member
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

export default LeadershipSettings;
