'use client';
import { useState } from 'react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetch(`/api/orders`);
      if (res.ok) {
        const orders = await res.json();
        const found = orders.find(o => o.id === parseInt(orderId));
        if (found) {
          setOrder(found);
        } else {
          setError('Order ID not found. Please check and try again.');
        }
      }
    } catch (err) {
      setError('Failed to fetch order status.');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: '120px 0 50px', minHeight: '80vh' }}>
      <div className="section-header">
        <h2>Track Your <span>Order</span></h2>
        <p>Enter your Order ID to check the live status of your pizza.</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
          <input 
            type="number" 
            placeholder="Enter Order ID (e.g. 1)" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{ flex: 1, padding: '15px 20px', borderRadius: '30px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '1rem' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '15px 30px' }}>
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div style={{ padding: '20px', background: 'rgba(255,71,87,0.1)', border: '1px solid var(--primary)', borderRadius: '12px', color: 'var(--primary)', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {order && (
          <div className="fade-in" style={{ background: 'var(--surface)', padding: '30px', borderRadius: '24px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px', marginBottom: '25px' }}>
              <div>
                <h3>Order #{order.id}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Customer: {order.customer_name}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>৳{order.total_amount}</span>
                <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>Status: {order.status}</p>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓ Order Placed</span>
                <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>🔥 Kitchen Preparing</span>
                <span>🛵 On the Way</span>
                <span>😋 Delivered</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '10px' }}></div>
              </div>
            </div>

            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              <p><strong>Address:</strong> {order.address || 'Takeaway Order (Store Pickup)'}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
