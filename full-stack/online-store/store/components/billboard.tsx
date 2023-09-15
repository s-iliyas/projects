import { Billboard as BillboardType } from "@/types";
import React from "react";

interface Props {
  data: BillboardType;
}

const Billboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="sm:p-4 p-6 lg:p-8 rounded-xl overflow-hidden ">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold sm:text-5xl text-3xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
