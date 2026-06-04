"use client";

import Footer from "../../layout/Footer";
import WebsiteNavbar from "../../layout/WebsiteNavbar";
import TestimonialsSection from "../../pages/LifeAtAsianCables/parts/TestimonialsSection";
import CultureValuesSection from "../../pages/LifeAtAsianCables/parts/CultureValuesSection";
import DayInLifeSection from "../../pages/LifeAtAsianCables/parts/DayInLifeSection";
import ExperienceSection from "../../pages/LifeAtAsianCables/parts/ExperienceSection";
import Hero from "../../pages/LifeAtAsianCables/parts/Hero";
import LifeBeyondWorkSection from "../../pages/LifeAtAsianCables/parts/LifeBeyondWorkSection";
import OpenRolesSection from "../../pages/LifeAtAsianCables/parts/OpenRolesSection";
import WhyWorkSection from "../../pages/LifeAtAsianCables/parts/Whyworksection";

const Life = () => {
  return (
    <div>
      <WebsiteNavbar />

    <Hero/>
    <WhyWorkSection/> 
<CultureValuesSection/>
<ExperienceSection/>
<TestimonialsSection/> 
<DayInLifeSection/>
<LifeBeyondWorkSection/>
<OpenRolesSection/>
      <Footer />
    </div>
  );
};

export default Life;