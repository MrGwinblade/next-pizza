import { Container } from '@/components/shared';
import { prisma } from '@@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { PizzaImage } from '@/components/shared/pizza-image';
import {ChoosePizzaForm} from '@/components/shared/choose-pizza-form';
import { ProductForm } from '@/components/shared/product-form';


//отдельная страница продукта

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
        <ProductForm product={product} />
        {/* <PizzaImage imageUrl={product.imageUrl} size={40} /> */}
        {/* <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients} loading={false} /> */}
    </Container>
  );
}
