'use client';
import { useCart } from './CartContext';
import { useState } from 'react';
import Link from 'next/link';

export default function HeaderActions() {
  const { deliveryMode, setDeliveryMode } = useCart();
  const [outlet, setOutlet] = useState('Gulshan 1');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
      {/* Store Outlet Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--glass-border)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
        <span>📍</span>
        <select 
          value={outlet}
          onChange={(e) => setOutlet(e.target.value)}
          style={{ background: 'transparent', color: 'var(--text-main)', border: 'none', fontWeight: 'bold', cursor: 'pointer', outline: 'none', fontSize: '0.85rem' }}
        >
          <option value="Gulshan 1" style={{ background: '#111' }}>Gulshan 1</option>
          <option value="Dhanmondi" style={{ background: '#111' }}>Dhanmondi</option>
          <option value="Banani" style={{ background: '#111' }}>Banani</option>
          <option value="Uttara" style={{ background: '#111' }}>Uttara</option>
          <option value="Daffodil Smart City" style={{ background: '#111' }}>Daffodil Smart City</option>
        </select>
      </div>

      {/* Delivery / Takeaway Toggle */}
      <div style={{ 
        display: 'flex', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '30px', 
        padding: '3px',
        border: '1px solid var(--glass-border)',
        whiteSpace: 'nowrap'
      }}>
        <button 
          onClick={() => setDeliveryMode('Delivery')}
          style={{
            background: deliveryMode === 'Delivery' ? 'var(--primary)' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            transition: '0.3s'
          }}
        >
          🛵 Delivery
        </button>
        <button 
          onClick={() => setDeliveryMode('Takeaway')}
          style={{
            background: deliveryMode === 'Takeaway' ? 'var(--primary)' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            transition: '0.3s'
          }}
        >
          🥡 Takeaway
        </button>
      </div>
      
      <Link href="/menu" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Order Now</Link>
    </div>
  );
}
