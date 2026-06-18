import { BlogType } from "../Articles";
import ArticleSnippet from "./ArticleSnippet";

export default function ArticlesIntroduction({ blog }: { blog?: BlogType }) {
  if (!blog) return null;

  const firstSection = blog.sections?.[0];
  const remainingSections = blog.sections?.slice(1) || [];

  return (
    <div className="md:pr-[90px]">

      {/* Author Card Mobile */}
      {/* Author Card */}
      <div className="rounded-[10px] bg-[#ffffff] p-4 text-[#1E3C8C] md:hidden flex items-center justify-between shadow-[0px_4px_3px_0px_#0000001A] mt-[-75px] mb-[35px] relative">
        <div className="flex items-start justify-between">
          <img
            src={blog.author?.image || "/assets/articles/author.png"}
            alt={blog.author?.name || "Author"}
            className="h-[67px] w-[67px] rounded-[10px] object-cover"
          />
        </div>
        <div className="autor-info">
          <h3 className="text-[14px] leading-[100%] italic font-bold">
            {blog.author?.name || "David James"}
          </h3>

          <p className="mt-[11px] text-[12px] leading-[110%] text-[#1E3C8C] font-[400]">
            {blog.author?.bio || "CEO at Data Innovators"}
          </p>
        </div>

        <a href={blog.author?.linkedin || "#"} target={blog.author?.linkedin ? "_blank" : "_self"} rel="noopener noreferrer">
          <img src="/assets/articles/in.png" className="w-[30px] h-[30px] object-contain" />
        </a>
      </div>

      <h2 className="mb-1 text-[16px] md:text-[24px] font-bold italic text-[#1E3C8C] tracking-[1%]">
        {firstSection?.title}
      </h2>

      <div id="section-0" className="md:mt-5 md:space-y-8">

        {firstSection?.description?.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => (
          <p key={`p-${idx}`} className="text-[14px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]">
            {paragraph}
          </p>
        ))}

        {firstSection?.images?.[0] && (
          <div className="featured-image mt-[30px]">
            {/* Hero */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[20px] md:min-h-[450px]  md:max-h-[477px]">
              <img
                src={firstSection.images[0].startsWith('http') ? firstSection.images[0] : `${process.env.NEXT_PUBLIC_BASE_URL}/${firstSection.images[0]}`}
                alt=""
                className="w-full rounded-[20px] md:rounded-[20px] object-cover"
              />
            </div>
          </div>
        )}

        {(firstSection?.images?.[1] || firstSection?.images?.[2]) && (
          <div className="grid grid-cols-2 gap-[24px] mt-[24px] md:mt-[30px]">
            {firstSection.images[1] && (
              <div className="overflow-hidden rounded-[20px] md:rounded-[20px] md:mb-15">
                <img
                  src={firstSection.images[1].startsWith('http') ? firstSection.images[1] : `${process.env.NEXT_PUBLIC_BASE_URL}/${firstSection.images[1]}`}
                  alt=""
                  className="w-full rounded-[20px] md:rounded-[20px] object-cover h-[180px] md:h-[477px]"
                />
              </div>
            )}
            
            {firstSection.images[2] && (
              <div className="overflow-hidden rounded-[20px] md:rounded-[20px] md:mb-15">
                <img
                  src={firstSection.images[2].startsWith('http') ? firstSection.images[2] : `${process.env.NEXT_PUBLIC_BASE_URL}/${firstSection.images[2]}`}
                  alt=""
                  className="w-full rounded-[20px] md:rounded-[20px] object-cover h-[180px] md:h-[477px]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* this will repeat */}
      {remainingSections.map((section, index) => (
        <div key={index} id={`section-${index + 1}`}>
          <ArticleSnippet
            images={section.images ? section.images.map(img => img.startsWith('http') ? img : `${process.env.NEXT_PUBLIC_BASE_URL}/${img}`) : []}
            title={section.title}
            content={section.description ? section.description.split('\n').filter(p => p.trim() !== '') : []}
          />
        </div>
      ))}

      <div className="mt-8 h-px bg-[#DDDDDD] md:hidden " />
    </div>
  );
}