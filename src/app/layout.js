import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { CartProvider } from "./CartContext";
import FloatingCart from "./FloatingCart";
import HeaderActions from "./HeaderActions";
import SidebarDrawer from "./SidebarDrawer";
import DeliveryNotification from "./DeliveryNotification";

export const metadata = {
  title: "La Pizzeria | Premium Pizza",
  description: "The city's finest premium and authentic pizzas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <header className="navbar" id="navbar">
            <div className="container nav-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <SidebarDrawer />
                <Link href="/" className="logo">La <span>Pizzeria</span></Link>
              </div>
              <nav>
                <ul className="nav-links">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/menu">Menu</Link></li>
                  <li><Link href="/track-order">Track Order</Link></li>
                  <li><Link href="/admin">Admin</Link></li>
                </ul>
              </nav>
              <HeaderActions />
            </div>
          </header>

          <main>
            <DeliveryNotification />
            {children}
          </main>
          
          <FloatingCart />

          <footer>
            <div className="container footer-content">
              <div className="footer-brand">
                <h2>La <span>Pizzeria</span></h2>
                <p>The city's finest premium pizza shop.</p>
              </div>
              <div className="footer-links">
                <h3>Links</h3>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/menu">Menu</Link></li>
                  <li><Link href="/admin">Admin</Link></li>
                </ul>
              </div>
              <div className="footer-contact">
                <h3>Contact</h3>
                <p>Gulshan 1, Dhaka, Bangladesh</p>
                <p>Phone: +880 1234 567890</p>
                <p>Email: hello@lapizzeria.com</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 La Pizzeria. All rights reserved.</p>
            </div>
          </footer>

          <Script id="navbar-scroll" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('scroll', () => {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                  if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                  } else {
                    navbar.classList.remove('scrolled');
                  }
                }
              });
            `
          }} />
        </CartProvider>
      </body>
    </html>
  );
}
