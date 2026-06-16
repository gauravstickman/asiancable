

export default function ArticlesSidebar() {


const relatedArticles = [
  "Utilizing Renewable Energy for a Sustainable Tomorrow",
  "Steering Clear of Common Mistakes in AI Writing for Renewable Energy",
  "Establishing Your Voice with ChatGPT in Renewable Energy Writing",
  "Understanding Your Audience in Renewable Energy Blogging",
  "Creating Quality AI-Enhanced Blogs in Renewable Energy",
  "Final Thoughts: Embracing AI in Renewable Energy Content Creation",
];

  return (
    <div className="sidebar-wrap md:sticky top-24 reveal-section md:min-w-[341px] md:h-[100vh]">


 <div className="space-y-4 ">
      {/* Author Card */}
      <div className="rounded-[10px] bg-[#1E3C8C] p-5 text-white hidden md:block">
        <div className="flex items-start justify-between">
          <img
            src="/assets/articles/author.png"
            alt="Author"
            className="h-[95px] w-[95px] rounded-[10px] object-cover"
          />

          <a href="#">
                   <img src="assets/articles/in.png" className="w-[30px] h-[30px] object-contain"/>

          </a>
        </div>

        <h3 className="mt-[10px]  text-[20px] leading-[100%] italic font-bold">
          David James
        </h3>

        <p className="mt-[10px] text-[16px] leading-[110%] text-white font-[400]">
          CEO at Data Innovators – Leading the charge in AI and
          analytics for customer engagement.
        </p>

        <div className="mt-5 h-px bg-white/20" />
      </div>

    <div className="w-full rounded-[10px] md:bg-[#F3F3F3]  min-w-[100%]  md:p-5 ">
      <p className="mb-5 text-[16px] font-[600] leading-[100%] text-[#152999]">
        Share with your community!
      </p>

      <div className="flex gap-5">
        <button className="flex items-center justify-center rounded bg-[#F3F3F3] text-white">
        <img src="assets/events/facebook.png" className="w-[30px] h-[30px] object-contain"/>
</button>

        <button className="flex  items-center justify-center rounded bg-[#F3F3F3] text-white">
         <img src="assets/events/twitter.png" className="w-[30px] h-[30px] object-contain"/>

        </button>

        <button className="flex  items-center justify-center rounded bg-[#F3F3F3] text-white">
        <img src="assets/events/linkedin.png" className="w-[30px] h-[30px] object-contain"/>

        </button>
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
        index === 0
          ? "border-[#1E3C8C]"
          : "border-transparent hover:border-[#1E3C8C]"
      }`}
    >
      <a
        href="#"
        className={`text-[16px] leading-[24px] tracking-[-0.02em] transition-colors duration-300 ${
          index === 0
            ? "text-[#1E3C8C]"
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