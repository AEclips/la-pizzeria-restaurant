const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run('DELETE FROM menu');
  db.run('DELETE FROM addons');

  // Addons
  db.run("INSERT INTO addons (name, price) VALUES ('Extra Cheese', 150)");
  db.run("INSERT INTO addons (name, price) VALUES ('Spicy Chicken', 120)");
  db.run("INSERT INTO addons (name, price) VALUES ('Black Olives', 80)");
  db.run("INSERT INTO addons (name, price) VALUES ('Jalapenos', 60)");

  // Menu items [name, description, price, image_url, category]
  const items = [
    // Deals
    ['Triple Treat Box', '2 Medium Pizzas + 1 Garlic Bread + 2 Pepsi Cans.', 1499, '/images/pizza_margherita_1785096450180.jpg', 'Deals'],
    ['Family Feast Combo', '1 Family Pizza + 1 Spicy Bolognese Pasta + 1 Potato Wedges.', 1299, '/images/pizza_pepperoni_1785096459367.jpg', 'Deals'],
    
    // Melts
    ['Pepperoni & Cheese Melt', 'Loaded with beef pepperoni, mozzarella, and creamy sauce folded in a crispy crust.', 499, '/images/pizza_truffle_1785096469649.jpg', 'Melts'],
    ['Spicy Chicken Melt', 'Spicy fajita chicken, jalapenos, and melted cheese folded to perfection.', 449, '/images/pizza_pepperoni_1785096459367.jpg', 'Melts'],

    // Pizzas
    ['Super Supreme', 'Beef, pepperoni, mushrooms, onions, bell peppers, and black olives.', 949, '/images/pizza_margherita_1785096450180.jpg', 'Pizzas'],
    ['Fajita Siciliana 🌶️', 'Spicy chicken fajita, jalapenos, onions, and lots of cheese.', 849, '/images/pizza_pepperoni_1785096459367.jpg', 'Pizzas'],
    ['Beef Pepperoni', 'A classic pizza hut favorite loaded with beef pepperoni.', 899, '/images/pizza_truffle_1785096469649.jpg', 'Pizzas'],
    ['BBQ Chicken', 'Smoky BBQ chicken, red onions, cilantro, and mozzarella.', 849, '/images/pizza_pepperoni_1785096459367.jpg', 'Pizzas'],
    ['Margherita 🌱', 'Classic tomato sauce, fresh mozzarella, and basil.', 699, '/images/pizza_margherita_1785096450180.jpg', 'Pizzas'],
    ['Truffle Mushroom 🌱', 'White sauce, roasted mushrooms, truffle oil, and parmesan.', 999, '/images/pizza_truffle_1785096469649.jpg', 'Pizzas'],
    
    // Pasta
    ['Creamy Mushroom Pasta 🌱', 'Penne pasta tossed in rich white sauce with fresh mushrooms.', 599, '/images/pasta_dish_1785102852998.jpg', 'Pasta'],
    ['Spicy Bolognese 🌶️', 'Spicy ground beef in traditional Italian tomato sauce.', 649, '/images/pasta_dish_1785102852998.jpg', 'Pasta'],
    ['Baked Ziti', 'Oven baked ziti pasta with marinara and melted mozzarella.', 699, '/images/pasta_dish_1785102852998.jpg', 'Pasta'],
    
    // Sides
    ['Garlic Bread Supreme 🌱', 'Freshly baked garlic bread topped with mozzarella.', 299, '/images/garlic_bread_1785102865253.jpg', 'Sides'],
    ['Potato Wedges 🌱', 'Crispy baked potato wedges served with our signature dip.', 249, '/images/garlic_bread_1785102865253.jpg', 'Sides'],
    ['Cheesy Jalapeno Bites 🌶️', 'Fried cheese bites stuffed with spicy jalapenos.', 349, '/images/garlic_bread_1785102865253.jpg', 'Sides'],
    
    // Drinks
    ['Pepsi Can', 'Chilled 330ml Pepsi can.', 99, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&fit=crop', 'Drinks'],
    ['Cold Coffee', 'Premium iced coffee with cream.', 199, '/images/cold_coffee.jpg', 'Drinks']
  ];

  const stmt = db.prepare('INSERT INTO menu (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)');
  items.forEach(item => stmt.run(item));
  stmt.finalize();
  console.log('Seeded database successfully with Melts, Spicy/Veg badges!');
});
db.close();
