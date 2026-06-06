import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, FileText, Plus, Trash2, Users, Briefcase, Clock } from 'lucide-react';
import { FormInput, ImageInput, FormTextarea } from '../../components/admin/FormComponents';
import MediaPicker from '../../components/common/MediaPicker';

const InvestorSettings = () => {
    const [settings, setSettings] = useState({
        heroTitle: '',
        heroDescription: '',
        heroDesktopImage: '',
        heroMobileImage: '',
        tabs: [], // This refers to the data tabs like "Financial Highlights"
        corporateGovernanceTitle: 'Corporate Governance',
        corporateGovernance: [],
        shareholderInfoTitle: 'Shareholder Information',
        shareholderCards: [],
        shareholderDocuments: [],
        recentDisclosuresTitle: 'Recent Disclosures',
        recentDisclosures: []
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('hero'); // Sidebar tabs
    const [activeReportTabIdx, setActiveReportTabIdx] = useState(0); // Sub-tabs within Reports UI
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const sidebarTabs = [
        { id: 'hero', label: 'Hero Section', icon: Image },
        { id: 'reports', label: 'Reports & Documents', icon: FileText },
        { id: 'governance', label: 'Corporate Governance', icon: Users },
        { id: 'shareholder', label: 'Shareholder Info', icon: Briefcase },
        { id: 'disclosures', label: 'Recent Disclosures', icon: Clock },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/investor-page');
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

    // Array Handlers for Report Tabs
    const handleAddReportTab = () => {
        setSettings(prev => ({
            ...prev,
            tabs: [...(prev.tabs || []), { tabName: 'New Tab', categories: [] }]
        }));
        setActiveReportTabIdx((settings.tabs || []).length);
    };

    const handleRemoveReportTab = (tabIndex) => {
        if (!window.confirm("Are you sure you want to remove this tab and all its categories?")) return;
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            newTabs.splice(tabIndex, 1);
            return { ...prev, tabs: newTabs };
        });
        setActiveReportTabIdx(0);
    };

    const handleReportTabChange = (tabIndex, value) => {
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            newTabs[tabIndex].tabName = value;
            return { ...prev, tabs: newTabs };
        });
    };

    // Array Handlers for Categories
    const handleAddCategory = (tabIndex) => {
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            const newCatIndex = (newTabs[tabIndex].categories || []).length;
            
            setTimeout(() => {
                const el = document.getElementById(`category-${newCatIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            newTabs[tabIndex].categories = [...(newTabs[tabIndex].categories || []), { categoryName: 'New Category', documents: [] }];
            return { ...prev, tabs: newTabs };
        });
    };

    const handleRemoveCategory = (tabIndex, catIndex) => {
        if (!window.confirm("Are you sure you want to remove this category and all its documents?")) return;
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            newTabs[tabIndex].categories.splice(catIndex, 1);
            return { ...prev, tabs: newTabs };
        });
    };

    const handleCategoryChange = (tabIndex, catIndex, value) => {
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            newTabs[tabIndex].categories[catIndex].categoryName = value;
            return { ...prev, tabs: newTabs };
        });
    };

    // Array Handlers for Documents
    const handleAddDocument = (tabIndex, catIndex) => {
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            const newDocIndex = (newTabs[tabIndex].categories[catIndex].documents || []).length;

            setTimeout(() => {
                const el = document.getElementById(`document-${catIndex}-${newDocIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            newTabs[tabIndex].categories[catIndex].documents = [
                ...(newTabs[tabIndex].categories[catIndex].documents || []),
                { icon: '', title: '', fileUrl: '' }
            ];
            return { ...prev, tabs: newTabs };
        });
    };

    const handleRemoveDocument = (tabIndex, catIndex, docIndex) => {
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            newTabs[tabIndex].categories[catIndex].documents.splice(docIndex, 1);
            return { ...prev, tabs: newTabs };
        });
    };

    const handleDocumentChange = (tabIndex, catIndex, docIndex, field, value) => {
        setSettings(prev => {
            const newTabs = [...prev.tabs];
            newTabs[tabIndex].categories[catIndex].documents[docIndex][field] = value;
            return { ...prev, tabs: newTabs };
        });
    };

    // Array Handlers for Corporate Governance
    const handleAddGovCard = () => {
        setSettings(prev => {
            const newIndex = (prev.corporateGovernance || []).length;
            setTimeout(() => {
                const el = document.getElementById(`gov-card-${newIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return {
                ...prev,
                corporateGovernance: [...(prev.corporateGovernance || []), { icon: '', title: 'New Card', items: [] }]
            };
        });
    };

    const handleRemoveGovCard = (cardIndex) => {
        if (!window.confirm("Are you sure you want to remove this card?")) return;
        setSettings(prev => {
            const newGov = [...(prev.corporateGovernance || [])];
            newGov.splice(cardIndex, 1);
            return { ...prev, corporateGovernance: newGov };
        });
    };

    const handleGovCardFieldChange = (cardIndex, field, value) => {
        setSettings(prev => {
            const newGov = [...(prev.corporateGovernance || [])];
            newGov[cardIndex][field] = value;
            return { ...prev, corporateGovernance: newGov };
        });
    };

    const handleAddGovItem = (cardIndex) => {
        setSettings(prev => {
            const newGov = [...(prev.corporateGovernance || [])];
            newGov[cardIndex].items = [...(newGov[cardIndex].items || []), ''];
            return { ...prev, corporateGovernance: newGov };
        });
    };

    const handleRemoveGovItem = (cardIndex, itemIndex) => {
        setSettings(prev => {
            const newGov = [...(prev.corporateGovernance || [])];
            newGov[cardIndex].items.splice(itemIndex, 1);
            return { ...prev, corporateGovernance: newGov };
        });
    };

    const handleGovItemChange = (cardIndex, itemIndex, value) => {
        setSettings(prev => {
            const newGov = [...(prev.corporateGovernance || [])];
            newGov[cardIndex].items[itemIndex] = value;
            return { ...prev, corporateGovernance: newGov };
        });
    };

    // Array Handlers for Shareholder Info
    const handleAddShareCard = () => {
        setSettings(prev => {
            const newIndex = (prev.shareholderCards || []).length;
            setTimeout(() => {
                const el = document.getElementById(`share-card-${newIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return {
                ...prev,
                shareholderCards: [...(prev.shareholderCards || []), { title: 'New Card', items: [] }]
            };
        });
    };

    const handleRemoveShareCard = (cardIndex) => {
        if (!window.confirm("Are you sure you want to remove this card?")) return;
        setSettings(prev => {
            const newCards = [...(prev.shareholderCards || [])];
            newCards.splice(cardIndex, 1);
            return { ...prev, shareholderCards: newCards };
        });
    };

    const handleShareCardFieldChange = (cardIndex, field, value) => {
        setSettings(prev => {
            const newCards = [...(prev.shareholderCards || [])];
            newCards[cardIndex][field] = value;
            return { ...prev, shareholderCards: newCards };
        });
    };

    const handleAddShareItem = (cardIndex) => {
        setSettings(prev => {
            const newCards = [...(prev.shareholderCards || [])];
            newCards[cardIndex].items = [...(newCards[cardIndex].items || []), { label: '', value: '' }];
            return { ...prev, shareholderCards: newCards };
        });
    };

    const handleRemoveShareItem = (cardIndex, itemIndex) => {
        setSettings(prev => {
            const newCards = [...(prev.shareholderCards || [])];
            newCards[cardIndex].items.splice(itemIndex, 1);
            return { ...prev, shareholderCards: newCards };
        });
    };

    const handleShareItemChange = (cardIndex, itemIndex, field, value) => {
        setSettings(prev => {
            const newCards = [...(prev.shareholderCards || [])];
            newCards[cardIndex].items[itemIndex][field] = value;
            return { ...prev, shareholderCards: newCards };
        });
    };

    // Array Handlers for Shareholder Documents
    const handleAddShareDoc = () => {
        setSettings(prev => {
            const newIndex = (prev.shareholderDocuments || []).length;
            setTimeout(() => {
                const el = document.getElementById(`share-doc-${newIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return {
                ...prev,
                shareholderDocuments: [...(prev.shareholderDocuments || []), { title: '', fileUrl: '', icon: '' }]
            };
        });
    };

    const handleRemoveShareDoc = (docIndex) => {
        if (!window.confirm("Are you sure you want to remove this document?")) return;
        setSettings(prev => {
            const newDocs = [...(prev.shareholderDocuments || [])];
            newDocs.splice(docIndex, 1);
            return { ...prev, shareholderDocuments: newDocs };
        });
    };

    const handleShareDocFieldChange = (docIndex, field, value) => {
        setSettings(prev => {
            const newDocs = [...(prev.shareholderDocuments || [])];
            newDocs[docIndex][field] = value;
            return { ...prev, shareholderDocuments: newDocs };
        });
    };

    // Array Handlers for Recent Disclosures
    const handleAddDisclosure = () => {
        setSettings(prev => {
            const newIndex = (prev.recentDisclosures || []).length;
            setTimeout(() => {
                const el = document.getElementById(`disclosure-${newIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return {
                ...prev,
                recentDisclosures: [...(prev.recentDisclosures || []), { date: '', category: '', title: '', fileUrl: '' }]
            };
        });
    };

    const handleRemoveDisclosure = (index) => {
        if (!window.confirm("Are you sure you want to remove this disclosure?")) return;
        setSettings(prev => {
            const newItems = [...(prev.recentDisclosures || [])];
            newItems.splice(index, 1);
            return { ...prev, recentDisclosures: newItems };
        });
    };

    const handleDisclosureFieldChange = (index, field, value) => {
        setSettings(prev => {
            const newItems = [...(prev.recentDisclosures || [])];
            newItems[index][field] = value;
            return { ...prev, recentDisclosures: newItems };
        });
    };

    const validateSettings = () => {
        // Hero Section
        if (activeTab === 'hero') {
            if (!settings.heroTitle?.trim()) {
                toast.error('Hero Section: Title is required'); return false;
            }
            if (!settings.heroDescription?.trim()) {
                toast.error('Hero Section: Description is required'); return false;
            }
            if (!settings.heroDesktopImage?.trim()) {
                toast.error('Hero Section: Desktop Image is required'); return false;
            }
            if (!settings.heroMobileImage?.trim()) {
                toast.error('Hero Section: Mobile Image is required'); return false;
            }
        }

        // Reports & Documents
        if (activeTab === 'reports') {
            for (let i = 0; i < (settings.tabs || []).length; i++) {
                const tab = settings.tabs[i];
                if (!tab.tabName?.trim()) {
                    setActiveReportTabIdx(i);
                    toast.error(`Reports & Documents: Report Tab #${i + 1} is missing a name`);
                    return false;
                }
                for (let j = 0; j < (tab.categories || []).length; j++) {
                    const cat = tab.categories[j];
                    if (!cat.categoryName?.trim()) {
                        setActiveReportTabIdx(i);
                        toast.error(`Reports & Documents: Category #${j + 1} in '${tab.tabName}' is missing a name`);
                        return false;
                    }
                    for (let k = 0; k < (cat.documents || []).length; k++) {
                        const doc = cat.documents[k];
                        if (!doc.title?.trim()) {
                            setActiveReportTabIdx(i);
                            toast.error(`Reports & Documents: Document #${k + 1} in '${cat.categoryName}' is missing a title`);
                            return false;
                        }
                        if (!doc.icon?.trim()) {
                            setActiveReportTabIdx(i);
                            toast.error(`Reports & Documents: Document '${doc.title}' in '${cat.categoryName}' is missing an icon`);
                            return false;
                        }
                        if (!doc.fileUrl?.trim()) {
                            setActiveReportTabIdx(i);
                            toast.error(`Reports & Documents: Document '${doc.title}' in '${cat.categoryName}' is missing a file link`);
                            return false;
                        }
                    }
                }
            }
        }

        // Corporate Governance
        if (activeTab === 'governance') {
            if (!settings.corporateGovernanceTitle?.trim()) {
                toast.error('Corporate Governance: Main Title is required'); return false;
            }
            for (let i = 0; i < (settings.corporateGovernance || []).length; i++) {
                const card = settings.corporateGovernance[i];
                if (!card.title?.trim()) {
                    toast.error(`Corporate Governance: Card #${i + 1} is missing a title`); return false;
                }
                if (!card.icon?.trim()) {
                    toast.error(`Corporate Governance: Card #${i + 1} is missing an icon`); return false;
                }
                for (let j = 0; j < (card.items || []).length; j++) {
                    if (!card.items[j]?.trim()) {
                        toast.error(`Corporate Governance: Card '${card.title}' has an empty bullet point #${j + 1}`); return false;
                    }
                }
            }
        }

        // Shareholder Info
        if (activeTab === 'shareholder') {
            if (!settings.shareholderInfoTitle?.trim()) {
                toast.error('Shareholder Info: Main Title is required'); return false;
            }
            for (let i = 0; i < (settings.shareholderCards || []).length; i++) {
                const card = settings.shareholderCards[i];
                if (!card.title?.trim()) {
                    toast.error(`Shareholder Info: Card #${i + 1} is missing a title`); return false;
                }
                for (let j = 0; j < (card.items || []).length; j++) {
                    if (!card.items[j].label?.trim() || !card.items[j].value?.trim()) {
                        toast.error(`Shareholder Info: Card '${card.title}' has an incomplete detail item #${j + 1}`); return false;
                    }
                }
            }
            for (let i = 0; i < (settings.shareholderDocuments || []).length; i++) {
                const doc = settings.shareholderDocuments[i];
                if (!doc.title?.trim()) {
                    toast.error(`Shareholder Info: Document #${i + 1} is missing a title`); return false;
                }
                if (!doc.icon?.trim()) {
                    toast.error(`Shareholder Info: Document '${doc.title}' is missing an icon`); return false;
                }
                if (!doc.fileUrl?.trim()) {
                    toast.error(`Shareholder Info: Document '${doc.title}' is missing a file link`); return false;
                }
            }
        }

        // Recent Disclosures
        if (activeTab === 'disclosures') {
            if (!settings.recentDisclosuresTitle?.trim()) {
                toast.error('Recent Disclosures: Main Title is required'); return false;
            }
            for (let i = 0; i < (settings.recentDisclosures || []).length; i++) {
                const item = settings.recentDisclosures[i];
                if (!item.title?.trim()) {
                    toast.error(`Recent Disclosures: Disclosure #${i + 1} is missing a title`); return false;
                }
                if (!item.date?.trim()) {
                    toast.error(`Recent Disclosures: Disclosure '${item.title}' is missing a date`); return false;
                }
                if (!item.category?.trim()) {
                    toast.error(`Recent Disclosures: Disclosure '${item.title}' is missing a category`); return false;
                }
                if (!item.fileUrl?.trim()) {
                    toast.error(`Recent Disclosures: Disclosure '${item.title}' is missing a file link`); return false;
                }
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setSaving(true);
        try {
            const { data } = await API.put('/investor-page', settings);
            if (data.success) {
                toast.success('Investor settings saved successfully!');
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

    const currentTabs = settings.tabs || [];
    const activeReportTab = currentTabs[activeReportTabIdx];

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Investor Settings</h1>
                    <p className="text-slate-500 mt-1">Manage the content and layout of the Investor page</p>
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
                        {sidebarTabs.map(tab => {
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
                                <p className="text-sm text-slate-500 mt-1">Configure the main banner of the investor page.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Hero Title"
                                    placeholder="e.g. Building Value Together"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Hero Description"
                                    rows={3}
                                    placeholder="e.g. Transparent governance, strong financial performance..."
                                    value={settings.heroDescription || ''}
                                    onChange={e => handleChange('heroDescription', e.target.value)}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <ImageInput
                                            label="Desktop Image"
                                            value={settings.heroDesktopImage || ''}
                                            onChange={e => handleChange('heroDesktopImage', e.target.value)}
                                            onChoose={() => openMediaPicker((url) => handleChange('heroDesktopImage', url))}
                                        />
                                        {settings.heroDesktopImage && (
                                            <div className="mt-3">
                                                <img
                                                    src={settings.heroDesktopImage.startsWith('http') ? settings.heroDesktopImage : `${import.meta.env.VITE_API_URL}${settings.heroDesktopImage}`}
                                                    alt="Hero Desktop Preview"
                                                    className="w-full h-32 rounded-xl border border-slate-200 object-cover"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x1080?text=No+Image'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
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
                                                    alt="Hero Mobile Preview"
                                                    className="w-32 h-48 rounded-xl border border-slate-200 object-cover mx-auto"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/768x1024?text=No+Image'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* REPORTS & DOCUMENTS SECTION */}
                    {activeTab === 'reports' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                        <FileText size={20} className="text-blue-500" />
                                        Reports & Documents
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">Manage downloadable reports grouped by tabs and categories.</p>
                                </div>
                                <button onClick={handleAddReportTab} className="text-blue-600 text-sm font-medium flex items-center gap-1 px-3 py-1.5 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <Plus size={16} /> Add Report Tab
                                </button>
                            </div>

                            {currentTabs.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                    <FileText size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No report tabs created yet.</p>
                                    <button onClick={handleAddReportTab} className="mt-3 text-blue-500 font-medium hover:underline">Create your first tab</button>
                                </div>
                            ) : (
                                <div>
                                    {/* Sub-Tabs Navigation */}
                                    <div className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-100 rounded-lg w-max max-w-full overflow-x-auto">
                                        {currentTabs.map((tab, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveReportTabIdx(idx)}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                                                    activeReportTabIdx === idx 
                                                        ? 'bg-white text-blue-600 shadow-sm' 
                                                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'
                                                }`}
                                            >
                                                {tab.tabName || 'Unnamed Tab'}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Active Tab Content */}
                                    {activeReportTab && (
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                                            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
                                                <div className="flex-1">
                                                    <FormInput
                                                        label="Tab Name"
                                                        placeholder="e.g. Financial Highlights"
                                                        value={activeReportTab.tabName}
                                                        onChange={e => handleReportTabChange(activeReportTabIdx, e.target.value)}
                                                    />
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveReportTab(activeReportTabIdx)}
                                                    className="mt-6 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-lg border border-red-100 transition-colors"
                                                    title="Delete this tab"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold text-slate-800">Categories</h3>
                                            </div>

                                            <div className="space-y-6">
                                                {(activeReportTab.categories || []).map((category, catIdx) => (
                                                    <div id={`category-${catIdx}`} key={catIdx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                                        <div className="bg-slate-100/50 p-4 border-b border-slate-200 flex items-center gap-4">
                                                            <div className="flex-1">
                                                                <FormInput
                                                                    label={`Category ${catIdx + 1} Name`}
                                                                    placeholder="e.g. Annual Report"
                                                                    value={category.categoryName}
                                                                    onChange={e => handleCategoryChange(activeReportTabIdx, catIdx, e.target.value)}
                                                                />
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveCategory(activeReportTabIdx, catIdx)}
                                                                className="mt-6 text-slate-400 hover:text-red-500 transition-colors p-2"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>

                                                        <div className="p-4">
                                                            <div className="mb-3">
                                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Documents</p>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {(category.documents || []).map((doc, docIdx) => (
                                                                    <div id={`document-${catIdx}-${docIdx}`} key={docIdx} className="border border-slate-100 rounded-lg p-3 bg-slate-50 relative group">
                                                                        <button 
                                                                            onClick={() => handleRemoveDocument(activeReportTabIdx, catIdx, docIdx)}
                                                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded shadow-sm"
                                                                        >
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                        <div className="space-y-3 pr-6">
                                                                            <ImageInput
                                                                                label="Document Icon"
                                                                                value={doc.icon || ''}
                                                                                onChange={e => handleDocumentChange(activeReportTabIdx, catIdx, docIdx, 'icon', e.target.value)}
                                                                                onChoose={() => openMediaPicker((url) => handleDocumentChange(activeReportTabIdx, catIdx, docIdx, 'icon', url))}
                                                                            />
                                                                            {doc.icon && (
                                                                                <div className="mt-2">
                                                                                    <img
                                                                                        src={doc.icon.startsWith('http') ? doc.icon : `${import.meta.env.VITE_API_URL}${doc.icon}`}
                                                                                        alt="Icon Preview"
                                                                                        className="h-10 w-10 object-contain rounded border border-slate-200 bg-white p-1"
                                                                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40?text=No+Image'; }}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            <FormInput
                                                                                label="Document Title"
                                                                                placeholder="e.g. Annual Report 2026 Q1"
                                                                                value={doc.title}
                                                                                onChange={e => handleDocumentChange(activeReportTabIdx, catIdx, docIdx, 'title', e.target.value)}
                                                                            />
                                                                            <FormInput
                                                                                label="File Link (PDF/Document URL)"
                                                                                placeholder="e.g. https://example.com/report.pdf"
                                                                                value={doc.fileUrl}
                                                                                onChange={e => handleDocumentChange(activeReportTabIdx, catIdx, docIdx, 'fileUrl', e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {(!category.documents || category.documents.length === 0) && (
                                                                <p className="text-sm text-slate-400 italic mt-2">No documents added to this category.</p>
                                                            )}

                                                            <button 
                                                                onClick={() => handleAddDocument(activeReportTabIdx, catIdx)}
                                                                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 w-full py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-dashed border-blue-200"
                                                            >
                                                                <Plus size={16} /> Add Document
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!activeReportTab.categories || activeReportTab.categories.length === 0) && (
                                                    <div className="text-center py-8 text-slate-400 bg-white border border-slate-200 rounded-xl shadow-sm">
                                                        <p className="text-sm">No categories in this tab yet.</p>
                                                    </div>
                                                )}
                                                
                                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                                    <button 
                                                        onClick={() => handleAddCategory(activeReportTabIdx)}
                                                        className="text-blue-600 font-medium flex items-center gap-2 px-6 py-3 border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors"
                                                    >
                                                        <Plus size={18} /> Add Category
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* CORPORATE GOVERNANCE SECTION */}
                    {activeTab === 'governance' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                        <Users size={20} className="text-blue-500" />
                                        Corporate Governance
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">Manage corporate governance cards and their details.</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <FormInput
                                    label="Main Section Title"
                                    placeholder="e.g. Corporate Governance"
                                    value={settings.corporateGovernanceTitle || ''}
                                    onChange={e => handleChange('corporateGovernanceTitle', e.target.value)}
                                />
                            </div>

                            {(!settings.corporateGovernance || settings.corporateGovernance.length === 0) ? (
                                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                    <Users size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No corporate governance cards created yet.</p>
                                    <button onClick={handleAddGovCard} className="mt-3 text-blue-500 font-medium hover:underline">Create your first card</button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.corporateGovernance || []).map((card, cardIdx) => (
                                        <div id={`gov-card-${cardIdx}`} key={cardIdx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                            <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col gap-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1 flex flex-col gap-4">
                                                        <div>
                                                            <ImageInput
                                                                label="Icon"
                                                                value={card.icon || ''}
                                                                onChange={e => handleGovCardFieldChange(cardIdx, 'icon', e.target.value)}
                                                                onChoose={() => openMediaPicker((url) => handleGovCardFieldChange(cardIdx, 'icon', url))}
                                                            />
                                                            {card.icon && (
                                                                <img
                                                                    src={card.icon.startsWith('http') ? card.icon : `${import.meta.env.VITE_API_URL}${card.icon}`}
                                                                    alt="Icon"
                                                                    className="h-12 w-12 mt-2 object-contain rounded border border-slate-200 bg-white p-1"
                                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40?text=No+Image'; }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <FormInput
                                                                label="Card Title"
                                                                placeholder="e.g. Board Composition"
                                                                value={card.title}
                                                                onChange={e => handleGovCardFieldChange(cardIdx, 'title', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleRemoveGovCard(cardIdx)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors p-2 mt-6 shrink-0"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col">
                                                <div className="flex justify-between items-center mb-3">
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bullet Points</p>
                                                </div>
                                                
                                                <div className="space-y-3 flex-1">
                                                    {(card.items || []).map((item, itemIdx) => (
                                                        <div key={itemIdx} className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
                                                            <div className="flex-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="e.g. 8 Independent Directors"
                                                                    value={item}
                                                                    onChange={e => handleGovItemChange(cardIdx, itemIdx, e.target.value)}
                                                                    className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                                                                />
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveGovItem(cardIdx, itemIdx)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {(!card.items || card.items.length === 0) && (
                                                        <p className="text-sm text-slate-400 italic">No items added to this card.</p>
                                                    )}
                                                </div>

                                                <button 
                                                    onClick={() => handleAddGovItem(cardIdx)}
                                                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 w-full py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-dashed border-blue-200"
                                                >
                                                    <Plus size={16} /> Add Bullet Point
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                    <button 
                                        onClick={handleAddGovCard} 
                                        className="text-blue-600 font-medium flex items-center gap-2 px-6 py-3 border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors"
                                    >
                                        <Plus size={18} /> Add Card
                                    </button>
                                </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* SHAREHOLDER INFO SECTION */}
                    {activeTab === 'shareholder' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                        <Briefcase size={20} className="text-blue-500" />
                                        Shareholder Information
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">Manage stock info and dividend history cards.</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <FormInput
                                    label="Main Section Title"
                                    placeholder="e.g. Shareholder Information"
                                    value={settings.shareholderInfoTitle || ''}
                                    onChange={e => handleChange('shareholderInfoTitle', e.target.value)}
                                />
                            </div>

                            {(!settings.shareholderCards || settings.shareholderCards.length === 0) ? (
                                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                    <Briefcase size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No shareholder cards created yet.</p>
                                    <button onClick={handleAddShareCard} className="mt-3 text-blue-500 font-medium hover:underline">Create your first card</button>
                                </div>
                            ) : (
                                <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.shareholderCards || []).map((card, cardIdx) => (
                                        <div id={`share-card-${cardIdx}`} key={cardIdx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                            <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col gap-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <FormInput
                                                            label="Card Title"
                                                            placeholder="e.g. Stock Information"
                                                            value={card.title}
                                                            onChange={e => handleShareCardFieldChange(cardIdx, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <button 
                                                        onClick={() => handleRemoveShareCard(cardIdx)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors p-2 mt-6 shrink-0"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col">
                                                <div className="flex justify-between items-center mb-3">
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key-Value Pairs</p>
                                                </div>
                                                
                                                <div className="space-y-3 flex-1">
                                                    {(card.items || []).map((item, itemIdx) => (
                                                        <div key={itemIdx} className="flex items-center gap-2">
                                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Label (e.g. Stock Symbol)"
                                                                    value={item.label}
                                                                    onChange={e => handleShareItemChange(cardIdx, itemIdx, 'label', e.target.value)}
                                                                    className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Value (e.g. ASIANCAB)"
                                                                    value={item.value}
                                                                    onChange={e => handleShareItemChange(cardIdx, itemIdx, 'value', e.target.value)}
                                                                    className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                                                                />
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveShareItem(cardIdx, itemIdx)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {(!card.items || card.items.length === 0) && (
                                                        <p className="text-sm text-slate-400 italic">No items added to this card.</p>
                                                    )}
                                                </div>

                                                <button 
                                                    onClick={() => handleAddShareItem(cardIdx)}
                                                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 w-full py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-dashed border-blue-200"
                                                >
                                                    <Plus size={16} /> Add Key-Value Pair
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                    <button 
                                        onClick={handleAddShareCard} 
                                        className="text-blue-600 font-medium flex items-center gap-2 px-6 py-3 border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors"
                                    >
                                        <Plus size={18} /> Add Card
                                    </button>
                                </div>
                                </>
                            )}

                            {/* Shareholder Documents */}
                            <div className="mt-12 mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                        <FileText size={18} className="text-blue-500" />
                                        Shareholder Documents
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">Manage documents like Annual Reports, Presentations, etc. under this section.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {(settings.shareholderDocuments || []).map((doc, docIdx) => (
                                    <div id={`share-doc-${docIdx}`} key={docIdx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-4">
                                        <div className="flex-1 space-y-3">
                                            <FormInput
                                                label="Document Title"
                                                placeholder="e.g. Annual Report 2024"
                                                value={doc.title}
                                                onChange={(e) => handleShareDocFieldChange(docIdx, 'title', e.target.value)}
                                            />
                                            <ImageInput
                                                label="Icon URL"
                                                value={doc.icon}
                                                onChange={(e) => handleShareDocFieldChange(docIdx, 'icon', e.target.value)}
                                                onChoose={() => openMediaPicker((url) => handleShareDocFieldChange(docIdx, 'icon', url))}
                                            />
                                            <FormInput
                                                label="Document Link"
                                                placeholder="e.g. https://example.com/doc.pdf"
                                                value={doc.fileUrl}
                                                onChange={(e) => handleShareDocFieldChange(docIdx, 'fileUrl', e.target.value)}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveShareDoc(docIdx)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-2 mt-6"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleAddShareDoc}
                                    className="text-blue-600 font-medium flex items-center gap-2 px-6 py-3 border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                                >
                                    <Plus size={18} /> Add Document
                                </button>
                            </div>

                        </div>
                    )}

                    {/* RECENT DISCLOSURES SECTION */}
                    {activeTab === 'disclosures' && (
                        <div>
                            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                        <Clock size={20} className="text-blue-500" />
                                        Recent Disclosures
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">Manage recent disclosures, announcements, and their download links.</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <FormInput
                                    label="Main Section Title"
                                    placeholder="e.g. Recent Disclosures"
                                    value={settings.recentDisclosuresTitle || ''}
                                    onChange={e => handleChange('recentDisclosuresTitle', e.target.value)}
                                />
                            </div>

                            {(!settings.recentDisclosures || settings.recentDisclosures.length === 0) ? (
                                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                    <Clock size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No recent disclosures added yet.</p>
                                    <button onClick={handleAddDisclosure} className="mt-3 text-blue-500 font-medium hover:underline">Add your first disclosure</button>
                                </div>
                            ) : (
                                <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(settings.recentDisclosures || []).map((item, idx) => (
                                        <div id={`disclosure-${idx}`} key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col gap-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 space-y-4">
                                                    <div className="flex gap-4">
                                                        <div className="flex-1">
                                                            <FormInput
                                                                label="Date"
                                                                placeholder="e.g. March 1, 2024"
                                                                value={item.date}
                                                                onChange={(e) => handleDisclosureFieldChange(idx, 'date', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <FormInput
                                                                label="Category Badge"
                                                                placeholder="e.g. Financial"
                                                                value={item.category}
                                                                onChange={(e) => handleDisclosureFieldChange(idx, 'category', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <FormInput
                                                        label="Disclosure Title"
                                                        placeholder="e.g. Q4 FY24 Results - Board Meeting Notice"
                                                        value={item.title}
                                                        onChange={(e) => handleDisclosureFieldChange(idx, 'title', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label="File URL (Link)"
                                                        placeholder="e.g. https://example.com/disclosure.pdf"
                                                        value={item.fileUrl}
                                                        onChange={(e) => handleDisclosureFieldChange(idx, 'fileUrl', e.target.value)}
                                                    />
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveDisclosure(idx)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-2 shrink-0 ml-4"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                    <button 
                                        onClick={handleAddDisclosure} 
                                        className="text-blue-600 font-medium flex items-center gap-2 px-6 py-3 border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors"
                                    >
                                        <Plus size={18} /> Add Disclosure
                                    </button>
                                </div>
                                </>
                            )}
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

export default InvestorSettings;
