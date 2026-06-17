import Footer from '@/components/layout/Footer'
import WebsiteNavbar from '@/components/layout/WebsiteNavbar'
import React from 'react'
import ArticleHeader from './Parts/ArticlesHeader'
import ArticlesIntroduction from './Parts/ArticlesIntroduction'
import ArticlesSidebar from './Parts/ArticlesSidebar'
import MoreBlogs from './Parts/RelatedArticles'

export type BlogType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  sections: { title: string; description: string; images: string[] }[];
  author: { name: string; bio: string; image: string; linkedin: string };
  category?: string;
  createdAt: string;
  readTime?: string;
};

function Articles({ blog }: { blog?: BlogType }) {
  if (!blog) {
    return <div>Article not found</div>;
  }

  return (
    <div>
        <WebsiteNavbar/>
        <ArticleHeader blog={blog} />
          <div className="mx-auto flex max-w-[1274px] flex-col gap-[46px] md:px-0 px-5 lg:flex-row lg:justify-between my-8 md:my-14 items-flex-start ">
          <ArticlesIntroduction blog={blog} />
          <ArticlesSidebar blog={blog} />
        </div>

        <MoreBlogs/>
        <Footer/>
    </div>
  )
}

export default Articles