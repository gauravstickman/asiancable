import RPGGroup from '@/components/pages/RPG-Group/RPGGroup'
import React from 'react'
import axios from 'axios'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRPGData() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rpg-group-page`);
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