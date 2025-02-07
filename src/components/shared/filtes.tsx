'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients } from './hooks/use-ingredients';
import { useFilters } from './hooks/use-filters';
import { useQueryFilters } from './hooks/use-query-filters';




//Левый блок с фильтрами и слайдером, общий контейнер



interface Props {
  className?: string;
}




export const Filters: React.FC<Props> = ({ className }) => {
const { ingredients,loading, onAddId, selectedIds } = useIngredients();
const filters = useFilters();

useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    //console.log(prices, 999);
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };
React.useEffect(() => {
//   console.log('Выбранные ингредиенты:', [...selectedIds]);
//   console.log(ingredients
//     .filter(ingredient => selectedIds.has(ingredient.id.toString()))
//     .map(ingredient => `id: ${ingredient.id}, name: ${ingredient.name}`)
//     .join('\n')
// )
//   console.log(filters.sizes)
  console.log([filters.prices, Array.from(filters.pizzaTypes), Array.from(filters.sizes), Array.from(filters.selectedIngredients)
    // {ingredientsList: ingredients
    // .filter(ingredient => selectedIds.has(ingredient.id.toString()))
    // .map(ingredient => `id: ${ingredient.id}, name: ${ingredient.name}`)
    // .join('\n')}

  ])
  console.log()
});

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-4 font-bold" />
      
      <button 
      onClick={filters.clearFilters} 
      className="text-red-500 my-4 text-base hover:underline font-bold focus:outline-none">
      Сбросить фильтры
    </button>

      {/* checkbox */}

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />


      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

        {/*Filter ingr */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input
                type="number"
                placeholder="0"
                min={0}
                max={1000}
                value={String(filters.prices.priceFrom)}
                onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                />
                <Input
                type="number"
                placeholder="30000"
                min={100}
                max={1000}
                value={String(filters.prices.priceTo)}
                onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                />
            </div>
            <RangeSlider 
                min={0} 
                max={1000} 
                step={10} 
                value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                onValueChange={updatePrices}
                />
        </div>

            <CheckboxFiltersGroup title="Ingred" className="mt-5" 
            limit={4} 
            defaultItems={items.slice(0,6)}
            items={items}
            loading={loading}
            onClickCheckbox={filters.setSelectedIngredients}
            selected={filters.selectedIngredients}
            name="ingredients"
            ></CheckboxFiltersGroup>
            
            {/* onClickCheckbox={filters.setSelectedIngredients} */}
            {/* selected={filters.selectedIngredients} */}
    </div>
  );
};
