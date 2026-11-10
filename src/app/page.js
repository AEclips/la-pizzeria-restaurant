import { getDb } from '../lib/db';
import PizzaMenu from './PizzaMenu';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const db = await getDb();
  const deals = await db.all('SELECT * FROM menu WHERE category = "Deals"');
  const bestSellers = await db.all('SELECT * FROM menu WHERE category = "Pizzas" LIMIT 4');
  const addons = await db.all('SELECT * FROM addons');
  
  // Get hero image
  const fs = await import('fs');
  const path = await import('path');
  const files = fs.readdirSync(path.join(process.cwd(), 'public/images'));
  const heroImage = files.find(f => f.startsWith('hero_pizza')) || '';

  const categories = [
    { name: 'Deals', icon: '🔥', count: 'Combos & Feasts' },
    { name: 'Pizzas', icon: '🍕', count: 'Authentic Crust' },
    { name: 'Melts', icon: '🧀', count: 'Crispy & Folded' },
    { name: 'Pasta', icon: '🍝', count: 'Rich Sauces' },
    { name: 'Sides', icon: '🍗', count: 'Garlic Bread & Wedges' },
    { name: 'Drinks', icon: '🥤', count: 'Chilled Refreshments' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('/images/${heroImage}')` }}>
        <div className="container hero-content fade-in">
          <h1>Taste the <span>Magic</span></h1>
          <p>Modern and premium pizzas that make your moments even more special. Crafted with our signature recipes and fresh ingredients.</p>
          <div className="hero-btns">
            <Link href="/menu" className="btn-primary">View Full Menu</Link>
            <Link href="/cart-details" className="btn-secondary">Check Cart</Link>
          </div>
        </div>
      </section>

      {/* Explore Categories Cards */}
      <section className="container" style={{ padding: '60px 0 20px' }}>
        <div className="section-header">
          <h2>Explore <span>Categories</span></h2>
          <p>Choose from our delicious variety of handcrafted food</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '20px' }}>
          {categories.map((c, idx) => (
            <Link href={`/menu`} key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '25px 15px', borderRadius: '16px', textAlign: 'center', transition: '0.3s', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{c.icon}</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{c.name}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Top Deals Section */}
      <section className="container" style={{ padding: '60px 0 20px' }}>
        <div className="section-header">
          <h2>Our <span>Top Deals</span></h2>
          <p>Unbeatable combo deals for your friends & family</p>
        </div>
        <PizzaMenu pizzas={deals} addons={addons} />
      </section>

      {/* Our Best Sellers Section */}
      <section className="container" style={{ padding: '60px 0 40px' }}>
        <div className="section-header">
          <h2>Our <span>Best Sellers</span></h2>
          <p>The most loved pizzas in Dhaka city</p>
        </div>
        <PizzaMenu pizzas={bestSellers} addons={addons} />

        {/* View All Menu Button */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link href="/menu" className="btn-primary" style={{ padding: '18px 40px', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(255,71,87,0.3)' }}>
            🍕 View All Menu Items (14+)
          </Link>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>What Our <span>Pizza Lovers</span> Say</h2>
            <p>Real reviews from our awesome customers in Dhaka</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--secondary)', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', marginBottom: '15px', color: 'var(--text-muted)' }}>"The Fajita Siciliana pizza is absolute perfection! Super cheesy and hot."</p>
              <h4 style={{ color: 'var(--text-main)' }}>- Tanvir Ahmed</h4>
            </div>

            <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--secondary)', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', marginBottom: '15px', color: 'var(--text-muted)' }}>"Fast delivery and the Cold Coffee with Garlic Bread is a must try."</p>
              <h4 style={{ color: 'var(--text-main)' }}>- Nusrat Jahan</h4>
            </div>

            <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--secondary)', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', marginBottom: '15px', color: 'var(--text-muted)' }}>"Best dark theme pizza website! Order tracking feature works smoothly."</p>
              <h4 style={{ color: 'var(--text-main)' }}>- Ayman Sadik</h4>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Promo Banner */}
      <section className="container" style={{ padding: '80px 0' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,71,87,0.2), rgba(255,165,2,0.2))', border: '1px solid var(--primary)', borderRadius: '24px', padding: '50px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>Order Faster with <span style={{ color: 'var(--primary)' }}>La Pizzeria App</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Get exclusive deals, track live delivery, and order with 1 tap.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="btn-secondary" style={{ background: '#000', borderColor: '#333' }}> App Store</button>
            <button className="btn-primary">▶ Google Play</button>
          </div>
        </div>
      </section>
    </>
  );
}
