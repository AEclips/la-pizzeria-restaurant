import { getDb } from '@/lib/db';
import PizzaMenu from '../PizzaMenu';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const db = await getDb();
  const pizzas = await db.all('SELECT * FROM menu');
  const addons = await db.all('SELECT * FROM addons');

  return (
    <div className="container" style={{padding: '120px 0 50px'}}>
      <div className="section-header">
        <h2>Our <span>Full Menu</span></h2>
        <p>Explore our premium collection of authentic pizzas, pasta, and sides.</p>
      </div>
      
      <PizzaMenu pizzas={pizzas} addons={addons} />
    </div>
  );
}
