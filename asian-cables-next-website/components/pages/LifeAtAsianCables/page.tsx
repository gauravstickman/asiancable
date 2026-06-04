"use client";

import Footer from "../../layout/Footer";
import WebsiteNavbar from "../../layout/WebsiteNavbar";
import TestimonialsSection from "./parts/TestimonialsSection";
import CultureValuesSection from "./parts/CultureValuesSection";
import DayInLifeSection from "./parts/DayInLifeSection";
import ExperienceSection from "./parts/ExperienceSection";
import Hero from "./parts/Hero";
import LifeBeyondWorkSection from "./parts/LifeBeyondWorkSection";
import OpenRolesSection from "./parts/OpenRolesSection";
import WhyWorkSection from "./parts/Whyworksection";

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