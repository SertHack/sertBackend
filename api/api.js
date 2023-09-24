var express = require("express");
const uniqid = require('uniqid'); 
const mongoose = require('mongoose');
const session = require("cookie-session")
const bcrypt = require("bcrypt")
const { queryParser } = require('express-query-parser')
var Router = express.Router();


//Schemas
var User = require("../schema/users")
var Session = require("../schema/session")


mongoose.connect('mongodb+srv://Admin:rRmlCfHM17x0cinp@cluster0.59duthc.mongodb.net/sert?retryWrites=true&w=majority').then(() => console.log('Connected to MongoDB!'));

Router.use(queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true
}));

Router.get("/signup", function(req,res) {
    if(Object.keys(req.query).length === 0) {
        res.statusMessage = "No information provided";
        res.status(400).end()
    } else if(req.query.username && req.query.password && req.query.major && req.query.school && req.query.year) {
        let username = req.query.username;
        let password = req.query.password;

        //Password Hashing
        bcrypt.genSalt(10).then(function(salt) {
            console.log("Salt: " + salt)
            return bcrypt.hash(password, salt);
        }).then(function(hash) {
            return User.create({
                Username: username,
                Hashpassword: hash,
                Name: "John Doe",
                Bio: "I am John Doe",
                Major: req.query.major,
                School: req.query.school.toLocaleUpperCase(),
                Year: req.query.year,
                JoinDate: Date.now(),
                Friends: []
            })
        }).then(function(e) {
            console.log(e)
            res.status(200).end()
        }).catch(function(error) {
            res.status(500).end()
        })
    }
});

Router.get("/login", function(req,res) {
    if(Object.keys(req.query).length === 0) {
        res.statusMessage = "No information provided";
        res.status(400).end()
    } else if(req.query.username && req.query.password) {
        let username = req.query.username;
        let password = req.query.password;

        User.findOne({Username: username}).exec().then(function(found) {
            if(!found) {
                res.statusMessage = "Username does not exist";
                res.status(404).end()
            } else {
                bcrypt.compare(password, found.Hashpassword).then(function(isCorrect) {
  
                    if(isCorrect && Object.keys(req.session).length === 0) {
                        let sessionID = uniqid();
                        req.session.profile = {
                            username: found.Username,
                            name: found.Name,
                            bio: found.Bio,
                            major: found.Major,
                            school: found.School,
                            year: found.Year,
                            joinDate: found.JoinDate,
                            id: sessionID,
                        } 

                        Session.create({Username: found.Username, sessionID: sessionID}).then(function() {
                            res.json({"message": "Login succesful"});
                        }).catch(function(error) {
                            console.log(error)
                            res.statusMessage = "SESSION CREATION FAILED";
                            res.status(500).end()
                        })
                    } else if(isCorrect) {
                        res.json({"redirect": "/"})
                    }else {
                        console.log("Not Found")
                        res.statusMessage = "Login failed";
                        res.status(400).end()
                    }
                })
            }
        })
    }

})


module.exports = Router;