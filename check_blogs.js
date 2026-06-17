async function testSlugAPI() {
    try {
        const slug = "creating-quality-ai-enhanced-blogs-in-renewable-energy";
        const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Response:", text.substring(0, 100)); // print first 100 chars
    } catch (e) {
        console.error(e);
    }
}
testSlugAPI();
