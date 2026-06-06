import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Save, X, Image, Briefcase } from 'lucide-react';
import API from '../../api/axios';
import MediaPicker from '../../components/common/MediaPicker';

const API_URL = import.meta.env.VITE_API_URL;

const CaseStudyForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);
    
    // Media Picker state
    const [pickerOpen, setPickerOpen] = useState(false);
    const [pickerTarget, setPickerTarget] = useState('');
    const [industries, setIndustries] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        industry: '',
        location: '',
        year: '',
        client: '',
        subtitle: '',
        overview: '',
        challenge: '',
        solution: '',
        outcome: '',
        specifications: {
            productsSupplied: '',
            standardsApprovals: '',
            keyCustomisation: '',
            volumeDelivered: '',
            supplyYear: ''
        },
        bannerImage: '',
        mobileBannerImage: '',
        documentPdf: '' // now a link
    });

    useEffect(() => {
        fetchIndustries();
        if (isEditMode) {
            fetchCaseStudy();
        }
    }, [id]);

    const fetchIndustries = async () => {
        try {
            const { data } = await API.get('/industry-page');
            if (data.success && data.data) {
                setIndustries(data.data);
            }
        } catch (error) {
            console.error('Error fetching industries:', error);
        }
    };

    const fetchCaseStudy = async () => {
        try {
            const response = await API.get(`/case-studies/${id}`);
            // Ensure specifications exist to avoid undefined errors
            if (!response.data.specifications) {
                response.data.specifications = {
                    productsSupplied: '',
                    standardsApprovals: '',
                    keyCustomisation: '',
                    volumeDelivered: '',
                    supplyYear: ''
                };
            }
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching case study:', error);
            toast.error('Error loading case study');
            navigate('/admin/case-studies');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('spec_')) {
            const specName = name.replace('spec_', '');
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [specName]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${API_URL}/${img.replace(/^\//, '').replace(/\\/g, '/')}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditMode ? `/case-studies/${id}` : '/case-studies';
            if (isEditMode) {
                await API.put(url, formData);
            } else {
                await API.post(url, formData);
            }

            toast.success(`Case study ${isEditMode ? 'updated' : 'created'} successfully`);
            navigate('/admin/case-studies');
        } catch (error) {
            console.error('Save error:', error);
            toast.error(error.response?.data?.message || 'Error saving case study');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/admin/case-studies')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer"
                    >
                        <X size={16} />
                        Back to List
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Briefcase size={20} className="text-blue-600" />
                            {isEditMode ? 'Edit Case Study details' : 'Add New Case Study'}
                        </h1>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Project Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                            placeholder="e.g. 1,072 km of Armoured Fibre Optic Cables for ADNOC"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle / Brief <span className="text-red-500">*</span></label>
                        <textarea
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleInputChange}
                            required
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                            placeholder="Brief description appearing below the title"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-1">
                        <label className="text-sm font-medium text-slate-700">Client <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="client"
                            value={formData.client}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-1">
                        <label className="text-sm font-medium text-slate-700">Industry <span className="text-red-500">*</span></label>
                        <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm cursor-pointer"
                        >
                            <option value="" disabled>Select an industry</option>
                            {industries.map((ind) => (
                                <option key={ind._id} value={ind.name}>{ind.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5 md:col-span-1">
                        <label className="text-sm font-medium text-slate-700">Location <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                            placeholder="e.g. UAE / Italy"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-1">
                        <label className="text-sm font-medium text-slate-700">Year <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                        />
                    </div>

                    {/* Detailed Content */}
                    <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200">
                        <h3 className="text-md font-bold text-slate-800 mb-4">Detailed Content</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Project Overview <span className="text-red-500">*</span></label>
                                <textarea
                                    name="overview"
                                    value={formData.overview}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">The Challenge <span className="text-red-500">*</span></label>
                                <textarea
                                    name="challenge"
                                    value={formData.challenge}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">The Solution <span className="text-red-500">*</span></label>
                                <textarea
                                    name="solution"
                                    value={formData.solution}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">The Outcome <span className="text-red-500">*</span></label>
                                <textarea
                                    name="outcome"
                                    value={formData.outcome}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200">
                        <h3 className="text-md font-bold text-slate-800 mb-4">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Products Supplied</label>
                                <input
                                    type="text"
                                    name="spec_productsSupplied"
                                    value={formData.specifications?.productsSupplied || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                    placeholder="e.g. Fibre Optic Cable — Steel Wire Armoured..."
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Standards/Approvals</label>
                                <input
                                    type="text"
                                    name="spec_standardsApprovals"
                                    value={formData.specifications?.standardsApprovals || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Key Customisation</label>
                                <input
                                    type="text"
                                    name="spec_keyCustomisation"
                                    value={formData.specifications?.keyCustomisation || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Volume Delivered</label>
                                <input
                                    type="text"
                                    name="spec_volumeDelivered"
                                    value={formData.specifications?.volumeDelivered || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Supply Year</label>
                                <input
                                    type="text"
                                    name="spec_supplyYear"
                                    value={formData.specifications?.supplyYear || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media section */}
                    <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200 mt-4">
                        <h3 className="text-md font-bold text-slate-800 mb-4">Media & Downloads</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Banner Image */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700">Banner Image <span className="text-red-500">*</span></label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        name="bannerImage"
                                        value={formData.bannerImage}
                                        onChange={handleInputChange}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="Select or enter image URL..."
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setPickerTarget('bannerImage');
                                            setPickerOpen(true);
                                        }}
                                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-sm cursor-pointer"
                                    >
                                        <Image size={18} />
                                        Choose
                                    </button>
                                </div>
                                
                                {formData.bannerImage && (
                                    <div className="mt-4 relative w-40 h-40 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-50 flex items-center justify-center animate-in fade-in duration-300">
                                        <img src={getImageUrl(formData.bannerImage)} alt="Preview" className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-all duration-500" />
                                    </div>
                                )}
                            </div>

                            {/* Mobile Banner Image */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700">Mobile Banner Image</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        name="mobileBannerImage"
                                        value={formData.mobileBannerImage}
                                        onChange={handleInputChange}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="Select or enter mobile image URL..."
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setPickerTarget('mobileBannerImage');
                                            setPickerOpen(true);
                                        }}
                                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-sm cursor-pointer"
                                    >
                                        <Image size={18} />
                                        Choose
                                    </button>
                                </div>
                                
                                {formData.mobileBannerImage && (
                                    <div className="mt-4 relative w-24 h-40 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-50 flex items-center justify-center animate-in fade-in duration-300">
                                        <img src={getImageUrl(formData.mobileBannerImage)} alt="Mobile Preview" className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-all duration-500" />
                                    </div>
                                )}
                            </div>

                            {/* Downloadable PDF Link */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Downloadable PDF Link</label>
                                <input
                                    type="text"
                                    name="documentPdf"
                                    value={formData.documentPdf}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                    placeholder="Enter full URL to PDF..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 pt-6 border-t border-slate-200 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
                            {isEditMode ? 'Update Case Study' : 'Save Case Study'}
                        </button>
                    </div>

                </div>
            </form>

            <MediaPicker 
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={(url) => {
                    if (pickerTarget === 'bannerImage') {
                        setFormData(prev => ({ ...prev, bannerImage: url }));
                    } else if (pickerTarget === 'mobileBannerImage') {
                        setFormData(prev => ({ ...prev, mobileBannerImage: url }));
                    }
                    setPickerOpen(false);
                }}
            />
        </div>
    );
};

export default CaseStudyForm;
