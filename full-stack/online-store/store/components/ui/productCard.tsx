"use client";

import { Product } from "@/types";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import IconButton from "./iconButton";
import { BiCartAdd, BiExpand } from "react-icons/bi";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/store/previewModalStore";
import useCartStore from "@/hooks/store/cartStore";

interface Props {
  data: Product;
}

const ProductCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const store = usePreviewModal();
  const cart = useCartStore();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler = (e) => {
    e.stopPropagation();
    store.onOpen(data);
  };

  const addToCart: MouseEventHandler = (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      <div className="aspect-square rounded-xl bg-neutral-100 relative">
        <Image
          alt="Image"
          fill
          src={data?.images?.[0]?.url}
          className="aspect-square rounded-md object-cover"
        />
        <div className="opacity-0 group-hover:opacity-100 absolute transition w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<BiExpand />}
              className="text-xl"
            />
            <IconButton
              onClick={addToCart}
              icon={<BiCartAdd />}
              className="text-xl"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-neutral-500 text-sm">{data.category.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
