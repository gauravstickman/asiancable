import ManufacturingPage from "@/components/pages/Manufacturing/ManufacturingPage";

async function getManufacturingData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/manufacturing-page`, {
      cache: 'no-store'
    });
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching manufacturing data:", error);
    return null;
  }
}

export default async function Page() {
  const data = await getManufacturingData();
  return <ManufacturingPage data={data} />;
}
