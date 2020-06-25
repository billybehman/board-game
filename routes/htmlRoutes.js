// var db = require("../models");
var Sequelize = require("sequelize");
var session = require("express-session");
var path = require("path")

const Op = Sequelize.Op;

module.exports = function (app) {


    app.get("/create-piece", function (req, res) {
        res.render("createPiece")
        console.log(req.session.name)
    });

    app.get("/board", function (req, res) {
        res.render("board")
    });

    app.get("/", function (req, res) {
        res.render("playerPage")
        console.log(req.session)
    });

}