import ClientelePage from "@/components/pages/Clientele/ClientelePage";
import React from "react";
import axios from "axios";

async function getClienteleData() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clientele-page`);
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
