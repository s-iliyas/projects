import usePreviewModal from "@/hooks/store/previewModalStore";
import React from "react";
import Modal from "./ui/modal";
import Gallery from "./ui/gallery";
import Info from "./ui/info";

const PreviewModal = () => {
  const store = usePreviewModal();
  const product = usePreviewModal((state) => state.data);
  
  if (!product) {
    return null;
  }

  return (
    <Modal open={store.isOpen} onClose={store.onClose}>
      <div className="grid w-full items-start grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
