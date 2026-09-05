import Contact from "@/components/pages/Contact/Contact";
import api from '@/utils/api';

export const dynamic = 'force-dynamic';


export default async function Page() {
  let data = null;
  try {
    const res = await api.get(`/contact-page`);
    data = res.data?.data;
  } catch (error) {
    console.error("Failed to fetch contact page data:", error);
  }
  console.log("Contact page data fetched:", data ? "Success" : "Failed");

  return <Contact data={data} />;
}
