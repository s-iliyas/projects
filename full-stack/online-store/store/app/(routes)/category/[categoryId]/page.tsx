import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import getCategory from "@/hooks/api/getCategory";
import getColors from "@/hooks/api/getColors";
import getProducts from "@/hooks/api/getProducts";
import getSizes from "@/hooks/api/getSizes";
import React from "react";
import Filter from "./components/filter";
import NoResults from "@/components/ui/noResults";
import ProductCard from "@/components/ui/productCard";
import MobileFilter from "./components/mobileFilter";

export const revalidate = 0;

interface Props {
  params: { categoryId: string };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const Category: React.FC<Props> = async ({ params, searchParams }) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults text="No Results"/>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
