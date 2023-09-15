import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      const {
        name,
        price,
        images,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        categoryId,
      } = await req.json();

      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }

      if (!price) {
        return new NextResponse("Price is required", { status: 400 });
      }

      if (!images || !images.length) {
        return new NextResponse("Images are required", { status: 400 });
      }

      if (!sizeId) {
        return new NextResponse("Size is required", { status: 400 });
      }

      if (!categoryId) {
        return new NextResponse("Category is required", { status: 400 });
      }

      if (!colorId) {
        return new NextResponse("Color is required", { status: 400 });
      }

      if (!params.productId) {
        return new NextResponse("Invalid Product Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }

      await prismadb.product.update({
        where: { id: params.productId },
        data: {
          name,
          price,
          isFeatured,
          isArchived,
          sizeId,
          colorId,
          categoryId,
          storeId: params.storeId,
          images: {
            deleteMany: {},
          },
        },
      });
      const product = await prismadb.product.update({
        where: { id: params.productId },
        data: {
          images: {
            createMany: {
              data: [...images.map((image: { url: string }) => image)],
            },
          },
        },
      });
      return NextResponse.json(product);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) => {
  try {
    const { userId } = auth();
    if (userId) {
      if (!params.productId) {
        return new NextResponse("Invalid Product Id", { status: 400 });
      }
      const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId },
      });

      if (!store) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      const product = await prismadb.product.deleteMany({
        where: { id: params.productId },
      });
      return NextResponse.json(product);
    } else {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Invalid Product Id", { status: 400 });
    }
    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
