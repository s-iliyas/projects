import Overview from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import getGraph from "@/hooks/getGraph";
import getRevenue from "@/hooks/getRevenue";
import prismadb from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { CreditCard, IndianRupee, Package } from "lucide-react";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: { id: params?.storeId },
  });

  const revenueCount = await getRevenue(params.storeId);
  const salesCount = await prismadb.order.count({
    where: { storeId: params.storeId, isPaid: true },
  });

  const stockCount = await prismadb.product.count({
    where: { storeId: params.storeId, isArchived: false },
  });

  const graphData = await getGraph(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of Store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center pb-2 justify-between">
              <CardTitle className="text-lg font-semibold">
                Total Revenue
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter.format(revenueCount)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center pb-2 justify-between">
              <CardTitle className="text-lg font-semibold">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount} </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center pb-2 justify-between">
              <CardTitle className="text-lg font-semibold">
                Products in Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount} </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
