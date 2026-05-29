import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Save, Info } from 'lucide-react';

const AboutUs = () => {
    const [loading, setLoading] = useState(false);
    const [aboutUs, setAboutUs] = useState({ text: '' });

    useEffect(() => {
        fetchHomepage();
    }, []);

    const fetchHomepage = async () => {
        try {
            const { data } = await API.get('/homepage-sections/single/about-us');
            if (data.data) {
                setAboutUs({ ...aboutUs, ...data.data });
            }
        } catch (error) {
            toast.error('Failed to fetch about us data');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put('/homepage-sections/single/about-us', aboutUs);
            toast.success('About Us content updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update about us content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Info size={24} className="text-blue-600" />
                        About Us Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Configure the scrolling text reveal section shown on the homepage.</p>
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

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px]">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">About Us Content</h2>
                    <p className="text-sm text-slate-500">Edit the text that appears in the about section.</p>
                </div>
                
                <div className="space-y-4 max-w-3xl">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">About Paragraph Text</label>
                        <textarea 
                            value={aboutUs.text || ''} 
                            onChange={(e) => setAboutUs({ ...aboutUs, text: e.target.value })}
                            rows={12}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-white transition-colors text-slate-800 text-sm resize-y leading-relaxed"
                            placeholder="Write about your company here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
