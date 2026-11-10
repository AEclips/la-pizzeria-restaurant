import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const db = await getDb();
  
  // Fetch orders with their items
  const orders = await db.all('SELECT * FROM orders ORDER BY created_at DESC');
  
  // For each order, fetch its items
  for (let order of orders) {
    order.items = await db.all(`
      SELECT oi.*, m.name as pizza_name 
      FROM order_items oi 
      JOIN menu m ON oi.pizza_id = m.id 
      WHERE oi.order_id = ?
    `, [order.id]);
  }

  return (
    <div className="container" style={{padding: '120px 0 50px'}}>
      <div className="section-header">
        <h2>Admin <span>Dashboard</span></h2>
      </div>

      <div style={{background: 'var(--surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--glass-border)'}}>
        <h3 style={{marginBottom: '20px'}}>Recent Orders</h3>
        
        {orders.length === 0 ? (
          <p style={{color: 'var(--text-muted)'}}>No orders placed yet.</p>
        ) : (
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr style={{borderBottom: '1px solid var(--glass-border)'}}>
                <th style={{padding: '15px 10px', color: 'var(--text-muted)'}}>Order ID</th>
                <th style={{padding: '15px 10px', color: 'var(--text-muted)'}}>Customer</th>
                <th style={{padding: '15px 10px', color: 'var(--text-muted)'}}>Details</th>
                <th style={{padding: '15px 10px', color: 'var(--text-muted)'}}>Address</th>
                <th style={{padding: '15px 10px', color: 'var(--text-muted)'}}>Total</th>
                <th style={{padding: '15px 10px', color: 'var(--text-muted)'}}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{borderBottom: '1px solid var(--glass-border)'}}>
                  <td style={{padding: '15px 10px'}}>#{order.id}</td>
                  <td style={{padding: '15px 10px'}}>
                    <strong>{order.customer_name}</strong><br/>
                    <span style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{order.phone}</span>
                  </td>
                  <td style={{padding: '15px 10px'}}>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem'}}>
                      {order.items.map(item => (
                        <li key={item.id} style={{marginBottom: '5px'}}>
                          <span style={{color: 'var(--secondary)'}}>{item.quantity}x</span> {item.pizza_name} 
                          <br/><span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>({item.size}, {item.crust})</span>
                          {item.addons && <br/>}
                          {item.addons && <span style={{fontSize: '0.8rem', color: '#ff6b81'}}>+ {item.addons}</span>}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{padding: '15px 10px', maxWidth: '200px'}}>{order.address}</td>
                  <td style={{padding: '15px 10px', color: 'var(--primary)', fontWeight: 'bold'}}>৳{order.total_amount}</td>
                  <td style={{padding: '15px 10px', fontSize: '0.9rem'}}>{new Date(order.created_at).toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
