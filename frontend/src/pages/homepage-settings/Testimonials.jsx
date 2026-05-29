import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, Image, MessageSquare, X } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    
    // Media Picker States
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await API.get('/homepage-sections/testimonials');
            if (data.data) {
                setTestimonials(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch testimonials');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentItem._id) {
                await API.put(`/homepage-sections/testimonials/${currentItem._id}`, currentItem);
                toast.success('Testimonial updated successfully');
            } else {
                await API.post('/homepage-sections/testimonials', currentItem);
                toast.success('Testimonial created successfully');
            }
            fetchData();
            setModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save testimonial');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await API.delete(`/homepage-sections/testimonials/${id}`);
            toast.success('Testimonial deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete testimonial');
        }
    };

    const openAddModal = () => {
        setCurrentItem({ image: '', name: '', role: '', text: '' });
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentItem(item);
        setModalOpen(true);
    };

    return (
        <>
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare size={24} className="text-blue-600" />
                        Testimonials Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Manage customer testimonials and reviews.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus size={20} />
                    Add Testimonial
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 text-sm font-semibold text-slate-600 w-24">Avatar</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Name & Role</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Review Text</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-500">No testimonials found. Click "Add Testimonial" to create one.</td>
                            </tr>
                        ) : (
                            testimonials.map((item) => (
                                <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        {item.image ? (
                                            <img src={item.image} alt="Avatar" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                        ) : (
                                            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-400">No Img</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">{item.name || '-'}</div>
                                        <div className="text-sm text-slate-500">{item.role || '-'}</div>
                                    </td>
                                    <td className="p-4 text-slate-500 hidden md:table-cell text-sm max-w-md truncate">{item.text || '-'}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            {modalOpen && currentItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h2 className="text-xl font-bold text-slate-800">{currentItem._id ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 min-h-0">
                            <form id="testimonialForm" onSubmit={handleSave} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Avatar Image URL</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={currentItem.image || ''} onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        <button type="button" onClick={() => openMediaPicker((url) => setCurrentItem({ ...currentItem, image: url }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs">
                                            <Image size={16} /> Choose
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Name</label>
                                        <input type="text" value={currentItem.name || ''} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Role / Position</label>
                                        <input type="text" value={currentItem.role || ''} onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Review Text</label>
                                    <textarea value={currentItem.text || ''} onChange={(e) => setCurrentItem({ ...currentItem, text: e.target.value })} rows="4" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" required></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" form="testimonialForm" disabled={loading} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Testimonial'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MediaPicker isOpen={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={(url) => { if (onSelectCallback) onSelectCallback(url); }} />
        </>
    );
};

export default Testimonials;
