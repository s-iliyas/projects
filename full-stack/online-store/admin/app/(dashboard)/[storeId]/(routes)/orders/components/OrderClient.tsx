"use client";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./Column";
import { DataTable } from "@/components/ui/data-table";

const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data?.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable data={data} columns={columns} searchKey="products" />
    </>
  );
};

export default OrderClient;
