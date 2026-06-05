import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Layout } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';

const Applications = () => {
    const [loading, setLoading] = useState(false);
    const [applications, setApplications] = useState({
        main: { title: '', description: '', image: '', link: '' },
        small1: { title: '', image: '', link: '' },
        small2: { title: '', image: '', link: '' },
        wide: { title: '', image: '', link: '' }
    });
    
    // Media Picker States
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    useEffect(() => {
        fetchHomepage();
    }, []);

    const fetchHomepage = async () => {
        try {
            const { data } = await API.get('/homepage-sections/single/applications');
            if (data.data) {
                setApplications({ ...applications, ...data.data });
            }
        } catch (error) {
            toast.error('Failed to fetch applications data');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put('/homepage-sections/single/applications', applications);
            toast.success('Applications updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update applications');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Layout size={24} className="text-blue-600" />
                        Applications Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Configure the 4 application images and texts.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm font-medium"
                >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="space-y-8">
                    {/* Main App */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">1. Main Application (Large Left Card)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={applications.main?.title || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Oil & Gas" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={applications.main?.image || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Image URL" />
                                    <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, main: { ...applications.main, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Link URL</label>
                                <input type="text" value={applications.main?.link || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, link: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/oil-gas" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea value={applications.main?.description || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, description: e.target.value } })} rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                            </div>
                        </div>
                    </div>
                    
                    {/* Small App 1 */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">2. Top Right Box 1</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={applications.small1?.title || ''} onChange={(e) => setApplications({ ...applications, small1: { ...applications.small1, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Power Plants" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={applications.small1?.image || ''} onChange={(e) => setApplications({ ...applications, small1: { ...applications.small1, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Image URL" />
                                    <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, small1: { ...applications.small1, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Link URL</label>
                                <input type="text" value={applications.small1?.link || ''} onChange={(e) => setApplications({ ...applications, small1: { ...applications.small1, link: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/power-plants" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Small App 2 */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">3. Top Right Box 2</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={applications.small2?.title || ''} onChange={(e) => setApplications({ ...applications, small2: { ...applications.small2, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Utilities" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={applications.small2?.image || ''} onChange={(e) => setApplications({ ...applications, small2: { ...applications.small2, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Image URL" />
                                    <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, small2: { ...applications.small2, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Link URL</label>
                                <input type="text" value={applications.small2?.link || ''} onChange={(e) => setApplications({ ...applications, small2: { ...applications.small2, link: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/utilities" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Wide App */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">4. Bottom Right Wide Box</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={applications.wide?.title || ''} onChange={(e) => setApplications({ ...applications, wide: { ...applications.wide, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Industrial & Heavy Engineering" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={applications.wide?.image || ''} onChange={(e) => setApplications({ ...applications, wide: { ...applications.wide, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Image URL" />
                                    <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, wide: { ...applications.wide, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Link URL</label>
                                <input type="text" value={applications.wide?.link || ''} onChange={(e) => setApplications({ ...applications, wide: { ...applications.wide, link: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/industrial" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MediaPicker 
                isOpen={pickerOpen} 
                onClose={() => setPickerOpen(false)} 
                onSelect={(url) => {
                    if (onSelectCallback) onSelectCallback(url);
                }} 
            />
        </div>
    );
};

export default Applications;
