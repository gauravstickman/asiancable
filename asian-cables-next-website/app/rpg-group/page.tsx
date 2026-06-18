import RPGGroup from '@/components/pages/RPG-Group/RPGGroup'
import React from 'react'
import api from '@/utils/api'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRPGData() {
  try {
    const res = await api.get(`/rpg-group-page`);
    return res.data?.success ? res.data?.data : null;
  } catch (error) {
    console.error('Failed to fetch RPG Group data:', error);
    return null;
  }
}

export default async function page() {
  const data = await getRPGData();
  
  return (
    <div> 
        <RPGGroup data={data} />
    </div>
  )
}