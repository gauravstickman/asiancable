import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Loader2, Image, FileText, Globe, ChevronLeft, MapPin, Calendar, LayoutGrid } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import MediaPicker from '../../components/common/MediaPicker';

const API_URL = import.meta.env.VITE_API_URL;

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Dynamic Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [status, setStatus] = useState('published');
    const [bannerImage, setBannerImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [pickerConfig, setPickerConfig] = useState({ isOpen: false, type: '', imageIndex: null });
    const galleryEndRef = useRef(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await API.get('/events');
            setEvents(res.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch events');
            setLoading(false);
        }
    };

    const handleOpenForm = (event = null) => {
        if (event) {
            setSelectedEvent(event);
            setTitle(event.title);
            setLocation(event.location || '');
            setDuration(event.duration || '');
            setDescription(event.description || '');
            setGalleryImages(event.galleryImages || []);
            setStatus(event.status || 'published');
            setBannerImage(event.bannerImage || '');
            setImagePreview(event.bannerImage ? (event.bannerImage.startsWith('http') ? event.bannerImage : `${API_URL}/${event.bannerImage.replace(/\\/g, '/')}`) : '');
        } else {
            setSelectedEvent(null);
            setTitle('');
            setLocation('');
            setDuration('');
            setDescription('');
            setGalleryImages([]);
            setStatus('published');
            setBannerImage('');
            setImagePreview('');
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Event title is required');
            return;
        }
        if (!bannerImage || !bannerImage.trim()) {
            toast.error('Banner Image is required');
            return;
        }
        
        if (galleryImages.length === 0) {
            toast.error('At least one Gallery Image is required');
            return;
        }
        
        const hasEmptySlot = galleryImages.some(img => !img || img.trim() === '');
        if (hasEmptySlot) {
            toast.error('Please upload an image for all added gallery slots, or remove the empty slots.');
            return;
        }

        setSubmitting(true);
        const payload = {
            title,
            location,
            duration,
            description,
            galleryImages,
            status,
            bannerImage
        };

        try {
            if (selectedEvent) {
                // Update
                await API.put(`/events/${selectedEvent._id}`, payload);
                toast.success('Event updated successfully');
            } else {
                // Create
                await API.post('/events', payload);
                toast.success('Event created successfully');
            }
            setIsFormOpen(false);
            fetchEvents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await API.delete(`/events/${id}`);
                toast.success('Event deleted successfully');
                fetchEvents();
            } catch (error) {
                toast.error('Failed to delete event');
            }
        }
    };

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${API_URL}/${img.replace(/\\/g, '/')}`;
    };

    // Filtered events list
    const filteredEvents = events.filter(event => {
        return event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Reset page on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
            {isFormOpen ? (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsFormOpen(false)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-650 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={16} />
                                Back
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Globe size={20} className="text-blue-600" />
                                    {selectedEvent ? 'Edit Event' : 'Create New Event'}
                                </h1>
                                <p className="text-xs text-slate-500 mt-0.5">Fill in the details for your event</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-205 shadow-sm p-6 space-y-6 animate-in fade-in duration-200">
                        {/* Section 1: Primary Details */}
                        <div className="space-y-4 pb-6 border-b border-slate-150">
                            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                Primary Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <FileText size={14} className="text-slate-400" />
                                        Event Title <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="e.g. Wire & Cable India 2025"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <MapPin size={14} className="text-slate-400" />
                                        Location
                                    </label>
                                    <input 
                                        type="text" 
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="e.g. Pragati Maidan, New Delhi"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Calendar size={14} className="text-slate-400" />
                                        Duration
                                    </label>
                                    <input 
                                        type="text" 
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="e.g. 4-Day Exhibition"
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Globe size={14} className="text-slate-400" />
                                        Publishing Status
                                    </label>
                                    <select 
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 cursor-pointer appearance-none text-sm"
                                    >
                                        <option value="published">Published (Visible)</option>
                                        <option value="draft">Draft (Hidden)</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Image size={14} className="text-slate-400" />
                                        Featured Banner Media <span className="text-red-500">*</span>
                                    </label>
                                    {bannerImage ? (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-100">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => {
                                                        setBannerImage('');
                                                        setImagePreview('');
                                                    }}
                                                    className="p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 shadow-md transition-all cursor-pointer border border-red-500"
                                                    title="Remove Image"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={() => setPickerConfig({ isOpen: true, type: 'banner' })}
                                            className="w-full h-32 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
                                        >
                                            <Image size={24} className="mb-2" />
                                            <span className="text-sm font-medium">Select Banner Image</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Content Description */}
                        <div className="space-y-4 pb-6 border-b border-slate-150">
                            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                Event Recap
                            </h3>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                    <FileText size={14} className="text-slate-400" />
                                    Full Event Description
                                </label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={8}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-y"
                                    placeholder="Write the event summary..."
                                />
                            </div>
                        </div>

                        {/* Section 3: Gallery */}
                        <div className="space-y-4 pb-2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                    <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                    Gallery Images
                                </h3>
                            </div>

                            {galleryImages.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryImages.map((img, idx) => (
                                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-50">
                                            {img ? (
                                                <>
                                                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button 
                                                            type="button" 
                                                            onClick={() => {
                                                                const newGallery = [...galleryImages];
                                                                newGallery[idx] = '';
                                                                setGalleryImages(newGallery);
                                                            }}
                                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <button 
                                                    type="button"
                                                    onClick={() => setPickerConfig({ isOpen: true, type: 'gallery', imageIndex: idx })}
                                                    className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
                                                >
                                                    <Image size={20} className="mb-1" />
                                                    <span className="text-[10px] uppercase font-bold">Select Image</span>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-slate-400 text-sm border border-dashed border-slate-300 rounded-lg">
                                    No gallery images added yet. Click 'Add Image Slot' to upload photos.
                                </div>
                            )}

                            <div className="mt-6 flex justify-center" ref={galleryEndRef}>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setGalleryImages([...galleryImages, '']);
                                        setTimeout(() => {
                                            galleryEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                        }, 100);
                                    }}
                                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-blue-200 shadow-sm cursor-pointer"
                                >
                                    <Plus size={16} /> Add Image Slot
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end pt-5 border-t border-slate-205">
                            <button 
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="px-5 py-2.5 rounded-lg text-slate-655 hover:bg-slate-50 font-medium border border-slate-200 text-sm transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {submitting && <Loader2 className="animate-spin" size={14} />}
                                {selectedEvent ? 'Save Changes' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Events</h1>
                            <p className="text-slate-500 mt-1">Manage events, exhibitions, and gallery photos.</p>
                        </div>
                        <button 
                            onClick={() => handleOpenForm()}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium cursor-pointer"
                        >
                            <Plus size={18} />
                            Add Event
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search events..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-blue-600" size={40} />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="p-4 text-sm font-semibold text-slate-600">Event Title</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Location</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 w-28 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {currentEvents.map((event) => (
                                                <motion.tr 
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    key={event._id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                                >
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                                                {event.bannerImage ? (
                                                                    <img src={getImageUrl(event.bannerImage)} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                        <Image size={16} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-800 text-sm line-clamp-1">{event.title}</div>
                                                                <div className="text-xs text-slate-400 mt-0.5 font-mono">/{event.slug}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="text-xs text-slate-600 font-medium">
                                                            {event.location || '-'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                            {event.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button 
                                                                onClick={() => handleOpenForm(event)}
                                                                className="p-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-md text-slate-500 transition-colors cursor-pointer"
                                                                title="Edit Event"
                                                            >
                                                                <Edit size={14} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(event._id)}
                                                                className="p-1.5 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-md text-slate-500 transition-colors cursor-pointer"
                                                                title="Delete Event"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                            {currentEvents.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="p-8 text-center text-slate-500 text-sm">
                                                        No events found. Create your first event!
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between pt-4">
                                    <div className="text-sm text-slate-500 font-medium">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEvents.length)} of {filteredEvents.length} entries
                                    </div>
                                    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                                        <button 
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
                                        >
                                            Prev
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button 
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-50 text-slate-600'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button 
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            <MediaPicker 
                isOpen={pickerConfig.isOpen} 
                onClose={() => setPickerConfig({ isOpen: false, type: '', imageIndex: null })} 
                onSelect={(url) => {
                    if (pickerConfig.type === 'banner') {
                        setBannerImage(url);
                        setImagePreview(url.startsWith('http') || url.startsWith('data:') ? url : `${API_URL}/${url.replace(/\\/g, '/')}`);
                    } else if (pickerConfig.type === 'gallery') {
                        const newGallery = [...galleryImages];
                        newGallery[pickerConfig.imageIndex] = url;
                        setGalleryImages(newGallery);
                    }
                }} 
            />
        </div>
    );
};

export default EventList;
