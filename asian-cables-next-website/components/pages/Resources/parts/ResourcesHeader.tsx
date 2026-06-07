
function ResourcesHeader() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[600px] overflow-hidden">
        <img
          src="/assets/resources/headerbgIcon.png"
          alt="Manufacturing Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 mx-auto md:px-0 px-5 max-w-7xl pt-100 md:pt-60 pb-[60px] text-white">
          <p className= "font-['Magistral'] text-[#FFFFFF] font-bold italic md:text-center text-[36px] leading-[140%] md:text-[68px] md:leading-[64.6px] tracking-[-3.4px] ">
            Resources
          </p>
          <p className="mt-6 md:mt-0 text-[#FFFFFFE5] font-normal md:text-center text-[16px] leading-[26px] md:text-[20px] md:leading-[34px] tracking-[0px]">Access our resource library to arrive at an informed decision.</p>
        </div>
      </section>
    </main>
  );
}

export default ResourcesHeader;
