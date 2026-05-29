const IndustryPage = require('../models/IndustryPage');

exports.getSettings = async (req, res) => {
    try {
        let settings = await IndustryPage.findOne();
        if (!settings) {
            settings = await IndustryPage.create({
                stats: [
                    { value: "3600 Km/Yr", label: "EHV Cable Production" },
                    { value: "60+ Yrs", label: "Cable Manufacturing Expertise" },
                    { value: "NABL", label: "Accredited Testing Lab" }
                ],
                projects: [
                    { company: "ONGC", title: "Offshore Platform Electrification", description: "Complete cable solution...", image: "/src/assets/ip1.png", tags: ["High Efficiency"] }
                ],
                trustedLogos: ["/src/assets/jica.svg", "/src/assets/gprc.svg", "/src/assets/csiro.svg"],
                products: [
                    { title: "Instrumentation Cables", description: "Feature high-quality copper conductors...", image: "/src/assets/product1.png" }
                ],
                impacts: [
                    { icon: "/src/assets/impact2.svg", title: "Advanced Cable Engineering", description: "High-performance power cables..." }
                ],
                applications: [
                    { title: "Onshore Drilling", image: "/src/assets/ia1.png" }
                ]
            });
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await IndustryPage.findOne();
        if (!settings) {
            settings = new IndustryPage(req.body);
            await settings.save();
        } else {
            settings = await IndustryPage.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
        }
        res.status(200).json({ success: true, data: settings, message: "Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
