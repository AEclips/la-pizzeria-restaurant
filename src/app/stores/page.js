export default function StoresPage() {
  const stores = [
    { name: 'Gulshan 1 Branch', address: 'House 12, Road 5, Gulshan 1, Dhaka', phone: '+880 1711-000001', hours: '10:00 AM - 11:00 PM' },
    { name: 'Dhanmondi Branch', address: 'Satmasjid Road, Dhanmondi 27, Dhaka', phone: '+880 1711-000002', hours: '10:00 AM - 11:00 PM' },
    { name: 'Banani Branch', address: 'Block 11, Road 11, Banani, Dhaka', phone: '+880 1711-000003', hours: '10:00 AM - 11:30 PM' },
    { name: 'Uttara Branch', address: 'Sector 3, Sonargaon Janapath, Uttara, Dhaka', phone: '+880 1711-000004', hours: '10:00 AM - 11:00 PM' },
    { name: 'Daffodil Smart City Branch', address: 'Daffodil Smart City, Birulia, Savar, Dhaka', phone: '+880 1711-000005', hours: '09:00 AM - 10:00 PM' },
  ];

  return (
    <div className="container" style={{ padding: '120px 0 50px', minHeight: '80vh' }}>
      <div className="section-header">
        <h2>Store <span>Locator</span></h2>
        <p>Find your nearest La Pizzeria branch in Dhaka for dine-in or takeaway.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {stores.map((s, idx) => (
          <div key={idx} style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{s.name}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>📍 {s.address}</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>📞 {s.phone}</p>
            <p style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>⏰ {s.hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
