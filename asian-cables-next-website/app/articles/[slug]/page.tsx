import Articles from '@/components/pages/Articles/Articles'
import React from 'react'
import { notFound } from 'next/navigation'
import api from '@/utils/api'

import { Metadata, ResolvingMetadata } from 'next';

async function getBlogData(slug: string) {
  try {
    const res = await api.get(`/blogs/slug/${slug}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogData(resolvedParams.slug);

  if (!blog) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${blog.title} | Asian Cables`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.image || '/assets/articles/image-1.jpg',
          alt: blog.title,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.image || '/assets/articles/image-1.jpg'],
    },
  };
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
