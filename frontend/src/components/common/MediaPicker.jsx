import React, { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { X, Search, Upload, Image, Check, Loader2, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const MediaPicker = ({ isOpen, onClose, onSelect }) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState('');
    const fileInputRef = useRef(null);

    // Fetch files when picker opens
    useEffect(() => {
        if (isOpen) {
            fetchMedia();
            setSelectedUrl('');
        }
    }, [isOpen]);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/upload');
            if (data.success && data.files) {
                setMediaFiles(data.files);
            }
        } catch (error) {
            console.error('Failed to load media library', error);
            toast.error('Failed to load media library');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            const { data } = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (data.url) {
                toast.success('Uploaded successfully');
                setSelectedUrl(data.url);
                fetchMedia(); // Refresh list
            }
        } catch (error) {
            console.error('Upload failed', error);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (filename, e) => {
        e.stopPropagation(); // Prevent choosing the image when clicking delete
        
        if (!window.confirm('Are you sure you want to permanently delete this image from your server library?')) {
            return;
        }

        try {
            const { data } = await API.delete(`/upload/${filename}`);
            if (data.success) {
                toast.success('Image deleted from library');
                // Clear selection if the deleted image was the selected one
                if (selectedUrl === file.url || selectedUrl === `/uploads/${filename}`) {
                    setSelectedUrl('');
                }
                fetchMedia(); // Refresh list
            }
        } catch (error) {
            console.error('Delete failed', error);
            toast.error('Failed to delete image');
        }
    };

    if (!isOpen) return null;

    // Filter media files based on search
    const filteredFiles = mediaFiles.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectClick = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-scale-up">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Image size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Media Library</h2>
                            <p className="text-xs text-slate-500">Select an existing image or upload a new one</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center gap-4 px-6 py-4 border-b border-slate-100 bg-white">
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search images by name..."
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
                        />
                    </div>

                    {/* Upload button inside picker */}
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm w-full sm:w-auto disabled:opacity-50"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={16} />
                                    Upload New Image
                                </>
                            )}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                </div>

                {/* Gallery Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-3">
                            <Loader2 size={32} className="text-blue-600 animate-spin" />
                            <p className="text-sm text-slate-500">Loading media library...</p>
                        </div>
                    ) : filteredFiles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <Image size={40} className="text-slate-300 mb-3" />
                            <h3 className="font-semibold text-slate-700">No images found</h3>
                            <p className="text-sm text-slate-500 mt-1">Try changing your search query or upload a new image</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredFiles.map((file, idx) => {
                                const fullUrl = file.url.startsWith('http') ? file.url : `${API_URL}${file.url}`;
                                const isSelected = selectedUrl === file.url;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedUrl(file.url)}
                                        className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-white hover:shadow-md ${
                                            isSelected 
                                                ? 'border-blue-600 ring-4 ring-blue-500/10' 
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        {/* Image */}
                                        <img
                                            src={fullUrl}
                                            alt={file.name}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            loading="lazy"
                                        />

                                        {/* Name tooltip/overlay */}
                                        <div className="absolute inset-x-0 bottom-0 bg-slate-900/70 p-1.5 text-center translate-y-full group-hover:translate-y-0 transition-transform">
                                            <p className="text-[10px] text-white truncate px-1">
                                                {file.name.substring(13)} {/* remove timestamp */}
                                            </p>
                                        </div>

                                        {/* Selection Badge */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md animate-scale-up">
                                                <Check size={14} className="stroke-[3px]" />
                                            </div>
                                        )}

                                        {/* Delete Button (visible on card hover) */}
                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(file.name, e)}
                                            className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-200"
                                            title="Delete Image"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
                    <div className="text-xs text-slate-500">
                        {selectedUrl ? (
                            <span className="text-blue-600 font-medium truncate max-w-[200px] sm:max-w-xs block">
                                Selected: {selectedUrl.split('/').pop()}
                            </span>
                        ) : (
                            'Choose an image to proceed'
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSelectClick}
                            disabled={!selectedUrl}
                            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 text-sm font-semibold px-5 py-2 rounded-xl transition-all shadow-sm disabled:shadow-none"
                        >
                            Use Selected Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaPicker;
