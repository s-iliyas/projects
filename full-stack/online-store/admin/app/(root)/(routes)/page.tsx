"use client";

import { useEffect } from "react";

import { useModalStore } from "@/hooks/useModalStore";

export default function Home() {
  const { isOpen, onOpen } = useModalStore((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
  }));

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
