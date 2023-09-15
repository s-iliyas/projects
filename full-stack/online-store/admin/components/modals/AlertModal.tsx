"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface Props {
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<Props> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Aree you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 flex space-x-2 items-center justify-end w-full">
        <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="destructive" onClick={onConfirm} disabled={loading}>Confirm</Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
