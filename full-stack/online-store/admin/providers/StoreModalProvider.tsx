"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/StoreModal";

const StoreModalProvider = () => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};

export default StoreModalProvider;
