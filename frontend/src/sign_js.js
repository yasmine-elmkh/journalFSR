// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dummy database for storing user data
const users = [];

// Route to render the sign-up form
app.get('/signup', (req, res) => {
    res.send(`
        <h1>Sign Up</h1>
        <form action="/signup" method="post">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
        </form>
    `);
});

// Route to handle sign-up form submission
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const user = { username, password };
    users.push(user);
    res.send('User signed up successfully!');
});

// Route to render the sign-in form
app.get('/signin', (req, res) => {
    res.send(`
        <h1>Sign In</h1>
        <form action="/signin" method="post">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Sign In</button>
        </form>
    `);
});

// Route to handle sign-in form submission
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('User signed in successfully!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
