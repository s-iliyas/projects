import { Product } from "@/types";
import Currency from "./currency";
import Button from "./button";
import { BiCart } from "react-icons/bi";

const Info = ({ data }: { data: Product }) => {
  return (
    <div>
      <h1 className="text-neutral-900 text-3xl font-bold">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-neutral-900">
          <Currency value={data.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data.size.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-neutral-600"
            style={{ backgroundColor: data.color.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex gap-x-2 items-center ">
          <BiCart className={"text-2xl"} />
          <span className="mt-1">Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default Info;
