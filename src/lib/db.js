import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price INTEGER,
        image_url TEXT,
        category TEXT
      );
      
      CREATE TABLE IF NOT EXISTS addons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        phone TEXT,
        address TEXT,
        total_amount INTEGER,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        pizza_id INTEGER,
        quantity INTEGER,
        size TEXT,
        crust TEXT,
        addons TEXT,
        FOREIGN KEY(order_id) REFERENCES orders(id),
        FOREIGN KEY(pizza_id) REFERENCES menu(id)
      );
    `);
    
    // Seed Addons
    const addonsCount = await db.get('SELECT COUNT(*) as count FROM addons');
    if (addonsCount.count === 0) {
      await db.run(`INSERT INTO addons (name, price) VALUES ('Extra Cheese', 150)`);
      await db.run(`INSERT INTO addons (name, price) VALUES ('Spicy Chicken', 120)`);
      await db.run(`INSERT INTO addons (name, price) VALUES ('Black Olives', 80)`);
      await db.run(`INSERT INTO addons (name, price) VALUES ('Jalapenos', 60)`);
    }

    // Seed Menu data if empty
    const count = await db.get('SELECT COUNT(*) as count FROM menu');
    if (count.count === 0) {
      const fs = await import('fs');
      const path = await import('path');
      const files = fs.readdirSync(path.join(process.cwd(), 'public/images'));
      const getFile = (prefix) => files.find(f => f.startsWith(prefix)) || '';

      const margherita = getFile('pizza_margherita');
      const pepperoni = getFile('pizza_pepperoni');
      const truffle = getFile('pizza_truffle');
      const pasta = getFile('pasta_dish');
      const sides = getFile('garlic_bread');

      // Pizzas
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Super Supreme', 'Beef, pepperoni, mushrooms, onions, bell peppers, and black olives.', 949, '/images/' + margherita, 'Pizzas']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Fajita Siciliana', 'Spicy chicken fajita, jalapenos, onions, and lots of cheese.', 849, '/images/' + pepperoni, 'Pizzas']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Beef Pepperoni', 'A classic pizza hut favorite loaded with beef pepperoni.', 899, '/images/' + truffle, 'Pizzas']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['BBQ Chicken', 'Smoky BBQ chicken, red onions, cilantro, and mozzarella.', 849, '/images/' + pepperoni, 'Pizzas']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Margherita', 'Classic tomato sauce, fresh mozzarella, and basil.', 699, '/images/' + margherita, 'Pizzas']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Truffle Mushroom', 'White sauce, roasted mushrooms, truffle oil, and parmesan.', 999, '/images/' + truffle, 'Pizzas']
      );
      
      // Pasta
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Creamy Mushroom Pasta', 'Penne pasta tossed in rich white sauce with fresh mushrooms.', 599, '/images/' + pasta, 'Pasta']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Spicy Bolognese', 'Spicy ground beef in traditional Italian tomato sauce.', 649, '/images/' + pasta, 'Pasta']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Baked Ziti', 'Oven baked ziti pasta with marinara and melted mozzarella.', 699, '/images/' + pasta, 'Pasta']
      );
      
      // Sides
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Garlic Bread Supreme', 'Freshly baked garlic bread topped with mozzarella.', 299, '/images/' + sides, 'Sides']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Potato Wedges', 'Crispy baked potato wedges served with our signature dip.', 249, '/images/' + sides, 'Sides']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Cheesy Jalapeno Bites', 'Fried cheese bites stuffed with spicy jalapenos.', 349, '/images/' + sides, 'Sides']
      );

      // Drinks
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Pepsi Can', 'Chilled 330ml Pepsi can.', 99, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&fit=crop', 'Drinks']
      );
      await db.run(`INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)`, 
        ['Cold Coffee', 'Premium iced coffee with cream.', 199, '/images/cold_coffee.jpg', 'Drinks']
      );
    }
  }
  return db;
}
