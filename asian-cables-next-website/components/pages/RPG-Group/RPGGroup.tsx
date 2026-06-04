import Footer from "@/components/layout/Footer";
import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import React from "react";
import RPGGroupHeader from "./parts/RPGGroupHeader";
import BusinessVerticals from "./parts/BusinessVerticals";
import CoreValues from "./parts/CoreValues";
import FAQSection from "./parts/FAQSection";
import RPGGroupSection from "./parts/RPGGroupSection";
import GlobalPresence from "./parts/GlobalPresence";
import GroupEcosystem from "./parts/GroupEcosystem";

function RPGGroup() {
  return (
    <div>
      <WebsiteNavbar />
      <RPGGroupHeader />
      <div className="relative h-[10px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#3CAADF] via-[#F04123] to-[#FFD212]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#3CAADF] via-[#F04123] to-[#FFD212] opacity-40 blur-[12px]" />
      </div>
      <GlobalPresence />
      <RPGGroupSection />
      <GroupEcosystem/>
      <CoreValues />
      <BusinessVerticals />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default RPGGroup;
