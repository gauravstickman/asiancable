import ManufacturingPage from "@/components/pages/Manufacturing/ManufacturingPage";
import axios from "axios";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getManufacturingData() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/manufacturing-page`);
    return res.data?.success ? res.data?.data : null;
  } catch (error) {
    console.error("Error fetching manufacturing data:", error);
    return null;
  }
}
export default async function Page() {
  const data = await getManufacturingData();
  return <ManufacturingPage data={data} />;
}
