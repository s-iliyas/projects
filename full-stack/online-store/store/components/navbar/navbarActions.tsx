"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import { BiShoppingBag } from "react-icons/bi";
import useCartStore from "@/hooks/store/cartStore";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCartStore();
  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={()=>{router.push("/cart")}} className="flex items-center text-center text-xl rounded-full bg-black px-4 py-2 gap-x-1">
        <BiShoppingBag />
        <span className="text-sm mt-1">{cart.items.length}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
