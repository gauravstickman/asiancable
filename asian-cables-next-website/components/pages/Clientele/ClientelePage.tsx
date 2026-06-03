import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import Footer from "@/components/layout/Footer";
import InternationalClientsGrid from "./parts/InternationalClientsGrid";
import IndustryFilter from "./parts/IndustryFilter";
import ClienteleHeader from "./parts/ClienteleHeader";

function ClientelePage() {
  return (
    <div>
      <WebsiteNavbar />
      <ClienteleHeader />
      <IndustryFilter/>
      <InternationalClientsGrid/>
      <Footer />
    </div>
  );
}

export default ClientelePage;
