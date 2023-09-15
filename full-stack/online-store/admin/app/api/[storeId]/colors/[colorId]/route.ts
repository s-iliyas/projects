import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
      if (!params.colorId) {
        return new NextResponse("Invalid Color Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const color = await prismadb.color.updateMany({
        where: { id: params.colorId },
        data: { name, value },
      });
      return NextResponse.json(color);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      if (!params.colorId) {
        return new NextResponse("Invalid Color Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const color = await prismadb.color.deleteMany({
        where: { id: params.colorId },
      });
      return NextResponse.json(color);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId) {
      return new NextResponse("Invalid Color Id", { status: 400 });
    }
    const color = await prismadb.color.findUnique({
      where: { id: params.colorId },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
