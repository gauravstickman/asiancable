import Contact from "@/components/pages/Contact/Contact";
import axios from "axios";

export default async function Page() {
  let data = null;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact-page`);
    data = res.data?.data;
  } catch (error) {
    console.error("Failed to fetch contact page data:", error);
  }
  console.log("Contact page data fetched:", data ? "Success" : "Failed");

  return <Contact data={data} />;
}
