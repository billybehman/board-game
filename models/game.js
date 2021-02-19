module.exports = function (sequelize, DataTypes) {
    let  Game = sequelize.define("Game", {
        currentYear: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currentTurn: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        currentPlayerTurn: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        yearOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearFive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        playersSoFar: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }, 
        gameHasStarted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    Game.associate = function (models) {
        Game.hasMany(models.Player, {
            onDelete: "cascade"
        })
        Game.hasMany(models.Tile, {
            onDelete: "cascade"
        })
        Game.hasMany(models.Piece, {
            onDelete: "cascade"
        })
        Game.hasMany(models.Resource, {
            onDelete: "cascade"
        })
    }

    return Game
}