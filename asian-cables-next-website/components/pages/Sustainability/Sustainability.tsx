import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import React from "react";
import SustainabilityHeader from "./parts/SustainabilityHeader";
import Footer from "@/components/layout/Footer";
import CertificationsAccreditations from "./parts/CertificationsAccreditations";
import SustainabilityOutlook from "./parts/SustainabilityOutlook";
import SustainabilityHighlights from "./parts/SustainabilityHighlights";

function Sustainability() {
  return (
    <div>
      <WebsiteNavbar />
      <SustainabilityHeader />
      <SustainabilityOutlook/>
      <CertificationsAccreditations />
      <SustainabilityHighlights/>
      <Footer />
    </div>
  ); 
}

export default Sustainability;
