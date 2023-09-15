import React from "react";
import SizeClient from "./components/SizeClient";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { SizeColumn } from "./components/Column";

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
  });

  const fSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={fSizes} />
      </div>
    </div>
  );
};

export default Sizes;
