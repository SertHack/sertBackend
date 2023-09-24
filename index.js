const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const api = require('./api/api.js')
const friends = require('./api/friends.js')
const session = require("cookie-session")
const port = 80;

app.set("trust-proxy", 1)




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

app.get('/', (req, res) => {
    console.log(req.session)
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`REST API listening on port ${port}`);
});