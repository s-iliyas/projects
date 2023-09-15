"use client";

import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Button from "./ui/button";
import Currency from "./ui/currency";
import useCartStore from "@/hooks/store/cartStore";

const Summary = () => {
  const searchParams = useSearchParams();

  const items = useCartStore((state) => state.items);
  const removeAll = useCartStore((state) => state.removeAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Successfull");
      removeAll();
    } else if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );
    window.location = response.data.url;
  };

  return (
    <div
      className="
        mt-16
        rounded-lg
        bg-gray-50
        px-4
        py-6
        sm:p-6
        lg:col-span-5
        lg:mt-0
        lg:p-8
      "
    >
      <h2 className="text-lg font-medium text-neutral-900">Order Summary</h2>
      <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
        <div className="text-base text-neutral-900 font-medium">
          Order total
        </div>
        <Currency value={totalPrice} />
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
