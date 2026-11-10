'use client';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function PizzaMenu({ pizzas, addons }) {
  const { addToCart } = useCart();
  const [selectedPizza, setSelectedPizza] = useState(null);
  
  // Filtering state
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [size, setSize] = useState('Medium');
  const [crust, setCrust] = useState('Pan Crust');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const openModal = (pizza) => {
    setSelectedPizza(pizza);
    setSize('Medium');
    setCrust('Pan Crust');
    setSelectedAddons([]);
    setInstructions('');
    setQuantity(1);
  };

  const closeModal = () => setSelectedPizza(null);

  const toggleAddon = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    if (!selectedPizza) return 0;
    let total = selectedPizza.price;
    if (size === 'Family') total += 400; // Family size is extra 400
    if (crust === 'Cheese Stuffed') total += 150;
    selectedAddons.forEach(a => total += a.price);
    return total * quantity;
  };

  const handleAddToCart = () => {
    addToCart({
      pizza: selectedPizza,
      size,
      crust,
      addons: selectedAddons,
      instructions,
      quantity,
      totalPrice: calculateTotal()
    });
    closeModal();
  };

  const categories = ['All', 'Deals', 'Pizzas', 'Melts', 'Pasta', 'Sides', 'Drinks'];
  
  const filteredItems = pizzas.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search and Categories */}
      <div style={{marginBottom: '40px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px'}}>
          <div style={{display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px'}}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                  color: activeCategory === cat ? 'white' : 'var(--text-main)',
                  border: '1px solid ' + (activeCategory === cat ? 'var(--primary)' : 'var(--glass-border)'),
                  padding: '10px 25px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: '0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div style={{position: 'relative', width: '300px', maxWidth: '100%'}}>
            <input 
              type="text" 
              placeholder="Search menu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 20px',
                paddingLeft: '45px',
                borderRadius: '30px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.05)',
                color: 'var(--text-main)'
              }}
            />
            <span style={{position: 'absolute', left: '15px', top: '12px', opacity: 0.5}}>🔍</span>
          </div>
        </div>
      </div>

      <div className="pizza-grid">
        {filteredItems.length === 0 ? (
          <p style={{color: 'var(--text-muted)', fontSize: '1.2rem', gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0'}}>
            No items found matching your search.
          </p>
        ) : (
          filteredItems.map(pizza => (
            <div key={pizza.id} className="menu-card">
              <img src={pizza.image_url} alt={pizza.name} />
              <div className="menu-info">
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
                
                <div className="menu-bottom">
                  <span className="price">৳ {pizza.price}</span>
                  <button className="btn-primary" style={{padding:'8px 20px'}} onClick={() => openModal(pizza)}>Order Now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Customize Your Pizza Modal */}
      {selectedPizza && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            <div className="modal-left">
              <h2>Customize Order</h2>
              <img src={selectedPizza.image_url} alt={selectedPizza.name} style={{height:'300px', objectFit:'cover', marginTop:'20px'}} />
              <h3 style={{marginTop:'10px', fontSize:'1.5rem'}}>{selectedPizza.name}</h3>
              <p style={{color:'var(--text-muted)', marginBottom:'20px'}}>{selectedPizza.description}</p>
              
              {selectedPizza.category === 'Pizzas' && (
                <div style={{display:'flex', gap:'20px', marginBottom:'20px'}}>
                  <div style={{flex:1}}>
                    <label style={{fontWeight:'bold', display:'block', marginBottom:'5px', color:'var(--text-muted)'}}>Select Size</label>
                    <select className="modal-select" value={size} onChange={e => setSize(e.target.value)}>
                      <option value="Personal">Personal</option>
                      <option value="Medium">Medium</option>
                      <option value="Family">Family (+৳400)</option>
                    </select>
                  </div>
                  <div style={{flex:1}}>
                    <label style={{fontWeight:'bold', display:'block', marginBottom:'5px', color:'var(--text-muted)'}}>Select Crust</label>
                    <select className="modal-select" value={crust} onChange={e => setCrust(e.target.value)}>
                      <option value="Pan Crust">Pan Crust</option>
                      <option value="Classic">Classic</option>
                      <option value="Cheese Stuffed">Cheese Stuffed (+৳150)</option>
                    </select>
                  </div>
                </div>
              )}

              <div style={{marginBottom:'20px'}}>
                <label style={{fontWeight:'bold', display:'block', marginBottom:'5px', color:'var(--text-muted)'}}>Special Instructions</label>
                <textarea 
                  rows="3" 
                  className="modal-select"
                  placeholder="e.g. Extra baked, no onions..."
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="modal-right">
              <h3 style={{marginBottom:'20px'}}>Add Ons</h3>
              <div className="addons-list">
                {addons.map(addon => (
                  <div key={addon.id} className="addon-item">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={!!selectedAddons.find(a => a.id === addon.id)}
                        onChange={() => toggleAddon(addon)}
                        style={{width:'18px', height:'18px'}}
                      />
                      <span>{addon.name}</span>
                    </label>
                    <span style={{color:'var(--primary)', fontWeight:'bold'}}>+৳{addon.price}</span>
                  </div>
                ))}
              </div>
              
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px', background:'rgba(0,0,0,0.05)', padding:'10px', borderRadius:'8px'}}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{border:'none', background:'none', color:'var(--text-main)', fontSize:'24px', cursor:'pointer'}}>-</button>
                <span style={{fontWeight:'bold', fontSize:'20px', color:'var(--text-main)'}}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{border:'none', background:'none', color:'var(--text-main)', fontSize:'24px', cursor:'pointer'}}>+</button>
              </div>

              <button className="btn-primary" style={{width:'100%', fontSize:'1.1rem', padding:'15px', display:'flex', justifyContent:'space-between'}} onClick={handleAddToCart}>
                <span>Add to Cart</span>
                <span>৳ {calculateTotal()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
