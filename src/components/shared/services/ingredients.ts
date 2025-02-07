import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';
import { Ingredient, Product } from '@prisma/client';

export const getAll = async (): Promise<Ingredient[]> => {

    const response = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
  return (response.data);

}