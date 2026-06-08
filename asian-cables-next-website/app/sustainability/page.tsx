import Sustainability from '@/components/pages/Sustainability/Sustainability'
import React from 'react'

async function getSustainabilityData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sustainability-page`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch sustainability data:', error);
    return null;
  }
}

export default async function page() {
  const data = await getSustainabilityData();

  return (
    <div>
        <Sustainability data={data} />
    </div>
  )
}