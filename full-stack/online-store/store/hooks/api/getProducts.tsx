import qs from "query-string";

import { Product } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const PRODUCTS_URL = `${BASE_URL}/products`;

interface Query {
  colorId?: string;
  sizeId?: string;
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async ({
  colorId,
  sizeId,
  categoryId,
  isFeatured,
}: Query): Promise<Product[]> => {
  const queryParams = {
    colorId,
    sizeId,
    categoryId,
    isFeatured,
  };

  const queryString = qs.stringify(queryParams);
  const urlWithQuery = `${PRODUCTS_URL}?${queryString}`;

  const res = await fetch(urlWithQuery);
  return res.json();
};

export default getProducts;
