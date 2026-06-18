const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const sendEmail = require('../utils/sendEmail');
const JobApplication = require('../models/JobApplication');

exports.submitApplication = async (req, res) => {
    try {
        const { name, email, phone, jobPosition } = req.body;

        if (!name || !email || !phone || !jobPosition) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a resume' });
        }

        const resumeUrl = req.file.location || req.file.path || '';

        // 1. Save to MongoDB
        const application = await JobApplication.create({
            name, email, phone, jobPosition, resumeUrl
        });

        // 2. Send Email
        const emailMessage = `
You have received a new Job Application.

Name: ${name}
Email: ${email}
Phone: ${phone}
Job Position: ${jobPosition}
Resume: ${resumeUrl}
`;

        try {
            if (process.env.ADMIN_EMAIL) {
                await sendEmail({
                    email: "asiancablesdev@gmail.com",
                    subject: `New Job Application from ${name} - ${jobPosition}`,
                    message: emailMessage
                });
            } else {
                console.warn("ADMIN_EMAIL not set, skipping email notification.");
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        // 3. Save to Google Sheets
        try {
            if (
                process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
                process.env.GOOGLE_PRIVATE_KEY &&
                process.env.GOOGLE_SHEET_ID_job
            ) {
                const serviceAccountAuth = new JWT({
                    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    scopes: [
                        'https://www.googleapis.com/auth/spreadsheets',
                        'https://www.googleapis.com/auth/drive'
                    ],
                });

                const doc = new GoogleSpreadsheet(
                    process.env.GOOGLE_SHEET_ID,
                    serviceAccountAuth
                );

                await doc.loadInfo();

                // Find or create sheet named 'Job Applications'
                let sheet = doc.sheetsByTitle['Job Applications'];

                if (!sheet) {
                    sheet = await doc.addSheet({
                        title: 'Job Applications',
                        headerValues: [
                            'Date',
                            'Name',
                            'Email',
                            'Phone',
                            'Job Position',
                            'Resume URL'
                        ]
                    });
                } else {
                    try {
                        await sheet.loadHeaderRow();
                        const headers = sheet.headerValues || [];
                        if (headers.length === 0) {
                            await sheet.setHeaderRow([
                                'Date',
                                'Name',
                                'Email',
                                'Phone',
                                'Job Position',
                                'Resume URL'
                            ]);
                        }
                    } catch (err) {
                        await sheet.setHeaderRow([
                            'Date',
                            'Name',
                            'Email',
                            'Phone',
                            'Job Position',
                            'Resume URL'
                        ]);
                    }
                }

                // Data insert
                await sheet.addRow({
                    Date: new Date().toLocaleString('en-IN'),
                    Name: name,
                    Email: email,
                    Phone: phone,
                    'Job Position': jobPosition,
                    'Resume URL': resumeUrl
                });

                console.log('✅ Job Application saved to Google Sheet');
            } else {
                console.warn(
                    'Google Sheet credentials not set, skipping spreadsheet insert.'
                );
            }
        } catch (sheetError) {
            console.error('Error saving to Google Sheets:', sheetError);
        }

        res.status(201).json({
            success: true,
            data: application,
            message: 'Application submitted successfully'
        });

    } catch (error) {
        console.error('Submit application error:', error);
        res.status(500).json({ success: false, message: 'Server error while submitting application' });
    }
};
