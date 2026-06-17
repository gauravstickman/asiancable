const axios = require('axios');

async function testSlugAPI() {
    try {
        const slug = "creating-quality-ai-enhanced-blogs-in-renewable-energy";
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await axios.get(`${apiUrl}/blogs/slug/${slug}`);
        console.log("Status:", res.status);
        console.log("Response:", JSON.stringify(res.data).substring(0, 100)); // print first 100 chars
    } catch (e) {
        if (e.response) {
            console.error("Error Status:", e.response.status);
            console.error("Error Response:", e.response.data);
        } else {
            console.error(e.message);
        }
    }
}
testSlugAPI();
