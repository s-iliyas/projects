"use client";

import { ColumnDef } from "@tanstack/react-table";
import Action from "./Action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <>
        <div className="flex items-center gap-x-2">
          <div
            className="h-3 w-3 p-3 rounded-full"
            style={{ backgroundColor: row.original.value }}
          />
          {row.original.value}
        </div>
      </>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <Action data={row.original} />,
  },
];
