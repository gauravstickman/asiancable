import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Plus, Trash2, PenTool, FileText, BookOpen, Folder } from 'lucide-react';
import { FormInput, ImageInput, FormTextarea } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const ResourcesSettings = () => {
    const [settings, setSettings] = useState({
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',
        heroMobileImage: '',
        featuredTool: {
            icon: '', title: '', description: '', buttonText: '', buttonLink: '', backgroundImage: ''
        },
        toolsList: [],
        whitepapersTitle: '',
        whitepapersViewAllLink: '',
        whitepapersList: [],
        blogsTitle: '',
        blogsSubtitle: '',
        blogsCategories: [],
        featuredBlogs: [],
        productResourceTitle: '',
        productResource: {
            icon: '', image: '', title: '', description: '', file: '', fileSize: '', downloadText: '', requestText: ''
        }
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'tools', label: 'Tools & Resources', icon: PenTool },
        { id: 'product_resources', label: 'Product Resources', icon: Folder },
        { id: 'whitepapers', label: 'Whitepapers', icon: FileText },
        { id: 'blogs', label: 'Blogs & Insights', icon: BookOpen }
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/resources-page');
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

    const handleFeaturedChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            featuredTool: {
                ...(prev.featuredTool || {}),
                [field]: value
            }
        }));
    };

    const handleProductResourceChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            productResource: {
                ...(prev.productResource || {}),
                [field]: value
            }
        }));
    };

    const handleArrayChange = (field, index, subField, value) => {
        setSettings(prev => {
            const newArray = [...(prev[field] || [])];
            newArray[index] = { ...newArray[index], [subField]: value };
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
            [field]: (prev[field] || []).filter((_, i) => i !== index)
        }));
    };

    const validateSettings = () => {
        if (activeTab === 'hero') {
            if (!settings.heroTitle?.trim()) {
                toast.error('Hero Title is required');
                return false;
            }
            if (!settings.heroImage?.trim()) {
                toast.error('Hero Background Image is required');
                return false;
            }
            if (!settings.heroMobileImage?.trim()) {
                toast.error('Hero Mobile Image is required');
                return false;
            }
        }

        if (activeTab === 'tools') {
            const featured = settings.featuredTool;
            if (featured && (!featured.title?.trim() || !featured.description?.trim())) {
                toast.error('Featured Tool must have a title and description');
                return false;
            }

            for (let i = 0; i < (settings.toolsList || []).length; i++) {
                const tool = settings.toolsList[i];
                if (!tool.title?.trim() || !tool.description?.trim()) {
                    toast.error(`Tool #${i + 1} must have a title and description`);
                    return false;
                }
            }
        }

        if (activeTab === 'whitepapers') {
            for (let i = 0; i < (settings.whitepapersList || []).length; i++) {
                const wp = settings.whitepapersList[i];
                if (!wp.title?.trim() || !wp.description?.trim()) {
                    toast.error(`Whitepaper #${i + 1} must have a title and description`);
                    return false;
                }
            }
        }

        if (activeTab === 'blogs') {
            for (let i = 0; i < (settings.featuredBlogs || []).length; i++) {
                const blog = settings.featuredBlogs[i];
                if (!blog.title?.trim() || !blog.description?.trim()) {
                    toast.error(`Blog #${i + 1} must have a title and description`);
                    return false;
                }
            }
        }

        if (activeTab === 'product_resources') {
            if (!settings.productResourceTitle?.trim()) {
                toast.error('Main Section Title is required');
                return false;
            }
            if (!settings.productResource?.title?.trim() || !settings.productResource?.description?.trim()) {
                toast.error('Product Resource must have a title and description');
                return false;
            }
            if (!settings.productResource?.file?.trim()) {
                toast.error('Product Resource must have a Download File URL');
                return false;
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setSaving(true);
        try {
            const { data } = await API.put('/resources-page', settings);
            if (data.success) {
                toast.success('Resources settings saved successfully!');
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
                    <h1 className="text-3xl font-bold text-slate-800">Resources Settings</h1>
                    <p className="text-slate-500 mt-1">Manage the content and layout of the Resources page</p>
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
                                <p className="text-sm text-slate-500 mt-1">Configure the main banner of the resources page.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Main Title"
                                    placeholder="e.g. Resources"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Subtitle / Description"
                                    rows={2}
                                    placeholder="e.g. Access our resource library to arrive at an informed decision."
                                    value={settings.heroSubtitle || ''}
                                    onChange={e => handleChange('heroSubtitle', e.target.value)}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <ImageInput
                                            label="Background Image (Desktop)"
                                            value={settings.heroImage || ''}
                                            onChange={e => handleChange('heroImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroImage', url))}
                                        />
                                    </div>

                                    <div>
                                        <ImageInput
                                            label="Background Image (Mobile)"
                                            value={settings.heroMobileImage || ''}
                                            onChange={e => handleChange('heroMobileImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroMobileImage', url))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PRODUCT RESOURCES SECTION */}
                    {activeTab === 'product_resources' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Folder size={20} className="text-blue-500" />
                                    Product Resources
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the product catalogue, datasheet, and associated files.</p>
                            </div>

                            <div className="mb-6">
                                <FormInput
                                    label="Main Section Title"
                                    placeholder="e.g. Product Resources"
                                    value={settings.productResourceTitle || ''}
                                    onChange={e => handleChange('productResourceTitle', e.target.value)}
                                />
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <ImageInput
                                        label="Icon"
                                        value={settings.productResource?.icon || ''}
                                        onChange={e => handleProductResourceChange('icon', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleProductResourceChange('icon', url))}
                                    />
                                    <ImageInput
                                        label="Background Image"
                                        value={settings.productResource?.image || ''}
                                        onChange={e => handleProductResourceChange('image', e.target.value)}
                                        onChoose={() => openMediaPicker((url) => handleProductResourceChange('image', url))}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <FormInput
                                        label="Title"
                                        placeholder="e.g. Product Catalogue"
                                        value={settings.productResource?.title || ''}
                                        onChange={e => handleProductResourceChange('title', e.target.value)}
                                    />
                                    <FormInput
                                        label="File Size / Info"
                                        placeholder="e.g. PDF • 2.4 MB"
                                        value={settings.productResource?.fileSize || ''}
                                        onChange={e => handleProductResourceChange('fileSize', e.target.value)}
                                    />
                                </div>

                                <div className="mb-5">
                                    <FormTextarea
                                        label="Description"
                                        rows={2}
                                        value={settings.productResource?.description || ''}
                                        onChange={e => handleProductResourceChange('description', e.target.value)}
                                    />
                                </div>

                                <div className="mb-5">
                                    <FormInput
                                        label="Download File URL"
                                        placeholder="Link to file"
                                        value={settings.productResource?.file || ''}
                                        onChange={e => handleProductResourceChange('file', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <FormInput
                                        label="Request Datasheet Link"
                                        placeholder="Link for Request Datasheet"
                                        value={settings.productResource?.requestText || ''}
                                        onChange={e => handleProductResourceChange('requestText', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TOOLS SECTION */}
                    {activeTab === 'tools' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <PenTool size={20} className="text-blue-500" />
                                    Tools & Resources List
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the featured tool (Blue Card) and the other resources.</p>
                            </div>

                            {/* FEATURED TOOL (BLUE CARD) */}
                            <div className="mb-12">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Featured Tool (Blue Card)</p>
                                </div>
                                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-200 relative group flex flex-col">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <ImageInput
                                                label="Icon / Logo"
                                                value={settings.featuredTool?.icon || ''}
                                                onChange={e => handleFeaturedChange('icon', e.target.value)}
                                                onChoose={() => openMediaPicker((url) => handleFeaturedChange('icon', url))}
                                            />
                                        </div>
                                        
                                        <div>
                                            <FormInput
                                                label="Title"
                                                placeholder="e.g. Cable Selection Tool"
                                                value={settings.featuredTool?.title || ''}
                                                onChange={e => handleFeaturedChange('title', e.target.value)}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <FormTextarea
                                                label="Description"
                                                rows={2}
                                                placeholder="e.g. Identify the right cable..."
                                                value={settings.featuredTool?.description || ''}
                                                onChange={e => handleFeaturedChange('description', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="Link"
                                            placeholder="e.g. /calculator"
                                            value={settings.featuredTool?.buttonLink || ''}
                                            onChange={e => handleFeaturedChange('buttonLink', e.target.value)}
                                        />
                                        <div>
                                            <ImageInput
                                                label="Background Image"
                                                value={settings.featuredTool?.backgroundImage || ''}
                                                onChange={e => handleFeaturedChange('backgroundImage', e.target.value)}
                                                onChoose={() => openMediaPicker((url) => handleFeaturedChange('backgroundImage', url))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* OTHER TOOLS LIST */}
                            <div>
                                <div className="flex justify-between items-center mb-4 pt-6 border-t border-slate-200">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Other Tools List</p>
                                    <button onClick={() => handleAddToArray('toolsList', { icon: '', title: '', description: '' })} className="text-slate-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-lg hover:bg-slate-100">
                                        <Plus size={16} /> Add Tool
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {(settings.toolsList || []).map((tool, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group flex flex-col">
                                            <button onClick={() => handleRemoveFromArray('toolsList', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            <div className="flex items-center gap-4 mb-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tool #{idx + 1}</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <ImageInput
                                                        label="Icon / Logo"
                                                        value={tool.icon || ''}
                                                        onChange={e => handleArrayChange('toolsList', idx, 'icon', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('toolsList', idx, 'icon', url))}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <FormInput
                                                        label="Title"
                                                        placeholder="e.g. Pricing Calculator"
                                                        value={tool.title || ''}
                                                        onChange={e => handleArrayChange('toolsList', idx, 'title', e.target.value)}
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <FormTextarea
                                                        label="Description"
                                                        rows={2}
                                                        placeholder="e.g. Generate indicative pricing..."
                                                        value={tool.description || ''}
                                                        onChange={e => handleArrayChange('toolsList', idx, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.toolsList || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No other tools added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* WHITEPAPERS SECTION */}
                    {activeTab === 'whitepapers' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <FileText size={20} className="text-blue-500" />
                                    Whitepapers & Research
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the whitepapers and research articles.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    label="Section Title"
                                    placeholder="e.g. Whitepapers & Research"
                                    value={settings.whitepapersTitle || ''}
                                    onChange={e => handleChange('whitepapersTitle', e.target.value)}
                                />
                                <FormInput
                                    label="View All Button Link"
                                    placeholder="e.g. /whitepapers"
                                    value={settings.whitepapersViewAllLink || ''}
                                    onChange={e => handleChange('whitepapersViewAllLink', e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4 pt-4 border-t border-slate-200">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Whitepapers List</p>
                                    <button onClick={() => handleAddToArray('whitepapersList', { icon: '', title: '', author: '', date: '', description: '', downloadLink: '', downloadText: 'Download' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100">
                                        <Plus size={16} /> Add Whitepaper
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {(settings.whitepapersList || []).map((wp, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group flex flex-col">
                                            <button onClick={() => handleRemoveFromArray('whitepapersList', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            <div className="flex items-center gap-4 mb-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Whitepaper #{idx + 1}</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <ImageInput
                                                        label="Icon"
                                                        value={wp.icon || ''}
                                                        onChange={e => handleArrayChange('whitepapersList', idx, 'icon', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('whitepapersList', idx, 'icon', url))}
                                                    />
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <FormInput
                                                        label="Title"
                                                        placeholder="e.g. Future of Cable Technology..."
                                                        value={wp.title || ''}
                                                        onChange={e => handleArrayChange('whitepapersList', idx, 'title', e.target.value)}
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormInput
                                                            label="Author / Subtitle"
                                                            placeholder="e.g. Dr. Rajesh Kumar"
                                                            value={wp.author || ''}
                                                            onChange={e => handleArrayChange('whitepapersList', idx, 'author', e.target.value)}
                                                        />
                                                        <FormInput
                                                            label="Date"
                                                            placeholder="e.g. March 2024"
                                                            value={wp.date || ''}
                                                            onChange={e => handleArrayChange('whitepapersList', idx, 'date', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <FormTextarea
                                                        label="Description"
                                                        rows={2}
                                                        placeholder="e.g. Comprehensive analysis of..."
                                                        value={wp.description || ''}
                                                        onChange={e => handleArrayChange('whitepapersList', idx, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormInput
                                                    label="Download Text"
                                                    placeholder="e.g. Download"
                                                    value={wp.downloadText || ''}
                                                    onChange={e => handleArrayChange('whitepapersList', idx, 'downloadText', e.target.value)}
                                                />
                                                <FormInput
                                                    label="Download / File Link"
                                                    placeholder="e.g. /files/whitepaper.pdf"
                                                    value={wp.downloadLink || ''}
                                                    onChange={e => handleArrayChange('whitepapersList', idx, 'downloadLink', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.whitepapersList || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No whitepapers added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* BLOGS & INSIGHTS SECTION */}
                    {activeTab === 'blogs' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <BookOpen size={20} className="text-blue-500" />
                                    Technical Blogs & Insights
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the blog section content and featured articles.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="Section Title"
                                        placeholder="e.g. Technical Blogs & Insights"
                                        value={settings.blogsTitle || ''}
                                        onChange={e => handleChange('blogsTitle', e.target.value)}
                                    />
                                    <FormInput
                                        label="Section Subtitle"
                                        placeholder="e.g. Industry trends..."
                                        value={settings.blogsSubtitle || ''}
                                        onChange={e => handleChange('blogsSubtitle', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="Categories / Filter Tags (Comma Separated)"
                                        placeholder="e.g. All Articles, Renewable Energy, Technical Guide"
                                        value={(settings.blogsCategories || []).join(', ')}
                                        onChange={e => handleChange('blogsCategories', e.target.value.split(',').map(s=>s.trim()))}
                                    />
                                    <FormInput
                                        label="Featured Section Title"
                                        placeholder="e.g. Featured Articles"
                                        value={settings.blogsFeaturedTitle || ''}
                                        onChange={e => handleChange('blogsFeaturedTitle', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4 pt-4 border-t border-slate-200">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Featured Articles List</p>
                                    <button onClick={() => handleAddToArray('featuredBlogs', { isFeatured: false, image: '', category: '', readTime: '', title: '', description: '', author: '', date: '', link: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100">
                                        <Plus size={16} /> Add Article
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {(settings.featuredBlogs || []).map((blog, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group flex flex-col">
                                            <button onClick={() => handleRemoveFromArray('featuredBlogs', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg z-10 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            <div className="flex items-center gap-4 mb-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Article #{idx + 1}</p>
                                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={blog.isFeatured || false}
                                                        onChange={e => handleArrayChange('featuredBlogs', idx, 'isFeatured', e.target.checked)}
                                                        className="rounded text-blue-600 w-4 h-4"
                                                    />
                                                    Show "Featured" Badge
                                                </label>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <ImageInput
                                                        label="Article Image"
                                                        value={blog.image || ''}
                                                        onChange={e => handleArrayChange('featuredBlogs', idx, 'image', e.target.value)}
                                                        onChoose={() => openMediaPicker((url) => handleArrayChange('featuredBlogs', idx, 'image', url))}
                                                    />
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormInput
                                                            label="Category"
                                                            placeholder="e.g. Renewable Energy"
                                                            value={blog.category || ''}
                                                            onChange={e => handleArrayChange('featuredBlogs', idx, 'category', e.target.value)}
                                                        />
                                                        <FormInput
                                                            label="Read Time"
                                                            placeholder="e.g. 8 min read"
                                                            value={blog.readTime || ''}
                                                            onChange={e => handleArrayChange('featuredBlogs', idx, 'readTime', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <FormInput
                                                        label="Title"
                                                        placeholder="e.g. The Future of..."
                                                        value={blog.title || ''}
                                                        onChange={e => handleArrayChange('featuredBlogs', idx, 'title', e.target.value)}
                                                    />
                                                    
                                                    <FormTextarea
                                                        label="Description"
                                                        rows={2}
                                                        placeholder="e.g. Exploring the latest innovations..."
                                                        value={blog.description || ''}
                                                        onChange={e => handleArrayChange('featuredBlogs', idx, 'description', e.target.value)}
                                                    />
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormInput
                                                            label="Author"
                                                            placeholder="e.g. Dr. Rajesh Kumar"
                                                            value={blog.author || ''}
                                                            onChange={e => handleArrayChange('featuredBlogs', idx, 'author', e.target.value)}
                                                        />
                                                        <FormInput
                                                            label="Date"
                                                            placeholder="e.g. March 1, 2024"
                                                            value={blog.date || ''}
                                                            onChange={e => handleArrayChange('featuredBlogs', idx, 'date', e.target.value)}
                                                        />
                                                    </div>
                                                    
                                                    <FormInput
                                                        label="Article Link"
                                                        placeholder="e.g. /blog/post-url"
                                                        value={blog.link || ''}
                                                        onChange={e => handleArrayChange('featuredBlogs', idx, 'link', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(settings.featuredBlogs || []).length === 0 && (
                                    <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-sm">No articles added yet.</p>
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

export default ResourcesSettings;
