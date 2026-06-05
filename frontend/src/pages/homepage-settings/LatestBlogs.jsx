import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Save, Layout, FileText, MessageSquare, Image, Cpu } from 'lucide-react';
import MediaPicker from '../../components/common/MediaPicker';
// Removed ReactQuill imports

const LatestBlogs = () => {
    const activeTab = 'blogs';
    const [loading, setLoading] = useState(false);

    // Media Picker States
    const [pickerOpen, setPickerOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState(null);

    const openMediaPicker = (callback) => {
        setOnSelectCallback(() => callback);
        setPickerOpen(true);
    };
    
    // States for different sections
    const [slides, setSlides] = useState([]);
    const [aboutUs, setAboutUs] = useState({ text: '' });
    const [testimonials, setTestimonials] = useState([]);
    const [facts, setFacts] = useState({
        presence: { title: '', description: '' },
        decades: { title: '', subtitle: '', description: '' },
        capacity: { title: '', subtitle: '', description: '' },
        annual: { value: '', title: '', description: '' }
    });
    const [applications, setApplications] = useState({
        main: { title: '', description: '', image: '', link: '' },
        small1: { title: '', image: '', link: '' },
        small2: { title: '', image: '', link: '' },
        wide: { title: '', image: '', link: '' }
    });
    const [engineering, setEngineering] = useState({
        heading: '',
        image: '',
        items: []
    });
    const [provenFields, setProvenFields] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchHomepage();
    }, []);

    const fetchHomepage = async () => {
        try {
            const { data } = await API.get('/homepage');
            if (data.data) {
                if (data.data.heroSlides) setSlides(data.data.heroSlides);
                if (data.data.aboutUs) setAboutUs(data.data.aboutUs);
                if (data.data.testimonials) setTestimonials(data.data.testimonials);
                if (data.data.facts && Object.keys(data.data.facts).length > 0) setFacts(data.data.facts);
                if (data.data.applications && Object.keys(data.data.applications).length > 0) setApplications(data.data.applications);
                if (data.data.provenFields) setProvenFields(data.data.provenFields);
                if (data.data.blogs) setBlogs(data.data.blogs);
                if (data.data.engineering && Object.keys(data.data.engineering).length > 0) {
                    setEngineering({
                        heading: data.data.engineering.heading || '',
                        image: data.data.engineering.image || '',
                        items: data.data.engineering.items || []
                    });
                }
            }
        } catch (error) {
            toast.error('Failed to fetch homepage data');
        }
    };

    const handleFileUpload = async (e, onUploadSuccess) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true);
            const { data } = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUploadSuccess(data.url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload = {
                heroSlides: slides,
                aboutUs,
                testimonials,
                facts,
                applications,
                provenFields,
                blogs,
                engineering
            };
            await API.put('/homepage', payload);
            toast.success('Homepage settings updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update homepage');
        } finally {
            setLoading(false);
        }
    };

    // Hero Slide Handlers
    const handleAddSlide = () => setSlides([...slides, { image: '', title: '', description: '', nextText: '' }]);
    const handleRemoveSlide = (index) => setSlides(slides.filter((_, i) => i !== index));
    const handleSlideChange = (index, field, value) => {
        const newSlides = [...slides];
        newSlides[index][field] = value;
        setSlides(newSlides);
    };

    // Testimonial Handlers
    const handleAddTestimonial = () => setTestimonials([...testimonials, { name: '', role: '', text: '', image: '' }]);
    const handleRemoveTestimonial = (index) => setTestimonials(testimonials.filter((_, i) => i !== index));
    const handleTestimonialChange = (index, field, value) => {
        const newTests = [...testimonials];
        newTests[index][field] = value;
        setTestimonials(newTests);
    };

    // Proven Fields Handlers
    const handleAddProvenField = () => setProvenFields([...provenFields, { tag: '', title: '', description: '', image: '', badges: '' }]);
    const handleRemoveProvenField = (index) => setProvenFields(provenFields.filter((_, i) => i !== index));
    const handleProvenFieldChange = (index, field, value) => {
        const newFields = [...provenFields];
        newFields[index][field] = value;
        setProvenFields(newFields);
    };

    // Blog Handlers
    const handleAddBlog = () => setBlogs([...blogs, { tag: 'Blog', title: '', description: '', image: '' }]);
    const handleRemoveBlog = (index) => setBlogs(blogs.filter((_, i) => i !== index));
    const handleBlogChange = (index, field, value) => {
        const newBlogs = [...blogs];
        newBlogs[index][field] = value;
        setBlogs(newBlogs);
    };

    // Engineering Handlers
    const handleAddEngineeringItem = () => {
        setEngineering({
            ...engineering,
            items: [...(engineering.items || []), { title: '', content: '' }]
        });
    };
    const handleRemoveEngineeringItem = (index) => {
        setEngineering({
            ...engineering,
            items: (engineering.items || []).filter((_, i) => i !== index)
        });
    };
    const handleEngineeringItemChange = (index, field, value) => {
        const newItems = [...(engineering.items || [])];
        newItems[index][field] = value;
        setEngineering({
            ...engineering,
            items: newItems
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Latest Blogs</h1>
                    
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Content Area */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
                    
                    {/* HERO SLIDER TAB */}
                    {activeTab === 'hero' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Hero Slider Configuration</h2>
                                    <p className="text-sm text-slate-500">Add or edit the main banners at the top of the homepage.</p>
                                </div>
                                <button onClick={handleAddSlide} className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                                    <Plus size={16} /> Add Slide
                                </button>
                            </div>
                            <div className="space-y-6">
                                {slides.map((slide, index) => (
                                    <div key={index} className="p-5 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                        <button onClick={() => handleRemoveSlide(index)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                        <h3 className="text-sm font-bold text-slate-700 mb-4">Slide {index + 1}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={slide.image || ''} onChange={(e) => handleSlideChange(index, 'image', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                                                    <button type="button" onClick={() => openMediaPicker((url) => handleSlideChange(index, 'image', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                        <Image size={16} />
                                                        Choose
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Main Title</label>
                                                <input type="text" value={slide.title || ''} onChange={(e) => handleSlideChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Slide title" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Next Slide Text</label>
                                                <input type="text" value={slide.nextText || ''} onChange={(e) => handleSlideChange(index, 'nextText', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Text for next button..." />
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Description</label>
                                                <textarea value={slide.description || ''} onChange={(e) => handleSlideChange(index, 'description', e.target.value)} rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Slide description..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {slides.length === 0 && <div className="text-center py-8 text-slate-500">No slides configured.</div>}
                            </div>
                        </div>
                    )}

                    {/* ABOUT US TAB */}
                    {activeTab === 'about' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">About Us Section</h2>
                                <p className="text-sm text-slate-500">Configure the scrolling text reveal section.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">About Paragraph Text</label>
                                    <textarea 
                                        value={aboutUs.text || ''} 
                                        onChange={(e) => setAboutUs({ ...aboutUs, text: e.target.value })}
                                        rows={8}
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 text-sm"
                                        placeholder="Write about your company here..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TESTIMONIALS TAB */}
                    {activeTab === 'testimonials' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Client Testimonials</h2>
                                    <p className="text-sm text-slate-500">Manage the scrolling testimonial cards.</p>
                                </div>
                                <button onClick={handleAddTestimonial} className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                                    <Plus size={16} /> Add Testimonial
                                </button>
                            </div>
                            <div className="space-y-6">
                                {testimonials.map((test, index) => (
                                    <div key={index} className="p-5 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                        <button onClick={() => handleRemoveTestimonial(index)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                        <h3 className="text-sm font-bold text-slate-700 mb-4">Testimonial {index + 1}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Client Name</label>
                                                <input type="text" value={test.name || ''} onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Role / Company</label>
                                                <input type="text" value={test.role || ''} onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="CEO | Acme Corp" />
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Avatar Image URL</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={test.image || ''} onChange={(e) => handleTestimonialChange(index, 'image', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/src/assets/avatar.png or https://..." />
                                                    <button type="button" onClick={() => openMediaPicker((url) => handleTestimonialChange(index, 'image', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                        <Image size={16} />
                                                        Choose
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Testimonial Quote</label>
                                                <textarea value={test.text || ''} onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)} rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder='"They did an amazing job..."'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {testimonials.length === 0 && <div className="text-center py-8 text-slate-500">No testimonials configured.</div>}
                            </div>
                        </div>
                    )}

                    {/* FACTS TAB */}
                    {activeTab === 'facts' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">Facts Section</h2>
                                <p className="text-sm text-slate-500">Configure the four fact cards shown on the homepage.</p>
                            </div>
                            <div className="space-y-6">
                                {/* Presence Card */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">1. Presence Card (Top Left)</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={facts.presence?.title || ''} onChange={(e) => setFacts({ ...facts, presence: { ...facts.presence, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Title (e.g., Presence in 90+ Countries)" />
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Flags Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={facts.presence?.image || ''} onChange={(e) => setFacts({ ...facts, presence: { ...facts.presence, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Flags Image URL" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setFacts({ ...facts, presence: { ...facts.presence, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                        <textarea value={facts.presence?.description || ''} onChange={(e) => setFacts({ ...facts, presence: { ...facts.presence, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                                    </div>
                                </div>
                                {/* Decades Card */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">2. Decades Card (Bottom Left 1)</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={facts.decades?.title || ''} onChange={(e) => setFacts({ ...facts, decades: { ...facts.decades, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Large Title (e.g., 6+ Decades)" />
                                        <input type="text" value={facts.decades?.subtitle || ''} onChange={(e) => setFacts({ ...facts, decades: { ...facts.decades, subtitle: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Subtitle" />
                                        <textarea value={facts.decades?.description || ''} onChange={(e) => setFacts({ ...facts, decades: { ...facts.decades, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                                    </div>
                                </div>
                                {/* Capacity Card */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">3. Capacity Card (Bottom Left 2)</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={facts.capacity?.title || ''} onChange={(e) => setFacts({ ...facts, capacity: { ...facts.capacity, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Large Title (e.g., Up To 220 KV)" />
                                        <input type="text" value={facts.capacity?.subtitle || ''} onChange={(e) => setFacts({ ...facts, capacity: { ...facts.capacity, subtitle: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Subtitle" />
                                        <textarea value={facts.capacity?.description || ''} onChange={(e) => setFacts({ ...facts, capacity: { ...facts.capacity, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                                    </div>
                                </div>
                                {/* Annual Card */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">4. Annual Capacity (Right Side Image Card)</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={facts.annual?.value || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, value: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Big Overlay Value (e.g., 3600 Km)" />
                                        <input type="text" value={facts.annual?.title || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Bottom Title" />
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Background Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={facts.annual?.image || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Background Image URL" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setFacts({ ...facts, annual: { ...facts.annual, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                        <textarea value={facts.annual?.description || ''} onChange={(e) => setFacts({ ...facts, annual: { ...facts.annual, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPLICATIONS TAB */}
                    {activeTab === 'applications' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">Applications Section</h2>
                                <p className="text-sm text-slate-500">Configure the 4 application images and texts.</p>
                            </div>
                            <div className="space-y-6">
                                {/* Main App */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">1. Main Application (Large Left Card)</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={applications.main?.title || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Title (e.g., Oil & Gas)" />
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={applications.main?.image || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Image URL" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, main: { ...applications.main, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Link URL</label>
                                            <input type="text" value={applications.main?.link || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, link: e.target.value } })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/oil-gas" />
                                        </div>
                                        <textarea value={applications.main?.description || ''} onChange={(e) => setApplications({ ...applications, main: { ...applications.main, description: e.target.value } })} rows={4} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                                    </div>
                                </div>
                                {/* Small App 1 */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">2. Top Right Box 1</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={applications.small1?.title || ''} onChange={(e) => setApplications({ ...applications, small1: { ...applications.small1, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Title (e.g., Power Plants)" />
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={applications.small1?.image || ''} onChange={(e) => setApplications({ ...applications, small1: { ...applications.small1, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Image URL" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, small1: { ...applications.small1, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Link URL</label>
                                            <input type="text" value={applications.small1?.link || ''} onChange={(e) => setApplications({ ...applications, small1: { ...applications.small1, link: e.target.value } })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/power-plants" />
                                        </div>
                                    </div>
                                </div>
                                {/* Small App 2 */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">3. Top Right Box 2</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={applications.small2?.title || ''} onChange={(e) => setApplications({ ...applications, small2: { ...applications.small2, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Title (e.g., Utilities)" />
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={applications.small2?.image || ''} onChange={(e) => setApplications({ ...applications, small2: { ...applications.small2, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Image URL" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, small2: { ...applications.small2, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Link URL</label>
                                            <input type="text" value={applications.small2?.link || ''} onChange={(e) => setApplications({ ...applications, small2: { ...applications.small2, link: e.target.value } })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/utilities" />
                                        </div>
                                    </div>
                                </div>
                                {/* Wide App */}
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">4. Bottom Right Wide Box</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={applications.wide?.title || ''} onChange={(e) => setApplications({ ...applications, wide: { ...applications.wide, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Title (e.g., Industrial & Heavy Engineering)" />
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={applications.wide?.image || ''} onChange={(e) => setApplications({ ...applications, wide: { ...applications.wide, image: e.target.value } })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Image URL" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setApplications({ ...applications, wide: { ...applications.wide, image: url } }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Link URL</label>
                                            <input type="text" value={applications.wide?.link || ''} onChange={(e) => setApplications({ ...applications, wide: { ...applications.wide, link: e.target.value } })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., /applications/industrial" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PROVEN FIELDS TAB */}
                    {activeTab === 'provenFields' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Proven Fields Section</h2>
                                    <p className="text-sm text-slate-500">Manage the proven field slider cards.</p>
                                </div>
                                <button onClick={handleAddProvenField} className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                                    <Plus size={16} /> Add Field
                                </button>
                            </div>
                            <div className="space-y-6">
                                {provenFields.map((field, index) => (
                                    <div key={index} className="p-5 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                        <button onClick={() => handleRemoveProvenField(index)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                        <h3 className="text-sm font-bold text-slate-700 mb-4">Project {index + 1}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Tag (e.g. RENEWABLES)</label>
                                                <input type="text" value={field.tag || ''} onChange={(e) => handleProvenFieldChange(index, 'tag', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tag" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={field.image || ''} onChange={(e) => handleProvenFieldChange(index, 'image', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/src/assets/proven.png" />
                                                    <button type="button" onClick={() => openMediaPicker((url) => handleProvenFieldChange(index, 'image', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                        <Image size={16} />
                                                        Choose
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Title</label>
                                                <input type="text" value={field.title || ''} onChange={(e) => handleProvenFieldChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Project Title" />
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Description</label>
                                                <textarea value={field.description || ''} onChange={(e) => handleProvenFieldChange(index, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Write description..." />
                                            </div>
                                            <div className="space-y-1 md:col-span-2 mt-4">
                                                <label className="text-sm font-medium text-slate-700">Badges (Comma separated)</label>
                                                <input type="text" value={field.badges || ''} onChange={(e) => handleProvenFieldChange(index, 'badges', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="High Efficiency, High Load Capacity" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {provenFields.length === 0 && <div className="text-center py-8 text-slate-500">No proven fields configured.</div>}
                            </div>
                        </div>
                    )}

                    {/* BLOGS TAB */}
                    {activeTab === 'blogs' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Latest Blogs & Events Configuration</h2>
                                    <p className="text-sm text-slate-500">Add or edit blogs, events, and news featured on the homepage.</p>
                                </div>
                                <button onClick={handleAddBlog} className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                                    <Plus size={16} /> Add Blog
                                </button>
                            </div>
                            <div className="space-y-6">
                                {blogs.map((blog, index) => (
                                    <div key={index} className="p-5 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                        <button onClick={() => handleRemoveBlog(index)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                        <h3 className="text-sm font-bold text-slate-700 mb-4">Blog / Event {index + 1}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Type / Tag (e.g. Event, Blog)</label>
                                                <input type="text" value={blog.tag || ''} onChange={(e) => handleBlogChange(index, 'tag', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Event" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-slate-700">Image URL</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={blog.image || ''} onChange={(e) => handleBlogChange(index, 'image', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/uploads/blog.jpg" />
                                                    <button type="button" onClick={() => openMediaPicker((url) => handleBlogChange(index, 'image', url))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                        <Image size={16} />
                                                        Choose
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Title</label>
                                                <input type="text" value={blog.title || ''} onChange={(e) => handleBlogChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Blog Title" />
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700">Description</label>
                                                <textarea value={blog.description || ''} onChange={(e) => handleBlogChange(index, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white" placeholder="Write a short description..." />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {blogs.length === 0 && <div className="text-center py-8 text-slate-500">No blogs or events configured.</div>}
                            </div>
                        </div>
                    )}

                    {/* ENGINEERING TAB */}
                    {activeTab === 'engineering' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Engineering Trust & Progress Section</h2>
                                    <p className="text-sm text-slate-500">Configure the accordion cards and main heading for this section.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <h3 className="text-sm font-bold text-slate-700 mb-4">Header & Left Image</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Section Heading</label>
                                            <input type="text" value={engineering.heading || ''} onChange={(e) => setEngineering({ ...engineering, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Engineering Trust. Enabling Progress." />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Left Image URL</label>
                                            <div className="flex gap-2">
                                                <input type="text" value={engineering.image || ''} onChange={(e) => setEngineering({ ...engineering, image: e.target.value })} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/src/assets/engineering.png" />
                                                <button type="button" onClick={() => openMediaPicker((url) => setEngineering({ ...engineering, image: url }))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-300 flex items-center justify-center gap-1.5 text-slate-600 font-semibold text-xs" title="Choose from Library">
                                                    <Image size={16} />
                                                    Choose
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold text-slate-700">Accordion Items</h3>
                                        <button onClick={handleAddEngineeringItem} className="flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-md">
                                            <Plus size={14} /> Add Item
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {(engineering.items || []).map((item, index) => (
                                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-white relative group">
                                                <button onClick={() => handleRemoveEngineeringItem(index)} className="absolute top-3 right-3 p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={16} />
                                                </button>
                                                <h4 className="text-xs font-bold text-slate-500 mb-3">Item {index + 1}</h4>
                                                <div className="space-y-3">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-slate-600">Title</label>
                                                        <input type="text" value={item.title || ''} onChange={(e) => handleEngineeringItemChange(index, 'title', e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm" placeholder="e.g. Renewable Energy Cables" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-slate-600">Content / Description</label>
                                                        <textarea value={item.content || ''} onChange={(e) => handleEngineeringItemChange(index, 'content', e.target.value)} rows={3} className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white" placeholder="Write item details..." />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {(engineering.items || []).length === 0 && (
                                            <div className="text-center py-6 text-xs text-slate-500 bg-white border border-dashed rounded-lg">
                                                No accordion items configured. Clicking 'Save' will revert this section to default static items.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            
            {/* Reusable Premium Media Picker Modal */}
            <MediaPicker 
                isOpen={pickerOpen} 
                onClose={() => setPickerOpen(false)} 
                onSelect={(url) => {
                    if (onSelectCallback) onSelectCallback(url);
                }} 
            />
        </div>
    );
};

export default LatestBlogs;
