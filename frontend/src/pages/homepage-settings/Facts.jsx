import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Image, Layout } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';

const Facts = () => {
    const [loading, setLoading] = useState(false);
    const [facts, setFacts] = useState({
        presence: { title: '', description: '', image: '' },
        decades: { title: '', subtitle: '', description: '' },
        capacity: { title: '', subtitle: '', description: '' },
        annual: { value: '', title: '', description: '', image: '' }
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
            const { data } = await API.get('/homepage-sections/single/facts');
            if (data.data) {
                // If fields don't exist yet, preserve the default shape
                setFacts({ ...facts, ...data.data });
            }
        } catch (error) {
            toast.error('Failed to fetch facts data');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put('/homepage-sections/single/facts', facts);
            toast.success('Facts updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update facts');
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
                        Facts Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Configure the four fact cards shown on the homepage.</p>
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
                    {/* Presence Card */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">1. Presence Card (Top Left)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={facts.presence?.title || ''} onChange={(e) => setFacts({ ...facts, presence: { ...facts.presence, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Title (e.g., Presence in 90+ Countries)" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Flags Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={facts.presence?.image || ''} onChange={(e) => setFacts({ ...facts, presence: { ...facts.presence, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Flags Image URL" />
                                    <button type="button" onClick={() => openMediaPicker((url) => setFacts({ ...facts, presence: { ...facts.presence, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea value={facts.presence?.description || ''} onChange={(e) => setFacts({ ...facts, presence: { ...facts.presence, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                            </div>
                        </div>
                    </div>
                    
                    {/* Decades Card */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">2. Decades Card (Bottom Left 1)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Large Title</label>
                                <input type="text" value={facts.decades?.title || ''} onChange={(e) => setFacts({ ...facts, decades: { ...facts.decades, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 6+ Decades" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Subtitle</label>
                                <input type="text" value={facts.decades?.subtitle || ''} onChange={(e) => setFacts({ ...facts, decades: { ...facts.decades, subtitle: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subtitle" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea value={facts.decades?.description || ''} onChange={(e) => setFacts({ ...facts, decades: { ...facts.decades, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                            </div>
                        </div>
                    </div>
                    
                    {/* Capacity Card */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">3. Capacity Card (Bottom Left 2)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Large Title</label>
                                <input type="text" value={facts.capacity?.title || ''} onChange={(e) => setFacts({ ...facts, capacity: { ...facts.capacity, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Up To 220 KV" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Subtitle</label>
                                <input type="text" value={facts.capacity?.subtitle || ''} onChange={(e) => setFacts({ ...facts, capacity: { ...facts.capacity, subtitle: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subtitle" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea value={facts.capacity?.description || ''} onChange={(e) => setFacts({ ...facts, capacity: { ...facts.capacity, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                            </div>
                        </div>
                    </div>
                    
                    {/* Annual Card */}
                    <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                        <h3 className="text-md font-bold text-slate-800 mb-5">4. Annual Capacity (Right Side Image Card)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Big Overlay Value</label>
                                <input type="text" value={facts.annual?.value || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, value: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 3600 Km" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Bottom Title</label>
                                <input type="text" value={facts.annual?.title || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, title: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Bottom Title" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Background Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={facts.annual?.image || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Background Image URL" />
                                    <button type="button" onClick={() => openMediaPicker((url) => setFacts({ ...facts, annual: { ...facts.annual, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea value={facts.annual?.description || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
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

export default Facts;
