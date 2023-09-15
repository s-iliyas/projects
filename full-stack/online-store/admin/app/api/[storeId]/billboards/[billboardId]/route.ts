import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      const body = await req.json();
      const { label, imageUrl } = body;
      if (!label) {
        return new NextResponse("Label is required", { status: 400 });
      }
      if (!imageUrl) {
        return new NextResponse("Image Url is required", { status: 400 });
      }
      if (!params.billboardId) {
        return new NextResponse("Invalid Billboard Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const billboard = await prismadb.billboard.updateMany({
        where: { id: params.billboardId },
        data: { label, imageUrl },
      });
      return NextResponse.json(billboard);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      if (!params.billboardId) {
        return new NextResponse("Invalid Billboard Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const billboard = await prismadb.billboard.deleteMany({
        where: { id: params.billboardId },
      });
      return NextResponse.json(billboard);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { billboardId: string } }
) => {
  try {
    if (!params.billboardId) {
      return new NextResponse("Invalid Billboard Id", { status: 400 });
    }
    const billboard = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
