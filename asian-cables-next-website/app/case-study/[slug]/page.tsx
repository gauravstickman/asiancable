import CaseStdy from "@/components/pages/CaseStudy/Casestudypage";
import { CaseStudyData } from "@/components/pages/CaseStudy/types";
import { notFound } from "next/navigation";
import axios from "axios";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CaseStudyDynamicPage({ params }: PageProps) {
  const { slug } = await params;

  let dbCaseStudy = null;
  let allCaseStudies = [];
  try {
    const [res, allRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/case-studies/slug/${slug}`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/case-studies`)
    ]);
    dbCaseStudy = res.data;
    allCaseStudies = allRes.data;
  } catch (err) {
    console.error("Error fetching case study:", err);
    return notFound();
  }

  if (!dbCaseStudy) {
    return notFound();
  }

  // Map backend data to CaseStudyData interface
  const data: CaseStudyData = {
    title: dbCaseStudy.title || "",
    category: dbCaseStudy.industry || "",
    location: dbCaseStudy.location || "",
    year: dbCaseStudy.year || "",
    image: dbCaseStudy.bannerImage || "/assets/case-studies/main.png",
    subtitle: dbCaseStudy.subtitle || "",
    overview: dbCaseStudy.overview || "",
    challenge: dbCaseStudy.challenge || "",
    solution: dbCaseStudy.solution || "",
    outcome: dbCaseStudy.outcome || "",
    client: dbCaseStudy.client || "",
    industry: dbCaseStudy.industry || "",
    specifications: dbCaseStudy.specifications ? [
      { label: "Products Supplied", value: dbCaseStudy.specifications.productsSupplied },
      { label: "Standards / Approvals", value: dbCaseStudy.specifications.standardsApprovals },
      { label: "Key Customisation", value: dbCaseStudy.specifications.keyCustomisation },
      { label: "Volume Delivered", value: dbCaseStudy.specifications.volumeDelivered },
      { label: "Supply Year", value: dbCaseStudy.specifications.supplyYear },
    ].filter(s => s.value) : [],
  };

  // Map all case studies for the Related component
  const relatedData = allCaseStudies.map((item: any) => ({
    tag: item.industry || "Industry",
    title: item.title || "",
    description: item.subtitle || item.overview || "",
    image: item.bannerImage || "/assets/case-studies/case-1.png",
    country: item.location || "",
    year: item.year || "",
    badges: [item.client || "Client"],
    link: `/case-study/${item.slug}`,
  }));

  return (
    <div>
      <CaseStdy data={data} allCaseStudies={relatedData} />
    </div>
  );
}
