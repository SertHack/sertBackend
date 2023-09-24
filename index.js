const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const api = require('./api/api.js')
const friends = require('./api/friends.js')
const session = require("cookie-session")
const path = require('path');
const port = 80;

app.set("trust-proxy", 1)

app.use("/static", express.static(path.join(__dirname,  "/build/static")))

app.use(session({
    name: "session",
    secret: 'LOCKLOCK',  
    resave: true,
    saveUninitialized: false,
    secure: false,
    maxAge: 24 * 60 * 60 * 60000
}));

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
}));

//API
app.use("/api", api);
app.use("/api/friends", friends)

app.use(helmet());

app.get("/manifest.json", (req,res) => {
    res.send(path.join(__dirname, "/build/manifest.json"))
})

app.all("/", (req,res) => {
    if(Object.keys(req.session).length === 0) {
        res.redirect("/signup")
    } else {
        res.sendFile(path.join(__dirname, "/build/index.html"))
     }
})

app.get("/explore", (req,res) => {
    if(Object.keys(req.session).length === 0) {
        res.redirect("/signup")
    } else {
        res.sendFile(path.join(__dirname, "/build/index.html"))
     }
})

app.get("/jobs", (req,res) => {
    if(Object.keys(req.session).length === 0) {
        res.redirect("/signup")
    } else {
        res.sendFile(path.join(__dirname, "/build/index.html"))
     }
})

app.get("/profile", (req,res) => {
    if(Object.keys(req.session).length === 0) {
        res.redirect("/signup")
    } else {
        res.sendFile(path.join(__dirname, "/build/index.html"))
     }
})

app.get("/signup", (req,res) => {
    console.log("Redirected")
    res.sendFile(path.join(__dirname, "/build/index.html"))
})

app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"))
})

app.listen(port, () => {
    console.log(`REST API listening on port ${port}`);
});