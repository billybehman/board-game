var db = require("../models");
var Sequelize = require("sequelize");
var session = require("express-session");
var passport = require("passport");

const Op = Sequelize.Op;

module.exports = function (app) {

    app.post("/api/add-pieces", function (req, res) {
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
            knowledgeCollect: knowledgeCollect,
            PlayerId: req.session.playerId
        }).then(function (data) {
            console.log(data)
            res.json(data)
        })
    })

    app.get("/api/pieces", function (req, res) {
        db.Piece.findAll({}).then(function (data) {
            res.json(data)
        })
    })

    app.post("/api/starting-res", function (req, res) {
        let foreignKey = req.session.playerId
        console.log("player id is: " + foreignKey)
        db.Resource.create({
            PlayerId: foreignKey
        }).then(function (data) {
            console.log(data)
            res.json(data)
        })
    })

    app.post("/api/add-tiles", function (req, res) {
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

    app.get("/api/tiles", function (req, res) {
        db.Tile.findAll({}).then(function (data) {
            res.json(data)
        })
    })

    app.get("/api/players/:name", function (req, res) {
        db.Player.findAll({
            where: {
                name: req.params.name
            }
        }).then(function (data) {
            req.session.name = data[0].name
            req.session.playerId = data[0].id
            console.log("new data: ", data)
            console.log("api route, " + req.sessionID)
            res.json(data)
        })
    });

    app.post("/api/add-player", function (req, res) {
        let thePlayer = req.body.name
        console.log("The player is " + thePlayer)
        db.Player.create({
            name: thePlayer
        }).then(function (data) {
            console.log("Here's the data ", data)
            req.session.name = data.dataValues.name
            req.session.playerId = data.dataValues.id
            res.json(data)
        })
    })

    app.get("/api/all-players", function (req, res) {
        db.Player.findAll({}).then(function (data) {
            res.json(data)
            console.log(req.session)
        })
    })

    app.get("/api/new-pieces", function (req, res) {
        db.Piece.findAll({
            TileId: "undefinded"
        }).then(function (data) {
            res.json(data)
        })
    })

    app.put("/api/piece-position", function (req, res) {
        db.Piece.update({ TileId: req.body.tid }, {
            where: {
                id: req.body.ide
            }
        })
    })

    app.get("/api/find-tile", function (req, res) {
        console.log("this is the body ", req.query.x, req.query.y)
        db.Tile.findOne({
            where: {
                x: req.query.x,
                y: req.query.y
            }
        }).then(function (data) {
            console.log("Here's the data: ", data.dataValues.id)
            db.Tile.update({ occupied: true }, {
                where: {
                    id: data.dataValues.id
                }
            })

        }).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
    })

    app.put("/api/update-piece/:id", function (req, res) {
        console.log("this is the body: ", req.params.id, req.body.id)
        db.Piece.update(
            { TileId: req.body.id },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            console.log("Error: ", err)
        })
    })

    app.get("/api/get-session", function(req, res) {
        console.log("get session ", req.session)
        console.log("get sessionID ", req.sessionID)
        let sesh = req.session
        res.json(sesh)
    })

};

