

export default function EventShareSidebar() {
  return (
    <div className="w-full rounded-[10px] bg-[#F3F3F3] p-5 md:sticky top-24 reveal-section">
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
  );
}