import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const db = await getDb();
    const pizza = await db.get('SELECT * FROM menu WHERE id = ?', resolvedParams.id);
    
    if (pizza) {
      return NextResponse.json(pizza);
    } else {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
