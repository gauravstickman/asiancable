import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ExternalLink, Briefcase, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../api/axios';

const CaseStudyList = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCaseStudies = async () => {
        try {
            const response = await API.get('/case-studies');
            setCaseStudies(response.data);
        } catch (error) {
            toast.error('Error fetching case studies');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this case study?')) {
            try {
                await API.delete(`/case-studies/${id}`);
                toast.success('Case study deleted successfully');
                setCaseStudies(caseStudies.filter(cs => cs._id !== id));
            } catch (error) {
                toast.error('Error deleting case study');
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase size={20} className="text-blue-600" />
                        Case Studies
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your project case studies</p>
                </div>
                <Link
                    to="/admin/case-studies/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                    <Plus size={18} />
                    <span>Add Case Study</span>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2 max-w-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title, client or industry..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-none outline-none px-2 text-sm text-slate-800 placeholder-slate-400"
                        />
                    </div>
                    
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Industry</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {caseStudies
                                    .filter(cs => 
                                        cs.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        cs.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        cs.industry?.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((cs) => (
                                    <tr key={cs._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {cs.bannerImage && (
                                                <img 
                                                    src={cs.bannerImage} 
                                                    alt={cs.title} 
                                                    className="h-12 w-12 rounded object-cover border border-slate-200" 
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-800 line-clamp-2">{cs.title}</div>
                                            <div className="text-xs text-slate-500 mt-1">{cs.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-600">{cs.client}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                {cs.industry}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {cs.year}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3">
                                                {cs.documentPdf && (
                                                    <a 
                                                        href={cs.documentPdf} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="text-slate-500 hover:text-blue-600 transition-colors"
                                                        title="View PDF"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                                <Link
                                                    to={`/admin/case-studies/edit/${cs._id}`}
                                                    className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(cs._id)}
                                                    className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {caseStudies.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Briefcase size={32} className="text-slate-600" />
                                                <p>No case studies found. Click 'Add Case Study' to create one.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default CaseStudyList;
