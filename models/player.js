module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    })

    Player.associate = function (models) {
        Player.hasMany(models.Piece, {
            onDelete: "cascade"
        })
    }

    Player.associate = function (models) {
        Player.hasMany(models.Resource, {
            onDelete: "cascade"
        })
    }

    return Player
}

