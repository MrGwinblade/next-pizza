import { ChooseProductModal } from '@/components/shared';
import { prisma } from '@@/prisma/prisma-client';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductModalPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <ChooseProductModal product={product} />
  );
}