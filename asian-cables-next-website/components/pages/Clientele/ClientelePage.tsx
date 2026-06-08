import WebsiteNavbar from "@/components/layout/WebsiteNavbar";
import Footer from "@/components/layout/Footer";
import InternationalClientsGrid from "./parts/InternationalClientsGrid";
import IndustryFilter from "./parts/IndustryFilter";
import ClienteleHeader from "./parts/ClienteleHeader";

function ClientelePage({ data }: { data?: any }) {
  return (
    <div>
      <WebsiteNavbar />
      <ClienteleHeader data={data} />
      <IndustryFilter data={data} />
      <InternationalClientsGrid data={data} />
      <Footer />
    </div>
  );
}

export default ClientelePage;
