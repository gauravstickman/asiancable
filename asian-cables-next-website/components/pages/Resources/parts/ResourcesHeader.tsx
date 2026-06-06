
function ResourcesHeader() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[600px] overflow-hidden">
        <img
          src="/assets/resources/headerbgIcon.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 mx-auto px-2 max-w-7xl pt-60 pb-[60px] text-white">
          <p className= "font-['Magistral'] text-[#FFFFFF] font-bold italic text-center text-[68px] leading-[64.6px] tracking-[-3.4px] ">
            Resources
          </p>
          <p className="text-[#FFFFFFE5] font-normal text-center text-[20px] leading-[34px] tracking-[0px]">Access our resource library to arrive at an informed decision.</p>
        </div>
      </section>
    </main>
  );
}

export default ResourcesHeader;
