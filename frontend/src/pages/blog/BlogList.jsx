import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Loader2, Image, FileText, Layers, Tag, Globe, BookOpen, ChevronLeft, User, Link } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import MediaPicker from '../../components/common/MediaPicker';

const API_URL = import.meta.env.VITE_API_URL;

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Dynamic Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [sections, setSections] = useState([{ title: '', description: '', images: ['', '', ''] }]);
    const [status, setStatus] = useState('published');
    const [readTime, setReadTime] = useState('10 min');
    const [author, setAuthor] = useState({ name: '', bio: '', image: '', linkedin: '' });
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [pickerConfig, setPickerConfig] = useState({ isOpen: false, type: '', sectionIndex: null, imageIndex: null });
    const bottomRef = useRef(null);

    const handleAddSection = () => {
        setSections([...sections, { title: '', description: '', images: ['', '', ''] }]);
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [categoriesRes, blogsRes] = await Promise.all([
                API.get('/blog-categories'),
                API.get('/blogs')
            ]);
            setCategories(categoriesRes.data);
            setBlogs(blogsRes.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load initial data');
            setLoading(false);
        }
    };

    const fetchBlogs = async () => {
        try {
            const { data } = await API.get('/blogs');
            setBlogs(data);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        }
    };

    const handleOpenForm = (blog = null) => {        if (blog) {
            setSelectedBlog(blog);
            setTitle(blog.title);
            setCategory(blog.category || '');
            setDescription(blog.description || '');
            
            // Ensure 3 images array for each section
            const formattedSections = (blog.sections && blog.sections.length > 0) 
                ? blog.sections.map(s => {
                    const imgs = s.images || [];
                    return { ...s, images: [imgs[0] || '', imgs[1] || '', imgs[2] || ''] };
                }) 
                : [{ title: '', description: '', images: ['', '', ''] }];
            setSections(formattedSections);
            
            setAuthor(blog.author || { name: '', bio: '', image: '', linkedin: '' });
            setStatus(blog.status || 'published');
            setReadTime(blog.readTime || '10 min');
            setImageUrl(blog.image || '');
            setImagePreview(blog.image ? (blog.image.startsWith('http') ? blog.image : `${API_URL}/${blog.image.replace(/\\/g, '/')}`) : '');
        } else {
            setSelectedBlog(null);
            setTitle('');
            setCategory('');
            setDescription('');
            setSections([{ title: '', description: '', images: ['', '', ''] }]);
            setAuthor({ name: '', bio: '', image: '', linkedin: '' });
            setStatus('published');
            setReadTime('10 min');
            setImageUrl('');
            setImagePreview('');
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Blog title is required');
            return;
        }
        if (!category.trim()) {
            toast.error('Category is required');
            return;
        }
        if (!readTime.trim()) {
            toast.error('Read Time is required');
            return;
        }
        if (!imageUrl || !imageUrl.trim()) {
            toast.error('Banner Image is required');
            return;
        }
        setSubmitting(true);
        const payload = {
            title,
            category,
            description,
            sections: sections.map(s => ({
                title: s.title,
                description: s.description,
                images: s.images.filter(img => img.trim() !== '')
            })),
            author,
            status,
            readTime,
            image: imageUrl
        };

        try {
            if (selectedBlog) {
                // Update
                await API.put(`/blogs/${selectedBlog._id}`, payload);
                toast.success('Blog post updated successfully');
            } else {
                // Create
                await API.post('/blogs', payload);
                toast.success('Blog post created successfully');
            }
            setIsFormOpen(false);
            fetchBlogs();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await API.delete(`/blogs/${id}`);
                toast.success('Blog post deleted successfully');
                fetchBlogs();
            } catch (error) {
                toast.error('Failed to delete blog post');
            }
        }
    };

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${API_URL}/${img.replace(/\\/g, '/')}`;
    };

    // Filtered blogs list
    const filteredBlogs = blogs.filter(blog => {
        return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Reset page on search or filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Conditional Views: Form vs Grid List */}
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
                                    <BookOpen size={20} className="text-blue-600" />
                                    {selectedBlog ? 'Edit Blog Publication' : 'Add New Blog Post'}
                                </h1>
                                <p className="text-xs text-slate-500 mt-0.5">Publish articles, announcements, and events to the website homepage.</p>
                            </div>
                        </div>
                    </div>

                    {/* Dedicated Full Page Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-205 shadow-sm p-6 space-y-6 animate-in fade-in duration-200">
                        
                        {/* Section 1: Primary details */}
                        <div className="space-y-4 pb-6 border-b border-slate-150">
                            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                Publication Identity
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Tag size={14} className="text-slate-400" />
                                        Blog Title <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="e.g. Breaking: Asian Cables Expands to Europe"
                                        required
                                    />
                                </div>


                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Globe size={14} className="text-slate-400" />
                                        Publishing Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm cursor-pointer"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Layers size={14} className="text-slate-400" />
                                        Category
                                    </label>
                                    <input 
                                        type="text" 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="e.g. Renewable energy"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <BookOpen size={14} className="text-slate-400" />
                                        Read Time
                                    </label>
                                    <input 
                                        type="text" 
                                        value={readTime}
                                        onChange={(e) => setReadTime(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="e.g. 10 min read"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Image size={14} className="text-slate-400" />
                                        Banner Image URL or File
                                    </label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={imageUrl}
                                            onChange={(e) => {
                                                setImageUrl(e.target.value);
                                                setImagePreview(e.target.value ? (e.target.value.startsWith('http') ? e.target.value : `${API_URL}/${e.target.value.replace(/^\//, '').replace(/\\/g, '/')}`) : '');
                                            }}
                                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                            placeholder="Select or enter banner image URL..."
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setPickerConfig({ isOpen: true, type: 'banner' })}
                                            className="bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-xs cursor-pointer"
                                        >
                                            <Image size={16} />
                                            Choose
                                        </button>
                                    </div>
                                    
                                    {imagePreview ? (
                                        <div className="mt-4 relative w-full h-40 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-100 flex items-center justify-center animate-in fade-in duration-300">
                                            <img src={imagePreview} alt="Banner Preview" className="w-full h-full object-cover group-hover:scale-[1.01] transition-all duration-500" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => {
                                                        setImageUrl('');
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
                                        <div className="border border-dashed border-slate-300 bg-white rounded-lg p-5 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                                            <Image size={20} className="text-slate-300" />
                                            <span>No image selected. Choose an image or paste a URL above.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Author Details */}
                        <div className="space-y-4 pb-6 border-b border-slate-150">
                            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                Author Details (Optional)
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-4 space-y-3">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Image size={14} className="text-slate-400" />
                                        Author Photo
                                    </label>
                                    {author.image ? (
                                        <div className="relative w-full aspect-square max-w-[160px] rounded-2xl overflow-hidden border border-slate-300 group shadow-sm bg-slate-100 flex items-center justify-center">
                                            <img src={getImageUrl(author.image)} alt="Author" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setAuthor({ ...author, image: '' })}
                                                    className="p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition-all shadow-md"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={() => setPickerConfig({ isOpen: true, type: 'author' })}
                                            className="w-full aspect-square max-w-[160px] border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
                                        >
                                            <User size={24} className="mb-2" />
                                            <span className="text-xs font-medium">Add Photo</span>
                                        </button>
                                    )}
                                </div>

                                <div className="md:col-span-8 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                                <User size={14} className="text-slate-400" />
                                                Author Name
                                            </label>
                                            <input 
                                                type="text" 
                                                value={author.name}
                                                onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                                placeholder="e.g. David James"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                                <Link size={14} className="text-slate-400" />
                                                LinkedIn URL
                                            </label>
                                            <input 
                                                type="text" 
                                                value={author.linkedin}
                                                onChange={(e) => setAuthor({ ...author, linkedin: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                            <FileText size={14} className="text-slate-400" />
                                            Short Bio
                                        </label>
                                        <textarea 
                                            value={author.bio}
                                            onChange={(e) => setAuthor({ ...author, bio: e.target.value })}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                            placeholder="CEO at Data Innovators - Leading the charge in AI..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Dynamic Sections */}
                        <div className="space-y-4 pb-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                    <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                    Article Sections
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {sections.map((section, sIdx) => (
                                    <div key={sIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">{sIdx + 1}</span>
                                                Section {sIdx + 1}
                                            </h4>
                                            {sections.length > 1 && (
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const newSections = sections.filter((_, i) => i !== sIdx);
                                                        setSections(newSections);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-700">Section Title <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text"
                                                value={section.title}
                                                onChange={(e) => {
                                                    const newSections = [...sections];
                                                    newSections[sIdx].title = e.target.value;
                                                    setSections(newSections);
                                                }}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                                required
                                                placeholder="Enter section heading..."
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-700">Section Description <span className="text-red-500">*</span></label>
                                            <textarea 
                                                value={section.description}
                                                onChange={(e) => {
                                                    const newSections = [...sections];
                                                    newSections[sIdx].description = e.target.value;
                                                    setSections(newSections);
                                                }}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                                required
                                                placeholder="Enter detailed content for this section..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-700">Images (Optional, Max 3)</label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {[0, 1, 2].map((iIdx) => {
                                                    const imgUrl = section.images[iIdx];
                                                    return (
                                                        <div key={iIdx} className="flex flex-col gap-2">
                                                            {imgUrl ? (
                                                                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-100 flex items-center justify-center">
                                                                    <img src={getImageUrl(imgUrl)} alt="" className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <button 
                                                                            type="button" 
                                                                            onClick={() => {
                                                                                const newSections = [...sections];
                                                                                newSections[sIdx].images[iIdx] = '';
                                                                                setSections(newSections);
                                                                            }}
                                                                            className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                                                                        >
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => setPickerConfig({ isOpen: true, type: 'section', sectionIndex: sIdx, imageIndex: iIdx })}
                                                                    className="w-full h-24 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
                                                                >
                                                                    <Image size={18} />
                                                                    <span className="text-[10px] mt-1">Add Image {iIdx + 1}</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                
                                {/* Add Section Button at the Bottom */}
                                <div className="flex justify-center pt-2 pb-6" ref={bottomRef}>
                                    <button 
                                        type="button"
                                        onClick={handleAddSection}
                                        className="px-5 py-2.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-100 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 transition-all border border-blue-200 cursor-pointer shadow-sm w-full md:w-auto justify-center"
                                    >
                                        <Plus size={18} /> Add Another Section
                                    </button>
                                </div>
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
                                {selectedBlog ? 'Save Changes' : 'Create Publication'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
                            <p className="text-slate-500 mt-1">Manage separate news articles, events, and blogs category-wise.</p>
                        </div>
                        <button 
                            onClick={() => handleOpenForm()}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium cursor-pointer"
                        >
                            <Plus size={18} />
                            Add Blog Post
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search blogs..." 
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
                                            <th className="p-4 text-sm font-semibold text-slate-600">Blog Title</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 w-28 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {currentBlogs.map((blog) => (
                                                <motion.tr 
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    key={blog._id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                                >
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                                                {blog.image ? (
                                                                    <img src={getImageUrl(blog.image)} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                        <Image size={16} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-800 text-sm line-clamp-1">{blog.title}</div>
                                                                <div className="text-xs text-slate-400 mt-0.5 font-mono">/{blog.slug}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                            {blog.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button 
                                                                onClick={() => handleOpenForm(blog)}
                                                                className="p-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-md text-slate-500 transition-colors cursor-pointer"
                                                                title="Edit Blog"
                                                            >
                                                                <Edit size={14} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(blog._id)}
                                                                className="p-1.5 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-md text-slate-500 transition-colors cursor-pointer"
                                                                title="Delete Blog"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                        {filteredBlogs.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-slate-500 text-sm">
                                                    No blog posts found. Click 'Add Blog Post' to write your first article.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between pt-4">
                                    <div className="text-sm text-slate-500">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBlogs.length)} of {filteredBlogs.length} entries
                                    </div>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 rounded-md border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-8 py-1.5 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button 
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 rounded-md border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                onClose={() => setPickerConfig({ ...pickerConfig, isOpen: false })} 
                onSelect={(url) => {
                    if (pickerConfig.type === 'banner') {
                        setImageUrl(url);
                        setImagePreview(getImageUrl(url));
                    } else if (pickerConfig.type === 'section') {
                        const newSections = [...sections];
                        newSections[pickerConfig.sectionIndex].images[pickerConfig.imageIndex] = url;
                        setSections(newSections);
                    } else if (pickerConfig.type === 'author') {
                        setAuthor({ ...author, image: url });
                    }
                }} 
            />
        </div>
    );
};

export default BlogList;
