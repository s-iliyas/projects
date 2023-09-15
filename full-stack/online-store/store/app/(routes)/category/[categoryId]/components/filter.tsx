"use client";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "query-string";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  data: (Size | Color)[];
  valueKey: string;
  name: string;
}

const Filter: React.FC<Props> = ({ data, valueKey, name }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);
  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    let query;
    if (current[valueKey]) {
      query = { ...current };
      if (current[valueKey] === id) {
        delete query[valueKey];
      } else {
        query[valueKey] = id;
      }
    } else {
      query = { ...current, [valueKey]: id };
    }
    const queryString = qs.stringify(query);
    router.push(`${window.location.pathname}?${queryString}`);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md bg-white text-sm text-neutral-600 border border-neutral-600 p-2",
                selectedValue === item.id && "bg-black text-white"
              )}
              onClick={() => onClick(item.id)}
            >
              <span className="mt-1">{item.name}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
