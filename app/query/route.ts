import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
	const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data.rows;
}

async function listRevenue() {
	const data = await client.sql`
    SELECT * FROM revenue;
  `;

	return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	// return Response.json(await listInvoices());
    return Response.json(await listRevenue());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
