import RPGGroup from '@/components/pages/RPG-Group/RPGGroup'
import React from 'react'

async function getRPGData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rpg-group-page`, {
      cache: 'no-store'
    });
    const result = await res.json();
    return result.success ? result.data : null;
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