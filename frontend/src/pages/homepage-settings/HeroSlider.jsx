import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, Image, Layout, X } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';

const HeroSlider = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(null);
    
    // Media Picker States
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const { data } = await API.get('/homepage-sections/hero-slides');
            if (data.data) {
                setSlides(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch hero slides');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentSlide._id) {
                await API.put(`/homepage-sections/hero-slides/${currentSlide._id}`, currentSlide);
                toast.success('Slide updated successfully');
            } else {
                await API.post('/homepage-sections/hero-slides', currentSlide);
                toast.success('Slide created successfully');
            }
            fetchSlides();
            setModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save slide');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slide?')) return;
        try {
            await API.delete(`/homepage-sections/hero-slides/${id}`);
            toast.success('Slide deleted successfully');
            fetchSlides();
        } catch (error) {
            toast.error('Failed to delete slide');
        }
    };

    const openAddModal = () => {
        setCurrentSlide({ image: '', title: '', description: '', nextText: '', buttonText: '', buttonLink: '', page: 'Homepage' });
        setModalOpen(true);
    };

    const openEditModal = (slide) => {
        setCurrentSlide(slide);
        setModalOpen(true);
    };

    return (
        <>
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Layout size={24} className="text-blue-600" />
                        Hero Slider Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Manage the hero slides as separate database records.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus size={20} />
                    Add Slide
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 text-sm font-semibold text-slate-600">Image</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Page</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Next Text</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slides.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-500">No slides found. Click "Add Slide" to create one.</td>
                            </tr>
                        ) : (
                            slides.map((slide) => (
                                <tr key={slide._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        {slide.image ? (
                                            <img src={slide.image} alt="Slide" className="w-20 h-12 object-cover rounded shadow-sm" />
                                        ) : (
                                            <div className="w-20 h-12 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">No Img</div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-slate-600">
                                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold">{slide.page || 'Homepage'}</span>
                                    </td>
                                    <td className="p-4 font-medium text-slate-800">{slide.title || '-'}</td>
                                    <td className="p-4 text-slate-500 hidden md:table-cell">{slide.nextText || '-'}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(slide)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(slide._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            </div>

            {/* Modal */}
            {modalOpen && currentSlide && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h2 className="text-xl font-bold text-slate-800">{currentSlide._id ? 'Edit Slide' : 'Add New Slide'}</h2>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 min-h-0">
                            <form id="slideForm" onSubmit={handleSave} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Display Page</label>
                                    <select value={currentSlide.page || 'Homepage'} onChange={(e) => setCurrentSlide({ ...currentSlide, page: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                        <option value="Homepage">Homepage</option>
                                        <option value="About Us">About Us</option>
                                        <option value="Industries">Industries</option>
                                        <option value="Products">Products</option>
                                        <option value="Contact">Contact</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Image URL</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={currentSlide.image || ''} onChange={(e) => setCurrentSlide({ ...currentSlide, image: e.target.value })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        <button type="button" onClick={() => openMediaPicker((url) => setCurrentSlide({ ...currentSlide, image: url }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs">
                                            <Image size={16} /> Choose
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Main Title</label>
                                    <input type="text" value={currentSlide.title || ''} onChange={(e) => setCurrentSlide({ ...currentSlide, title: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Next Slide Text</label>
                                    <input type="text" value={currentSlide.nextText || ''} onChange={(e) => setCurrentSlide({ ...currentSlide, nextText: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Button Text</label>
                                        <input type="text" value={currentSlide.buttonText || ''} onChange={(e) => setCurrentSlide({ ...currentSlide, buttonText: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Watch Full Video" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Button Link</label>
                                        <input type="text" value={currentSlide.buttonLink || ''} onChange={(e) => setCurrentSlide({ ...currentSlide, buttonLink: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. /products" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Description</label>
                                    <textarea value={currentSlide.description || ''} onChange={(e) => setCurrentSlide({ ...currentSlide, description: e.target.value })} rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" form="slideForm" disabled={loading} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Slide'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MediaPicker isOpen={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={(url) => { if (onSelectCallback) onSelectCallback(url); }} />
        </>
    );
};

export default HeroSlider;
