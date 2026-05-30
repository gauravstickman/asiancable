import Industries from "@/components/pages/Industries/IndustryPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <Industries slug={resolvedParams.slug} />;
}
