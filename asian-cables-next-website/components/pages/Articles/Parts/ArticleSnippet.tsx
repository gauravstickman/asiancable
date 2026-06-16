type ArticleSnippetProps = {
  title: string;
  content: string[];
  images?: string[];
};

export default function ArticleSnippet({
  title,
  content,
  images = [],
}: ArticleSnippetProps) {
  return (
    <section className="mt-[24px] md:mt-[30px]">
      {/* Images */}
      {images.length > 0 && (
        <div
          className={`grid gap-[16px] md:gap-[24px] ${
            images.length === 1
              ? "grid-cols-1"
              : "grid-cols-2"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[6px] md:rounded-[20px] md:mb-15"
            >
              <img
                src={image}
                alt=""
                className={`w-full object-cover ${
                  images.length === 1
                    ? "h-[240px] md:h-[579px]"
                    : "h-[180px] md:h-[477px]"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mt-[12px] md:mt-[30px]">
        <h3 className="mb-1 text-[16px] md:text-[24px] font-bold italic text-[#1E3C8C] tracking-[1%]">
          {title}
        </h3>

        <div className="mt-[20px] space-y-[24px]">
          {content.map((paragraph, index) => (
            <p
              key={index}
            className="text-[14px] md:text-[18px] leading-[150%] tracking-[-4%] text-[#1B1B1F]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}