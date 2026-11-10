'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pizzaId = searchParams.get('pizza');
  
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (pizzaId) {
      fetch('/api/menu/' + pizzaId)
        .then(res => res.json())
        .then(data => {
          setPizza(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [pizzaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacingOrder(true);
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          phone: form.phone,
          address: form.address,
          total_amount: pizza.price,
          items: [{ pizza_id: pizza.id, quantity: 1 }]
        })
      });
      
      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    }
    setPlacingOrder(false);
  };

  if (loading) return <div className="page-container container"><h2 className="page-title">লোড হচ্ছে...</h2></div>;

  if (success) {
    return (
      <div className="page-container container" style={{ textAlign: 'center' }}>
        <h1 className="page-title">অর্ডার <span>সফল!</span></h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
          আপনার অর্ডারটি সফলভাবে প্লেস করা হয়েছে। আমাদের ডেলিভারি হিরো শীঘ্রই আপনার সাথে যোগাযোগ করবে।
        </p>
        <Link href="/menu" className="btn-primary">আরও অর্ডার করুন</Link>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="page-container container" style={{ textAlign: 'center' }}>
        <h1 className="page-title">কোনো পিজ্জা <span>সিলেক্ট করা হয়নি</span></h1>
        <Link href="/menu" className="btn-primary">মেনু দেখুন</Link>
      </div>
    );
  }

  return (
    <div className="page-container container">
      <h1 className="page-title">চেকআউট</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', background: 'var(--surface)', padding: '30px', borderRadius: '16px' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>ডেলিভারি ইনফরমেশন</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>আপনার নাম</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>ফোন নাম্বার</label>
              <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>ঠিকানা</label>
              <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }}></textarea>
            </div>
            <button type="submit" disabled={placingOrder} className="btn-primary" style={{ marginTop: '10px' }}>
              {placingOrder ? 'অর্ডার হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
            </button>
          </form>
        </div>

        <div style={{ width: '350px', background: 'var(--surface)', padding: '30px', borderRadius: '16px', height: 'fit-content' }}>
          <h2 style={{ marginBottom: '20px' }}>অর্ডার সামারি</h2>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <img src={pizza.image_url} alt={pizza.name} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
            <div>
              <h4 style={{ fontSize: '1.1rem' }}>{pizza.name}</h4>
              <p style={{ color: 'var(--primary)' }}>৳{pizza.price}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>সর্বমোট:</span>
            <span style={{ color: 'var(--secondary)' }}>৳{pizza.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="page-container container"><h2 className="page-title">লোড হচ্ছে...</h2></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
