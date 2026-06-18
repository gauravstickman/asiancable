type Props = {
  images: string[];
};

export default function EventGallery({
  images,
}: Props) {
  if (!images?.length) return null;

const heroImage = images[0];

const twoImages = images.slice(1, 3);

const threeImages = images.slice(3, 6); 

const anotherTwoImages = images.slice(6, 8); 

const remainingImages = images.slice(8); 







  return (
    <section className="mt-[12px] md:mt-[30px] reveal-section">


<div className="block md:hidden">
  {(() => {
    const blocks = [];
    let i = 0;

    while (i < images.length) {
      // Full width image
      blocks.push(
        <div
          key={`hero-${i}`}
          className="mt-[12px] overflow-hidden rounded-[6px]"
        >
          <img
            src={images[i]}
            alt=""
            className="w-full rounded-[6px] object-cover"
          />
        </div>
      );

      i++;

      // First row of 2
      if (i < images.length) {
        blocks.push(
          <div
            key={`row1-${i}`}
            className="mt-[12px] grid grid-cols-2 gap-[12px]"
          >
            {images.slice(i, i + 2).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className="w-full rounded-[6px] object-cover h-[204px]"
              />
            ))}
          </div>
        );
      }

      i += 2;

      // Second row of 2
      if (i < images.length) {
        blocks.push(
          <div
            key={`row2-${i}`}
            className="mt-[12px] grid grid-cols-2 gap-[12px]"
          >
            {images.slice(i, i + 2).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className="w-full rounded-[6px] object-cover h-[204px]"
              />
            ))}
          </div>
        );
      }

      i += 2;
    }

    return blocks;
  })()}
</div>

      <div className="mx-auto  md:px-0 hidden md:block">

        {/* Hero */}
        <div className="overflow-hidden rounded-[6px] md:rounded-[20px] md:min-h-[579px] md:max-h-[600px]">
          <img
            src={heroImage}
            alt=""
            className="w-full rounded-[6px] md:rounded-[20px] object-cover"
          />
        </div>

        {/* Row of 2 */}
        {twoImages.length > 0 && (
          <div className="mt-[12px] md:mt-[30px] grid grid-cols-2 gap-[12px] md:gap-[30px]">
            {twoImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[6px] md:rounded-[20px]"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full rounded-[6px] md:rounded-[20px] object-cover md:h-[409px]"
                />
              </div>
            ))}
          </div>
        )}



           {/* Rest 3 per row */}
        {threeImages.length > 0 && (
          <div className="mt-[12px] md:mt-[30px] grid grid-cols-3 gap-[12px] md:gap-[30px]">
            {threeImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[6px] md:rounded-[20px]"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full rounded-[6px] md:rounded-[20px] object-cover md:h-[409px]"
                />
              </div>
            ))}
          </div>
        )}


 {/* Row of 2 */}
        {anotherTwoImages.length > 0 && (
          <div className="mt-[12px] md:mt-[30px] grid grid-cols-2 gap-[12px] md:gap-[30px]">
            {anotherTwoImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[6px] md:rounded-[20px]"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full rounded-[6px] md:rounded-[20px] object-cover md:h-[409px]"
                />
              </div>
            ))}
          </div>
        )}

        {/* Rest 3 per row */}
        {remainingImages.length > 0 && (
          <div className="mt-[12px] md:mt-[30px] grid grid-cols-3 gap-[12px] md:gap-[30px]">
            {remainingImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[6px] md:rounded-[20px]"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full rounded-[6px] md:rounded-[20px] object-cover md:h-[409px]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}