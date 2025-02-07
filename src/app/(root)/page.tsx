import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Categories, Container, Filters, ProductCard, ProductsGroupList, SortPopup, Title, TopBar } from "@/components/shared";
import { prisma } from "@@/prisma/prisma-client";
import { categories } from "@@/prisma/constants";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/components/shared/lib/find-pizzas";
import { Stories } from "@/components/shared/stories";


export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams>  }) {
  const resolvedSearchParams = await searchParams; // ожидаем, что searchParams это Promise
  const categoriesMassive = await findPizzas(resolvedSearchParams);

  return (
    <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
     
    </Container>
    {/*категории из массива выше */}
    <TopBar categories={categoriesMassive.filter((categoryMassive)=>categoryMassive.products.length>0)}/>

    <Stories />

    <Container className="pb-14 mt-10">
      <div className="flex gap-[80px]">

        <div className="w-[250px]">
          <Suspense><Filters/></Suspense>
          
          
        </div>
        
        {/*товары */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
           {
            categoriesMassive.map((category)=>
              category.products.length>0 && (
                <ProductsGroupList 
                  key={category.id} 
                  title={category.name}
                  categoryId={category.id}
                  items={category.products}    
                  />
              ))
            }
          </div>
        </div>
      </div>
    </Container>
    </>
    
  );
}
