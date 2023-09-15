import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ColorColumn } from "./components/Column";
import ColorClient from "./components/ColorClient";

const Colors = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
  });

  const fColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={fColors} />
      </div>
    </div>
  );
};

export default Colors;
