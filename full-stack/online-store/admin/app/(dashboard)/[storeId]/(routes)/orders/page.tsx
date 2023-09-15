import React from "react";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/Column";
import { format } from "date-fns";
import { priceFormatter } from "@/lib/utils";
import OrderClient from "./components/OrderClient";

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const fOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: priceFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={fOrders} />
      </div>
    </div>
  );
};

export default Orders;
