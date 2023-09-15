import prismadb from "@/lib/prismadb";

const getRevenue = async (storeId: string) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const total = orders.reduce((total, order) => {
    const productsTotal = order.orderItems.reduce((total, product) => {
      return total + product.product.price.toNumber();
    }, 0);
    return total + productsTotal;
  }, 0);
  return total;
};

export default getRevenue;
