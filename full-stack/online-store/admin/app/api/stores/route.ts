import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { name } = await req.json();
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const store = await prismadb.store.create({ data: { name, userId } });
    return NextResponse.json(store);
  } catch (error: any) {
    console.log("[STORES_POST", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
