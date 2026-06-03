import Footer from "@/components/layout/Footer";
import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import React from "react";
import RPGGroupHeader from "./parts/RPGGroupHeader";
import BusinessVerticals from "./parts/BusinessVerticals";
import CoreValues from "./parts/CoreValues";
import FAQSection from "./parts/FAQSection";
import RPGGroupSection from "./parts/RPGGroupSection";

function RPGGroup() {
  return (
    <div>
      <WebsiteNavbar />
      <RPGGroupHeader />
      <RPGGroupSection/>
      <CoreValues />
      <BusinessVerticals />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default RPGGroup;
