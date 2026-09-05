import Resources from "@/components/pages/Resources/Resources";
import React from "react";
import api from '@/utils/api';

export const dynamic = 'force-dynamic';

async function getResourcesData() {
  try {
    const res = await api.get(`/resources-page`);
    console.log("resources-page", res);

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
