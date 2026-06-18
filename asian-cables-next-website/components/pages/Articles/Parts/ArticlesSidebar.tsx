"use client";
import { BlogType } from "../Articles";
import { useState, useEffect } from "react";

export default function ArticlesSidebar({ blog }: { blog?: BlogType }) {
  const [activeSection, setActiveSection] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");

  const relatedArticles = blog?.sections?.map(s => s.title) || [];

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const handleScroll = () => {
      const sections = relatedArticles.map((_, index) => document.getElementById(`section-${index}`));
      let currentActive = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActive = i;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog?.sections?.length]);

  return (
    <div className="sidebar-wrap md:sticky top-24  md:min-w-[341px] md:h-[100vh]">


 <div className="space-y-4 ">
      {/* Author Card */}
      <div className="rounded-[10px] bg-[#1E3C8C] p-5 text-white hidden md:block">
        <div className="flex items-start justify-between">
          <img
            src={blog?.author?.image || "/assets/articles/author.png"}
            alt={blog?.author?.name || "Author"}
            className="h-[95px] w-[95px] rounded-[10px] object-cover"
          />

          <a href={blog?.author?.linkedin || "#"} target={blog?.author?.linkedin ? "_blank" : "_self"} rel="noopener noreferrer">
                   <img src="/assets/articles/in.png" alt="LinkedIn" className="w-[30px] h-[30px] object-contain"/>
          </a>
        </div>

        <h3 className="mt-[10px]  text-[20px] leading-[100%] italic font-bold">
          {blog?.author?.name || "David James"}
        </h3>

        <p className="mt-[10px] text-[16px] leading-[110%] text-white font-[400]">
          {blog?.author?.bio || "CEO at Data Innovators – Leading the charge in AI and analytics for customer engagement."}
        </p>

        <div className="mt-5 h-px bg-white/20" />
      </div>

    <div className="w-full rounded-[10px] md:bg-[#F3F3F3]  min-w-[100%]  md:p-5 ">
      <p className="mb-5 text-[16px] font-[600] leading-[100%] text-[#152999]">
        Share with your community!
      </p>

      <div className="flex gap-5">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded bg-[#F3F3F3] hover:bg-slate-200 transition-colors"
        >
          <img src="/assets/events/facebook.png" alt="Facebook" className="w-[30px] h-[30px] object-contain" />
        </a>

        <a 
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog?.title || '')}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded bg-[#F3F3F3] hover:bg-slate-200 transition-colors"
        >
         <img src="/assets/events/twitter.png" alt="Twitter" className="w-[30px] h-[30px] object-contain" />
        </a>

        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded bg-[#F3F3F3] hover:bg-slate-200 transition-colors"
        >
          <img src="/assets/events/linkedin.png" alt="LinkedIn" className="w-[30px] h-[30px] object-contain" />
        </a>
      </div>
    </div>

      {/* Related Articles */}
      <div className="hidden md:block">
        <p className="mt-10 mb-5 text-[20px] font-medium text-[#1B1B1F]">
          In this article
        </p>

    <div className="space-y-5">
  {relatedArticles.map((article, index) => (
    <div
      key={index}
      className={`group pl-5 border-l-[3px] transition-all duration-300 ${
        index === activeSection
          ? "border-[#1E3C8C]"
          : "border-transparent hover:border-[#1E3C8C]"
      }`}
    >
      <a
        href={`#section-${index}`}
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById(`section-${index}`);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
        className={`text-[16px] leading-[24px] tracking-[-0.02em] transition-colors duration-300 block ${
          index === activeSection
            ? "text-[#1E3C8C] font-semibold"
            : "text-[#666666] group-hover:text-[#1E3C8C]"
        }`}
      >
        {article}
      </a>
    </div>
  ))}
</div>
      </div>
    </div>

</div>
   
  );
}