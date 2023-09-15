import Billboard from "@/components/billboard";
import ProductList from "@/components/productList";
import Container from "@/components/ui/container";
import getBillboard from "@/hooks/api/getBillboard";
import getProducts from "@/hooks/api/getProducts";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("373122d2-174f-4c2e-bc2c-fd13d7495fe1");
  const products = await getProducts({
    isFeatured: true,
  });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 sm:px-6 px-4 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
