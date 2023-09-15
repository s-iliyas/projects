import React from "react";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

interface SettingsProps {
  params: { storeId: string };
}

const SettingsPage = async ({ params }: SettingsProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const store = await prismadb.store.findFirst({ where: { userId } });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  );
};

export default SettingsPage;
