const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const port = 80;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(helmet());

app.get('/data', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`REST API listening on port ${port}`);
});