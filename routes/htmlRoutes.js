// var db = require("../models");
var Sequelize = require("sequelize");
var session = require("express-session");
var path = require("path")

const Op = Sequelize.Op;

module.exports = function (app) {


    app.get("/create-piece", function (req, res) {
        res.render("createPiece")
        console.log("/create piece, session id is: " + req.sessionID)
        console.log("name is: " + req.session.name)
    });

    app.get("/board", function (req, res) {
        res.render("board")
        console.log("/board, session id is: " + req.sessionID)
        console.log("name is: " + req.session.name)
        console.log("session ", req.session)
    });

    app.get("/", function (req, res) {
        res.render("playerPage")
        console.log("/, session id is: " + req.sessionID)
    });

    app.get("/set-up-game", function (req, res) {
        res.render("preGame")
    })

}

