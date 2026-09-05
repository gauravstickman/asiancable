import ClientelePage from "@/components/pages/Clientele/ClientelePage";
import React from "react";
import api from '@/utils/api';

export const dynamic = 'force-dynamic';


async function getClienteleData() {
  try {
    const res = await api.get(`/clientele-page`);
    return res.data?.data || null;
  } catch (error) {
    console.error("Error fetching clientele page data:", error);
    return null;
  }
}

export default async function page() {
  const clienteleData = await getClienteleData();

  return (
    <div>
      <ClientelePage data={clienteleData} />
    </div>
  );
}
