import Link from "next/link";
import Footer from "../../../components/layout/Footer";
import WebsiteNavbar from "../../../components/layout/WebsiteNavbar";
import ManufacturingHeader from "./parts/ManufacturingHeader";
import QualityControlAssurance from "./parts/QualityControlAssurance";
import ProductionFacilities from "./parts/ProductionFacilities";
import InfrastructureHighlights from "./parts/InfrastructureHighlights";
import InfrastructureStandards from "./parts/InfrastructureStandards";

export default function ManufacturingPage({ data }: { data?: any }) {
  return (
    <>
      <WebsiteNavbar />
        <ManufacturingHeader data={data} />
        <InfrastructureHighlights data={data} />
        <ProductionFacilities data={data} />
        <InfrastructureStandards data={data} />
        <QualityControlAssurance data={data} />
      <Footer />
    </>
  );
}
