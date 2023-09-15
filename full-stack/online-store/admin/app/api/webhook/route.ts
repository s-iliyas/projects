import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_LISTEN_KEY!
    );
  } catch (error: any) {
    console.log("[WEBHOOK] - ", error.message);
    return new NextResponse(`Webhook error - ${error.message}`);
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const addressObj = session.customer_details?.address;
  const address = [
    addressObj?.line1,
    addressObj?.line2,
    addressObj?.city,
    addressObj?.state,
    addressObj?.country,
    addressObj?.postal_code,
  ]
    .filter((x) => x !== null)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: { id: session?.metadata?.orderId },
      data: {
        isPaid: true,
        address,
        phone: session?.customer_details?.phone || "",
      },
      include: { orderItems: true },
    });
  }
  return new NextResponse(null, { status: 200 });
}
