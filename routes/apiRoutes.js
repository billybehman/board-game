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
            hitPoints: 6,
            PlayerId: req.session.playerId,
            owner: req.session.name
        }).then(function (data) {
            console.log(data)
            res.json(data)
        })
    })

    app.post("/api/add-test-piece", function (req, res) {
        db.Piece.create({
            bodyCompType: "Spirit",
            bodyCompLvl: 1,
            astrologyType: "Yellow-Moon",
            astrologyLvl: 1,
            shieldType: "skin",
            shieldLvl: 1,
            movementForward: 1,
            movementDiagonal: 1,
            attackType: "spiked",
            attackLvl: 1,
            attackDistance: "1TileForward",
            intelligenceCollect: 1,
            knowledgeCollect: 1,
            hitPoints: 6,
            PlayerId: req.session.playerId,
            owner: req.session.name
        }).then(function (data) {
            res.json(data)
        })
    })

    app.get("/api/pieces", function (req, res) {
        db.Piece.findAll({
            include: [{ model: db.Player, include: db.Resource }, db.Tile]
        }).then(function (data) {
            res.json(data)
        })
    })

    app.post("/api/starting-res", function (req, res) {
        let foreignKey = req.session.name
        let playerId = req.session.playerId
        console.log("player id is: " + foreignKey + " " + playerId)
        db.Resource.create({
            playerName: foreignKey,
            PlayerId: playerId
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
            GameId: req.body.GameId
        }).then(function (data) {
            res.json(data)
        })
    })

    app.get("/api/tiles", function (req, res) {
        console.log("tiles data: ", req.query)
        db.Tile.findAll({
            where: {
                GameId: req.query.gameId
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    app.get("/api/find-player", function (req, res) {
        console.log("The Find Player Request Data\n\n\n", req.query)
        let GameId = req.query.GameId
        db.Player.findOne({
            where: {
                name: req.query.name,
                GameId: GameId
            }
        }).then(function (data) {
            req.session.name = data.dataValues.name
            req.session.playerId = data.dataValues.id
            req.session.game = GameId
            console.log("new data: ", data)
            console.log("api route, " + req.sessionID)
            res.json(data)
        })
    });

    app.post("/api/add-player", async function (req, res) {
        const { dataValues } = await db.Game.findOne({
            where: {
                id: req.body.GameId
            },
            include: [db.Player]
        })
        console.log("This is the game data from the add player request\n\n\n", dataValues)
        let numberOfPlayers = dataValues.numberOfPlayers
        let turnOrder = dataValues.Players.length + 1
        let thePlayer = req.body.name
        console.log("The player is " + thePlayer)

        if (turnOrder > numberOfPlayers) {
            let data = { dataValues, full: true }
            res.json(data)
            return
        }

        const playerData = await db.Player.create({ ...req.body, turnOrder })
        console.log("Here's the player data ", playerData)
        req.session.name = playerData.dataValues.name
        req.session.playerId = playerData.dataValues.id
        req.session.game = playerData.dataValues.GameId

        if (turnOrder === numberOfPlayers) {

            const gameData = await db.Game.update(
                {
                    playersSoFar: turnOrder,
                    currentTurn: 1
                }, {
                where: {
                    id: req.body.GameId
                }
            })

            let data = { playerData, gameData }
            res.json(data)
        } else if (turnOrder < numberOfPlayers) {

            const gameData = await db.Game.update({ playersSoFar: turnOrder }, {
                where: {
                    id: req.body.GameId
                }
            })

            let data = { playerData, gameData }
            res.json(data)
        }

    })

    app.get("/api/turn-check", function (req, res) {
        db.Game.findOne({
            where: {
                id: req.session.game
            }
        }).then(function (data) {
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
            where: {
                TileId: null
            }
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

    app.get("/api/get-session", function (req, res) {
        console.log("get session ", req.session)
        console.log("get sessionID ", req.sessionID)
        let sesh = req.session
        res.json(sesh)
    })

    app.put("/api/res-transfer", function (req, res) {
        console.log("transfer data: ", req.body)
        let resType = req.body.resType
        db.Resource.update(
            { [resType]: req.body.newPlayerRes },
            {
                where: {
                    id: req.body.resId
                }
            })
        db.Tile.update(
            { resAmount: req.body.newTileRes },
            {
                where: {
                    id: req.body.TileId
                }
            }
        ).then(function (data) {
            res.json(data)
        })
    })




    //first have to get the what the current focus is and then I can update it by subracting 2



    app.put("/api/attack", async function (req, res) {
        console.log("This is the attack data: ", req.body)
        //this request also needs to update the player model of the attacker, 
        const pieceData = await db.Piece.findAll({
            where: {
                [Op.or]: [
                    { id: req.body.attacker },
                    { id: req.body.defender }
                ]
            }
        })

        try {

            let playerData = await db.Player.findOne({
                where: {
                    id: req.session.playerId
                },
                include: [db.Game]
            })

            console.log("This is the Player Data:\n\n\n", playerData)

            let currentTurn = playerData.Game.dataValues.currentTurn

            let numberOfPlayers = playerData.Game.dataValues.numberOfPlayers

            console.log("The current game turn:\n\n\n" + currentTurn + "\n\n\n")

            console.log("This is the more exact player data:\n\n\n", playerData.dataValues, "\n\n\n")

            if (currentTurn % numberOfPlayers === playerData.dataValues.turnOrder) {

                let oldFocus = playerData.dataValues.focusRemaining
                let newFocus = oldFocus - 2
                playerData = await db.Player.update(
                    { focusRemaining: newFocus },
                    {
                        where: {
                            id: req.session.playerId
                        }
                    }
                )

                console.log("PieceId:\n\n\n", pieceData[0].id, "\n\n\n", "Attacker:\n\n\n", req.body.attacker)
                let attacker, defender
                if (pieceData[0].id == req.body.attacker) {
                    attacker = pieceData[0]
                    defender = pieceData[1]
                } else {
                    attacker = pieceData[1]
                    defender = pieceData[0]
                }
                let startingHitPoints = defender.dataValues.hitPoints
                let attackerDamage = attacker.dataValues.attackLvl
                let shield = defender.dataValues.shieldLvl
                let netDamage = attackerDamage - shield + 3
                let finalHitPoints = startingHitPoints - netDamage
                console.log("here's the damage\n\n\n", { netDamage, finalHitPoints, startingHitPoints, attacker, defender })
                if (finalHitPoints <= 0) {
                    db.Piece.destroy(
                        {
                            where: {
                                id: req.body.defender
                            }
                        }
                    ).then(function (data) {
                        let totalData = { playerData, data }
                        res.json(totalData)
                    })
                } else {
                    db.Piece.update(
                        { hitPoints: finalHitPoints },
                        {
                            where: {
                                id: req.body.defender
                            }
                        }
                    ).then(function (data) {
                        let totalData = { playerData, data }
                        res.json(totalData)
                    })
                }
            } else {
                let data = {
                    playerData,
                    wrongTurn: true
                }
                res.json(data)
            }



        }
        catch (err) {
            console.log(err)
        }

    })


    app.put("/api/end-turn", async function (req, res) {

        //find the game
        //update the currentTurn of the game to be +1 or 1 if the number of players in the game = the currentTurn
        
        const gameData = await db.Game.findOne({
            where: {
                id: req.session.game
            }
        })

        console.log("\n\nHere's the game data:\n\n\n", gameData, "\n\n\n")

        let previousTurn = gameData.dataValues.currentTurn

        let newTurn = previousTurn + 1


        db.Game.update({currentTurn: newTurn}, {
            where: {
                id: req.session.game
            }
        }).then(function(data) {
            res.json(data)
        })
    })


    app.get("/api/get-res", function (req, res) {
        db.Resource.findOne({
            where: {
                PlayerId: req.session.playerId
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    app.post("/api/create-game", function (req, res) {
        console.log("Game Options: ", req.body)
        db.Game.create({
            currentYear: req.body.currentYear,
            yearOne: req.body.yearOne,
            yearTwo: req.body.yearTwo,
            yearThree: req.body.yearThree,
            yearFour: req.body.yearFour,
            yearFive: req.body.yearFive,
            name: req.body.name,
            numberOfPlayers: req.body.numberOfPlayers
        }).then(function (data) {
            req.session.game = data.dataValues.id
            res.json(data)
        })
    })

    app.get("/api/get-games", function (req, res) {
        db.Game.findAll({}).then(function (data) {
            res.json(data)
        })
    })

};

