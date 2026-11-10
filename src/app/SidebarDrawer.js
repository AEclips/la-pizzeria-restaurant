'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SidebarDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return (
    <>
      {/* ☰ Hamburger Button */}
      <button 
        onClick={toggleDrawer}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-main)',
          fontSize: '1.8rem',
          cursor: 'pointer',
          padding: '5px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        ☰
      </button>

      {/* Slide-out Overlay & Drawer */}
      {isOpen && (
        <div 
          onClick={toggleDrawer}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 3000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '320px',
              height: '100vh',
              background: 'var(--bg-dark)',
              borderRight: '1px solid var(--glass-border)',
              padding: '30px 20px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 3001,
              boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-main)' }}>La <span style={{ color: 'var(--primary)' }}>Pizzeria</span></h2>
              <button onClick={toggleDrawer} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Menu Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                onClick={() => { setShowLoginModal(true); setIsOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '15px',
                  background: 'var(--primary)', color: 'white',
                  border: 'none', padding: '12px 20px', borderRadius: '30px',
                  fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'
                }}
              >
                👤 Sign In / Register
              </button>

              <button 
                onClick={toggleTheme}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)',
                  border: '1px solid var(--glass-border)', padding: '12px 20px', borderRadius: '12px',
                  fontWeight: '500', cursor: 'pointer'
                }}
              >
                <span>{isLightMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Switch</span>
              </button>

              <Link href="/track-order" onClick={toggleDrawer} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                📜 Order History & Tracking
              </Link>

              <Link href="/cart-details" onClick={toggleDrawer} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                🎟️ Apply Promo Coupon
              </Link>

              <Link href="/menu" onClick={toggleDrawer} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                🍕 Explore Full Menu
              </Link>

              <Link href="/stores" onClick={toggleDrawer} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                📍 Store Locator
              </Link>

              <Link href="/blog" onClick={toggleDrawer} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                📰 Our Blog & Stories
              </Link>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '30px', borderTop: '1px solid var(--glass-border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <p>&copy; 2026 La Pizzeria BD</p>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: '400px', flexDirection: 'column', padding: '40px' }}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>✕</button>
            <h2 style={{ marginBottom: '10px', color: 'var(--primary)' }}>Sign In to La Pizzeria</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Enter your phone number to receive a 1-time password (OTP).</p>
            
            <input type="tel" placeholder="+880 1XXXXXXXXX" style={{ padding: '15px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', marginBottom: '15px' }} />
            <button className="btn-primary" style={{ padding: '12px' }} onClick={() => { alert('OTP Sent to your phone!'); setShowLoginModal(false); }}>Send OTP</button>
          </div>
        </div>
      )}
    </>
  );
}
