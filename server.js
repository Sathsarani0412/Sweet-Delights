const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

// =========================
// DATABASE
// =========================

const db = new sqlite3.Database('./database/cake_shop.db', (err) => {

    if(err){
        console.log(err.message);
    }else{
        console.log("Connected to SQLite database.");
    }

});

// =========================
// CREATE TABLES
// =========================

db.serialize(() => {

    // CAKES TABLE

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

    // ORDERS TABLE

    db.run(`
        CREATE TABLE IF NOT EXISTS orders (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            customer_name TEXT,
            phone TEXT,
            address TEXT,
            total INTEGER

        )
    `);

    console.log("Tables ready.");

});

// =========================
// HTML ROUTES
// =========================

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/cakes', (req, res) => {
    res.sendFile(__dirname + '/views/cakes.html');
});

app.get('/custom-cakes', (req, res) => {
    res.sendFile(__dirname + '/views/custom-cakes.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

app.get('/order', (req, res) => {
    res.sendFile(__dirname + '/views/order.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/admin.html');
});

// =========================
// IMAGE UPLOAD
// =========================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'public/uploads/');

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname));

    }

});

const upload = multer({ storage });

// =========================
// ADD CAKE
// =========================

app.post('/add-cake', upload.single('image'), (req, res) => {

    const {
        name,
        price,
        category,
        description
    } = req.body;

    const image = '/uploads/' + req.file.filename;

    db.run(`
        INSERT INTO cakes
        (name, price, image, category, description)

        VALUES (?, ?, ?, ?, ?)
    `,
    [name, price, image, category, description],

    (err) => {

        if(err){

            console.log(err);

            return res.status(500).send("Database Error");

        }

        res.send("Cake Added Successfully");

    });

});

// =========================
// GET ALL CAKES
// =========================

app.get('/get-cakes', (req, res) => {

    db.all(`
        SELECT * FROM cakes
        ORDER BY id DESC
    `, [],

    (err, rows) => {

        if(err){

            console.log(err);

            return res.json([]);

        }

        res.json(rows);

    });

});

// =========================
// API CAKES
// =========================

app.get('/api/cakes', (req, res) => {

    db.all(`
        SELECT * FROM cakes
    `, [],

    (err, rows) => {

        if(err){

            return res.status(500).json(err);

        }

        res.json(rows);

    });

});

// =========================
// SEARCH CAKES
// =========================

app.get('/search-cakes', (req, res) => {

    const keyword = req.query.keyword;

    db.all(`
        SELECT * FROM cakes
        WHERE name LIKE ?
    `,
    [`%${keyword}%`],

    (err, rows) => {

        if(err){

            console.log(err);

            return res.json([]);

        }

        res.json(rows);

    });

});

// =========================
// SAVE ORDER
// =========================

app.post('/api/orders', (req, res) => {

    const {
        customer_name,
        phone,
        address,
        total
    } = req.body;

    const sql = `
        INSERT INTO orders
        (customer_name, phone, address, total)

        VALUES (?, ?, ?, ?)
    `;

    db.run(sql,

    [
        customer_name,
        phone,
        address,
        total
    ],

    function(err){

        if(err){

            console.log(err);

            return res.status(500).json({
                success:false
            });

        }

        res.json({

            success:true,
            orderId:this.lastID

        });

    });

});

// =========================
// GET ALL ORDERS
// =========================

app.get('/get-orders', (req, res) => {

    db.all(`
        SELECT * FROM orders
        ORDER BY id DESC
    `, [],

    (err, rows) => {

        if(err){

            console.log(err);

            return res.json([]);

        }

        res.json(rows);

    });

});

// =========================
// START SERVER
// =========================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`
    ===================================
    Sweet Delights Server Running
    http://localhost:${PORT}
    ===================================
    `);

});