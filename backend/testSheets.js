require('dotenv').config({ path: 'C:/asian_cables/asiancable/backend/.env' });
const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function testGoogleSheets() {
    console.log("Starting test...");
    try {
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive'
            ],
        });

        const doc = new GoogleSpreadsheet(
            process.env.GOOGLE_SHEET_ID_job,
            serviceAccountAuth
        );

        console.log("Loading doc info...");
        await doc.loadInfo();
        console.log("Doc title:", doc.title);
        
        let sheet = doc.sheetsByIndex[0];
        console.log("First sheet title:", sheet.title);
        
    } catch (e) {
        console.error("Error occurred:");
        console.error(e.message);
        if (e.response && e.response.data) {
            console.error(e.response.data);
        }
    }
}

testGoogleSheets();
