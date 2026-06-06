import Footer from "@/components/layout/Footer";
import ResourcesHeader from "./parts/ResourcesHeader";
import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import WhitepapersResearch from "./parts/WhitepapersResearch";
import CableSelectionTool from "./parts/CableSelectionTool";
import ProductResource from "./parts/ProductResource";
import CaseStudies from "./parts/CaseStudies";

function Resources() {
  return (
    <div>
      <WebsiteNavbar />
      <ResourcesHeader/>
       <div className="relative h-[10px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#3CAADF] via-[#F04123] to-[#FFD212]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#3CAADF] via-[#F04123] to-[#FFD212] opacity-40 blur-[12px]" />
      </div>
      <CableSelectionTool/>
      <ProductResource/>   
      <WhitepapersResearch/>
      <CaseStudies/>
      <Footer />
    </div>
  );
}

export default Resources;
