import {db} from "@/db/drizzle";
import {users} from "@/db/schema";
import {stripe} from "@/lib/stripe";
import {eq} from "drizzle-orm";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!; // Get the Stripe webhook secret from the environment variables and make sure it's not null

console.log("CHEGOU AQUI 1111!!!!!!!");

export const POST = async (request: Request) => {
  console.log("CHEGOU AQUI 222!!!!!!!");

  try {
    console.log("CHEGOU AQUI 333!!!!!!!");

    const sig = request.headers.get("Stripe-Signature"); // Get the Stripe signature from the request headers

    if (!sig) {
      return Response.json({message: "No signature"}, {status: 400});
    }

    let event;

    const rawBody = await request.text();

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret); // Construct the event from the raw body and
    } catch (error) {
      return Response.json({error: `Webhook error: ${error}`}, {status: 400});
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const customerEmail = session?.customer_details?.email as string;

        if (!customerEmail) {
          return Response.json({error: "User not found"}, {status: 400});
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {expand: ["data.price.product"]}
        ); // Get the line items from the session and expand the product metadata

        const product = lineItems.data[0]; // Get the product from the line items
        const creditsAmount = Number(product.price?.metadata.amount); // Get the credits amount from the product metadata

        if (!creditsAmount) {
          return Response.json(
            {error: "Credits amount not found"},
            {status: 400}
          );
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, customerEmail),
        });

        if (!user)
          return Response.json({error: "User not found"}, {status: 404});

        await db
          .update(users)
          .set({credits: user.credits + creditsAmount})
          .where(eq(users.email, customerEmail)); // Update the user credits in the database with the new amount of credits

        break;
    }

    return Response.json({received: true});
  } catch (error) {
    console.log(error);
    return Response.json({error}, {status: 500});
  }
};
