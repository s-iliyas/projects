import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismadb.store.findFirst({ where: { userId } });
  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
};

export default AppLayout;