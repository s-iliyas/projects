import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      const body = await req.json();
      const { name, billboardId } = body;
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
      if (!billboardId) {
        return new NextResponse("Billboard Id is required", { status: 400 });
      }
      if (!params.categoryId) {
        return new NextResponse("Invalid Category Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const category = await prismadb.category.updateMany({
        where: { id: params.categoryId },
        data: { name, billboardId },
      });
      return NextResponse.json(category);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      if (!params.categoryId) {
        return new NextResponse("Invalid Category Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const category = await prismadb.category.deleteMany({
        where: { id: params.categoryId },
      });
      return NextResponse.json(category);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return new NextResponse("Invalid Category Id", { status: 400 });
    }
    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
      include: { billboard: true },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
