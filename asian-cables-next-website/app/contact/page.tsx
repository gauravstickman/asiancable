import Contact from "@/components/pages/Contact/Contact";

export default async function Page() {
  let data = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-page`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      data = json.data;
    }
  } catch (error) {
    console.error("Failed to fetch contact page data:", error);
  }
  console.log("Contact page data fetched:", data ? "Success" : "Failed");

  return <Contact data={data} />;
}
