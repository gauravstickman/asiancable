const Event = require('../models/Event');
const slugify = require('slugify');

exports.createEvent = async (req, res) => {
    try {
        const { title, location, duration, description, bannerImage: bodyImage, galleryImages, status } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Event title is required' });
        }
        
        let slug = slugify(title.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
        const existingEvent = await Event.findOne({ slug });
        if (existingEvent) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const bannerImage = req.file ? req.file.path : (bodyImage || '');

        const event = await Event.create({
            title,
            slug,
            location: location || '',
            duration: duration || '',
            description: description || '',
            bannerImage,
            galleryImages: galleryImages || [],
            status: status || 'published'
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { title, location, duration, description, status, galleryImages } = req.body;
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            if (title) {
                let newSlug = slugify(title.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
                if (newSlug !== event.slug) {
                    const existingEvent = await Event.findOne({ slug: newSlug });
                    if (existingEvent) {
                        newSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
                    }
                    event.slug = newSlug;
                }
            }
            
            event.location = location !== undefined ? location : event.location;
            event.duration = duration !== undefined ? duration : event.duration;
            event.description = description !== undefined ? description : event.description;
            
            if (req.file) {
                event.bannerImage = req.file.path;
            } else if (req.body.bannerImage !== undefined) {
                event.bannerImage = req.body.bannerImage;
            }

            if (galleryImages !== undefined) {
                event.galleryImages = galleryImages;
            }
            
            event.status = status || event.status;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
