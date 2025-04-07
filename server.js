require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Connect to MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

// 🔹 Signup Route - Saves User in Database
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // 🛑 Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 🔹 Hash password (for security)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Insert new user into database
        db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword], 
            (err, result) => {
                if (err) return res.status(500).json({ message: "Error saving user" });

                res.status(201).json({ message: "User created successfully" });
            }
        );
    });
});

// 🔹 Google Sign-Up Route
app.post("/signup/google", async (req, res) => {
    const { id_token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Logic to create a new user in the database
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length === 0) {
            // Create new user if not exists
            db.query("INSERT INTO users (name, email) VALUES (?, ?)", 
                [payload.name, email], 
                (err, result) => {
                    if (err) return res.status(500).json({ message: "Error saving user" });
                    return res.status(201).json({ success: true });
                }
            );
        } else {
            return res.status(200).json({ success: true, email });
        }
    });
});

// 🔹 Google Sign-In Route
app.post("/signin/google", async (req, res) => {
    const id_token = req.body.id_token; // Corrected declaration
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Logic to find the user in the database and create a session
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length > 0) {
            // User exists, create session logic here
            return res.status(200).json({ success: true, email });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    });
});

// 🔹 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
