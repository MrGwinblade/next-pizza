import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';
import { Product } from '@prisma/client';

export const search = async (query: string): Promise<Product[]> => {

    const response = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } });
  return (response.data);

}