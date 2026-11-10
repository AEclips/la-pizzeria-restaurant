'use client';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="container fade-in" style={{ textAlign: 'center', padding: '150px 20px 100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface)', padding: '60px 40px', borderRadius: '24px', border: '1px solid var(--glass-border)', maxWidth: '600px', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Order Successful!</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
          Thank you for ordering from La Pizzeria. Your order has been successfully placed and our chefs are already preparing it.
        </p>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '30px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '10px' }}>What's Next?</h3>
          <p style={{ color: 'var(--text-muted)' }}>If you chose Delivery, our delivery hero will contact you shortly. If you chose Takeaway, it will be ready at our Gulshan branch in 20 minutes.</p>
        </div>
        <Link href="/" className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
