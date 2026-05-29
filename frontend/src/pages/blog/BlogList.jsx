import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Loader2, Image, FileText, Layers, Tag, Globe, BookOpen, ChevronLeft } from 'lucide-react';
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
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

    // Dynamic Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('published');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

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

    const handleOpenForm = (blog = null) => {
        if (categories.length === 0) {
            toast.error('Please create at least one Blog Category first!');
            return;
        }

        if (blog) {
            setSelectedBlog(blog);
            setTitle(blog.title);
            setCategory(blog.category?._id || blog.category || '');
            setDescription(blog.description || '');
            setContent(blog.content || '');
            setStatus(blog.status || 'published');
            setImageUrl(blog.image || '');
            setImagePreview(blog.image ? (blog.image.startsWith('http') ? blog.image : `${API_URL}/${blog.image.replace(/\\/g, '/')}`) : '');
        } else {
            setSelectedBlog(null);
            setTitle('');
            setCategory(categories[0]?._id || '');
            setDescription('');
            setContent('');
            setStatus('published');
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
        if (!category) {
            toast.error('Please select a category');
            return;
        }

        setSubmitting(true);
        const payload = {
            title,
            category,
            description,
            content,
            status,
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
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const categoryId = blog.category?._id || blog.category;
        const matchesCategory = selectedCategoryFilter ? categoryId === selectedCategoryFilter : true;
        
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Reset page on search or filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategoryFilter]);

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
                                        <Layers size={14} className="text-slate-400" />
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm cursor-pointer"
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
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
                            </div>
                        </div>

                        {/* Section 2: Featured Media */}
                        <div className="space-y-4 pb-6 border-b border-slate-150">
                            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                Featured Banner Media
                            </h3>
                            
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
                                        onClick={() => setPickerOpen(true)}
                                        className="bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-650 font-semibold text-xs cursor-pointer"
                                    >
                                        <Image size={16} />
                                        Choose
                                    </button>
                                </div>
                                
                                {imagePreview ? (
                                    <div className="mt-4 relative w-full h-56 rounded-lg overflow-hidden border border-slate-300 group shadow-sm bg-slate-100 flex items-center justify-center animate-in fade-in duration-300">
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

                        {/* Section 3: Write-up */}
                        <div className="space-y-4 pb-2">
                            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                                Publication Copy
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <FileText size={14} className="text-slate-400" />
                                        Brief Description (Homepage Snippet)
                                    </label>
                                    <textarea 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                        placeholder="Write a brief, catchy summary for the homepage grid block..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <BookOpen size={14} className="text-slate-400" />
                                        Full Article Body
                                    </label>
                                    <textarea 
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={8}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm resize-none"
                                        placeholder="Write the full, rich details of your publication article..."
                                    />
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
                        <div className="relative min-w-[200px]">
                            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                value={selectedCategoryFilter}
                                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                                className="w-full bg-white border border-slate-205 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
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
                                            <th className="p-4 text-sm font-semibold text-slate-600">Category</th>
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
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                            {blog.category?.name || 'Uncategorized'}
                                                        </span>
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
                isOpen={pickerOpen} 
                onClose={() => setPickerOpen(false)} 
                onSelect={(url) => {
                    setImageUrl(url);
                    setImagePreview(getImageUrl(url));
                }} 
            />
        </div>
    );
};

export default BlogList;
