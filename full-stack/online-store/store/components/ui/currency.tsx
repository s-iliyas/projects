"use client";
import { priceFormatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  value: string | number;
}

const Currency = ({ value }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold">{priceFormatter.format(Number(value))}</div>
  );
};

export default Currency;
