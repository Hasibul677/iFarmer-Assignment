'use client';
import ProductDetails from '@/components/assignment-2/ProductDetails';
import { use } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params); 
  return (
    <div className="container mx-auto p-4">
      <ProductDetails id={parseInt(id)} />
    </div>
  );
}