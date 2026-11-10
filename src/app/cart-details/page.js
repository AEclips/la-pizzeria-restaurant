'use client';
import { useCart } from '../CartContext';
import { useState } from 'react';

export default function CartDetailsPage() {
  const { cart, clearCart, removeFromCart, deliveryMode } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [placing, setPlacing] = useState(false);
  
  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const rawTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const finalTotal = Math.max(0, rawTotal - discount);

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'PIZZA100') {
      setDiscount(100);
      setPromoMessage('✅ Code PIZZA100 applied! (৳100 Off)');
    } else if (code === 'WELCOME20') {
      const disc = Math.round(rawTotal * 0.2);
      setDiscount(disc);
      setPromoMessage(`✅ Code WELCOME20 applied! (20% Off - ৳${disc})`);
    } else {
      setDiscount(0);
      setPromoMessage('❌ Invalid Promo Code. Try PIZZA100 or WELCOME20');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);

    const items = cart.map(item => ({
      pizza_id: item.pizza.id,
      quantity: item.quantity,
      size: item.size,
      crust: item.crust,
      addons: item.addons.map(a => a.name).join(', ')
    }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          phone: form.phone,
          address: deliveryMode === 'Delivery' ? form.address : 'Takeaway Order (Store Pickup)',
          total_amount: finalTotal,
          items
        })
      });

      if (res.ok) {
        clearCart();
        window.location.href = '/order-success';
      }
    } catch (err) {
      console.error(err);
    }
    setPlacing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '150px', minHeight: '60vh' }}>
        <h2 style={{fontSize:'2.5rem', marginBottom:'20px', color:'var(--text-main)'}}>Your Cart is <span style={{color:'var(--primary)'}}>Empty!</span></h2>
        <p style={{color:'var(--text-muted)'}}>Please select your favorite items from the menu.</p>
        <a href="/" className="btn-primary" style={{marginTop:'30px', display:'inline-block'}}>View Menu</a>
      </div>
    );
  }

  return (
    <div className="container" style={{padding:'120px 0 50px'}}>
      <div className="section-header">
        <h2>Cart <span>Details</span></h2>
      </div>
      
      <div style={{display:'flex', gap:'40px', flexWrap:'wrap'}}>
        {/* Cart Items */}
        <div style={{flex:1, minWidth:'350px'}}>
          {cart.map((item, index) => (
            <div key={index} style={{background:'var(--surface)', padding:'20px', borderRadius:'16px', marginBottom:'20px', border:'1px solid var(--glass-border)', position:'relative', backdropFilter:'blur(10px)'}}>
              <button onClick={() => removeFromCart(index)} style={{position:'absolute', top:'15px', right:'15px', background:'rgba(255,71,87,0.1)', width:'30px', height:'30px', borderRadius:'50%', border:'none', color:'var(--primary)', cursor:'pointer', fontSize:'16px', transition:'0.3s'}}>✕</button>
              
              <div style={{display:'flex', gap:'20px'}}>
                <img src={item.pizza.image_url} alt={item.pizza.name} style={{width:'100px', height:'100px', objectFit:'cover', borderRadius:'12px'}} />
                <div>
                  <h3 style={{fontSize:'1.3rem', marginBottom:'5px', color:'var(--text-main)'}}>{item.pizza.name}</h3>
                  <p style={{color:'var(--text-muted)', fontSize:'1rem'}}>{item.size} • {item.crust}</p>
                  
                  {item.addons.length > 0 && (
                    <p style={{fontSize:'0.9rem', color:'var(--secondary)', marginTop:'5px'}}>
                      + {item.addons.map(a => a.name).join(', ')}
                    </p>
                  )}
                  {item.instructions && (
                    <p style={{fontSize:'0.9rem', color:'#ff6b81', fontStyle:'italic', marginTop:'5px'}}>Note: {item.instructions}</p>
                  )}
                  
                  <div style={{marginTop:'15px', display:'flex', alignItems:'center', gap:'20px'}}>
                    <span style={{fontWeight:'bold', fontSize:'1.1rem', color:'var(--text-main)'}}>Qty: {item.quantity}</span>
                    <span style={{fontWeight:'bold', color:'var(--primary)', fontSize:'1.3rem'}}>৳{item.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Promo Code Box */}
          <div style={{background:'var(--surface)', padding:'20px', borderRadius:'16px', border:'1px solid var(--glass-border)', marginTop:'20px'}}>
            <h4 style={{marginBottom:'10px', color:'var(--text-main)'}}>Have a Promo Code?</h4>
            <div style={{display:'flex', gap:'10px'}}>
              <input 
                type="text" 
                placeholder="Enter PIZZA100 or WELCOME20" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{flex:1, padding:'10px 15px', borderRadius:'8px', border:'1px solid var(--glass-border)', background:'var(--surface-hover)', color:'var(--text-main)'}}
              />
              <button onClick={applyPromo} className="btn-secondary" style={{padding:'10px 20px', fontSize:'0.9rem'}}>Apply</button>
            </div>
            {promoMessage && <p style={{marginTop:'10px', fontSize:'0.9rem', color: promoMessage.startsWith('✅') ? '#2ed573' : '#ff4757'}}>{promoMessage}</p>}
          </div>

          {/* Order Summary */}
          <div style={{background:'var(--surface)', padding:'25px', borderRadius:'16px', border:'1px solid var(--glass-border)', marginTop:'20px'}}>
            <h3 style={{marginBottom:'15px', fontSize:'1.3rem', color:'var(--text-main)'}}>Order Summary</h3>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', color:'var(--text-muted)'}}>
              <span>Subtotal:</span>
              <span>৳{rawTotal}</span>
            </div>
            {discount > 0 && (
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', color:'#2ed573'}}>
                <span>Discount:</span>
                <span>-৳{discount}</span>
              </div>
            )}
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'1.5rem', fontWeight:'bold', borderTop:'1px solid var(--glass-border)', paddingTop:'15px', color:'var(--text-main)'}}>
              <span>Total Amount:</span>
              <span style={{color:'var(--primary)'}}>৳{finalTotal}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{width:'400px', background:'var(--surface)', padding:'40px', borderRadius:'16px', border:'1px solid var(--glass-border)', height:'fit-content', backdropFilter:'blur(10px)'}}>
          <h3 style={{marginBottom:'30px', fontSize:'1.5rem', color:'var(--primary)'}}>Delivery Information</h3>
          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <div>
              <label style={{display:'block', marginBottom:'8px', color:'var(--text-muted)'}}>Your Name</label>
              <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{width:'100%', padding:'15px', borderRadius:'8px', border:'1px solid var(--glass-border)', background:'var(--surface-hover)', color:'var(--text-main)', fontSize:'1rem'}} />
            </div>
            <div>
              <label style={{display:'block', marginBottom:'8px', color:'var(--text-muted)'}}>Phone Number</label>
              <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{width:'100%', padding:'15px', borderRadius:'8px', border:'1px solid var(--glass-border)', background:'var(--surface-hover)', color:'var(--text-main)', fontSize:'1rem'}} />
            </div>
            
            {deliveryMode === 'Delivery' ? (
              <div>
                <label style={{display:'block', marginBottom:'8px', color:'var(--text-muted)'}}>Delivery Address</label>
                <textarea required rows="4" value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={{width:'100%', padding:'15px', borderRadius:'8px', border:'1px solid var(--glass-border)', background:'var(--surface-hover)', color:'var(--text-main)', fontSize:'1rem'}}></textarea>
              </div>
            ) : (
              <div style={{padding:'15px', background:'rgba(255,165,2,0.1)', border:'1px solid var(--secondary)', borderRadius:'8px'}}>
                <p style={{color:'var(--secondary)', fontWeight:'bold', marginBottom:'5px'}}>Takeaway Store Pickup:</p>
                <p style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>Selected Outlet: Gulshan 1 Branch.<br/>Your order will be ready in 20 minutes.</p>
              </div>
            )}

            <div>
              <label style={{display:'block', marginBottom:'8px', color:'var(--text-muted)'}}>Payment Method</label>
              <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                <label style={{flex:1, minWidth:'100px', padding:'10px', background:'var(--surface-hover)', border:'1px solid var(--glass-border)', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem', display:'flex', alignItems:'center', gap:'5px', color:'var(--text-main)'}}>
                  <input type="radio" name="payment" defaultChecked /> 💵 Cash
                </label>
                <label style={{flex:1, minWidth:'100px', padding:'10px', background:'var(--surface-hover)', border:'1px solid var(--glass-border)', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem', display:'flex', alignItems:'center', gap:'5px', color:'var(--text-main)'}}>
                  <input type="radio" name="payment" /> 📱 bKash
                </label>
                <label style={{flex:1, minWidth:'100px', padding:'10px', background:'var(--surface-hover)', border:'1px solid var(--glass-border)', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem', display:'flex', alignItems:'center', gap:'5px', color:'var(--text-main)'}}>
                  <input type="radio" name="payment" /> 💳 Card
                </label>
              </div>
            </div>
            
            <button type="submit" disabled={placing} className="btn-primary" style={{marginTop:'15px', padding:'15px', fontSize:'1.2rem'}}>
              {placing ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
