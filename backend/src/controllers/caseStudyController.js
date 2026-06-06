const CaseStudy = require('../models/CaseStudy');

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
exports.getCaseStudies = async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });
        res.status(200).json(caseStudies);
    } catch (error) {
        console.error('Error in getCaseStudies:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single case study
// @route   GET /api/case-studies/:id
// @access  Public
exports.getCaseStudyById = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findById(req.params.id);
        
        if (!caseStudy) {
            return res.status(404).json({ message: 'Case study not found' });
        }
        
        res.status(200).json(caseStudy);
    } catch (error) {
        console.error('Error in getCaseStudyById:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create case study
// @route   POST /api/case-studies
// @access  Private/Admin
exports.createCaseStudy = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.create(req.body);
        res.status(201).json(caseStudy);
    } catch (error) {
        console.error('Error in createCaseStudy:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private/Admin
exports.updateCaseStudy = async (req, res) => {
    try {
        let caseStudy = await CaseStudy.findById(req.params.id);
        
        if (!caseStudy) {
            return res.status(404).json({ message: 'Case study not found' });
        }
        
        caseStudy = await CaseStudy.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json(caseStudy);
    } catch (error) {
        console.error('Error in updateCaseStudy:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private/Admin
exports.deleteCaseStudy = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findById(req.params.id);
        
        if (!caseStudy) {
            return res.status(404).json({ message: 'Case study not found' });
        }
        
        await caseStudy.deleteOne();
        res.status(200).json({ message: 'Case study removed' });
    } catch (error) {
        console.error('Error in deleteCaseStudy:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
