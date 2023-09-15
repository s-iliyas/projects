import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      const body = await req.json();
      const { name, value } = body;
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
      if (!value) {
        return new NextResponse("Value is required", { status: 400 });
      }
      if (!params.sizeId) {
        return new NextResponse("Invalid Size Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const size = await prismadb.size.updateMany({
        where: { id: params.sizeId },
        data: { name, value },
      });
      return NextResponse.json(size);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      if (!params.sizeId) {
        return new NextResponse("Invalid Size Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const size = await prismadb.size.deleteMany({
        where: { id: params.sizeId },
      });
      return NextResponse.json(size);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId) {
      return new NextResponse("Invalid Size Id", { status: 400 });
    }
    const size = await prismadb.size.findUnique({
      where: { id: params.sizeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
