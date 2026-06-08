import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import React from "react";
import SustainabilityHeader from "./parts/SustainabilityHeader";
import Footer from "@/components/layout/Footer";
import CertificationsAccreditations from "./parts/CertificationsAccreditations";
import SustainabilityOutlook from "./parts/SustainabilityOutlook";
import SustainabilityHighlights from "./parts/SustainabilityHighlights";

function Sustainability({ data }: { data?: any }) {
  return (
    <div>
      <WebsiteNavbar />
      <SustainabilityHeader data={data} />
      <SustainabilityOutlook data={data} />
      <CertificationsAccreditations data={data} />
      <SustainabilityHighlights data={data} />
      <Footer />
    </div>
  ); 
}

export default Sustainability;
