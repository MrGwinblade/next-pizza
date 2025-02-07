'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
//import { useCartStore } from '@/shared/store';
//import toast from 'react-hot-toast';
import { ProductForm } from '../product-form';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
  product: ProductWithRelations;
  //product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        <ProductForm product={product} onSubmit={() => router.back()} />
        {/* <ChoosePizzaForm onSubmit={() => {console.log('submit') }} imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients} loading={false} /> */}
      </DialogContent>
    </Dialog> 
  );
};
