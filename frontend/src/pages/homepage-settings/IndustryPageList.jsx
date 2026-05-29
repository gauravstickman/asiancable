import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Settings, Edit2, Loader2, Factory } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IndustryPageList = () => {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIndustries = async () => {
        try {
            const { data } = await API.get('/industry-page');
            if (data.success) {
                setIndustries(data.data);
            }
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load industries');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIndustries();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Factory size={28} className="text-blue-600" />
                        Industry Pages
                    </h1>
                    <p className="text-slate-500 mt-1">Manage content for all industry-specific landing pages. (Fixed 7 Industries)</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Slug / URL</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {industries.map((industry, index) => (
                                        <motion.tr 
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={industry._id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                                {industry.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-500">
                                                /{industry.slug}
                                            </td>
                                            <td className="px-6 py-4 flex justify-end">
                                                <Link 
                                                    to={`/admin/industry-page/${industry._id}`}
                                                    className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                                                >
                                                    <Edit2 size={16} />
                                                    Edit
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndustryPageList;
