import Sustainability from '@/components/pages/Sustainability/Sustainability'
import React from 'react'
import axios from 'axios'

async function getSustainabilityData() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sustainability-page`);
    return res.data?.data || null;
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