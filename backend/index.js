const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

/* console.log(process.env.PORT);
console.log(process.env.SESSION_SECRET); */

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const users = [];
const posts = [];

app.post('/user/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }
    users.push({ username, password });
    return res.status(201).json({ message: "User created successfully" });
});

app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    const loginUser = users.find(user => user.username === username && user.password === password);
    if (loginUser) {
        req.session.user = loginUser;
        res.json({ message: "Login Successful", user: username });
    }
    else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

app.get('/user/userSession', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user })
    }
    else {
        res.status(401).json({ message: "Not logged in" })
    }
});

app.post('user/setPost', (req, res) => {
    if (req.session.user) {
        const { post } = req.body;
        posts.push({ user: req.session.user, post });
        res.status(201).json({ message: "Post added successfully" })
    }
    else {
        res.status(401).json({ message: "Not logged in" })
    }
});

app.get('/user/getPosts', (req, res) => {
    if (req.session.user) {
        res.json(posts);
    }
    else {
        res.status(401).json({ message: "Not logged in" })
    }
});

app.post('/user/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
    });
    res.json({ message: "Logged out successfully" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})