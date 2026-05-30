import Product from "@/components/pages/Products/Product";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <Product productId={resolvedParams.id} />;
}
