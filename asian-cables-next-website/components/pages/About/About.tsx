"use client";

import React, { useEffect, useState } from "react";
import AboutHeader from "./parts/AboutHeader";
import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import Footer from "@/components/layout/Footer";
import CompanyValuesSection from "./parts/CompanyValuesSection";
import GovernanceSection from "./parts/GovernanceSection";
import LeadershipTeam from "./parts/LeadershipTeam";
import OurJourney from "./parts/OurJourney";
import api, { getBaseUrl } from "../../../utils/api";
import LeadershipStatic from "./parts/LeadershipStatic";

function About() {
  const [dynamicData, setDynamicData] = useState<any>(null);

  useEffect(() => {
    api.get("/about-page")
      .then((res) => {
        if (res.data && res.data.success) {
          // Normalize images with base URL if needed
          const data = res.data.data;
          setDynamicData(data);
        }
      })
      .catch((error) => console.warn("Error fetching about page settings:", error));
  }, []);

  return (
    <div>
      <WebsiteNavbar />
      <AboutHeader dynamicData={dynamicData} />
      <CompanyValuesSection dynamicData={dynamicData} />
      <OurJourney dynamicData={dynamicData} />
      <GovernanceSection dynamicData={dynamicData} />
      {/* <LeadershipTeam dynamicData={dynamicData} /> */}
<LeadershipStatic
  onCloseSanjay={() => {}}
  onCloseGarima={() => {}}
  onCloseKushal={() => {}}
/>    <Footer />
    </div>
  );
}

export default About;
