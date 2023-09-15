"use client"

import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

const GalleryTab = ({ image }: { image: ImageType }) => {
  return (
    <Tab
      className={
        "relative flex aspect-square cursor-pointer items-center justify-center bg-white"
      }
    >
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              fill
              src={image.url}
              alt="Image"
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn("absolute ring-2 ring-offset-2 rounded-md inset-0", selected ? "ring-black" : "ring-transparent")}
          ></span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
