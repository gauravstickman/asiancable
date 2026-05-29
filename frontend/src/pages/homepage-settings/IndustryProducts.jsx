import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, Image, Layers, X } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';

const IndustryProducts = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const { data } = await API.get('/homepage-sections/industry-products');
            if (data.data) setItems(data.data);
        } catch (error) { toast.error('Failed to fetch Industry Products'); }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentItem._id) {
                await API.put('/homepage-sections/' + 'industry-products' + '/' + currentItem._id, currentItem);
                toast.success('Updated successfully');
            } else {
                await API.post('/homepage-sections/industry-products', currentItem);
                toast.success('Created successfully');
            }
            fetchData();
            setModalOpen(false);
        } catch (error) { toast.error(error.response?.data?.message || 'Failed to save'); } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await API.delete('/homepage-sections/' + 'industry-products' + '/' + id);
            toast.success('Deleted successfully');
            fetchData();
        } catch (error) { toast.error('Failed to delete'); }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Layers size={24} className="text-blue-600" />
                        Industry Products Manager
                    </h1>
                </div>
                <button onClick={() => { setCurrentItem({"title":"","description":"","image":""}); setModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                    <Plus size={20} /> Add New
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-700 text-sm">Title</th><th className="p-4 font-semibold text-slate-700 text-sm">Description</th><th className="p-4 font-semibold text-slate-700 text-sm">Image URL</th>
                                <th className="p-4 font-semibold text-slate-700 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-sm text-slate-600">{item.title}</td><td className="p-4 text-sm text-slate-600">{item.description}</td><td className="p-4"><img src={item.image} alt="" className="w-16 h-12 object-cover rounded-md border border-slate-200" /></td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => { setCurrentItem(item); setModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">{currentItem?._id ? 'Edit' : 'Add'} Industry Products</h2>
                            <button onClick={() => setModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form id="itemForm" onSubmit={handleSave} className="space-y-5">
                                
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={currentItem.title || ''} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea rows="3" value={currentItem.description || ''} onChange={e => setCurrentItem({...currentItem, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={currentItem.image || ''} onChange={e => setCurrentItem({...currentItem, image: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                                    <button type="button" onClick={() => openMediaPicker((url) => setCurrentItem({...currentItem, image: url}))} className="bg-slate-100 px-3 py-2 border rounded-lg hover:bg-slate-200">
                                        <Image size={20} />
                                    </button>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                            <button type="submit" form="itemForm" disabled={loading} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MediaPicker isOpen={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={(url) => { if (onSelectCallback) onSelectCallback(url); }} />
        </div>
    );
};
export default IndustryProducts;