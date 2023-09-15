import ProductList from "@/components/productList";
import Container from "@/components/ui/container";
import Gallery from "@/components/ui/gallery";
import Info from "@/components/ui/info";

import getProduct from "@/hooks/api/getProduct";
import getProducts from "@/hooks/api/getProducts";

export const revalidate = 0;

const Product = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);
  const suggestedProduct = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList
            items={suggestedProduct.filter(
              (item) => item.id !== params.productId
            )}
            title={"Suggested Products"}
          />
        </div>
      </Container>
    </div>
  );
};

export default Product;
