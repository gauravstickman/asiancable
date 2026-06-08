import ClientelePage from "@/components/pages/Clientele/ClientelePage";
import React from "react";

async function getClienteleData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientele-page`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data || null;
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
