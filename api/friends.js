var express = require("express");
const mongoose = require('mongoose');
const { queryParser } = require('express-query-parser')
const bodyParser = require('body-parser');
var Router = express.Router();

Router.use(queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true
}));

Router.use(bodyParser.urlencoded({ extended: true }));

Router.post("/addfriend", function(req,res) {
    console.log('Got body:', req.body);
    res.sendStatus(200);
})


Router.delete("/removefriend", function(req,res) {
    console.log('Got body:', req.body);
    res.sendStatus(200);
})

module.exports = Router;