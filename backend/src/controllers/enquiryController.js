const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const sendEmail = require('../utils/sendEmail');
const Enquiry = require('../models/Enquiry');

exports.submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, company, inquiryType, message } = req.body;

        if (!name || !email || !phone || !inquiryType || !message) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // 1. Save to MongoDB
        const enquiry = await Enquiry.create({
            name, email, phone, company, inquiryType, message
        });

        // 2. Send Email
        const emailMessage = `
You have received a new General Enquiry.

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || 'N/A'}
Inquiry Type: ${inquiryType}

Message:
${message}
`;

        try {
            if (process.env.ADMIN_EMAIL) {
                await sendEmail({
                    email: "asiancablesdev@gmail.com",
                    subject: `New Enquiry from ${name} - ${inquiryType}`,
                    message: emailMessage
                });
            } else {
                console.warn("ADMIN_EMAIL not set, skipping email notification.");
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        // 3. Save to Google Sheets
        // 3. Save to Google Sheets
        try {
            console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
            console.log('GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'SET' : 'NOT SET');
            console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID);

            if (
                process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
                process.env.GOOGLE_PRIVATE_KEY &&
                process.env.GOOGLE_SHEET_ID
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

                let sheet = doc.sheetsByIndex[0];

                // Agar koi sheet nahi hai to create kar do
                if (!sheet) {
                    sheet = await doc.addSheet({
                        title: 'Enquiries',
                        headerValues: [
                            'Date',
                            'Name',
                            'Email',
                            'Phone',
                            'Company',
                            'Inquiry Type',
                            'Message'
                        ]
                    });
                }

                // Header check karo
                try {
                    await sheet.loadHeaderRow();

                    const headers = sheet.headerValues || [];

                    if (headers.length === 0) {
                        await sheet.setHeaderRow([
                            'Date',
                            'Name',
                            'Email',
                            'Phone',
                            'Company',
                            'Inquiry Type',
                            'Message'
                        ]);
                    }
                } catch (err) {
                    console.log('Creating header row...');

                    await sheet.setHeaderRow([
                        'Date',
                        'Name',
                        'Email',
                        'Phone',
                        'Company',
                        'Inquiry Type',
                        'Message'
                    ]);
                }

                // Data insert
                await sheet.addRow({
                    Date: new Date().toLocaleString('en-IN'),
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Company: company || 'N/A',
                    'Inquiry Type': inquiryType,
                    Message: message
                });

                console.log('✅ Data saved to Google Sheet');
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
            data: enquiry,
            message: 'Enquiry submitted successfully'
        });

    } catch (error) {
        console.error('Submit enquiry error:', error);
        res.status(500).json({ success: false, message: 'Server error while submitting enquiry' });
    }
};
