import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Info, Phone, HeadphonesIcon, AlertCircle, MapPin, Plus, Trash2, Building2, FileText } from 'lucide-react';
import { FormInput, FormTextarea, FormSelect } from '../../components/admin/FormComponents';
import { INDIA_STATES_CITIES } from '../../utils/indiaStatesCities';

const ContactSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('main');

    const tabs = [
        { id: 'main', label: 'Main Information', icon: Info },
        { id: 'contact', label: 'Contact Details', icon: Phone },
        { id: 'support', label: 'Support & Grievance', icon: HeadphonesIcon },
        { id: 'distributors', label: 'Distributors', icon: MapPin },
        { id: 'offices', label: 'Our Offices', icon: Building2 },
        { id: 'form', label: 'General Enquiry Form', icon: FileText },
    ];

    const fetchSettings = async () => {
        try {
            const { data } = await API.get('/contact-page');
            if (data.success) {
                const fetchedData = data.data || {};
                setSettings({
                    ...fetchedData,
                    distributorsList: fetchedData.distributorsList || [],
                    officeLocations: fetchedData.officeLocations || []
                });
            }
        } catch (error) {
            toast.error('Failed to fetch contact page settings');
            console.error('Error fetching contact page settings:', error);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

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
        if (activeTab === 'main') {
            if (!settings.title?.trim()) {
                toast.error('Main Info: Title is required'); return false;
            }
            if (!settings.description?.trim()) {
                toast.error('Main Info: Description is required'); return false;
            }
        }
        
        if (activeTab === 'contact') {
            if (!settings.phoneTitle?.trim() || !settings.phoneSubtitle?.trim()) {
                toast.error('Contact Details: Phone Title and Subtitle are required'); return false;
            }
            if (!settings.emailTitle?.trim() || !settings.emailSubtitle?.trim()) {
                toast.error('Contact Details: Email Title and Subtitle are required'); return false;
            }
            if (!settings.distributorTitle?.trim() || !settings.distributorSubtitle?.trim() || !settings.distributorLinkUrl?.trim()) {
                toast.error('Contact Details: Distributor Link Title, Subtitle, and URL are required'); return false;
            }
        }
        
        if (activeTab === 'support') {
            if (!settings.supportTitle?.trim() || !settings.supportDescription?.trim() || !settings.supportStatus?.trim()) {
                toast.error('Support Blocks: Customer Support Title, Description, and Status are required'); return false;
            }
            if (!settings.grievanceTitle?.trim() || !settings.grievanceDescription?.trim() || !settings.grievanceStatus?.trim()) {
                toast.error('Support Blocks: Grievance Redressal Title, Description, and Status are required'); return false;
            }
        }
        
        if (activeTab === 'distributors') {
            if (!settings.distributorSectionTitle?.trim()) {
                toast.error('Distributors Section: Main Title is required'); return false;
            }
            if (!settings.networkTitle?.trim() || !settings.networkDescription?.trim()) {
                toast.error('Network Block: Title and Description are required'); return false;
            }
            if (!settings.networkStat1Number?.trim() || !settings.networkStat1Label?.trim()) {
                toast.error('Network Block: Stat 1 Number and Label are required'); return false;
            }
            if (!settings.networkStat2Number?.trim() || !settings.networkStat2Label?.trim()) {
                toast.error('Network Block: Stat 2 Number and Label are required'); return false;
            }
            for (let i = 0; i < (settings.distributorsList || []).length; i++) {
                const dist = settings.distributorsList[i];
                if (!dist.name?.trim()) {
                    toast.error(`Distributor #${i + 1} is missing a name`); return false;
                }
                if (!dist.address?.trim()) {
                    toast.error(`Distributor '${dist.name || i+1}' is missing an address`); return false;
                }
                if (!dist.phone?.trim()) {
                    toast.error(`Distributor '${dist.name || i+1}' is missing a phone number`); return false;
                }
            }
        }
        
        if (activeTab === 'offices') {
            if (!settings.officeTitle?.trim()) {
                toast.error('Offices Section: Main Title is required'); return false;
            }
            if (!settings.officeDescription?.trim()) {
                toast.error('Offices Section: Description is required'); return false;
            }
            for (let i = 0; i < (settings.officeLocations || []).length; i++) {
                const loc = settings.officeLocations[i];
                if (!loc.title?.trim() || !loc.state?.trim() || !loc.address?.trim()) {
                    toast.error(`Office #${i + 1} is missing required fields (Title, State, or Address)`); return false;
                }
            }
        }

        if (activeTab === 'form') {
            if (!settings.formTitle?.trim()) {
                toast.error('Form Section: Title is required'); return false;
            }
            if (!settings.formDescription?.trim()) {
                toast.error('Form Section: Description is required'); return false;
            }
        }
        
        return true;
    };

    const handleSave = async () => {
        if (!validateSettings()) return;

        setLoading(true);
        try {
            const { data } = await API.put('/contact-page', settings);
            if (data.success) {
                toast.success('Contact settings saved successfully');
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
                    <h1 className="text-3xl font-bold text-slate-800">Contact Us Settings</h1>
                    <p className="text-slate-500 mt-1">Manage contact information, support blocks, and text for the Contact page.</p>
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

                    {/* MAIN INFO SECTION */}
                    {activeTab === 'main' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Info size={20} className="text-blue-500" />
                                    Main Information
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the main heading and description for the contact page.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Main Title"
                                    placeholder="e.g. Let's Connect"
                                    value={settings.title || ''}
                                    onChange={e => handleChange('title', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Description"
                                    rows={4}
                                    placeholder="e.g. Our team is ready to help..."
                                    value={settings.description || ''}
                                    onChange={e => handleChange('description', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* CONTACT DETAILS SECTION */}
                    {activeTab === 'contact' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Phone size={20} className="text-blue-500" />
                                    Contact Details
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the phone number, email address, and distributor link.</p>
                            </div>

                            <div className="space-y-8">
                                {/* Address Box */}
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Corporate Address</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormInput
                                            label="Address Title"
                                            placeholder="e.g. KEC Asian Cables Limited"
                                            value={settings.addressTitle || ''}
                                            onChange={e => handleChange('addressTitle', e.target.value)}
                                        />
                                        <FormTextarea
                                            label="Full Address"
                                            rows={3}
                                            placeholder="e.g. 16th Floor, RPG House..."
                                            value={settings.addressDescription || ''}
                                            onChange={e => handleChange('addressDescription', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Phone Box */}
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Phone Number</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormInput
                                            label="Phone Number"
                                            placeholder="e.g. +91 22 1234 5678"
                                            value={settings.phoneTitle || ''}
                                            onChange={e => handleChange('phoneTitle', e.target.value)}
                                        />
                                        <FormInput
                                            label="Availability Subtitle"
                                            placeholder="e.g. Mon-Sat, 9AM-6PM IST"
                                            value={settings.phoneSubtitle || ''}
                                            onChange={e => handleChange('phoneSubtitle', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Email Box */}
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Email Address</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormInput
                                            label="Email Address"
                                            placeholder="e.g. info@asiancables.com"
                                            value={settings.emailTitle || ''}
                                            onChange={e => handleChange('emailTitle', e.target.value)}
                                        />
                                        <FormInput
                                            label="Response Time Subtitle"
                                            placeholder="e.g. Response within 24 hours"
                                            value={settings.emailSubtitle || ''}
                                            onChange={e => handleChange('emailSubtitle', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Distributor Box */}
                                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4">Find Distributor Link</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                        <FormInput
                                            label="Link Title"
                                            placeholder="e.g. Find Distributor"
                                            value={settings.distributorTitle || ''}
                                            onChange={e => handleChange('distributorTitle', e.target.value)}
                                        />
                                        <FormInput
                                            label="Link Subtitle"
                                            placeholder="e.g. Get distributor details around you"
                                            value={settings.distributorSubtitle || ''}
                                            onChange={e => handleChange('distributorSubtitle', e.target.value)}
                                        />
                                    </div>
                                    <FormInput
                                        label="Destination URL"
                                        placeholder="e.g. /distributors"
                                        value={settings.distributorLinkUrl || ''}
                                        onChange={e => handleChange('distributorLinkUrl', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SUPPORT & GRIEVANCE SECTION */}
                    {activeTab === 'support' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <HeadphonesIcon size={20} className="text-blue-500" />
                                    Support & Grievance Blocks
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the Customer Support and Grievance Redressal boxes.</p>
                            </div>

                            <div className="space-y-8">
                                {/* Customer Support Box */}
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Customer Support Block</h3>
                                    <div className="grid grid-cols-1 gap-5">
                                        <FormInput
                                            label="Block Title"
                                            placeholder="e.g. Customer Support"
                                            value={settings.supportTitle || ''}
                                            onChange={e => handleChange('supportTitle', e.target.value)}
                                        />
                                        <FormTextarea
                                            label="Description"
                                            rows={3}
                                            placeholder="e.g. Technical support, product queries..."
                                            value={settings.supportDescription || ''}
                                            onChange={e => handleChange('supportDescription', e.target.value)}
                                        />
                                        <FormInput
                                            label="Status Text (e.g. Online 24/7)"
                                            placeholder="e.g. Online 24/7"
                                            value={settings.supportStatus || ''}
                                            onChange={e => handleChange('supportStatus', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Grievance Box */}
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Grievance Redressal Block</h3>
                                    <div className="grid grid-cols-1 gap-5">
                                        <FormInput
                                            label="Block Title"
                                            placeholder="e.g. Grievance Redressal"
                                            value={settings.grievanceTitle || ''}
                                            onChange={e => handleChange('grievanceTitle', e.target.value)}
                                        />
                                        <FormTextarea
                                            label="Description"
                                            rows={3}
                                            placeholder="e.g. Report issues for prompt resolution..."
                                            value={settings.grievanceDescription || ''}
                                            onChange={e => handleChange('grievanceDescription', e.target.value)}
                                        />
                                        <FormInput
                                            label="Status/Guarantee Text"
                                            placeholder="e.g. 48hr Response Guaranteed"
                                            value={settings.grievanceStatus || ''}
                                            onChange={e => handleChange('grievanceStatus', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DISTRIBUTORS SECTION */}
                    {activeTab === 'distributors' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <MapPin size={20} className="text-blue-500" />
                                    Find Distributors & Dealers
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the list of distributors and the nationwide network block details.</p>
                            </div>

                            <div className="grid grid-cols-1 mb-8">
                                <FormInput
                                    label="Distributors Section Title"
                                    placeholder="e.g. Find Distributors & Dealers"
                                    value={settings.distributorSectionTitle || ''}
                                    onChange={e => handleChange('distributorSectionTitle', e.target.value)}
                                />
                            </div>

                            <div className="space-y-8">
                                {/* Nationwide Network Block */}
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Nationwide Network Block</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                        <FormInput
                                            label="Network Title"
                                            placeholder="e.g. Nationwide Network"
                                            value={settings.networkTitle || ''}
                                            onChange={e => handleChange('networkTitle', e.target.value)}
                                        />
                                        <FormInput
                                            label="Network Description"
                                            placeholder="e.g. 500+ distributors..."
                                            value={settings.networkDescription || ''}
                                            onChange={e => handleChange('networkDescription', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                        <FormInput
                                            label="Stat 1 Number"
                                            placeholder="e.g. 500+"
                                            value={settings.networkStat1Number || ''}
                                            onChange={e => handleChange('networkStat1Number', e.target.value)}
                                        />
                                        <FormInput
                                            label="Stat 1 Label"
                                            placeholder="e.g. Dealers"
                                            value={settings.networkStat1Label || ''}
                                            onChange={e => handleChange('networkStat1Label', e.target.value)}
                                        />
                                        <FormInput
                                            label="Stat 2 Number"
                                            placeholder="e.g. 28"
                                            value={settings.networkStat2Number || ''}
                                            onChange={e => handleChange('networkStat2Number', e.target.value)}
                                        />
                                        <FormInput
                                            label="Stat 2 Label"
                                            placeholder="e.g. States"
                                            value={settings.networkStat2Label || ''}
                                            onChange={e => handleChange('networkStat2Label', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Distributors List */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Distributors List</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {(settings.distributorsList || []).map((dist, idx) => (
                                            <div id={`distributorsList-${idx}`} key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group">
                                                <button 
                                                    onClick={() => handleRemoveFromArray('distributorsList', idx)}
                                                    className="absolute top-2 right-2 text-white bg-red-500/80 hover:bg-red-600 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                    title="Remove Distributor"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                
                                                <div className="space-y-4 pr-8">
                                                    <FormInput
                                                        label="Distributor Name"
                                                        placeholder="e.g. Asian Cables Distributor - Andheri"
                                                        value={dist.name || ''}
                                                        onChange={e => handleArrayChange('distributorsList', idx, 'name', e.target.value)}
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormSelect
                                                            label="State"
                                                            options={Object.keys(INDIA_STATES_CITIES)}
                                                            value={dist.state || ''}
                                                            onChange={e => {
                                                                handleArrayChange('distributorsList', idx, 'state', e.target.value);
                                                                handleArrayChange('distributorsList', idx, 'city', ''); // reset city
                                                            }}
                                                        />
                                                        <FormSelect
                                                            label="City"
                                                            options={dist.state && INDIA_STATES_CITIES[dist.state] ? INDIA_STATES_CITIES[dist.state] : []}
                                                            value={dist.city || ''}
                                                            onChange={e => handleArrayChange('distributorsList', idx, 'city', e.target.value)}
                                                        />
                                                    </div>
                                                    <FormInput
                                                        label="Address"
                                                        placeholder="e.g. 123 Link Road, Andheri West..."
                                                        value={dist.address || ''}
                                                        onChange={e => handleArrayChange('distributorsList', idx, 'address', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label="Phone Number"
                                                        placeholder="e.g. +91 22 1234 5678"
                                                        value={dist.phone || ''}
                                                        onChange={e => handleArrayChange('distributorsList', idx, 'phone', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label="Link / URL (Optional)"
                                                        placeholder="e.g. /dealer-details or https://maps..."
                                                        value={dist.link || ''}
                                                        onChange={e => handleArrayChange('distributorsList', idx, 'link', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {(!settings.distributorsList || settings.distributorsList.length === 0) && (
                                        <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50 mt-4">
                                            <MapPin size={32} className="mx-auto mb-3 opacity-30" />
                                            <p className="text-sm">No distributors added yet.</p>
                                        </div>
                                    )}
                                    
                                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                        <button 
                                            onClick={() => handleAddToArray('distributorsList', { name: '', state: '', city: '', address: '', phone: '', link: '' })}
                                            className="text-blue-600 font-medium flex items-center gap-2 px-8 py-3 border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm"
                                        >
                                            <Plus size={20} /> Add Distributor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OFFICES SECTION */}
                    {activeTab === 'offices' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Building2 size={20} className="text-blue-500" />
                                    Our Offices & Facilities
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Manage the office locations shown on the contact page.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    label="Offices Section Title"
                                    placeholder="e.g. Our Offices & Manufacturing Facilities"
                                    value={settings.officeTitle || ''}
                                    onChange={e => handleChange('officeTitle', e.target.value)}
                                />
                                <FormTextarea
                                    label="Offices Section Description"
                                    rows={2}
                                    placeholder="e.g. Serving customers across India..."
                                    value={settings.officeDescription || ''}
                                    onChange={e => handleChange('officeDescription', e.target.value)}
                                />
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Office Locations</h3>
                                    
                                    <div className="grid grid-cols-1 gap-6">
                                        {(settings.officeLocations || []).map((loc, idx) => (
                                            <div id={`officeLocations-${idx}`} key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group">
                                                <button 
                                                    onClick={() => handleRemoveFromArray('officeLocations', idx)}
                                                    className="absolute top-2 right-2 text-white bg-red-500/80 hover:bg-red-600 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                    title="Remove Office"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormSelect
                                                            label="State"
                                                            options={Object.keys(INDIA_STATES_CITIES)}
                                                            value={loc.state || ''}
                                                            onChange={e => {
                                                                handleArrayChange('officeLocations', idx, 'state', e.target.value);
                                                                handleArrayChange('officeLocations', idx, 'city', ''); // reset city
                                                            }}
                                                        />
                                                        <FormSelect
                                                            label="City"
                                                            options={loc.state && INDIA_STATES_CITIES[loc.state] ? INDIA_STATES_CITIES[loc.state] : []}
                                                            value={loc.city || ''}
                                                            onChange={e => handleArrayChange('officeLocations', idx, 'city', e.target.value)}
                                                        />
                                                    </div>
                                                    <FormInput
                                                        label="Title"
                                                        placeholder="e.g. Vadodara Factory"
                                                        value={loc.title || ''}
                                                        onChange={e => handleArrayChange('officeLocations', idx, 'title', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label="Company"
                                                        placeholder="e.g. KEC Asian Cables Limited"
                                                        value={loc.company || ''}
                                                        onChange={e => handleArrayChange('officeLocations', idx, 'company', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label="Subsidiary Info"
                                                        placeholder="e.g. A KEC International Ltd. Subsidiary"
                                                        value={loc.subsidiary || ''}
                                                        onChange={e => handleArrayChange('officeLocations', idx, 'subsidiary', e.target.value)}
                                                    />
                                                    <div className="md:col-span-2">
                                                        <FormTextarea
                                                            label="Address (Multiline)"
                                                            rows={3}
                                                            placeholder="Village: Godampura...&#10;Taluka: Savli...&#10;Vadodara, 391520"
                                                            value={loc.address || ''}
                                                            onChange={e => handleArrayChange('officeLocations', idx, 'address', e.target.value)}
                                                        />
                                                    </div>
                                                    <FormInput
                                                        label="Phone Number"
                                                        placeholder="e.g. +91 XX XXXX XXXX"
                                                        value={loc.phone || ''}
                                                        onChange={e => handleArrayChange('officeLocations', idx, 'phone', e.target.value)}
                                                    />
                                                    <FormInput
                                                        label="Email Address"
                                                        placeholder="e.g. contact@asiancables.com"
                                                        value={loc.email || ''}
                                                        onChange={e => handleArrayChange('officeLocations', idx, 'email', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {(!settings.officeLocations || settings.officeLocations.length === 0) && (
                                        <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50 mt-4">
                                            <Building2 size={32} className="mx-auto mb-3 opacity-30" />
                                            <p className="text-sm">No office locations added yet.</p>
                                        </div>
                                    )}
                                    
                                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                                        <button 
                                            onClick={() => handleAddToArray('officeLocations', { state: '', title: '', company: '', subsidiary: '', address: '', phone: '', email: '' })}
                                            className="text-blue-600 font-medium flex items-center gap-2 px-8 py-3 border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm"
                                        >
                                            <Plus size={20} /> Add Office Location
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FORM SECTION */}
                    {activeTab === 'form' && (
                        <div className="animate-in fade-in duration-300">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <FileText size={20} className="text-blue-500" />
                                    General Enquiry Form
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Configure the heading and description for the contact form section.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <FormInput
                                    label="Form Title"
                                    placeholder="e.g. General Enquiry"
                                    value={settings.formTitle || ''}
                                    onChange={e => handleChange('formTitle', e.target.value)}
                                />
                                
                                <FormTextarea
                                    label="Form Description"
                                    rows={3}
                                    placeholder="e.g. Fill out the form below and our team will get back to you promptly."
                                    value={settings.formDescription || ''}
                                    onChange={e => handleChange('formDescription', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContactSettings;
