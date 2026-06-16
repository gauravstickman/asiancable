import Footer from '@/components/layout/Footer'
import WebsiteNavbar from '@/components/layout/WebsiteNavbar'
import React from 'react'
import ArticleHeader from './Parts/ArticlesHeader'
import ArticlesIntroduction from './Parts/ArticlesIntroduction'
import ArticlesSidebar from './Parts/ArticlesSidebar'
import MoreBlogs from './Parts/RelatedArticles'

function Articles() {
  return (
    <div>
        <WebsiteNavbar/>
        <ArticleHeader/>
          <div className="mx-auto flex max-w-[1274px] flex-col gap-[46px] md:px-0 px-5 lg:flex-row lg:justify-between my-8 md:my-14 items-flex-start ">
          <ArticlesIntroduction />
          <ArticlesSidebar />
        </div>

        <MoreBlogs/>
        <Footer/>
    </div>
  )
}

export default Articles