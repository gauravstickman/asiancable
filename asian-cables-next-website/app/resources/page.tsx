import Resources from "@/components/pages/Resources/Resources";
import React from "react";
import axios from "axios";

async function getResourcesData() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resources-page`);
    return res.data?.data || null;
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
