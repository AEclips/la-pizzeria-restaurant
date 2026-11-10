export default function BlogPage() {
  const posts = [
    { title: 'The Secret Behind Our Signature Crust', date: 'July 25, 2026', excerpt: 'Discover how we ferment our dough for 48 hours to create the crispiness and flavor.' },
    { title: 'Top 5 Pizza Toppings Preferred in Dhaka', date: 'July 18, 2026', excerpt: 'From Spicy Chicken Fajita to classic Pepperoni, see what Dhaka loves most.' },
    { title: 'Introducing Our New Pizza Hut Style Melts', date: 'July 10, 2026', excerpt: 'Folded, cheesy, and packed with toppings. Try the ultimate snack melt today.' }
  ];

  return (
    <div className="container" style={{ padding: '120px 0 50px', minHeight: '80vh' }}>
      <div className="section-header">
        <h2>Our <span>Blog & Stories</span></h2>
        <p>Read about pizza secrets, recipes, and food stories from La Pizzeria.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {posts.map((p, idx) => (
          <div key={idx} style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>{p.date}</span>
            <h3 style={{ margin: '10px 0', fontSize: '1.4rem' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{p.excerpt}</p>
            <button className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
