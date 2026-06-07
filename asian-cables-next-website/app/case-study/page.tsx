import CaseStdy from "@/components/pages/CaseStudy/Casestudypage";
import { CaseStudyData } from "@/components/pages/CaseStudy/types";

const caseStudyData: CaseStudyData = {
  title: "1,072 km of Armoured Fibre Optic Cables for ADNOC",
  category: "Oil & Gas",
  location: "UAE",
  year: "2026",
  image: "/assets/case-studies/main.png",
  subtitle: "Supplied 1,072 km of steel wire armoured fibre optic cables for ADNOC.",
  overview: "Supplied 1,072 km of steel wire armoured fibre optic cables for ADNOC facilities in the North Sea region.",
  challenge: "The project required Asian Cables to develop a specialised steel wire armoured fibre optic cable with both fire survival and flame retardant properties — a combination rarely supplied at this volume. Additional complexity came from the need for 3 km single drum lengths, which required precise manufacturing control, along with embossed cable identification for full field traceability. ADNOC project approval was a non-negotiable prerequisite for supply.",
  solution: "Asian Cables engineered a steel wire armoured fibre optic cable with fire survival and flame retardant properties, manufactured at the Mysore facility. A 3 km single drum length was achieved, significantly reducing the number of field joints required during installation. Embossed printing on the cable jacket ensured clear identification and traceability across the project site. Full ADNOC project approval was secured prior to supply.",
  outcome: "A total of 1,072 km of steel wire armoured fibre optic cables were delivered within the committed project schedule. The client acknowledged timely delivery and compliance with project-specific quality requirements. The supply directly supported uninterrupted project execution at ADNOC facilities.",
  client: "ADNOC",
  industry: "Oil & Gas",
  specifications: [
    {
      label: "Products Supplied",
      value: "Fibre Optic Cable — Steel Wire Armoured, Fire Survival & Flame Retardant",
    },
    {
      label: "Standards / Approvals",
      value: "ADNOC Approval",
    },
    {
      label: "Key Customisation",
      value: "3 km single drum length, Embossed cable identification",
    },
    {
      label: "Volume Delivered",
      value: "1,072 km",
    },
    {
      label: "Supply Year",
      value: "2025",
    },
  ],
};

function page() {
  return (
    <div>
      <CaseStdy data={caseStudyData} />
    </div>
  );
}

export default page;
