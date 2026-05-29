import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, Save, Image, Cpu, X } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';

const Engineering = () => {
    // Header States
    const [headerData, setHeaderData] = useState({ heading: '', image: '' });
    const [headerLoading, setHeaderLoading] = useState(false);

    // Items States
    const [items, setItems] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(false);
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
        fetchHeader();
        fetchItems();
    }, []);

    const fetchHeader = async () => {
        try {
            const { data } = await API.get('/homepage-sections/single/engineering-header');
            if (data.data) {
                setHeaderData({
                    heading: data.data.heading || '',
                    image: data.data.image || ''
                });
            }
        } catch (error) {
            toast.error('Failed to fetch engineering header');
        }
    };

    const fetchItems = async () => {
        try {
            const { data } = await API.get('/homepage-sections/engineering-items');
            if (data.data) {
                setItems(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch engineering items');
        }
    };

    const handleSaveHeader = async () => {
        setHeaderLoading(true);
        try {
            await API.put('/homepage-sections/single/engineering-header', headerData);
            toast.success('Header updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update header');
        } finally {
            setHeaderLoading(false);
        }
    };

    const handleSaveItem = async (e) => {
        e.preventDefault();
        setItemsLoading(true);
        try {
            if (currentItem._id) {
                await API.put(`/homepage-sections/engineering-items/${currentItem._id}`, currentItem);
                toast.success('Item updated successfully');
            } else {
                await API.post('/homepage-sections/engineering-items', currentItem);
                toast.success('Item created successfully');
            }
            fetchItems();
            setModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save item');
        } finally {
            setItemsLoading(false);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await API.delete(`/homepage-sections/engineering-items/${id}`);
            toast.success('Item deleted successfully');
            fetchItems();
        } catch (error) {
            toast.error('Failed to delete item');
        }
    };

    const openAddModal = () => {
        setCurrentItem({ title: '', content: '' });
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentItem(item);
        setModalOpen(true);
    };

    return (
        <>
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Cpu size={24} className="text-blue-600" />
                        Engineering Manager
                    </h1>
                    <p className="text-slate-500 mt-1">Manage the engineering section header and accordion items.</p>
                </div>
            </div>

            {/* Header Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">1. Section Header & Image</h2>
                    <button onClick={handleSaveHeader} disabled={headerLoading} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 font-medium text-sm">
                        <Save size={18} />
                        {headerLoading ? 'Saving...' : 'Save Header'}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Section Heading</label>
                        <input type="text" value={headerData.heading || ''} onChange={(e) => setHeaderData({ ...headerData, heading: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Engineering Trust. Enabling Progress." />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Left Image URL</label>
                        <div className="flex gap-2">
                            <input type="text" value={headerData.image || ''} onChange={(e) => setHeaderData({ ...headerData, image: e.target.value })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Image URL" />
                            <button type="button" onClick={() => openMediaPicker((url) => setHeaderData({ ...headerData, image: url }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs">
                                <Image size={16} /> Choose
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
                    <h2 className="text-lg font-semibold text-slate-800">2. Accordion Items</h2>
                    <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm">
                        <Plus size={18} /> Add Accordion Item
                    </button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 text-sm font-semibold text-slate-600">Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Content</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-slate-500">No accordion items found. Click "Add Item" to create one.</td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-medium text-slate-800">{item.title || '-'}</td>
                                    <td className="p-4 text-slate-500 hidden md:table-cell text-sm max-w-lg truncate">{item.content || '-'}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDeleteItem(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                            <h2 className="text-xl font-bold text-slate-800">{currentItem._id ? 'Edit Item' : 'Add New Item'}</h2>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 min-h-0">
                            <form id="engineeringForm" onSubmit={handleSaveItem} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Title</label>
                                    <input type="text" value={currentItem.title || ''} onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Content / Description</label>
                                    <textarea value={currentItem.content || ''} onChange={(e) => setCurrentItem({ ...currentItem, content: e.target.value })} rows="4" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" required></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" form="engineeringForm" disabled={itemsLoading} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                                {itemsLoading ? 'Saving...' : 'Save Item'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MediaPicker isOpen={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={(url) => { if (onSelectCallback) onSelectCallback(url); }} />
        </>
    );
};

export default Engineering;
