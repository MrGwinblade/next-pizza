'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}


export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = React.useRef<HTMLDivElement | null>(null);
const intersection = useIntersection(intersectionRef as React.RefObject<HTMLDivElement>, {
  threshold: 0.4,
});


  {React.useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(title);
      console.log(categoryId);
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);}

  return (
    <div className={className} id={title} ref={intersectionRef as React.RefObject<HTMLDivElement>}>

      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-2 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};