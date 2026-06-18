"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import api from '@/utils/api';

export default function MoreBlogs({ currentSlug }: { currentSlug?: string }) {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`/blogs`);
        let allBlogs = [];
        if (Array.isArray(response.data)) {
          allBlogs = response.data;
        } else if (response.data?.success && Array.isArray(response.data.data)) {
          allBlogs = response.data.data;
        }
        
        // Filter out the current blog
        const filtered = currentSlug ? allBlogs.filter((b: any) => b.slug !== currentSlug) : allBlogs;
        setBlogs(filtered);
      } catch (error) {
        console.error("Failed to fetch related blogs:", error);
      }
    };
    fetchBlogs();
  }, [currentSlug]);

  if (blogs.length === 0) return null;

  return (
    <section className="mt-[0px] md:mt-[110px]">
      <div className="flex items-center justify-between max-w-[1274px] mx-auto md:px-0 px-5">
        <h2 className="font-[magistral] text-[32px] leading-[50px] md:text-[46px] md:leading-[52.2px] tracking-[-0.92px] font-bold italic text-[#1E3C8C]">
          More Blogs
        </h2>

        <Link href="/articles" className="border-it-w hidden md:ml-0 md:flex h-[48px] w-[162px] w-fit justify-center items-center py-3 px-6 gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174]">
              View All
              <span>
                <ChevronRight size={18} />
              </span>
        </Link>
      </div>
<div className="more-posts  ml-5 md:ml-[80px]">
     <Swiper
  slidesPerView={1.4}
  spaceBetween={16}
  grabCursor={true}
  breakpoints={{
    768: {
      slidesPerView: 2.2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 24,
    },
  }}
  className="mt-[30px] md:mt-[60px] mb-10"
>
  {blogs.map((blog) => (
    <SwiperSlide key={blog._id} className="rounded-[20px] bg-white shadow-[0px_4px_24px_0px_#00000026] md:mx-3 mb-5 md:mb-10 rounded-t-[20px]">
          <Link
            key={blog._id}
            href={`/articles/${blog.slug}`}
            className="min-w-[320px] md:min-w-[380px] overflow-hidden rounded-[16px] bg-white shadow-[0px_4px_20px_0px_#00000014] rounded-t-[20px] block"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={blog.image || "/assets/articles/image-1.jpg"}
                alt={blog.title}
                className="h-[180px] md:h-[334px] w-full object-cover rounded-t-[20px]"
              />
  <div
    className="absolute inset-0 rounded-t-[20px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(30, 60, 140, 0.5) 19.31%, rgba(246, 248, 254, 0) 100%)",
    }}
  />
              <div className="absolute left-5 top-5 rounded-[6px] bg-[#ffffff] md:bg-[#FFB300] px-2 py-1 md:px-3 md:py-2 text-[12px] font-medium text-black uppercase">
                {blog.category || "BLOG"}
              </div>

              <span className="absolute md:right-5 md:top-5 right-5 bottom-5 text-[12px] text-white uppercase">
                {blog.readTime || "5 MIN READ"}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="mb-2 md:mb-3 line-clamp-2 text-[12px] leading-[14px] md:text-[20px] md:leading-[30px] font-[600] text-[#1E3C8C]">
                {blog.title}
              </p>

              <p className="mb-4 md:mb-6 line-clamp-3 text-[10px] leading-[12px] md:text-[16px] md:leading-[26px] text-[#525252]">
                {blog.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-[12px] leading-[100%]  md:text-[20px] md:leading-[29.42px] tracking-[-0.46px] font-medium text-[#1E3C8C]">
                Read blog
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
         </SwiperSlide>
  ))}
</Swiper>
</div>
      <div className="mt-0 mb-8 md:hidden">
       <Link href="/articles" className="border-it-w mx-auto md:ml-0 flex h-[48px] w-[162px] w-fit justify-center items-center py-3 px-6 gap-[6px] rounded-[5.52px] bg-[#1E3C8C] text-[20px] font-medium text-white transition hover:bg-[#163174]">
              View All
              <span>
                <ChevronRight size={18} />
              </span>
            </Link>
      </div>
    </section>
  );
}