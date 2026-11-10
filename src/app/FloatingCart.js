'use client';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

export default function FloatingCart() {
  const { cart } = useCart();
  const router = useRouter();

  if (cart.length === 0) return null;

  return (
    <div className="floating-cart" onClick={() => router.push('/cart-details')}>
      🛒
      <div className="badge">{cart.length}</div>
    </div>
  );
}
