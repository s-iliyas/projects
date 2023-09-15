"use client";

import CartItem from "@/components/cartItem";
import Summary from "@/components/summary";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/noResults";
import useCartStore from "@/hooks/store/cartStore";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCartStore();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-neutral-700">Shopping Cart</h1>
          <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12 mt-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <NoResults text="No products added to cart" />
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
