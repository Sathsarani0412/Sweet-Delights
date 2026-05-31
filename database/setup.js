const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/cake_shop.db');

db.serialize(() => {

    // CREATE CAKES TABLE

    db.run(`
        CREATE TABLE IF NOT EXISTS cakes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price INTEGER,
            image TEXT,
            category TEXT,
            description TEXT
        )
    `);

    // CREATE ORDERS TABLE

    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            phone TEXT,
            address TEXT,
            total INTEGER
        )
    `);
    // CREATE CART TABLE

db.run(`
    CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cake_id INTEGER,
        quantity INTEGER
    )
`);

db.run(`
    CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    cake_name TEXT,
    quantity INTEGER,
    price INTEGER
)
    `);
    console.log("Tables created successfully.");

});

db.close();