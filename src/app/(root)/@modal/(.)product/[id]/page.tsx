import { ChooseProductModal, Container } from '@/components/shared';
import { prisma } from '@@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { PizzaImage } from '@/components/shared/pizza-image';
import {ChoosePizzaForm} from '@/components/shared/choose-pizza-form';

//модальное окно продукта, параллельный рендер

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
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
    // <Container className="flex flex-col my-10 fixed">
    //     {/* <ProductForm product={product} /> */}
    //     {/* <PizzaImage imageUrl={product.imageUrl} size={40} /> */}
       //<ChoosePizzaForm onSubmit={() => {console.log('submit') }} imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients} loading={false} /> 
        
    // </Container>
  );
}
