"use client";

import Button from "@/components/ui/button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Filter from "./filter";

interface Props {
  sizes: Size[];
  colors: Color[];
}
const MobileFilter: React.FC<Props> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters <BiPlus />
      </Button>
      <Dialog
        open={open}
        as="div"
        className={"relative z-40 lg:hidden"}
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25">
          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel
              className={
                "relative ml-auto h-full w-full max-w-xs flex-col shadow-xl pb-6 py-4 overflow-y-auto bg-white"
              }
            >
              <div
                className="flex items-center justify-end px-4 cursor-pointer"
                onClick={onClose}
              >
                X
              </div>
              <div className="p-4">
                <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                <Filter valueKey="colorId" name="Colors" data={colors} />
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilter;
