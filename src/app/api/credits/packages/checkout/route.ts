import {db} from "@/db/drizzle";
import {users} from "@/db/schema";
import {auth} from "@/lib/auth";
import {stripe} from "@/lib/stripe";
import {eq} from "drizzle-orm";

export const POST = async (request: Request) => {
  const {priceId, currentPathname} = await request.json();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return Response.json({message: "User not found"}, {status: 401});

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) return Response.json({message: "User not found"}, {status: 404});

  let customerId = user.customerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session?.user?.email as string,
      metadata: {
        userId,
      },
    });

    customerId = customer.id;

    await db.update(users).set({customerId}).where(eq(users.id, userId)); // Update the user with the new customer id in the database
  }

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: customerId,
    line_items: [{price: priceId, quantity: 1}], // Create a new checkout session with the price id
    mode: "payment",
    success_url: `${process.env.APP_URL}/${currentPathname}?success=true`,
    cancel_url: `${process.env.APP_URL}/${currentPathname}`,
    invoice_creation: {enabled: true}, // Create an invoice for the customer when the session is completed. salva o histórico de compras *IMPORTANTE*
  });

  return Response.json({url: checkout.url});
};
