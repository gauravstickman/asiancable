import Resources from "@/components/pages/Resources/Resources";
import React from "react";

async function getResourcesData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources-page`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching resources page data:", error);
    return null;
  }
}

export default async function page() {
  const resourcesData = await getResourcesData();

  return (
    <div>
      <Resources data={resourcesData} />
    </div>
  );
}
