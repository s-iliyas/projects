"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import Currency from "./ui/currency";
import useCartStore from "@/hooks/store/cartStore";
import { Product } from "@/types";

const CartItem = ({ data }: { data: Product }) => {
  const cart = useCartStore();
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 sm:h-48 sm:w-48 w-24 rounded-md overflow-hidden">
        <Image
          src={data.images[0].url}
          alt="Image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 sm:ml-6 flex flex-1 flex-col justify-between">
        <div
          onClick={() => {
            cart.removeItem(data.id);
          }}
          className="absolute top-0 right-0 z-10 cursor-pointer text-xl font-bold"
        >
          X
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg text-black font-semibold">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm gap-x-2">
            <p className="text-neutral-500">{data.size.name}</p>
            <p className="text-neutral-500">{data.color.name}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
