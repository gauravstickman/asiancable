import Articles from '@/components/pages/Articles/Articles'
import React from 'react'
import { notFound } from 'next/navigation'

async function getBlogData(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/slug/${slug}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogData(resolvedParams.slug);
  
  if (!blog) {
    notFound();
  }

  return (
    <div><Articles blog={blog} /></div>
  )
}
