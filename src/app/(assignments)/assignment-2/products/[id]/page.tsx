import ProductDetails from '@/components/assignment-2/ProductDetails';

// { params }: { params: { id: string } }
{/* <ProductDetails id={parseInt(params.id)} /> */}
export default function ProductDetailPage() {
  return (
    <div className="container mx-auto p-4">
      <ProductDetails id={1} />
    </div>
  );
}