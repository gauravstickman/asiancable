import Sustainability from '@/components/pages/Sustainability/Sustainability'
import React from 'react'
import api from '@/utils/api'

export const dynamic = 'force-dynamic';


async function getSustainabilityData() {
  try {
    const res = await api.get(`/sustainability-page`);
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