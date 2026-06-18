const ManufacturingPage = require('../models/ManufacturingPage');

// Get or initialize the single manufacturing page document
exports.get = async (req, res) => {
    try {
        let page = await ManufacturingPage.findOne();
        if (!page) {
            // Auto-create default document if none exists
            page = await ManufacturingPage.create({
                infraSlides: [
                    {
                        title: 'Integrated Manufacturing Systems',
                        description: 'Manufacturing is distributed across two specialised facilities in Vadodara and Mysuru, each aligned to specific cable categories and voltage ranges.',
                        image: '',
                        highlights: [
                            { title: 'EHV / HV / Railway', subtitle: 'Vadodara Facility Focus' },
                            { title: 'LT / Telecom / Optical Fibre', subtitle: 'Mysuru Facility Focus' },
                            { title: 'End-to-End Integration', subtitle: 'From Conductor to Final Testing' }
                        ]
                    }
                ],
                productionUnits: [
                    { name: 'Unit 1, Vadodara', image: '' },
                    { name: 'Unit 2, Mysore', image: '' }
                ],
                standardsCardStats: [
                    { value: '90+', label: 'Countries Served' },
                    { value: 'Multi-Standard Compliance', label: 'IEC | BS | IS | AS/NZS' },
                    { value: 'Cross-Sector Deployment', label: 'Utilities | Infra | Industrial' }
                ],
                featureCards: [
                    { title: 'Advanced Technology', description: 'Integrated production processes with controlled manufacturing and in-line quality checks ensure precision, repeatability, and consistency across product categories.', image: '' },
                    { title: 'Sustainable Operations', description: 'Manufacturing facilities operate with renewable energy integration, water recycling systems, and energy-efficient processes, reducing environmental impact across operations.', image: '' }
                ],
                certifications: [
                    { logo: '', name: 'IEC', description: 'International Electrotechnical Commission' },
                    { logo: '', name: 'DSIR Recognition', description: 'In-house R&D approved by Government of India' }
                ],
                qualityItems: [
                    { type: 'certification', logo: '', title: 'ISO 9001', subtitle: 'Certifications', file: '' },
                    { type: 'certification', logo: '', title: 'ISO 14001', subtitle: 'Certifications', file: '' },
                    { type: 'certification', logo: '', title: 'ISO 45001', subtitle: 'Certifications', file: '' },
                    { type: 'compliance', logo: '', title: 'IEC', subtitle: 'Compliance', file: '' } 
                ]
            });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update the manufacturing page document
exports.update = async (req, res) => {
    try {
        let page = await ManufacturingPage.findOne();
        if (!page) {
            page = await ManufacturingPage.create(req.body);
        } else {
            page = await ManufacturingPage.findByIdAndUpdate(
                page._id,
                req.body,
                { returnDocument: 'after', runValidators: true }
            );
        }
        res.status(200).json({ success: true, data: page, message: 'Manufacturing page settings saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
