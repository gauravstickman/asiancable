import Link from "next/link";
import Footer from "../../../components/layout/Footer";
import WebsiteNavbar from "../../../components/layout/WebsiteNavbar";
import ManufacturingHeader from "./parts/ManufacturingHeader";
import QualityControlAssurance from "./parts/QualityControlAssurance";
import ProductionFacilities from "./parts/ProductionFacilities";
import InfrastructureHighlights from "./parts/InfrastructureHighlights";
import InfrastructureStandards from "./parts/InfrastructureStandards";

export default function ManufacturingPage() {
  return (
    <>
      <WebsiteNavbar />
        <ManufacturingHeader />
        <InfrastructureHighlights />
        <ProductionFacilities/>
        <InfrastructureStandards/>
        <QualityControlAssurance/>
      <Footer />
    </>
  );
}
