import React from "react";
import AboutHeader from "./parts/AboutHeader";
import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import Footer from "@/components/layout/Footer";
import CompanyValuesSection from "./parts/CompanyValuesSection";
import GovernanceSection from "./parts/GovernanceSection";
import LeadershipTeam from "./parts/LeadershipTeam";
import OurJourney from "./parts/OurJourney";

function About() {
  return (
    <div>
      <WebsiteNavbar />
      <AboutHeader />
      <CompanyValuesSection />
      <OurJourney/>
      <GovernanceSection/>
      <LeadershipTeam/>
      <Footer />
    </div>
  );
}

export default About;
