import { getDb } from '@/lib/db';
import Link from 'next/link';

export default async function PizzaDetails({ params }) {
  const resolvedParams = await params;
  const db = await getDb();
  const pizza = await db.get('SELECT * FROM menu WHERE id = ?', resolvedParams.id);

  if (!pizza) {
    return (
      <div className="page-container container">
        <h1 className="page-title">পিজ্জা পাওয়া <span>যায়নি</span></h1>
        <div style={{ textAlign: 'center' }}>
          <Link href="/menu" className="btn-secondary">মেনুতে ফিরে যান</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container container">
      <div className="fade-in" style={{ display: 'flex', gap: '50px', alignItems: 'center', background: 'var(--surface)', padding: '40px', borderRadius: '24px', flexWrap: 'wrap', border: '1px solid rgba(255,255,255,0.05)' }}>
        <img src={pizza.image_url} alt={pizza.name} style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', objectFit: 'cover' }} />
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255, 193, 7, 0.1)', color: 'var(--secondary)', padding: '5px 15px', borderRadius: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
            {pizza.category}
          </div>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '20px', lineHeight: '1.2' }}>{pizza.name}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.8' }}>{pizza.description}</p>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '40px' }}>
            ৳{pizza.price}
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href={`/checkout?pizza=${pizza.id}`} className="btn-primary">এক্ষুনি অর্ডার করুন</Link>
            <Link href="/menu" className="btn-secondary">মেনুতে ফিরে যান</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
