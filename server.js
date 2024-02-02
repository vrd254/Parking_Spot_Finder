const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Create a SQLite database and a users table
const db = new sqlite3.Database('users.db');
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, phone TEXT)');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle login form submission
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Perform authentication logic
        const user = await getUserByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            res.send({ success: true, message: 'Login successful!' });
        } else {
            res.send({ success: false, message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});

// Handle registration form submission
app.post('/register', async (req, res) => {
    try {
        const { username, password, phone } = req.body;

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Perform user registration logic
        const result = await registerUser(username, hashedPassword, phone);

        if (result) {
            res.send({ success: true, message: 'Registration successful!' });
        } else {
            res.status(500).send({ success: false, message: 'Error registering user.' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});

// Helper function to get a user by username
function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Helper function to register a new user
function registerUser(username, hashedPassword, phone) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (username, password, phone) VALUES (?, ?, ?)', [username, hashedPassword, phone], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID); // Return the ID of the newly inserted user
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
