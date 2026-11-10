'use client';
import { useCart } from './CartContext';

export default function DeliveryNotification() {
  const { deliveryMode } = useCart();

  return (
    <div style={{
      background: deliveryMode === 'Delivery' ? 'rgba(255,71,87,0.15)' : 'rgba(255,165,2,0.15)',
      borderBottom: '1px solid ' + (deliveryMode === 'Delivery' ? 'var(--primary)' : 'var(--secondary)'),
      padding: '8px 0',
      textAlign: 'center',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      marginTop: '80px',
      color: 'var(--text-main)'
    }}>
      {deliveryMode === 'Delivery' ? (
        <span>🛵 Currently in <strong>Delivery Mode</strong> — Est. Delivery: 30-40 mins</span>
      ) : (
        <span>🥡 Currently in <strong>Takeaway Mode</strong> — Store Pickup (Est. 15 mins)</span>
      )}
    </div>
  );
}
