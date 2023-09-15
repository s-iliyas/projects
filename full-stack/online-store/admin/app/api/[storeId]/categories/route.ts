import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { name, billboardId } = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.create({
      data: { name, billboardId, storeId: params.storeId },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log("[CATEGORIES_POST", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.log("[CATEGORIES_GET", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

