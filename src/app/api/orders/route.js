import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer_name, phone, address, total_amount, items } = body;
    
    const db = await getDb();
    
    const result = await db.run(
      'INSERT INTO orders (customer_name, phone, address, total_amount) VALUES (?, ?, ?, ?)',
      [customer_name, phone, address, total_amount]
    );
    
    const orderId = result.lastID;
    
    // Insert items
    for (const item of items) {
      await db.run(
        'INSERT INTO order_items (order_id, pizza_id, quantity, size, crust, addons) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, item.pizza_id, item.quantity, item.size, item.crust, item.addons]
      );
    }
    
    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const orders = await db.all('SELECT * FROM orders ORDER BY created_at DESC');
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
