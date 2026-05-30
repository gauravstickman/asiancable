import Product from "@/components/pages/Products/Product";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <Product productSlug={resolvedParams.slug} />;
}
