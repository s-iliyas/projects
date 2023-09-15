import React from "react";
import CategoryClient from "./components/CategoryClient";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/Column";
import { format } from "date-fns";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
  });

  const fCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={fCategories} />
      </div>
    </div>
  );
};

export default Categories;
