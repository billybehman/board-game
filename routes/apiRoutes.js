var db = require("../models");
var Sequelize = require("sequelize");
var session = require("express-session");
var passport = require("passport");

const Op = Sequelize.Op;

module.exports = function (app) {

    app.post("/api/add-pieces", function(req, res) {
        console.log(req.body)
        var bodyCompType = req.body.bodyCompType
        var bodyCompLvl = req.body.bodyCompLvl
        var astrologyType = req.body.astrologyType
        var astrologyLvl = req.body.astrologyLvl
        var shieldType = req.body.shieldType
        var shieldLvl = req.body.shieldLvl
        var movementForward = req.body.movementForward
        var movementDiagonal = req.body.movementDiagonal
        var attackType = req.body.attackType
        var attackLvl = req.body.attackLvl
        var attackDistance = req.body.attackDistance
        var intelligenceCollect = req.body.intelligenceCollect
        var knowledgeCollect = req.body.knowledgeCollect
        db.Piece.create({
            bodyCompType: bodyCompType,
            bodyCompLvl: bodyCompLvl,
            astrologyType: astrologyType,
            astrologyLvl: astrologyLvl,
            shieldType: shieldType,
            shieldLvl: shieldLvl,
            movementForward: movementForward,
            movementDiagonal: movementDiagonal,
            attackType: attackType,
            attackLvl: attackLvl,
            attackDistance: attackDistance,
            intelligenceCollect: intelligenceCollect,
            knowledgeCollect: knowledgeCollect
        }).then(function (data) {
            console.log(data)
        })
    })

    app.get("/api/pieces", function(req, res) {
        db.Piece.findAll({}).then(function(data) {
            res.json(data)
        })
    })

    app.post("/api/add-tiles", function(req, res) {
        db.Tile.create({
            x: req.body.x,
            y: req.body.y,
            resType: req.body.resType,
            resAmount: req.body.resAmount,
            terrain: req.body.terrain,
        }).then(function (data) {
            res.json(data)
        })
    })

    app.get("/api/tiles", function(req, res) {
        db.Tile.findAll({}).then(function(data) {
            res.json(data)
        })
    })

    app.get("/api/players/:name", function (req, res) {
        db.Player.findAll({
            where: {
                name: req.params.name
            }
        }).then(function(data) {
            req.session.name = data[0].name
            res.json(data)
            console.log(data)
            console.log(req.session)
        })
    });

    app.post("/api/add-player", function (req, res) {
        let thePlayer = req.body.name
        console.log("thePlayer")
        db.Player.create({
            name: thePlayer
        }).then(function(data) {
            console.log(data)
            res.json(data)
        })
    })

    app.get("/api/all-players", function(req, res) {
        db.Player.findAll({}).then(function(data) {
            res.json(data)
            console.log(req.session.passport.user)
        })
    })

};

